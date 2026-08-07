/**
 * Fontes por tema, carregadas sob demanda.
 *
 * A fonte base (Inter) entra no boot em `main.tsx`; os pares de cada tema só
 * são importados quando um caso daquele tema é aberto — a tela de introdução
 * dá alguns segundos de cobertura para o swap. O Vite separa cada import
 * dinâmico em chunk próprio, e o precache do PWA (globPatterns com woff2)
 * garante que tudo funcione offline depois da primeira visita.
 */
import type { ThemeId } from "../data/types";

const loaded = new Set<ThemeId>();

const LOADERS: Record<ThemeId, () => Promise<unknown>> = {
  noir: () =>
    Promise.all([
      import("@fontsource/bebas-neue/latin-400.css"),
      import("@fontsource/libre-baskerville/latin-400.css"),
      import("@fontsource/libre-baskerville/latin-700.css"),
    ]),
  cozy: () =>
    Promise.all([
      import("@fontsource/playfair-display/latin-600.css"),
      import("@fontsource/lora/latin-400.css"),
      import("@fontsource/lora/latin-600.css"),
    ]),
  tech: () =>
    Promise.all([
      import("@fontsource/rajdhani/latin-600.css"),
      // corpo do tech é a Inter base, já carregada
    ]),
  occult: () =>
    Promise.all([
      import("@fontsource/cinzel/latin-600.css"),
      import("@fontsource/eb-garamond/latin-400.css"),
      import("@fontsource/eb-garamond/latin-600.css"),
    ]),
  folia: () =>
    Promise.all([
      import("@fontsource/anton/latin-400.css"),
      import("@fontsource/rubik/latin-400.css"),
      import("@fontsource/rubik/latin-600.css"),
    ]),
};

export function loadThemeFonts(theme: ThemeId) {
  if (loaded.has(theme)) return;
  loaded.add(theme);
  LOADERS[theme]().catch(() => loaded.delete(theme));
}
