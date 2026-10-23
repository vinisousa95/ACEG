import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoriasProjeto } from "@/data/categorias";
import type { Projeto } from "@/lib/content";
import { cn } from "@/lib/cn";
import { temas } from "@/lib/theme";
import { Icon } from "./Icon";
import { Pill } from "./Pill";
import { ArcoAberto, Circulo } from "./Shapes";

export function ProjectCard({ projeto, className }: { projeto: Projeto; className?: string }) {
  const cat = categoriasProjeto[projeto.categoria];
  const t = temas[cat.tema];
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white shadow-soft transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("relative h-44 overflow-hidden sm:h-48", t.solid)}>
        {projeto.imagem ? (
          <Image
            src={projeto.imagem}
            alt={projeto.imagemAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <ArcoAberto cor={cat.tema === "amarelo" ? "creme" : "branco"} className="absolute -right-10 -top-12 w-44 opacity-25" />
            <Circulo cor={cat.tema === "amarelo" ? "branco" : "sol"} className="absolute -bottom-8 left-8 w-20 opacity-90" />
            <div className={cn("absolute inset-0 grid place-items-center", t.onSolid)}>
              <Icon nome={projeto.icone} size={56} strokeWidth={1.75} />
            </div>
          </>
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          <Pill tema={cat.tema === "amarelo" ? "amarelo" : "azul"} solida className="!bg-white !text-tinta shadow-soft">
            <Icon nome={projeto.icone} size={14} strokeWidth={2.5} />
            {cat.rotulo}
          </Pill>
        </div>
        {projeto.situacao === "historico" && (
          <span className="absolute bottom-3 right-3 rounded-full bg-tinta px-3 py-1 text-[0.6875rem] font-extrabold uppercase tracking-wider text-white">
            Histórico
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.375rem]">
          <Link
            href={`/projetos/${projeto.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-[var(--radius-card)]"
          >
            {projeto.titulo}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-tinta-suave">{projeto.resumo}</p>
        <span className={cn("mt-5 inline-flex items-center gap-1.5 font-extrabold", t.text === "text-tinta" ? "text-comunidade" : t.text)}>
          Saiba mais
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
