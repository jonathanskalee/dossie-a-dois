/**
 * Preferências do aparelho (som, vibração, onboarding), persistidas com
 * validação por campo: um valor corrompido volta ao padrão sem anular o resto.
 *
 * Chave: `dossie_settings`.
 */
import { store } from "../lib/fx";

const KEY = "dossie_settings";

export interface Settings {
  soundOn: boolean;
  vibeOn: boolean;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  soundOn: true,
  vibeOn: true,
  onboarded: false,
};

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

export function loadSettings(): Settings {
  const raw = store.get(KEY);
  if (!raw) return { ...DEFAULT_SETTINGS };
  try {
    const p = JSON.parse(raw);
    return {
      soundOn: bool(p?.soundOn, DEFAULT_SETTINGS.soundOn),
      vibeOn: bool(p?.vibeOn, DEFAULT_SETTINGS.vibeOn),
      onboarded: bool(p?.onboarded, DEFAULT_SETTINGS.onboarded),
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: Settings) {
  store.set(KEY, JSON.stringify(s));
}
