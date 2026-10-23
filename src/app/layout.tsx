import type { Metadata, Viewport } from "next";
import "@fontsource-variable/baloo-2/wght.css";
import "@fontsource-variable/nunito-sans/wght.css";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { organization, SITE_URL } from "@/data/organization";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${organization.nome} – ${organization.nomeCompleto}`,
    template: `%s | ${organization.nome}`,
  },
  description: organization.descricaoCurta,
  applicationName: organization.nome,
  openGraph: { siteName: organization.nomeCompleto, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#FFF7E8",
  width: "device-width",
  initialScale: 1,
};

const organizacaoJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organizacao`,
  name: organization.nomeCompleto,
  alternateName: organization.nome,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo/ACEG_colorido_horizontal.svg`,
  image: `${SITE_URL}/og.png`,
  description: organization.descricaoLonga,
  foundingDate: String(organization.fundacaoProjeto),
  email: organization.contatos.email.endereco,
  telephone: organization.contatos.telefoneFixo.tel,
  sameAs: organization.redes.map((r) => r.url),
  areaServed: { "@type": "City", name: organization.cidade },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Dapoli, 9",
    addressLocality: organization.cidade,
    addressRegion: organization.uf,
    postalCode: "04913-080",
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Habilita animações de entrada apenas quando há JS; sem JS o conteúdo aparece direto. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('anim')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd dados={organizacaoJsonLd} />
      </body>
    </html>
  );
}
