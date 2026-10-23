"use client";

import { useEffect, useRef, useState } from "react";
import { formatarNumero } from "@/lib/format";

/** Número que conta suavemente ao entrar na tela. Valor final é o conteúdo inicial (SSR/sem JS). */
export function Counter({ valor, sufixo = "", formato = "numero" }: { valor: number; sufixo?: string; formato?: "numero" | "ano" }) {
  const [atual, setAtual] = useState(valor);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || formato === "ano") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const dur = 1100;
        const tick = (agora: number) => {
          const p = Math.min((agora - inicio) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setAtual(Math.round(valor * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setAtual(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor, formato]);

  const texto = formato === "ano" ? String(valor) : formatarNumero(atual);
  return (
    <span ref={ref}>
      <span className="sr-only">
        {formato === "ano" ? valor : formatarNumero(valor)}
        {sufixo}
      </span>
      <span aria-hidden="true">
        {texto}
        {sufixo}
      </span>
    </span>
  );
}
