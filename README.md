# Site institucional da ACEG

Novo site da **ACEG – Associação Comunitária Eugênio Góes**, em Next.js (App Router), TypeScript e Tailwind CSS 4, construído sobre o Guia de Identidade Visual oficial ("Abraço em rede").

- Conteúdo 100% em português do Brasil, reescrito a partir do site anterior **sem alterar fatos**.
- Nada foi inventado: números, contatos, unidades, documentos e fotos não confirmados ficam **fora do ar** e listados em [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

## Requisitos

- Node.js 20.9 ou superior (testado com Node 22) e npm.

## Instalação e execução

```bash
npm install
cp .env.example .env.local   # preencha para ativar os formulários
npm run dev                  # http://localhost:3000
```

Verificações e produção:

```bash
npm run lint
npm run typecheck
npm run build
npm start                    # serve a build de produção
```

## Publicação

O site usa rotas de API (formulários) e páginas com revalidação horária; portanto precisa de hospedagem **Node.js** (Vercel, Netlify com adaptador Next, Render, Railway, VPS com `npm start`…). Não é um site 100% estático.

1. Defina as variáveis do `.env.example` no painel da hospedagem (nunca commite `.env`).
2. `NEXT_PUBLIC_SITE_URL` deve ser o endereço final (usado em canonical, sitemap, Open Graph e JSON-LD).
3. Conecte o repositório e use `npm run build` / `npm start`.

### Formulários (contato, voluntariado, parcerias)

Funcionam de verdade: validação no navegador **e** no servidor (zod), campo-armadilha (honeypot), tempo mínimo de preenchimento, checagem de origem, limite de 5 envios/10 min por IP, consentimento LGPD obrigatório e envio por **SMTP** (Nodemailer). Nenhum dado é gravado em banco nem registrado em log.

Configure `SMTP_*`, `MAIL_FROM` e `MAIL_TO_*` (ou `MAIL_TO`). **Sem configuração, o servidor responde 503 e o site avisa o visitante** — nunca finge que enviou. Para um volume de abuso maior em ambiente serverless, troque o limitador em `src/lib/rate-limit.ts` por um armazenamento compartilhado (Redis/Upstash).

## Estrutura

```
src/app                rotas (Home, quem-somos, projetos, unidades, noticias, transparencia,
                       como-apoiar, galeria, contato, privacidade, api/formularios, sitemap, robots)
src/components/ui      botões, pílulas, formas da marca, cartões, logo, galeria de fotos, etc.
src/components/layout  Header (menu móvel acessível), Footer, SkipLink
src/components/sections seções da Home e cabeçalhos de página
src/data               dados institucionais (organization.ts, navegação, textos de Quem somos, categorias)
src/lib                leitura de conteúdo, SEO, validação (forms.ts), e-mail, formatação
src/styles             tokens de design e estilos globais (globals.css)
content/               CONTEÚDO EDITÁVEL: notícias, projetos, unidades, documentos, galeria, indicadores
public/assets          logotipos oficiais (SVG), selo branco
public/images          fotografias aprovadas
public/documents       PDFs da página Transparência
public/admin           painel de conteúdo (Decap CMS)
docs/PENDENCIAS.md     o que ainda precisa ser validado antes do lançamento
```

## Design system

Tokens em `src/styles/globals.css` (`@theme`): cores oficiais (Vermelho Abraço, Azul Comunidade, Verde Semente, Amarelo Sol, Tinta + Creme, Areia, Rosa, Céu, Folha), fontes **Baloo 2** (títulos, 800/700) e **Nunito Sans** (texto) — instaladas via `@fontsource-variable` (Google Fonts auto-hospedadas: sem requisições ao Google e sem cookies), escala tipográfica com `clamp()`, cartões de 28 px, botões em pílula, sombras suaves.

Logotipos: SVGs oficiais em `public/assets/logo` (apenas removido o metadado de IA e ajustado o `viewBox` ao recorte da arte — a arte não foi alterada). Use `Logo` com a versão certa para cada fundo; sobre fundos coloridos use `SeloBranco`. Formas (arcos e círculos) em `components/ui/Shapes.tsx`.

Animações: CSS + `IntersectionObserver`, desativadas com `prefers-reduced-motion` e inexistentes sem JavaScript.

## Administração de conteúdo

**Como funciona hoje:** todo o conteúdo editável está em `content/` (Markdown com cabeçalho YAML + um JSON de indicadores). Publicar = criar/editar um arquivo e fazer commit; o site é reconstruído. Exemplos:

- Nova notícia/evento: `content/noticias/meu-titulo.md` (copie um existente; `dataEvento` no futuro aparece em "Próximos eventos").
- Novo projeto: `content/projetos/…md`. Nova unidade: `content/unidades/…md`.
- Documento de transparência: coloque o PDF em `public/documents/` e crie `content/documentos/…md`.
- Foto na galeria: imagem em `public/images/` + `content/galeria/…md` (**somente com autorização de uso**; sem crianças identificáveis).
- Indicadores: `content/configuracoes/indicadores.json` (só `"status": "confirmado"` aparece).
- Contatos, PIX e redes: `src/data/organization.ts`. Textos de "Quem somos": `src/data/institucional.ts`.

**Painel visual (Decap CMS) — pré-configurado, mas NÃO ativo:** `public/admin/config.yml` já descreve todas as coleções (rascunho → revisão → publicação). Para ligar `/admin/` é necessário, uma única vez: (1) criar um OAuth App no GitHub, (2) hospedar um proxy de autenticação OAuth (por exemplo o `netlify-cms-oauth-provider-node` ou usar a autenticação do Netlify), (3) preencher `base_url` no `config.yml` e confirmar `repo`/`branch`. **Essa integração não foi testada neste ambiente** e depende dessa configuração; até lá, o painel não grava nada. Conteúdos longos de página (como a história de Eugênio) ainda ficam no código.

## SEO, acessibilidade e privacidade

- Metadados e Open Graph por página, canonical, `sitemap.xml`, `robots.txt`, JSON-LD (NGO, NewsArticle/Event, ChildCare, BreadcrumbList), hierarquia de títulos e textos alternativos.
- WCAG 2.2 AA como meta: foco visível, link "pular para o conteúdo", menu móvel com armadilha de foco e Esc, formulários com rótulos e erros anunciados, galeria com lightbox navegável por teclado, alvos de toque ≥ 44 px, contraste verificado.
- Sem cookies, rastreadores ou fontes externas. O mapa do Google só carrega quando a pessoa clica em "Carregar mapa". Política de privacidade (LGPD) em `/privacidade` — **requer revisão jurídica**.

## Qualidade verificada neste ambiente

Executados: TypeScript, ESLint e build de produção sem erros; todas as rotas respondendo; sem rolagem horizontal em 320/375/390/768/1024/1440 px; formulários testados de ponta a ponta contra um servidor SMTP local (validação, honeypot, origem, limite de tentativas, envio real); lightbox, filtros, busca e paginação.

Lighthouse (build de produção, execução local; resultados variam por máquina e devem ser re-medidos no ambiente final):

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Início | 97 | 100 | 100 | 100 |
| Contato | 98 | 100 | 100 | 100 |
| Galeria | 96 | 100 | 100 | 100 |
| Quem somos / Como apoiar / Notícia | 93–97 | 96–100 | 100 | 100 |

Para medir: `npm run build && npm start` e `npx lighthouse http://localhost:3000/`.

## Limitações conhecidas

- O painel CMS depende da configuração OAuth descrita acima.
- O envio de e-mail depende de SMTP configurado (sem ele, os formulários avisam o visitante).
- Há poucas fotografias aprovadas; o site usa espaços reservados elegantes (nunca imagens artificiais) até que a ACEG forneça registros autorizados.
