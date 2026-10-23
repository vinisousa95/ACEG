import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/organization";
import { getProjetos, getPublicacoes, getUnidades } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ["", "/quem-somos", "/projetos", "/unidades", "/noticias", "/transparencia", "/como-apoiar", "/galeria", "/contato", "/privacidade"];
  return [
    ...estaticas.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: p === "" || p === "/noticias" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : 0.7,
    })),
    ...getProjetos().map((p) => ({ url: `${SITE_URL}/projetos/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getUnidades().map((u) => ({ url: `${SITE_URL}/unidades/${u.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getPublicacoes().map((n) => ({ url: `${SITE_URL}/noticias/${n.slug}`, lastModified: new Date(n.data), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
