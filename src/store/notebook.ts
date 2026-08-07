/**
 * O caderno do caso — o que a dupla já descobriu, relido.
 *
 * Puro e inteiramente derivado do progresso: contradições encontradas, pistas
 * abertas e pares descartados. Nenhum estado novo é persistido.
 *
 * As entradas seguem a ordem de `foundContradictions` (cronológica, como o
 * casal descobriu) e não a ordem do arquivo do caso — o caderno conta a
 * história da noite, não a do autor.
 */
import type { Case, ContradictionId, LeadId } from "../data/types";
import { claimIndex, factIndex, type Progress } from "./progress";

export interface NotebookLead {
  id: LeadId;
  title: string;
  narration: string;
}

export interface NotebookEntry {
  contradictionId: ContradictionId;
  claimSummary: string;
  suspectName: string;
  factSummary: string;
  evidenceName: string;
  explanation: string;
  /** Pistas que ESTA contradição abriu (sem repetir entre entradas). */
  leads: NotebookLead[];
}

export interface NotebookDeadEnd {
  claimSummary: string;
  suspectName: string;
  factSummary: string;
  evidenceName: string;
}

export interface Notebook {
  entries: NotebookEntry[];
  /** Pistas abertas que nenhuma contradição encontrada explica (save saneado). */
  orphanLeads: NotebookLead[];
  deadEnds: NotebookDeadEnd[];
  counts: { found: number; total: number; leads: number; totalLeads: number; deadEnds: number };
}

export function buildNotebook(c: Case, p: Progress): Notebook {
  const falas = claimIndex(c);
  const fatos = factIndex(c);
  const pistas = new Map(c.leads.map((l) => [l.id, l] as const));

  const entries: NotebookEntry[] = [];
  const jaCitadas = new Set<LeadId>();

  for (const id of p.foundContradictions) {
    const k = c.contradictions.find((x) => x.id === id);
    if (!k) continue; // save de outra versão do caso
    const fala = falas.get(k.claimId);
    const fato = fatos.get(k.factId);
    if (!fala || !fato) continue;

    const leads: NotebookLead[] = [];
    for (const leadId of k.unlocks) {
      if (jaCitadas.has(leadId) || !p.unlockedLeads.has(leadId)) continue;
      const l = pistas.get(leadId);
      if (!l) continue;
      jaCitadas.add(leadId);
      leads.push({ id: l.id, title: l.title, narration: l.narration });
    }

    entries.push({
      contradictionId: k.id,
      claimSummary: fala.summary,
      suspectName: fala.suspectName,
      factSummary: fato.summary,
      evidenceName: fato.evidenceName,
      explanation: k.explanation,
      leads,
    });
  }

  // `loadSave` saneia cada campo isoladamente, então um save pode ter pista
  // aberta sem a contradição que a abriu. Melhor mostrar do que sumir com ela.
  const orphanLeads: NotebookLead[] = [];
  for (const l of c.leads) {
    if (!p.unlockedLeads.has(l.id) || jaCitadas.has(l.id)) continue;
    orphanLeads.push({ id: l.id, title: l.title, narration: l.narration });
  }

  const deadEnds: NotebookDeadEnd[] = [];
  for (const par of p.wrongPairs) {
    const [claimId, factId] = par.split("|");
    const fala = falas.get(claimId);
    const fato = fatos.get(factId);
    if (!fala || !fato) continue;
    deadEnds.push({
      claimSummary: fala.summary,
      suspectName: fala.suspectName,
      factSummary: fato.summary,
      evidenceName: fato.evidenceName,
    });
  }

  return {
    entries,
    orphanLeads,
    deadEnds,
    counts: {
      found: entries.length,
      total: c.contradictions.length,
      leads: jaCitadas.size + orphanLeads.length,
      totalLeads: c.leads.length,
      deadEnds: deadEnds.length,
    },
  };
}
