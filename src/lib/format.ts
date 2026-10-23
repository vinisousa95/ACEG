const TZ = "America/Sao_Paulo";

export function formatarData(iso: string, opcoes: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" }): string {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, ...opcoes }).format(new Date(iso));
}

export function formatarDataCurta(iso: string): string {
  return formatarData(iso, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatarHora(iso: string): string {
  return formatarData(iso, { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
}

export function formatarNumero(n: number): string {
  return new Intl.NumberFormat("pt-BR").format(n);
}

/** Evento futuro = data do evento depois de agora. */
export function ehFuturo(iso?: string, agora: Date = new Date()): boolean {
  if (!iso) return false;
  return new Date(iso).getTime() > agora.getTime();
}

export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
