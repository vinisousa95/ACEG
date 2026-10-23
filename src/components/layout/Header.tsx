"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navApoio, navPrincipal, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/cn";

function ativo(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname();
  // O menu "pertence" à rota em que foi aberto: ao navegar, fecha sem precisar de efeito.
  const [abertoEm, setAbertoEm] = useState<string | null>(null);
  const aberto = abertoEm === pathname;
  const [rolou, setRolou] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  const fechar = useCallback(() => setAbertoEm(null), []);

  // Sombra do cabeçalho ao rolar
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueio de rolagem, Esc e armadilha de foco quando o menu está aberto
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const painel = painelRef.current;
    const focaveis = () =>
      Array.from(
        painel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).concat(botaoRef.current ? [botaoRef.current] : []);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbertoEm(null);
        botaoRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      if (!lista.length) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-creme/95 transition-shadow duration-300",
        rolou ? "shadow-[0_6px_24px_-12px_rgb(42_35_32/0.25)]" : "shadow-none",
      )}
    >
      <div className="container-aceg flex h-[4.5rem] items-center justify-between gap-4 nav:h-20">
        <Link href="/" aria-label="ACEG – Associação Comunitária Eugênio Góes, página inicial" className="shrink-0 rounded-lg">
          <Logo altura={48} prioridade className="nav:!h-14" />
        </Link>

        <nav aria-label="Principal" className="hidden nav:block">
          <ul className="flex items-center gap-1">
            {navPrincipal.map((item) => {
              const on = ativo(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-[0.9375rem] font-bold transition-colors hover:text-comunidade",
                      on ? "text-comunidade" : "text-tinta",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-sol transition-transform duration-300 origin-left",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden nav:block">
            <Button href={navApoio.href} tamanho="sm">
              {navApoio.label}
            </Button>
          </div>
          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAbertoEm(aberto ? null : pathname)}
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-12 place-items-center rounded-full bg-white text-tinta shadow-soft transition hover:bg-areia nav:hidden"
          >
            {aberto ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      <div
        id="menu-movel"
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        inert={!aberto}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-creme transition-[opacity,transform] duration-300 ease-out nav:hidden",
          aberto ? "translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-3 opacity-0",
        )}
      >
        <nav aria-label="Menu móvel" className="container-aceg flex min-h-full flex-col py-6">
          <ul className="flex flex-col">
            {navPrincipal.map((item, i) => {
              const on = ativo(pathname, item);
              return (
                <li key={item.href} className="border-b border-borda">
                  <Link
                    href={item.href}
                    onClick={fechar}
                    aria-current={on ? "page" : undefined}
                    style={{ transitionDelay: aberto ? `${60 + i * 30}ms` : "0ms" }}
                    className={cn(
                      "flex min-h-14 items-center justify-between font-display text-2xl font-bold transition duration-300",
                      on ? "text-comunidade" : "text-tinta",
                      aberto ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                    )}
                  >
                    {item.label}
                    {on && <span aria-hidden="true" className="size-2.5 rounded-full bg-sol" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 pb-8">
            <Button href={navApoio.href} tamanho="lg" seta className="w-full" onClick={fechar}>
              {navApoio.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
