import { NextResponse, type NextRequest } from "next/server";
import { errosPorCampo, esquemas, titulosFormulario, type TipoFormulario } from "@/lib/forms";
import { emailConfigurado, enviarEmail } from "@/lib/mail";
import { limitar } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TAMANHO_MAX = 20_000;
const TEMPO_MINIMO_MS = 2_500;
const TEMPO_MAXIMO_MS = 24 * 60 * 60 * 1000;

const json = (corpo: Record<string, unknown>, status = 200) =>
  NextResponse.json(corpo, { status, headers: { "Cache-Control": "no-store" } });

function ipDe(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "desconhecido";
}

const rotulos: Record<string, string> = {
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone",
  assunto: "Assunto",
  area: "Área de interesse",
  organizacao: "Empresa/organização",
  tipo: "Tipo de parceria",
  mensagem: "Mensagem",
};

export async function POST(req: NextRequest, ctx: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await ctx.params;
  if (!(tipo in esquemas)) return json({ erro: "formulario_invalido" }, 404);
  const t = tipo as TipoFormulario;

  // Aceita apenas requisições do próprio site (mitiga abuso entre origens)
  const origem = req.headers.get("origin");
  if (origem) {
    try {
      if (new URL(origem).host !== req.headers.get("host")) return json({ erro: "origem_invalida" }, 403);
    } catch {
      return json({ erro: "origem_invalida" }, 403);
    }
  }
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ erro: "tipo_invalido" }, 415);

  const texto = await req.text();
  if (texto.length > TAMANHO_MAX) return json({ erro: "muito_grande" }, 413);

  if (!limitar(`${t}:${ipDe(req)}`, 5, 10 * 60 * 1000)) {
    return json({ erro: "muitas_tentativas", mensagem: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }, 429);
  }

  let bruto: unknown;
  try {
    bruto = JSON.parse(texto);
  } catch {
    return json({ erro: "json_invalido" }, 400);
  }

  const resultado = esquemas[t].safeParse(bruto);
  if (!resultado.success) {
    // Honeypot preenchido? Responde como sucesso, sem enviar nada, para não orientar robôs.
    if ((bruto as { website?: unknown })?.website) return json({ ok: true });
    return json({ erro: "validacao", campos: errosPorCampo(resultado.error) }, 422);
  }

  const dados = resultado.data as Record<string, unknown> & { email: string; _t?: number };

  // Armadilha de tempo: formulários preenchidos "instantaneamente" são robôs
  if (typeof dados._t === "number") {
    const decorrido = Date.now() - dados._t;
    if (decorrido < TEMPO_MINIMO_MS) return json({ ok: true });
    if (decorrido > TEMPO_MAXIMO_MS) return json({ erro: "expirado", mensagem: "A página ficou aberta por muito tempo. Recarregue e envie novamente." }, 400);
  }

  if (!emailConfigurado(t)) {
    return json(
      {
        erro: "nao_configurado",
        mensagem:
          "O envio de mensagens pelo site ainda não foi ativado. Fale conosco por telefone, WhatsApp ou e-mail, listados nesta página.",
      },
      503,
    );
  }

  const linhas = Object.entries(rotulos)
    .filter(([k]) => dados[k] !== undefined && dados[k] !== "")
    .map(([k, r]) => (k === "mensagem" ? `\n${r}:\n${String(dados[k])}` : `${r}: ${String(dados[k])}`));
  const corpo = [
    `${titulosFormulario[t]}`,
    "",
    ...linhas,
    "",
    "Consentimento para uso dos dados no atendimento: sim",
    `Recebido em: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await enviarEmail({
      tipo: t,
      assunto: `[Site ACEG] ${titulosFormulario[t]}`,
      texto: corpo,
      replyTo: dados.email,
    });
  } catch (e) {
    // Sem dados pessoais no log: apenas o tipo do erro
    console.error("[formularios] falha no envio:", e instanceof Error ? e.message.slice(0, 80) : "erro");
    return json({ erro: "falha_envio", mensagem: "Não foi possível enviar agora. Tente novamente em instantes ou fale conosco pelos contatos desta página." }, 502);
  }

  return json({ ok: true });
}

export function GET() {
  return json({ erro: "metodo_nao_permitido" }, 405);
}
