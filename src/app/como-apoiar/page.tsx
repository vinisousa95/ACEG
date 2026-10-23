import Link from "next/link";
import { Handshake, HandHeart, HeartHandshake, ShieldCheck, Sprout } from "lucide-react";
import { Formulario, type Campo } from "@/components/forms/Formulario";
import { PixCard } from "@/components/forms/PixCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SeloBranco } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcoAberto, Circulo, QuartoDeCirculo } from "@/components/ui/Shapes";
import { organization, whatsappUrl } from "@/data/organization";
import { parceriasRegistradas } from "@/data/institucional";
import { areasVoluntariado, tiposParceria } from "@/lib/forms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Como apoiar",
  descricao: "Faça uma doação, seja voluntário ou torne sua empresa parceira da ACEG e ajude a fortalecer crianças, famílias e comunidades.",
  caminho: "/como-apoiar",
});

const camposVoluntariado: Campo[] = [
  { nome: "nome", rotulo: "Nome completo", tipo: "text", obrigatorio: true, autoComplete: "name" },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", largura: "metade" },
  { nome: "telefone", rotulo: "Telefone com DDD", tipo: "tel", obrigatorio: true, autoComplete: "tel", largura: "metade" },
  { nome: "area", rotulo: "Área de interesse", tipo: "select", obrigatorio: true, opcoes: areasVoluntariado },
  { nome: "mensagem", rotulo: "Conte um pouco sobre você e sua disponibilidade", tipo: "textarea", obrigatorio: true },
];

const camposParceria: Campo[] = [
  { nome: "organizacao", rotulo: "Empresa ou organização", tipo: "text", obrigatorio: true, autoComplete: "organization" },
  { nome: "nome", rotulo: "Nome do contato", tipo: "text", obrigatorio: true, autoComplete: "name" },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", largura: "metade" },
  { nome: "telefone", rotulo: "Telefone", tipo: "tel", autoComplete: "tel", largura: "metade" },
  { nome: "tipo", rotulo: "Tipo de parceria", tipo: "select", obrigatorio: true, opcoes: tiposParceria },
  { nome: "mensagem", rotulo: "Como você gostaria de apoiar?", tipo: "textarea", obrigatorio: true },
];

const atalhos = [
  { href: "#doacoes", titulo: "Doações", texto: "Contribua com as atividades da ACEG.", icone: HandHeart, cor: "bg-rosa text-abraco" },
  { href: "#voluntariado", titulo: "Voluntariado", texto: "Doe seu tempo e seus talentos.", icone: HeartHandshake, cor: "bg-folha text-semente" },
  { href: "#parcerias", titulo: "Parcerias", texto: "Para empresas e organizações.", icone: Handshake, cor: "bg-ceu text-comunidade" },
];

export default function ComoApoiarPage() {
  const { pix } = organization;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-abraco text-white">
        <ArcoAberto cor="branco" className="absolute -right-24 -top-28 -z-10 w-96 opacity-15 sm:w-[32rem]" />
        <QuartoDeCirculo cor="sol" className="absolute -bottom-px -left-px -z-10 w-28 -rotate-90 sm:w-44" />
        <Circulo cor="comunidade" className="absolute right-[12%] top-1/2 -z-10 hidden w-14 lg:block" />
        <div className="container-aceg py-8 sm:py-12 lg:py-16">
          <Breadcrumbs claro itens={[{ label: "Como apoiar" }]} />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SeloBranco tamanho={72} className="mb-5 size-16" />
              <p className="eyebrow text-white">Como apoiar</p>
              <h1 className="mt-3 text-white">Uma comunidade mais forte começa com a participação de todos.</h1>
              <p className="lead mt-5 max-w-2xl !text-white/90">
                Há muitas formas de abraçar a ACEG: contribuindo financeiramente, doando tempo e talento ou construindo uma parceria institucional.
              </p>
            </div>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {atalhos.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="group flex min-h-20 items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 text-tinta transition duration-200 hover:bg-creme motion-safe:hover:-translate-y-0.5"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-full ${a.cor}`}>
                    <a.icone aria-hidden="true" size={24} />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold leading-tight">{a.titulo}</span>
                    <span className="text-sm text-tinta-suave">{a.texto}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doações */}
      <section id="doacoes" aria-labelledby="t-doacoes" className="section-y">
        <div className="container-aceg grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="t-doacoes"
              eyebrow="Doações"
              titulo="Sua contribuição mantém os projetos de pé"
              texto="A ACEG aceita doações para manter suas atividades sociais com as crianças e as famílias da comunidade."
            />
            <ul className="mt-8 space-y-4">
              <li className="flex gap-4 rounded-[var(--radius-card)] border border-borda bg-white p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-folha text-semente">
                  <Sprout aria-hidden="true" size={24} />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold leading-tight">Compre um produto social</span>
                  <span className="text-[0.9375rem] text-tinta-suave">
                    Com a venda do sabão artesanal, a ACEG cuida do meio ambiente e mantém seus projetos sociais.{" "}
                    <Link href="/projetos/sabao-artesanal" className="font-bold text-comunidade underline">Conheça o projeto</Link>.
                  </span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            {pix.validado ? (
              <PixCard chave={pix.chave} tipoChave={pix.tipoChave} beneficiario={pix.beneficiario} instituicao={pix.instituicao} />
            ) : (
              <div className="relative isolate overflow-hidden rounded-[var(--radius-card-lg)] bg-rosa p-7 sm:p-9">
                <ArcoAberto cor="abraco" className="absolute -right-14 -top-14 -z-10 w-52 opacity-20" />
                <ShieldCheck aria-hidden="true" size={36} className="text-abraco" />
                <h3 className="mt-3">Doação financeira: dados oficiais em confirmação</h3>
                <p className="mt-3 text-tinta-suave">
                  Para a sua segurança, só divulgaremos a chave PIX e os dados bancários depois que a associação confirmar a titularidade. Enquanto isso, fale
                  diretamente com a ACEG para saber como contribuir.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={whatsappUrl("Olá! Gostaria de fazer uma doação para a ACEG.")} seta>Perguntar pelo WhatsApp</Button>
                  <Button href="/contato" variante="contorno">Outros contatos</Button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Voluntariado */}
      <section id="voluntariado" aria-labelledby="t-voluntariado" className="relative overflow-hidden bg-folha section-y">
        <Circulo cor="creme" className="absolute -left-16 top-16 w-56 opacity-80" />
        <div className="container-aceg relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="t-voluntariado"
              eyebrow="Voluntariado"
              titulo="Doe seu tempo, seu talento e seu carinho"
              texto="Voluntários fortalecem oficinas, ações comunitárias e eventos da ACEG. Conte onde você gostaria de ajudar e entraremos em contato."
            />
            <ul className="mt-8 space-y-3 text-tinta-suave">
              {areasVoluntariado.slice(0, 5).map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-3 rounded-full bg-semente" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-[var(--radius-card-lg)] bg-white p-6 shadow-soft sm:p-9">
              <h3 className="mb-5">Quero ser voluntário</h3>
              <Formulario
                tipo="voluntariado"
                campos={camposVoluntariado}
                rotuloEnvio="Enviar cadastro"
                sucessoTitulo="Cadastro enviado!"
                sucessoTexto="Obrigado por querer fazer parte. A equipe da ACEG entrará em contato."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Parcerias */}
      <section id="parcerias" aria-labelledby="t-parcerias" className="section-y">
        <div className="container-aceg grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-[var(--radius-card-lg)] bg-white p-6 shadow-soft sm:p-9">
              <h3 className="mb-5">Proposta de parceria</h3>
              <Formulario
                tipo="parcerias"
                campos={camposParceria}
                rotuloEnvio="Enviar proposta"
                sucessoTitulo="Proposta enviada!"
                sucessoTexto="Agradecemos o interesse. A ACEG responderá ao contato informado."
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <SectionHeading
              id="t-parcerias"
              eyebrow="Parcerias"
              titulo="Empresas e organizações que somam"
              texto="Parcerias já fizeram festas, ações de cuidado e convênios acontecerem. Veja alguns registros e proponha a sua."
            />
            <ul className="mt-8 space-y-3">
              {parceriasRegistradas.map((p) => (
                <li key={p.nome} className="rounded-[var(--radius-card)] border border-borda bg-white p-4">
                  <p className="font-display text-lg font-bold leading-tight">{p.nome}</p>
                  <p className="text-sm text-tinta-suave">{p.detalhe}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
