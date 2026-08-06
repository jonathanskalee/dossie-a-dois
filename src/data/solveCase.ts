/**
 * Simulação de solucionabilidade de um caso.
 *
 * Parte do conteúdo visível no início (tudo que nenhuma pista revela),
 * "encontra" repetidamente toda contradição alcançável (entrevista da alegação
 * E evidência do fato visíveis) e aplica os desbloqueios, até estabilizar.
 *
 * Usado pelos testes de integridade para garantir que: todas as contradições
 * são encontráveis, todas as pistas disparam e nenhum conteúdo fica órfão.
 */
import type { Case, ClaimId, FactId } from "./types";

export interface SolveReport {
  solvable: boolean;
  foundContradictions: string[];
  unreachableContradictions: string[];
  firedLeads: string[];
  deadLeads: string[];
  orphanSuspects: string[];
  orphanInterviews: string[];
  orphanEvidence: string[];
}

/** Índices auxiliares: de que entrevista vem cada alegação, de que evidência vem cada fato. */
export function claimOwners(c: Case): Map<ClaimId, { suspectId: string; interviewId: string }> {
  const m = new Map<ClaimId, { suspectId: string; interviewId: string }>();
  for (const s of c.suspects)
    for (const i of s.interviews)
      for (const cl of i.claims) m.set(cl.id, { suspectId: s.id, interviewId: i.id });
  return m;
}

export function factOwners(c: Case): Map<FactId, string> {
  const m = new Map<FactId, string>();
  for (const e of c.evidence) for (const f of e.facts) m.set(f.id, e.id);
  return m;
}

/** Conjuntos de itens inicialmente bloqueados (referenciados por alguma pista). */
export function lockedAtStart(c: Case) {
  const suspects = new Set<string>();
  const interviews = new Set<string>(); // "suspectId:interviewId"
  const evidence = new Set<string>();
  for (const l of c.leads) {
    for (const r of l.reveals) {
      if (r.type === "suspect") suspects.add(r.id);
      else if (r.type === "evidence") evidence.add(r.id);
      else interviews.add(`${r.suspectId}:${r.interviewId}`);
    }
  }
  return { suspects, interviews, evidence };
}

export function solveCase(c: Case): SolveReport {
  const locked = lockedAtStart(c);
  const claims = claimOwners(c);
  const facts = factOwners(c);

  const visibleSuspects = new Set(c.suspects.map((s) => s.id).filter((id) => !locked.suspects.has(id)));
  const visibleInterviews = new Set<string>();
  for (const s of c.suspects)
    for (const i of s.interviews) {
      const key = `${s.id}:${i.id}`;
      if (!locked.interviews.has(key)) visibleInterviews.add(key);
    }
  const visibleEvidence = new Set(c.evidence.map((e) => e.id).filter((id) => !locked.evidence.has(id)));

  const found = new Set<string>();
  const fired = new Set<string>();

  // Entrevista só é acessível se o suspeito dela também está visível.
  const interviewReachable = (suspectId: string, interviewId: string) =>
    visibleSuspects.has(suspectId) && visibleInterviews.has(`${suspectId}:${interviewId}`);

  let changed = true;
  while (changed) {
    changed = false;
    for (const k of c.contradictions) {
      if (found.has(k.id)) continue;
      const owner = claims.get(k.claimId);
      const evId = facts.get(k.factId);
      if (!owner || !evId) continue; // validateCase acusa; aqui só não trava
      if (!interviewReachable(owner.suspectId, owner.interviewId)) continue;
      if (!visibleEvidence.has(evId)) continue;

      found.add(k.id);
      changed = true;
      for (const leadId of k.unlocks) {
        if (fired.has(leadId)) continue;
        fired.add(leadId);
        const lead = c.leads.find((l) => l.id === leadId);
        if (!lead) continue;
        for (const r of lead.reveals) {
          if (r.type === "suspect") visibleSuspects.add(r.id);
          else if (r.type === "evidence") visibleEvidence.add(r.id);
          else visibleInterviews.add(`${r.suspectId}:${r.interviewId}`);
        }
      }
    }
  }

  const unreachable = c.contradictions.map((k) => k.id).filter((id) => !found.has(id));
  const dead = c.leads.map((l) => l.id).filter((id) => !fired.has(id));
  const orphanSuspects = c.suspects.map((s) => s.id).filter((id) => !visibleSuspects.has(id));
  const orphanInterviews: string[] = [];
  for (const s of c.suspects)
    for (const i of s.interviews) {
      if (!visibleInterviews.has(`${s.id}:${i.id}`)) orphanInterviews.push(`${s.id}:${i.id}`);
    }
  const orphanEvidence = c.evidence.map((e) => e.id).filter((id) => !visibleEvidence.has(id));

  return {
    solvable: unreachable.length === 0,
    foundContradictions: [...found],
    unreachableContradictions: unreachable,
    firedLeads: [...fired],
    deadLeads: dead,
    orphanSuspects,
    orphanInterviews,
    orphanEvidence,
  };
}
