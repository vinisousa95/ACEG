import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { temas, type Tema } from "@/lib/theme";

/** Etiqueta em pílula: um tema por etiqueta, na cor do tema. */
export function Pill({
  tema = "azul",
  children,
  className,
  solida = true,
}: {
  tema?: Tema;
  children: ReactNode;
  className?: string;
  solida?: boolean;
}) {
  const t = temas[tema];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[0.75rem] font-extrabold uppercase leading-none tracking-[0.08em]",
        solida ? `${t.solid} ${t.onSolid}` : `${t.soft} text-tinta`,
        className,
      )}
    >
      {children}
    </span>
  );
}
