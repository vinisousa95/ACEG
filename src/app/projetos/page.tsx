import { PageHero } from "@/components/sections/PageHero";
import { ProjetosLista } from "@/components/projects/ProjetosLista";
import { ChamadaApoio } from "@/components/sections/ChamadaApoio";
import { getProjetos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Nossos projetos",
  descricao:
    "Educação infantil, oficinas de artesanato, produtos sociais e ações comunitárias: conheça os projetos da ACEG.",
  caminho: "/projetos",
});

export default function ProjetosPage() {
  const projetos = getProjetos();
  return (
    <>
      <PageHero
        tema="verde"
        eyebrow="Nossos projetos"
        titulo="Ações que transformam o dia a dia da comunidade"
        texto="Projetos atuais e históricos da ACEG, apresentados com o que está documentado em nossos registros."
        crumbs={[{ label: "Nossos projetos" }]}
      />
      <section className="section-y" aria-label="Lista de projetos">
        <div className="container-aceg">
          <h2 className="sr-only">Lista de projetos</h2>
          <ProjetosLista projetos={projetos} />
          <p className="mt-10 rounded-[var(--radius-card)] bg-white p-5 text-sm text-tinta-suave">
            Projetos identificados como <strong className="text-tinta">históricos</strong> reúnem registros de ações já realizadas, e não de
            atividades atuais. Novos projetos são incluídos aqui assim que são publicados pela ACEG.
          </p>
        </div>
      </section>
      <ChamadaApoio />
    </>
  );
}
