/**
 * Caso 03 — "Protocolo Fantasma" (tech, São Paulo, hoje).
 *
 * Verdade do caso (para quem edita): Priscila Ramos, chefe de segurança da
 * Nimbus Dados, vendia dados de clientes por fora. O CTO Rafael Toledo achou
 * o vazamento e chamou auditoria. Priscila forjou um álibi digital (saída de
 * crachá emprestada, mensagens agendadas por script), entrou na sala do
 * servidor com o crachá devolvido de Lívia e o matou. Caio e Lívia mentem por
 * outros motivos: os dois negociavam em segredo a recontratação dela.
 */
import type { Case } from "../types";

const caso: Case = {
  id: "caso03-tech",
  version: 1,
  title: "Protocolo Fantasma",
  tagline: "Um servidor apagado, um álibi digital perfeito — perfeito até demais.",
  theme: "tech",
  difficulty: 3,
  estimatedMinutes: 45,

  briefing: {
    shared:
      "Sede da Nimbus Dados, 23h12 de uma terça-feira. Rafael Toledo, CTO e cofundador, é encontrado morto na sala do servidor — a cabeça contra o rack, o alarme desativado, metade dos logs da noite apagada. Para o plantão policial, foi queda acidental: piso elevado, cabo solto, azar. Mas o servidor de auditoria, aquele que Rafael instalou por conta própria no mês passado, não foi apagado. Vocês têm acesso a tudo. A empresa inteira tem um álibi digital. Um deles foi fabricado.",
    detective:
      "Você interroga gente que fala em 'sprint', 'pipeline' e 'compliance' — e mente igualzinho a todo mundo. Anote o que cada um AFIRMA, principalmente horários e lugares. Neste caso, os relógios mentem junto: só confie no que seu par conseguir provar.",
    perito:
      "Você examina logs, câmeras e metadados. Regra de ouro desta perícia: registro digital diz o que a MÁQUINA fez, não o que a PESSOA fez. Anote cada fato e o horário exato, e conte ao seu par — a mentira mora na diferença de minutos.",
  },

  suspects: [
    {
      id: "priscila",
      name: "Priscila Ramos",
      role: "a chefe de segurança",
      portraitEmoji: "🛡️",
      description:
        "CISO da Nimbus, dona de todos os acessos, autora da política que ela mesma chama de 'confiança zero'. Fala calma, resposta pronta, álibi impecável — impecável demais.",
      interviews: [
        {
          id: "pr-saida",
          question: "A que horas você saiu do escritório?",
          answer: [
            { text: "Às 21h15. Não por memória: " },
            {
              text: "por registro. Meu crachá marca a saída às 21h15, e crachá, delegado, não tem opinião",
              ref: "pr-claim-saida",
            },
            { text: ". Fui para casa, respondi mensagens do time até tarde e soube da tragédia pelo alerta da central, à meia-noite." },
          ],
          claims: [
            { id: "pr-claim-saida", summary: "Priscila: “meu crachá registra minha saída às 21h15”" },
          ],
        },
        {
          id: "pr-chat",
          question: "O que você fez depois que chegou em casa?",
          answer: [
            { text: "Trabalhei, como sempre. " },
            {
              text: "Às 21h50 eu estava no chat do time, de casa, cobrando o relatório de vulnerabilidades — as mensagens estão lá, com horário",
              ref: "pr-claim-chat",
            },
            { text: ". Quem está atrás de um culpado devia olhar para quem foi demitida ontem com um processo nas costas, não para quem estava trabalhando." },
          ],
          claims: [
            { id: "pr-claim-chat", summary: "Priscila: “às 21h50 eu mandava mensagens no chat, de casa”" },
          ],
        },
        {
          id: "pr-armario",
          question: "Quem tem acesso aos crachás devolvidos?",
          answer: [
            { text: "Eu, e mais ninguém — por desenho meu. Crachá devolvido vai para o armário lacrado da segurança até ser desativado no ciclo semanal. " },
            {
              text: "A única chave fica comigo, e o lacre do armário estava intacto hoje de manhã: eu mesma conferi",
              ref: "pr-claim-armario",
            },
            { text: ". Se estão sugerindo que um crachá devolvido andou abrindo portas, sugiro procurar quem o devolveu... se é que devolveu." },
          ],
          claims: [
            { id: "pr-claim-armario", summary: "Priscila: “só eu tenho a chave do armário de crachás e o lacre estava intacto”" },
          ],
        },
        {
          id: "pr-confronto",
          question: "Seu carro saiu às 22h25 e suas mensagens eram agendadas. Explique.",
          answer: [
            { text: "Isso prova erro de relógio, não crime. Eu agendo mensagens, sim — gestão de tempo. E câmeras de garagem atrasam. Escutem: " },
            {
              text: "eu nunca tive acesso ao data lake de clientes; minha área é proteção, não os dados em si",
              ref: "pr-claim-dados",
            },
            { text: ". O Rafael era paranoico com aquele servidor de auditoria dele. Paranoia, delegado, é o que sobra quando a confiança acaba. Não fui eu que acabei com ela." },
          ],
          claims: [
            { id: "pr-claim-dados", summary: "Priscila: “nunca tive acesso ao data lake de clientes”" },
          ],
        },
      ],
    },
    {
      id: "caio",
      name: "Caio Vasques",
      role: "o CEO cofundador",
      portraitEmoji: "📈",
      description:
        "Fundou a Nimbus com Rafael num quarto de república. Hoje fala com investidores de manhã e com o banco à tarde. O olho esquerdo treme quando o assunto é dinheiro.",
      interviews: [
        {
          id: "ca-jantar",
          question: "Onde você estava na noite da morte?",
          answer: [
            {
              text: "Num jantar com investidores no Fasano, das 20h até quase 23h — rodada série B, três fundos na mesa",
              ref: "ca-claim-jantar",
            },
            { text: ". Saí de lá e fui direto para casa. Soube pelo telefonema da Priscila, depois da meia-noite. Perdi meu sócio e meu melhor amigo no mesmo minuto, delegado." },
          ],
          claims: [
            { id: "ca-claim-jantar", summary: "Caio: “jantei com investidores das 20h às 23h”" },
          ],
        },
        {
          id: "ca-empresa",
          question: "Como estava a empresa antes da morte de Rafael?",
          answer: [
            {
              text: "Nunca estivemos tão saudáveis: churn baixo, receita crescendo, série B encaminhada",
              ref: "ca-claim-saude",
            },
            { text: ". A demissão da Lívia? Reestruturação normal, decisão de comitê. O Rafael andava tenso, mas CTO tenso é pleonasmo. Nada, absolutamente nada, fora do normal." },
          ],
          claims: [
            { id: "ca-claim-saude", summary: "Caio: “a empresa nunca esteve tão saudável, nada fora do normal”" },
          ],
        },
        {
          id: "ca-confronto",
          question: "A conta do jantar fechou às 21h10. Aonde você foi?",
          answer: [
            { text: "...Está bem. O jantar desandou às 21h: os fundos souberam de um 'incidente de dados' por alguém de dentro e congelaram a rodada. Saí do restaurante e " },
            {
              text: "fui me encontrar com a Lívia no café em frente ao escritório — demiti a engenheira errada por pressão do conselho e fui recontratá-la em segredo",
              ref: "ca-claim-cafe",
            },
            { text: ". O Rafael topava. Era ela quem ia caçar o vazamento com ele. Ficamos no café até depois das dez. Quando eu soube, entendi na hora: o vazamento estava um andar acima da minha sala." },
          ],
          claims: [
            { id: "ca-claim-cafe", summary: "Caio: “saí do jantar às 21h10 e fiquei com Lívia no café até depois das 22h”" },
          ],
        },
      ],
    },
    {
      id: "livia",
      name: "Lívia Okada",
      role: "a engenheira demitida",
      portraitEmoji: "💻",
      description:
        "Engenheira de dados sênior, demitida na véspera da morte 'por reestruturação'. Construiu metade do data lake da Nimbus. Saiu da empresa às 18h com uma caixa de papelão e um processo engatilhado.",
      interviews: [
        {
          id: "li-cracha",
          question: "O que você fez com seu crachá na demissão?",
          answer: [
            {
              text: "Devolvi no balcão da segurança às seis da tarde, na frente do RH, como manda o protocolo — protocolo que, aliás, eu ajudei a escrever",
              ref: "li-claim-cracha",
            },
            { text: ". Assinei o termo de devolução e saí pela catraca de visitante. Se o meu crachá andou passeando depois disso, a pergunta não é para mim: é para quem guarda os crachás." },
          ],
          claims: [
            { id: "li-claim-cracha", summary: "Lívia: “devolvi meu crachá às 18h no balcão da segurança”" },
          ],
        },
        {
          id: "li-noite",
          question: "Para onde você foi depois de sair da empresa?",
          answer: [
            {
              text: "Para casa, direto. Peguei minha caixa, chamei um carro e fui para casa lamber as feridas",
              ref: "li-claim-casa",
            },
            { text: ". Vinte meses construindo aquele data lake para ser 'reestruturada' numa terça-feira. Se querem um motivo, eu tinha. Mas quem mata a única pessoa da diretoria que foi contra a minha demissão? O Rafael brigou por mim até o fim. Eu devia a ele." },
          ],
          claims: [
            { id: "li-claim-casa", summary: "Lívia: “saí da empresa e fui direto para casa”" },
          ],
        },
      ],
    },
    {
      id: "marcos",
      name: "Marcos Paiva",
      role: "o estagiário do plantão",
      portraitEmoji: "🎧",
      description:
        "Estagiário de infraestrutura, dezenove anos, plantão noturno de terça. Estava de fone na baia dos fundos e é, tecnicamente, a única testemunha do prédio.",
      interviews: [
        {
          id: "mc-vulto",
          question: "Você viu alguém no andar do servidor à noite?",
          answer: [
            { text: "Eu estava de fone, revisando runbook, mas levantei pra pegar café e... " },
            {
              text: "vi de relance, pelas 21h45, alguém de colete escuro da segurança entrando no corredor do servidor — andando normal, sem pressa, como quem tem chave",
              ref: "mc-claim-vulto",
            },
            { text: ". Juro que pensei: ronda de rotina. A pessoa era mais baixa que o Rafael. Não vi o rosto, o vidro do corredor é fosco. Quando os alarmes não tocaram, voltei pro fone. Eu podia ter... se eu tivesse ido olhar, sei lá." },
          ],
          claims: [
            {
              id: "mc-claim-vulto",
              summary: "Marcos: “vi alguém de colete da segurança indo ao servidor às 21h45, sem pressa”",
            },
          ],
        },
      ],
    },
  ],

  evidence: [
    {
      id: "laudo-pericial",
      name: "Laudo pericial do local",
      kind: "laudo",
      body: [
        { text: "Vítima: Rafael Toledo, 38 anos, encontrado entre os racks A3 e A4. A hipótese de queda acidental não sobrevive ao exame: " },
        {
          text: "são DOIS impactos no crânio, em ângulos diferentes — quem cai, cai uma vez. Morte entre 21h40 e 22h10",
          ref: "f-impactos",
        },
        { text: ". O alarme da sala foi desativado com código mestre válido. Os logs locais da noite foram apagados — mas o servidor de auditoria independente, instalado pelo próprio Rafael, preservou cópia de tudo." },
      ],
      facts: [
        { id: "f-impactos", summary: "Dois impactos no crânio: não foi queda. Morte 21h40–22h10" },
      ],
    },
    {
      id: "logs-acesso",
      name: "Logs de acesso (servidor de auditoria)",
      kind: "digital",
      body: [
        { text: "Espelho íntegro dos registros de crachá, fora do alcance de quem apagou os logs locais. Duas linhas interessam: " },
        {
          text: "21h15 — crachá de P. Ramos registra SAÍDA pela catraca principal",
          ref: "f-log-saida-pri",
        },
        { text: "; e " },
        {
          text: "21h50 — crachá de L. Okada, devolvido às 18h, ABRE a porta da sala do servidor",
          ref: "f-log-livia",
        },
        { text: ". Um crachá devolvido não deveria abrir nem a porta do banheiro." },
      ],
      facts: [
        { id: "f-log-saida-pri", summary: "Log: crachá de Priscila registrou saída às 21h15" },
        { id: "f-log-livia", summary: "Log: crachá DEVOLVIDO de Lívia abriu a sala do servidor às 21h50" },
      ],
    },
    {
      id: "recibo-jantar",
      name: "Conta do restaurante",
      kind: "documento",
      body: [
        { text: "Cortesia do maître do Fasano: mesa 12, quatro pessoas, entrada às 20h04. " },
        {
          text: "Conta fechada e assinada às 21h10 — pagamento no cartão corporativo de C. Vasques",
          ref: "f-recibo-2110",
        },
        { text: ". O sommelier anotou no sistema: 'mesa encerrada mais cedo, clima tenso, sem sobremesa'." },
      ],
      facts: [
        { id: "f-recibo-2110", summary: "O jantar de Caio terminou às 21h10, não às 23h" },
      ],
    },
    {
      id: "armario-crachas",
      name: "Armário de crachás da segurança",
      kind: "objeto",
      body: [
        { text: "O armário de aço da sala da segurança, onde crachás devolvidos aguardam desativação. A vistoria encontrou: " },
        {
          text: "o lacre numerado ROMPIDO e recolocado com cola — e a fechadura intacta, aberta com chave própria, sem arrombamento",
          ref: "f-lacre",
        },
        { text: ". O termo de devolução de L. Okada está dentro, assinado às 18h02. O gancho do crachá dela está vazio." },
      ],
      facts: [
        { id: "f-lacre", summary: "Armário de crachás: lacre rompido e recolado, aberto com a CHAVE" },
      ],
    },
    {
      id: "cameras-rua",
      name: "Câmeras da garagem e da rua",
      kind: "digital",
      body: [
        { text: "Gravações da noite, relógios aferidos contra o servidor de hora oficial. Garagem: " },
        {
          text: "o carro de Priscila só cruza a cancela de saída às 22h25 — uma hora e dez depois da 'saída' registrada pelo crachá",
          ref: "f-carro-2225",
        },
        { text: ". Câmera da rua, apontada para o café em frente: " },
        {
          text: "Lívia Okada sentada na vitrine do café das 21h05 até 22h12, acompanhada por um homem de blazer a partir das 21h30",
          ref: "f-livia-cafe",
        },
        { text: "." },
      ],
      facts: [
        { id: "f-carro-2225", summary: "Câmera: o carro de Priscila só saiu da garagem às 22h25" },
        { id: "f-livia-cafe", summary: "Câmera: Lívia esteve no café em frente das 21h05 às 22h12" },
      ],
    },
    {
      id: "forense-laptop",
      name: "Forense do laptop de Priscila",
      kind: "digital",
      body: [
        { text: "Imagem do disco autorizada pela diretoria. No histórico da ferramenta de chat: " },
        {
          text: "as mensagens 'de casa' das 21h50 foram criadas às 19h02 e enviadas por agendador automático — script salvo na pasta pessoal, nome de arquivo: alibi.py",
          ref: "f-script",
        },
        { text: ". O mesmo agendador disparou um e-mail de rotina às 22h00. Quem programa o próprio rastro digital não está construindo memória: está construindo defesa." },
      ],
      facts: [
        { id: "f-script", summary: "As mensagens “de casa” de Priscila foram AGENDADAS às 19h02 (alibi.py)" },
      ],
    },
    {
      id: "cofre-pendrive",
      name: "Cofre da sala de segurança",
      kind: "objeto",
      body: [
        { text: "Aberto por ordem judicial. Entre documentos de rotina, um pendrive sem etiqueta: " },
        {
          text: "dump completo do data lake de clientes, empacotado e ASSINADO com o certificado digital pessoal de P. Ramos, datado de dez dias atrás",
          ref: "f-pendrive",
        },
        { text: ", pronto para entrega. Certificado digital não se empresta: é senha, cartão e digital da dona." },
      ],
      facts: [
        { id: "f-pendrive", summary: "Pendrive: dados de clientes assinados pelo certificado de Priscila" },
      ],
    },
    {
      id: "email-conselho",
      name: "E-mail de Rafael ao conselho",
      kind: "digital",
      body: [
        { text: "Rascunho na caixa de saída, escrito na tarde da morte, envio agendado para as 9h de quarta: " },
        {
          text: "“Confirmei exfiltração do data lake por conta interna privilegiada. Auditoria externa na quinta. Até lá, nem o C. sabe os detalhes — a pessoa monitora tudo.”",
          ref: "f-email",
        },
        { text: " Rafael morreu doze horas antes do envio. A auditoria de quinta nunca aconteceu." },
      ],
      facts: [
        { id: "f-email", summary: "Rafael confirmou vazamento interno e marcou auditoria para quinta" },
      ],
    },
  ],

  contradictions: [
    {
      id: "c-livia-cracha",
      claimId: "li-claim-cracha",
      factId: "f-log-livia",
      explanation:
        "Lívia devolveu o crachá às 18h, com testemunha e termo assinado — e às 21h50 esse mesmo crachá abriu a sala do servidor. Ou Lívia mente, ou alguém pegou o crachá devolvido. E crachá devolvido mora num lugar só: o armário da segurança.",
      unlocks: ["l-armario"],
    },
    {
      id: "c-priscila-armario",
      claimId: "pr-claim-armario",
      factId: "f-lacre",
      explanation:
        "“Lacre intacto, e a única chave fica comigo.” O lacre foi rompido e recolado com cola — e a fechadura foi aberta com a chave, sem arrombamento. Se só existe uma chave, só existe uma suspeita. A dona da chave mentiu sobre o armário que só ela abre.",
      unlocks: ["l-cameras"],
    },
    {
      id: "c-priscila-saida",
      claimId: "pr-claim-saida",
      factId: "f-carro-2225",
      explanation:
        "O crachá de Priscila 'saiu' às 21h15 — mas o carro dela só cruzou a cancela às 22h25, relógio aferido. Uma catraca registra crachás, não pessoas: alguém passou o crachá dela e devolveu depois. O álibi digital perfeito acabou de virar prova de premeditação.",
      unlocks: ["l-forense"],
    },
    {
      id: "c-priscila-chat",
      claimId: "pr-claim-chat",
      factId: "f-script",
      explanation:
        "As mensagens 'de casa, às 21h50' foram escritas às 19h02 e disparadas por um script chamado, sem cerimônia, alibi.py. Priscila não estava no chat às 21h50. Estava exatamente onde o chat deveria provar que ela não estava.",
      unlocks: ["l-confronto-priscila"],
    },
    {
      id: "c-priscila-dados",
      claimId: "pr-claim-dados",
      factId: "f-pendrive",
      explanation:
        "“Nunca tive acesso ao data lake.” O pendrive no cofre dela carrega o data lake inteiro — assinado com o certificado digital pessoal dela, dez dias antes do crime. Não é acesso: é mercadoria embalada. E Rafael tinha acabado de descobrir o vazamento.",
      unlocks: ["l-email"],
    },
    {
      id: "c-caio-jantar",
      claimId: "ca-claim-jantar",
      factId: "f-recibo-2110",
      explanation:
        "“Jantar até quase 23h.” A conta fechou às 21h10, 'clima tenso, sem sobremesa'. Caio ganhou duas horas de noite sem álibi — na janela exata da morte do sócio. Aonde vai um CEO quando a rodada desaba no meio do jantar?",
      unlocks: ["l-marcos"],
    },
    {
      id: "c-livia-casa",
      claimId: "li-claim-casa",
      factId: "f-livia-cafe",
      explanation:
        "“Fui direto para casa.” A câmera da rua mostra Lívia na vitrine do café em frente à Nimbus das 21h05 às 22h12 — com um homem de blazer a partir das 21h30. Ela passou a janela do crime a cinquenta metros da cena... esperando alguém.",
      unlocks: ["l-confronto-caio"],
    },
    {
      id: "c-caio-saude",
      claimId: "ca-claim-saude",
      factId: "f-email",
      explanation:
        "“Nada, absolutamente nada, fora do normal.” Rafael escreveu ao conselho que havia exfiltração confirmada, auditoria marcada — e que 'nem o C. sabe os detalhes'. A empresa sangrava dados havia semanas. O 'normal' de Caio era a fachada para os fundos da série B.",
      unlocks: [],
    },
  ],

  leads: [
    {
      id: "l-armario",
      title: "O armário dos crachás",
      narration: "Crachá devolvido que abre porta é crachá que alguém foi buscar. A vistoria foi direto ao armário lacrado da segurança.",
      reveals: [{ type: "evidence", id: "armario-crachas" }],
    },
    {
      id: "l-cameras",
      title: "Relógios que não mentem",
      narration:
        "Se os registros de crachá foram encenados, é hora de conferir os únicos relógios que ninguém da Nimbus controla: as câmeras da garagem e da rua.",
      reveals: [{ type: "evidence", id: "cameras-rua" }],
    },
    {
      id: "l-forense",
      title: "O rastro de quem apaga rastros",
      narration: "Uma saída forjada pede um álibi digital completo. A diretoria autorizou a forense no laptop da chefe de segurança.",
      reveals: [{ type: "evidence", id: "forense-laptop" }],
    },
    {
      id: "l-confronto-priscila",
      title: "Confiança zero",
      narration: "Com o script na mesa, Priscila aceitou nova entrevista — e o juiz, a abertura do cofre da sala de segurança.",
      reveals: [
        { type: "interview", suspectId: "priscila", interviewId: "pr-confronto" },
        { type: "evidence", id: "cofre-pendrive" },
      ],
    },
    {
      id: "l-email",
      title: "A caixa de saída de Rafael",
      narration: "O que exatamente Rafael sabia — e para quando ele marcou a bomba? O e-mail agendado ao conselho responde.",
      reveals: [{ type: "evidence", id: "email-conselho" }],
    },
    {
      id: "l-marcos",
      title: "Quem estava no prédio",
      narration: "Duas horas sem álibi pedem uma testemunha. Sobrou alguém no prédio além da vítima: o estagiário do plantão noturno.",
      reveals: [{ type: "suspect", id: "marcos" }],
    },
    {
      id: "l-confronto-caio",
      title: "O homem de blazer",
      narration: "Lívia não esperava à toa, e o blazer da câmera tem dono. Caio aceitou explicar o que fazia no café — fora da ata.",
      reveals: [{ type: "interview", suspectId: "caio", interviewId: "ca-confronto" }],
    },
  ],

  solution: {
    culpritId: "priscila",
    minContradictions: 5,
    how: [
      { id: "how-remoto", text: "Sabotou o no-break remotamente e simulou um acidente elétrico" },
      {
        id: "how-cracha",
        text: "Passou o próprio crachá na catraca para 'sair', entrou no servidor com o crachá devolvido de Lívia e agendou mensagens para forjar o álibi",
      },
      { id: "how-terceiro", text: "Contratou alguém de fora e apenas abriu as portas do prédio" },
      { id: "how-livia-mando", text: "Convenceu Lívia a matar Rafael em troca da recontratação" },
    ],
    correctHowId: "how-cracha",
    why: [
      { id: "why-promocao", text: "Rafael a preteriu na sucessão da diretoria de tecnologia" },
      { id: "why-venda", text: "Ela vendia os dados dos clientes; Rafael confirmou o vazamento e a auditoria de quinta a exporia" },
      { id: "why-romance", text: "Um relacionamento escondido com o CEO terminou mal" },
      { id: "why-startup", text: "Queria forçar a venda da Nimbus para um concorrente" },
    ],
    correctWhyId: "why-venda",
  },

  epilogue: [
    {
      heading: "O que aconteceu naquela terça-feira",
      text: "Priscila Ramos vendia recortes do data lake havia meses — pacotes assinados com o próprio certificado, guardados no cofre que só ela abria, entregues a um corretor de dados que pagava em cripto. Quando Rafael montou um servidor de auditoria por conta própria e confirmou a exfiltração, ela soube antes de todo mundo: monitorar era o trabalho dela. O e-mail ao conselho estava agendado para quarta de manhã. A auditoria, para quinta. Ela tinha uma noite.",
    },
    {
      text: "O plano foi um projeto de engenharia: às 19h02, escreveu as mensagens 'de casa' e as agendou no alibi.py. Às 21h15, passou o crachá na catraca — e ficou, escondida na sala de segurança, de colete escuro. Tirou do armário lacrado o crachá devolvido de Lívia (a suspeita perfeita: recém-demitida, com motivo e processo), recolou o lacre com cola e, às 21h45, cruzou o corredor sob o vidro fosco, 'andando normal, como quem tem chave'. Marcos a viu sem ver.",
    },
    {
      text: "Na sala do servidor, desativou o alarme com o código mestre e confrontou Rafael — que não recuou. Dois golpes com a barra do rack, os logs locais apagados, o cabo solto arrumado sob o piso elevado: um acidente de manual. Só que o servidor de auditoria de Rafael, o 'paranoico', gravava tudo num lugar que nem a chefe de segurança alcançava. Ela saiu de carro às 22h25, uma hora e dez depois do próprio álibi. Enquanto isso, no café em frente, Caio recontratava Lívia em segredo — os dois construindo, sem saber, o álibi um do outro.",
    },
    {
      heading: "O fecho do dossiê",
      text: "Priscila Ramos foi indiciada por homicídio qualificado e venda de dados: o alibi.py, o lacre recolado, a cancela das 22h25 e o pendrive assinado desmontaram o crime perfeito byte a byte. A série B morreu; a Nimbus, não — Lívia Okada assumiu como CTO e seu primeiro ato foi dar nome ao servidor de auditoria: 'Toledo'. No memorial do escritório, alguém colou um post-it que ninguém teve coragem de tirar: 'Confiança zero, saudade infinita.'",
    },
  ],
};

export default caso;
