import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  titulo,
  texto,
  alinhamento = "esquerda",
  corEyebrow = "text-abraco-escuro",
  claro = false,
  as: H = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  alinhamento?: "esquerda" | "centro";
  corEyebrow?: string;
  claro?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", alinhamento === "centro" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-3", claro ? "text-white" : corEyebrow)}>{eyebrow}</p>}
      <H id={id} className={cn(claro && "text-white")}>
        {titulo}
      </H>
      {texto && <p className={cn("lead mt-4", claro && "!text-white/95")}>{texto}</p>}
    </div>
  );
}
