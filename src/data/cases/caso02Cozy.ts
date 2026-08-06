/**
 * Caso 02 — "Morte no Bazar da Primavera" (cozy, Vila Boa Vista, hoje).
 *
 * Verdade do caso (para quem edita): Cecília Fontes, vice-presidente do
 * bazar, desviava as doações. Eulália descobriu e ia expor na assembleia.
 * Cecília salpicou amendoim torrado moído na torta reservada de Eulália
 * (alérgica, como toda a vila sabia) e escondeu a caneta de emergência da
 * bolsa dela. Beatriz, a sobrinha, chegou mais cedo do que disse — para
 * fazer as pazes. Marina e Godofredo só têm o azar de estarem por perto.
 */
import type { Case } from "../types";

const caso: Case = {
  id: "caso02-cozy",
  version: 1,
  title: "Morte no Bazar da Primavera",
  tagline: "Na vila onde todos se conhecem, alguém conhecia a vítima bem demais.",
  theme: "cozy",
  difficulty: 1,
  estimatedMinutes: 35,

  briefing: {
    shared:
      "Vila Boa Vista, véspera do Bazar da Primavera. Dona Eulália Prado, presidente do bazar há vinte e dois anos, foi encontrada sem vida na copa do salão paroquial, ao lado de uma torta mordida. O médico da família fala em choque alérgico — a vila inteira sabia da alergia dela a amendoim. Acidente, dizem as más línguas. Mas a caneta de emergência que Eulália carregava na bolsa havia trinta anos... desapareceu.",
    detective:
      "Você é quem conversa. Em Vila Boa Vista ninguém mente com a cara fechada: mentem servindo chá. Anote o que cada um AFIRMA e repita em voz alta para seu par — a receita do crime está nos detalhes que não batem.",
    perito:
      "Você é quem examina. Uma torta, uma bolsa, um caderno de contas: coisas pequenas de uma vila pequena. Anote o que cada prova MOSTRA e conte ao seu par — um fato basta para azedar o depoimento mais doce.",
  },

  suspects: [
    {
      id: "cecilia",
      name: "Cecília Fontes",
      role: "a vice-presidente do bazar",
      portraitEmoji: "🧣",
      description:
        "Vinte anos à sombra de Eulália, sempre com o lenço floral no pescoço e a agenda do bazar debaixo do braço. 'Agora a responsabilidade é minha', diz, entre um suspiro e outro.",
      interviews: [
        {
          id: "ce-tarde",
          question: "Onde a senhora estava ontem à tarde?",
          answer: [
            { text: "No salão principal, minha querida, " },
            {
              text: "a tarde inteira arrumando as mesas das prendas — não pus os pés na copa nem um minuto",
              ref: "ce-claim-salao",
            },
            { text: ". Tinha tanto a fazer! A Eulália gostava de conferir os doces sozinha, na copa. Quando dei por falta dela, já... já era tarde." },
          ],
          claims: [
            { id: "ce-claim-salao", summary: "Cecília: “fiquei no salão a tarde toda, nunca entrei na copa”" },
          ],
        },
        {
          id: "ce-contas",
          question: "Como andavam as finanças do bazar?",
          answer: [
            { text: "Impecáveis, como tudo que a Eulália tocava. " },
            {
              text: "As contas do bazar são um livro aberto: cada centavo doado está anotado e guardado",
              ref: "ce-claim-contas",
            },
            { text: ". Este ano batemos o recorde de doações, sabia? A vila é generosa. E agora, com essa tragédia... o bazar precisa continuar. É o que ela ia querer." },
          ],
          claims: [
            { id: "ce-claim-contas", summary: "Cecília: “as contas do bazar são um livro aberto”" },
          ],
        },
        {
          id: "ce-confronto",
          question: "Faltam R$ 3.200 e há páginas arrancadas. Explique.",
          answer: [
            { text: "Isso é uma indignidade... Está bem. Eu peguei emprestado, uns trocados, ia repor tudo antes da assembleia de domingo. Mas ouça bem: " },
            {
              text: "eu jamais tocaria na bolsa da Eulália — nunca cheguei perto dela naquele dia",
              ref: "ce-claim-bolsa",
            },
            { text: ". Emprestar dinheiro do caixa é feio, eu sei. Mas daí a machucar a mulher que me ensinou a bordar... vocês deviam ter vergonha." },
          ],
          claims: [
            { id: "ce-claim-bolsa", summary: "Cecília: “jamais toquei na bolsa de Eulália”" },
          ],
        },
      ],
    },
    {
      id: "marina",
      name: "Marina Sales",
      role: "a confeiteira nova da vila",
      portraitEmoji: "🧁",
      description:
        "Chegou há oito meses, abriu a Doceria da Praça e escandalizou a vila cobrando preço de cidade grande. Fez as tortas do bazar — inclusive a que matou.",
      interviews: [
        {
          id: "ma-torta",
          question: "Foi você quem fez a torta de Eulália?",
          answer: [
            { text: "Fui, e faria de novo de olhos fechados. Torta de damasco, a preferida dela, sem uma sombra de amendoim. " },
            {
              text: "Na minha cozinha não entra amendoim nem por engano — eu mesma sou alérgica, a doceria inteira é livre de amendoim",
              ref: "ma-claim-cozinha",
            },
            { text: ". Entreguei as tortas às duas da tarde, na copa, cada uma com etiqueta. A da Dona Eulália tinha até florzinha de açúcar. Quem fez aquilo com ela fez DEPOIS de mim." },
          ],
          claims: [
            { id: "ma-claim-cozinha", summary: "Marina: “minha cozinha é 100% livre de amendoim”" },
          ],
        },
        {
          id: "ma-encomendas",
          question: "Alguém da vila comprou algo com amendoim de você?",
          answer: [
            { text: "Já disse que minha doceria não trabalha com amendoim. " },
            {
              text: "Nunca vendi nada com amendoim a ninguém desta vila",
              ref: "ma-claim-venda",
            },
            { text: ". Agora, se me dão licença, tenho uma reputação para enterrar junto com a pobre senhora." },
          ],
          claims: [
            { id: "ma-claim-venda", summary: "Marina: “nunca vendi nada com amendoim a ninguém da vila”" },
          ],
        },
      ],
    },
    {
      id: "godofredo",
      name: "Godofredo Lima",
      role: "o zelador da paróquia",
      portraitEmoji: "🔑",
      description:
        "Quarenta anos abrindo e fechando as portas do salão paroquial. Guarda as chaves, o mau humor e a memória de todas as festas da vila.",
      interviews: [
        {
          id: "go-chaves",
          question: "Quem tinha acesso à copa ontem?",
          answer: [
            { text: "Acesso? Ninguém, ora essa. " },
            {
              text: "Tranquei a copa ao meio-dia em ponto, depois que a moça dos doces entregou as tortas, e só destranquei quando gritaram, lá pelas quatro",
              ref: "go-claim-tranca",
            },
            { text: ". A chave fica comigo, no chaveiro do cinto. Bom... a da copa tem uma cópia no quadro de chaves da sacristia, mas aquilo vive trancado também. Quer dizer... vivia." },
          ],
          claims: [
            { id: "go-claim-tranca", summary: "Godofredo: “a copa ficou trancada do meio-dia às 16h”" },
          ],
        },
        {
          id: "go-movimento",
          question: "Viu algo fora do comum durante a tarde?",
          answer: [
            { text: "Fora do comum era o tanto de gente ensaiando coral e pendurando bandeirinha. Mas teve uma coisa, sim: " },
            {
              text: "pelas três menos um quarto, ouvi a porta dos fundos do salão bater — aquela porta só bate quando alguém a deixa destrancada por dentro",
              ref: "go-claim-porta",
            },
            { text: ". Fui ver e não achei vivalma. Pensei: é o vento. O vento, veja o senhor, não abre fechadura." },
          ],
          claims: [
            { id: "go-claim-porta", summary: "Godofredo: “a porta dos fundos bateu às 14h45, destrancada por dentro”" },
          ],
        },
      ],
    },
    {
      id: "beatriz",
      name: "Beatriz Prado",
      role: "a sobrinha herdeira",
      portraitEmoji: "🌻",
      description:
        "Única herdeira de Eulália. Saiu da vila brigada com a tia há três anos e voltou de São Paulo justamente esta semana. O luto dela tem cheiro de remorso.",
      interviews: [
        {
          id: "be-chegada",
          question: "Quando você chegou à vila?",
          answer: [
            { text: "Ontem, mas " },
            {
              text: "só cheguei de São Paulo no ônibus das cinco da tarde — quando desci na rodoviária, minha tia já tinha morrido",
              ref: "be-claim-onibus",
            },
            { text: ". A gente ia se ver hoje, no bazar. Três anos sem falar com ela, detetive. Eu vinha fazer as pazes e cheguei para o velório." },
          ],
          claims: [
            { id: "be-claim-onibus", summary: "Beatriz: “cheguei à vila só às 17h, no ônibus de São Paulo”" },
          ],
        },
        {
          id: "be-confronto",
          question: "Sua passagem marca chegada às 13h20. Por que mentiu?",
          answer: [
            { text: "Porque eu estava com vergonha... Cheguei cedo, fui até o salão e espiei pela janela da copa. Minha tia estava lá dentro, discutindo com a Cecília — de dedo em riste, vermelha. Não tive coragem de entrar no meio e " },
            {
              text: "fui esperar no café da praça, onde fiquei até as quatro, quando ouvi os gritos",
              ref: "be-claim-cafe",
            },
            { text: ". A última imagem que tenho da minha tia é ela brigando por causa daquele bendito caderno de capa verde." },
          ],
          claims: [
            { id: "be-claim-cafe", summary: "Beatriz: “vi Eulália discutindo com Cecília e esperei no café até as 16h”" },
          ],
        },
      ],
    },
  ],

  evidence: [
    {
      id: "laudo-alergia",
      name: "Laudo do médico da família",
      kind: "laudo",
      body: [
        { text: "Vítima: Eulália Prado, 71 anos. " },
        {
          text: "Causa da morte: choque anafilático por ingestão de amendoim, entre 14h50 e 15h20",
          ref: "f-anafilaxia",
        },
        { text: ". A alergia era grave e conhecida: Eulália carregava uma caneta autoinjetora na bolsa havia décadas, checada religiosamente toda manhã pela farmacêutica da praça. " },
        {
          text: "A bolsa foi encontrada aberta ao lado do corpo — sem a caneta de emergência",
          ref: "f-caneta-sumida",
        },
        { text: ". Com a caneta à mão, a vítima muito provavelmente teria sobrevivido." },
      ],
      facts: [
        { id: "f-anafilaxia", summary: "Morte por amendoim entre 14h50 e 15h20" },
        { id: "f-caneta-sumida", summary: "A caneta de emergência SUMIU da bolsa de Eulália" },
      ],
    },
    {
      id: "torta",
      name: "A torta de damasco",
      kind: "objeto",
      body: [
        { text: "A torta reservada de Eulália, com a florzinha de açúcar e duas garfadas faltando. A análise da cobertura é clara: " },
        {
          text: "amendoim torrado e moído fino foi salpicado SOBRE o brilho da cobertura — depois de assada, depois de pronta, depois de entregue",
          ref: "f-amendoim-depois",
        },
        { text: ". A massa e o recheio estão limpos. As outras onze tortas da bancada: limpas. Só a torta com o nome dela." },
      ],
      facts: [
        { id: "f-amendoim-depois", summary: "O amendoim foi salpicado na torta DEPOIS da entrega, só na dela" },
      ],
    },
    {
      id: "foto-coral",
      name: "Foto do ensaio do coral",
      kind: "foto",
      body: [
        { text: "Foto tirada pela regente às 15h05 para o mural da paróquia. O coral sorri em primeiro plano; ao fundo, a janela da copa aparece aberta e, atrás do vidro, " },
        {
          text: "uma silhueta dentro da copa — com um lenço floral inconfundível no pescoço",
          ref: "f-silhueta-lenco",
        },
        { text: ". A copa que deveria estar trancada e vazia desde o meio-dia." },
      ],
      facts: [
        { id: "f-silhueta-lenco", summary: "Foto de 15h05: alguém de LENÇO FLORAL dentro da copa" },
      ],
    },
    {
      id: "caderno-doacoes",
      name: "Caderno de doações",
      kind: "documento",
      body: [
        { text: "O famoso caderno de capa verde de Eulália, achado no fundo da caixa de retalhos — longe da prateleira de sempre. " },
        {
          text: "Três páginas arrancadas e uma soma refeita a lápis na letra de Eulália: “faltam R$ 3.218,40 — falar com C. antes da assembleia”",
          ref: "f-desvio",
        },
        { text: ". Na contracapa, colado, o recibo do chaveiro da vila: cópia de chave avulsa, feita semana passada, pago em dinheiro." },
      ],
      facts: [
        { id: "f-desvio", summary: "Nota de Eulália: faltam R$ 3.218 — “falar com C. antes da assembleia”" },
      ],
    },
    {
      id: "caderno-encomendas",
      name: "Caderno de encomendas da doceria",
      kind: "documento",
      body: [
        { text: "O livro de encomendas da Doceria da Praça, cedido de má vontade. Entre bolos de aniversário e pães de mel, uma entrada da última quinta salta aos olhos: " },
        {
          text: "“farinha de amendoim torrado, 200 g — encomenda especial, retirada no balcão, pago em dinheiro, cliente: C. Fontes”",
          ref: "f-encomenda",
        },
        { text: ". A entrada está riscada com força, quase rasgando o papel — mas ainda legível contra a luz. Encomendas especiais a Marina traz de fora, lacradas: nunca entram na cozinha." },
      ],
      facts: [
        { id: "f-encomenda", summary: "Cecília comprou 200 g de farinha de amendoim na quinta" },
      ],
    },
    {
      id: "sacola-cecilia",
      name: "A sacola de tricô de Cecília",
      kind: "objeto",
      body: [
        { text: "A sacola de tricô que Cecília manteve ao pé da mesa das prendas o dia inteiro. Debaixo dos novelos: " },
        {
          text: "a caneta de emergência de Eulália, com as iniciais E.P. raspadas às pressas — e um saquinho de papel com restos de pó de amendoim",
          ref: "f-caneta-sacola",
        },
        { text: ". No fundo da sacola, a chave avulsa nova em folha, do mesmo modelo da fechadura da copa." },
      ],
      facts: [
        { id: "f-caneta-sacola", summary: "A caneta de Eulália e pó de amendoim estavam na sacola de Cecília" },
      ],
    },
    {
      id: "bilhete-onibus",
      name: "Bilhete de ônibus de Beatriz",
      kind: "documento",
      body: [
        { text: "Encontrado dobrado no bolso do casaco pendurado na pensão: bilhete São Paulo → Vila Boa Vista, " },
        {
          text: "com horário de chegada carimbado: 13h20 de ontem",
          ref: "f-bilhete-13h",
        },
        { text: " — quase quatro horas antes do que a sobrinha declarou. No verso, rabiscado a caneta: “desculpa, tia. começar de novo?”." },
      ],
      facts: [
        { id: "f-bilhete-13h", summary: "Beatriz chegou à vila às 13h20, não às 17h" },
      ],
    },
  ],

  contradictions: [
    {
      id: "c-marina-cozinha",
      claimId: "ma-claim-cozinha",
      factId: "f-amendoim-depois",
      explanation:
        "Marina jura que amendoim não passa nem na porta da doceria — e a perícia confirma: o amendoim foi salpicado na cobertura DEPOIS da torta pronta e entregue. A confeiteira diz a verdade sobre a cozinha... o que significa que o veneno entrou na copa por outras mãos. Quem mexeu na torta entre a entrega e a mordida?",
      unlocks: ["l-encomendas"],
    },
    {
      id: "c-marina-venda",
      claimId: "ma-claim-venda",
      factId: "f-encomenda",
      explanation:
        "“Nunca vendi nada com amendoim a ninguém da vila.” O caderno de encomendas — riscado, mas legível — diz outra coisa: 200 g de farinha de amendoim torrado, encomenda especial, cliente C. Fontes. Marina escondeu a venda para proteger a doceria... e, sem querer, protegeu a freguesa errada.",
      unlocks: ["l-sacola"],
    },
    {
      id: "c-cecilia-salao",
      claimId: "ce-claim-salao",
      factId: "f-silhueta-lenco",
      explanation:
        "“Não pus os pés na copa nem um minuto.” A foto do coral, tirada às 15h05, mostra uma silhueta DENTRO da copa trancada — com o lenço floral que Cecília não tira nem para dormir. Bem na janela da hora da morte.",
      unlocks: ["l-contas"],
    },
    {
      id: "c-cecilia-contas",
      claimId: "ce-claim-contas",
      factId: "f-desvio",
      explanation:
        "“Um livro aberto”, disse ela. O caderno de capa verde estava escondido na caixa de retalhos, com três páginas arrancadas e a conta de Eulália: faltam R$ 3.218 — “falar com C. antes da assembleia”. A assembleia era domingo. Eulália não chegou viva ao sábado.",
      unlocks: ["l-confronto-cecilia"],
    },
    {
      id: "c-cecilia-bolsa",
      claimId: "ce-claim-bolsa",
      factId: "f-caneta-sacola",
      explanation:
        "“Jamais toquei na bolsa da Eulália.” A caneta de emergência — a única coisa capaz de salvar a vida da presidente — estava no fundo da sacola de tricô de Cecília, com as iniciais raspadas, ao lado de um saquinho com pó de amendoim e de uma cópia nova da chave da copa. Não foi acidente. Foi receita seguida à risca.",
      unlocks: ["l-porta-fundos"],
    },
    {
      id: "c-beatriz-onibus",
      claimId: "be-claim-onibus",
      factId: "f-bilhete-13h",
      explanation:
        "Beatriz disse que desceu do ônibus às cinco — o bilhete no bolso do casaco marca 13h20. A sobrinha esteve na vila durante toda a tarde da morte. O que ela fez nessas quatro horas, e por que escondeu?",
      unlocks: ["l-confronto-beatriz"],
    },
  ],

  leads: [
    {
      id: "l-encomendas",
      title: "A encomenda especial",
      narration:
        "Se o amendoim não nasceu na cozinha de Marina, alguém o trouxe pronto. A confeiteira, espremida, entregou o caderno de encomendas da doceria.",
      reveals: [{ type: "evidence", id: "caderno-encomendas" }],
    },
    {
      id: "l-sacola",
      title: "A sacola que não desgruda",
      narration:
        "Cecília passou o dia com a sacola de tricô ao pé da mesa — e ninguém tricota num dia de bazar. O juiz de paz autorizou a busca.",
      reveals: [{ type: "evidence", id: "sacola-cecilia" }],
    },
    {
      id: "l-contas",
      title: "O caderno de capa verde",
      narration:
        "Sobre o que Eulália e a vice discutiam de dedo em riste? Na vila, dizem que a presidente andava refazendo somas. O caderno de doações apareceu — no lugar errado.",
      reveals: [{ type: "evidence", id: "caderno-doacoes" }],
    },
    {
      id: "l-confronto-cecilia",
      title: "A vice encurralada",
      narration: "Com o desvio sobre a mesa, Cecília pediu um chá de camomila e aceitou responder mais uma pergunta.",
      reveals: [{ type: "interview", suspectId: "cecilia", interviewId: "ce-confronto" }],
    },
    {
      id: "l-porta-fundos",
      title: "A porta que bateu",
      narration:
        "Uma chave avulsa nova explica a porta dos fundos que Godofredo ouviu bater. E explica também quem entrou na copa trancada sem pedir chave a ninguém.",
      reveals: [
        { type: "suspect", id: "beatriz" },
        { type: "evidence", id: "bilhete-onibus" },
      ],
    },
    {
      id: "l-confronto-beatriz",
      title: "A sobrinha que chegou cedo",
      narration: "Confrontada com o bilhete, Beatriz desabou em lágrimas — e contou o que viu pela janela da copa.",
      reveals: [{ type: "interview", suspectId: "beatriz", interviewId: "be-confronto" }],
    },
  ],

  solution: {
    culpritId: "cecilia",
    minContradictions: 4,
    how: [
      { id: "how-massa", text: "Pediu a Marina que escondesse amendoim na massa da torta" },
      {
        id: "how-salpico",
        text: "Entrou na copa com a chave copiada, salpicou farinha de amendoim na torta reservada e escondeu a caneta de emergência",
      },
      { id: "how-cha", text: "Envenenou o chá da tarde de Eulália com calda de amendoim" },
      { id: "how-troca", text: "Trocou a torta de Eulália pela torta errada, de outra encomenda" },
    ],
    correctHowId: "how-salpico",
    why: [
      { id: "why-presidencia", text: "Queria a presidência do bazar para si" },
      { id: "why-heranca-bea", text: "Foi paga por Beatriz, que herdaria tudo" },
      { id: "why-assembleia", text: "Eulália descobriu o desvio das doações e ia expô-la na assembleia de domingo" },
      { id: "why-antiga", text: "Vingança por uma humilhação antiga entre as duas famílias" },
    ],
    correctWhyId: "why-assembleia",
  },

  epilogue: [
    {
      heading: "O que aconteceu na véspera do bazar",
      text: "Cecília Fontes emprestava do caixa das doações havia três anos — um centavo aqui, uma nota ali, sempre 'até domingo'. Quando Eulália refez as somas e escreveu 'falar com C. antes da assembleia', a vice entendeu que os vinte anos de sombra terminariam em vergonha pública, na frente da vila inteira.",
    },
    {
      text: "Na quinta-feira, encomendou 200 gramas de farinha de amendoim na doceria — 'para um doce de família'. Na semana anterior, já mandara copiar a chave da copa no chaveiro da praça. Na tarde da véspera, entrou pela porta dos fundos às três menos um quarto (a porta que Godofredo ouviu bater), salpicou o amendoim sobre a única torta com florzinha de açúcar, tirou a caneta de emergência da bolsa da presidente e saiu como entrou. Quatro minutos, uma vida.",
    },
    {
      text: "Beatriz, a sobrinha, chegou às 13h20 decidida a fazer as pazes — e pela janela viu a tia brigando com Cecília por causa do caderno de capa verde. Foi esperar a poeira baixar no café da praça, ensaiando um pedido de desculpas que nunca chegou a fazer. A discussão que ela viu foi a última chance de Cecília: Eulália deu até domingo. Cecília não deu até o fim da tarde.",
    },
    {
      heading: "O fecho do dossiê",
      text: "A caneta com as iniciais raspadas, o pó de amendoim e a chave nova na sacola de tricô encerraram o caso. Cecília confessou antes do chá esfriar. O Bazar da Primavera aconteceu uma semana depois, em memória de Eulália Prado — organizado por Beatriz, que ficou na vila de vez. Na doceria de Marina, agora, há um aviso no balcão: 'Encomendas especiais só com nota. A vila entende.'",
    },
  ],
};

export default caso;
