import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Paginação por links (funciona sem JavaScript e é indexável). */
export function Pagination({
  atual,
  total,
  href,
}: {
  atual: number;
  total: number;
  href: (pagina: number) => string;
}) {
  if (total <= 1) return null;
  const paginas = Array.from({ length: total }, (_, i) => i + 1);
  const item = "grid min-h-11 min-w-11 place-items-center rounded-full border-2 px-3 font-bold transition";
  return (
    <nav aria-label="Paginação" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {atual > 1 ? (
        <Link href={href(atual - 1)} rel="prev" className={cn(item, "border-borda bg-white hover:border-comunidade")}>
          <ChevronLeft aria-hidden="true" size={18} />
          <span className="sr-only">Página anterior</span>
        </Link>
      ) : null}
      {paginas.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === atual ? "page" : undefined}
          aria-label={`Página ${p}`}
          className={cn(item, p === atual ? "border-comunidade bg-comunidade text-white" : "border-borda bg-white hover:border-comunidade")}
        >
          {p}
        </Link>
      ))}
      {atual < total ? (
        <Link href={href(atual + 1)} rel="next" className={cn(item, "border-borda bg-white hover:border-comunidade")}>
          <ChevronRight aria-hidden="true" size={18} />
          <span className="sr-only">Próxima página</span>
        </Link>
      ) : null}
    </nav>
  );
}
