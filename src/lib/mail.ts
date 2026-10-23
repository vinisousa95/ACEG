import "server-only";
import nodemailer from "nodemailer";
import type { TipoFormulario } from "./forms";

/**
 * Envio de e-mail via SMTP. Nada de segredos no frontend: tudo vem de variáveis
 * de ambiente do servidor (ver .env.example). Sem configuração, o envio falha
 * de forma explícita — o site nunca finge que enviou.
 */

const DESTINO: Record<TipoFormulario, string | undefined> = {
  contato: process.env.MAIL_TO_CONTATO ?? process.env.MAIL_TO,
  voluntariado: process.env.MAIL_TO_VOLUNTARIADO ?? process.env.MAIL_TO,
  parcerias: process.env.MAIL_TO_PARCERIAS ?? process.env.MAIL_TO,
};

export function emailConfigurado(tipo: TipoFormulario): boolean {
  return !!(process.env.SMTP_HOST && process.env.MAIL_FROM && DESTINO[tipo]);
}

export async function enviarEmail(opts: {
  tipo: TipoFormulario;
  assunto: string;
  texto: string;
  replyTo: string;
}): Promise<void> {
  const to = DESTINO[opts.tipo];
  if (!to || !process.env.SMTP_HOST || !process.env.MAIL_FROM) throw new Error("nao_configurado");

  const transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" } : undefined,
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporte.sendMail({
    from: process.env.MAIL_FROM,
    to,
    replyTo: opts.replyTo,
    subject: opts.assunto.replace(/[\r\n]+/g, " ").slice(0, 150),
    text: opts.texto,
  });
}
