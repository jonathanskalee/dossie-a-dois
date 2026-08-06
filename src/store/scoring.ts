/**
 * Pontuação e avaliação final (0–100 + estrelas), pura.
 */
import type { Case } from "../data/types";

export interface ScoreInput {
  foundContradictions: number;
  totalContradictions: number;
  wrongAttempts: number;
  unlockedLeads: number;
  totalLeads: number;
  whoCorrect: boolean;
  howCorrect: boolean;
  whyCorrect: boolean;
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
  const penalty = Math.min(contradictions + accusation + thoroughness, input.wrongAttempts * 4);

  const total = Math.max(0, contradictions + accusation + thoroughness - penalty);
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

  return { total, stars, label, parts: { contradictions, accusation, thoroughness, penalty } };
}

export function scoreInputFromCase(
  c: Case,
  progress: {
    foundContradictions: string[];
    wrongPairs: string[];
    unlockedLeads: Set<string>;
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
  };
}
