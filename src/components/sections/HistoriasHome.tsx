import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcoAberto, Circulo } from "@/components/ui/Shapes";
import { historiasHome } from "@/data/home";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";

export function HistoriasHome() {
  const [destaque, ...outras] = historiasHome;
  return (
    <section aria-labelledby="titulo-historias" className="relative overflow-hidden bg-folha section-y">
      <Circulo cor="creme" className="absolute -left-20 bottom-10 w-60 opacity-70" />
      <div className="container-aceg relative">
        <SectionHeading
          id="titulo-historias"
          eyebrow="Histórias e impacto social"
          titulo="O que a ACEG vive e constrói com a comunidade"
          texto="Relatos institucionais baseados nos registros da própria associação."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <article className="relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card-lg)] bg-comunidade p-7 text-white sm:p-10">
              <ArcoAberto cor="branco" className="absolute -right-20 -top-20 -z-10 w-72 opacity-15" />
              <Circulo cor="sol" className="absolute right-8 top-8 -z-10 w-12" />
              <p className="eyebrow text-white">{destaque.eyebrow}</p>
              <h3 className="mt-2 text-[length:var(--text-h2)] leading-[1.02] text-white">{destaque.titulo}</h3>
              <p className="mt-4 max-w-xl text-lg text-white/90">{destaque.texto}</p>
              <Link
                href={destaque.href}
                className="mt-6 inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-sol px-6 font-extrabold text-tinta transition hover:bg-[#ffc93a]"
              >
                {destaque.cta}
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.5} />
              </Link>
            </article>
          </Reveal>

          <div className="grid gap-6">
            {outras.map((h, i) => {
              const t = temas[h.tema];
              return (
                <Reveal key={h.id} delay={(i + 1) * 100}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white shadow-soft transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lift sm:flex-row">
                    {"imagem" in h && h.imagem ? (
                      <PhotoFrame
                        src={h.imagem}
                        alt={h.imagemAlt}
                        tema={h.tema}
                        proporcao="aspect-[16/10] sm:aspect-auto sm:w-2/5 sm:min-h-full"
                        forma="card"
                        className="!rounded-none"
                        sizes="(min-width: 1024px) 20vw, 100vw"
                      />
                    ) : (
                      <div className={cn("relative hidden w-3 shrink-0 sm:block", t.solid)} aria-hidden="true" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className={cn("eyebrow", h.tema === "amarelo" ? "text-tinta-suave" : t.text)}>{h.eyebrow}</p>
                      <h3 className="mt-1 text-[1.375rem]">
                        <Link href={h.href} className="after:absolute after:inset-0 after:content-['']">
                          {h.titulo}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 text-[0.9375rem] text-tinta-suave">{h.texto}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 font-extrabold text-comunidade">
                        {h.cta}
                        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.5} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
