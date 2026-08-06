/**
 * Lógica pura de progressão do caso: visibilidade derivada do grafo de
 * pistas e julgamento de pares alegação × fato.
 *
 * Nada aqui toca o Zustand, o DOM ou efeitos — tudo testável direto.
 */
import type { Case, ClaimId, Contradiction, FactId, Lead, Suspect } from "../data/types";
import { claimOwners, factOwners, lockedAtStart } from "../data/solveCase";

export interface Progress {
  unlockedLeads: Set<string>;
  foundContradictions: string[];
  /** Pares errados já tentados ("claimId|factId") — repetir não pune de novo. */
  wrongPairs: string[];
  readInterviews: Set<string>; // "suspectId:interviewId"
  viewedEvidence: Set<string>;
}

export function emptyProgress(): Progress {
  return {
    unlockedLeads: new Set(),
    foundContradictions: [],
    wrongPairs: [],
    readInterviews: new Set(),
    viewedEvidence: new Set(),
  };
}

export function pairKey(claimId: ClaimId, factId: FactId): string {
  return `${claimId}|${factId}`;
}

/* -------- visibilidade -------- */

function revealedByUnlocked(c: Case, unlockedLeads: Set<string>) {
  const suspects = new Set<string>();
  const interviews = new Set<string>();
  const evidence = new Set<string>();
  for (const l of c.leads) {
    if (!unlockedLeads.has(l.id)) continue;
    for (const r of l.reveals) {
      if (r.type === "suspect") suspects.add(r.id);
      else if (r.type === "evidence") evidence.add(r.id);
      else interviews.add(`${r.suspectId}:${r.interviewId}`);
    }
  }
  return { suspects, interviews, evidence };
}

export function visibleSuspects(c: Case, unlockedLeads: Set<string>): Suspect[] {
  const locked = lockedAtStart(c);
  const revealed = revealedByUnlocked(c, unlockedLeads);
  return c.suspects.filter((s) => !locked.suspects.has(s.id) || revealed.suspects.has(s.id));
}

export function visibleInterviews(c: Case, suspect: Suspect, unlockedLeads: Set<string>) {
  const locked = lockedAtStart(c);
  const revealed = revealedByUnlocked(c, unlockedLeads);
  return suspect.interviews.filter((i) => {
    const key = `${suspect.id}:${i.id}`;
    return !locked.interviews.has(key) || revealed.interviews.has(key);
  });
}

export function visibleEvidence(c: Case, unlockedLeads: Set<string>) {
  const locked = lockedAtStart(c);
  const revealed = revealedByUnlocked(c, unlockedLeads);
  return c.evidence.filter((e) => !locked.evidence.has(e.id) || revealed.evidence.has(e.id));
}

/* -------- mesa de contradições -------- */

/** Alegações que o Detetive de fato já OUVIU (entrevista lida). */
export function heardClaims(c: Case, progress: Progress) {
  const out: Array<{ id: ClaimId; summary: string; suspectName: string }> = [];
  for (const s of c.suspects)
    for (const i of s.interviews) {
      if (!progress.readInterviews.has(`${s.id}:${i.id}`)) continue;
      for (const cl of i.claims) out.push({ id: cl.id, summary: cl.summary, suspectName: s.name });
    }
  return out;
}

/** Fatos que o Perito de fato já VIU (evidência analisada). */
export function seenFacts(c: Case, progress: Progress) {
  const out: Array<{ id: FactId; summary: string; evidenceName: string }> = [];
  for (const e of c.evidence) {
    if (!progress.viewedEvidence.has(e.id)) continue;
    for (const f of e.facts) out.push({ id: f.id, summary: f.summary, evidenceName: e.name });
  }
  return out;
}

export type PairResult =
  | { kind: "correct"; contradiction: Contradiction; newLeads: Lead[] }
  | { kind: "wrong" }
  | { kind: "repeatWrong" }
  | { kind: "alreadyFound" };

/**
 * Julga um par alegação × fato. Não muta o progresso — o chamador aplica o
 * resultado (store) ou só o inspeciona (testes).
 */
export function tryContradiction(
  c: Case,
  progress: Progress,
  claimId: ClaimId,
  factId: FactId
): PairResult {
  const hit = c.contradictions.find((k) => k.claimId === claimId && k.factId === factId);
  if (hit) {
    if (progress.foundContradictions.includes(hit.id)) return { kind: "alreadyFound" };
    const newLeads = hit.unlocks
      .filter((id) => !progress.unlockedLeads.has(id))
      .map((id) => c.leads.find((l) => l.id === id))
      .filter((l): l is Lead => !!l);
    return { kind: "correct", contradiction: hit, newLeads };
  }
  if (progress.wrongPairs.includes(pairKey(claimId, factId))) return { kind: "repeatWrong" };
  return { kind: "wrong" };
}

/** Sanidade extra usada pelo store: donos existem (casos validados garantem). */
export const owners = { claimOwners, factOwners };
