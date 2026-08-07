# Prompts de imagens — Dossiê a Dois

Prompts em inglês (geradores respondem melhor), rótulos em português.
Um prompt por vez.

## Por que esta versão existe

A primeira rodada de prompts descrevia roupa, adereço e clima — e quase nada
do rosto. Resultado: dentro do caso 01, Helena, Dora e Íris saíram com a mesma
cara (pele morena, cabelo escuro ondulado, mesmo formato de rosto), e Vicente
e Sal saíram como o mesmo homem (cabelo penteado para trás, bigodinho fino).

**A causa:** sem traço físico explícito, o gerador cai no rosto "padrão" do
estilo que você pediu. Roupa e objeto não separam pessoas — osso, cabelo,
pele e idade separam.

**A regra desta versão:** todo personagem tem uma **ficha física** com sete
itens obrigatórios — idade, formato do rosto, tom de pele, cabelo (cor +
textura + corte), olhos, boca/nariz, porte físico — mais **um traço que só
ele tem** dentro do caso. As fichas de um mesmo caso foram montadas para se
oporem: se uma tem cabelo preto cacheado, a outra tem loiro liso preso.

## Regras que valem para TODAS as imagens

- **Sem texto, letreiro ou marca d'água** (o app põe os textos por cima).
- Retratos: **quadrado 1:1**, busto (peito para cima).
- Capas de caso: **16:10 paisagem**, sem rosto em close.
- **Gere cada personagem numa conversa/semente nova.** Gerar vários seguidos
  na mesma conversa faz o gerador repetir o rosto anterior.
- Ao receber a imagem, faça o **teste do rosto**: tape a roupa e o cenário
  com a mão. Se sobrar a mesma pessoa do retrato anterior, descarte e gere de
  novo reforçando a ficha física.

### Negativo (cole se o gerador aceitar "negative prompt")

> same face as previous character, generic face, identical facial features,
> photorealistic photo, 3d render, cartoon, anime, vector art, flat
> illustration, text, watermark, signature, extra fingers, deformed hands

## Estilo da casa (prefixo comum a todos os retratos)

Os retratos do caso 01 que ficaram bons são **óleo pictórico**. Este prefixo
descreve exatamente aquele resultado — cole antes da ficha, trocando
`<PALETA>`:

> Oil painting portrait in the style of a classic book cover illustration,
> visible brush strokes and impasto texture, dramatic chiaroscuro lighting,
> warm rim light on one side of the face, dark atmospheric background,
> painterly and slightly rough, not photorealistic, square bust portrait,
> no text, no watermark, <PALETA>

Paletas por tema:

- **noir** — `moody 1948 film-noir palette: deep warm blacks, amber lamplight,
  hard venetian-blind shadows falling across the scene, smoky air`
- **cozy** — `warm cozy palette: cream, honey and soft terracotta, gentle
  daylight from a window, spring flowers, calm and homely`
- **tech** — `cold modern palette: deep navy and slate, pale blue monitor
  glow on the face, sharp cyan rim light, night office`
- **folia** — `carnival workshop at night: deep violet shadows, hot magenta and
  teal work lights, gold glitter dust hanging in the air, half-built floats
  looming in the dark background`
- **occult** — `gothic candlelit palette: violet-black shadows, aged gold and
  parchment tones, single candle flame as the light source, early 1900s`

---

# CASO 01 — O Último Brinde (noir, boate Azul Meia-Noite, 1948)

## Elenco — confira o contraste antes de gerar

| Personagem | Idade | Pele | Cabelo | Porte | Traço exclusivo |
|---|---|---|---|---|---|
| Helena | 28 | morena clara | preto, ondas marcadas, curto no queixo | esbelta | sinal alto na maçã esquerda |
| Dora | 44 | muito pálida | loiro-acinzentado, liso, coque baixo severo | alta e angulosa | óculos de leitura em corrente |
| Íris | 24 | morena dourada, sardas | ruivo-acastanhado, cachos presos sob a boina | baixa e roliça | falha entre os dentes da frente |
| Vicente | 52 | corada, avermelhada | grisalho, entradas fundas, penteado para trás | pesado, pescoço largo | papada e bigode espesso |
| Sal | 58 | negra retinta | careca, barba branca aparada | altíssimo e magro | barba branca cheia (sem bigode fino) |

> As três mulheres não compartilham nenhum item. Os dois homens só têm em
> comum a idade alta — tudo o mais se opõe.

### Helena Duarte — a cantora → `helena.png` ✅ *(a que já ficou boa; só refaça se quiser)*
> A 28-year-old Brazilian nightclub singer in 1948. Heart-shaped face with a
> narrow chin and high cheekbones, light olive skin, jet-black hair set in
> tight 1940s finger waves cut short at the jaw, thin plucked arched
> eyebrows, large dark almond eyes rimmed red from crying with slightly
> smudged mascara, full dark-red lips, small straight nose, slender build and
> long neck. A small dark beauty mark high on her left cheekbone. She wears a
> black velvet evening gown and stands at a chrome vintage microphone under a
> single stage light, three-quarter view, looking just past the viewer.

### Dora Meireles — a esposa → `dora.png` ♻️ *(refazer)*
> A 44-year-old Brazilian upper-class widow in 1948. Long narrow face with a
> sharp jaw and prominent aquiline nose, very pale porcelain skin with fine
> lines at the mouth, ash-blonde hair pulled back severely into a low
> chignon with no waves at all, straight thin eyebrows, cool grey-blue
> hooded eyes, thin pale lips pressed shut, tall and angular with square
> shoulders. Gold-rimmed reading glasses hang on a chain against her chest
> and a wide wedding band sits on her hand. She wears a high-necked black
> mourning dress, seen almost frontally, chin slightly raised, cold and
> composed. Dark drawing room behind her.

### Íris Camargo — a cigarreira → `iris.png` ♻️ *(refazer)*
> A 24-year-old Brazilian cigarette girl in 1948. Round soft face with full
> cheeks and a small snub nose, golden-brown skin with a scatter of freckles
> across the nose and cheeks, reddish-brown hair in short tight curls tucked
> under a small pillbox cap, round wide-set brown eyes, thick natural
> eyebrows, a visible gap between her front teeth in a small closed smile,
> short and stocky with rounded shoulders, almost no makeup. She carries a
> cigarette tray on a strap across her chest, seen in three-quarter view
> glancing sideways as if watching someone else in the room. Crowded dark
> nightclub behind her.

### Vicente Sarmento — o sócio → `vicente.png` ✅ *(o outro que ficou bom)*
> A 52-year-old Brazilian nightclub co-owner in 1948. Heavy-set and
> thick-necked with a jowly square face and a soft double chin, ruddy
> flushed complexion shiny with sweat, grey-and-white hair with a deep
> receding hairline slicked straight back, small close-set brown eyes under
> heavy lids, a thick bushy moustache, fleshy nose, broad shoulders straining
> a pinstriped double-breasted suit. Gold rings on his fingers and
> fingernails bitten down to the quick. Three-quarter view, giving a
> practiced smile that does not reach his eyes.

### Salomão "Sal" Ferraz — o barman → `sal.png` ♻️ *(refazer)*
> A 58-year-old Black Brazilian bartender in 1948. Very tall and lean with
> long limbs, deep dark brown skin, completely bald head, a full neatly
> trimmed white beard covering the jaw and chin, a long face with prominent
> cheekbones and deep vertical lines beside the mouth, deep-set calm dark
> eyes, wide flat nose, large weathered hands with long fingers. He wears a
> white bartender jacket and black bow tie and polishes a cut-crystal glass
> with a cloth. Near profile, head turned slightly toward the viewer, quiet
> and watchful. Rows of bottles glinting behind him.

### Capa do caso → `capa.png`
> Oil painting illustration, 1948 nightclub interior after closing time,
> empty stage with a chrome microphone under one dying spotlight, an
> overturned whiskey glass on a small round table in the foreground with
> spilled liquor catching the light, cigarette smoke hanging in the air,
> hard venetian-blind shadows across the floor, deep warm blacks and amber,
> visible brush strokes, no people, no text, 16:10 landscape

---

# CASO 02 — Morte no Bazar da Primavera (cozy, vila do interior, hoje)

## Elenco

| Personagem | Idade | Pele | Cabelo | Porte | Traço exclusivo |
|---|---|---|---|---|---|
| Cecília | 57 | rosada, clara | grisalho curto com permanente | baixa e roliça | óculos redondos pequenos |
| Marina | 31 | negra retinta | crespo preto em coque alto volumoso | alta e magra | sorriso largo, argolas pequenas |
| Godofredo | 68 | curtida de sol, muito bronzeada | branco ralo sob a boina | encurvado, atarracado | bigode branco caído, um dente faltando |
| Beatriz | 32 | pálida, sardenta | ruivo-acastanhado liso em rabo baixo | magra, ombros caídos | olheiras fundas |

### Cecília Fontes — a vice-presidente do bazar → `cecilia.png`
> A 57-year-old Brazilian small-town woman. Round pink face with plump
> cheeks and a soft double chin, fair skin flushed at the cheeks, short
> silver-grey hair in a tight permed set, small round wire glasses low on a
> small upturned nose, pale blue-grey eyes, thin lips in a tight polite
> smile, short and plump. She wears a floral silk scarf knotted at her neck
> over a buttoned cardigan and pearl earrings, and hugs an organizer
> notebook against her chest. Frontal view, chin tucked, smiling a little
> too hard. Parish hall with bunting blurred behind her.

### Marina Sales — a confeiteira → `marina.png`
> A 31-year-old Black Brazilian pastry chef. Tall and lean with long arms,
> deep dark brown skin, natural black coily hair gathered into a big high
> puff, high cheekbones and a strong straight nose, large warm brown eyes
> with thick lashes, wide generous mouth, small gold hoop earrings. She
> wears a flour-dusted apron over a modern blouse with sleeves pushed up,
> forearms dusted white, arms folded. Three-quarter view, direct and
> slightly defiant. Bakery shelves softly out of focus behind her.

### Godofredo Lima — o zelador → `godofredo.png`
> A 68-year-old Brazilian parish caretaker. Deeply sun-weathered leathery
> brown skin with heavy creases across the forehead and around the eyes,
> sparse thin white hair under a worn flat cap, a drooping white moustache,
> large bulbous nose, small dark eyes almost lost in wrinkles, one missing
> tooth visible in a grudging half-smile, short and stocky with a stooped
> back and thick blunt fingers. He wears a faded work shirt with rolled
> sleeves and a heavy ring of iron keys on his belt. Three-quarter view,
> suspicious. Old wooden church door behind him.

### Beatriz Prado — a sobrinha herdeira → `beatriz.png`
> A 32-year-old Brazilian woman visiting from the big city. Long oval face
> with a sharp jawline, pale skin with freckles across the nose, straight
> auburn hair pulled into a low ponytail with loose strands escaping,
> narrow green-hazel eyes with deep dark circles under them, straight
> eyebrows, small thin mouth, thin build with slightly hunched shoulders.
> Simple dark city clothes that look out of place, a small silver chain, a
> sunflower pinned at the collar. Frontal view, grieving and guilty, eyes
> not quite meeting the viewer. Sunlit small-town street blurred behind her.

### Capa do caso → `capa.png`
> Oil painting illustration, spring charity bazaar inside a Brazilian parish
> hall, bunting and flower stalls, a long table of homemade pies where one
> apricot pie has a single slice cut out, an overturned teacup beside it,
> warm cream and honey tones with soft terracotta, gentle daylight through
> tall windows, visible brush strokes, quiet and slightly wrong, no people,
> no text, 16:10 landscape

---

# CASO 03 — Protocolo Fantasma (tech, startup Nimbus, hoje)

## Elenco

| Personagem | Idade | Pele | Cabelo | Porte | Traço exclusivo |
|---|---|---|---|---|---|
| Priscila | 42 | morena média | preto liso, chanel com franja reta | atlética, ereta | franja reta e óculos sem aro |
| Caio | 36 | pálida | ruivo-acastanhado bagunçado | magro, alto | barba por fazer irregular |
| Lívia | 35 | clara | preto liso, corte reto no queixo, lateral raspada | baixa e miúda | armação redonda preta grande |
| Marcos | 19 | negra | crespo bem curto, fade | magrelo, ombros estreitos | acne no rosto, cara de criança |

### Priscila Ramos — a chefe de segurança → `priscila.png`
> A 42-year-old Brazilian corporate security executive. Square face with a
> strong jaw and flat cheekbones, medium brown skin, straight black hair in
> a sharp shoulder-length bob with a blunt fringe cut straight across the
> eyebrows, dark brown eyes behind thin rimless glasses, straight neutral
> mouth, minimal makeup, athletic build and very upright posture. She wears
> an impeccable dark blazer and a blank ID badge on a lanyard. Frontal view,
> perfectly calm and unreadable. Cold blue server-room light behind her.

### Caio Vasques — o CEO cofundador → `caio.png`
> A 36-year-old Brazilian startup founder. Long thin face with hollow
> cheeks and a prominent Adam's apple, pale skin, messy reddish-brown hair
> pushed back with fingers, uneven patchy stubble, narrow grey eyes with
> tired shadows, thin lips stretched into a stressed charismatic smile, tall
> and wiry. He wears a blazer over a plain t-shirt. Three-quarter view,
> caught mid-sentence, one shoulder forward. City lights through a dark
> office window behind him.

### Lívia Okada — a engenheira demitida → `livia.png`
> A 35-year-old Japanese-Brazilian data engineer. Round face with soft
> cheeks and a small chin, fair skin, straight black hair cut bluntly at the
> chin with a straight fringe and one side shaved short above the ear, dark
> monolid eyes behind large round black-framed glasses, small straight nose,
> mouth set in a hard flat line, short and small-framed. She wears a hoodie
> over a button-up shirt and holds a cardboard box of desk belongings.
> Three-quarter view, jaw tight, wounded and angry. Empty office corridor
> behind her.

### Marcos Paiva — o estagiário → `marcos.png`
> A 19-year-old Black Brazilian intern. Soft round boyish face that still
> looks like a teenager's, dark brown skin with visible acne across the
> cheeks and forehead, very short coily hair in a clean fade, big round
> brown eyes wide with worry, full lips slightly parted, skinny with narrow
> sloping shoulders. Oversized headphones hang around his neck over a
> baggy hoodie. Frontal view, slightly hunched, caught off guard. Dark
> open-plan office with monitor glow behind him.

### Capa do caso → `capa.png`
> Oil painting illustration, dark startup office at night, a server rack
> with one unit missing leaving a black gap and loose dangling cables, a
> single desk lamp and the cold cyan glow of monitors, rain streaking the
> window with city lights beyond, deep navy and slate palette, visible brush
> strokes, tense and empty, no people, no text, 16:10 landscape

---

# CASO 04 — A Vigília da Casa Bragança (occult, mansão, ~1900)

## Elenco

| Personagem | Idade | Pele | Cabelo | Porte | Traço exclusivo |
|---|---|---|---|---|---|
| Konrad | 52 | pálida acinzentada | preto com mechas prateadas, comprido | alto e esquelético | barba pontuda encerada |
| Estêvão | 31 | muito pálida | castanho-acinzentado, risca severa | alto e esguio | boca fina, rosto raspado |
| Gertrudes | 64 | morena escura, enrugada | branco em coque de risca ao meio | baixa e troncuda | sobrancelhas grossas unidas |
| Filomena | 27 | morena quente | preto em coque baixo solto | miúda, pescoço longo | olhos grandes de corça |

### Mestre Konrad — o médium → `konrad.png`
> A 52-year-old theatrical spirit medium, early 1900s. Gaunt skeletal face
> with hollow cheeks and a hooked beak-like nose, greyish pale skin, long
> black hair streaked with silver falling past his shoulders, a pointed
> waxed goatee, deep-set pale grey eyes with an intense hypnotic stare,
> thin mouth, very tall and bony. He wears a dark velvet robe over a fine
> suit and heavy rings on every finger. Lit from below by a single candle,
> three-quarter view, incense smoke curling around him.

### Estêvão Bragança — o sobrinho → `estevao.png`
> A 31-year-old Brazilian aristocrat heir, early 1900s. Long clean-shaven
> face with a high forehead and flat cheeks, very pale skin, ash-brown hair
> combed flat with a severe side part, light grey eyes that watch without
> blinking, straight narrow nose, thin cruel mouth, tall and slim with a
> stiff upright posture. He wears a high-collared black suit. Near profile
> turning toward the viewer, candlelight catching one side of his face.
> Dim mansion corridor behind him.

### Gertrudes — a governanta → `gertrudes.png`
> A 64-year-old Brazilian housekeeper, early 1900s. Broad weathered face
> deeply lined, dark brown skin, white hair parted in the middle and pulled
> into a severe tight bun, thick heavy eyebrows that almost meet, small
> dark eyes, a downturned unsmiling mouth, short and thickset with square
> shoulders and blunt work-worn hands. She wears a severe black dress with
> a white collar and a chatelaine of keys at her waist, and holds a lit
> brass candlestick. Frontal view, stern and grieving, rosary around her
> wrist.

### Filomena Bragança — a jovem viúva → `filomena.png`
> A 27-year-old Brazilian widow, early 1900s. Small delicate oval face with
> a pointed chin, warm brown skin, black hair gathered in a soft low knot
> with loose strands at the temples, very large round dark doe eyes, fine
> arched eyebrows, small full mouth, petite with a long slender neck and
> narrow shoulders. She wears a black mourning dress with a sheer veil half
> lifted back. Three-quarter view, moonlight from a window on her face,
> lonely and guarded, an outsider in a hostile house. Dark patterned
> wallpaper behind her.

### Capa do caso → `capa.png`
> Oil painting illustration, séance room in an early 1900s Brazilian manor
> at night, a round table ringed with empty chairs pushed back, candles
> just blown out with smoke still rising, a single muddy boot print on the
> parquet floor lit by moonlight from tall windows, violet-black shadows
> with aged gold, visible brush strokes, no people, no text, 16:10 landscape

---

# CASO 05 — Ensaio Geral (folia, barracão da Unidos do Cruzeiro, hoje)

## Elenco

| Personagem | Idade | Pele | Cabelo | Porte | Traço exclusivo |
|---|---|---|---|---|---|
| Neide | 58 | negra retinta | alisado em coque alto laqueado | corpulenta, imponente | **vestido vermelho** (é canônico: aparece no story) |
| Jorjão | 55 | negra média | cabeça raspada + barba grisalha cheia | ombros enormes, pescoço largo | barba grisalha cerrada |
| Dandara | 29 | parda clara | cachos volumosos castanho-claros com mechas douradas | esguia, postura de bailarina | os cachos com mechas |
| Seu Vavá | 67 | branca muito castigada de sol | branco fino e desalinhado, bigode branco | magro e seco, encurvado | óculos na ponta do nariz, mãos manchadas de tinta |
| Rick | 34 | branca bronzeada de barco | castanho-claro com gel | magro, ombros estreitos | óculos escuros na cabeça |

> Três gerações e cinco tipos físicos sem nada em comum. O vestido vermelho de
> Neide **não é opcional** — o caso depende dele para ela ser reconhecida
> desfocada no vídeo.

### Neide Sampaio — a presidente → `neide.png`
> A 58-year-old Black Brazilian woman, president of a samba school. Broad
> strong face with full cheeks and a firm jaw, deep dark brown skin, relaxed
> black hair pulled up into a high lacquered bun, sharply drawn eyebrows, dark
> wine lipstick, large gold hoop earrings, heavy-set and imposing with square
> shoulders. She wears a **red dress** and stands with her arms crossed in the
> doorway of an office at the back of a float workshop. Frontal view, chin
> raised, in complete command of the room.

### Jorjão — o mestre de bateria → `jorjao.png`
> A 55-year-old Black Brazilian samba drum master. Square face with a heavy
> jaw, medium brown skin, completely shaved head, thick full grey beard,
> small deep-set eyes with laugh lines, enormous shoulders and a wide neck,
> a thick gold chain over a polo shirt with the school crest. A whistle hangs
> from his lips on a cord and a drumstick is tucked behind his ear.
> Three-quarter view, sweating, mid-rehearsal, drums blurred behind him.

### Dandara Ribeiro — a porta-bandeira → `dandara.png`
> A 29-year-old light-brown-skinned Brazilian flag bearer. Fine oval face with
> a pointed chin and high cheekbones, voluminous curly light-brown hair with
> golden highlights, large dark eyes with sharp winged eyeliner, full lips,
> slender dancer's build with an impossibly upright posture and a long neck.
> She wears a rehearsal costume with a sequined bodice and holds a phone in one
> hand, mid-selfie. Three-quarter view, glancing sideways at something offstage.

### Seu Vavá — o aderecista → `vava.png`
> A 67-year-old white Brazilian float craftsman with deeply sun-damaged skin.
> Thin dry face carved with wrinkles, fine white unkempt hair, thick white
> moustache, reading glasses perched on the tip of his nose, pale watery eyes
> looking over the rims, wiry and stooped. Huge calloused hands stained with
> glue and paint, holding a bent piece of iron rod. He wears a paint-spattered
> work apron. Near profile turning to the viewer, unimpressed. Feathers and
> foam sculptures on shelves behind him.

### Rick Aloisio — o patrocinador → `rick.png`
> A 34-year-old white Brazilian heir to a drinks company, boat-tanned. Long
> narrow face with a trimmed three-day stubble, light-brown hair combed back
> with gel, thin lips, pale grey eyes, slim with narrow shoulders. Sunglasses
> pushed up on his head, open linen shirt, an expensive watch. He stands
> awkwardly in a float workshop at night, clearly not dressed for it.
> Three-quarter view, checking his phone, wanting to leave.

### Capa do caso → `capa.png`
> Oil painting illustration, samba school float workshop at night after
> everyone has left, a half-finished parade float towering in the dark, a
> heavy sculpted piece fallen on the concrete floor beside a steel column
> winch with its cable still intact and coiled, a single work lamp and magenta
> and teal light spilling from above, gold glitter dust hanging in the air,
> deep violet shadows, visible brush strokes, no people, no text, 16:10
> landscape

---

# Extras

### Tela de título → salvar como `art-src/geral/titulo.png` (16:10)
> Oil painting illustration seen from directly above: a detective's desk
> with an open case folder of blank papers, a magnifying glass, a fountain
> pen and two coffee cups side by side, warm desk-lamp light pooling in the
> centre and darkness at the edges, charcoal, cream and amber, visible
> brush strokes, no text, no watermark, 16:10 landscape

### Ícone e logo
Não precisa de gerador: a marca é o **coração de impressão digital**,
desenhado em SVG puro por `npm run icons` (`scripts/gen-icons.mjs`), que
também gera `public/logo.svg`. Para mudar a marca, edite o script.

---

# Onde salvar e como ligar no jogo

1. Salve o PNG original em **`art-src/<caso>/<id>.png`** — nunca direto em
   `public/`, senão o build do PWA quebra (limite de 2 MiB por arquivo).
   O `<id>` é o id do suspeito no arquivo de dados do caso, e a pasta segue
   o nome do arquivo: `art-src/caso01Noir/helena.png`.
2. Rode **`npm run art`** — converte tudo para `public/art/<caso>/<id>.webp`
   em 512×512 (~20 kB cada).
3. Adicione `portrait: "/art/<caso>/<id>.webp"` no suspeito (o
   `caso01Noir.ts` já está pronto, use como modelo) e `cover` no resumo em
   `cases/index.ts`.
4. Rode **`npm test`** — retrato apontando para arquivo inexistente derruba
   o teste com o id do suspeito.

**Situação:** caso 01 tem os 5 retratos ligados; Dora, Íris e Sal valem
refazer com as fichas novas. **Casos 02, 03, 04 e 05 não têm nenhuma arte** —
todos rodam com o emoji de reserva, e o cartão de suspeito encolhe a faixa de
imagem quando não há retrato, então não fica buraco na tela. As capas dos
cinco casos também estão pendentes (só o caso 01 tem `cover`).

A pasta de cada caso segue o nome do arquivo de dados: `art-src/caso01Noir/`,
`art-src/caso05Folia/`, e assim por diante.
