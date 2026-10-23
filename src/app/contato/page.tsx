import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Formulario, type Campo } from "@/components/forms/Formulario";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { FacebookIcon } from "@/components/ui/Icon";
import { MapaEmbed } from "@/components/ui/MapaEmbed";
import { organization, whatsappUrl } from "@/data/organization";
import { getUnidades } from "@/lib/content";
import { assuntosContato } from "@/lib/forms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Contato",
  descricao: "Fale com a ACEG: telefone, WhatsApp, e-mail, endereço da sede, mapa e formulário de contato.",
  caminho: "/contato",
});

const campos: Campo[] = [
  { nome: "nome", rotulo: "Nome completo", tipo: "text", obrigatorio: true, autoComplete: "name" },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", largura: "metade" },
  { nome: "telefone", rotulo: "Telefone", tipo: "tel", autoComplete: "tel", largura: "metade" },
  { nome: "assunto", rotulo: "Assunto", tipo: "select", obrigatorio: true, opcoes: assuntosContato },
  { nome: "mensagem", rotulo: "Mensagem", tipo: "textarea", obrigatorio: true },
];

export default function ContatoPage() {
  const { contatos, redes } = organization;
  const sede = getUnidades().find((u) => u.tipo === "sede");
  const cei = getUnidades().find((u) => u.slug === "cei-pequenos-genios");

  const canais = [
    { icone: Phone, titulo: "Telefone", valor: contatos.telefoneFixo.exibicao, href: `tel:${contatos.telefoneFixo.tel}` },
    { icone: MessageCircle, titulo: "WhatsApp", valor: contatos.whatsapp.exibicao, href: whatsappUrl() },
    { icone: Mail, titulo: "E-mail", valor: contatos.email.endereco, href: `mailto:${contatos.email.endereco}` },
  ];

  return (
    <>
      <PageHero
        tema="vermelho"
        eyebrow="Contato"
        titulo="Vamos conversar?"
        texto="Escolha o canal que for mais fácil. Estamos aqui para receber famílias, voluntários, parceiros e imprensa."
        crumbs={[{ label: "Contato" }]}
      />

      <section className="section-y" aria-label="Canais de contato">
        <div className="container-aceg grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="min-w-0 space-y-5">
            <ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3">
              {canais.map((c) => (
                <li key={c.titulo}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-[4.5rem] items-center gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-4 transition hover:shadow-lift motion-safe:hover:-translate-y-0.5"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-rosa text-abraco">
                      <c.icone aria-hidden="true" size={24} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-extrabold uppercase tracking-wider text-tinta-suave">{c.titulo}</span>
                      <span className="block break-words font-display text-xl font-bold leading-tight">{c.valor}</span>
                    </span>
                  </a>
                </li>
              ))}
              {redes.map((r) => (
                <li key={r.id}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[4.5rem] items-center gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-4 transition hover:shadow-lift motion-safe:hover:-translate-y-0.5"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ceu text-comunidade">
                      <FacebookIcon size={24} />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Redes sociais</span>
                      <span className="block font-display text-xl font-bold leading-tight">{r.nome} da ACEG</span>
                    </span>
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-[var(--radius-card)] bg-areia p-6">
              <h2 className="text-xl">Endereços</h2>
              <ul className="mt-4 space-y-4">
                {[sede, cei].filter(Boolean).map((u) => (
                  <li key={u!.slug} className="flex gap-3">
                    <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0 text-abraco" />
                    <div>
                      <p className="font-extrabold">{u!.titulo}</p>
                      <p className="text-tinta-suave">{u!.endereco}</p>
                      {u!.complemento && <p className="text-sm text-tinta-suave">{u!.complemento}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <Button href="/unidades" variante="texto" seta className="mt-4">Ver todas as unidades</Button>
            </div>
          </div>

          <div className="rounded-[var(--radius-card-lg)] bg-white p-6 shadow-soft sm:p-9">
            <h2 className="text-[length:var(--text-h3)]">Envie uma mensagem</h2>
            <p className="mt-2 mb-6 text-tinta-suave">Responderemos pelo e-mail ou telefone informado.</p>
            <Formulario tipo="contato" campos={campos} />
          </div>
        </div>
      </section>

      {sede?.enderecoMapa && (
        <section aria-labelledby="t-mapa" className="bg-white py-12 sm:py-16">
          <div className="container-aceg">
            <h2 id="t-mapa" className="text-[length:var(--text-h3)]">Como chegar à sede</h2>
            <div className="mt-6">
              <MapaEmbed endereco={sede.enderecoMapa} titulo={sede.titulo} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
