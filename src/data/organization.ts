/**
 * Dados institucionais centralizados. Edite aqui — nenhum componente
 * deve ter telefone, endereço ou link escrito diretamente.
 *
 * `validado: false` = veio do site antigo e ainda precisa de confirmação
 * da ACEG antes do lançamento (ver docs/PENDENCIAS.md).
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const organization = {
  nome: "ACEG",
  nomeCompleto: "Associação Comunitária Eugênio Góes",
  slogan: "Abraço em rede.",
  descricaoCurta:
    "A ACEG promove educação, acolhimento e desenvolvimento social, fortalecendo crianças, famílias e comunidades.",
  descricaoLonga:
    "Associação comunitária que atua em São Paulo (SP) com educação infantil, ações comunitárias, oficinas e produtos sociais, a partir do sonho de Eugênio Góes de proporcionar um mundo melhor para a comunidade.",
  cidade: "São Paulo",
  uf: "SP",
  idioma: "pt-BR",
  fundacaoProjeto: 2009,

  contatos: {
    telefoneFixo: {
      rotulo: "Telefone fixo",
      exibicao: "(11) 3442-6328",
      tel: "+551134426328",
      validado: false,
    },
    whatsapp: {
      rotulo: "WhatsApp",
      exibicao: "(11) 99298-8061",
      numero: "5511992988061",
      mensagemPadrao: "Olá! Gostaria de saber mais sobre a ACEG.",
      validado: false,
    },
    email: {
      rotulo: "E-mail institucional",
      endereco: "aceg.eugeniogoes@outlook.com",
      validado: false,
    },
  },

  redes: [
    {
      id: "facebook",
      nome: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100070619625740",
      validado: false,
    },
  ],

  /**
   * PIX: a chave aparece no site antigo (publicação de 03/02/2016), mas a
   * titularidade NÃO foi confirmada. Enquanto `validado` for false o site não
   * exibe a chave nem gera QR Code. Ao confirmar, preencha `beneficiario`,
   * `instituicao` e troque `validado` para true.
   */
  pix: {
    chave: "96d69ece-5cf3-4ece-9fe2-df6d4b370f27",
    tipoChave: "Chave aleatória",
    beneficiario: "",
    instituicao: "",
    validado: false,
  },
} as const;

export function whatsappUrl(mensagem?: string): string {
  const texto = encodeURIComponent(mensagem ?? organization.contatos.whatsapp.mensagemPadrao);
  return `https://wa.me/${organization.contatos.whatsapp.numero}?text=${texto}`;
}

export function rotasUrl(endereco: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}`;
}

export function mapaEmbedUrl(endereco: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`;
}
