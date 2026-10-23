import type { ReactNode } from "react";
import { ArcoAberto } from "./Shapes";

export function EmptyState({ titulo, texto, acao }: { titulo: string; texto?: string; acao?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-dashed border-borda bg-white px-6 py-12 text-center">
      <ArcoAberto cor="areia" className="absolute -right-10 -top-10 w-36" />
      <h3 className="relative">{titulo}</h3>
      {texto && <p className="relative mx-auto mt-2 max-w-md text-tinta-suave">{texto}</p>}
      {acao && <div className="relative mt-5">{acao}</div>}
    </div>
  );
}
