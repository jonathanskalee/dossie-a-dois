/**
 * Caso 05 — "Ensaio Geral" (folia, barracão da Unidos do Cruzeiro, hoje).
 *
 * Verdade do caso (para quem edita): Neide Sampaio, presidente da escola,
 * desviou a maior parte do patrocínio da Aloisio Bebidas — 180 mil contratados,
 * 42 mil em material no barracão. Wanderley, conferindo as notas para fechar o
 * desfile, viu o buraco e marcou de levar ao conselho na segunda-feira. Na
 * véspera, com a bateria ensaiando (barulho que cobre tudo), Neide subiu ao
 * mezanino do galpão e soltou a trava do guincho que segurava o abre-alas
 * enquanto Wanderley ajustava a peça embaixo. Parece acidente de cabo velho —
 * mas o cabo está inteiro.
 *
 * Jorjão mente por lealdade à escola (não quer a diretoria na roda). Dandara
 * mente porque voltou escondida para gravar o story de um ensaio que a
 * diretoria proibira filmar. Seu Vavá acredita mesmo que foi o cabo. Rick nega
 * ter falado com Wanderley para não ser arrastado ao escândalo.
 */
import type { Case } from "../types";

const caso: Case = {
  id: "caso05-folia",
  version: 1,
  title: "Ensaio Geral",
  tagline: "A bateria não parou a noite toda. Foi o que todo mundo jurou.",
  theme: "folia",
  difficulty: 3,
  estimatedMinutes: 45,

  briefing: {
    shared:
      "Barracão da Unidos do Cruzeiro, véspera do desfile. No ensaio geral, com a bateria a todo vapor, Wanderley Braga — carnavalesco da escola há nove anos — foi encontrado embaixo do carro abre-alas, esmagado por uma alegoria de quatrocentos quilos. A diretoria já falou com a imprensa: cabo velho, acidente de trabalho, tragédia. O desfile é amanhã e ninguém quer conversa. Vocês têm esta madrugada.",
    detective:
      "Você é quem conversa. No barracão todo mundo protege a escola antes de proteger a verdade — e cada um mente por um motivo diferente. Anote o que cada um AFIRMA e repita em voz alta para seu par: no meio das versões tem uma que não fecha.",
    perito:
      "Você é quem examina. Um guincho, um gravador de ensaio, um celular e uma pasta de notas fiscais. Anote o que cada prova MOSTRA e conte ao seu par — aqui os objetos são mais honestos que a gente.",
  },

  suspects: [
    {
      id: "neide",
      name: "Neide Sampaio",
      role: "a presidente da escola",
      portraitEmoji: "👑",
      description:
        "Doze anos na presidência, três títulos, uma sala com ar-condicionado no fundo do barracão. Fala com a imprensa antes de falar com a família dos outros.",
      interviews: [
        {
          id: "ne-noite",
          question: "Onde a senhora estava durante o ensaio geral?",
          answer: [
            { text: "Na minha sala, meu filho, onde mais? " },
            {
              text: "Passei a noite inteira fechando a planilha do desfile, não saí da presidência nem para tomar água",
              ref: "ne-claim-sala",
            },
            {
              text: ". Ensaio geral é hora de quem ensaia. Só desci quando ouvi o corre-corre, e aí já tinha gente demais lá embaixo. O Wanderley era da casa, sabe? Nove anos. Isso aqui vai desfilar amanhã por ele.",
            },
          ],
          claims: [
            { id: "ne-claim-sala", summary: "Neide: “passei a noite toda na sala da presidência”" },
          ],
        },
        {
          id: "ne-chave",
          question: "Quem tem a chave da trava do guincho?",
          answer: [
            { text: "Essa chave é responsabilidade minha, e eu levo isso a sério. " },
            {
              text: "Ela fica no quadro da presidência e não saiu de lá a noite inteira",
              ref: "ne-claim-chave",
            },
            {
              text: ". Guincho de alegoria não é brinquedo. O Wanderley tinha a cópia dele porque era carnavalesco, subia no mezanino cem vezes por dia. Se ele mexeu na trava sozinho, aí eu não posso responder.",
            },
          ],
          claims: [
            { id: "ne-claim-chave", summary: "Neide: “a chave da trava não saiu do quadro”" },
          ],
        },
        {
          id: "ne-notas",
          question: "O patrocínio foram cento e oitenta mil. Cadê o material?",
          answer: [
            { text: "Que insinuação é essa dentro do meu barracão? " },
            {
              text: "Cada centavo dos cento e oitenta mil virou material, está tudo nas notas da pasta, pode conferir uma por uma",
              ref: "ne-claim-notas",
            },
            {
              text: ". Isopor, ferragem, tecido, tinta, cachê de escultor. Vocês acham que alegoria nasce em árvore? E eu ainda tive que correr atrás de doação porque não chegava. Perguntem a qualquer um aqui como eu corri.",
            },
          ],
          claims: [
            {
              id: "ne-claim-notas",
              summary: "Neide: “os 180 mil viraram material, está tudo nas notas”",
            },
          ],
        },
      ],
    },
    {
      id: "jorjao",
      name: "Jorjão",
      role: "o mestre de bateria",
      portraitEmoji: "🥁",
      description:
        "Trinta anos de couro e baqueta. Manda em duzentos e oitenta ritmistas com um apito e um olhar. A escola vem antes de tudo — inclusive antes do que ele viu.",
      interviews: [
        {
          id: "jo-ensaio",
          question: "Ninguém ouviu nada?",
          answer: [
            { text: "Ouvir o quê, doutor? Bateria de escola grande é uma parede de som. " },
            {
              text: "A gente entrou às oito e só parou à meia-noite, sem intervalo nenhum — nem para respirar",
              ref: "jo-claim-semparar",
            },
            {
              text: ". Se caísse um avião ali dentro, a gente ia saber pelo jornal. Ensaio geral é ensaio geral: emenda tudo, do abre-alas ao último carro, e não para.",
            },
          ],
          claims: [
            {
              id: "jo-claim-semparar",
              summary: "Jorjão: “a bateria tocou das 20h à meia-noite sem parar”",
            },
          ],
        },
        {
          id: "jo-relacao",
          question: "Como era a relação do Wanderley com a presidente?",
          answer: [
            { text: "Ave Maria, os dois eram unha e carne. " },
            {
              text: "Nunca vi aqueles dois trocarem uma palavra atravessada em nove anos",
              ref: "jo-claim-davambem",
            },
            {
              text: ". Ela batalhava o dinheiro, ele fazia a arte. Escola é isso: cada um no seu quadrado. Agora, se o senhor quer saber de intriga, procure outro barracão — aqui a gente desfila.",
            },
          ],
          claims: [
            {
              id: "jo-claim-davambem",
              summary: "Jorjão: “Neide e Wanderley nunca discutiram”",
            },
          ],
        },
      ],
    },
    {
      id: "dandara",
      name: "Dandara Ribeiro",
      role: "a porta-bandeira",
      portraitEmoji: "💃",
      description:
        "Primeiro casal há seis anos, cento e quarenta mil seguidores e um contrato de publicidade que a diretoria finge não ver. Sabe exatamente onde fica cada câmera do barracão.",
      interviews: [
        {
          id: "da-onde",
          question: "Até que horas você ficou no barracão?",
          answer: [
            { text: "Ensaiei o meu, que é o mais pesado, e caí fora. " },
            {
              text: "Saí nove e meia da noite e não voltei mais, fui direto para casa gelar o joelho",
              ref: "da-claim-saiu",
            },
            {
              text: ". Amanhã eu tenho oitenta minutos de avenida com doze quilos de saia. Não é hora de ficar de conversa no barracão.",
            },
          ],
          claims: [
            { id: "da-claim-saiu", summary: "Dandara: “saí às 21h30 e não voltei”" },
          ],
        },
        {
          id: "da-wanderley",
          question: "Você viu o Wanderley naquela noite?",
          answer: [
            { text: "Vi, e ele não estava bem. Estava naquele canto do galpão, com o celular na mão, escrevendo e apagando, escrevendo e apagando. " },
            {
              text: "Perguntei se estava tudo certo e ele disse: “depois do desfile a gente conversa, menina, tem coisa aqui que você não imagina”",
              ref: "da-claim-depois",
            },
            {
              text: ". Aí subiu para o mezanino. Foi a última vez. E olha, eu menti do horário porque a diretoria proibiu filmar o ensaio geral e eu postei mesmo assim — não porque eu tenha feito nada com aquele homem.",
            },
          ],
          claims: [
            {
              id: "da-claim-depois",
              summary: "Dandara: Wanderley disse “depois do desfile a gente conversa”",
            },
          ],
        },
      ],
    },
    {
      id: "vava",
      name: "Seu Vavá",
      role: "o aderecista",
      portraitEmoji: "🔧",
      description:
        "Quarenta anos colando pluma e dobrando ferro no mesmo barracão. Conhece cada parafuso — e reclama de todos eles desde 1998.",
      interviews: [
        {
          id: "va-guincho",
          question: "O que aconteceu com o guincho?",
          answer: [
            { text: "Aconteceu o que eu venho gritando desde o carnaval passado. " },
            {
              text: "Aquele cabo estava podre de velho e arrebentou, eu avisei a diretoria umas mil vezes",
              ref: "va-claim-cabo",
            },
            {
              text: ". Está lá no caderninho, com data. Pedi cabo novo em outubro, pedi em novembro, pedi em janeiro. Sabe o que me disseram? Que não tinha verba. Não tinha verba, moço. E agora tem velório.",
            },
          ],
          claims: [
            { id: "va-claim-cabo", summary: "Vavá: “o cabo do guincho arrebentou de velho”" },
          ],
        },
        {
          id: "va-galpao",
          question: "Quem sobe ao mezanino do galpão?",
          answer: [
            { text: "Sobe pouca gente, e sempre por trabalho. Eu, o Wanderley, os dois montadores. " },
            {
              text: "A escada do mezanino range que é uma desgraça, dá para ouvir de qualquer canto do galpão — quando não tem bateria tocando, claro",
              ref: "va-claim-escada",
            },
            {
              text: ". A diretoria não sobe nunca. Salto alto e mezanino não combinam.",
            },
          ],
          claims: [
            {
              id: "va-claim-escada",
              summary: "Vavá: “a escada do mezanino range e se ouve de longe”",
            },
          ],
        },
      ],
    },
    {
      id: "rick",
      name: "Rick Aloisio",
      role: "o patrocinador",
      portraitEmoji: "🕶️",
      description:
        "Herdeiro da Aloisio Bebidas, dono do camarote e do logo estampado na lateral de todos os carros. Aparece no barracão de óculos escuros às onze da noite.",
      interviews: [
        {
          id: "ri-verba",
          question: "O senhor tratava de dinheiro com quem, na escola?",
          answer: [
            { text: "Com a presidência, sempre. É o protocolo da empresa: um contrato, um interlocutor. " },
            {
              text: "Com o carnavalesco eu nunca falei de dinheiro, nunca — nem uma mensagem sobre isso",
              ref: "ri-claim-nuncafalei",
            },
            {
              text: ". Meu contato com o Wanderley era estético, digamos. Cor do logo, tamanho do logo, onde entra o logo. Coisa de marca.",
            },
          ],
          claims: [
            {
              id: "ri-claim-nuncafalei",
              summary: "Rick: “nunca falei de dinheiro com Wanderley”",
            },
          ],
        },
        {
          id: "ri-confronto",
          question: "Ele te pediu as notas do patrocínio. Por que mentiu?",
          answer: [
            { text: "Porque eu tenho quatro escolas patrocinadas e uma marca para cuidar, e a última coisa que eu preciso é do meu nome numa investigação. Está bem: ele me escreveu na quinta. Queria saber quanto a Aloisio tinha repassado, no total, no ano. " },
            {
              text: "Eu mandei o valor e mandei o contrato em anexo — e disse a ele para resolver isso dentro da escola, não comigo",
              ref: "ri-claim-mandei",
            },
            {
              text: ". Ele agradeceu e disse que ia esperar o desfile passar. Se eu soubesse no que ia dar, tinha ligado para a polícia naquela quinta.",
            },
          ],
          claims: [
            {
              id: "ri-claim-mandei",
              summary: "Rick: “mandei o contrato a Wanderley e mandei resolver dentro da escola”",
            },
          ],
        },
      ],
    },
  ],

  evidence: [
    {
      id: "laudo-corpo",
      name: "Laudo do legista",
      kind: "laudo",
      body: [
        { text: "Vítima: Wanderley Braga, 54 anos, carnavalesco. " },
        {
          text: "Morte por esmagamento torácico entre 22h e 22h30, sob peça de alegoria de aproximadamente 400 kg",
          ref: "f-esmagamento",
        },
        {
          text: ". A peça caiu de uma altura de três metros, do berço do abre-alas. Detalhe registrado pelo legista: ",
        },
        {
          text: "nenhuma lesão de defesa nas mãos ou nos braços — a vítima não viu a peça vir",
          ref: "f-sem-defesa",
        },
        { text: ". Estava de costas, com a chave de fenda ainda na mão, ajustando a base." },
      ],
      facts: [
        { id: "f-esmagamento", summary: "Morte por esmagamento entre 22h e 22h30" },
        { id: "f-sem-defesa", summary: "Nenhuma lesão de defesa: ele não viu a peça cair" },
      ],
    },
    {
      id: "laudo-guincho",
      name: "Perícia do guincho",
      kind: "laudo",
      body: [
        { text: "O guincho de coluna que suspende as peças do abre-alas foi periciado ainda montado. " },
        {
          text: "O cabo de aço está inteiro, sem rompimento nem desgaste crítico — a peça caiu porque a TRAVA de segurança foi solta",
          ref: "f-cabo-intacto",
        },
        {
          text: ". A trava é um pino com fechadura, exatamente para que ninguém a solte por engano. E ela não foi arrombada: ",
        },
        {
          text: "a chave estava na própria fechadura da trava, esquecida, ainda pendurada no cordão",
          ref: "f-chave-na-trava",
        },
        { text: ". O acionamento fica no mezanino, fora do alcance de quem está embaixo da alegoria." },
      ],
      facts: [
        { id: "f-cabo-intacto", summary: "O cabo está INTEIRO: a trava foi solta" },
        { id: "f-chave-na-trava", summary: "A chave da trava estava na fechadura, esquecida" },
      ],
    },
    {
      id: "quadro-chaves",
      name: "Quadro de chaves da presidência",
      kind: "objeto",
      body: [
        { text: "Um quadro de madeira com dezoito ganchos etiquetados, atrás da mesa da presidência. " },
        {
          text: "O gancho “GUINCHO — TRAVA” está vazio, e o quadro só é acessível de dentro da sala da presidência, que fica trancada",
          ref: "f-gancho-vazio",
        },
        { text: ". A cópia que pertencia ao carnavalesco foi encontrada no molho dele, no bolso da calça, junto com a chave do carro." },
      ],
      facts: [
        {
          id: "f-gancho-vazio",
          summary: "O gancho da chave da trava está vazio, dentro da sala da presidência",
        },
      ],
    },
    {
      id: "gravacao-ensaio",
      name: "Gravação do ensaio geral",
      kind: "digital",
      body: [
        { text: "A escola grava todo ensaio geral para o mestre analisar depois; o gravador fica pendurado na viga, no meio do barracão, e roda direto. " },
        {
          text: "A bateria parou às 22h05 e só voltou às 22h25 — vinte minutos de intervalo no meio do ensaio",
          ref: "f-silencio-20min",
        },
        { text: ". O gravador continuou ligado no silêncio. Aos 22h11, ao fundo, longe do microfone: " },
        {
          text: "duas vozes discutindo no mezanino, uma de homem e uma de mulher, e a palavra “conselho” repetida três vezes",
          ref: "f-vozes-discussao",
        },
        { text: ". Aos 22h19, um estalo metálico seco. Aos 22h20, o baque." },
      ],
      facts: [
        { id: "f-silencio-20min", summary: "A bateria PAROU das 22h05 às 22h25" },
        {
          id: "f-vozes-discussao",
          summary: "22h11: homem e mulher discutindo no mezanino, falando em “conselho”",
        },
      ],
    },
    {
      id: "celular-dandara",
      name: "O celular de Dandara",
      kind: "digital",
      body: [
        { text: "Story publicado e apagado dezoito minutos depois, recuperado do rascunho automático. " },
        {
          text: "Publicado às 22h12, com a localização do barracão — trinta e nove minutos depois do horário em que ela jurou ter ido embora",
          ref: "f-story-2212",
        },
        { text: ". Em primeiro plano, ela mostrando a saia nova. Ao fundo, desfocada mas inconfundível pelo vestido vermelho da presidência: " },
        {
          text: "Neide Sampaio subindo a escada do mezanino do galpão das alegorias",
          ref: "f-neide-galpao",
        },
        { text: ". O vídeo tem catorze segundos. Ela aparece nos quatro últimos." },
      ],
      facts: [
        { id: "f-story-2212", summary: "O story de Dandara foi publicado do barracão às 22h12" },
        { id: "f-neide-galpao", summary: "Às 22h12, Neide sobe a escada do mezanino" },
      ],
    },
    {
      id: "pasta-notas",
      name: "A pasta de notas do barracão",
      kind: "documento",
      body: [
        { text: "A pasta que a presidência entregou “aberta, pode conferir”. Foi conferido. " },
        {
          text: "As notas de material do ano somam R$ 42.180 — e a última folha, escrita à mão pelo carnavalesco, refaz a conta e para no meio da frase: “faltam 137”",
          ref: "f-notas-42mil",
        },
        { text: ". A caligrafia é a mesma dos riscos de fantasia. A caneta está grampeada na folha, como quem foi interrompido e ia voltar." },
      ],
      facts: [
        {
          id: "f-notas-42mil",
          summary: "As notas somam R$ 42.180, e Wanderley anotou “faltam 137”",
        },
      ],
    },
    {
      id: "contrato-patrocinio",
      name: "Contrato com a Aloisio Bebidas",
      kind: "documento",
      body: [
        { text: "Contrato de patrocínio do ano, três vias, assinado em agosto. " },
        {
          text: "Valor total de R$ 180.000, quitado em três parcelas com comprovante de transferência para a conta da escola",
          ref: "f-180mil",
        },
        { text: ". A cláusula sétima exige prestação de contas ao conselho deliberativo até trinta dias após o desfile. A reunião do conselho estava marcada para a segunda-feira." },
      ],
      facts: [
        { id: "f-180mil", summary: "O patrocínio foi de R$ 180.000, quitado e comprovado" },
      ],
    },
    {
      id: "mensagens-wanderley",
      name: "Mensagens no celular da vítima",
      kind: "digital",
      body: [
        { text: "O aparelho estava no bolso do peito, trincado mas funcionando. A última conversa é de quinta-feira, com o patrocinador: " },
        {
          text: "“Rick, me tira uma dúvida: quanto a Aloisio repassou para a escola este ano, no total?” — e a resposta, com o contrato em anexo",
          ref: "f-mensagem-wanderley",
        },
        { text: ". Depois disso, uma mensagem não enviada, salva como rascunho, para o presidente do conselho deliberativo: “Seu Almir, preciso falar com o senhor segunda-feira, depois do desfile. É sério. Não comente com a Neide”." },
      ],
      facts: [
        {
          id: "f-mensagem-wanderley",
          summary: "Wanderley perguntou a Rick quanto a Aloisio repassou — e Rick respondeu",
        },
      ],
    },
  ],

  contradictions: [
    {
      id: "c-vava-cabo",
      claimId: "va-claim-cabo",
      factId: "f-cabo-intacto",
      explanation:
        "Seu Vavá jura de pés juntos que o cabo arrebentou de velho — e ele tem razão em tudo, menos no essencial: o cabo está inteiro. A peça não caiu, foi solta. Alguém destravou o pino de segurança, e o acionamento fica no mezanino, onde Wanderley não estava. Isso aqui não é acidente de trabalho.",
      unlocks: ["l-trava"],
    },
    {
      id: "c-neide-chave",
      claimId: "ne-claim-chave",
      factId: "f-chave-na-trava",
      explanation:
        "“A chave fica no quadro e não saiu de lá.” A perícia achou a chave enfiada na própria fechadura da trava, esquecida no cordão — e o gancho do quadro, dentro da sala trancada da presidência, está vazio. Quem destravou aquele pino tinha a chave da presidente na mão.",
      unlocks: ["l-gravacao"],
    },
    {
      id: "c-jorjao-bateria",
      claimId: "jo-claim-semparar",
      factId: "f-silencio-20min",
      explanation:
        "“Sem intervalo nenhum, nem para respirar.” A gravação do próprio ensaio mostra vinte minutos de silêncio absoluto, das 22h05 às 22h25 — e a morte aconteceu dentro dessa janela. Não foi o barulho que engoliu o que aconteceu lá em cima. Naquele momento, o barracão inteiro podia ouvir.",
      unlocks: ["l-discussao"],
    },
    {
      id: "c-jorjao-briga",
      claimId: "jo-claim-davambem",
      factId: "f-vozes-discussao",
      explanation:
        "“Nunca vi aqueles dois trocarem uma palavra atravessada.” No silêncio da bateria, o gravador pegou duas vozes discutindo no mezanino — um homem, uma mulher — e a palavra “conselho” três vezes. Oito minutos antes do baque. O mestre está protegendo a escola; a fita não protege ninguém.",
      unlocks: ["l-celular"],
    },
    {
      id: "c-dandara-saiu",
      claimId: "da-claim-saiu",
      factId: "f-story-2212",
      explanation:
        "“Saí nove e meia e não voltei.” O story dela foi publicado às 22h12, com a localização do barracão — quarenta minutos depois. Dandara estava lá dentro na hora exata da morte. A pergunta agora é o que a câmera dela pegou sem querer.",
      unlocks: ["l-mensagens"],
    },
    {
      id: "c-neide-sala",
      claimId: "ne-claim-sala",
      factId: "f-neide-galpao",
      explanation:
        "“Não saí da presidência nem para tomar água.” Nos últimos quatro segundos do story de Dandara, desfocada mas com o vestido vermelho que ninguém mais usa naquele barracão, Neide Sampaio sobe a escada do mezanino do galpão das alegorias. Às 22h12. Um minuto depois da discussão gravada, oito antes de a peça cair.",
      unlocks: ["l-dinheiro"],
    },
    {
      id: "c-neide-notas",
      claimId: "ne-claim-notas",
      factId: "f-notas-42mil",
      explanation:
        "“Cada centavo dos cento e oitenta mil virou material.” As notas da pasta somam quarenta e dois mil e cento e oitenta reais. E a última folha é a letra do próprio Wanderley refazendo a conta, parada no meio: “faltam 137”. Ele não estava desconfiando. Ele já tinha calculado.",
      unlocks: ["l-patrocinador"],
    },
    {
      id: "c-rick-verba",
      claimId: "ri-claim-nuncafalei",
      factId: "f-mensagem-wanderley",
      explanation:
        "“Com o carnavalesco eu nunca falei de dinheiro, nem uma mensagem.” A última conversa do celular da vítima é exatamente essa: Wanderley perguntando quanto a Aloisio repassou no ano, e Rick respondendo com o contrato em anexo. O patrocinador mentiu para não entrar na história — e, ao mentir, mostrou onde ela começa.",
      unlocks: [],
    },
  ],

  leads: [
    {
      id: "l-trava",
      title: "A trava, não o cabo",
      narration:
        "Se o cabo está inteiro, alguém soltou o pino de segurança — e o pino tem fechadura. A pergunta deixou de ser “o que quebrou” e passou a ser “quem tinha a chave”.",
      reveals: [
        { type: "evidence", id: "quadro-chaves" },
        { type: "interview", suspectId: "neide", interviewId: "ne-chave" },
      ],
    },
    {
      id: "l-gravacao",
      title: "A fita da viga",
      narration:
        "Seu Vavá lembrou de uma coisa que a diretoria preferia esquecer: todo ensaio geral é gravado para o mestre analisar depois. O gravador ficou pendurado na viga a noite inteira.",
      reveals: [
        { type: "evidence", id: "gravacao-ensaio" },
        { type: "interview", suspectId: "vava", interviewId: "va-galpao" },
      ],
    },
    {
      id: "l-discussao",
      title: "Vinte minutos de silêncio",
      narration:
        "A bateria parou, mas o gravador não. Vale ouvir o que ficou registrado nesse intervalo — e perguntar ao mestre por que ele jurou que intervalo não houve.",
      reveals: [{ type: "interview", suspectId: "jorjao", interviewId: "jo-relacao" }],
    },
    {
      id: "l-celular",
      title: "Quem filmou o ensaio",
      narration:
        "A diretoria proibiu filmar o ensaio geral, o que na prática garante que alguém filmou. E a porta-bandeira do primeiro casal não passa uma noite sem postar.",
      reveals: [{ type: "evidence", id: "celular-dandara" }],
    },
    {
      id: "l-dinheiro",
      title: "O que se discute num mezanino",
      narration:
        "A presidente subiu ao galpão no meio do ensaio, um minuto depois de duas vozes discutirem sobre o conselho. A pasta de notas do barracão foi requisitada na hora.",
      reveals: [
        { type: "evidence", id: "pasta-notas" },
        { type: "interview", suspectId: "neide", interviewId: "ne-notas" },
      ],
    },
    {
      id: "l-patrocinador",
      title: "Faltam cento e trinta e sete",
      narration:
        "Quarenta e dois mil em notas. A conta interrompida do carnavalesco diz que faltam cento e trinta e sete. Faltam de quanto? Só quem assinou o cheque pode dizer — e ele apareceu no barracão às onze da noite.",
      reveals: [
        { type: "suspect", id: "rick" },
        { type: "evidence", id: "contrato-patrocinio" },
      ],
    },
    {
      id: "l-mensagens",
      title: "O celular na mão dele",
      narration:
        "Dandara viu Wanderley escrevendo e apagando mensagens pouco antes de subir. O aparelho estava no bolso do peito, trincado mas vivo.",
      reveals: [
        { type: "evidence", id: "mensagens-wanderley" },
        { type: "interview", suspectId: "dandara", interviewId: "da-wanderley" },
        { type: "interview", suspectId: "rick", interviewId: "ri-confronto" },
      ],
    },
  ],

  solution: {
    culpritId: "neide",
    minContradictions: 5,
    how: [
      { id: "how-cabo", text: "Cortou o cabo do guincho para a alegoria despencar" },
      {
        id: "how-trava",
        text: "Soltou a trava do guincho no mezanino enquanto ele trabalhava embaixo da alegoria",
      },
      { id: "how-empurrou", text: "Empurrou-o do mezanino durante a discussão" },
      { id: "how-serra", text: "Serrou a base da alegoria durante o ensaio da bateria" },
    ],
    correctHowId: "how-trava",
    why: [
      { id: "why-enredo", text: "Disputa pelo crédito do enredo do desfile" },
      {
        id: "why-verba",
        text: "Wanderley descobriu o desvio do patrocínio e ia levar ao conselho na segunda",
      },
      { id: "why-presidencia", text: "Wanderley ia disputar a presidência da escola" },
      { id: "why-rick", text: "Rick mandou calá-lo para não perder o patrocínio" },
    ],
    correctWhyId: "why-verba",
  },

  epilogue: [
    {
      heading: "O que a fita gravou",
      text: "Neide Sampaio assinou o contrato da Aloisio em agosto: cento e oitenta mil, três parcelas, todas caídas na conta da escola. No barracão entraram quarenta e dois mil em isopor, ferragem e tecido. O resto virou uma reforma de casa, um carro e a promessa, sempre adiada, de repor antes que alguém somasse. Ninguém soma as notas de um barracão — ninguém, exceto o homem que precisa fechar o desfile com elas.",
    },
    {
      text: "Wanderley somou na quinta-feira. Escreveu ao patrocinador, recebeu o contrato em anexo e entendeu o tamanho do buraco: faltavam cento e trinta e sete mil. Não gritou, não denunciou, não estragou o desfile — deixou o rascunho pronto para o presidente do conselho e decidiu esperar a segunda-feira. Foi essa gentileza que o matou: ele contou a Neide que ia contar.",
    },
    {
      text: "Às 22h05 a bateria parou para o intervalo que Jorjão jurou não ter existido. Às 22h11 os dois discutiam no mezanino, e o gravador na viga pegou a palavra “conselho” três vezes. Às 22h12 Dandara filmava a saia nova e, sem saber, filmava a presidente subindo a escada. Wanderley voltou para baixo da alegoria, de costas, com a chave de fenda na mão, para terminar o ajuste. Às 22h19, o estalo do pino. Às 22h20, quatrocentos quilos.",
    },
    {
      heading: "O desfile",
      text: "A Unidos do Cruzeiro desfilou no dia seguinte, porque escola de samba desfila. O abre-alas entrou na avenida com uma faixa preta e o nome de Wanderley Braga na lateral, no lugar onde ia o logo do patrocínio — decisão de Seu Vavá, tomada às cinco da manhã, sem pedir autorização a ninguém. Neide Sampaio assistiu do camarote, presa três horas depois da apuração. Jorjão, que mentiu para proteger a escola, foi quem entregou a gravação do ensaio.",
    },
  ],
};

export default caso;
