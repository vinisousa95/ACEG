import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";
import { temas, type Tema } from "@/lib/theme";
import { ArcoAberto, Circulo } from "./Shapes";

/**
 * Moldura fotográfica com tratamento coerente (cantos de 28px, recorte fixo).
 * Sem foto aprovada, mostra um espaço reservado elegante — nunca uma imagem
 * artificial apresentada como registro real.
 */
export function PhotoFrame({
  src,
  alt,
  tema = "azul",
  className,
  proporcao = "aspect-[4/3]",
  forma = "card",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  prioridade = false,
  rotulo = "Foto a ser incluída",
}: {
  src?: string;
  alt?: string;
  tema?: Tema;
  className?: string;
  proporcao?: string;
  forma?: "card" | "arco" | "circulo";
  sizes?: string;
  prioridade?: boolean;
  rotulo?: string;
}) {
  const t = temas[tema];
  const raio =
    forma === "arco"
      ? "rounded-t-[999px] rounded-b-[var(--radius-card)]"
      : forma === "circulo"
        ? "rounded-full"
        : "rounded-[var(--radius-card)]";

  return (
    <div className={cn("relative isolate overflow-hidden", proporcao, raio, t.soft, className)}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={prioridade}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-tinta-suave">
          <ArcoAberto cor={tema === "azul" ? "comunidade" : tema === "verde" ? "semente" : tema === "amarelo" ? "sol" : "abraco"} className="absolute -right-[18%] -top-[22%] w-[62%] opacity-25" />
          <Circulo cor="creme" className="absolute -bottom-[14%] -left-[8%] w-[38%] opacity-80" />
          <Camera aria-hidden="true" size={28} strokeWidth={2} className="relative opacity-70" />
          <span className="relative px-4 text-[0.8125rem] font-bold">{rotulo}</span>
        </div>
      )}
    </div>
  );
}
