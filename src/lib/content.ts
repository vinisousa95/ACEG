import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  CategoriaDocumento,
  CategoriaGaleria,
  CategoriaProjeto,
  TipoPublicacao,
} from "@/data/categorias";
import type { Tema } from "@/lib/theme";

/**
 * Camada de conteúdo: lê arquivos Markdown/JSON da pasta /content.
 * É a mesma estrutura que o CMS (Decap, ver public/admin) edita — publicar
 * no CMS = gravar um arquivo aqui via Git.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Publicacao {
  slug: string;
  titulo: string;
  /** data de publicação (ISO) */
  data: string;
  /** data do evento (ISO), quando a publicação trata de um evento */
  dataEvento?: string;
  tipo: TipoPublicacao;
  resumo: string;
  corpo: string;
  imagem?: string;
  imagemAlt?: string;
  galeria: { src: string; alt: string }[];
  projeto?: string;
  tags: string[];
  origem?: string;
}

export interface Projeto {
  slug: string;
  titulo: string;
  categoria: CategoriaProjeto;
  situacao: "atual" | "historico";
  resumo: string;
  corpo: string;
  icone: string;
  ordem: number;
  periodo?: string;
  publico?: string;
  objetivos: string[];
  oQueOferece: string[];
  resultados: string[];
  imagem?: string;
  imagemAlt?: string;
  galeria: { src: string; alt: string }[];
  noticias: string[];
  participar?: string;
}

export interface Unidade {
  slug: string;
  titulo: string;
  tipo: "creche" | "sede" | "social";
  ordem: number;
  resumo: string;
  descricao: string;
  corpo: string;
  bairro?: string;
  endereco?: string;
  enderecoMapa?: string;
  complemento?: string;
  telefones: string[];
  email?: string;
  cnpj?: string;
  imagem?: string;
  imagemAlt?: string;
  documentos: string[];
}

export interface Documento {
  slug: string;
  titulo: string;
  categoria: CategoriaDocumento;
  ano: number;
  data?: string;
  descricao: string;
  arquivo: string;
}

export interface FotoGaleria {
  slug: string;
  titulo: string;
  categoria: CategoriaGaleria;
  data?: string;
  imagem: string;
  alt: string;
  legenda?: string;
}

export interface Indicador {
  id: string;
  valor: number;
  sufixo?: string;
  rotulo: string;
  contexto: string;
  fonte: string;
  tema: Tema;
  formato?: "numero" | "ano";
  status: "confirmado" | "pendente";
}

function lerColecao(nome: string): { slug: string; data: Record<string, unknown>; content: string }[] {
  const dir = path.join(CONTENT_DIR, nome);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), data, content: content.trim() };
    });
}

/** YAML converte datas sem aspas em Date; normaliza tudo para string ISO. */
function iso(v: unknown): string | undefined {
  if (v == null || v === "") return undefined;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function lista(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

function imagens(v: unknown): { src: string; alt: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((i) => (i && typeof i === "object" ? (i as Record<string, unknown>) : null))
    .filter((i): i is Record<string, unknown> => !!i && typeof i.src === "string")
    .map((i) => ({ src: String(i.src), alt: String(i.alt ?? "") }));
}

export function getPublicacoes(): Publicacao[] {
  return lerColecao("noticias")
    .map(({ slug, data, content }) => ({
      slug,
      titulo: String(data.titulo),
      data: iso(data.data) ?? new Date(0).toISOString(),
      dataEvento: iso(data.dataEvento),
      tipo: (data.tipo as TipoPublicacao) ?? "noticia",
      resumo: String(data.resumo ?? ""),
      corpo: content,
      imagem: data.imagem ? String(data.imagem) : undefined,
      imagemAlt: data.imagemAlt ? String(data.imagemAlt) : undefined,
      galeria: imagens(data.galeria),
      projeto: data.projeto ? String(data.projeto) : undefined,
      tags: lista(data.tags),
      origem: data.origem ? String(data.origem) : undefined,
    }))
    .filter((p) => !(p as unknown as { rascunho?: boolean }).rascunho)
    .sort((a, b) => b.data.localeCompare(a.data));
}

export function getPublicacao(slug: string): Publicacao | undefined {
  return getPublicacoes().find((p) => p.slug === slug);
}

export function getProjetos(): Projeto[] {
  return lerColecao("projetos")
    .map(({ slug, data, content }) => ({
      slug,
      titulo: String(data.titulo),
      categoria: data.categoria as CategoriaProjeto,
      situacao: (data.situacao as Projeto["situacao"]) ?? "atual",
      resumo: String(data.resumo ?? ""),
      corpo: content,
      icone: String(data.icone ?? "heart"),
      ordem: Number(data.ordem ?? 99),
      periodo: data.periodo ? String(data.periodo) : undefined,
      publico: data.publico ? String(data.publico) : undefined,
      objetivos: lista(data.objetivos),
      oQueOferece: lista(data.oQueOferece),
      resultados: lista(data.resultados),
      imagem: data.imagem ? String(data.imagem) : undefined,
      imagemAlt: data.imagemAlt ? String(data.imagemAlt) : undefined,
      galeria: imagens(data.galeria),
      noticias: lista(data.noticias),
      participar: data.participar ? String(data.participar) : undefined,
    }))
    .sort((a, b) => a.ordem - b.ordem);
}

export function getProjeto(slug: string): Projeto | undefined {
  return getProjetos().find((p) => p.slug === slug);
}

export function getUnidades(): Unidade[] {
  return lerColecao("unidades")
    .map(({ slug, data, content }) => ({
      slug,
      titulo: String(data.titulo),
      tipo: (data.tipo as Unidade["tipo"]) ?? "creche",
      ordem: Number(data.ordem ?? 99),
      resumo: String(data.resumo ?? ""),
      descricao: String(data.descricao ?? ""),
      corpo: content,
      bairro: data.bairro ? String(data.bairro) : undefined,
      endereco: data.endereco ? String(data.endereco) : undefined,
      enderecoMapa: data.enderecoMapa ? String(data.enderecoMapa) : undefined,
      complemento: data.complemento ? String(data.complemento) : undefined,
      telefones: lista(data.telefones),
      email: data.email ? String(data.email) : undefined,
      cnpj: data.cnpj ? String(data.cnpj) : undefined,
      imagem: data.imagem ? String(data.imagem) : undefined,
      imagemAlt: data.imagemAlt ? String(data.imagemAlt) : undefined,
      documentos: lista(data.documentos),
    }))
    .sort((a, b) => a.ordem - b.ordem);
}

export function getUnidade(slug: string): Unidade | undefined {
  return getUnidades().find((u) => u.slug === slug);
}

export function getDocumentos(): Documento[] {
  return lerColecao("documentos")
    .map(({ slug, data }) => ({
      slug,
      titulo: String(data.titulo),
      categoria: data.categoria as CategoriaDocumento,
      ano: Number(data.ano),
      data: iso(data.data),
      descricao: String(data.descricao ?? ""),
      arquivo: String(data.arquivo),
    }))
    .sort((a, b) => b.ano - a.ano || a.titulo.localeCompare(b.titulo, "pt-BR"));
}

export function getGaleria(): FotoGaleria[] {
  return lerColecao("galeria")
    .map(({ slug, data }) => ({
      slug,
      titulo: String(data.titulo),
      categoria: data.categoria as CategoriaGaleria,
      data: iso(data.data),
      imagem: String(data.imagem),
      alt: String(data.alt ?? data.titulo),
      legenda: data.legenda ? String(data.legenda) : undefined,
    }))
    .sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));
}

export function getIndicadores(somenteConfirmados = true): Indicador[] {
  const file = path.join(CONTENT_DIR, "configuracoes", "indicadores.json");
  if (!fs.existsSync(file)) return [];
  const json = JSON.parse(fs.readFileSync(file, "utf8")) as { indicadores: Indicador[] };
  return json.indicadores.filter((i) => !somenteConfirmados || i.status === "confirmado");
}
