"use client";

import { useMemo, useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { categoriasProjeto, type CategoriaProjeto } from "@/data/categorias";
import type { Projeto } from "@/lib/content";

export function ProjetosLista({ projetos }: { projetos: Projeto[] }) {
  const [categoria, setCategoria] = useState<string>("todos");
  const [situacao, setSituacao] = useState<string>("todos");

  const categoriasPresentes = useMemo(
    () => (Object.keys(categoriasProjeto) as CategoriaProjeto[]).filter((c) => projetos.some((p) => p.categoria === c)),
    [projetos],
  );

  const filtrados = projetos.filter(
    (p) => (categoria === "todos" || p.categoria === categoria) && (situacao === "todos" || p.situacao === situacao),
  );

  return (
    <div>
      <div className="space-y-4">
        <FilterChips
          label="Filtrar por categoria"
          value={categoria}
          onChange={setCategoria}
          options={[
            { value: "todos", label: "Todas as áreas", count: projetos.length },
            ...categoriasPresentes.map((c) => ({
              value: c,
              label: categoriasProjeto[c].rotulo,
              count: projetos.filter((p) => p.categoria === c).length,
            })),
          ]}
        />
        <FilterChips
          label="Filtrar por situação"
          value={situacao}
          onChange={setSituacao}
          options={[
            { value: "todos", label: "Atuais e históricos" },
            { value: "atual", label: "Atuais" },
            { value: "historico", label: "Históricos" },
          ]}
        />
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm font-bold text-tinta-suave">
        {filtrados.length === 1 ? "1 projeto encontrado" : `${filtrados.length} projetos encontrados`}
      </p>

      {filtrados.length ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <li key={p.slug}>
              <ProjectCard projeto={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyState titulo="Nenhum projeto nesta combinação" texto="Experimente outra categoria ou situação." />
        </div>
      )}
    </div>
  );
}
