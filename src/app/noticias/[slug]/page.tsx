import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, History } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Markdown } from "@/components/ui/Markdown";
import { NewsCard } from "@/components/ui/NewsCard";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Pill } from "@/components/ui/Pill";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { tiposPublicacao } from "@/data/categorias";
import { organization, SITE_URL } from "@/data/organization";
import { getProjeto, getPublicacao, getPublicacoes } from "@/lib/content";
import { ehFuturo, formatarData, formatarHora } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600; // reavalia "evento futuro x realizado" a cada hora

export function generateStaticParams() {
  return getPublicacoes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPublicacao(slug);
  if (!p) return {};
  return buildMetadata({
    titulo: p.titulo,
    descricao: p.resumo,
    caminho: `/noticias/${p.slug}`,
    imagem: p.imagem,
    tipo: "article",
    publicadoEm: p.data,
  });
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const pub = getPublicacao(slug);
  if (!pub) notFound();

  const tipo = tiposPublicacao[pub.tipo];
  const futuro = ehFuturo(pub.dataEvento);
  const projeto = pub.projeto ? getProjeto(pub.projeto) : undefined;
  const relacionadas = getPublicacoes().filter((p) => p.slug !== pub.slug).slice(0, 3);
  const url = `${SITE_URL}/noticias/${pub.slug}`;
  const imagemAbs = pub.imagem ? `${SITE_URL}${pub.imagem}` : `${SITE_URL}/og.png`;

  const jsonLd = pub.dataEvento
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: pub.titulo,
        description: pub.resumo,
        startDate: pub.dataEvento,
        eventStatus: "https://schema.org/EventScheduled",
        image: imagemAbs,
        url,
        organizer: { "@type": "NGO", name: organization.nomeCompleto, url: SITE_URL },
      }
    : {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: pub.titulo,
        description: pub.resumo,
        datePublished: pub.data,
        image: [imagemAbs],
        mainEntityOfPage: url,
        inLanguage: "pt-BR",
        author: { "@type": "Organization", name: organization.nomeCompleto },
        publisher: { "@type": "Organization", name: organization.nomeCompleto, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo/ACEG_colorido_horizontal.svg` } },
      };

  return (
    <article>
      <header className="bg-areia">
        <div className="container-aceg py-8 sm:py-12">
          <Breadcrumbs itens={[{ label: "Notícias e eventos", href: "/noticias" }, { label: pub.titulo }]} />
          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tema={tipo.tema}>{tipo.rotulo}</Pill>
              <time dateTime={pub.data} className="font-bold text-tinta-suave">
                Publicado em {formatarData(pub.data)}
              </time>
            </div>
            <h1 className="mt-4 text-[length:var(--text-h1)]">{pub.titulo}</h1>
            <p className="lead mt-4">{pub.resumo}</p>
          </div>
        </div>
      </header>

      <div className="container-aceg grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div className="min-w-0 space-y-8">
          {pub.imagem && (
            <PhotoFrame src={pub.imagem} alt={pub.imagemAlt} tema="azul" proporcao="aspect-[16/10]" sizes="(min-width: 1024px) 60vw, 100vw" prioridade />
          )}

          {pub.dataEvento && (
            <div className="flex gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sol text-tinta">
                {futuro ? <CalendarDays aria-hidden="true" size={24} /> : <History aria-hidden="true" size={24} />}
              </span>
              <div>
                <p className="font-display text-lg font-bold leading-tight">
                  {futuro ? "Próximo evento" : "Evento já realizado"}
                </p>
                <p className="text-tinta-suave">
                  <time dateTime={pub.dataEvento}>
                    {formatarData(pub.dataEvento, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, às {formatarHora(pub.dataEvento)}
                  </time>
                </p>
                {!futuro && (
                  <p className="mt-1 text-sm text-tinta-suave">
                    Este é um registro do arquivo da ACEG. O texto abaixo foi publicado na época do evento.
                  </p>
                )}
              </div>
            </div>
          )}

          <Markdown className="text-lg">{pub.corpo}</Markdown>

          {pub.galeria.length > 0 && (
            <section aria-labelledby="t-galeria">
              <h2 id="t-galeria" className="text-[length:var(--text-h3)]">Galeria</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {pub.galeria.map((g) => (
                  <li key={g.src}>
                    <PhotoFrame src={g.src} alt={g.alt} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pub.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Temas">
              {pub.tags.map((t) => (
                <li key={t}>
                  <Link href={`/noticias?q=${encodeURIComponent(t)}`} className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-sm font-bold text-tinta-suave ring-1 ring-borda transition hover:text-comunidade">
                    #{t}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <ShareButtons url={url} titulo={pub.titulo} />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Relacionado">
          {projeto && (
            <div className="rounded-[var(--radius-card)] bg-ceu p-5">
              <p className="eyebrow text-comunidade">Projeto relacionado</p>
              <Link href={`/projetos/${projeto.slug}`} className="mt-1 block font-display text-xl font-bold leading-tight hover:underline">
                {projeto.titulo}
              </Link>
              <p className="mt-1 text-sm text-tinta-suave">{projeto.resumo}</p>
            </div>
          )}
          <Link href="/noticias" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-comunidade font-extrabold text-comunidade transition hover:bg-comunidade hover:text-white">
            Voltar para notícias
          </Link>
        </aside>
      </div>

      <section aria-labelledby="t-mais" className="bg-white py-12 sm:py-16">
        <div className="container-aceg">
          <h2 id="t-mais" className="text-[length:var(--text-h3)]">Mais da ACEG</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relacionadas.map((n) => (
              <li key={n.slug}>
                <NewsCard pub={n} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd dados={jsonLd} />
    </article>
  );
}
