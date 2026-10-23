import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ArcoAberto, Circulo, QuartoDeCirculo, Semicirculo } from "@/components/ui/Shapes";
import { cn } from "@/lib/cn";
import type { Tema } from "@/lib/theme";

/**
 * Cabeçalho das páginas internas. O tema define a cor de fundo e a composição
 * de formas, para que cada página tenha personalidade própria.
 */
const fundo: Record<Tema, string> = {
  azul: "bg-ceu",
  verde: "bg-folha",
  amarelo: "bg-areia",
  vermelho: "bg-rosa",
};

export function PageHero({
  eyebrow,
  titulo,
  texto,
  tema = "azul",
  crumbs,
  children,
  className,
}: {
  eyebrow: string;
  titulo: ReactNode;
  texto?: ReactNode;
  tema?: Tema;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", fundo[tema], className)}>
      {tema === "azul" && (
        <>
          <ArcoAberto cor="comunidade" className="absolute -right-20 -top-24 -z-10 w-80 opacity-20 sm:w-[26rem]" />
          <Circulo cor="sol" className="absolute bottom-6 right-[18%] -z-10 hidden w-10 sm:block" />
        </>
      )}
      {tema === "verde" && (
        <>
          <Semicirculo cor="semente" className="absolute -right-10 bottom-0 -z-10 w-56 opacity-25 sm:w-80" />
          <Circulo cor="sol" className="absolute right-[34%] top-8 -z-10 hidden w-8 sm:block" />
        </>
      )}
      {tema === "amarelo" && (
        <>
          <QuartoDeCirculo cor="sol" className="absolute -right-px -top-px -z-10 w-40 sm:w-60" />
          <ArcoAberto cor="creme" className="absolute -bottom-24 left-[42%] -z-10 hidden w-72 sm:block" />
        </>
      )}
      {tema === "vermelho" && (
        <>
          <ArcoAberto cor="abraco" className="absolute -left-24 -top-28 -z-10 w-72 opacity-20" />
          <Circulo cor="comunidade" className="absolute bottom-8 right-10 -z-10 w-12 opacity-80" />
        </>
      )}
      <div className="container-aceg py-8 sm:py-12 lg:py-16">
        <Breadcrumbs itens={crumbs} />
        <div className="mt-6 max-w-3xl sm:mt-8">
          <p className="eyebrow text-abraco-escuro">{eyebrow}</p>
          <h1 className="mt-3">{titulo}</h1>
          {texto && <p className="lead mt-5 max-w-2xl">{texto}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
