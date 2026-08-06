/**
 * Caso 01 — "O Último Brinde" (noir, São Paulo, 1948).
 *
 * Verdade do caso (para quem edita): Vicente Sarmento, sócio da boate,
 * desviava dinheiro do caixa. Otávio marcou uma auditoria para segunda-feira.
 * Vicente envenenou o gelo do balde do camarim antes de mandar a cigarreira
 * Íris subir com a bandeja do brinde. Helena e Otávio iam fugir juntos; Dora,
 * a esposa, esteve na boate naquela noite — mas saiu antes da morte.
 */
import type { Case } from "../types";

const caso: Case = {
  id: "caso01-noir",
  version: 1,
  title: "O Último Brinde",
  tagline: "Uma boate enfumaçada, um copo envenenado e todo mundo mentindo.",
  theme: "noir",
  difficulty: 2,
  estimatedMinutes: 40,

  briefing: {
    shared:
      "São Paulo, 1948. A boate Azul Meia-Noite fechava mais uma noite lotada quando Otávio Meireles, o dono, ergueu seu uísque para o brinde de encerramento — o mesmo de todas as noites. Vinte minutos depois, foi encontrado morto no camarim, o copo ainda na mão. A polícia quer prender a cantora e encerrar o caso até o amanhecer. Vocês dois têm esta madrugada para descobrir a verdade.",
    detective:
      "Você é quem interroga. Os suspeitos vão mentir olhando nos seus olhos — anote o que cada um AFIRMA e conte para seu par o que ouviu. Uma mentira só se revela quando bate de frente com uma prova que está do outro lado da mesa.",
    perito:
      "Você é quem examina. Laudos, fotos e objetos não mentem — mas também não falam sozinhos. Anote o que cada prova MOSTRA e conte para seu par o que viu. Um fato só vira arma quando desmente o depoimento que só o detetive ouviu.",
  },

  suspects: [
    {
      id: "helena",
      name: "Helena Duarte",
      role: "a cantora da casa",
      portraitEmoji: "🎤",
      portrait: "/art/caso01Noir/helena.webp",
      description:
        "A estrela da Azul Meia-Noite. Voz de veludo, contrato com o rádio à vista — e olhos vermelhos que o rímel não disfarça.",
      interviews: [
        {
          id: "h-palco",
          question: "Onde você estava durante o último número?",
          answer: [
            { text: "Onde eu sempre estou, detetive: " },
            {
              text: "no palco, debaixo do holofote, do primeiro ao último acorde",
              ref: "h-claim-palco",
            },
            { text: ". A casa estava cheia, qualquer um pode confirmar. Depois do brinde, " },
            { text: "Otávio subiu sozinho para o camarim", ref: "h-claim-sozinho" },
            { text: ", como fazia toda noite. Foi a última vez que o vi." },
          ],
          claims: [
            { id: "h-claim-palco", summary: "Helena: “fiquei no palco durante todo o último número”" },
            { id: "h-claim-sozinho", summary: "Helena: “Otávio subiu sozinho ao camarim”" },
          ],
        },
        {
          id: "h-vitima",
          question: "Qual era a sua relação com Otávio?",
          answer: [
            { text: "Patrão e artista. " },
            { text: "Éramos próximos, mas não do jeito que essa cidade adora inventar", ref: "h-claim-romance" },
            { text: ". Ele me deu o primeiro palco decente da minha vida, só isso. Se quer um conselho, pergunte ao Vicente por que os dois " },
            { text: "quase saíram no braço no escritório, semana passada", ref: "h-claim-briga" },
            { text: ". Gritaria que a boate inteira ouviu." },
          ],
          claims: [
            { id: "h-claim-romance", summary: "Helena nega qualquer romance com Otávio" },
            { id: "h-claim-briga", summary: "Helena: “Otávio e Vicente brigaram feio semana passada”" },
          ],
        },
        {
          id: "h-confronto",
          question: "A fotografia mostra o palco vazio. Onde você estava?",
          answer: [
            { text: "...Está bem. Eu saí durante o solo do pianista. " },
            { text: "Subi ao camarim, deixei um bilhete para Otávio e desci em dois minutos", ref: "h-claim-bilhete" },
            { text: ". " },
            { text: "Não toquei em nada — nem no copo, nem na bandeja", ref: "h-claim-naotoquei" },
            { text: ". Eu precisava que ele lesse antes do fim da noite. Agora ele nunca mais vai ler." },
          ],
          claims: [
            { id: "h-claim-bilhete", summary: "Helena: “só deixei um bilhete no camarim e desci”" },
            { id: "h-claim-naotoquei", summary: "Helena: “não toquei no copo nem na bandeja”" },
          ],
        },
      ],
    },
    {
      id: "vicente",
      name: "Vicente Sarmento",
      role: "o sócio",
      portraitEmoji: "🎩",
      portrait: "/art/caso01Noir/vicente.webp",
      description:
        "Sócio de Otávio há doze anos. Terno impecável, sorriso pronto, unhas roídas até a carne.",
      interviews: [
        {
          id: "v-alibi",
          question: "Onde você estava quando Otávio morreu?",
          answer: [
            { text: "Na mesa do caixa, como toda noite de movimento. " },
            {
              text: "Não arredei o pé de lá da abertura até ouvirem os gritos",
              ref: "v-claim-caixa",
            },
            { text: ". Fechamento de sexta não se faz sozinho, detetive. Subi correndo quando a Íris gritou, e já era tarde." },
          ],
          claims: [
            { id: "v-claim-caixa", summary: "Vicente: “não saí do caixa a noite inteira”" },
          ],
        },
        {
          id: "v-negocios",
          question: "Como iam os negócios da boate?",
          answer: [
            { text: "Iam como sempre foram: " },
            { text: "de vento em popa. Casa cheia, contas em dia, nenhuma dívida", ref: "v-claim-financas" },
            { text: ". E antes que o senhor pergunte: " },
            { text: "Otávio e eu éramos como irmãos. Nunca houve uma briga entre nós", ref: "v-claim-irmaos" },
            { text: ". Doze anos de sociedade, detetive. Isso não se compra." },
          ],
          claims: [
            { id: "v-claim-financas", summary: "Vicente: “as finanças da boate iam muito bem”" },
            { id: "v-claim-irmaos", summary: "Vicente: “nunca houve briga entre mim e Otávio”" },
          ],
        },
        {
          id: "v-confronto",
          question: "O livro-caixa mostra um desfalque. Explique.",
          answer: [
            { text: "Isso é... escute. Eu devia dinheiro na mesa de bacará do Sindicato, está bem? Peguei emprestado do caixa, ia repor tudo. Mas daí a me chamar de assassino... " },
            {
              text: "Eu nunca subi ao camarim naquela noite. Nem pisei na escada",
              ref: "v-claim-nuncasubi",
            },
            { text: ". Pode perguntar a quem quiser. Otávio ia entender, ele sempre entendia." },
          ],
          claims: [
            { id: "v-claim-nuncasubi", summary: "Vicente: “nunca subi ao camarim naquela noite”" },
          ],
        },
      ],
    },
    {
      id: "sal",
      name: "Salomão “Sal” Ferraz",
      role: "o barman",
      portraitEmoji: "🍸",
      portrait: "/art/caso01Noir/sal.webp",
      description:
        "Vinte anos atrás do balcão da Azul Meia-Noite. Sabe o segredo de todo mundo e o drinque de cada um.",
      interviews: [
        {
          id: "s-copo",
          question: "Quem preparou o uísque do brinde?",
          answer: [
            { text: "Eu, como toda noite. " },
            {
              text: "Garrafa nova, lacrada, aberta na frente de meia dúzia de clientes",
              ref: "s-claim-garrafa",
            },
            { text: ". Duas pedras de gelo, " },
            { text: "tiradas do balde da bancada, o mesmo que serve o salão inteiro", ref: "s-claim-gelo" },
            { text: ". Montei a bandeja e ela subiu para o camarim. Se o veneno saiu do meu balcão, detetive, metade da cidade estaria no necrotério." },
          ],
          claims: [
            { id: "s-claim-garrafa", summary: "Sal: “a garrafa era nova e foi aberta na frente de todos”" },
            { id: "s-claim-gelo", summary: "Sal: “o gelo do copo saiu do balde comum do bar”" },
          ],
        },
        {
          id: "s-movimento",
          question: "Notou algo estranho no bar essa noite?",
          answer: [
            { text: "Estranho? A noite inteira foi estranha. O Otávio brindou com a mão firme, mas o " },
            {
              text: "Vicente passou no balcão já pelo fim da noite e pediu um conhaque duplo — a mão dele tremia tanto que entornou metade",
              ref: "s-claim-conhaque",
            },
            { text: ". E a Dona Helena cantou 'A Noite do Adeus' fora do repertório. Vinte anos de balcão, detetive: quando o repertório muda, alguma coisa mudou." },
          ],
          claims: [
            { id: "s-claim-conhaque", summary: "Sal: “Vicente tomou um conhaque no bar, tremendo, no fim da noite”" },
          ],
        },
      ],
    },
    {
      id: "dora",
      name: "Dora Meireles",
      role: "a esposa",
      portraitEmoji: "🖤",
      portrait: "/art/caso01Noir/dora.webp",
      description:
        "Casada com Otávio há quinze anos, separada de fato há um. Luto fechado, aliança no dedo, advogado ao telefone.",
      interviews: [
        {
          id: "d-alibi",
          question: "Onde a senhora estava na noite do crime?",
          answer: [
            { text: "Em casa, em Higienópolis, " },
            { text: "a noite inteira, sozinha com a criadagem", ref: "d-claim-casa" },
            { text: ". " },
            {
              text: "Não piso naquela boate há meses, detetive — aquele lugar era a outra vida dele",
              ref: "d-claim-naopiso",
            },
            { text: ". Fiquei sabendo pelo telefonema da polícia, de madrugada." },
          ],
          claims: [
            { id: "d-claim-casa", summary: "Dora: “passei a noite inteira em casa”" },
            { id: "d-claim-naopiso", summary: "Dora: “não piso na boate há meses”" },
          ],
        },
        {
          id: "d-casamento",
          question: "Como estava o seu casamento?",
          answer: [
            { text: "Como está qualquer casamento de quinze anos: cansado, mas de pé. " },
            {
              text: "Estávamos nos acertando. Otávio ia voltar para casa, era questão de semanas",
              ref: "d-claim-acerto",
            },
            { text: ". Quem espalha outra coisa quer manchar o nome dele. Ou o meu." },
          ],
          claims: [
            { id: "d-claim-acerto", summary: "Dora: “eu e Otávio estávamos nos reconciliando”" },
          ],
        },
        {
          id: "d-confronto",
          question: "O livro da portaria registra sua entrada às 22h50.",
          answer: [
            { text: "...Eu fui lá, sim. Recebi os papéis do divórcio naquela tarde e fui exigir que ele me olhasse nos olhos ao menos uma vez. Subi ao camarim e encontrei um bilhete dela em cima da penteadeira. Fugir juntos! Um homem de quarenta e sete anos! " },
            {
              text: "Rasguei meu orgulho, desci e saí antes do tal último número — o porteiro que anotou",
              ref: "d-claim-saida",
            },
            { text: ". Eu quis matá-lo, detetive. Querer não é crime. Alguém chegou antes." },
          ],
          claims: [
            { id: "d-claim-saida", summary: "Dora: “saí da boate antes do último número”" },
          ],
        },
      ],
    },
    {
      id: "iris",
      name: "Íris Camargo",
      role: "a cigarreira",
      portraitEmoji: "🚬",
      portrait: "/art/caso01Noir/iris.webp",
      description:
        "Vende cigarros mesa a mesa desde os dezessete. Ninguém repara nela — por isso ela repara em tudo.",
      interviews: [
        {
          id: "i-bandeja",
          question: "Foi você quem levou a bandeja ao camarim?",
          answer: [
            { text: "Fui, mas não foi ideia minha. " },
            {
              text: "O senhor Vicente me parou na porta do escritório, já com a bandeja montada, e mandou que eu subisse com ela às onze e quinze",
              ref: "i-claim-bandeja",
            },
            { text: ". Achei esquisito — quem sempre leva é o Sal, e o Sal nunca manda ninguém. O copo já ia pronto, com gelo e tudo. Deixei na penteadeira e desci direto. Juro pela minha mãe." },
          ],
          claims: [
            {
              id: "i-claim-bandeja",
              summary: "Íris: “Vicente me entregou a bandeja pronta e mandou subir às 23h15”",
            },
          ],
        },
      ],
    },
  ],

  evidence: [
    {
      id: "laudo-corpo",
      name: "Laudo preliminar do corpo",
      kind: "laudo",
      body: [
        { text: "Vítima: Otávio Meireles, 47 anos. " },
        {
          text: "Causa da morte: envenenamento agudo por cianeto. Hora estimada: entre 23h30 e 23h50",
          ref: "f-cianeto",
        },
        { text: ". " },
        { text: "Sem sinais de luta ou violência física", ref: "f-semluta" },
        { text: ". O corpo foi encontrado na poltrona do camarim, de frente para o espelho, o copo ainda na mão direita." },
      ],
      facts: [
        { id: "f-cianeto", summary: "Morte por cianeto, entre 23h30 e 23h50" },
        { id: "f-semluta", summary: "Nenhum sinal de luta no corpo" },
      ],
    },
    {
      id: "copo-uisque",
      name: "O copo de uísque",
      kind: "objeto",
      body: [
        { text: "Copo baixo de cristal, ainda com dois dedos de bebida. Análise química: " },
        {
          text: "o cianeto está concentrado na água do gelo derretido — o uísque em si está limpo, e as amostras do balde do bar não têm veneno",
          ref: "f-gelo",
        },
        { text: ". Na borda, " },
        { text: "uma marca nítida de batom vermelho-carmim", ref: "f-batom" },
        { text: ". A garrafa da qual o uísque foi servido, recolhida no balcão, também está limpa." },
      ],
      facts: [
        { id: "f-gelo", summary: "O veneno estava no GELO do copo; balde do bar limpo" },
        { id: "f-batom", summary: "Marca de batom carmim na borda do copo" },
      ],
    },
    {
      id: "foto-ultimo-numero",
      name: "Fotografia do último número",
      kind: "foto",
      body: [
        { text: "Foto do fotógrafo da casa, carimbada 23h40. O salão aplaude o solo de piano. " },
        {
          text: "O holofote ilumina um palco onde só está o pianista: o microfone de Helena aparece vazio",
          ref: "f-palcovazio",
        },
        { text: ". Nas mesas da frente, casais de rosto virado para o palco. A mesa do caixa, ao fundo, sai cortada da moldura." },
      ],
      facts: [
        { id: "f-palcovazio", summary: "Foto de 23h40: Helena NÃO estava no palco" },
      ],
    },
    {
      id: "bilhete-camarim",
      name: "Bilhete achado no camarim",
      kind: "documento",
      body: [
        { text: "Papel de carta perfumado, dobrado em quatro, sobre a penteadeira. A caligrafia é redonda, apressada: " },
        {
          text: "“Meu amor — depois do último brinde, a mala está pronta. Rádio Nacional que nos espere. Sua, H.”",
          ref: "f-bilhete",
        },
        { text: " O papel tem marca de dedos molhados na quina, como se alguém o tivesse lido com as mãos úmidas — ou chorando." },
      ],
      facts: [
        { id: "f-bilhete", summary: "Bilhete assinado “H.”: Helena e Otávio iam fugir juntos" },
      ],
    },
    {
      id: "comandas",
      name: "Comandas da noite",
      kind: "documento",
      body: [
        { text: "O maço de comandas de sexta-feira, ainda espetado no prego do balcão. Entre dezenas de pedidos, uma salta aos olhos: " },
        {
          text: "“1 conhaque duplo — 23h05”, assinada V. Sarmento, num rabisco trêmulo que quase rasga o papel",
          ref: "f-comanda",
        },
        { text: ". É a única comanda da noite em nome de um dos sócios: a casa não cobra dos donos — a não ser que o barman queira registro." },
      ],
      facts: [
        { id: "f-comanda", summary: "Comanda: Vicente estava NO BAR às 23h05, não no caixa" },
      ],
    },
    {
      id: "livro-caixa",
      name: "Livro-caixa da boate",
      kind: "documento",
      body: [
        { text: "Encadernação de couro, escrita em duas letras diferentes. Conferindo as somas: " },
        {
          text: "lançamentos falsos de “manutenção” somam um desfalque de quarenta contos ao longo de oito meses",
          ref: "f-desfalque",
        },
        { text: ". Na última página usada, a lápis, na letra de Otávio: " },
        { text: "“Chamar contador. Auditoria segunda-feira. V. não sabe.”", ref: "f-auditoria" },
        { text: "" },
      ],
      facts: [
        { id: "f-desfalque", summary: "Desfalque de 40 contos escondido no livro-caixa" },
        { id: "f-auditoria", summary: "Nota de Otávio: auditoria marcada para segunda — “V. não sabe”" },
      ],
    },
    {
      id: "balde-camarim",
      name: "Balde de gelo do camarim",
      kind: "objeto",
      body: [
        { text: "Balde de metal prateado, encontrado atrás do biombo do camarim — não pertence ao jogo do bar. " },
        {
          text: "O gelo restante está saturado de cianeto, e no metal há uma impressão de polegar direito: de Vicente Sarmento",
          ref: "f-digital",
        },
        { text: ". O bar confirma: nenhum balde subiu ao camarim pelo serviço normal naquela noite." },
      ],
      facts: [
        { id: "f-digital", summary: "Balde escondido no camarim: gelo envenenado + digital de Vicente" },
      ],
    },
    {
      id: "frasco-cianeto",
      name: "Frasco no escritório do caixa",
      kind: "objeto",
      body: [
        { text: "No fundo falso da gaveta da mesa do caixa: " },
        {
          text: "um frasco de vidro âmbar com resíduo de cianeto, enrolado num lenço de linho com o monograma V.S.",
          ref: "f-frasco",
        },
        { text: ". O rótulo, meio raspado, ainda deixa ler “...ratização — Veneno”. A gaveta só tem uma chave. Ela estava no bolso do colete de Vicente." },
      ],
      facts: [
        { id: "f-frasco", summary: "Frasco de cianeto no lenço V.S., na gaveta trancada de Vicente" },
      ],
    },
    {
      id: "livro-portaria",
      name: "Livro de entrada da portaria",
      kind: "documento",
      body: [
        { text: "O porteiro anota todo mundo que não é freguês. Na página de sexta: " },
        {
          text: "“D. Meireles — entrada 22h50, saída 23h25”, na letra do porteiro, com a observação “senhora alterada”",
          ref: "f-portaria",
        },
        { text: ". É a única entrada com horário de saída anotado: o porteiro conta que ela saiu tão depressa que derrubou a corrente da porta." },
      ],
      facts: [
        { id: "f-portaria", summary: "Portaria: Dora ENTROU na boate às 22h50 e saiu às 23h25" },
      ],
    },
  ],

  contradictions: [
    {
      id: "c-helena-palco",
      claimId: "h-claim-palco",
      factId: "f-palcovazio",
      explanation:
        "Helena jurou não ter saído do palco — mas a fotografia de 23h40 mostra o microfone vazio no holofote. A cantora sumiu do palco justamente na janela da morte. O que ela foi fazer lá em cima?",
      unlocks: ["l-intervalo-helena"],
    },
    {
      id: "c-helena-romance",
      claimId: "h-claim-romance",
      factId: "f-bilhete",
      explanation:
        "“Patrão e artista”, ela disse. O bilhete perfumado assinado “H.” conta outra história: Helena e Otávio iam fugir juntos depois do último brinde. E se havia fuga, havia alguém sendo deixado para trás.",
      unlocks: ["l-esposa"],
    },
    {
      id: "c-sal-gelo",
      claimId: "s-claim-gelo",
      factId: "f-gelo",
      explanation:
        "Sal garante que o gelo saiu do balde comum do salão — mas o balde do bar está limpo, e o veneno estava exatamente no gelo do copo. Alguém trocou ou completou o gelo DEPOIS do balcão. O caminho da bandeja virou a cena do crime.",
      unlocks: ["l-caminho-bandeja"],
    },
    {
      id: "c-vicente-caixa",
      claimId: "v-claim-caixa",
      factId: "f-comanda",
      explanation:
        "“Não arredei o pé do caixa”, disse Vicente. A comanda de 23h05, assinada com a mão tremendo, prova que ele estava no bar — de pé, andando pela casa, minutos antes da bandeja subir. O álibi de ferro virou papel rasgado.",
      unlocks: ["l-contas"],
    },
    {
      id: "c-vicente-financas",
      claimId: "v-claim-financas",
      factId: "f-desfalque",
      explanation:
        "“Contas em dia, nenhuma dívida.” O livro-caixa mostra quarenta contos desviados em lançamentos falsos — e a nota de Otávio: auditoria na segunda-feira, “V. não sabe”. Otávio sabia. E Vicente tinha um fim de semana para impedir a segunda-feira de chegar.",
      unlocks: ["l-confronto-vicente"],
    },
    {
      id: "c-vicente-camarim",
      claimId: "v-claim-nuncasubi",
      factId: "f-digital",
      explanation:
        "“Nunca subi ao camarim naquela noite.” O balde escondido atrás do biombo — com gelo envenenado e a digital do polegar direito de Vicente no metal — diz que subiu. E que não subiu de mãos vazias.",
      unlocks: ["l-frasco"],
    },
    {
      id: "c-dora-boate",
      claimId: "d-claim-naopiso",
      factId: "f-portaria",
      explanation:
        "“Não piso naquela boate há meses.” O livro da portaria registra: D. Meireles, entrada 22h50, saída 23h25, “senhora alterada”. Dora esteve lá dentro na noite da morte — e mentiu sobre isso de luto fechado.",
      unlocks: ["l-confronto-dora"],
    },
  ],

  leads: [
    {
      id: "l-intervalo-helena",
      title: "O intervalo da cantora",
      narration:
        "Se Helena não estava no palco, alguém a viu subir. Hora de apertar a estrela da casa — e de vasculhar o camarim com mais calma.",
      reveals: [
        { type: "interview", suspectId: "helena", interviewId: "h-confronto" },
        { type: "evidence", id: "bilhete-camarim" },
      ],
    },
    {
      id: "l-esposa",
      title: "A mulher que ficava para trás",
      narration:
        "Uma fuga planejada deixa sempre alguém para trás. A esposa de Otávio, Dora Meireles, aceitou prestar depoimento — e a portaria da boate guarda registros de quem não é freguês.",
      reveals: [
        { type: "suspect", id: "dora" },
        { type: "evidence", id: "livro-portaria" },
      ],
    },
    {
      id: "l-caminho-bandeja",
      title: "O caminho da bandeja",
      narration:
        "Entre o balcão e a penteadeira, alguém tocou naquele copo. Quem carregou a bandeja? A cigarreira Íris viu — e as comandas do bar registram quem andou por ali.",
      reveals: [
        { type: "suspect", id: "iris" },
        { type: "evidence", id: "comandas" },
      ],
    },
    {
      id: "l-contas",
      title: "As contas da casa",
      narration:
        "Um sócio que mente sobre onde estava costuma mentir sobre mais coisas. O livro-caixa da Azul Meia-Noite foi apreendido para perícia.",
      reveals: [{ type: "evidence", id: "livro-caixa" }],
    },
    {
      id: "l-confronto-vicente",
      title: "O sócio encurralado",
      narration:
        "Com o desfalque na mesa, Vicente aceitou falar de novo — e a perícia voltou ao camarim para revirar cada canto atrás do que não pertencia àquele quarto.",
      reveals: [
        { type: "interview", suspectId: "vicente", interviewId: "v-confronto" },
        { type: "evidence", id: "balde-camarim" },
      ],
    },
    {
      id: "l-frasco",
      title: "A gaveta do caixa",
      narration:
        "Quem carrega um balde envenenado precisou guardar o veneno em algum lugar. A mesa do caixa — o posto que Vicente jurou nunca ter deixado — tem uma gaveta com fundo falso.",
      reveals: [{ type: "evidence", id: "frasco-cianeto" }],
    },
    {
      id: "l-confronto-dora",
      title: "O luto que mente",
      narration:
        "Confrontada com o livro da portaria, Dora Meireles desistiu do silêncio. Resta saber o que ela foi fazer lá — e o que viu antes de sair.",
      reveals: [{ type: "interview", suspectId: "dora", interviewId: "d-confronto" }],
    },
  ],

  solution: {
    culpritId: "vicente",
    minContradictions: 4,
    how: [
      { id: "how-garrafa", text: "Envenenou a garrafa de uísque no balcão, antes do brinde" },
      { id: "how-gelo", text: "Preparou um balde de gelo envenenado e montou o copo antes de mandar a bandeja subir" },
      { id: "how-copo-batom", text: "Passou veneno na borda do copo, disfarçado na marca de batom" },
      { id: "how-blecaute", text: "Subiu durante o solo de piano e forçou a vítima a beber" },
    ],
    correctHowId: "how-gelo",
    why: [
      { id: "why-ciume", text: "Ciúmes: era apaixonado por Helena e descobriu a fuga" },
      { id: "why-heranca", text: "Herdaria a parte de Otávio na boate" },
      { id: "why-auditoria", text: "O desfalque seria descoberto na auditoria de segunda-feira" },
      { id: "why-esposa", text: "Foi contratado por Dora para impedir a fuga do marido" },
    ],
    correctWhyId: "why-auditoria",
  },

  epilogue: [
    {
      heading: "O que aconteceu naquela sexta-feira",
      text: "Vicente Sarmento roubava a Azul Meia-Noite havia oito meses, um lançamento falso de cada vez, para cobrir o bacará do Sindicato. Na quinta-feira, encontrou a anotação de Otávio no livro-caixa: auditoria na segunda. “V. não sabe.” Mas V. soube — e decidiu que a segunda-feira não chegaria.",
    },
    {
      text: "Na sexta à noite, com a boate lotada, Vicente raspou o rótulo de um frasco de veneno de ratização, preparou um balde de gelo no escritório e montou o copo do brinde com as próprias mãos. Parou a cigarreira Íris na porta: “sobe às onze e quinze”. Ninguém estranha uma bandeja na mão da cigarreira. Ninguém repara em quem repara em tudo.",
    },
    {
      text: "Enquanto isso, o camarim viveu sua própria tragédia em três atos: Dora entrou às 22h50 com os papéis do divórcio na bolsa, encontrou o bilhete de Helena na penteadeira e saiu às 23h25 com o orgulho em pedaços — cinco minutos antes do veneno agir. Helena, que largou o palco no solo de piano para deixar o bilhete da fuga, cruzou a escada com o próprio futuro: a mala pronta que nunca seria usada.",
    },
    {
      text: "Otávio subiu depois do último brinde, sentou-se diante do espelho, releu o bilhete de Helena sorrindo — a marca de batom na borda era do ensaio do brinde de despedida dos dois, na noite anterior — e tomou o último gole da Azul Meia-Noite. O gelo já tinha derretido o suficiente. Às 23h05, no bar, a mão de Vicente tremia no conhaque duplo: não era medo de ser pego. Era o som do relógio, esperando o grito da Íris.",
    },
    {
      heading: "O fecho do dossiê",
      text: "Vicente Sarmento foi indiciado pelo homicídio de Otávio Meireles: o balde com sua digital, o frasco no lenço com seu monograma e a comanda de 23h05 desmontaram, peça por peça, o álibi do caixa. Helena Duarte cantou 'A Noite do Adeus' uma última vez, no enterro. Dora Meireles assinou os papéis do divórcio — como viúva. E a Azul Meia-Noite nunca mais serviu o último brinde.",
    },
  ],
};

export default caso;
