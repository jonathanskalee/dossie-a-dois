/**
 * Caso 04 — "A Vigília da Casa Bragança" (occult, serra fluminense, 1911).
 *
 * Verdade do caso (para quem edita): o sobrinho Estêvão pagou o médium Konrad,
 * por cartas anônimas, para forjar o fantasma da baronesa Leonor e assustar o
 * barão, que ia assinar novo testamento deixando a casa à segunda esposa,
 * Filomena. Quando o barão marcou o tabelião mesmo assim, Estêvão roubou o
 * colírio de beladona de Filomena e o despejou no cálice do tônico durante o
 * escuro da vigília — para herdar como testamento antigo e, se preciso,
 * incriminar a viúva. Konrad é fraude, mas não assassino; Gertrudes crê no
 * fantasma; Filomena viu algo e calou por medo.
 */
import type { Case } from "../types";

const caso: Case = {
  id: "caso04-occult",
  version: 1,
  title: "A Vigília da Casa Bragança",
  tagline: "Dizem que foi o fantasma. Fantasmas não deixam pegadas de lama.",
  theme: "occult",
  difficulty: 2,
  estimatedMinutes: 40,

  briefing: {
    shared:
      "Serra fluminense, 1911. Há três meses, a Casa Bragança 'assombra': retratos viram, o piano toca sozinho, e o vestido da falecida baronesa Leonor flutua nos corredores. O barão Aurélio, viúvo recém-casado com a jovem Filomena, contratou o célebre médium Konrad para uma vigília — e morreu nela, diante de todos, ao provar seu tônico no escuro. O médico da vila assinou 'coração'. O delegado da comarca, que não acredita em fantasma, mandou chamar vocês dois antes do enterro.",
    detective:
      "Você interroga os vivos desta casa: um médium, um sobrinho, uma governanta, e o que mais aparecer. Todos juram que foi o espírito. Anote o que cada um AFIRMA e conte ao seu par — nesta casa, quem mente invoca os mortos para não responder pelos vivos.",
    perito:
      "Você examina o que o fantasma deixou para trás: um cálice, pegadas, arames onde não devia haver arames. Anote o que cada prova MOSTRA e conte ao seu par — todo assombro tem mecanismo, e todo mecanismo tem dono.",
  },

  suspects: [
    {
      id: "konrad",
      name: "Mestre Konrad",
      role: "o médium",
      portraitEmoji: "🔮",
      description:
        "Célebre em três capitais, expulso de duas. Anéis em todos os dedos, voz de veludo, e a fatura dos seus 'trabalhos espirituais' sempre em dia.",
      interviews: [
        {
          id: "k-vigilia",
          question: "O que aconteceu durante a vigília?",
          answer: [
            { text: "A corrente estava formada, as luzes apagadas como manda o rito. A baronesa Leonor se manifestou — o ar gelou, os senhores teriam sentido. E então o barão bebeu do cálice e tombou. Afirmo sob juramento: " },
            {
              text: "ninguém deixou a mesa; a corrente de mãos não se quebrou um só instante, do início ao grito",
              ref: "k-claim-maos",
            },
            { text: ". O que tocou aquele cálice não era deste mundo, cavalheiros." },
          ],
          claims: [
            { id: "k-claim-maos", summary: "Konrad: “ninguém soltou as mãos nem deixou a mesa durante a vigília”" },
          ],
        },
        {
          id: "k-poderes",
          question: "As manifestações da casa são obra sua?",
          answer: [
            { text: "Ofende-me a pergunta. " },
            {
              text: "Jamais recorri a truques: cada manifestação nesta casa é genuína, e meus dons dispensam artifícios",
              ref: "k-claim-genuino",
            },
            { text: ". O vestido que flutua, o piano, os retratos — eu apenas abro a porta, senhores. Quem atravessa é a baronesa." },
          ],
          claims: [
            { id: "k-claim-genuino", summary: "Konrad: “não uso truques; as manifestações são genuínas”" },
          ],
        },
        {
          id: "k-confronto",
          question: "Encontramos os arames e as luvas. Quem pagou o teatro?",
          answer: [
            { text: "...Está bem. O ofício tem... encenações. Mas ouçam o que importa: " },
            {
              text: "eu nunca vi o rosto de quem me contratou — as ordens vinham por cartas anônimas, e o pagamento aparecia dentro do oratório da capela, em moedas de ouro",
              ref: "k-claim-anonimo",
            },
            { text: ". As cartas diziam onde assombrar, que voz usar, que noite 'a baronesa' devia chorar. Eu fabrico medo, cavalheiros, é verdade. Veneno não. Quem escreveu aquelas cartas conhecia cada tábua desta casa." },
          ],
          claims: [
            { id: "k-claim-anonimo", summary: "Konrad: “fui contratado por cartas anônimas; o pagamento aparecia no oratório”" },
          ],
        },
      ],
    },
    {
      id: "estevao",
      name: "Estêvão Bragança",
      role: "o sobrinho",
      portraitEmoji: "🎭",
      description:
        "Único sobrinho do barão, criado na casa, herdeiro de sempre — até o tio casar de novo. Sorri pouco, observa muito, e as botas dele rangem nos assoalhos que ele conhece de cor.",
      interviews: [
        {
          id: "es-vigilia",
          question: "Onde você estava durante a vigília?",
          answer: [
            { text: "Na mesa, de mãos dadas com essa gente toda, morrendo de tédio. Sou homem de ciência, delegado: " },
            {
              text: "nunca dei o menor crédito a essas sessões — só participei para vigiar o charlatão que depena meu tio",
              ref: "es-claim-cetico",
            },
            { text: ". E antes que perguntem: " },
            {
              text: "não saí do salão a noite inteira, e não piso no jardim há dias — com estas chuvas, aquilo virou um lamaçal",
              ref: "es-claim-jardim",
            },
            { text: "." },
          ],
          claims: [
            { id: "es-claim-cetico", summary: "Estêvão: “sou cético; nunca dei crédito às sessões”" },
            { id: "es-claim-jardim", summary: "Estêvão: “não saí do salão e não piso no jardim há dias”" },
          ],
        },
        {
          id: "es-heranca",
          question: "Quem herda a Casa Bragança?",
          answer: [
            { text: "Eu, naturalmente, como sempre foi. E que fique claro: " },
            {
              text: "meu tio jamais cogitou mudar o testamento — isso é fofoca de criadagem para envenenar a memória dele",
              ref: "es-claim-testamento",
            },
            { text: ". Aurélio tinha lá seus encantamentos pela nova esposa, mas família é família. A casa é dos Bragança. Sempre foi." },
          ],
          claims: [
            { id: "es-claim-testamento", summary: "Estêvão: “meu tio jamais cogitou mudar o testamento”" },
          ],
        },
        {
          id: "es-confronto",
          question: "As cartas ao médium são da sua letra. O colírio estava com suas luvas.",
          answer: [
            { text: "Muito bem, o teatro era meu! Paguei o Konrad para o tio ouvir a 'primeira esposa' desaprovar do além esse casamento ridículo. Sustos, vozes, um vestido — para ele DESISTIR do testamento novo, só isso. Mas escutem: " },
            {
              text: "assustar não é matar. Eu não toquei naquele cálice, e não sei como o colírio dela foi parar na estufa",
              ref: "es-claim-nega",
            },
            { text: ". Se alguém envenenou meu tio, procurem quem lucra chorando: a viúva." },
          ],
          claims: [
            { id: "es-claim-nega", summary: "Estêvão: “o teatro era meu, mas não matei; não toquei no cálice”" },
          ],
        },
      ],
    },
    {
      id: "gertrudes",
      name: "Gertrudes",
      role: "a governanta",
      portraitEmoji: "🕯️",
      description:
        "Trinta e oito anos servindo a Casa Bragança. Criou o barão, velou a primeira baronesa, e benze cada corredor antes de dormir. Para ela, a casa não está assombrada: está de luto.",
      interviews: [
        {
          id: "g-fantasma",
          question: "A senhora acredita no fantasma?",
          answer: [
            { text: "Acreditar? Eu VI, meu senhor. " },
            {
              text: "Vi o vestido azul da baronesa Leonor flutuar no corredor da capela, com estes olhos que a terra há de comer — três vezes eu vi",
              ref: "g-claim-fantasma",
            },
            { text: ". Ela voltou porque não aprova o que esta casa virou. Deus me perdoe, mas quando a senhora nova entrou aqui, a Casa Bragança começou a morrer." },
          ],
          claims: [
            { id: "g-claim-fantasma", summary: "Gertrudes: “vi o fantasma da baronesa Leonor três vezes, com meus olhos”" },
          ],
        },
        {
          id: "g-tonico",
          question: "Quem preparou o tônico do barão?",
          answer: [
            { text: "Eu, como toda santa noite, há vinte anos: ervas do quintal, vinho quinado, uma colher de mel. Provei um gole na cozinha, como sempre — estou aqui, viva. E " },
            {
              text: "levei o cálice nas minhas mãos da cozinha até a mesa da vigília, sem largar dele um instante, e o pus diante do barão",
              ref: "g-claim-calice",
            },
            { text: ". Depois apagaram as luzes. Se botaram veneno naquele cálice, meu senhor, foi no escuro — e foi naquela mesa." },
          ],
          claims: [
            { id: "g-claim-calice", summary: "Gertrudes: “levei o cálice sem largar dele; saiu inofensivo da cozinha”" },
          ],
        },
      ],
    },
    {
      id: "filomena",
      name: "Filomena Bragança",
      role: "a jovem viúva",
      portraitEmoji: "🌙",
      description:
        "Segunda esposa do barão, trinta anos mais nova, casada há oito meses. A casa a chama de 'a senhora nova' — nunca, em oito meses, de baronesa.",
      interviews: [
        {
          id: "fi-vigilias",
          question: "A senhora participava das vigílias?",
          answer: [
            { text: "Deus me livre. " },
            {
              text: "Nunca pus os pés nessas sessões — sou de missa, não de mesa branca; passava essas noites no meu quarto, rezando pelo juízo do meu marido",
              ref: "fi-claim-vigilias",
            },
            { text: ". Aurélio estava sendo devorado por esse circo, e a casa inteira me culpando do luto que o 'fantasma' trazia. Eu só queria meu marido de volta." },
          ],
          claims: [
            { id: "fi-claim-vigilias", summary: "Filomena: “nunca participei das vigílias; ficava rezando no quarto”" },
          ],
        },
        {
          id: "fi-confronto",
          question: "O croqui diz que a senhora estava à mesa. O que viu no escuro?",
          answer: [
            { text: "...Eu fui, sim. De véu, nas três últimas. Eu precisava ouvir com meus ouvidos a tal 'Leonor' que mandava meu marido me deserdar do coração dele. E naquela noite eu vi, senhor: quando o Konrad riscou o fósforo para o incenso, " },
            {
              text: "vi a mão do Estêvão pairando sobre o cálice do meu marido — um segundo, um brilho de vidro entre os dedos, e o escuro de novo",
              ref: "fi-claim-mao",
            },
            { text: ". Calei por medo. Nesta casa eu sou a estrangeira, a interesseira, a bruxa. Quem acreditaria na senhora nova contra o sangue dos Bragança?" },
          ],
          claims: [
            {
              id: "fi-claim-mao",
              summary: "Filomena: “no clarão do fósforo, vi a mão de Estêvão sobre o cálice, com um vidro”",
            },
          ],
        },
      ],
    },
  ],

  evidence: [
    {
      id: "laudo-comarca",
      name: "Laudo do médico da comarca",
      kind: "laudo",
      body: [
        { text: "Contra-exame requisitado pelo delegado, desautorizando o atestado de 'síncope cardíaca'. " },
        {
          text: "O cálice do tônico contém beladona em dose fulminante; o frasco do tônico na cozinha está limpo, e o gole provado pela governanta o confirma",
          ref: "f-calice",
        },
        { text: ". Morte entre 23h e 23h30, durante a vigília às escuras. Pupilas dilatadas, rubor, parada — quadro clássico de envenenamento por beladona, que o escuro e o 'fantasma' quase enterraram como assombração." },
      ],
      facts: [
        { id: "f-calice", summary: "Beladona SÓ no cálice; o frasco da cozinha estava limpo" },
      ],
    },
    {
      id: "salao-vigilia",
      name: "O salão da vigília",
      kind: "foto",
      body: [
        { text: "O salão lacrado desde o grito. Sobre o lustre, " },
        {
          text: "um trilho de arame negro e fios de seda descem até atrás do reposteiro — aparato de fazer 'flutuar' objetos às escuras",
          ref: "f-fio",
        },
        { text: ". E no assoalho, " },
        {
          text: "pegadas de lama fresca do jardim: entram pela porta-janela, contornam a mesa até a cabeceira do barão e voltam",
          ref: "f-pegadas",
        },
        { text: ". A chuva começou às nove da noite. A lama, portanto, é da própria noite da vigília." },
      ],
      facts: [
        { id: "f-fio", summary: "Arames e fios de seda no lustre: aparato de truque" },
        { id: "f-pegadas", summary: "Pegadas de lama fresca até a cabeceira do barão, na noite da morte" },
      ],
    },
    {
      id: "diario-barao",
      name: "Diário do barão",
      kind: "documento",
      body: [
        { text: "Sobre a escrivaninha do quarto, aberto na última página, tinta ainda forte: " },
        {
          text: "“Leonor me visita para me punir. Que me perdoe: amanhã às dez vem o tabelião, e faço o que é justo. F. merece a casa que este nome nunca lhe deu.”",
          ref: "f-tabeliao",
        },
        { text: " Datado da tarde da morte. O barão morreu onze horas antes do tabelião chegar." },
      ],
      facts: [
        { id: "f-tabeliao", summary: "O barão assinaria novo testamento às 10h do dia seguinte — a favor de Filomena" },
      ],
    },
    {
      id: "quarto-konrad",
      name: "O quarto do médium",
      kind: "objeto",
      body: [
        { text: "Busca no quarto de hóspedes de Konrad. No fundo falso do baú de 'instrumentos espirituais': " },
        {
          text: "luvas de gaze fosforescente, um vestido azul em cabides de arame, apitos de vozes e um caderno de ensaios — 'choro da baronesa, 3ª batida do relógio'",
          ref: "f-aparato",
        },
        { text: ". O vestido azul é cópia fiel do retrato da primeira baronesa no hall. O fantasma da Casa Bragança tinha guarda-roupa." },
      ],
      facts: [
        { id: "f-aparato", summary: "Baú de Konrad: luvas fosforescentes, vestido azul, caderno de ensaios do “fantasma”" },
      ],
    },
    {
      id: "escrivaninha-estevao",
      name: "A escrivaninha de Estêvão",
      kind: "documento",
      body: [
        { text: "A gaveta trancada da escrivaninha do sobrinho guardava duas coisas. Primeira: " },
        {
          text: "rascunhos das cartas anônimas ao médium — mesma letra, mesmas ordens: 'sábado, o choro no corredor da capela'",
          ref: "f-cartas",
        },
        { text: ". Segunda: " },
        {
          text: "uma cópia da minuta do NOVO testamento, surrupiada do escritório do tio, com as margens anotadas na letra de Estêvão: 'impedir a assinatura a qualquer custo'",
          ref: "f-minuta",
        },
        { text: "." },
      ],
      facts: [
        { id: "f-cartas", summary: "Os rascunhos das cartas anônimas ao médium são da letra de Estêvão" },
        { id: "f-minuta", summary: "Estêvão tinha a minuta do novo testamento: “impedir a assinatura a qualquer custo”" },
      ],
    },
    {
      id: "botas-estevao",
      name: "As botas de Estêvão",
      kind: "objeto",
      body: [
        { text: "Recolhidas no vestíbulo, atrás do arcaz onde as botas da casa esperam a escova. As do sobrinho: " },
        {
          text: "lama fresca até o cano, do barro vermelho da aléia da estufa — e o solado casa, medida por medida, com as pegadas do salão",
          ref: "f-botas",
        },
        { text: ". Quem 'não pisa no jardim há dias' anda com o jardim inteiro nas botas." },
      ],
      facts: [
        { id: "f-botas", summary: "Botas de Estêvão: lama fresca da estufa, solado idêntico às pegadas do salão" },
      ],
    },
    {
      id: "croqui-mesa",
      name: "Croqui da mesa da vigília",
      kind: "documento",
      body: [
        { text: "Do caderno de Konrad: o médium desenha a mesa de cada sessão, 'para equilibrar as energias'. Nas três últimas vigílias, " },
        {
          text: "a cadeira à esquerda do barão traz a mesma marca: 'dama de véu — F.' E no croqui da noite fatal, a mão direita do barão está entre 'F.' e... a cadeira de Estêvão",
          ref: "f-croqui",
        },
        { text: ". Todos na corrente, todos de mãos dadas — os dois vizinhos do cálice eram a viúva que 'nunca pisou' ali e o sobrinho cético." },
      ],
      facts: [
        { id: "f-croqui", summary: "Croqui: Filomena (“dama de véu”) esteve nas três últimas vigílias, ao lado do barão" },
      ],
    },
    {
      id: "estufa",
      name: "A estufa do jardim",
      kind: "objeto",
      body: [
        { text: "Seguindo o barro vermelho das pegadas: no canteiro dos fundos da estufa, recém-revolvido, " },
        {
          text: "um vidrinho de colírio de beladona — da penteadeira de Filomena, sumido há uma semana — enterrado dentro de um par de luvas de montaria com o monograma E.B.",
          ref: "f-vidro",
        },
        { text: ". Enterrado às pressas, na noite da chuva. Quem esconde a arma nas próprias luvas tinha pressa; quem usa o colírio da viúva tinha um plano para depois." },
      ],
      facts: [
        { id: "f-vidro", summary: "O colírio de beladona de Filomena, enterrado nas luvas E.B. de Estêvão" },
      ],
    },
  ],

  contradictions: [
    {
      id: "c-gertrudes-fantasma",
      claimId: "g-claim-fantasma",
      factId: "f-fio",
      explanation:
        "Gertrudes viu o que viu — mas o que viu tinha arame. O trilho no lustre e os fios de seda atrás do reposteiro fazem 'flutuar' o que for preciso no escuro. O fantasma da Casa Bragança é engenharia. Resta saber de quem é a oficina.",
      unlocks: ["l-quarto-konrad"],
    },
    {
      id: "c-konrad-genuino",
      claimId: "k-claim-genuino",
      factId: "f-aparato",
      explanation:
        "“Meus dons dispensam artifícios.” O baú do médium guarda os artifícios todos: luvas fosforescentes, o vestido azul copiado do retrato de Leonor, um caderno com o ensaio de cada 'manifestação'. Konrad é fraude confessa por inventário. E fraude contratada trabalha para alguém.",
      unlocks: ["l-confronto-konrad"],
    },
    {
      id: "c-estevao-cetico",
      claimId: "es-claim-cetico",
      factId: "f-cartas",
      explanation:
        "O 'cético que só vigiava o charlatão' é o autor das cartas que dirigiam o charlatão: mesma letra, ordem por ordem, susto por susto. Estêvão não assistia ao teatro — ele o escrevia. Quem encomenda um fantasma para o tio tem um motivo do tamanho de uma casa.",
      unlocks: ["l-botas"],
    },
    {
      id: "c-konrad-maos",
      claimId: "k-claim-maos",
      factId: "f-pegadas",
      explanation:
        "“Ninguém deixou a mesa, a corrente não se quebrou.” As pegadas de lama — da noite da chuva — entram pela porta-janela e vão até a cabeceira do barão. Ou a corrente se quebrou e Konrad mente, ou alguém entrou de fora durante o escuro. Nas duas hipóteses: havia mais gente em movimento naquela sala do que o médium jura. Quem mais estava à mesa?",
      unlocks: ["l-croqui"],
    },
    {
      id: "c-estevao-jardim",
      claimId: "es-claim-jardim",
      factId: "f-botas",
      explanation:
        "“Não piso no jardim há dias.” As botas dele carregam a lama fresca da aléia da estufa, e o solado casa com as pegadas do salão, medida por medida. Estêvão saiu à chuva naquela noite — até a estufa. O que se faz numa estufa, à meia-noite, na noite em que o tio morre envenenado?",
      unlocks: ["l-estufa"],
    },
    {
      id: "c-filomena-vigilias",
      claimId: "fi-claim-vigilias",
      factId: "f-croqui",
      explanation:
        "“Nunca pus os pés nessas sessões.” O croqui de Konrad registra a 'dama de véu — F.' nas três últimas vigílias, sentada à esquerda do barão — a um palmo do cálice. A viúva que 'rezava no quarto' estava à mesa na noite da morte. Por que mentir... e o que ela viu dali?",
      unlocks: ["l-confronto-filomena"],
    },
    {
      id: "c-estevao-testamento",
      claimId: "es-claim-testamento",
      factId: "f-minuta",
      explanation:
        "“Meu tio jamais cogitou mudar o testamento.” Estêvão guardava a minuta do novo testamento na gaveta trancada — anotada de próprio punho: 'impedir a assinatura a qualquer custo'. Ele sabia, ele leu, ele planejou. O tabelião viria às dez. O veneno chegou primeiro.",
      unlocks: ["l-confronto-estevao"],
    },
    {
      id: "c-gertrudes-calice",
      claimId: "g-claim-calice",
      factId: "f-calice",
      explanation:
        "Gertrudes provou o tônico na cozinha e não largou o cálice até a mesa — e a beladona está SÓ no cálice, não no frasco. As duas coisas juntas fecham a janela do crime: o veneno entrou na vigília, às escuras, pelas mãos de alguém sentado àquela mesa.",
      unlocks: [],
    },
  ],

  leads: [
    {
      id: "l-quarto-konrad",
      title: "A oficina do assombro",
      narration: "Arame no lustre é assinatura de ofício. O delegado autorizou busca no quarto do médium — e no famoso baú de 'instrumentos espirituais'.",
      reveals: [{ type: "evidence", id: "quarto-konrad" }],
    },
    {
      id: "l-confronto-konrad",
      title: "O médium sem máscara",
      narration: "Diante do próprio guarda-roupa de fantasma, Konrad trocou o além pelo aquém — e apontou o oratório onde o dinheiro aparecia.",
      reveals: [
        { type: "interview", suspectId: "konrad", interviewId: "k-confronto" },
        { type: "evidence", id: "escrivaninha-estevao" },
      ],
    },
    {
      id: "l-botas",
      title: "O barro vermelho",
      narration: "Quem escreve cartas mente com a boca, não com os pés. As botas da casa foram recolhidas do vestíbulo para exame.",
      reveals: [{ type: "evidence", id: "botas-estevao" }],
    },
    {
      id: "l-croqui",
      title: "Os lugares à mesa",
      narration: "Se havia movimento no escuro, importa saber quem sentava onde. O caderno de croquis do médium mapeia cada vigília — e revela uma convidada que ninguém mencionou.",
      reveals: [
        { type: "evidence", id: "croqui-mesa" },
        { type: "suspect", id: "filomena" },
      ],
    },
    {
      id: "l-estufa",
      title: "Aonde levam as pegadas",
      narration: "A lama das botas é da aléia da estufa. A perícia foi até lá com pás — e encontrou o canteiro dos fundos revolvido de fresco.",
      reveals: [{ type: "evidence", id: "estufa" }],
    },
    {
      id: "l-confronto-filomena",
      title: "A dama de véu",
      narration: "Confrontada com o croqui, a viúva pediu que fechassem a porta — e contou, pela primeira vez, o que o clarão do fósforo mostrou.",
      reveals: [{ type: "interview", suspectId: "filomena", interviewId: "fi-confronto" }],
    },
    {
      id: "l-confronto-estevao",
      title: "O herdeiro de sempre",
      narration: "Com a minuta anotada sobre a mesa, o sobrinho abandonou o ceticismo e o teatro — mas não a arrogância.",
      reveals: [{ type: "interview", suspectId: "estevao", interviewId: "es-confronto" }],
    },
  ],

  solution: {
    culpritId: "estevao",
    minContradictions: 5,
    how: [
      { id: "how-frasco", text: "Envenenou o frasco do tônico na cozinha, antes da vigília" },
      { id: "how-konrad", text: "Konrad envenenou o cálice a mando dele, usando os truques da sessão" },
      {
        id: "how-calice",
        text: "Despejou o colírio de beladona roubado de Filomena no cálice, durante o escuro da vigília, e enterrou o vidro na estufa",
      },
      { id: "how-leonor", text: "Usou o 'fantasma' para induzir o barão a beber um tônico estragado" },
    ],
    correctHowId: "how-calice",
    why: [
      { id: "why-vinganca", text: "Vingança: culpava o tio pela morte da baronesa Leonor" },
      { id: "why-paixao", text: "Paixão secreta por Filomena, a esposa do tio" },
      {
        id: "why-deserdado",
        text: "Seria deserdado: o novo testamento em favor de Filomena seria assinado às 10h do dia seguinte",
      },
      { id: "why-espirito", text: "Convenceu-se de que cumpria a vontade do espírito de Leonor" },
    ],
    correctWhyId: "why-deserdado",
  },

  epilogue: [
    {
      heading: "O que aconteceu na Casa Bragança",
      text: "O 'fantasma' nasceu três meses antes do crime, quando Estêvão leu, na gaveta do tio, a minuta que o deserdava. O plano era limpo: pagar Konrad por cartas anônimas para que 'Leonor' desaprovasse, do além, o novo casamento e o novo testamento. Um barão supersticioso recuaria. Aurélio não recuou — amava Filomena mais do que temia os mortos, e marcou o tabelião para as dez da manhã.",
    },
    {
      text: "Na tarde do último dia, Estêvão roubou da penteadeira de Filomena o vidrinho de colírio de beladona — veneno que, achado depois, apontaria para a viúva. Na vigília, sentou-se ao lado do tio, como sempre. Quando Konrad riscou o fósforo do incenso, soltou a mão da governanta no instante ensaiado do 'sopro frio', despejou o colírio no cálice e retomou a corrente. Um segundo, um brilho de vidro — que só a dama de véu, do outro lado do barão, viu e não compreendeu.",
    },
    {
      text: "Depois do grito, na confusão de velas e rezas, Estêvão saiu pela porta-janela na chuva, correu à estufa e enterrou o vidro dentro das próprias luvas — pressa de assassino, não de estrategista: as luvas tinham monograma, a lama tinha memória, e as pegadas de ida e volta ficaram no assoalho contando o caminho. Fantasmas, como se sabe, não deixam pegadas.",
    },
    {
      heading: "O fecho do dossiê",
      text: "Estêvão Bragança foi levado pela guarda da comarca ao amanhecer — pelas cartas, pelas botas, pela minuta anotada e pelo testemunho da dama de véu. Konrad respondeu por estelionato e deixou a serra escoltado, sem anéis. O testamento antigo, viciado pelo crime do herdeiro, caiu; a casa coube a Filomena, que aposentou Gertrudes com quarto e pensão — e mandou, enfim, tirar o luto das janelas. Dizem na vila que a Casa Bragança nunca mais rangeu à noite. Casas não rangem quando os vivos fazem as pazes com os mortos.",
    },
  ],
};

export default caso;
