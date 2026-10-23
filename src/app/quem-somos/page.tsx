import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcoAberto, Circulo, QuartoDeCirculo } from "@/components/ui/Shapes";
import {
  eugenio,
  estrutura,
  linhaDoTempo,
  missao,
  objetivosSociais,
  origemAcao,
  parceriasRegistradas,
  principios,
  valores,
  visao,
} from "@/data/institucional";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";

export const metadata = buildMetadata({
  titulo: "Quem somos",
  descricao:
    "Conheça a história da ACEG, a trajetória de Eugênio Góes, nossa missão, visão, valores e a estrutura da associação.",
  caminho: "/quem-somos",
});

const ancoras = [
  { href: "#origem", label: "Nossa origem" },
  { href: "#historia", label: "Eugênio Góes" },
  { href: "#proposito", label: "Missão e valores" },
  { href: "#linha-do-tempo", label: "Linha do tempo" },
  { href: "#estrutura", label: "Estrutura" },
];

const coresValores = ["bg-abraco text-white", "bg-comunidade text-white", "bg-semente text-white", "bg-sol text-tinta"];

export default function QuemSomosPage() {
  return (
    <>
      <PageHero
        tema="amarelo"
        eyebrow="Quem somos"
        titulo="Uma história de comunidade, fé e trabalho"
        texto="A ACEG nasceu do sonho de um homem simples, que dedicou a vida a ajudar os vizinhos. Hoje, esse sonho é uma rede de educação, cuidado e oportunidades."
        crumbs={[{ label: "Quem somos" }]}
      >
        <nav aria-label="Nesta página">
          <ul className="flex flex-wrap gap-2">
            {ancoras.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 font-bold shadow-soft transition hover:bg-creme hover:shadow-lift"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Origem da ACEG */}
      <section id="origem" aria-labelledby="t-origem" className="section-y">
        <div className="container-aceg grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="t-origem" eyebrow="Nossa origem" titulo="Do grupo de amigos à associação" />
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg text-tinta-suave">
            <p>{origemAcao.textoCurto}</p>
            <p>
              O desejo de <strong className="text-tinta">proporcionar um mundo melhor para a comunidade</strong> era um sonho de Eugênio Góes. Em 2009,
              ele começou a se tornar realidade pelas mãos de sua filha, Ana Maria Goes dos Santos. O carisma e a preocupação de Eugênio com o bem-estar social foram,
              nas palavras da própria associação, a semente que permite que esse sonho continue crescendo.
            </p>
            <p>
              A associação leva o nome de <strong className="text-tinta">Eugênio Góes</strong>, cuja vida foi marcada pela união, pela harmonia, pela
              honestidade, pela educação e pelo respeito entre todos — valores que a ACEG leva adiante.
            </p>
          </Reveal>
        </div>
      </section>

      {/* História de Eugênio */}
      <section id="historia" aria-labelledby="t-historia" className="relative overflow-hidden bg-white section-y">
        <Circulo cor="creme" className="absolute -right-24 top-20 w-72" />
        <div className="container-aceg relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="t-historia"
              eyebrow="Quem foi Eugênio Góes"
              titulo="O homem que deu nome à ACEG"
              texto={`${eugenio.nascimento} – ${eugenio.falecimento}`}
            />
            <div className="relative mt-8 max-w-xs">
              <PhotoFrame tema="amarelo" forma="arco" proporcao="aspect-[4/5]" rotulo="Retrato de Eugênio Góes — a incluir pela família" />
              <Circulo cor="sol" className="absolute -bottom-3 -right-3 w-14" />
            </div>
          </div>

          <ol className="space-y-6">
            {eugenio.capitulos.map((c, i) => (
              <Reveal as="li" key={c.id} delay={60}>
                <article className="relative rounded-[var(--radius-card)] border border-borda bg-creme p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-3 -top-3 grid size-11 place-items-center rounded-full font-display text-xl font-extrabold shadow-soft",
                      coresValores[i % 4],
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[length:var(--text-h3)]">{c.titulo}</h3>
                  <div className="mt-3 space-y-3 text-tinta-suave">
                    {c.texto.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Missão, visão, valores */}
      <section id="proposito" aria-labelledby="t-proposito" className="section-y">
        <div className="container-aceg">
          <SectionHeading id="t-proposito" eyebrow="Nosso propósito" titulo="Missão, visão e valores" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="relative isolate h-full overflow-hidden rounded-[var(--radius-card-lg)] bg-abraco p-8 text-white sm:p-10">
                <ArcoAberto cor="branco" className="absolute -right-16 -top-16 -z-10 w-56 opacity-15" />
                <p className="eyebrow text-white">Missão</p>
                <p className="mt-3 font-display text-[length:var(--text-h3)] font-bold leading-snug">{missao}</p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="relative isolate h-full overflow-hidden rounded-[var(--radius-card-lg)] bg-comunidade p-8 text-white sm:p-10">
                <QuartoDeCirculo cor="sol" className="absolute -right-px -top-px -z-10 w-24" />
                <p className="eyebrow text-white">Visão</p>
                <p className="mt-3 font-display text-[length:var(--text-h3)] font-bold leading-snug">{visao}</p>
              </article>
            </Reveal>
          </div>

          <h3 className="mt-14">Valores</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {valores.map((v, i) => (
              <Reveal as="li" key={v} delay={(i % 4) * 60}>
                <span
                  className={cn(
                    "flex min-h-20 items-center rounded-[var(--radius-card)] px-5 py-3 font-display text-lg font-bold leading-tight",
                    coresValores[(i + Math.floor(i / 4)) % 4],
                  )}
                >
                  {v}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <h3>Princípios</h3>
              <ul className="mt-5 space-y-3">
                {principios.map((p, i) => (
                  <li key={p} className="flex gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-4">
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-ceu font-display text-base font-extrabold text-comunidade">
                      {i + 1}
                    </span>
                    <span className="text-tinta-suave">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Objetivos sociais</h3>
              <p className="mt-2 text-tinta-suave">Por meio de seus projetos, a ACEG busca:</p>
              <ul className="mt-5 space-y-4">
                {objetivosSociais.map((o) => (
                  <li key={o.titulo} className="flex gap-4 rounded-[var(--radius-card)] bg-folha p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-semente">
                      <Icon nome={o.icone} size={24} />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-bold leading-tight">{o.titulo}</span>
                      <span className="mt-1 block text-[0.9375rem] text-tinta-suave">{o.texto}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section id="linha-do-tempo" aria-labelledby="t-tempo" className="relative overflow-hidden bg-white section-y">
        <div className="container-aceg">
          <SectionHeading
            id="t-tempo"
            eyebrow="Linha do tempo"
            titulo="Marcos da nossa trajetória"
            texto="Somente datas registradas nos documentos e publicações da ACEG."
          />
          <ol className="relative mt-12 space-y-8 before:absolute before:bottom-0 before:left-[1.35rem] before:top-2 before:w-[3px] before:rounded-full before:bg-areia md:before:left-1/2 md:before:-translate-x-1/2">
            {linhaDoTempo.map((m, i) => {
              const t = temas[m.tema];
              const direita = i % 2 === 1;
              return (
                <Reveal as="li" key={`${m.ano}-${m.titulo}`} className="relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1 grid size-11 place-items-center rounded-full ring-4 ring-white md:left-1/2 md:-translate-x-1/2",
                      t.solid,
                      t.onSolid,
                    )}
                  >
                    <span className="size-3 rounded-full bg-current opacity-90" />
                  </span>
                  <div className={cn("rounded-[var(--radius-card)] border border-borda bg-creme p-6", direita ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
                    <p className={cn("font-display text-3xl font-extrabold leading-none", m.tema === "amarelo" ? "text-tinta" : t.text)}>
                      {m.ano}
                    </p>
                    {m.data && <p className="mt-1 text-sm font-bold text-tinta-suave">{m.data}</p>}
                    <h3 className="mt-2 text-xl">{m.titulo}</h3>
                    <p className="mt-1 text-tinta-suave">{m.texto}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Estrutura organizacional */}
      <section id="estrutura" aria-labelledby="t-estrutura" className="section-y">
        <div className="container-aceg">
          <SectionHeading
            id="t-estrutura"
            eyebrow="Estrutura organizacional"
            titulo="Como a ACEG se organiza"
            texto="Gestão, unidades e parcerias que sustentam o trabalho diário."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[var(--radius-card-lg)] border border-borda bg-white p-6 sm:p-10">
              <p className="mx-auto w-fit rounded-full bg-comunidade px-6 py-3 text-center font-display text-lg font-bold text-white">
                Associação Comunitária Eugênio Góes
              </p>
              <div aria-hidden="true" className="mx-auto h-6 w-[3px] rounded-full bg-areia" />
              <ul className="grid gap-3 sm:grid-cols-3">
                {estrutura.cargos.map((c) => (
                  <li key={c.cargo} className="rounded-[var(--radius-card)] bg-ceu p-4 text-center font-display text-lg font-bold">
                    {c.cargo}
                  </li>
                ))}
              </ul>
              <div aria-hidden="true" className="mx-auto h-6 w-[3px] rounded-full bg-areia" />
              <ul className="grid gap-3 sm:grid-cols-2">
                <li>
                  <Link href="/unidades" className="block rounded-[var(--radius-card)] bg-folha p-4 text-center font-display text-lg font-bold transition hover:shadow-soft">
                    Creches · educação infantil
                  </Link>
                </li>
                <li>
                  <Link href="/unidades/sede-social" className="block rounded-[var(--radius-card)] bg-rosa p-4 text-center font-display text-lg font-bold transition hover:shadow-soft">
                    Sede social
                  </Link>
                </li>
              </ul>
              <p className="mt-6 rounded-2xl bg-creme p-4 text-sm text-tinta-suave">
                {estrutura.nomesValidados
                  ? "Diretoria e equipe responsáveis pela gestão."
                  : "Os nomes e cargos da diretoria e da equipe serão publicados após a validação pela associação."}
              </p>
            </div>

            <div className="rounded-[var(--radius-card-lg)] bg-areia p-6 sm:p-10">
              <h3>Parcerias registradas</h3>
              <ul className="mt-5 space-y-4">
                {parceriasRegistradas.map((p) => (
                  <li key={p.nome} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-3 shrink-0 rounded-full bg-abraco" />
                    <span>
                      <strong className="font-extrabold">{p.nome}</strong>
                      <br />
                      <span className="text-[0.9375rem] text-tinta-suave">{p.detalhe}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Button href="/como-apoiar#parcerias" variante="azul" seta className="mt-6">
                Seja um parceiro
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
