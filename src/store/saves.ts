/**
 * Save/resume por caso, com validação defensiva campo a campo.
 *
 * Um valor corrompido é descartado silenciosamente (filtrado para ids que
 * existem no caso carregado) em vez de anular o save inteiro. Se a versão do
 * caso mudou, o save é descartado — o conteúdo editado corromperia o progresso.
 *
 * Chaves: `dossie_save_<caseId>`, `dossie_records`.
 */
import type { Case } from "../data/types";
import { store } from "../lib/fx";
import type { Progress } from "./progress";

const SAVE_PREFIX = "dossie_save_";
const RECORDS_KEY = "dossie_records";

export interface CaseSave {
  schema: 1;
  caseVersion: number;
  unlockedLeads: string[];
  foundContradictions: string[];
  wrongPairs: string[];
  readInterviews: string[];
  viewedEvidence: string[];
  accusation: { who?: string; how?: string; why?: string };
  elapsedMs: number;
  savedAtMs: number;
  /**
   * Ausente nos saves gravados antes das dicas — por isso opcional, e por isso
   * o `schema` NÃO sobe: campo novo com default seguro é aditivo. Subir o
   * schema apagaria toda partida em andamento em troca de nada.
   */
  hintPoints?: number;
}

function strArray(v: unknown, allowed: (s: string) => boolean): string[] {
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const item of v) {
    if (typeof item === "string" && allowed(item) && !out.includes(item)) out.push(item);
  }
  return out;
}

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : fallback;
}

export function saveKey(caseId: string): string {
  return `${SAVE_PREFIX}${caseId}`;
}

export function writeSave(caseId: string, save: CaseSave) {
  store.set(saveKey(caseId), JSON.stringify(save));
}

export function clearSave(caseId: string) {
  store.remove(saveKey(caseId));
}

/** Só os metadados — para a tela de seleção mostrar "Continuar (42 min)". */
export function peekSave(caseId: string): { elapsedMs: number; savedAtMs: number } | null {
  const raw = store.get(saveKey(caseId));
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (p?.schema !== 1) return null;
    return { elapsedMs: num(p.elapsedMs, 0), savedAtMs: num(p.savedAtMs, 0) };
  } catch {
    return null;
  }
}

/**
 * Carrega e saneia o save contra o caso já carregado.
 * Retorna null se não há save utilizável.
 */
export function loadSave(c: Case): (Progress & { accusation: CaseSave["accusation"]; elapsedMs: number }) | null {
  const raw = store.get(saveKey(c.id));
  if (!raw) return null;
  let p: any;
  try {
    p = JSON.parse(raw);
  } catch {
    return null;
  }
  if (p?.schema !== 1 || p?.caseVersion !== c.version) return null;

  const leadIds = new Set(c.leads.map((l) => l.id));
  const contradictionIds = new Set(c.contradictions.map((k) => k.id));
  const interviewKeys = new Set(c.suspects.flatMap((s) => s.interviews.map((i) => `${s.id}:${i.id}`)));
  const evidenceIds = new Set(c.evidence.map((e) => e.id));
  const claimIds = new Set(c.suspects.flatMap((s) => s.interviews.flatMap((i) => i.claims.map((cl) => cl.id))));
  const factIds = new Set(c.evidence.flatMap((e) => e.facts.map((f) => f.id)));

  const suspectIds = new Set(c.suspects.map((s) => s.id));
  const howIds = new Set(c.solution.how.map((o) => o.id));
  const whyIds = new Set(c.solution.why.map((o) => o.id));

  const acc = p.accusation ?? {};
  return {
    unlockedLeads: new Set(strArray(p.unlockedLeads, (s) => leadIds.has(s))),
    foundContradictions: strArray(p.foundContradictions, (s) => contradictionIds.has(s)),
    wrongPairs: strArray(p.wrongPairs, (s) => {
      const [cl, f] = s.split("|");
      return claimIds.has(cl) && factIds.has(f);
    }),
    readInterviews: new Set(strArray(p.readInterviews, (s) => interviewKeys.has(s))),
    viewedEvidence: new Set(strArray(p.viewedEvidence, (s) => evidenceIds.has(s))),
    hintPoints: num(p.hintPoints, 0),
    accusation: {
      who: typeof acc.who === "string" && suspectIds.has(acc.who) ? acc.who : undefined,
      how: typeof acc.how === "string" && howIds.has(acc.how) ? acc.how : undefined,
      why: typeof acc.why === "string" && whyIds.has(acc.why) ? acc.why : undefined,
    },
    elapsedMs: num(p.elapsedMs, 0),
  };
}

/* -------- recordes por caso concluído -------- */

export interface CaseRecord {
  stars: number;
  score: number;
  bestTimeMs: number;
}

export function loadRecords(): Record<string, CaseRecord> {
  const raw = store.get(RECORDS_KEY);
  if (!raw) return {};
  try {
    const p = JSON.parse(raw);
    if (typeof p !== "object" || p === null) return {};
    const out: Record<string, CaseRecord> = {};
    for (const [k, v] of Object.entries(p as Record<string, any>)) {
      const stars = num(v?.stars, 0);
      const score = num(v?.score, 0);
      const bestTimeMs = num(v?.bestTimeMs, 0);
      if (stars >= 1 && stars <= 5) out[k] = { stars, score, bestTimeMs };
    }
    return out;
  } catch {
    return {};
  }
}

/** Guarda o melhor resultado (maior score; empate → menor tempo). */
export function saveRecord(caseId: string, rec: CaseRecord) {
  const all = loadRecords();
  const prev = all[caseId];
  if (!prev || rec.score > prev.score || (rec.score === prev.score && rec.bestTimeMs < prev.bestTimeMs)) {
    all[caseId] = rec;
    store.set(RECORDS_KEY, JSON.stringify(all));
  }
}
