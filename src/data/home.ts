/**
 * Mídia da Home. Quando houver fotografia autêntica e autorizada,
 * preencha `heroFoto` e ela entra automaticamente na moldura em arco.
 */
export const heroFoto: { src: string; alt: string } | null = null;

export const historiasHome = [
  {
    id: "sonho",
    tema: "azul" as const,
    eyebrow: "Origem",
    titulo: "O sonho de Eugênio Góes",
    texto:
      "Criado em uma casa de barro, em Mirassol, Eugênio trabalhou desde menino, estudou até a quarta série e passou a vida ajudando a comunidade. Seu sonho de proporcionar um mundo melhor começou a virar realidade em 2009.",
    href: "/quem-somos#historia",
    cta: "Conheça a história",
  },
  {
    id: "sabao",
    tema: "verde" as const,
    eyebrow: "Produto social",
    titulo: "O sabão que cuida do meio ambiente",
    texto:
      "A venda do sabão artesanal ajuda a manter os projetos sociais com as crianças e a cuidar do meio ambiente.",
    href: "/projetos/sabao-artesanal",
    cta: "Conheça o projeto",
    imagem: "/images/sabao-artesanal.jpg",
    imagemAlt: "Cinco barras de sabão artesanal embaladas, com rótulo da ACEG, sobre uma superfície de madeira.",
  },
  {
    id: "parceiros",
    tema: "amarelo" as const,
    eyebrow: "Gratidão",
    titulo: "Parceiros que fazem a festa",
    texto:
      "Em 2014, alunos do 3º ano do ensino médio da Escola Alberto Conte, pelo terceiro ano seguido, e um grupo de amigos reuniram presentes para as crianças. A ACEG registrou o agradecimento no livro de visitas.",
    href: "/projetos/festas-e-confraternizacoes",
    cta: "Veja as festas",
  },
];
