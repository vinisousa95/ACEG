"use client";

import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { categoriasDocumento, type CategoriaDocumento } from "@/data/categorias";
import type { Documento } from "@/lib/content";
import { cn } from "@/lib/cn";

export function DocumentosLista({ documentos }: { documentos: Documento[] }) {
  const categorias = Object.keys(categoriasDocumento) as CategoriaDocumento[];
  const [categoria, setCategoria] = useState<CategoriaDocumento | "todos">("todos");
  const [ano, setAno] = useState("todos");

  const anos = useMemo(() => Array.from(new Set(documentos.map((d) => d.ano))).sort((a, b) => b - a), [documentos]);
  const lista = documentos.filter(
    (d) => (categoria === "todos" || d.categoria === categoria) && (ano === "todos" || String(d.ano) === ano),
  );

  const btn = "flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl px-4 py-2 text-left font-bold transition";

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
      <div className="min-w-0">
        <div role="group" aria-label="Categorias de documentos" className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible">
          {(["todos", ...categorias] as const).map((c) => {
            const n = c === "todos" ? documentos.length : documentos.filter((d) => d.categoria === c).length;
            const on = categoria === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCategoria(c)}
                className={cn(btn, "shrink-0 lg:shrink", on ? "bg-comunidade text-white" : "bg-white text-tinta ring-1 ring-borda hover:ring-comunidade/50")}
              >
                <span>{c === "todos" ? "Todos os documentos" : categoriasDocumento[c].rotulo}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-extrabold", on ? "bg-white/20" : "bg-creme")}>{n}</span>
              </button>
            );
          })}
        </div>
        {anos.length > 0 && (
          <div className="mt-5">
            <label htmlFor="ano" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Ano</label>
            <select
              id="ano"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="min-h-12 w-full rounded-full border-2 border-borda bg-white px-5 font-bold focus:border-comunidade"
            >
              <option value="todos">Todos os anos</option>
              {anos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p role="status" aria-live="polite" className="mb-4 text-sm font-bold text-tinta-suave">
          {lista.length === 1 ? "1 documento" : `${lista.length} documentos`}
        </p>
        {lista.length ? (
          <ul className="space-y-3">
            {lista.map((d) => (
              <li key={d.slug} className="rounded-[var(--radius-card)] border border-borda bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-ceu text-comunidade sm:grid">
                    <FileText aria-hidden="true" size={22} />
                  </span>
                  <div className="flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-tinta-suave">
                      <span>{categoriasDocumento[d.categoria].rotulo}</span>
                      <span aria-hidden="true">·</span>
                      <span>{d.ano}</span>
                    </p>
                    <h3 className="mt-1 text-lg leading-snug">{d.titulo}</h3>
                    <p className="mt-1 text-[0.9375rem] text-tinta-suave">{d.descricao}</p>
                  </div>
                  <a
                    href={d.arquivo}
                    download
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-comunidade px-5 font-extrabold text-white transition hover:bg-comunidade-escuro"
                  >
                    <Download aria-hidden="true" size={18} />
                    Baixar PDF
                    <span className="sr-only">: {d.titulo}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            titulo="Nenhum documento publicado aqui ainda"
            texto={
              categoria === "todos"
                ? "Não há documentos para o filtro escolhido."
                : `Ainda não há documentos publicados em “${categoriasDocumento[categoria].rotulo}”. Eles aparecem aqui assim que forem disponibilizados pela ACEG.`
            }
          />
        )}
      </div>
    </div>
  );
}
