import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { tiposPublicacao } from "@/data/categorias";
import { ehFuturo, formatarData } from "@/lib/format";
import type { Publicacao } from "@/lib/content";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";
import { Pill } from "./Pill";
import { ArcoAberto } from "./Shapes";

export function NewsCard({
  pub,
  className,
  horizontal = false,
  prioridade = false,
}: {
  pub: Publicacao;
  className?: string;
  horizontal?: boolean;
  prioridade?: boolean;
}) {
  const tipo = tiposPublicacao[pub.tipo];
  const t = temas[tipo.tema];
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white shadow-soft transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lift",
        horizontal ? "flex-col md:flex-row" : "h-full flex-col",
        className,
      )}
    >
      <div className={cn("relative shrink-0 overflow-hidden", t.soft, horizontal ? "aspect-[16/10] md:aspect-auto md:w-[46%]" : "aspect-[16/10]")}>
        {pub.imagem ? (
          <Image
            src={pub.imagem}
            alt={pub.imagemAlt ?? ""}
            fill
            priority={prioridade}
            sizes={horizontal ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0">
            <ArcoAberto
              cor={tipo.tema === "amarelo" ? "sol" : tipo.tema === "vermelho" ? "abraco" : "comunidade"}
              className="absolute -right-8 -top-10 w-40 opacity-30"
            />
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <CalendarDays aria-hidden="true" size={36} strokeWidth={1.75} className="text-tinta/45" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Pill tema={tipo.tema}>{tipo.rotulo}</Pill>
          {pub.dataEvento && (
            <Pill tema="amarelo" solida={false} className="!bg-creme">
              {ehFuturo(pub.dataEvento) ? "Próximo evento" : "Evento realizado"}
            </Pill>
          )}
          <time dateTime={pub.data} className="text-sm font-bold text-tinta-suave">
            {formatarData(pub.data)}
          </time>
        </div>
        <h3 className="mt-3 text-[1.375rem]">
          <Link href={`/noticias/${pub.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {pub.titulo}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-tinta-suave">{pub.resumo}</p>
        <span className="mt-4 font-extrabold text-comunidade underline-offset-4 group-hover:underline">Ler notícia completa</span>
      </div>
    </article>
  );
}
