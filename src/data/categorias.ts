import type { Tema } from "@/lib/theme";

export type CategoriaProjeto = "educacao" | "oficinas" | "sustentabilidade" | "comunidade" | "cultura";

export const categoriasProjeto: Record<
  CategoriaProjeto,
  { rotulo: string; tema: Tema; descricao: string; icone: string }
> = {
  educacao: {
    rotulo: "Educação",
    tema: "azul",
    descricao: "Educação infantil e complemento educacional.",
    icone: "book-open",
  },
  oficinas: {
    rotulo: "Oficinas e capacitação",
    tema: "verde",
    descricao: "Aprendizado, geração de renda e autonomia.",
    icone: "scissors",
  },
  sustentabilidade: {
    rotulo: "Sustentabilidade e produtos sociais",
    tema: "verde",
    descricao: "Produtos que cuidam do meio ambiente e sustentam projetos.",
    icone: "sprout",
  },
  comunidade: {
    rotulo: "Desenvolvimento comunitário",
    tema: "vermelho",
    descricao: "Ações de cuidado e convivência com a comunidade.",
    icone: "heart-handshake",
  },
  cultura: {
    rotulo: "Cultura e eventos",
    tema: "amarelo",
    descricao: "Festas, passeios e confraternizações.",
    icone: "party-popper",
  },
};

export type TipoPublicacao = "noticia" | "evento" | "acao" | "comunicado";

export const tiposPublicacao: Record<TipoPublicacao, { rotulo: string; plural: string; tema: Tema }> = {
  noticia: { rotulo: "Notícia", plural: "Notícias", tema: "azul" },
  evento: { rotulo: "Evento", plural: "Eventos", tema: "amarelo" },
  acao: { rotulo: "Ação social", plural: "Ações sociais", tema: "vermelho" },
  comunicado: { rotulo: "Comunicado institucional", plural: "Comunicados", tema: "azul" },
};

export type CategoriaGaleria = "projetos" | "eventos" | "unidades" | "oficinas" | "acoes";

export const categoriasGaleria: Record<CategoriaGaleria, string> = {
  projetos: "Projetos",
  eventos: "Eventos",
  unidades: "Unidades",
  oficinas: "Oficinas",
  acoes: "Ações comunitárias",
};

export type CategoriaDocumento =
  | "estatuto"
  | "editais"
  | "relatorios"
  | "prestacao-de-contas"
  | "convenios"
  | "parcerias"
  | "institucionais";

export const categoriasDocumento: Record<CategoriaDocumento, { rotulo: string; descricao: string }> = {
  institucionais: { rotulo: "Documentos institucionais", descricao: "Registros e documentos de consulta pública." },
  estatuto: { rotulo: "Estatuto social", descricao: "Estatuto vigente e alterações registradas." },
  editais: { rotulo: "Editais", descricao: "Editais de bolsas e processos públicos." },
  relatorios: { rotulo: "Relatórios de atividades", descricao: "Relatórios anuais de atuação." },
  "prestacao-de-contas": { rotulo: "Prestação de contas", descricao: "Demonstrativos financeiros e contábeis." },
  convenios: { rotulo: "Convênios", descricao: "Convênios firmados pela associação." },
  parcerias: { rotulo: "Parcerias institucionais", descricao: "Termos e acordos de parceria." },
};
