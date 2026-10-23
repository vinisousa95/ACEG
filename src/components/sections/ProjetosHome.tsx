import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Circulo } from "@/components/ui/Shapes";
import type { Projeto } from "@/lib/content";

export function ProjetosHome({ projetos }: { projetos: Projeto[] }) {
  return (
    <section aria-labelledby="titulo-projetos" className="relative overflow-hidden bg-white section-y">
      <Circulo cor="folha" className="absolute -right-16 top-10 w-48 sm:w-64" />
      <div className="container-aceg relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="titulo-projetos"
            eyebrow="Nossos projetos"
            titulo="Educação, cuidado e renda para a comunidade"
            texto="Conheça as frentes de atuação da ACEG, todas documentadas em nossos registros."
          />
          <Button href="/projetos" variante="contorno" seta className="shrink-0 self-start sm:self-auto">
            Ver todos os projetos
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
              <ProjectCard projeto={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
