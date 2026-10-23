"use client";

import { useState } from "react";
import { Check, Link as LinkIcon, MessageCircle, Share2 } from "lucide-react";
import { FacebookIcon } from "./Icon";

export function ShareButtons({ url, titulo }: { url: string; titulo: string }) {
  const [copiado, setCopiado] = useState(false);
  const [podeCompartilhar] = useState(() => typeof navigator !== "undefined" && "share" in navigator);

  const base =
    "inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-borda bg-white px-4 text-sm font-bold transition hover:border-comunidade hover:text-comunidade";

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copie o link:", url);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Compartilhar">
      <span className="mr-1 text-sm font-extrabold uppercase tracking-wider text-tinta-suave">Compartilhar</span>
      {podeCompartilhar && (
        <button type="button" className={base} onClick={() => navigator.share({ title: titulo, url }).catch(() => {})}>
          <Share2 aria-hidden="true" size={16} /> Compartilhar
        </button>
      )}
      <a className={base} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url}`)}`}>
        <MessageCircle aria-hidden="true" size={16} /> WhatsApp<span className="sr-only"> (abre em nova aba)</span>
      </a>
      <a className={base} target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}>
        <FacebookIcon size={16} /> Facebook<span className="sr-only"> (abre em nova aba)</span>
      </a>
      <button type="button" className={base} onClick={copiar}>
        {copiado ? <Check aria-hidden="true" size={16} /> : <LinkIcon aria-hidden="true" size={16} />}
        {copiado ? "Link copiado" : "Copiar link"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{copiado ? "Link copiado para a área de transferência" : ""}</span>
    </div>
  );
}
