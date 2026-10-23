import { Baby } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SeloBranco } from "@/components/ui/Logo";
import { ArcoAberto, Circulo, PontosDaMarca, QuartoDeCirculo } from "@/components/ui/Shapes";
import { heroFoto } from "@/data/home";
import { organization } from "@/data/organization";

export function Hero({ unidadesCei }: { unidadesCei: number }) {
  return (
    <section aria-labelledby="titulo-hero" className="relative isolate overflow-hidden bg-creme">
      <ArcoAberto cor="areia" className="absolute -left-40 top-24 -z-10 hidden w-[34rem] lg:block" />
      <Circulo cor="rosa" className="absolute -bottom-24 left-[38%] -z-10 hidden w-56 lg:block" />

      <div className="container-aceg grid items-center gap-10 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-24 lg:pt-16">
        <div className="min-w-0 animate-rise">
          <p className="eyebrow inline-flex items-center gap-2 text-abraco">
            <span aria-hidden="true" className="h-[3px] w-8 rounded-full bg-abraco" />
            {organization.nomeCompleto}
          </p>
          <h1 id="titulo-hero" className="mt-4 text-[length:var(--text-display)] leading-[0.98]">
            Juntos, construímos oportunidades e{" "}
            <span className="text-abraco [background:linear-gradient(transparent_84%,#F4B823_84%,#F4B823_96%,transparent_96%)] [box-decoration-break:clone]">transformamos vidas.</span>
          </h1>
          <p className="lead mt-6 max-w-xl">{organization.descricaoCurta}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projetos" tamanho="lg" seta>
              Conheça nossos projetos
            </Button>
            <Button href="/como-apoiar" tamanho="lg" variante="contorno">
              Faça parte dessa história
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[26rem] animate-rise sm:max-w-[30rem] lg:max-w-none [animation-delay:120ms]">
          <div className="relative mx-auto aspect-[4/5] w-[90%] lg:w-[92%]">
            <ArcoAberto
              cor="abraco"
              className="absolute -left-[14%] -top-[8%] z-0 w-[78%] rotate-[18deg] sm:-left-[16%]"
            />
            <PontosDaMarca className="absolute -right-[6%] top-[4%] z-20 w-[22%]" />

            <div className="absolute inset-0 z-10">
              {heroFoto ? (
                <PhotoFrame
                  src={heroFoto.src}
                  alt={heroFoto.alt}
                  forma="arco"
                  proporcao="h-full w-full"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  prioridade
                />
              ) : (
                <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[var(--radius-card)] bg-comunidade shadow-lift">
                  <Circulo cor="sol" className="absolute -bottom-[10%] -left-[12%] w-[46%]" />
                  <QuartoDeCirculo cor="semente" className="absolute -bottom-px -right-px w-[34%] rotate-90" />
                  <ArcoAberto cor="branco" className="absolute -right-[22%] top-[10%] w-[60%] opacity-20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <SeloBranco tamanho={300} className="w-[58%] max-w-[17rem] drop-shadow-[0_18px_30px_rgb(0_0_0/0.18)]" />
                  </div>
                </div>
              )}
            </div>

            <div className="absolute -bottom-5 left-[-6%] z-30 flex max-w-[15rem] items-center gap-3 rounded-[var(--radius-card)] border border-borda bg-white p-3.5 pr-5 shadow-lift sm:-left-[10%]">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ceu text-comunidade">
                <Baby aria-hidden="true" size={22} />
              </span>
              <p className="text-[0.8125rem] font-semibold leading-snug text-tinta-suave">
                <strong className="block font-display text-lg font-bold leading-none text-tinta">{unidadesCei} unidades</strong>
                de educação infantil na rede
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
