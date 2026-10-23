import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ArcoAberto, Circulo, QuartoDeCirculo } from "@/components/ui/Shapes";
import { cn } from "@/lib/cn";
import type { Indicador } from "@/lib/content";
import { temas } from "@/lib/theme";

export function Impacto({ indicadores }: { indicadores: Indicador[] }) {
  if (!indicadores.length) return null;
  return (
    <section aria-labelledby="titulo-impacto" className="container-aceg -mt-2 pb-4 sm:pb-8">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-card-lg)] bg-comunidade px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
        <QuartoDeCirculo cor="sol" className="absolute -right-px -top-px -z-10 w-28 sm:w-44" />
        <ArcoAberto cor="branco" className="absolute -bottom-24 -left-20 -z-10 w-72 opacity-10" />
        <Circulo cor="abraco" className="absolute -bottom-10 right-[12%] -z-10 hidden w-24 sm:block" />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:gap-12">
          <div>
            <p className="eyebrow text-white">Presença verificável</p>
            <h2 id="titulo-impacto" className="mt-3 text-white">
              Uma rede que cuida de perto
            </h2>
            <p className="mt-4 text-white/95">
              Só apresentamos números confirmados, sempre com o contexto e a fonte de cada um.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {indicadores.map((ind, i) => {
              const t = temas[ind.tema];
              return (
                <Reveal as="li" key={ind.id} delay={i * 80}>
                  <div className="h-full rounded-[var(--radius-card)] bg-white p-6 text-tinta">
                    <p
                      className={cn(
                        "font-display text-[length:var(--text-number)] font-extrabold leading-none",
                        ind.tema === "amarelo" ? "text-tinta" : t.text,
                      )}
                    >
                      <span className={cn("inline-block", ind.tema === "amarelo" && "bg-[linear-gradient(transparent_62%,#F4B823_62%)]")}>
                        <Counter valor={ind.valor} sufixo={ind.sufixo} formato={ind.formato} />
                      </span>
                    </p>
                    <p className="mt-2 font-display text-xl font-bold leading-tight">{ind.rotulo}</p>
                    <p className="mt-2 text-[0.9375rem] text-tinta-suave">{ind.contexto}</p>
                    <p className="mt-3 text-xs font-semibold text-tinta-suave/80">Fonte: {ind.fonte}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
