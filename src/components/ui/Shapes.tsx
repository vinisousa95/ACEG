import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Formas da identidade (arcos e círculos inspirados no "C" do logotipo).
 * São decorativas: sempre cortadas pelas bordas, nos cantos, ocupando no
 * máximo um terço da composição. Cores vêm dos tokens da marca.
 */
type Cor = "abraco" | "comunidade" | "semente" | "sol" | "areia" | "ceu" | "folha" | "rosa" | "creme" | "branco";

const hex: Record<Cor, string> = {
  abraco: "#C62E2B",
  comunidade: "#1F6AA8",
  semente: "#35802A",
  sol: "#F4B823",
  areia: "#F1E4CC",
  ceu: "#DCEBF7",
  folha: "#E3F1DA",
  rosa: "#FBE3E1",
  creme: "#FFF7E8",
  branco: "#FFFFFF",
};

interface ShapeProps {
  cor?: Cor;
  className?: string;
  style?: CSSProperties;
}

/** Arco aberto — o "C" da marca. */
export function ArcoAberto({ cor = "abraco", className, style }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 152.4 47.6 A 80 80 0 1 0 152.4 152.4"
        fill="none"
        stroke={hex[cor]}
        strokeWidth="26"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Circulo({ cor = "sol", className, style }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="50" fill={hex[cor]} />
    </svg>
  );
}

export function QuartoDeCirculo({ cor = "comunidade", className, style }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0 H100 A100 100 0 0 1 0 100 Z" fill={hex[cor]} />
    </svg>
  );
}

export function Semicirculo({ cor = "semente", className, style }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 50"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 50 A50 50 0 0 1 100 50 Z" fill={hex[cor]} />
    </svg>
  );
}

/** Dupla de pontos do logotipo (amarelo + azul). */
export function PontosDaMarca({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("pointer-events-none select-none", className)} aria-hidden="true" focusable="false">
      <circle cx="22" cy="22" r="20" fill="#F4B823" />
      <circle cx="50" cy="48" r="9" fill="#1F6AA8" />
    </svg>
  );
}
