/**
 * Aplica o tema do caso carregado no <html> e dispara o carregamento das
 * fontes daquele tema. Sem caso aberto, volta ao tema neutro do arquivo.
 */
import { useEffect } from "react";
import { useGame } from "../store/gameStore";
import { loadThemeFonts } from "../themes/fonts";

export function useTheme() {
  const theme = useGame((s) => s.caseData?.theme ?? null);

  useEffect(() => {
    const el = document.documentElement;
    if (theme) {
      el.dataset.theme = theme;
      loadThemeFonts(theme);
    } else {
      delete el.dataset.theme;
    }
  }, [theme]);
}
