/**
 * Temas de cor da identidade. Cada pauta escolhe uma cor principal
 * (guia: azul = educação, verde = produtos sociais/oficinas, amarelo = eventos,
 * vermelho = apoio). As classes ficam completas para o Tailwind detectá-las.
 */
export type Tema = "azul" | "verde" | "amarelo" | "vermelho";

export interface TemaClasses {
  /** fundo sólido da cor */
  solid: string;
  /** texto legível sobre o fundo sólido */
  onSolid: string;
  /** fundo suave complementar */
  soft: string;
  /** texto colorido legível sobre branco/creme */
  text: string;
  /** borda/realce */
  ring: string;
  /** cor CSS pura (para SVG) */
  hex: string;
  softHex: string;
  nome: string;
}

export const temas: Record<Tema, TemaClasses> = {
  azul: {
    solid: "bg-comunidade",
    onSolid: "text-white",
    soft: "bg-ceu",
    text: "text-comunidade",
    ring: "ring-comunidade/25",
    hex: "#1F6AA8",
    softHex: "#DCEBF7",
    nome: "azul",
  },
  verde: {
    solid: "bg-semente",
    onSolid: "text-white",
    soft: "bg-folha",
    text: "text-semente",
    ring: "ring-semente/25",
    hex: "#35802A",
    softHex: "#E3F1DA",
    nome: "verde",
  },
  amarelo: {
    solid: "bg-sol",
    onSolid: "text-tinta",
    soft: "bg-areia",
    text: "text-tinta",
    ring: "ring-sol/50",
    hex: "#F4B823",
    softHex: "#F1E4CC",
    nome: "amarelo",
  },
  vermelho: {
    solid: "bg-abraco",
    onSolid: "text-white",
    soft: "bg-rosa",
    text: "text-abraco",
    ring: "ring-abraco/25",
    hex: "#C62E2B",
    softHex: "#FBE3E1",
    nome: "vermelho",
  },
};
