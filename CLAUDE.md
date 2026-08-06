# Dossiê a Dois

Jogo de investigação **cooperativo para 2 jogadores num único tablet** (PWA).
Um jogador é o **Detetive** (interroga suspeitos), o outro é o **Perito**
(analisa evidências). O tablet passa de mão em mão; cada papel vê só o seu
lado. As mentiras dos suspeitos (alegações) só caem quando cruzadas com fatos
das provas na **Mesa de Contradições** — o que obriga o casal a conversar.
Acusação final: quem, como e por quê; epílogo narra a verdade; nota 0–100.

## Stack

Vite 6 + React 18 + TypeScript strict + Tailwind v4 (`@tailwindcss/vite`) +
Zustand 5 + vite-plugin-pwa + Vitest. Fontes self-hosted via @fontsource.
Mesma base do app irmão `../Mimica-na-regua`.

- `npm run dev` — dev server com `--host` (testar no tablet pela rede local)
- `npm test` — 36 testes (integridade dos casos + lógica pura)
- `npm run build` — tsc + vite build (dist/)
- `npm run icons` — regenera ícones PWA e `logo.svg` de `scripts/gen-icons.mjs`
- `npm run art` — converte `art-src/` em webp 512px otimizado em `public/art/`

## Regras da casa

- **Lógica de jogo no store (`src/store/gameStore.ts`), nunca em componentes.**
- Toda ação do store valida `screen` antes de agir (toques duplos/StrictMode).
- Tempo sempre via `src/lib/clock.ts` (`now()`), nunca `Date.now()`.
- Storage sempre via `store` de `src/lib/fx.ts`, nunca `localStorage` direto.
- Progresso é salvo ao fim de cada ação mutante (`persistProgress`).
- Componentes usam SÓ tokens semânticos (`bg-surface`, `text-ink`,
  `font-display`…). Cores/fontes por tema vivem em `src/themes/*.css`
  (blocos `[data-theme="..."]`). Zero código por tema em TSX.
- Ícones de interface vêm de `src/components/icons.tsx` (SVG, `currentColor`).
  Emoji só como *conteúdo* (retrato de reserva de suspeito), nunca como ícone
  de UI.
- Nada de `font-semibold` sobre `font-display`: as faces de display têm um
  peso só e o negrito sintético as engorda (`.font-display` já desliga
  `font-synthesis-weight`).

## Linguagem visual

A marca é o **coração de impressão digital** (SVG puro em
`scripts/gen-icons.mjs`, que gera os ícones do PWA e `public/logo.svg`).

O elemento-assinatura é o **carimbo de tinta** (`.stamp` em `index.css`):
torto, borda dupla, desgaste irregular. Aparece na situação do caso, na
passagem de turno, na contradição revelada e na acusação definitiva — e em
mais lugar nenhum. A inclinação usa a propriedade `rotate`, não `transform`,
porque a animação de carimbo anima o `transform`.

A casca neutra (título e arquivo de casos) é a sala de arquivo: máquina de
escrever (Special Elite), pastas de papel manilha (`.folder*`) e a foto
presa na pasta (`.folder-photo`). Cada caso troca tudo isso pelo seu tema.

## Arte (retratos e capas)

Originais grandes ficam em `art-src/<caso>/<id do suspeito>.png`, **fora de
`public/`** (o precache do PWA rejeita arquivos acima de 2 MiB). `npm run art`
converte para `public/art/<caso>/<id>.webp` (512×512, ~20 kB). Pastas
começadas por `_` são ignoradas.

No dado do caso: `portrait: "/art/<caso>/<id>.webp"` no suspeito e `cover` no
resumo em `cases/index.ts`. Ambos são opcionais — sem eles o jogo cai no
`portraitEmoji`, e o cartão do suspeito encolhe a faixa de imagem em vez de
fingir uma foto vazia. Um caminho quebrado derruba `npm test`.

Prompts de geração das imagens: `docs/prompts-imagens.md`.

## Casos (conteúdo)

Um caso é **dado puro** em `src/data/cases/casoNN*.ts` seguindo o schema de
`src/data/types.ts`. Regra de bloqueio: item referenciado no `reveals` de
alguma pista (lead) começa oculto; o resto é visível desde o início.
Contradição = par `claimId` × `factId`; acerto desbloqueia leads.

**Caso novo:** criar o arquivo, registrar resumo + loader em
`src/data/cases/index.ts`, rodar `npm test`. Os testes de integridade
(`casesIntegrity.test.ts`) validam referências e simulam a solução completa
(`solveCase.ts`): contradição inalcançável, pista morta ou conteúdo órfão
derrubam o teste com o id exato do problema.

Temas disponíveis: `noir`, `cozy`, `tech`, `occult`. Tema novo = CSS em
`src/themes/`, fontes em `src/themes/fonts.ts`, prévia do cartão em
`CaseSelectScreen.tsx`.

## Deploy

Vercel (como o Mimica): build `npm run build`, output `dist/`. Instalar no
tablet: abrir a URL no Chrome → menu → "Adicionar à tela inicial".

## Chaves de storage

`dossie_settings`, `dossie_save_<caseId>`, `dossie_records`.
`Case.version`: aumentar ao editar conteúdo de um caso publicado — invalida
saves antigos daquele caso (de propósito).
