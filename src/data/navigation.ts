export interface NavItem {
  label: string;
  href: string;
  /** rotas que também ativam o item */
  match?: string[];
}

export const navPrincipal: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Nossos projetos", href: "/projetos", match: ["/projetos"] },
  { label: "Unidades", href: "/unidades", match: ["/unidades"] },
  { label: "Notícias e eventos", href: "/noticias", match: ["/noticias"] },
  { label: "Transparência", href: "/transparencia" },
  { label: "Contato", href: "/contato" },
];

export const navApoio: NavItem = { label: "Como apoiar", href: "/como-apoiar" };

export const navRodape = {
  instituicao: [
    { label: "Quem somos", href: "/quem-somos" },
    { label: "Nossos projetos", href: "/projetos" },
    { label: "Unidades e creches", href: "/unidades" },
    { label: "Galeria de fotos", href: "/galeria" },
  ],
  participe: [
    { label: "Como apoiar", href: "/como-apoiar" },
    { label: "Seja voluntário", href: "/como-apoiar#voluntariado" },
    { label: "Torne-se parceiro", href: "/como-apoiar#parcerias" },
    { label: "Notícias e eventos", href: "/noticias" },
  ],
  transparencia: [
    { label: "Transparência", href: "/transparencia" },
    { label: "Política de privacidade", href: "/privacidade" },
    { label: "Contato", href: "/contato" },
  ],
};
