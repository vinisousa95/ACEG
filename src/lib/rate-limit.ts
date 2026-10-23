import "server-only";

/**
 * Limitador simples em memória (por instância). Em hospedagem serverless,
 * troque por um armazenamento compartilhado (ex.: Upstash/Redis) se o volume
 * de abuso justificar. Guarda apenas contadores — nenhum dado pessoal.
 */
const janelas = new Map<string, { n: number; reinicia: number }>();

export function limitar(chave: string, max: number, janelaMs: number): boolean {
  const agora = Date.now();
  if (janelas.size > 5000) {
    for (const [k, v] of janelas) if (v.reinicia < agora) janelas.delete(k);
  }
  const atual = janelas.get(chave);
  if (!atual || atual.reinicia < agora) {
    janelas.set(chave, { n: 1, reinicia: agora + janelaMs });
    return true;
  }
  atual.n += 1;
  return atual.n <= max;
}
