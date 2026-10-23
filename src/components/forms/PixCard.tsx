"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Exibe a chave PIX oficial com cópia em um toque. Só é renderizado quando a chave foi validada. */
export function PixCard({ chave, tipoChave, beneficiario, instituicao }: { chave: string; tipoChave: string; beneficiario: string; instituicao: string }) {
  const [copiado, setCopiado] = useState(false);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(chave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copie a chave PIX:", chave);
    }
  }
  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6 text-tinta shadow-lift">
      <p className="eyebrow text-abraco-escuro">Doação por PIX</p>
      <dl className="mt-3 space-y-3">
        <div>
          <dt className="text-sm font-extrabold text-tinta-suave">{tipoChave}</dt>
          <dd className="break-all font-display text-xl font-bold">{chave}</dd>
        </div>
        <div>
          <dt className="text-sm font-extrabold text-tinta-suave">Beneficiário</dt>
          <dd className="font-bold">{beneficiario}</dd>
        </div>
        <div>
          <dt className="text-sm font-extrabold text-tinta-suave">Instituição</dt>
          <dd className="font-bold">{instituicao}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={copiar}
        className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-abraco px-6 font-extrabold text-white transition hover:bg-abraco-escuro"
      >
        {copiado ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
        {copiado ? "Chave copiada" : "Copiar chave PIX"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{copiado ? "Chave PIX copiada" : ""}</span>
    </div>
  );
}
