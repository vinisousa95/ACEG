import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Circulo, Semicirculo } from "@/components/ui/Shapes";
import { areasDeAtuacao, origemAcao } from "@/data/institucional";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";

export function QuemSomosHome() {
  return (
    <section aria-labelledby="titulo-quem-somos" className="section-y overflow-hidden">
      <div className="container-aceg grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[78%]">
            <Circulo cor="areia" className="absolute -bottom-[8%] -left-[18%] w-[62%]" />
            <Semicirculo cor="sol" className="absolute -right-[16%] top-[14%] w-[34%] rotate-90" />
            <div className="absolute inset-0">
              <PhotoFrame
                tema="amarelo"
                forma="arco"
                proporcao="h-full w-full"
                rotulo="Foto da comunidade ACEG — a incluir após aprovação"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SectionHeading
            id="titulo-quem-somos"
            eyebrow="Quem somos"
            titulo="Uma associação nascida do cuidado entre vizinhos"
          />
          <div className="mt-5 space-y-4 text-lg text-tinta-suave">
            <p>{origemAcao.textoCurto}</p>
            <p>
              O nome homenageia <strong className="text-tinta">Eugênio Góes</strong>, que acreditava na união, na honestidade e no respeito entre todos. Seu sonho de
              proporcionar um mundo melhor para a comunidade começou a se tornar realidade em 2009.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {areasDeAtuacao.map((a) => {
              const t = temas[a.tema];
              return (
                <li key={a.titulo} className="rounded-[var(--radius-card)] border border-borda bg-white p-4">
                  <span className={cn("grid size-11 place-items-center rounded-full", t.soft, t.text)}>
                    <Icon nome={a.icone} size={22} />
                  </span>
                  <p className="mt-3 font-display text-lg font-bold leading-tight">{a.titulo}</p>
                  <p className="mt-1 text-sm text-tinta-suave">{a.texto}</p>
                </li>
              );
            })}
          </ul>

          <Button href="/quem-somos" variante="azul" seta className="mt-8">
            Conheça nossa história
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
