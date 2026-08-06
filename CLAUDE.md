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
- `npm test` — 32 testes (integridade dos casos + lógica pura)
- `npm run build` — tsc + vite build (dist/)
- `npm run icons` — regenera ícones PWA de `scripts/gen-icons.mjs`

## Regras da casa

- **Lógica de jogo no store (`src/store/gameStore.ts`), nunca em componentes.**
- Toda ação do store valida `screen` antes de agir (toques duplos/StrictMode).
- Tempo sempre via `src/lib/clock.ts` (`now()`), nunca `Date.now()`.
- Storage sempre via `store` de `src/lib/fx.ts`, nunca `localStorage` direto.
- Progresso é salvo ao fim de cada ação mutante (`persistProgress`).
- Componentes usam SÓ tokens semânticos (`bg-surface`, `text-ink`,
  `font-display`…). Cores/fontes por tema vivem em `src/themes/*.css`
  (blocos `[data-theme="..."]`). Zero código por tema em TSX.

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
