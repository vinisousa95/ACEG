# Informações a validar antes do lançamento

Tudo o que veio do site antigo (https://aceg.webnode.page/) ou do Guia de Identidade Visual e **não pôde ser confirmado** está listado aqui. Os itens marcados com `validado: false` ficam nos arquivos de dados indicados.

## 1. Contatos (divergências encontradas no site antigo)

| Item | O que o site antigo diz | Como está no novo site |
|---|---|---|
| Telefone fixo | (11) 3442-6328 (página Contato e rodapé de todas as páginas) | Publicado — **confirmar se está ativo** |
| WhatsApp | (11) 99298-8061 (rotulado "Claro – Whats App") | Publicado como WhatsApp — **confirmar que é o número oficial de WhatsApp** |
| Outros celulares | Oi (11) 96239-1162; TIM (11) 95285-7370; (11) 99335-5718; (11) 5841-0764 | **Não publicados** — confirmar quais continuam ativos |
| E-mail institucional | aceg.eugeniogoes@outlook.com | Publicado — confirmar |
| Outros e-mails | anachocs@hotmail.com, anachocs@gmail.com (página Equipe), projetoesperanca.aceg@gmail.com | **Não publicados** (dados pessoais/ambíguos) |
| Endereço da sede | Contato: **Rua Dapoli, 9, Jd. Santa Edwirges, CEP 04913-080**. Rodapé: **Rua Bento Daniel de Mendonça, 139, Jd. Santa Margarida** ("Projeto Esperança") | Publicado Rua Dapoli, 9 (consistente com avisos de 2014 sobre a "base na Rua Dapoli") — **confirmar qual é o endereço atual e se o outro é uma unidade/antiga sede** |
| CEI Pequenos Gênios | Rua Alexandrina Malisano de Lima, 800, Jd. Herculano, CEP 04920-000; tel. (11) 5831-6143 | Publicado — confirmar |
| Facebook | facebook.com/profile.php?id=100070619625740 | Publicado — confirmar perfil oficial |
| Instagram / outras redes | O guia cita posts, mas não há perfil informado | Não publicado |

Arquivos: `src/data/organization.ts`, `content/unidades/*.md`.

## 2. PIX e doações

- O site antigo traz a chave `96d69ece-5cf3-4ece-9fe2-df6d4b370f27` (post de 03/02/2016, "Banco do Brasil").
- **Não é exibida** e **não há QR Code**. Para ativar: confirmar titularidade, preencher `beneficiario` e `instituicao` e trocar `validado` para `true` em `src/data/organization.ts` (objeto `pix`).
- O site antigo também tem um link de pagamento do PagSeguro (`pag.ae/7_7aevpsJ`) no post dos sabões: **não foi reproduzido**. Confirmar se está ativo antes de usar.

## 3. Indicadores (`content/configuracoes/indicadores.json`)

Publicados (com fonte): 5 unidades de educação infantil (editais 2022), 1 sede social, 4 modalidades de oficinas (2025), início do projeto em 2009.

**Pendentes — não aparecem no site** (vêm do Guia de Identidade Visual):

- **8 creches** — os editais nomeiam 5 unidades (CEI Pequenos Gênios, II, III, Flores e Topázio). Quais são as 8?
- **1.120 atendimentos** — período e definição.
- **200 funcionários** — data de referência e tipo de vínculo.
- **30 anos** — o site antigo cita "década de 90" (grupo de amigos) e 2009 (início do projeto). Qual é o marco oficial?

Para publicar, mude `"status"` para `"confirmado"` e preencha contexto e fonte.

## 4. Unidades

- O guia fala em "rede de oito creches"; só **cinco** nomes estão documentados. Endereço, telefone e fotos de **CEI Pequenos Gênios II, III, Flores e Topázio** estão em branco (a página mostra "em validação").
- Os CNPJs exibidos nas páginas das unidades vêm dos editais de 2022 (raiz 11.297.788). Confirmar se a raiz é o CNPJ da própria ACEG e se pode ser exibido no rodapé.
- A notícia "Inauguração da Creche Jd. Herculano" (link `cms.aceg.webnode.com`) não está acessível; só se sabe que existiu.

## 5. Textos institucionais

- **"Evangelizar"**: o site antigo diz que o objetivo do grupo é "evangelizar o desenvolvimento de trabalhos sociais". Foi escrito "desenvolver trabalhos sociais"; confirmar a intenção.
- **Cronologia de fundação**: "década de 90" (grupo de amigos) × "2009" (projeto). A linha do tempo usa só 2009 como data; confirmar datas oficiais de fundação/registro.
- **Origem do nome** e a frase "a semente que permite o sonho crescer" derivam do texto original; confirmar a redação.
- **Histórias de Eugênio Góes**: texto resumido e reorganizado a partir do original, sem inventar fatos; recomenda-se revisão da família (Ana Maria Goes dos Santos).
- **Retrato de Eugênio**: sem foto; espaço reservado.
- **Diretoria/equipe**: o site antigo lista Aline Góes (Presidente), Ana Góes (Diretora Geral) e Aline Rodrigues (Secretária). **Nomes não publicados** até validação (`src/data/institucional.ts`, `estrutura.nomesValidados`).
- **Projeto Esperança (reforço escolar, refeições, biblioteca)**: descrito no "Sobre nós" sem data. Confirmar se continua ativo (hoje aparece como "atual").
- **Festas 2013–2016**: publicadas como projeto **histórico**. Dois avisos de Natal 2016 (03/12 e 17/12) parecem duplicados; confirmar.
- **Sabão artesanal**: o texto original dizia "solicite já o seu" com o link de pagamento; no novo site, orienta a falar com a ACEG. Definir o canal oficial de pedidos.
- **Parcerias registradas** (Mesa Brasil, Galera do Bem/Turma do Bem, Villa Baobá, Escola Alberto Conte): vêm de notícias e do livro de visitas de 2014; confirmar se ainda são parcerias e se podem ser citadas.
- **Fernando Fernandes (ex-BBB)**: citado como apoiador na festa de Natal 2016; confirmar se pode ser mencionado.

## 6. Fotografias e imagem

- **Nenhuma foto com crianças foi publicada.** A foto do post de doações (crianças dormindo) e todo o acervo da galeria do site antigo (festas, Natal 2013/2015, Retrospectiva 2016) **não foram usados** por falta de autorização de imagem verificada.
- Estão em uso 4 imagens do site antigo (colagens das oficinas, Beleza na Comunidade e Outubro Rosa 2025 — com adultos — e foto do sabão). **Confirmar autorização de uso de imagem dos participantes e direitos de uso.** Se algum participante não autorizar, remova o arquivo em `content/galeria`, `content/noticias`, `content/projetos` e `public/images`.
- O rótulo do sabão exibe o logotipo antigo; considerar nova foto com a marca atual.
- Falta fotografia autêntica para o hero (`src/data/home.ts` → `heroFoto`), fachadas das unidades e equipe.

## 7. Transparência

Publicados apenas os 5 editais CEBAS nº 01/2022 (PDFs do site antigo). Faltam para as demais categorias (estatuto, relatórios, prestação de contas, convênios, parcerias): a ACEG precisa fornecer os arquivos reais.

## 8. Técnicos / jurídicos

- **Revisão jurídica da Política de Privacidade** e definição do encarregado (DPO) e prazo de retenção.
- **Envio de e-mail**: definir SMTP e os destinatários (`.env`, ver README).
- **Domínio e `NEXT_PUBLIC_SITE_URL`** (canonical, sitemap e Open Graph).
- **CMS**: ativar o login (OAuth do GitHub) — ver README.
- **Lighthouse**: metas (Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 95) devem ser medidas no ambiente final; ver README.
