import { PageHero } from "@/components/sections/PageHero";
import { organization } from "@/data/organization";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  titulo: "Política de privacidade",
  descricao: "Como a ACEG trata dados pessoais coletados por este site, em conformidade com a LGPD.",
  caminho: "/privacidade",
});

const secoes: { id: string; titulo: string; corpo: React.ReactNode }[] = [
  {
    id: "quem",
    titulo: "1. Quem é o controlador dos dados",
    corpo: (
      <p>
        A {organization.nomeCompleto} (ACEG) é a responsável pelo tratamento dos dados pessoais coletados neste site. Para falar sobre privacidade, escreva para{" "}
        <a href={`mailto:${organization.contatos.email.endereco}`}>{organization.contatos.email.endereco}</a>.
      </p>
    ),
  },
  {
    id: "dados",
    titulo: "2. Quais dados coletamos",
    corpo: (
      <>
        <p>Coletamos somente o que você escreve nos formulários do site, e apenas o necessário para atendê-lo:</p>
        <ul>
          <li>Formulário de contato: nome, e-mail, telefone (opcional), assunto e mensagem.</li>
          <li>Cadastro de voluntários: nome, e-mail, telefone, área de interesse e mensagem.</li>
          <li>Proposta de parceria: nome da empresa ou organização, nome do contato, e-mail, telefone (opcional), tipo de parceria e mensagem.</li>
        </ul>
        <p>Não pedimos dados de crianças nem documentos pessoais. Pedimos que não inclua nas mensagens informações sensíveis (como saúde ou religião) nem dados de menores.</p>
      </>
    ),
  },
  {
    id: "finalidade",
    titulo: "3. Para que usamos e qual a base legal",
    corpo: (
      <p>
        Usamos os dados exclusivamente para responder à sua mensagem, avaliar seu interesse em voluntariar-se ou em propor uma parceria. A base legal é o seu{" "}
        <strong>consentimento</strong> (LGPD, art. 7º, I), dado ao marcar a caixa de concordância antes do envio. Não usamos os dados para publicidade nem os vendemos.
      </p>
    ),
  },
  {
    id: "compartilhamento",
    titulo: "4. Com quem os dados podem ser compartilhados",
    corpo: (
      <>
        <p>
          As mensagens são entregues por e-mail aos responsáveis da ACEG, por meio de um serviço de envio de e-mail contratado pela associação. Os dados não são
          compartilhados com terceiros para outros fins.
        </p>
        <p>
          O <strong>mapa</strong> das unidades só é carregado quando você clica em “Carregar mapa”; nesse momento, o Google Maps recebe dados técnicos da sua visita
          (como o endereço IP), segundo a política do próprio serviço. Links para redes sociais e para compartilhamento levam a sites de terceiros, com políticas próprias.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    titulo: "5. Cookies e rastreadores",
    corpo: (
      <p>
        Este site <strong>não usa cookies de publicidade, estatísticas ou rastreamento</strong>. As fontes são hospedadas no próprio site. Se, no futuro, ferramentas de
        medição forem adotadas, esta política será atualizada e o consentimento será solicitado antes de ativá-las.
      </p>
    ),
  },
  {
    id: "retencao",
    titulo: "6. Por quanto tempo guardamos",
    corpo: (
      <p>
        Mantemos as mensagens pelo tempo necessário para atender ao seu pedido e para cumprir obrigações legais. Depois disso, elas são eliminadas. O site não mantém um
        banco de dados com as mensagens: elas permanecem apenas na caixa de e-mail da associação.
      </p>
    ),
  },
  {
    id: "seguranca",
    titulo: "7. Segurança",
    corpo: (
      <p>
        Os formulários são validados no navegador e no servidor, possuem proteção contra envio automático (spam) e limitação de tentativas. Não registramos o conteúdo das
        mensagens nos logs do site.
      </p>
    ),
  },
  {
    id: "direitos",
    titulo: "8. Seus direitos",
    corpo: (
      <p>
        Conforme a LGPD (art. 18), você pode pedir confirmação de tratamento, acesso, correção, anonimização, eliminação dos dados, informações sobre compartilhamento e a
        revogação do consentimento a qualquer momento. Basta escrever para{" "}
        <a href={`mailto:${organization.contatos.email.endereco}`}>{organization.contatos.email.endereco}</a>. Você também pode recorrer à Autoridade Nacional de Proteção de
        Dados (ANPD).
      </p>
    ),
  },
  {
    id: "atualizacoes",
    titulo: "9. Atualizações",
    corpo: <p>Esta política pode ser atualizada. A data da última revisão aparece no topo desta página.</p>,
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        tema="azul"
        eyebrow="Privacidade"
        titulo="Política de privacidade"
        texto="Transparência sobre como cuidamos dos seus dados pessoais, em linguagem simples."
        crumbs={[{ label: "Política de privacidade" }]}
      >
        <p className="text-sm font-bold text-tinta-suave">Última revisão: outubro de 2026</p>
      </PageHero>
      <section className="section-y">
        <div className="container-aceg grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Seções da política" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2 text-[0.9375rem]">
              {secoes.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="font-bold text-tinta-suave underline-offset-4 hover:text-comunidade hover:underline">
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10">
            {secoes.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`}>
                <h2 id={`h-${s.id}`} className="text-[length:var(--text-h3)]">{s.titulo}</h2>
                <div className="prose-aceg mt-3 text-lg text-tinta-suave">{s.corpo}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
