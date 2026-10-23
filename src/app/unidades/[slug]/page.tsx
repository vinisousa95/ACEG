import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText, Info, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { MapaEmbed } from "@/components/ui/MapaEmbed";
import { Markdown } from "@/components/ui/Markdown";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Pill } from "@/components/ui/Pill";
import { rotuloTipoUnidade } from "@/components/ui/UnitCard";
import { ArcoAberto, Circulo } from "@/components/ui/Shapes";
import { organization, SITE_URL, whatsappUrl } from "@/data/organization";
import { getDocumentos, getUnidade, getUnidades } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getUnidades().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = getUnidade(slug);
  if (!u) return {};
  return buildMetadata({ titulo: u.titulo, descricao: u.resumo, caminho: `/unidades/${u.slug}`, imagem: u.imagem });
}

export default async function UnidadePage({ params }: Props) {
  const { slug } = await params;
  const unidade = getUnidade(slug);
  if (!unidade) notFound();

  const docs = getDocumentos().filter((d) => unidade.documentos.includes(d.slug));
  const sede = unidade.tipo !== "creche";
  const outras = getUnidades().filter((u) => u.slug !== unidade.slug);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": sede ? "Organization" : "ChildCare",
    name: unidade.titulo,
    url: `${SITE_URL}/unidades/${unidade.slug}`,
    parentOrganization: { "@id": `${SITE_URL}/#organizacao` },
    ...(unidade.telefones[0] ? { telephone: unidade.telefones[0] } : {}),
    ...(unidade.endereco
      ? { address: { "@type": "PostalAddress", streetAddress: unidade.endereco.split(" — ")[0], addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" } }
      : {}),
  };

  return (
    <>
      <section className={cn("relative isolate overflow-hidden", sede ? "bg-abraco text-white" : "bg-comunidade text-white")}>
        <ArcoAberto cor="branco" className="absolute -right-16 -top-20 -z-10 w-80 opacity-15" />
        <Circulo cor="sol" className="absolute bottom-6 right-[14%] -z-10 hidden w-12 sm:block" />
        <div className="container-aceg py-8 sm:py-12 lg:py-16">
          <Breadcrumbs claro itens={[{ label: "Unidades", href: "/unidades" }, { label: unidade.titulo }]} />
          <div className="mt-6 max-w-3xl">
            <Pill tema="amarelo" className="!bg-white !text-tinta">{rotuloTipoUnidade[unidade.tipo]}</Pill>
            <h1 className="mt-4 text-white">{unidade.titulo}</h1>
            <p className="lead mt-5 !text-white/90">{unidade.resumo}</p>
          </div>
        </div>
      </section>

      <div className="container-aceg grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="space-y-10">
          {unidade.imagem && <PhotoFrame src={unidade.imagem} alt={unidade.imagemAlt} tema="azul" proporcao="aspect-[16/10]" sizes="(min-width: 1024px) 60vw, 100vw" prioridade />}
          <div>
            <p className="text-lg font-semibold text-tinta-suave">{unidade.descricao}</p>
            {unidade.corpo && <Markdown className="mt-5 text-lg">{unidade.corpo}</Markdown>}
          </div>

          {unidade.enderecoMapa ? (
            <section aria-labelledby="t-mapa">
              <h2 id="t-mapa" className="mb-4 text-[length:var(--text-h3)]">Como chegar</h2>
              <MapaEmbed endereco={unidade.enderecoMapa} titulo={unidade.titulo} />
              {unidade.complemento && <p className="mt-3 text-tinta-suave">{unidade.complemento}</p>}
            </section>
          ) : (
            <p className="flex gap-3 rounded-[var(--radius-card)] bg-ceu p-5 text-tinta-suave">
              <Info aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-comunidade" />
              <span>
                O endereço e os contatos desta unidade ainda estão em validação e serão publicados após a confirmação pela ACEG. Enquanto isso, fale com a associação pelo{" "}
                <Link href="/contato" className="font-bold text-comunidade underline">canal de contato</Link>.
              </span>
            </p>
          )}

          {docs.length > 0 && (
            <section aria-labelledby="t-docs">
              <h2 id="t-docs" className="text-[length:var(--text-h3)]">Documentos da unidade</h2>
              <ul className="mt-4 space-y-3">
                {docs.map((d) => (
                  <li key={d.slug}>
                    <a
                      href={d.arquivo}
                      download
                      className="flex items-center gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-4 transition hover:shadow-soft"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ceu text-comunidade">
                        <FileText aria-hidden="true" size={22} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold leading-tight">{d.titulo}</span>
                        <span className="text-sm text-tinta-suave">PDF · {d.ano}</span>
                      </span>
                      <Download aria-hidden="true" size={20} className="text-comunidade" />
                      <span className="sr-only">Baixar documento</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Informações da unidade">
          <div className="rounded-[var(--radius-card)] border border-borda bg-white p-6 shadow-soft">
            <h2 className="text-xl">Informações</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Endereço</p>
                  <p>{unidade.endereco ?? "Em validação"}</p>
                  {unidade.complemento && <p className="mt-1 text-sm text-tinta-suave">{unidade.complemento}</p>}
                </div>
              </li>
              {unidade.telefones.length > 0 && (
                <li className="flex gap-3">
                  <Phone aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Telefone</p>
                    {unidade.telefones.map((t) => (
                      <p key={t}>
                        <a href={`tel:+55${t.replace(/\D/g, "")}`} className="font-bold text-comunidade underline-offset-4 hover:underline">{t}</a>
                      </p>
                    ))}
                  </div>
                </li>
              )}
              {unidade.cnpj && (
                <li className="flex gap-3">
                  <FileText aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-tinta-suave">CNPJ da unidade</p>
                    <p>{unidade.cnpj}</p>
                    <p className="mt-1 text-xs text-tinta-suave">Conforme edital nº 01/2022.</p>
                  </div>
                </li>
              )}
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <Button href={whatsappUrl(`Olá! Gostaria de informações sobre: ${unidade.titulo}.`)} seta>Falar pelo WhatsApp</Button>
              <Button href={`mailto:${organization.contatos.email.endereco}?subject=${encodeURIComponent(unidade.titulo)}`} variante="contorno">Enviar e-mail</Button>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="t-outras" className="bg-white py-12 sm:py-16">
        <div className="container-aceg">
          <h2 id="t-outras" className="text-[length:var(--text-h3)]">Outras unidades</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {outras.map((o) => (
              <li key={o.slug}>
                <Link href={`/unidades/${o.slug}`} className="inline-flex min-h-12 items-center rounded-full border-2 border-borda bg-creme px-5 font-bold transition hover:border-comunidade">
                  {o.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd dados={jsonLd} />
    </>
  );
}
