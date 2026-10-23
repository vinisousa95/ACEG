import { z } from "zod";

/**
 * Esquemas de validação compartilhados entre navegador e servidor.
 * O servidor SEMPRE revalida: a validação do cliente é só conveniência.
 */

export type TipoFormulario = "contato" | "voluntariado" | "parcerias";

const semQuebra = (s: string) => !/[\r\n]/.test(s);

const nome = z
  .string({ error: "Informe seu nome." })
  .trim()
  .min(2, "Informe seu nome completo.")
  .max(100, "Use no máximo 100 caracteres.")
  .refine(semQuebra, "Texto inválido.");

const email = z
  .string({ error: "Informe seu e-mail." })
  .trim()
  .max(120, "E-mail muito longo.")
  .pipe(z.email("Informe um e-mail válido, como nome@exemplo.com."));

const telefoneOpcional = z
  .string()
  .trim()
  .max(20, "Telefone muito longo.")
  .refine((v) => v === "" || /^[\d\s()+\-]{8,20}$/.test(v), "Informe um telefone com DDD, como (11) 99999-9999.")
  .optional()
  .default("");

const telefoneObrigatorio = z
  .string({ error: "Informe um telefone." })
  .trim()
  .regex(/^[\d\s()+\-]{8,20}$/, "Informe um telefone com DDD, como (11) 99999-9999.");

const mensagem = z
  .string({ error: "Escreva uma mensagem." })
  .trim()
  .min(10, "Escreva pelo menos 10 caracteres.")
  .max(2000, "Use no máximo 2000 caracteres.");

const consentimento = z.literal(true, { error: "Para enviar, é preciso concordar com o uso dos dados." });

/** Campos de controle antispam (não aparecem para o usuário). */
const controle = {
  website: z.string().max(0).optional().default(""), // honeypot: deve ficar vazio
  _t: z.number().optional(), // instante em que o formulário foi exibido
};

export const areasVoluntariado = [
  "Oficinas e capacitação",
  "Eventos e ações comunitárias",
  "Apoio às crianças (reforço e leitura)",
  "Serviços profissionais voluntários",
  "Comunicação e divulgação",
  "Outra área",
] as const;

export const tiposParceria = [
  "Apoio financeiro",
  "Apoio com produtos ou serviços",
  "Voluntariado corporativo",
  "Parceria institucional ou convênio",
  "Outro tipo de apoio",
] as const;

export const assuntosContato = [
  "Informações gerais",
  "Vagas e bolsas na educação infantil",
  "Oficinas de artesanato",
  "Sabão artesanal e produtos sociais",
  "Imprensa e comunicação",
  "Outro assunto",
] as const;

export const esquemas = {
  contato: z.object({
    nome,
    email,
    telefone: telefoneOpcional,
    assunto: z.enum(assuntosContato, { error: "Escolha um assunto." }),
    mensagem,
    consentimento,
    ...controle,
  }),
  voluntariado: z.object({
    nome,
    email,
    telefone: telefoneObrigatorio,
    area: z.enum(areasVoluntariado, { error: "Escolha uma área de interesse." }),
    mensagem,
    consentimento,
    ...controle,
  }),
  parcerias: z.object({
    organizacao: z
      .string({ error: "Informe o nome da empresa ou organização." })
      .trim()
      .min(2, "Informe o nome da empresa ou organização.")
      .max(120)
      .refine(semQuebra, "Texto inválido."),
    nome,
    email,
    telefone: telefoneOpcional,
    tipo: z.enum(tiposParceria, { error: "Escolha o tipo de parceria." }),
    mensagem,
    consentimento,
    ...controle,
  }),
} as const;

export type DadosFormulario = {
  [K in TipoFormulario]: z.infer<(typeof esquemas)[K]>;
};

export const titulosFormulario: Record<TipoFormulario, string> = {
  contato: "Contato pelo site",
  voluntariado: "Novo voluntário",
  parcerias: "Proposta de parceria",
};

export function errosPorCampo(erro: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of erro.issues) {
    const campo = String(issue.path[0] ?? "form");
    if (!out[campo]) out[campo] = issue.message;
  }
  return out;
}
