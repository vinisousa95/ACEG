import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsCard } from "@/components/ui/NewsCard";
import { Pagination } from "@/components/ui/Pagination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tiposPublicacao, type TipoPublicacao } from "@/data/categorias";
import { getPublicacoes } from "@/lib/content";
import { ehFuturo, normalizar } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  titulo: "Notícias e eventos",
  descricao: "Notícias, ações sociais, eventos e comunicados da ACEG.",
  caminho: "/noticias",
});

const POR_PAGINA = 9;

type SP = Promise<{ [k: string]: string | string[] | undefined }>;
const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function NoticiasPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = un(sp.q).trim().slice(0, 80);
  const tipoParam = un(sp.tipo);
  const tipo = (Object.keys(tiposPublicacao) as TipoPublicacao[]).find((t) => t === tipoParam);
  const ordem = un(sp.ordem) === "antigas" ? "antigas" : "recentes";
  const pagina = Math.max(1, parseInt(un(sp.pagina), 10) || 1);

  const todas = getPublicacoes();
  const proximos = todas
    .filter((p) => p.dataEvento && ehFuturo(p.dataEvento))
    .sort((a, b) => a.dataEvento!.localeCompare(b.dataEvento!));

  const filtradas = todas
    .filter((p) => !tipo || p.tipo === tipo)
    .filter((p) => !q || normalizar(`${p.titulo} ${p.resumo} ${p.tags.join(" ")}`).includes(normalizar(q)))
    .sort((a, b) => (ordem === "recentes" ? b.data.localeCompare(a.data) : a.data.localeCompare(b.data)));

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const itens = filtradas.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

  const href = (over: { tipo?: string; pagina?: number }) => {
    const p = new URLSearchParams();
    const t = "tipo" in over ? over.tipo : tipo;
    if (q) p.set("q", q);
    if (t) p.set("tipo", t);
    if (ordem === "antigas") p.set("ordem", "antigas");
    if (over.pagina && over.pagina > 1) p.set("pagina", String(over.pagina));
    const s = p.toString();
    return `/noticias${s ? `?${s}` : ""}`;
  };

  const chip = "inline-flex min-h-11 items-center rounded-full border-2 px-4 font-bold transition";
  const filtrando = !!(q || tipo);

  return (
    <>
      <PageHero
        tema="azul"
        eyebrow="Notícias e eventos"
        titulo="Acompanhe a vida da ACEG"
        texto="Notícias, ações sociais, eventos e comunicados institucionais, do mais recente ao mais antigo."
        crumbs={[{ label: "Notícias e eventos" }]}
      />

      {!filtrando && (
        <section aria-labelledby="t-proximos" className="section-y pb-0 sm:pb-0 lg:pb-0">
          <div className="container-aceg">
            <SectionHeading id="t-proximos" eyebrow="Agenda" titulo="Próximos eventos" as="h2" />
            {proximos.length ? (
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {proximos.map((p) => (
                  <li key={p.slug}>
                    <NewsCard pub={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6">
                <EmptyState
                  titulo="Nenhum evento programado no momento"
                  texto="Quando houver um novo evento, ele aparece aqui. Os eventos já realizados ficam registrados logo abaixo."
                />
              </div>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="t-todas" className="section-y">
        <div className="container-aceg">
          <h2 id="t-todas" className="text-[length:var(--text-h2)]">
            {filtrando ? "Resultados" : "Publicações e eventos realizados"}
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <nav aria-label="Filtrar por tipo" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <Link
                href={href({ tipo: undefined })}
                aria-current={!tipo ? "true" : undefined}
                className={cn(chip, "shrink-0", !tipo ? "border-comunidade bg-comunidade text-white" : "border-borda bg-white hover:border-comunidade/50")}
              >
                Tudo
              </Link>
              {(Object.keys(tiposPublicacao) as TipoPublicacao[]).map((t) => (
                <Link
                  key={t}
                  href={href({ tipo: t })}
                  aria-current={tipo === t ? "true" : undefined}
                  className={cn(chip, "shrink-0", tipo === t ? "border-comunidade bg-comunidade text-white" : "border-borda bg-white hover:border-comunidade/50")}
                >
                  {tiposPublicacao[t].plural}
                </Link>
              ))}
            </nav>

            <form method="get" action="/noticias" role="search" className="flex flex-col gap-3 sm:flex-row">
              {tipo && <input type="hidden" name="tipo" value={tipo} />}
              <div className="relative flex-1">
                <label htmlFor="busca" className="sr-only">Buscar nas publicações</label>
                <Search aria-hidden="true" size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tinta-suave" />
                <input
                  id="busca"
                  name="q"
                  type="search"
                  defaultValue={q}
                  maxLength={80}
                  placeholder="Buscar por título, tema ou palavra-chave"
                  className="min-h-12 w-full rounded-full border-2 border-borda bg-white pl-12 pr-4 font-semibold placeholder:text-tinta-suave/70 focus:border-comunidade"
                />
              </div>
              <div>
                <label htmlFor="ordem" className="sr-only">Ordenar por data</label>
                <select
                  id="ordem"
                  name="ordem"
                  defaultValue={ordem}
                  className="min-h-12 w-full rounded-full border-2 border-borda bg-white px-5 font-bold focus:border-comunidade sm:w-auto"
                >
                  <option value="recentes">Mais recentes primeiro</option>
                  <option value="antigas">Mais antigas primeiro</option>
                </select>
              </div>
              <button type="submit" className="min-h-12 rounded-full bg-comunidade px-7 font-extrabold text-white transition hover:bg-comunidade-escuro">
                Buscar
              </button>
            </form>
          </div>

          <p role="status" aria-live="polite" className="mt-6 text-sm font-bold text-tinta-suave">
            {filtradas.length === 1 ? "1 publicação" : `${filtradas.length} publicações`}
            {q ? ` para “${q}”` : ""}
          </p>

          {itens.length ? (
            <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {itens.map((p, i) => (
                <li key={p.slug}>
                  <NewsCard pub={p} prioridade={i === 0} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <EmptyState
                titulo="Nada encontrado"
                texto="Tente outras palavras ou volte para todas as publicações."
                acao={
                  <Link href="/noticias" className="font-extrabold text-comunidade underline">
                    Ver tudo
                  </Link>
                }
              />
            </div>
          )}

          <Pagination atual={paginaAtual} total={totalPaginas} href={(p) => href({ pagina: p })} />
        </div>
      </section>
    </>
  );
}
