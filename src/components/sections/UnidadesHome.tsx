import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnitCard } from "@/components/ui/UnitCard";
import type { Unidade } from "@/lib/content";

export function UnidadesHome({ unidades }: { unidades: Unidade[] }) {
  const destaque = unidades.filter((u) => u.endereco).slice(0, 2);
  const demais = unidades.filter((u) => !destaque.includes(u));
  return (
    <section aria-labelledby="titulo-unidades" className="section-y">
      <div className="container-aceg">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="titulo-unidades"
            eyebrow="Nossa presença na comunidade"
            titulo="Creches e sede social, uma só rede"
            texto="Cada unidade tem sua identidade; juntas formam o abraço da ACEG no território."
          />
          <Button href="/unidades" variante="contorno" seta className="shrink-0 self-start sm:self-auto">
            Ver todas as unidades
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
          {destaque.map((u, i) => (
            <Reveal key={u.slug} delay={i * 80}>
              <UnitCard unidade={u} />
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] bg-ceu p-6">
              <p className="eyebrow text-comunidade">Também na rede</p>
              <h3 className="mt-2">Outras unidades de educação infantil</h3>
              <ul className="mt-4 flex flex-1 flex-col gap-2">
                {demais.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/unidades/${u.slug}`}
                      className="flex min-h-12 items-center justify-between rounded-full bg-white px-5 font-bold transition hover:bg-creme hover:shadow-soft"
                    >
                      {u.titulo.replace("CEI Pequenos Gênios", "Pequenos Gênios")}
                      <span aria-hidden="true" className="text-comunidade">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-tinta-suave">Endereços e contatos destas unidades são publicados após confirmação.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
