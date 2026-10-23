"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CircleCheck, LoaderCircle } from "lucide-react";
import { errosPorCampo, esquemas, type TipoFormulario } from "@/lib/forms";
import { cn } from "@/lib/cn";

export interface Campo {
  nome: string;
  rotulo: string;
  tipo: "text" | "email" | "tel" | "textarea" | "select";
  obrigatorio?: boolean;
  opcoes?: readonly string[];
  autoComplete?: string;
  dica?: string;
  largura?: "inteira" | "metade";
}

type Estado = "ocioso" | "enviando" | "sucesso" | "erro";

const controle =
  "min-h-12 w-full rounded-2xl border-2 border-borda bg-white px-4 py-3 text-base font-semibold text-tinta placeholder:text-tinta-suave/60 transition focus:border-comunidade aria-[invalid=true]:border-abraco";

/**
 * Formulário real: valida no navegador (mesmo esquema do servidor), envia para
 * /api/formularios/[tipo] e mostra confirmação ou erro de forma acessível.
 */
export function Formulario({
  tipo,
  campos,
  rotuloEnvio = "Enviar mensagem",
  sucessoTitulo = "Mensagem enviada!",
  sucessoTexto = "Recebemos o seu contato e responderemos em breve.",
  className,
}: {
  tipo: TipoFormulario;
  campos: Campo[];
  rotuloEnvio?: string;
  sucessoTitulo?: string;
  sucessoTexto?: string;
  className?: string;
}) {
  const id = useId();
  const [estado, setEstado] = useState<Estado>("ocioso");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [mensagemErro, setMensagemErro] = useState("");
  const abertoEm = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resumoRef = useRef<HTMLDivElement>(null);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;
    const fd = new FormData(e.currentTarget);
    const dados: Record<string, unknown> = {};
    for (const c of campos) dados[c.nome] = String(fd.get(c.nome) ?? "");
    dados.consentimento = fd.get("consentimento") === "on";
    dados.website = String(fd.get("website") ?? "");
    dados._t = abertoEm.current || Date.now() - 10_000;

    const check = esquemas[tipo].safeParse(dados);
    if (!check.success) {
      const campos_ = errosPorCampo(check.error);
      setErros(campos_);
      setEstado("ocioso");
      setMensagemErro("");
      requestAnimationFrame(() => {
        const primeiro = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        primeiro?.focus();
      });
      return;
    }

    setErros({});
    setMensagemErro("");
    setEstado("enviando");
    try {
      const resp = await fetch(`/api/formularios/${tipo}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const corpo = (await resp.json().catch(() => ({}))) as { ok?: boolean; campos?: Record<string, string>; mensagem?: string };
      if (resp.ok && corpo.ok) {
        setEstado("sucesso");
        formRef.current?.reset();
        return;
      }
      if (resp.status === 422 && corpo.campos) {
        setErros(corpo.campos);
        setEstado("ocioso");
        return;
      }
      setMensagemErro(corpo.mensagem ?? "Não foi possível enviar agora. Tente novamente em instantes.");
      setEstado("erro");
      requestAnimationFrame(() => resumoRef.current?.focus());
    } catch {
      setMensagemErro("Sem conexão com o servidor. Verifique sua internet e tente novamente.");
      setEstado("erro");
      requestAnimationFrame(() => resumoRef.current?.focus());
    }
  }

  if (estado === "sucesso") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-folha p-8 text-center">
        <CircleCheck aria-hidden="true" size={48} className="mx-auto text-semente" />
        <h3 className="mt-3">{sucessoTitulo}</h3>
        <p className="mx-auto mt-2 max-w-md text-tinta-suave">{sucessoTexto}</p>
        <button type="button" onClick={() => setEstado("ocioso")} className="mt-5 min-h-11 rounded-full px-5 font-extrabold text-comunidade underline underline-offset-4">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const quantidadeErros = Object.keys(erros).length;

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className={cn("space-y-5", className)} onFocus={() => { if (!abertoEm.current) abertoEm.current = Date.now(); }}>
      {(quantidadeErros > 0 || estado === "erro") && (
        <div ref={resumoRef} tabIndex={-1} role="alert" className="flex gap-3 rounded-2xl bg-rosa p-4 text-abraco-escuro outline-none">
          <AlertCircle aria-hidden="true" size={22} className="mt-0.5 shrink-0" />
          <p className="font-bold">
            {estado === "erro" ? mensagemErro : quantidadeErros === 1 ? "Há 1 campo para corrigir." : `Há ${quantidadeErros} campos para corrigir.`}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {campos.map((c) => {
          const fid = `${id}-${c.nome}`;
          const erro = erros[c.nome];
          const descr = [c.dica ? `${fid}-dica` : "", erro ? `${fid}-erro` : ""].filter(Boolean).join(" ") || undefined;
          const comum = {
            id: fid,
            name: c.nome,
            required: c.obrigatorio,
            "aria-invalid": erro ? true : undefined,
            "aria-describedby": descr,
            autoComplete: c.autoComplete,
            className: controle,
          } as const;
          return (
            <div key={c.nome} className={cn(c.largura === "metade" ? "" : "sm:col-span-2")}>
              <label htmlFor={fid} className="mb-1.5 block font-extrabold">
                {c.rotulo}
                {c.obrigatorio ? <span aria-hidden="true" className="text-abraco"> *</span> : <span className="font-semibold text-tinta-suave"> (opcional)</span>}
              </label>
              {c.tipo === "textarea" ? (
                <textarea {...comum} rows={5} maxLength={2000} />
              ) : c.tipo === "select" ? (
                <select {...comum} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {c.opcoes?.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input {...comum} type={c.tipo} inputMode={c.tipo === "tel" ? "tel" : undefined} maxLength={120} />
              )}
              {c.dica && <p id={`${fid}-dica`} className="mt-1 text-sm text-tinta-suave">{c.dica}</p>}
              {erro && (
                <p id={`${fid}-erro`} className="mt-1 flex items-center gap-1.5 text-sm font-bold text-abraco-escuro">
                  <AlertCircle aria-hidden="true" size={16} /> {erro}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot: invisível para pessoas, tentador para robôs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            aria-invalid={erros.consentimento ? true : undefined}
            aria-describedby={erros.consentimento ? `${id}-consent-erro` : undefined}
            className="mt-1 size-6 shrink-0 rounded-md border-2 border-borda accent-comunidade"
          />
          <span className="text-[0.9375rem] text-tinta-suave">
            Concordo que a ACEG use os dados informados apenas para responder a este contato, conforme a{" "}
            <Link href="/privacidade" target="_blank" className="font-bold text-comunidade underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {erros.consentimento && (
          <p id={`${id}-consent-erro`} className="mt-1 flex items-center gap-1.5 text-sm font-bold text-abraco-escuro">
            <AlertCircle aria-hidden="true" size={16} /> {erros.consentimento}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-abraco px-8 font-extrabold text-white shadow-[0_8px_20px_-8px_rgb(198_46_43/0.7)] transition hover:bg-abraco-escuro disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {estado === "enviando" ? (
          <>
            <LoaderCircle aria-hidden="true" size={20} className="animate-spin" /> Enviando…
          </>
        ) : (
          rotuloEnvio
        )}
      </button>
    </form>
  );
}
