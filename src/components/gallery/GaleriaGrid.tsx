"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { categoriasGaleria, type CategoriaGaleria } from "@/data/categorias";
import type { FotoGaleria } from "@/lib/content";

export function GaleriaGrid({ fotos }: { fotos: FotoGaleria[] }) {
  const [categoria, setCategoria] = useState<string>("todos");
  const [aberta, setAberta] = useState<number | null>(null);
  const gatilhoRef = useRef<HTMLElement | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const categorias = Object.keys(categoriasGaleria) as CategoriaGaleria[];
  const lista = useMemo(() => fotos.filter((f) => categoria === "todos" || f.categoria === categoria), [fotos, categoria]);

  const fechar = useCallback(() => {
    setAberta(null);
    gatilhoRef.current?.focus();
  }, []);
  const mover = useCallback(
    (d: number) => setAberta((i) => (i === null ? i : (i + d + lista.length) % lista.length)),
    [lista.length],
  );

  useEffect(() => {
    if (aberta === null) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowRight") mover(1);
      else if (e.key === "ArrowLeft") mover(-1);
      else if (e.key === "Tab") {
        // armadilha de foco: a janela só tem 3 controles
        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox] button"));
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", onKey);
    };
  }, [aberta, fechar, mover]);

  const atual = aberta !== null ? lista[aberta] : null;

  return (
    <div>
      <FilterChips
        label="Filtrar fotografias por categoria"
        value={categoria}
        onChange={(v) => {
          setCategoria(v);
          setAberta(null);
        }}
        options={[
          { value: "todos", label: "Todas", count: fotos.length },
          ...categorias.map((c) => ({ value: c, label: categoriasGaleria[c], count: fotos.filter((f) => f.categoria === c).length })),
        ]}
      />

      <p role="status" aria-live="polite" className="mt-6 text-sm font-bold text-tinta-suave">
        {lista.length === 1 ? "1 fotografia" : `${lista.length} fotografias`}
      </p>

      {lista.length ? (
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((f, i) => (
            <li key={f.slug}>
              <figure className="group overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white shadow-soft">
                <button
                  type="button"
                  onClick={(e) => {
                    gatilhoRef.current = e.currentTarget;
                    setAberta(i);
                  }}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-areia"
                  aria-label={`Ampliar: ${f.titulo}`}
                  aria-haspopup="dialog"
                >
                  <Image
                    src={f.imagem}
                    alt={f.alt}
                    fill
                    loading={i < 2 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
                  />
                </button>
                <figcaption className="p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-tinta-suave">{categoriasGaleria[f.categoria]}</p>
                  <p className="mt-1 font-display text-lg font-bold leading-tight">{f.titulo}</p>
                  {f.legenda && <p className="mt-1 text-sm text-tinta-suave">{f.legenda}</p>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyState
            titulo="Ainda não há fotografias nesta categoria"
            texto="Publicamos somente imagens autorizadas, com cuidado especial na proteção da identidade das crianças."
          />
        </div>
      )}

      {atual && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografia ${aberta! + 1} de ${lista.length}: ${atual.titulo}`}
          className="fixed inset-0 z-[90] flex flex-col bg-tinta/95 p-4 [animation:fade_.25s_ease-out] sm:p-8"
          onClick={(e) => e.target === e.currentTarget && fechar()}
        >
          <div className="flex items-center justify-between text-white">
            <p className="font-bold">{aberta! + 1} / {lista.length}</p>
            <button
              ref={fecharRef}
              type="button"
              onClick={fechar}
              className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-white/25"
              aria-label="Fechar"
            >
              <X aria-hidden="true" size={24} />
            </button>
          </div>
          <div className="relative my-4 flex-1" onClick={(e) => e.target === e.currentTarget && fechar()}>
            <Image src={atual.imagem} alt={atual.alt} fill sizes="100vw" className="object-contain" priority />
          </div>
          <div className="flex items-center justify-between gap-4 text-white">
            <button type="button" onClick={() => mover(-1)} className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/25" aria-label="Foto anterior">
              <ChevronLeft aria-hidden="true" size={26} />
            </button>
            <div className="text-center">
              <p className="font-display text-lg font-bold">{atual.titulo}</p>
              {atual.legenda && <p className="text-sm text-white/80">{atual.legenda}</p>}
            </div>
            <button type="button" onClick={() => mover(1)} className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/25" aria-label="Próxima foto">
              <ChevronRight aria-hidden="true" size={26} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
