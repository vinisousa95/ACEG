import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { DocumentosLista } from "@/components/transparency/DocumentosLista";
import { getDocumentos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { organization } from "@/data/organization";

export const metadata = buildMetadata({
  titulo: "Transparência",
  descricao: "Documentos públicos da ACEG: editais, estatuto, relatórios, prestação de contas, convênios e parcerias.",
  caminho: "/transparencia",
});

export default function TransparenciaPage() {
  const docs = getDocumentos();
  return (
    <>
      <PageHero
        tema="azul"
        eyebrow="Transparência"
        titulo="Documentos públicos para consulta"
        texto="Credibilidade se constrói com abertura. Aqui ficam os documentos oficiais da ACEG, organizados por categoria e ano."
        crumbs={[{ label: "Transparência" }]}
      />
      <section className="section-y" aria-label="Documentos">
        <div className="container-aceg">
          <h2 className="sr-only">Lista de documentos</h2>
          <DocumentosLista documentos={docs} />
          <p className="mt-12 flex gap-3 rounded-[var(--radius-card)] bg-white p-5 text-sm text-tinta-suave ring-1 ring-borda">
            <ShieldCheck aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-semente" />
            <span>
              Publicamos somente documentos reais e verificáveis. Para solicitar um documento que não esteja listado, escreva para{" "}
              <a className="font-bold text-comunidade underline" href={`mailto:${organization.contatos.email.endereco}`}>
                {organization.contatos.email.endereco}
              </a>
              .
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
