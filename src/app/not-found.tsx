import { Button } from "@/components/ui/Button";
import { Marca } from "@/components/ui/Logo";
import { ArcoAberto, Circulo } from "@/components/ui/Shapes";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <ArcoAberto cor="areia" className="absolute -left-24 top-10 -z-10 w-96" />
      <Circulo cor="rosa" className="absolute -right-16 bottom-4 -z-10 w-64" />
      <div className="container-aceg flex flex-col items-center py-20 text-center sm:py-28">
        <Marca altura={96} />
        <p className="eyebrow mt-6 text-abraco">Erro 404</p>
        <h1 className="mt-2">Não encontramos esta página</h1>
        <p className="lead mt-4 max-w-xl">O endereço pode ter mudado ou não existir mais. Vamos te ajudar a voltar ao caminho.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" seta>Ir para o início</Button>
          <Button href="/noticias" variante="contorno">Ver notícias</Button>
        </div>
      </div>
    </section>
  );
}
