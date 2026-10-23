import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Unidade } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Pill } from "./Pill";
import { ArcoAberto, Circulo } from "./Shapes";
import { Icon } from "./Icon";

export const rotuloTipoUnidade: Record<Unidade["tipo"], string> = {
  creche: "Creche · educação infantil",
  sede: "Sede social",
  social: "Unidade social",
};

export function UnitCard({ unidade, className }: { unidade: Unidade; className?: string }) {
  const sede = unidade.tipo !== "creche";
  const temEndereco = !!unidade.endereco;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white shadow-soft transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("relative h-40 overflow-hidden", sede ? "bg-abraco" : "bg-comunidade")}>
        {unidade.imagem ? (
          <Image src={unidade.imagem} alt={unidade.imagemAlt ?? ""} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <>
            <ArcoAberto cor="branco" className="absolute -right-8 -top-10 w-40 opacity-25" />
            <Circulo cor="sol" className="absolute -bottom-6 left-6 w-16" />
            <div className="absolute inset-0 grid place-items-center text-white">
              <Icon nome={sede ? "house" : "baby"} size={52} strokeWidth={1.75} />
            </div>
          </>
        )}
        <div className="absolute left-4 top-4">
          <Pill tema={sede ? "vermelho" : "azul"} className="!bg-white !text-tinta shadow-soft">
            {rotuloTipoUnidade[unidade.tipo]}
          </Pill>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.375rem]">
          <Link href={`/unidades/${unidade.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {unidade.titulo}
          </Link>
        </h3>
        <ul className="mt-3 flex-1 space-y-2 text-[0.9375rem] text-tinta-suave">
          {temEndereco ? (
            <li className="flex gap-2.5">
              <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0 text-abraco" />
              <span>
                {unidade.endereco?.split(" — ")[0]}
                {unidade.bairro ? ` · ${unidade.bairro}` : ""}
              </span>
            </li>
          ) : (
            <li className="flex gap-2.5">
              <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0 text-tinta-suave/60" />
              <span>Endereço em validação — será publicado após confirmação.</span>
            </li>
          )}
          {unidade.telefones[0] && (
            <li className="flex gap-2.5">
              <Phone aria-hidden="true" size={18} className="mt-1 shrink-0 text-abraco" />
              <span>{unidade.telefones[0]}</span>
            </li>
          )}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1.5 font-extrabold text-comunidade">
          Conhecer unidade
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
