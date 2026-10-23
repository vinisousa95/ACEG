import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Calendar, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Markdown } from "@/components/ui/Markdown";
import { NewsCard } from "@/components/ui/NewsCard";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Pill } from "@/components/ui/Pill";
import { ArcoAberto, Circulo } from "@/components/ui/Shapes";
import { categoriasProjeto } from "@/data/categorias";
import { getProjeto, getProjetos, getPublicacoes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjetos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjeto(slug);
  if (!p) return {};
  return buildMetadata({ titulo: p.titulo, descricao: p.resumo, caminho: `/projetos/${p.slug}`, imagem: p.imagem });
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) notFound();

  const cat = categoriasProjeto[projeto.categoria];
  const t = temas[cat.tema];
  const noticias = getPublicacoes().filter((n) => projeto.noticias.includes(n.slug) || n.projeto === projeto.slug).slice(0, 3);
  const outros = getProjetos().filter((p) => p.slug !== projeto.slug).slice(0, 3);

  return (
    <>
      <section className={cn("relative isolate overflow-hidden", t.solid, t.onSolid)}>
        <ArcoAberto cor={cat.tema === "amarelo" ? "creme" : "branco"} className="absolute -right-20 -top-20 -z-10 w-80 opacity-20" />
        <Circulo cor={cat.tema === "amarelo" ? "branco" : "sol"} className="absolute bottom-6 right-[12%] -z-10 hidden w-14 sm:block" />
        <div className="container-aceg grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div>
            <Breadcrumbs claro={cat.tema !== "amarelo"} itens={[{ label: "Nossos projetos", href: "/projetos" }, { label: projeto.titulo }]} />
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill tema="amarelo" className="!bg-white !text-tinta">
                <Icon nome={projeto.icone} size={14} strokeWidth={2.5} />
                {cat.rotulo}
              </Pill>
              {projeto.situacao === "historico" && <Pill tema="azul" className="!bg-tinta !text-white">Projeto histórico</Pill>}
            </div>
            <h1 className={cn("mt-4", cat.tema === "amarelo" ? "text-tinta" : "text-white")}>{projeto.titulo}</h1>
            <p className={cn("lead mt-5 max-w-2xl", cat.tema === "amarelo" ? "!text-tinta/80" : "!text-white/90")}>{projeto.resumo}</p>
          </div>
          <div>
            <PhotoFrame
              src={projeto.imagem}
              alt={projeto.imagemAlt}
              tema={cat.tema}
              proporcao="aspect-[4/3]"
              sizes="40vw"
              prioridade
              rotulo="Foto do projeto — a incluir após aprovação"
              className="shadow-lift"
            />
          </div>
        </div>
      </section>

      <div className="container-aceg grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="space-y-12">
          <Markdown className="text-lg">{projeto.corpo}</Markdown>

          {projeto.objetivos.length > 0 && (
            <section aria-labelledby="t-objetivos">
              <h2 id="t-objetivos" className="text-[length:var(--text-h3)]">Objetivos</h2>
              <ul className="mt-4 space-y-3">
                {projeto.objetivos.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className={cn("mt-1 grid size-6 shrink-0 place-items-center rounded-full", t.solid, t.onSolid)}>
                      <Check aria-hidden="true" size={14} strokeWidth={3} />
                    </span>
                    <span className="text-tinta-suave">{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {projeto.oQueOferece.length > 0 && (
            <section aria-labelledby="t-oferece">
              <h2 id="t-oferece" className="text-[length:var(--text-h3)]">O que o projeto oferece</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {projeto.oQueOferece.map((o) => (
                  <li key={o} className={cn("rounded-[var(--radius-card)] p-5 font-semibold", t.soft)}>
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {projeto.resultados.length > 0 && (
            <section aria-labelledby="t-resultados">
              <h2 id="t-resultados" className="text-[length:var(--text-h3)]">Resultados verificados</h2>
              <ul className="mt-4 space-y-2">
                {projeto.resultados.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {projeto.galeria.length > 0 && (
            <section aria-labelledby="t-galeria">
              <h2 id="t-galeria" className="text-[length:var(--text-h3)]">Galeria</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {projeto.galeria.map((g) => (
                  <li key={g.src}>
                    <PhotoFrame src={g.src} alt={g.alt} tema={cat.tema} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Ficha do projeto">
          <div className="rounded-[var(--radius-card)] border border-borda bg-white p-6 shadow-soft">
            <h2 className="text-xl">Ficha do projeto</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <Icon nome="heart" size={20} className="mt-1 shrink-0 text-abraco" />
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Situação</p>
                  <p>{projeto.situacao === "atual" ? "Atividade atual" : "Projeto histórico"}</p>
                </div>
              </li>
              {projeto.periodo && (
                <li className="flex gap-3">
                  <Calendar aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Período</p>
                    <p>{projeto.periodo}</p>
                  </div>
                </li>
              )}
              {projeto.publico && (
                <li className="flex gap-3">
                  <Users aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Público atendido</p>
                    <p>{projeto.publico}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-abraco p-6 text-white">
            <ArcoAberto cor="branco" className="absolute -right-12 -top-12 -z-10 w-40 opacity-15" />
            <h2 className="text-xl text-white">Como participar</h2>
            <p className="mt-2 text-white/90">{projeto.participar ?? "Fale com a ACEG para saber como participar."}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button href="/contato" variante="claro" seta>Falar com a ACEG</Button>
              <Button href="/como-apoiar" variante="contorno-claro">Como apoiar</Button>
            </div>
          </div>
        </aside>
      </div>

      {noticias.length > 0 && (
        <section aria-labelledby="t-noticias" className="bg-white py-12 sm:py-16">
          <div className="container-aceg">
            <h2 id="t-noticias" className="text-[length:var(--text-h3)]">Notícias deste projeto</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {noticias.map((n) => (
                <li key={n.slug}>
                  <NewsCard pub={n} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="t-outros" className="py-12 sm:py-16">
        <div className="container-aceg">
          <div className="flex items-end justify-between gap-4">
            <h2 id="t-outros" className="text-[length:var(--text-h3)]">Outros projetos</h2>
            <Link href="/projetos" className="font-extrabold text-comunidade underline-offset-4 hover:underline">Ver todos</Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={`/projetos/${o.slug}`} className="flex min-h-16 items-center gap-3 rounded-[var(--radius-card)] border border-borda bg-white p-4 font-bold transition hover:shadow-soft">
                  <Icon nome={o.icone} size={22} className="shrink-0 text-comunidade" />
                  {o.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
