import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/data/organization";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ itens, claro = false, className }: { itens: Crumb[]; claro?: boolean; className?: string }) {
  const todos: Crumb[] = [{ label: "Início", href: "/" }, ...itens];
  return (
    <>
      <nav aria-label="Você está em" className={cn("text-sm font-semibold", className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {todos.map((c, i) => {
            const ultimo = i === todos.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href && !ultimo ? (
                  <Link
                    href={c.href}
                    className={cn("underline-offset-4 hover:underline", claro ? "text-white hover:text-white" : "text-tinta-suave hover:text-tinta")}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={ultimo ? "page" : undefined} className={claro ? "text-white" : "text-tinta"}>
                    {c.label}
                  </span>
                )}
                {!ultimo && <ChevronRight aria-hidden="true" size={14} className={claro ? "text-white/60" : "text-tinta-suave/60"} />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        dados={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: todos.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
