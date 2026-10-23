import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { GaleriaGrid } from "@/components/gallery/GaleriaGrid";
import { getGaleria } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Galeria de fotos",
  descricao: "Fotografias de projetos, eventos, unidades, oficinas e ações comunitárias da ACEG.",
  caminho: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        tema="amarelo"
        eyebrow="Galeria"
        titulo="A ACEG em imagens"
        texto="Registros de oficinas, ações comunitárias, eventos e unidades."
        crumbs={[{ label: "Galeria de fotos" }]}
      />
      <section className="section-y" aria-label="Fotografias">
        <div className="container-aceg">
          <GaleriaGrid fotos={getGaleria()} />
          <p className="mt-12 flex gap-3 rounded-[var(--radius-card)] bg-white p-5 text-sm text-tinta-suave ring-1 ring-borda">
            <ShieldCheck aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-semente" />
            <span>
              Protegemos a identidade das crianças: só publicamos imagens com autorização específica. Use as setas do teclado para navegar na galeria ampliada.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
