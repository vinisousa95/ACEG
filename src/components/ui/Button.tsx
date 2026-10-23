import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variante = "primario" | "azul" | "contorno" | "contorno-claro" | "claro" | "sol" | "texto";
type Tamanho = "md" | "lg" | "sm";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-sans font-extrabold leading-none tracking-[0.005em] transition duration-200 ease-out motion-safe:active:translate-y-px focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variantes: Record<Variante, string> = {
  primario:
    "bg-abraco text-white shadow-[0_8px_20px_-8px_rgb(198_46_43/0.7)] hover:bg-abraco-escuro hover:shadow-[0_12px_24px_-8px_rgb(198_46_43/0.7)] motion-safe:hover:-translate-y-0.5",
  azul: "bg-comunidade text-white hover:bg-comunidade-escuro motion-safe:hover:-translate-y-0.5",
  contorno: "border-2 border-comunidade bg-transparent text-comunidade hover:bg-comunidade hover:text-white",
  "contorno-claro": "border-2 border-white bg-transparent text-white hover:bg-white hover:text-tinta",
  claro: "bg-white text-abraco hover:bg-creme motion-safe:hover:-translate-y-0.5",
  sol: "bg-sol text-tinta hover:bg-[#ffc93a] motion-safe:hover:-translate-y-0.5",
  texto: "min-h-0 rounded-md px-0 text-comunidade hover:text-comunidade-escuro",
};

const tamanhos: Record<Tamanho, string> = {
  sm: "px-5 py-2.5 text-[0.9375rem]",
  md: "px-6 py-3 text-base",
  lg: "px-7 py-4 text-[1.0625rem]",
};

interface Comum {
  variante?: Variante;
  tamanho?: Tamanho;
  seta?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkProps = Comum & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonProps = Comum & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  const { variante = "primario", tamanho = "md", seta = false, className, children, ...rest } = props;
  const classes = cn(base, variantes[variante], variante !== "texto" && tamanhos[tamanho], className);
  const conteudo = (
    <>
      {children}
      {seta && (
        <ArrowRight
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    const externo = /^(https?:|mailto:|tel:)/.test(href);
    if (externo) {
      return (
        <a
          href={href}
          className={classes}
          {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(linkRest as object)}
        >
          {conteudo}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(linkRest as object)}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ComponentProps<"button">)}>
      {conteudo}
    </button>
  );
}
