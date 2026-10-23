import { Handshake, HeartHandshake, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SeloBranco } from "@/components/ui/Logo";
import { ArcoAberto, Circulo, QuartoDeCirculo } from "@/components/ui/Shapes";

const acoes = [
  { titulo: "Faça uma doação", texto: "Ajude a manter as atividades da ACEG.", href: "/como-apoiar#doacoes", icone: HandHeart },
  { titulo: "Seja voluntário", texto: "Doe seu tempo e seus talentos.", href: "/como-apoiar#voluntariado", icone: HeartHandshake },
  { titulo: "Torne-se parceiro", texto: "Empresas e organizações que somam.", href: "/como-apoiar#parcerias", icone: Handshake },
];

export function ChamadaApoio() {
  return (
    <section aria-labelledby="titulo-apoio" className="container-aceg pb-16 sm:pb-24">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-card-lg)] bg-abraco px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
        <ArcoAberto cor="branco" className="absolute -right-24 -top-24 -z-10 w-80 opacity-15 sm:w-[28rem]" />
        <QuartoDeCirculo cor="sol" className="absolute -bottom-px -left-px -z-10 w-24 -rotate-90 sm:w-36" />
        <Circulo cor="comunidade" className="absolute bottom-10 right-8 -z-10 hidden w-16 sm:block" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SeloBranco tamanho={72} className="mb-5 size-16" />
            <h2 id="titulo-apoio" className="text-white">
              Uma comunidade mais forte começa com a participação de todos.
            </h2>
            <p className="mt-4 text-lg text-white/90">Escolha a forma de apoio que cabe na sua rotina. Toda ajuda chega às crianças e famílias.</p>
          </div>
          <ul className="grid gap-3">
            {acoes.map((a) => (
              <li key={a.titulo}>
                <a
                  href={a.href}
                  className="group flex min-h-[4.5rem] items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 text-tinta transition duration-200 hover:bg-creme motion-safe:hover:translate-x-1"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-rosa text-abraco">
                    <a.icone aria-hidden="true" size={24} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold leading-tight">{a.titulo}</span>
                    <span className="text-sm text-tinta-suave">{a.texto}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl font-bold text-abraco transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Button href="/como-apoiar" variante="sol" tamanho="lg" seta>
            Ver todas as formas de apoiar
          </Button>
        </div>
      </div>
    </section>
  );
}
