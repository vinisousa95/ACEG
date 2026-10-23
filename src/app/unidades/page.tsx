import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { MapaEmbed } from "@/components/ui/MapaEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnitCard } from "@/components/ui/UnitCard";
import { ChamadaApoio } from "@/components/sections/ChamadaApoio";
import { getUnidades } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Unidades e creches",
  descricao: "Conheça a sede social e as unidades de educação infantil CEI Pequenos Gênios, que formam a rede da ACEG.",
  caminho: "/unidades",
});

export default function UnidadesPage() {
  const unidades = getUnidades();
  const sede = unidades.filter((u) => u.tipo !== "creche");
  const creches = unidades.filter((u) => u.tipo === "creche");
  const comEndereco = unidades.filter((u) => u.enderecoMapa);

  return (
    <>
      <PageHero
        tema="azul"
        eyebrow="Unidades e creches"
        titulo="Uma rede de educação infantil e uma sede social"
        texto="As unidades da ACEG estão no território onde as famílias vivem. Aqui estão as unidades confirmadas, com endereço e contato quando disponíveis."
        crumbs={[{ label: "Unidades" }]}
      />

      <section aria-labelledby="t-educacao" className="section-y">
        <div className="container-aceg grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading id="t-educacao" eyebrow="Educação infantil" titulo="Creches CEI Pequenos Gênios" />
          <div className="space-y-4 text-lg text-tinta-suave">
            <p>
              A rede de educação infantil da ACEG é formada por unidades identificadas como <strong className="text-tinta">CEI Pequenos Gênios</strong>. Cada unidade publica seu
              edital de bolsas de estudo social 100% gratuitas e em tempo integral, para consulta pública.
            </p>
            <p>Para se candidatar, a família deve procurar a secretaria da unidade, preencher o cadastro socioeconômico e passar por entrevista.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="t-sede" className="bg-white section-y">
        <div className="container-aceg">
          <h2 id="t-sede" className="text-[length:var(--text-h2)]">Sede social</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sede.map((u) => (
              <Reveal as="li" key={u.slug}>
                <UnitCard unidade={u} />
              </Reveal>
            ))}
          </ul>

          <h2 className="mt-16 text-[length:var(--text-h2)]">Creches · educação infantil</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creches.map((u, i) => (
              <Reveal as="li" key={u.slug} delay={(i % 3) * 70}>
                <UnitCard unidade={u} />
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 flex gap-3 rounded-[var(--radius-card)] bg-ceu p-5 text-sm text-tinta-suave">
            <Info aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-comunidade" />
            <span>
              Só exibimos informações confirmadas. Endereços e contatos das demais unidades serão publicados assim que forem validados pela associação.
            </span>
          </p>
        </div>
      </section>

      {comEndereco.length > 0 && (
        <section aria-labelledby="t-mapas" className="section-y">
          <div className="container-aceg">
            <SectionHeading id="t-mapas" eyebrow="Como chegar" titulo="Encontre a unidade mais próxima" />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {comEndereco.map((u) => (
                <div key={u.slug}>
                  <h3 className="mb-3 text-xl">{u.titulo}</h3>
                  <MapaEmbed endereco={u.enderecoMapa!} titulo={u.titulo} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <ChamadaApoio />
    </>
  );
}
