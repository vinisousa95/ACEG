import { Hero } from "@/components/sections/Hero";
import { Impacto } from "@/components/sections/Impacto";
import { QuemSomosHome } from "@/components/sections/QuemSomosHome";
import { ProjetosHome } from "@/components/sections/ProjetosHome";
import { UnidadesHome } from "@/components/sections/UnidadesHome";
import { HistoriasHome } from "@/components/sections/HistoriasHome";
import { NoticiasHome } from "@/components/sections/NoticiasHome";
import { ChamadaApoio } from "@/components/sections/ChamadaApoio";
import { buildMetadata } from "@/lib/seo";
import { getIndicadores, getProjetos, getPublicacoes, getUnidades } from "@/lib/content";
import { organization } from "@/data/organization";

export const metadata = buildMetadata({
  titulo: `${organization.nome} – ${organization.nomeCompleto}`,
  descricao: organization.descricaoCurta,
  caminho: "/",
});

export const revalidate = 3600;

export default function Home() {
  const unidades = getUnidades();
  const cei = unidades.filter((u) => u.tipo === "creche").length;
  return (
    <>
      <Hero unidadesCei={cei} />
      <Impacto indicadores={getIndicadores(true)} />
      <QuemSomosHome />
      <ProjetosHome projetos={getProjetos().slice(0, 6)} />
      <UnidadesHome unidades={unidades} />
      <HistoriasHome />
      <NoticiasHome publicacoes={getPublicacoes().slice(0, 3)} />
      <ChamadaApoio />
    </>
  );
}
