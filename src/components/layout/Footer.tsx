import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ArcoAberto } from "@/components/ui/Shapes";
import { FacebookIcon } from "@/components/ui/Icon";
import { organization, whatsappUrl } from "@/data/organization";
import { navRodape } from "@/data/navigation";
import { getUnidades } from "@/lib/content";

function ColunaLinks({ titulo, itens }: { titulo: string; itens: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-sol">{titulo}</h2>
      <ul className="mt-4 space-y-2.5">
        {itens.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="font-semibold text-white/95 underline-offset-4 transition hover:text-white hover:underline">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const unidades = getUnidades().filter((u) => u.endereco);
  const { contatos, redes } = organization;

  return (
    <footer className="relative mt-auto overflow-hidden bg-tinta text-white">
      <ArcoAberto cor="abraco" className="absolute -bottom-24 -right-24 w-80 opacity-30 sm:w-[26rem]" />
      <div className="container-aceg relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="ACEG – página inicial" className="inline-block rounded-lg">
              <Logo versao="reversa-escuro" altura={60} />
            </Link>
            <p className="mt-5 text-white/80">{organization.descricaoLonga}</p>
            <ul className="mt-5 flex gap-3">
              {redes.map((r) => (
                <li key={r.id}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${r.nome} da ACEG (abre em nova aba)`}
                    className="grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-sol hover:text-tinta"
                  >
                    <FacebookIcon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ColunaLinks titulo="A ACEG" itens={navRodape.instituicao} />
          <ColunaLinks titulo="Participe" itens={navRodape.participe} />

          <div>
            <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-sol">Contato</h2>
            <ul className="mt-4 space-y-3 text-white/95">
              <li className="flex gap-3">
                <Phone aria-hidden="true" size={20} className="mt-1 shrink-0 text-sol" />
                <a href={`tel:${contatos.telefoneFixo.tel}`} className="font-semibold hover:text-white hover:underline">
                  {contatos.telefoneFixo.exibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle aria-hidden="true" size={20} className="mt-1 shrink-0 text-sol" />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-white hover:underline">
                  WhatsApp {contatos.whatsapp.exibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden="true" size={20} className="mt-1 shrink-0 text-sol" />
                <a href={`mailto:${contatos.email.endereco}`} className="break-all font-semibold hover:text-white hover:underline">
                  {contatos.email.endereco}
                </a>
              </li>
              {unidades.map((u) => (
                <li key={u.slug} className="flex gap-3">
                  <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0 text-sol" />
                  <span>
                    <Link href={`/unidades/${u.slug}`} className="font-bold text-white hover:underline">
                      {u.titulo}
                    </Link>
                    <br />
                    <span className="text-[0.9375rem]">{u.endereco?.split(" — ")[0]}, {u.bairro}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {organization.nomeCompleto}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {navRodape.transparencia.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="font-semibold underline-offset-4 hover:text-white hover:underline">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
