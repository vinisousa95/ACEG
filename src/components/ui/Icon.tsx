import {
  Baby,
  BookOpen,
  Clock,
  Flower2,
  Heart,
  HeartHandshake,
  House,
  PartyPopper,
  Scissors,
  Sprout,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/** Ícones de traço permitidos pelo guia (sem emojis, uma cor por ícone). */
const mapa: Record<string, ComponentType<LucideProps>> = {
  baby: Baby,
  "book-open": BookOpen,
  clock: Clock,
  "flower-2": Flower2,
  heart: Heart,
  "heart-handshake": HeartHandshake,
  house: House,
  "party-popper": PartyPopper,
  scissors: Scissors,
  sprout: Sprout,
  users: Users,
};

export function Icon({ nome, ...props }: { nome: string } & LucideProps) {
  const Cmp = mapa[nome] ?? Heart;
  return <Cmp strokeWidth={2} aria-hidden="true" {...props} />;
}

export function FacebookIcon(props: LucideProps) {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
