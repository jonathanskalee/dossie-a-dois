import { beforeEach, describe, expect, it } from "vitest";
import { store } from "../lib/fx";
import type { Case } from "../data/types";
import { clearSave, loadRecords, loadSave, peekSave, saveKey, saveRecord, writeSave, type CaseSave } from "./saves";

const c: Case = {
  id: "t1",
  version: 3,
  title: "T",
  tagline: "t",
  theme: "noir",
  difficulty: 1,
  estimatedMinutes: 20,
  briefing: { shared: "s", detective: "d", perito: "p" },
  suspects: [
    {
      id: "sus",
      name: "S",
      role: "r",
      portraitEmoji: "🧪",
      description: "d",
      interviews: [
        {
          id: "i1",
          question: "q",
          answer: [{ text: "a", ref: "cl1" }],
          claims: [{ id: "cl1", summary: "s" }],
        },
      ],
    },
  ],
  evidence: [
    {
      id: "ev1",
      name: "E",
      kind: "laudo",
      body: [{ text: "b", ref: "f1" }],
      facts: [{ id: "f1", summary: "f" }],
    },
  ],
  contradictions: [{ id: "k1", claimId: "cl1", factId: "f1", explanation: "e", unlocks: ["l1"] }],
  leads: [{ id: "l1", title: "L", narration: "n", reveals: [{ type: "evidence", id: "ev1" }] }],
  solution: {
    culpritId: "sus",
    minContradictions: 1,
    how: [{ id: "h1", text: "h" }],
    correctHowId: "h1",
    why: [{ id: "w1", text: "w" }],
    correctWhyId: "w1",
  },
  epilogue: [{ text: "fim" }],
};

const validSave: CaseSave = {
  schema: 1,
  caseVersion: 3,
  unlockedLeads: ["l1"],
  foundContradictions: ["k1"],
  wrongPairs: ["cl1|f1"],
  readInterviews: ["sus:i1"],
  viewedEvidence: ["ev1"],
  accusation: { who: "sus", how: "h1", why: "w1" },
  elapsedMs: 60000,
  savedAtMs: 123,
};

beforeEach(() => {
  clearSave(c.id);
  store.remove("dossie_records");
});

describe("loadSave", () => {
  it("ida e volta preserva o progresso", () => {
    writeSave(c.id, validSave);
    const s = loadSave(c)!;
    expect([...s.unlockedLeads]).toEqual(["l1"]);
    expect(s.foundContradictions).toEqual(["k1"]);
    expect(s.wrongPairs).toEqual(["cl1|f1"]);
    expect([...s.readInterviews]).toEqual(["sus:i1"]);
    expect([...s.viewedEvidence]).toEqual(["ev1"]);
    expect(s.accusation).toEqual({ who: "sus", how: "h1", why: "w1" });
    expect(s.elapsedMs).toBe(60000);
  });

  it("save gravado antes das dicas carrega com hintPoints zerado", () => {
    // Save antigo de verdade: a chave nem existe no JSON.
    const { ...antigo } = validSave;
    delete (antigo as Record<string, unknown>).hintPoints;
    writeSave(c.id, antigo as CaseSave);
    expect(loadSave(c)!.hintPoints).toBe(0);
  });

  it("hintPoints faz ida e volta", () => {
    writeSave(c.id, { ...validSave, hintPoints: 7 });
    expect(loadSave(c)!.hintPoints).toBe(7);
  });

  it("hintPoints inválido cai para zero em vez de contaminar a nota", () => {
    for (const lixo of [-5, NaN, "muitos", null]) {
      writeSave(c.id, { ...validSave, hintPoints: lixo as never });
      expect(loadSave(c)!.hintPoints).toBe(0);
    }
  });

  it("descarta save de versão antiga do caso", () => {
    writeSave(c.id, { ...validSave, caseVersion: 2 });
    expect(loadSave(c)).toBeNull();
  });

  it("JSON corrompido vira null, não exceção", () => {
    store.set(saveKey(c.id), "{corrompido");
    expect(loadSave(c)).toBeNull();
  });

  it("ids desconhecidos são filtrados campo a campo", () => {
    writeSave(c.id, {
      ...validSave,
      unlockedLeads: ["l1", "fantasma"],
      foundContradictions: ["nada"],
      viewedEvidence: ["ev1", "ev9"],
      accusation: { who: "outro", how: "h1", why: "w1" },
    });
    const s = loadSave(c)!;
    expect([...s.unlockedLeads]).toEqual(["l1"]);
    expect(s.foundContradictions).toEqual([]);
    expect([...s.viewedEvidence]).toEqual(["ev1"]);
    expect(s.accusation.who).toBeUndefined();
    expect(s.accusation.how).toBe("h1");
  });

  it("peekSave lê metadados sem o caso", () => {
    writeSave(c.id, validSave);
    expect(peekSave(c.id)).toEqual({ elapsedMs: 60000, savedAtMs: 123 });
    expect(peekSave("inexistente")).toBeNull();
  });
});

describe("records", () => {
  it("guarda o melhor resultado", () => {
    saveRecord("t1", { stars: 3, score: 60, bestTimeMs: 100 });
    saveRecord("t1", { stars: 5, score: 90, bestTimeMs: 200 });
    saveRecord("t1", { stars: 2, score: 40, bestTimeMs: 50 });
    expect(loadRecords()["t1"]).toEqual({ stars: 5, score: 90, bestTimeMs: 200 });
  });

  it("empate de score fica com o menor tempo", () => {
    saveRecord("t1", { stars: 5, score: 90, bestTimeMs: 200 });
    saveRecord("t1", { stars: 5, score: 90, bestTimeMs: 150 });
    expect(loadRecords()["t1"].bestTimeMs).toBe(150);
  });

  it("registro corrompido volta vazio", () => {
    store.set("dossie_records", "nope{");
    expect(loadRecords()).toEqual({});
  });
});
