/**
 * Caso mínimo de laboratório, compartilhado pelos testes puros do store.
 *
 * 2 suspeitos (1 bloqueado), 2 evidências (1 bloqueada), 2 contradições — uma
 * resolvível de saída e outra atrás da pista `l1`. Não é importado por nenhum
 * módulo do app, então não entra no bundle.
 */
import type { Case } from "../../data/types";

export const lab: Case = {
  id: "lab",
  version: 1,
  title: "Lab",
  tagline: "t",
  theme: "noir",
  difficulty: 1,
  estimatedMinutes: 20,
  briefing: { shared: "s", detective: "d", perito: "p" },
  suspects: [
    {
      id: "ana",
      name: "Ana",
      role: "r",
      portraitEmoji: "🅰️",
      description: "d",
      interviews: [
        {
          id: "ana-1",
          question: "q",
          answer: [{ text: "eu estava fora", ref: "cl-fora" }],
          claims: [{ id: "cl-fora", summary: "Ana: fora da cidade" }],
        },
        {
          id: "ana-2",
          question: "q2",
          answer: [{ text: "confesso parcialmente", ref: "cl-conf" }],
          claims: [{ id: "cl-conf", summary: "Ana: confissão parcial" }],
        },
      ],
    },
    {
      id: "beto",
      name: "Beto",
      role: "r",
      portraitEmoji: "🅱️",
      description: "d",
      interviews: [
        {
          id: "beto-1",
          question: "q",
          answer: [{ text: "não vi nada", ref: "cl-nada" }],
          claims: [{ id: "cl-nada", summary: "Beto: não viu nada" }],
        },
      ],
    },
  ],
  evidence: [
    {
      id: "ev-recibo",
      name: "Recibo",
      kind: "documento",
      body: [{ text: "recibo local", ref: "f-recibo" }],
      facts: [{ id: "f-recibo", summary: "Recibo na cidade" }],
    },
    {
      id: "ev-foto",
      name: "Foto",
      kind: "foto",
      body: [{ text: "foto de beto", ref: "f-foto" }],
      facts: [{ id: "f-foto", summary: "Beto na cena" }],
    },
  ],
  contradictions: [
    {
      id: "k1",
      claimId: "cl-fora",
      factId: "f-recibo",
      explanation: "Ana estava na cidade.",
      unlocks: ["l1"],
    },
    {
      id: "k2",
      claimId: "cl-nada",
      factId: "f-foto",
      explanation: "Beto estava lá.",
      unlocks: [],
    },
  ],
  leads: [
    {
      id: "l1",
      title: "L1",
      narration: "n",
      reveals: [
        { type: "suspect", id: "beto" },
        { type: "evidence", id: "ev-foto" },
        { type: "interview", suspectId: "ana", interviewId: "ana-2" },
      ],
    },
  ],
  solution: {
    culpritId: "ana",
    minContradictions: 1,
    how: [{ id: "h1", text: "h" }],
    correctHowId: "h1",
    why: [{ id: "w1", text: "w" }],
    correctWhyId: "w1",
  },
  epilogue: [{ text: "fim" }],
};

/** Progresso em que as duas contradições do `lab` já são cruzáveis. */
export function tudoAberto() {
  return {
    unlockedLeads: new Set(["l1"]),
    foundContradictions: [] as string[],
    wrongPairs: [] as string[],
    readInterviews: new Set(["ana:ana-1", "beto:beto-1"]),
    viewedEvidence: new Set(["ev-recibo", "ev-foto"]),
    hintPoints: 0,
  };
}
