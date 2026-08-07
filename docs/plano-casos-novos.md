# Quatro casos novos, quatro temas novos, dicas e caderno

> **Situação em 2026-08-07.** A mecânica (fase 1) está pronta e publicada, mais
> a tela "Como se joga" e a limpeza da Mesa. O **caso 05 (Carnaval, tema
> `folia`) está escrito e publicado** — use-o como modelo de escala e ritmo.
> **Faltam os casos 06, 07 e 08** (fases 3 a 5), e é aqui que mora todo o
> material criativo já decidido com o usuário: títulos, culpados, como e por
> quê, elencos e espinhas de contradição.
>
> Escolhas do usuário que este plano já incorpora: quatro casos (não três), o
> caso de praia com o gancho do casal que se cobre e se trai, e um tema visual
> próprio para cada caso.

## Contexto

O Dossiê a Dois tem hoje 4 casos (noir, cozy, tech, occult) e acabou de passar
por um redesign visual. Dois problemas ficaram em aberto.

**Conteúdo.** Quatro casos são umas quatro noites de jogo. Depois disso o jogo
acaba — e um jogo de mistério não tem replay: sabendo quem matou, não há caso.
Mais casos é a única forma de estender a vida do jogo.

**Travamento.** O loop central é cruzar fala × prova na Mesa. Quando o casal
não enxerga o par, hoje não existe absolutamente nada a fazer: sem dicas, sem
sugestão, e o erro só produz um buzzer e uma sacudida — sem explicar nada. Pior,
tudo que já foi descoberto é volátil: a explicação da contradição e a narração
da pista aparecem uma vez no modal e somem para sempre. Numa partida de 40–60
minutos a dois, essa é justamente a informação que o casal mais precisa reler.

O resultado esperado: 8 casos, cada um com identidade visual própria, e uma Mesa
que segura o casal quando ele empaca em vez de deixá-lo desistir.

## Escopo

- 4 casos novos: Carnaval, praia/férias, trem noturno de 1937, restaurante estrelado
- 4 temas visuais novos, um por caso
- Sistema de dicas progressivas na Mesa, com custo em pontos
- Caderno do caso, para reler contradições desmontadas e pistas abertas

## Ordem de entrega

Cada fase termina com `npm test` verde e é publicável sozinha.

1. ~~**Mecânica** (dicas + caderno)~~ — **FEITO** (commits `ee8f3c2` e
   `37cfec4`), junto com a tela "Como se joga".
2. ~~**Caso 05 + tema `folia`** (Carnaval)~~ — **FEITO**
3. **Caso 06 + tema `litoral`** (praia) — pendente
4. **Caso 07 + tema `deco`** (trem) — pendente
5. **Caso 08 + tema `mesa`** (restaurante) — pendente

---

## Fase 1 — Mecânica

Princípio comum: as duas features são **derivadas dos dados do caso**. Nenhuma
exige texto novo por contradição — senão cada uma multiplicaria por 8 o trabalho
de autoria.

### Dicas progressivas

Três níveis, cada um revelando um pouco mais de **uma** contradição:

1. aponta o suspeito cuja fala não bate;
2. aponta também a prova que a desmente;
3. destaca o par exato na Mesa.

**Escolha da contradição.** A dica só pode apontar algo que o casal consegue
resolver agora: alegação já ouvida (`readInterviews`), prova já vista
(`viewedEvidence`) e contradição ainda não encontrada. A escolha percorre
`c.contradictions` **na ordem do arquivo** e pega a primeira que sirva — a
ordem fixa importa: apertar de novo não pode pular para outra contradição.

**Quando não há nenhuma alcançável**, a dica não custa ponto e diz qual lado
está faltando ("vocês ainda não têm falas e provas que se cruzem — o Perito
precisa abrir mais provas"). Cobrar por isso seria injusto, e essa é justamente
a informação de que o casal precisa.

**Lógica pura em `src/store/progress.ts`** (é onde vivem `heardClaims`,
`seenFacts`, `tryContradiction`, todas puras e testadas):

```ts
export type HintResult =
  | { kind: "hint"; level: 1 | 2 | 3; contradictionId: string;
      suspectName: string; evidenceName: string | null;
      pair: { claimId: string; factId: string } | null }
  | { kind: "investigate"; missing: "claims" | "facts" | "both" };

export function nextHint(c: Case, progress: Progress, level: 1 | 2 | 3): HintResult;
```

`evidenceName` só vem no nível ≥ 2, `pair` só no nível 3 — a função não entrega
o que o nível não autoriza, então a UI não pode vazar por descuido.

Para saber de quem é cada alegação e de qual prova vem cada fato, reusar
`claimOwners` e `factOwners`, que já existem em `src/data/solveCase.ts` e já
são reexportados por `progress.ts` (linha 124) — é exatamente o mapa de que a
checagem de alcançabilidade precisa, e é o mesmo que o solver usa nos testes.

**Ações novas no `gameStore.ts`** (ambas validam `screen === "board"` e
`!reveal`, como todas as outras):

```ts
useHint(): void      // sobe um nível, recalcula, incrementa hintsUsed, persiste
dismissHint(): void  // só limpa a exibição
```

Estado novo: `hint: HintResult | null`, `hintLevel: 0 | 1 | 2 | 3`,
`hintsUsed: number`. Ao encontrar uma contradição, `hint` e `hintLevel` zeram —
a próxima dica recomeça no nível 1 para a próxima contradição. `hintsUsed`
acumula pelo caso inteiro.

**Persistência.** `CaseSave` ganha `hintsUsed: number`. Não precisa subir o
`schema`: `loadSave` já saneia campo a campo com `num(v, fallback)`
(`saves.ts:39`), então um save antigo sem o campo carrega como `0`. Subir o
schema invalidaria saves em andamento sem necessidade.

**Pontuação.** Custo **progressivo** por nível — cutucar é barato, entregar é
caro: nível 1 = 1 ponto, nível 2 = 2, nível 3 = 3. O estado persistido é
`hintPoints` (custo acumulado), não a contagem.

```ts
const gross   = contradictions + accusation + thoroughness;
const penalty = Math.min(gross, wrongAttempts * 4);              // idêntico ao de hoje
const hints   = Math.min(gross - penalty, Math.min(hintPoints, HINT_PENALTY_CAP));
const total   = gross - penalty - hints;                          // ≥ 0 por construção
```

**A ordem do clamp importa**: aplicar a punição de palpites primeiro faz com
que, com `hintPoints: 0`, todos os números batam byte a byte com os de hoje —
os 5 testes existentes de `scoring.test.ts` viram rede de regressão real em vez
de coisa a atualizar.

`HINT_PENALTY_CAP = 15` é a decisão de produto: **apoiar-se em dica custa no
máximo uma estrela**. Sem teto, um caso de 7 contradições com escada cheia
custaria 42 pontos (5★ → 2★) e a feature viraria armadilha — o casal travado
seria punido duas vezes. Se o playtest mostrar que ficou barato, o único botão
a girar é a constante.

`parts` ganha `hints` separado de `penalty`, e o boletim em `ResultScreen`
mostra as duas linhas — somar as duas tornaria o resultado opaco.

### Caderno do caso

Um diálogo aberto na Mesa, com três seções, **todas derivadas do estado atual**
— nenhum estado novo é necessário:

- **Contradições desmontadas** — para cada id em `foundContradictions`, a
  `explanation` completa mais os resumos da alegação e do fato.
- **Pistas abertas** — para cada id em `unlockedLeads`, `title` + `narration`.
- **Pares já descartados** — `wrongPairs` resolvidos para os resumos, para o
  casal não repetir o que já testou (hoje o jogo sabe disso, via `repeatWrong`,
  mas nunca conta).

Helper puro novo em `progress.ts`:

```ts
export function caseJournal(c: Case, progress: Progress): {
  contradictions: { id: string; explanation: string; claim: string; fact: string }[];
  leads: { id: string; title: string; narration: string }[];
  discarded: { claim: string; fact: string }[];
};
```

**Diálogo, não tela nova.** O `handoff` é a espinha do jogo: toda transição de
`screen` entre papéis passa por ele. Um `screen: "notebook"` seria a primeira
tela a quebrar essa invariante, precisaria de um `notebookReturnTo`, e obrigaria
as onze guardas de `screen` do store a responder "e se o caderno estiver aberto
por cima?". Com overlay, a tela de baixo continua sendo `board`/`detective`/
`perito` e nada disso muda. Há precedente: o modal de revelação da Mesa e o de
confirmação da acusação já são exatamente isso.

**Disponível nas três telas** (Mesa, Detetive e Perito), e não só na Mesa. O
caderno mostra `explanation`, que cita fala e prova — mas só de contradições
**já encontradas**, e uma contradição só é encontrada na Mesa, com os dois
presentes. Tudo ali já é conhecimento comum, então não há vazamento de papel. O
mesmo vale para os pares descartados.

### Onde os botões entram

O rodapé da Mesa já está cheio (registrar + Detetive/Perito/Acusar). Os dois
botões novos vão para o slot `right` do `TopBar`, substituindo o
`<Pill>juntos</Pill>` atual — que é decorativo, já que o título da tela diz
"Mesa de Contradições". Dois ícones novos em `src/components/icons.tsx`
(caderno e dica), no mesmo traço 2px em `currentColor` dos outros 16.

O botão de dica mostra o custo acumulado quando já houver dicas usadas, para o
casal decidir com a conta à vista.

### Testes novos

- `progress.test.ts` — `nextHint` escolhe a primeira contradição alcançável e
  não achada; ignora as já encontradas; devolve `investigate` (com o lado certo)
  quando nada é alcançável; não entrega `pair` abaixo do nível 3.
- `progress.test.ts` — `caseJournal` resolve os ids para os textos certos.
- `scoring.test.ts` — dica derruba a nota; total nunca fica negativo.
- `saves.test.ts` — save antigo sem `hintsUsed` carrega como 0; save novo faz
  ida e volta.

---

## Fase 2 a 5 — Os casos

### Como um caso é feito (padrão já estabelecido)

Um caso é **dado puro** em `src/data/cases/casoNN<Tema>.ts`, ~500 linhas,
seguindo `src/data/types.ts`. A escala dos quatro existentes:

| | suspeitos | entrevistas | provas | contradições | pistas | mín. p/ acusar |
|---|---|---|---|---|---|---|
| caso01 noir | 5 | 12 | 9 | 7 | 7 | 4 |
| caso02 cozy | 4 | 9 | 7 | 6 | 6 | 4 |
| caso03 tech | 4 | 10 | 8 | 8 | 7 | 5 |
| caso04 occult | 4 | 10 | 8 | 8 | 7 | 5 |

Alvo dos novos: **4–5 suspeitos, 8–9 provas, 7–8 contradições, 7 pistas.**

Regras de autoria que os testes cobram (`validateCase.ts` + `solveCase.ts`):

- Todo segmento com `ref` precisa ter a `claim`/`fact` declarada na mesma
  entrevista/evidência — e vice-versa: alegação declarada sem segmento que a
  referencie derruba o teste.
- Ids únicos por namespace (suspeito, evidência, pista, contradição,
  entrevista, alegação, fato).
- Um item só pode ser revelado por **uma** pista.
- O solver faz fecho transitivo: nenhuma contradição pode ser inalcançável,
  nenhuma pista pode nunca disparar, nenhum suspeito/entrevista/prova pode
  ficar órfão. Na prática: o caso precisa começar com contradições resolvíveis
  só com o que está visível, e cada onda de pistas precisa abrir a seguinte.
- Mínimo 3 contradições; `minContradictions` ≤ total.

Passo final de cada caso: registrar resumo + loader em
`src/data/cases/index.ts` e rodar `npm test`.

### Como um tema é feito

Levantamento confirmou que o custo é baixo. Um tema novo exige:

1. `src/data/types.ts` — acrescentar o valor à união `ThemeId` (linha 14).
2. `src/themes/<id>.css` — bloco `:root[data-theme="<id>"]` com as 12
   variáveis `--t-*` (10 cores + 2 fontes) e `--t-grain`; mais os seletores
   temáticos `.dossier` e `.theme-title`, opcionalmente `.panel` e
   `.mark-claim`/`.mark-fact` (o `tech` inverte os dois porque seu "papel" é
   escuro — o mesmo vale para qualquer tema escuro novo).
3. `src/index.css` — `@import "./themes/<id>.css";` junto dos outros
   (linhas 2–5). **Esquecer este import não quebra a compilação**: o tema
   silenciosamente cai no `:root` neutro.
4. `src/themes/fonts.ts` — entrada em `LOADERS` (linha 14). É um
   `Record<ThemeId, ...>`, então o TypeScript cobra.
5. `src/screens/CaseSelectScreen.tsx` — entrada em `PREVIEW` (linha 14), com
   `emoji`, `chip` e `klass`. Também `Record<ThemeId, ...>`, cobrado pelo TS.

Só os itens 4 e 5 quebram `tsc`. O item 3 é a armadilha silenciosa — ver
"teste de integridade de tema" abaixo.

`useTheme.ts` e `index.css`/`@theme inline` são agnósticos: nada a mudar.

### Fontes dos temas novos

Todas conferidas e disponíveis no @fontsource. Uma linha de `npm i` no início
da fase de cada caso:

| tema | display | corpo |
|---|---|---|
| folia | Anton | Rubik |
| litoral | Fraunces | Nunito |
| deco | Poiret One | Lato |
| mesa | Prata | Inter *(já carregada no boot)* |

Atenção: faces de display têm um peso só, e `.font-display` já desliga
`font-synthesis-weight` — não usar utilitário de peso sobre elas.

### Teste de integridade de tema (novo)

Hoje **nada** garante que um `ThemeId` tenha CSS. Com 8 temas isso vira risco
real. Acrescentar a `casesIntegrity.test.ts` um teste que, para cada tema usado
por algum caso, verifica que `src/themes/<id>.css` existe e que `src/index.css`
tem o `@import` correspondente. É leitura de arquivo — o ambiente de teste é
node, então funciona (o mesmo truque já usado no teste de retratos).

---

### Caso 05 — "Ensaio Geral" · tema `folia` · dificuldade 3 · ~45 min

Barracão da Unidos do Cruzeiro, véspera do desfile. **Wanderley Braga**, o
carnavalesco, é achado embaixo da alegoria do abre-alas, esmagado. Parece
acidente de guincho — o cabo arrebentou, dizem.

- **Culpada:** Neide Sampaio, a presidente da escola.
- **Como:** soltou a trava do guincho enquanto Wanderley ajustava a alegoria.
- **Por quê:** Wanderley conferiu as notas de material e descobriu que a verba
  do patrocínio não chegou ao barracão. Ia levar isso à reunião pós-desfile.
- **Elenco:** Neide (presidente), Jorjão (mestre de bateria), Dandara
  (porta-bandeira), Seu Vavá (aderecista, 40 anos de escola), Rick (o
  patrocinador).
- **Espinha das contradições:** "ninguém ouviu nada por causa da bateria" ×
  gravação do ensaio com 20 minutos de silêncio; "a trava do guincho só abre
  com chave" × chave achada fora do quadro; nota fiscal do patrocínio × o que
  de fato entrou no barracão.
- **Paleta:** magenta, dourado, turquesa sobre roxo profundo. Textura de
  purpurina. É o tema mais saturado do jogo.

### Caso 06 — "O Casal do Quarto 7" · tema `litoral` · dificuldade 2 · ~40 min

Pousada Mirante do Costão, praia isolada, fora de temporada. **Aurélio Bastos**,
o dono, é encontrado na restinga na maré vazante.

O gancho é o casal: **Bruna e Téo**, em lua de mel, juram ter passado a tarde
juntos — e cada um mente de um jeito diferente. Um caso sobre duas pessoas
contando a mesma história, jogado por duas pessoas contando a mesma história.

- **Culpada:** Bruna. Aurélio a reconheceu: foi a corretora que aplicou um
  golpe no irmão dele. Ele ameaçou expor na frente do marido.
- **Como:** empurrou-o do costão na maré cheia; o corpo apareceu na vazante.
- **Por quê:** silenciar o passado antes que o marido soubesse.
- **Téo é inocente e mente mesmo assim** — cobre a mulher achando que a
  protege de um mal-entendido. É ele quem entrega o caso sem querer.
- **Elenco:** Bruna, Téo, Salete (caseira), Zé Doril (barqueiro), Cris
  (hóspede que fotografa aves).
- **Espinha:** cartão de memória da fotógrafa com horário nas fotos; tábua de
  marés; livro de hóspedes; conta do bar com dois nomes em horários
  incompatíveis.
- **Paleta:** turquesa, areia, coral, sol forte. Segundo tema claro do jogo,
  mas nada a ver com o cozy (que é creme de interior).

### Caso 07 — "Cabine 9" · tema `deco` · dificuldade 3 · ~45 min

Noturno Rio–São Paulo, 1937. **Coronel Aristides Bulhões**, cafeicultor, é
achado morto na cabine trancada por dentro. Entre a última parada e o amanhecer,
ninguém pôde descer.

O único formato de mistério que o jogo ainda não tem: **quarto trancado**, lista
curta de suspeitos, horários que precisam bater no minuto.

- **Culpada:** Otília, a criada da viúva — filha não reconhecida do coronel.
- **Como:** entrou pela porta de comunicação entre as cabines 9 e 10, que o
  registro da ferrovia dá como lacrada mas que passou por manutenção no mês
  anterior.
- **Por quê:** o coronel ia vender a fazenda onde a mãe dela morreu servindo.
- **Elenco:** Nequinho (revisor), Dona Ilka (viúva da cabine 10), Fabrício
  (jovem engenheiro), Otília (criada), Salim (comerciante).
- **Espinha:** a chave-mestra do revisor; o horário do freio de emergência; o
  livro de manutenção da ferrovia; o telegrama despachado na última parada.
- **Paleta:** verde-garrafa, latão, marfim; geometria art déco.

### Caso 08 — "Estrela Cadente" · tema `mesa` · dificuldade 2 · ~40 min

Restaurante Aurora, noite da visita do guia. **Chef Vitório Sanna** é encontrado
na câmara fria ao fim do serviço.

- **Culpado:** Renan, o sócio investidor.
- **Como:** trancou o chef na câmara fria durante o pico do serviço e desligou
  o botão de emergência interno.
- **Por quê:** Vitório ia sair e levar o nome — e a estrela — para outra casa,
  deixando Renan com um salão vazio e a dívida inteira.
- **Elenco:** Ivy (sous-chef), Renan (sócio), Cléo (maître), Dinho (chef de
  partida), Marta (a inspetora do guia).
- **Espinha:** horários impressos nas comandas; o registro de abertura da
  câmara fria; a agenda do celular do chef; o contrato rascunhado com a casa
  concorrente.
- **Paleta:** porcelana branca, tinta preta, brasa. Alto contraste, editorial,
  como um menu — claro e severo, o oposto do litoral.

---

## Verificação

Ao fim de **cada** fase:

1. `npm test` — os testes de integridade validam referências, simulam a solução
   completa pelo solver e agora também checam CSS/import de tema.
2. `npm run build` — `tsc -b` pega as omissões em `LOADERS` e `PREVIEW`.
3. `npm run dev` e abrir o caso novo no navegador: conferir que o tema trocou
   (fontes e cores), que a pasta na seleção mostra a prévia certa, e jogar o
   caso até a acusação para sentir o ritmo.
4. Nas fases de mecânica, além disso: travar de propósito na Mesa para exercitar
   os três níveis de dica, e abrir o caderno com contradições já encontradas.
