import { describe, expect, it } from "vitest";
import type { Case } from "../data/types";
import {
  emptyProgress,
  heardClaims,
  pairKey,
  seenFacts,
  tryContradiction,
  visibleEvidence,
  visibleInterviews,
  visibleSuspects,
} from "./progress";

/** Caso mínimo de laboratório: 2 suspeitos (1 bloqueado), 2 evidências (1 bloqueada). */
const lab: Case = {
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

describe("visibilidade", () => {
  it("itens revelados por pista começam ocultos", () => {
    const none = new Set<string>();
    expect(visibleSuspects(lab, none).map((s) => s.id)).toEqual(["ana"]);
    expect(visibleEvidence(lab, none).map((e) => e.id)).toEqual(["ev-recibo"]);
    expect(visibleInterviews(lab, lab.suspects[0], none).map((i) => i.id)).toEqual(["ana-1"]);
  });

  it("desbloquear a pista revela suspeito, evidência e entrevista", () => {
    const un = new Set(["l1"]);
    expect(visibleSuspects(lab, un).map((s) => s.id)).toEqual(["ana", "beto"]);
    expect(visibleEvidence(lab, un).map((e) => e.id)).toEqual(["ev-recibo", "ev-foto"]);
    expect(visibleInterviews(lab, lab.suspects[0], un).map((i) => i.id)).toEqual(["ana-1", "ana-2"]);
  });
});

describe("mesa de contradições", () => {
  it("só oferece alegações ouvidas e fatos vistos", () => {
    const p = emptyProgress();
    expect(heardClaims(lab, p)).toEqual([]);
    expect(seenFacts(lab, p)).toEqual([]);
    p.readInterviews.add("ana:ana-1");
    p.viewedEvidence.add("ev-recibo");
    expect(heardClaims(lab, p).map((c) => c.id)).toEqual(["cl-fora"]);
    expect(seenFacts(lab, p).map((f) => f.id)).toEqual(["f-recibo"]);
  });

  it("par correto retorna a contradição e as novas pistas", () => {
    const p = emptyProgress();
    const r = tryContradiction(lab, p, "cl-fora", "f-recibo");
    expect(r.kind).toBe("correct");
    if (r.kind === "correct") {
      expect(r.contradiction.id).toBe("k1");
      expect(r.newLeads.map((l) => l.id)).toEqual(["l1"]);
    }
  });

  it("pista já desbloqueada não volta em newLeads", () => {
    const p = emptyProgress();
    p.unlockedLeads.add("l1");
    const r = tryContradiction(lab, p, "cl-fora", "f-recibo");
    expect(r.kind === "correct" && r.newLeads).toEqual([]);
  });

  it("par errado, repetição de erro e contradição repetida são distinguidos", () => {
    const p = emptyProgress();
    expect(tryContradiction(lab, p, "cl-fora", "f-foto").kind).toBe("wrong");
    p.wrongPairs.push(pairKey("cl-fora", "f-foto"));
    expect(tryContradiction(lab, p, "cl-fora", "f-foto").kind).toBe("repeatWrong");
    p.foundContradictions.push("k1");
    expect(tryContradiction(lab, p, "cl-fora", "f-recibo").kind).toBe("alreadyFound");
  });
});
