"use client";

import { useState } from "react";
import { Map as MapIcon, Navigation } from "lucide-react";
import { mapaEmbedUrl, rotasUrl } from "@/data/organization";
import { Button } from "./Button";

/**
 * Mapa com carregamento sob demanda: nenhum conteúdo de terceiros (nem cookies)
 * é carregado até o visitante pedir. Sempre acompanha o link de rotas.
 */
export function MapaEmbed({ endereco, titulo }: { endereco: string; titulo: string }) {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-borda bg-white">
      <div className="relative aspect-[4/3] bg-ceu sm:aspect-[16/9]">
        {ativo ? (
          <iframe
            title={`Mapa: ${titulo}`}
            src={mapaEmbedUrl(endereco)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <MapIcon aria-hidden="true" size={40} className="text-comunidade" />
            <p className="max-w-sm text-sm font-semibold text-tinta-suave">
              Para proteger sua privacidade, o mapa só é carregado quando você pedir. Ele é fornecido pelo Google Maps.
            </p>
            <Button variante="azul" tamanho="sm" onClick={() => setAtivo(true)}>
              Carregar mapa
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-tinta-suave">{endereco}</p>
        <Button href={rotasUrl(endereco)} variante="contorno" tamanho="sm">
          <Navigation aria-hidden="true" size={16} />
          Abrir rotas
        </Button>
      </div>
    </div>
  );
}
