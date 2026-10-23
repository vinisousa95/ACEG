/**
 * Conteúdo institucional da página "Quem somos".
 * Textos reescritos a partir da página "Sobre nós" do site anterior,
 * sem alterar os fatos. Itens marcados com `// VALIDAR` dependem de confirmação.
 */

export const eugenio = {
  nascimento: "20 de junho de 1926",
  falecimento: "6 de fevereiro de 2003",
  capitulos: [
    {
      id: "origem",
      titulo: "Um caipira de Mirassol",
      texto: [
        "Eugênio Góes nasceu em 20 de junho de 1926, em Mirassol, na região de São José do Rio Preto, no interior de São Paulo. Foi criado pela mãe, Maria Rita, em Santa Luzia, junto com a irmã, em uma casa simples, de barro. Não chegou a conhecer o pai, que morreu de malária quando ele nasceu.",
        "A infância foi difícil: trabalhou na roça e no engenho, fabricando aguardente e rapadura, e acordava de madrugada para ajudar nas entregas de charrete ou carroça.",
      ],
    },
    {
      id: "carater",
      titulo: "Inteligência, fé e alto astral",
      texto: [
        "Estudou até a quarta série do primário. Era muito inteligente, adorava matemática e fazia contas de cabeça, mas faltava à escola com frequência porque precisava trabalhar.",
        "Tinha um alto astral e uma alegria por dentro que nenhuma dificuldade abalava. Havia nele muita fé. Participava da comunidade da Igreja de Santa Luzia, ajudando na construção, nas festas e nos leilões para arrecadar fundos para a paróquia.",
      ],
    },
    {
      id: "sao-paulo",
      titulo: "Chegada a São Paulo",
      texto: [
        "Aos 26 anos, veio trabalhar na capital. Passou três meses na Pirelli e, em seguida, foi para a Lacta, empresa da qual se orgulhava e onde ficou 22 anos como caramelista: segundo a família, a alma dele era doce.",
        "Aos 34 anos casou-se em José Bonifácio e foi morar no Jabaquara, em casa alugada, perto da irmã. Em 1962, comprou a primeira casa, no Jardim Bandeirantes, onde nasceram os cinco filhos: três homens e duas mulheres.",
      ],
    },
    {
      id: "comunidade",
      titulo: "Dedicação à comunidade",
      texto: [
        "Depois do primeiro infarto, em 1974, aposentou-se por invalidez e passou a se dedicar não só à família, mas também à comunidade. Gostava de se sentir útil, principalmente ajudando.",
        "Ajudou a Igreja Bom Jesus de Piraporinha com teatros, quermesses, rifas e bingos, cuja arrecadação ia para reformas e manutenção da paróquia. Já aposentado, representou a comunidade em pedidos à prefeitura (asfalto) e à Sabesp (água e esgoto) e ajudou vizinhos a regularizar a escritura de seus imóveis. Também era presença certa nas reuniões da APM da escola dos filhos.",
      ],
    },
    {
      id: "vizinhanca",
      titulo: "Amizade, festa e truco",
      texto: [
        "Era muito querido: não tinha vícios nem atritos com ninguém. Aos sábados, os vizinhos se reuniam para jogar truco e contar piadas, em rodízio, cada semana na casa de um amigo. Gostava de festas, de excursões à praia e a Aparecida do Norte, que reuniam boa parte da comunidade.",
        "Em 1985, mudou-se para uma pequena chácara no Jardim Progresso, em Embu-Guaçu, onde continuou ajudando os vizinhos e se lembrava das origens criando, plantando e colhendo.",
      ],
    },
    {
      id: "legado",
      titulo: "O legado",
      texto: [
        "Eugênio faleceu em 6 de fevereiro de 2003, em casa, em Embu-Guaçu, deixando cinco filhos e onze netos. Sempre ressaltou a importância da união, da harmonia, da honestidade, da educação e do respeito entre todos. Para ele, família unida era sinônimo de alegria.",
        "Deixou muitas saudades e o agradecimento de todos que ajudou. Seu sonho de proporcionar um mundo melhor para a comunidade começou a se tornar realidade em 2009, pelas mãos de sua filha, Ana Maria Goes dos Santos.",
      ],
    },
  ],
} as const;

export interface MarcoHistorico {
  ano: string;
  data?: string;
  titulo: string;
  texto: string;
  tema: "azul" | "verde" | "amarelo" | "vermelho";
  fonte: string;
}

/** Linha do tempo: somente datas citadas nas fontes. */
export const linhaDoTempo: MarcoHistorico[] = [
  {
    ano: "1926",
    data: "20/06/1926",
    titulo: "Nasce Eugênio Góes",
    texto: "Em Mirassol, interior de São Paulo.",
    tema: "amarelo",
    fonte: "Sobre nós (site anterior)",
  },
  {
    ano: "1962",
    titulo: "A primeira casa",
    texto: "Eugênio compra a casa do Jardim Bandeirantes, onde nasceram seus cinco filhos.",
    tema: "verde",
    fonte: "Sobre nós (site anterior)",
  },
  {
    ano: "1974",
    titulo: "Dedicação à comunidade",
    texto: "Após o primeiro infarto, Eugênio se aposenta e passa a dedicar-se também à comunidade.",
    tema: "vermelho",
    fonte: "Sobre nós (site anterior)",
  },
  {
    ano: "2003",
    data: "06/02/2003",
    titulo: "Falece Eugênio Góes",
    texto: "Deixa cinco filhos e onze netos, e o exemplo de união, honestidade e respeito.",
    tema: "azul",
    fonte: "Sobre nós (site anterior)",
  },
  {
    ano: "2009",
    titulo: "O sonho começa a virar realidade",
    texto: "Pelas mãos de sua filha, Ana Maria Goes dos Santos, nasce o projeto que daria origem à ACEG.",
    tema: "amarelo",
    fonte: "Sobre nós (site anterior)",
  },
  {
    ano: "2014",
    data: "17/09/2014",
    titulo: "Convênio com o Mesa Brasil",
    texto: "A ACEG passa a ser conveniada ao Mesa Brasil. No mesmo ano, realiza a festa do Dia das Crianças com a Turma do Bem.",
    tema: "vermelho",
    fonte: "Notícias (site anterior)",
  },
  {
    ano: "2022",
    data: "06/01/2022",
    titulo: "Editais de bolsas de estudo social",
    texto: "As unidades CEI Pequenos Gênios publicam o Edital nº 01/2022 para bolsas CEBAS 100% gratuitas em tempo integral.",
    tema: "azul",
    fonte: "Documentos públicos",
  },
  {
    ano: "2024",
    data: "11/11/2024",
    titulo: "Chegam os sabões artesanais",
    texto: "A ACEG divulga o sabão artesanal, produto social que ajuda a manter os projetos.",
    tema: "verde",
    fonte: "Notícias (site anterior)",
  },
  {
    ano: "2025",
    titulo: "Oficinas e ações com a comunidade",
    texto: "Turmas de crochê, costura, pintura e bordado, Outubro Rosa e a ação Beleza na Comunidade, com o Salão Villa Baobá.",
    tema: "verde",
    fonte: "Notícias (site anterior)",
  },
];

export const missao =
  "Promover o crescimento integral de crianças, relacionando arte e cultura, educação, prática de esportes e saúde.";

export const visao =
  "Ser uma instituição socioeducativa de referência, que atua como agente transformador na formação de crianças em situação de risco, promovendo a defesa dos direitos humanos.";

export const valores = [
  "Ética",
  "Solidariedade",
  "Credibilidade",
  "Respeito à diversidade",
  "Integridade",
  "Inovação",
  "Envolvimento",
  "Responsabilidade",
];

export const principios = [
  "Respeito aos direitos da criança.",
  "Respeito ao ser humano e à sua diversidade.",
  "Abertura para o novo e para a criatividade.",
  "Ações de incentivo ao empreendedorismo.",
  "Reconhecimento da sustentabilidade como fator que maximiza os resultados da instituição na busca da justiça social.",
  "Rigoroso e pontual cumprimento das obrigações com funcionários, usuários e provedores voluntários.",
  "Convicção de que, para se desenvolver, é preciso agir com ética, compartilhando-a com administradores, funcionários e a comunidade.",
];

export const objetivosSociais = [
  {
    titulo: "Tempo bem aproveitado",
    texto: "Ocupar o tempo das crianças de forma construtiva, reduzindo o espaço e o tempo para influências negativas.",
    icone: "clock",
  },
  {
    titulo: "Hábitos saudáveis e valores",
    texto: "Criar hábitos saudáveis e valorizar princípios éticos e morais, contribuindo para reduzir a violência, a agressividade e o uso de drogas.",
    icone: "heart",
  },
  {
    titulo: "Espaços agradáveis",
    texto: "Oferecer espaços alternativos acolhedores: complemento educacional, refeições diárias, biblioteca, brinquedoteca e videoteca, e eventos socioculturais.",
    icone: "house",
  },
];

export const origemAcao = {
  textoCurto:
    "Na década de 1990, um grupo de amigos se reuniu em torno do desejo de desenvolver trabalhos sociais, organizar eventos culturais e promover melhorias em uma área vulnerável da comunidade. Esse grupo é a ACEG de hoje.",
  // VALIDAR: o site anterior cita "década de 90" (Início) e "2009" (projeto). Confirmar o marco oficial de fundação.
};

/** Estrutura organizacional: cargos citados no site anterior. Nomes só aparecem após validação. */
export const estrutura = {
  nomesValidados: false,
  cargos: [
    { cargo: "Presidência" },
    { cargo: "Direção geral" },
    { cargo: "Secretaria" },
  ],
  // VALIDAR: cargos e nomes vêm da página "Nossa equipe" do site anterior.
  pessoas: [
    { cargo: "Presidência", nome: "Aline Góes" },
    { cargo: "Direção geral", nome: "Ana Góes" },
    { cargo: "Secretaria", nome: "Aline Rodrigues" },
  ],
};

export const areasDeAtuacao = [
  { titulo: "Educação infantil", texto: "Unidades CEI Pequenos Gênios, com bolsas de estudo social.", icone: "baby", tema: "azul" as const },
  { titulo: "Ações comunitárias", texto: "Cuidado, saúde e convivência com as famílias.", icone: "heart-handshake", tema: "vermelho" as const },
  { titulo: "Oficinas e produtos sociais", texto: "Artesanato, renda e sabão artesanal.", icone: "sprout", tema: "verde" as const },
];

export const parceriasRegistradas = [
  { nome: "Mesa Brasil", detalhe: "Convênio realizado em 17/09/2014.", ano: 2014 },
  { nome: "Galera do Bem e Turma do Bem", detalhe: "Festas de Dia das Crianças, Páscoa e Natal (2014–2016).", ano: 2014 },
  { nome: "Salão de Beleza Villa Baobá", detalhe: "Projeto Beleza na Comunidade (24/11/2025).", ano: 2025 },
  { nome: "Escola Alberto Conte", detalhe: "Alunos do 3º ano do ensino médio organizaram festa e presentes, pelo terceiro ano consecutivo (2014).", ano: 2014 },
];
