/**
 * Validação referencial de um caso.
 *
 * Retorna uma lista de erros legíveis (vazia = caso íntegro). Roda em teste
 * sobre todos os casos registrados; serve de ferramenta de autoria — escrever
 * caso novo, rodar `npm test`, corrigir o que aparecer.
 */
import type { Case } from "./types";

export type CaseError = string;

function dup(ids: string[]): string[] {
  const seen = new Set<string>();
  const out = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) out.add(id);
    seen.add(id);
  }
  return [...out];
}

export function validateCase(c: Case): CaseError[] {
  const errors: CaseError[] = [];
  const err = (msg: string) => errors.push(`[${c.id}] ${msg}`);

  /* -------- unicidade por namespace -------- */
  const suspectIds = c.suspects.map((s) => s.id);
  const evidenceIds = c.evidence.map((e) => e.id);
  const leadIds = c.leads.map((l) => l.id);
  const contradictionIds = c.contradictions.map((k) => k.id);
  const interviewIds = c.suspects.flatMap((s) => s.interviews.map((i) => i.id));
  const claimIds = c.suspects.flatMap((s) => s.interviews.flatMap((i) => i.claims.map((cl) => cl.id)));
  const factIds = c.evidence.flatMap((e) => e.facts.map((f) => f.id));

  for (const [name, ids] of [
    ["suspeito", suspectIds],
    ["evidência", evidenceIds],
    ["pista", leadIds],
    ["contradição", contradictionIds],
    ["entrevista", interviewIds],
    ["alegação", claimIds],
    ["fato", factIds],
  ] as const) {
    for (const d of dup(ids)) err(`id de ${name} duplicado: "${d}"`);
  }

  const claimSet = new Set(claimIds);
  const factSet = new Set(factIds);
  const leadSet = new Set(leadIds);
  const suspectSet = new Set(suspectIds);
  const evidenceSet = new Set(evidenceIds);

  /* -------- segmentos ↔ claims/facts declarados -------- */
  for (const s of c.suspects) {
    for (const i of s.interviews) {
      const declared = new Set(i.claims.map((cl) => cl.id));
      const referenced = new Set(i.answer.map((seg) => seg.ref).filter(Boolean) as string[]);
      for (const ref of referenced) {
        if (!declared.has(ref)) err(`entrevista "${i.id}": segmento aponta para alegação não declarada "${ref}"`);
      }
      for (const cl of i.claims) {
        if (!referenced.has(cl.id)) err(`entrevista "${i.id}": alegação "${cl.id}" declarada mas nenhum segmento a referencia`);
      }
    }
  }
  for (const e of c.evidence) {
    const declared = new Set(e.facts.map((f) => f.id));
    const referenced = new Set(e.body.map((seg) => seg.ref).filter(Boolean) as string[]);
    for (const ref of referenced) {
      if (!declared.has(ref)) err(`evidência "${e.id}": segmento aponta para fato não declarado "${ref}"`);
    }
    for (const f of e.facts) {
      if (!referenced.has(f.id)) err(`evidência "${e.id}": fato "${f.id}" declarado mas nenhum segmento o referencia`);
    }
  }

  /* -------- contradições -------- */
  const pairs = new Set<string>();
  for (const k of c.contradictions) {
    if (!claimSet.has(k.claimId)) err(`contradição "${k.id}": alegação inexistente "${k.claimId}"`);
    if (!factSet.has(k.factId)) err(`contradição "${k.id}": fato inexistente "${k.factId}"`);
    const pair = `${k.claimId}|${k.factId}`;
    if (pairs.has(pair)) err(`contradição "${k.id}": par repetido ${pair}`);
    pairs.add(pair);
    for (const l of k.unlocks) {
      if (!leadSet.has(l)) err(`contradição "${k.id}": desbloqueia pista inexistente "${l}"`);
    }
    if (!k.explanation.trim()) err(`contradição "${k.id}": sem explicação`);
  }

  /* -------- pistas -------- */
  const revealedBy = new Map<string, string>(); // chave do item → lead que o revela
  for (const l of c.leads) {
    if (l.reveals.length === 0) err(`pista "${l.id}": não revela nada`);
    for (const r of l.reveals) {
      let key: string;
      if (r.type === "suspect") {
        if (!suspectSet.has(r.id)) err(`pista "${l.id}": suspeito inexistente "${r.id}"`);
        key = `suspect:${r.id}`;
      } else if (r.type === "evidence") {
        if (!evidenceSet.has(r.id)) err(`pista "${l.id}": evidência inexistente "${r.id}"`);
        key = `evidence:${r.id}`;
      } else {
        const s = c.suspects.find((x) => x.id === r.suspectId);
        if (!s) {
          err(`pista "${l.id}": entrevista de suspeito inexistente "${r.suspectId}"`);
          continue;
        }
        if (!s.interviews.some((i) => i.id === r.interviewId)) {
          err(`pista "${l.id}": entrevista inexistente "${r.interviewId}" em "${r.suspectId}"`);
        }
        key = `interview:${r.suspectId}:${r.interviewId}`;
      }
      const prev = revealedBy.get(key);
      if (prev && prev !== l.id) err(`item ${key} revelado por duas pistas ("${prev}" e "${l.id}")`);
      revealedBy.set(key, l.id);
    }
  }

  /* -------- solução -------- */
  if (!suspectSet.has(c.solution.culpritId)) err(`culpado inexistente: "${c.solution.culpritId}"`);
  if (!c.solution.how.some((o) => o.id === c.solution.correctHowId)) err(`correctHowId fora das opções`);
  if (!c.solution.why.some((o) => o.id === c.solution.correctWhyId)) err(`correctWhyId fora das opções`);
  if (c.solution.minContradictions > c.contradictions.length) {
    err(`minContradictions (${c.solution.minContradictions}) maior que o total de contradições (${c.contradictions.length})`);
  }
  if (c.solution.minContradictions < 1) err(`minContradictions deve ser ≥ 1`);

  /* -------- sanidade de conteúdo -------- */
  if (!c.title.trim()) err("sem título");
  if (!c.briefing.shared.trim() || !c.briefing.detective.trim() || !c.briefing.perito.trim()) {
    err("briefing incompleto");
  }
  if (c.epilogue.length === 0) err("sem epílogo");
  if (c.contradictions.length < 3) err("caso precisa de pelo menos 3 contradições");
  if (c.estimatedMinutes < 10 || c.estimatedMinutes > 120) err("estimatedMinutes fora da faixa 10–120");

  return errors;
}
