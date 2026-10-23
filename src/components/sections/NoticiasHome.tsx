import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/ui/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Publicacao } from "@/lib/content";

export function NoticiasHome({ publicacoes }: { publicacoes: Publicacao[] }) {
  return (
    <section aria-labelledby="titulo-noticias" className="section-y">
      <div className="container-aceg">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="titulo-noticias" eyebrow="Notícias e acontecimentos" titulo="O que está acontecendo na ACEG" />
          <Button href="/noticias" variante="contorno" seta className="shrink-0 self-start sm:self-auto">
            Ver todas as notícias
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicacoes.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <NewsCard pub={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
