import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Logotipo oficial (SVG vetorial do pacote da marca, sem alterações de arte).
 * Cada versão serve a um fundo; nunca recolorir, esticar ou girar.
 *  - colorido: fundos branco/creme
 *  - reversa-escuro: fundo Tinta
 *  - reversa-azul: fundo Azul Comunidade
 *  - branco: fundos coloridos com versão monocromática
 *  - marca: só o símbolo
 */
type Versao = "colorido" | "reversa-escuro" | "reversa-azul" | "branco" | "tinta";

const razaoHorizontal = 701.14 / 233.8;
const razaoMarca = 707.62 / 675.65;

export function Logo({
  versao = "colorido",
  className,
  altura = 48,
  prioridade = false,
}: {
  versao?: Versao;
  className?: string;
  /** altura em px (a largura segue a proporção oficial) */
  altura?: number;
  prioridade?: boolean;
}) {
  return (
    <Image
      src={`/assets/logo/ACEG_${versao}_horizontal.svg`}
      alt="ACEG – Associação Comunitária Eugênio Góes"
      width={Math.round(altura * razaoHorizontal)}
      height={altura}
      priority={prioridade}
      unoptimized
      className={cn("h-auto w-auto max-w-full", className)}
      style={{ height: altura, width: "auto" }}
    />
  );
}

export function Marca({
  versao = "colorido",
  altura = 96,
  className,
  alt = "",
}: {
  versao?: "colorido" | "branco";
  altura?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={`/assets/logo/ACEG_${versao}_marca.svg`}
      alt={alt}
      width={Math.round(altura * razaoMarca)}
      height={altura}
      unoptimized
      aria-hidden={alt ? undefined : true}
      className={className}
      style={{ height: altura, width: "auto" }}
    />
  );
}

/** Selo branco oficial: usar sempre que a marca for aplicada sobre fundo colorido. */
export function SeloBranco({ tamanho = 96, className }: { tamanho?: number; className?: string }) {
  return (
    <Image
      src="/assets/selos/selo-branco.png"
      alt="ACEG"
      width={tamanho}
      height={tamanho}
      className={className}
    />
  );
}
