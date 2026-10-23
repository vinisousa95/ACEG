import type { Metadata } from "next";
import { organization, SITE_URL } from "@/data/organization";

export function buildMetadata({
  titulo,
  descricao,
  caminho,
  imagem,
  tipo = "website",
  publicadoEm,
  noindex = false,
}: {
  titulo: string;
  descricao: string;
  caminho: string;
  imagem?: string;
  tipo?: "website" | "article";
  publicadoEm?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${caminho}`;
  const img = imagem ? (imagem.startsWith("http") ? imagem : `${SITE_URL}${imagem}`) : `${SITE_URL}/og.png`;
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: titulo,
      description: descricao,
      url,
      siteName: organization.nomeCompleto,
      locale: "pt_BR",
      type: tipo,
      ...(tipo === "article" && publicadoEm ? { publishedTime: publicadoEm } : {}),
      images: [{ url: img, width: 1200, height: 630, alt: titulo }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [img] },
  };
}
