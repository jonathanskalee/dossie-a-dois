/**
 * Dicas progressivas da Mesa, puras e derivadas do caso.
 *
 * Nada aqui é escrito à mão por contradição: com 8 casos, dica autoral
 * multiplicaria o trabalho de autoria. Os textos saem de template sobre os
 * dados que o caso já tem.
 *
 * A escada tem três degraus, cada um revelando um pouco mais da MESMA
 * contradição:
 *   1. de quem é a fala que não se sustenta;
 *   2. qual prova a desmente;
 *   3. o par exato (a Mesa destaca os dois cartões).
 *
 * `evidenceName`, `claimId` e `factId` vêm `null` enquanto o nível não os
 * libera — o componente literalmente não recebe o que não pode mostrar, então
 * não há como vazar a resposta por descuido de JSX.
 */
import type { Case, ClaimId, Contradiction, ContradictionId, FactId } from "../data/types";
import { claimIndex, factIndex, type Progress } from "./progress";
import { claimOwners, factOwners } from "../data/solveCase";

export type HintLevel = 1 | 2 | 3;

/** Preço de CADA degrau: cutucar é barato, entregar é caro. */
export const HINT_COST: Record<HintLevel, number> = { 1: 1, 2: 2, 3: 3 };

/** Por que não há dica a dar agora. Nenhum destes cobra ponto. */
export type NoneReason = "allFound" | "askSuspects" | "examineEvidence" | "bothSides";

export type HintState =
  | { kind: "none"; reason: NoneReason; text: string }
  | { kind: "ready"; nextLevel: 1; nextCost: number; text: string }
  | {
      kind: "hint";
      level: HintLevel;
      contradictionId: ContradictionId;
      suspectName: string;
      /** Nível 2 em diante. */
      evidenceName: string | null;
      /** Só no nível 3 — é o que a Mesa usa para destacar os cartões. */
      claimId: ClaimId | null;
      factId: FactId | null;
      text: string;
      nextLevel: 2 | 3 | null;
      nextCost: number | null;
    };

/** Contradições que o casal consegue cruzar AGORA: fala ouvida, prova vista. */
export function reachableContradictions(c: Case, p: Progress): Contradiction[] {
  const donoDaFala = claimOwners(c);
  const donoDoFato = factOwners(c);
  return c.contradictions.filter((k) => {
    if (p.foundContradictions.includes(k.id)) return false;
    const fala = donoDaFala.get(k.claimId);
    const fato = donoDoFato.get(k.factId);
    if (!fala || !fato) return false;
    return p.readInterviews.has(`${fala.suspectId}:${fala.interviewId}`) && p.viewedEvidence.has(fato);
  });
}

/** Classifica o que falta quando nada é cruzável. É informação, não erro. */
function nadaACruzar(c: Case, p: Progress): { reason: NoneReason; text: string } {
  const pendentes = c.contradictions.filter((k) => !p.foundContradictions.includes(k.id));
  if (pendentes.length === 0) {
    return { reason: "allFound", text: "Vocês já desmontaram tudo o que dava. É hora de acusar." };
  }

  const donoDaFala = claimOwners(c);
  const donoDoFato = factOwners(c);
  // Empate resolve pela ordem do arquivo — mesma regra da escolha da dica.
  for (const k of pendentes) {
    const fala = donoDaFala.get(k.claimId);
    const fato = donoDoFato.get(k.factId);
    const ouviu = !!fala && p.readInterviews.has(`${fala.suspectId}:${fala.interviewId}`);
    const viu = !!fato && p.viewedEvidence.has(fato);
    if (viu && !ouviu) {
      return {
        reason: "askSuspects",
        text: "As provas na mesa já dizem mais do que os depoimentos. O Detetive precisa voltar a interrogar.",
      };
    }
    if (ouviu && !viu) {
      return {
        reason: "examineEvidence",
        text: "Alguém já mentiu, mas a prova que desmente ainda não foi aberta. O Perito precisa voltar à bancada.",
      };
    }
  }
  return {
    reason: "bothSides",
    text: "Falta matéria-prima dos dois lados: um interrogatório novo e uma prova nova.",
  };
}

/**
 * Estado da dica para o nível JÁ PAGO (0 = nada pago ainda).
 *
 * `pinned` mantém a escada falando da mesma contradição: sem isso, o casal
 * poderia pagar o nível 1 sobre um suspeito e receber o nível 2 sobre outro
 * (bastaria interrogar alguém entre um degrau e o seguinte).
 */
export function hintFor(
  c: Case,
  p: Progress,
  level: 0 | HintLevel,
  pinned?: ContradictionId | null
): HintState {
  const alcancaveis = reachableContradictions(c, p);
  if (alcancaveis.length === 0) {
    const { reason, text } = nadaACruzar(c, p);
    return { kind: "none", reason, text };
  }

  const alvo = (pinned && alcancaveis.find((k) => k.id === pinned)) || alcancaveis[0];

  if (level === 0) {
    return {
      kind: "ready",
      nextLevel: 1,
      nextCost: HINT_COST[1],
      text: "Uma das falas na mesa não se sustenta. Querem que eu diga de quem é?",
    };
  }

  const fala = claimIndex(c).get(alvo.claimId);
  const fato = factIndex(c).get(alvo.factId);
  // Casos validados garantem que existem; a guarda é só para o TypeScript.
  if (!fala || !fato) {
    return { kind: "none", reason: "bothSides", text: "Não consegui montar a dica para este caso." };
  }

  const proximo: 2 | 3 | null = level === 1 ? 2 : level === 2 ? 3 : null;

  // Os `summary` dos casos já trazem o nome de quem falou e já vêm com aspas
  // ("Helena: “fiquei no palco…”"). Por isso o nível 3 os insere crus, sem
  // repetir o nome antes nem envolver em outro par de aspas.
  const texto =
    level === 1
      ? `Alguém do lado do Detetive não está sendo sincero. Releiam o que ${fala.suspectName} disse.`
      : level === 2
        ? `${fala.suspectName} não sobrevive a uma prova específica: ${fato.evidenceName}.`
        : `A fala é ${fala.summary}. O fato que a derruba é ${fato.summary}. Marquem as duas na mesa e registrem.`;

  return {
    kind: "hint",
    level,
    contradictionId: alvo.id,
    suspectName: fala.suspectName,
    evidenceName: level >= 2 ? fato.evidenceName : null,
    claimId: level === 3 ? alvo.claimId : null,
    factId: level === 3 ? alvo.factId : null,
    text: texto,
    nextLevel: proximo,
    nextCost: proximo === null ? null : HINT_COST[proximo],
  };
}
