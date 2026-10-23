"use client";

import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** Grupo de filtros acessível: botões com aria-pressed, rolagem horizontal no celular. */
export function FilterChips({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 font-sans text-[0.9375rem] font-bold transition",
              on ? "border-comunidade bg-comunidade text-white" : "border-borda bg-white text-tinta hover:border-comunidade/50",
            )}
          >
            {o.label}
            {o.count !== undefined && (
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-extrabold", on ? "bg-white/20" : "bg-creme")}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
