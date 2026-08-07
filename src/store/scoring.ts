/**
 * Pontuação e avaliação final (0–100 + estrelas), pura.
 */
import type { Case } from "../data/types";

/**
 * Teto da penalidade por dicas: apoiar-se em dica custa NO MÁXIMO uma estrela.
 * Sem teto, um caso de 7 contradições com a escada cheia custaria 42 pontos
 * (5★ → 2★) e a dica viraria armadilha — o casal travado punido duas vezes.
 */
export const HINT_PENALTY_CAP = 15;

export interface ScoreInput {
  foundContradictions: number;
  totalContradictions: number;
  wrongAttempts: number;
  unlockedLeads: number;
  totalLeads: number;
  whoCorrect: boolean;
  howCorrect: boolean;
  whyCorrect: boolean;
  /** Custo acumulado das dicas pedidas (store/hints.ts). */
  hintPoints: number;
}

export interface ScoreResult {
  total: number; // 0–100
  stars: 1 | 2 | 3 | 4 | 5;
  label: string;
  parts: {
    contradictions: number;
    accusation: number;
    thoroughness: number;
    penalty: number;
    /** Separado de `penalty` para o boletim não virar um número opaco. */
    hints: number;
  };
}

export function computeScore(input: ScoreInput): ScoreResult {
  const contradictions =
    input.totalContradictions === 0
      ? 0
      : Math.round(50 * (input.foundContradictions / input.totalContradictions));
  const accusation =
    (input.whoCorrect ? 20 : 0) + (input.howCorrect ? 10 : 0) + (input.whyCorrect ? 10 : 0);
  const thoroughness =
    input.totalLeads === 0 ? 10 : Math.round(10 * (input.unlockedLeads / input.totalLeads));
  // A ordem importa: descontar palpites ANTES das dicas faz com que, sem dica
  // pedida, todos os números batam exatamente com os de antes desta feature.
  const gross = contradictions + accusation + thoroughness;
  const penalty = Math.min(gross, input.wrongAttempts * 4);
  const hints = Math.min(gross - penalty, Math.min(Math.max(0, input.hintPoints), HINT_PENALTY_CAP));

  const total = Math.max(0, gross - penalty - hints);
  const stars: ScoreResult["stars"] = total >= 90 ? 5 : total >= 75 ? 4 : total >= 55 ? 3 : total >= 35 ? 2 : 1;
  const label =
    stars === 5
      ? "Dupla Lendária"
      : stars === 4
        ? "Parceiros de Elite"
        : stars === 3
          ? "Investigadores de Respeito"
          : stars === 2
            ? "Aprendizes Promissores"
            : "Estagiários da Delegacia";

  return { total, stars, label, parts: { contradictions, accusation, thoroughness, penalty, hints } };
}

export function scoreInputFromCase(
  c: Case,
  progress: {
    foundContradictions: string[];
    wrongPairs: string[];
    unlockedLeads: Set<string>;
    hintPoints: number;
  },
  accusation: { who?: string; how?: string; why?: string }
): ScoreInput {
  return {
    foundContradictions: progress.foundContradictions.length,
    totalContradictions: c.contradictions.length,
    wrongAttempts: progress.wrongPairs.length,
    unlockedLeads: progress.unlockedLeads.size,
    totalLeads: c.leads.length,
    whoCorrect: accusation.who === c.solution.culpritId,
    howCorrect: accusation.how === c.solution.correctHowId,
    whyCorrect: accusation.why === c.solution.correctWhyId,
    hintPoints: progress.hintPoints,
  };
}
