import { describe, expect, it } from "vitest";
import { computeScore, HINT_PENALTY_CAP, type ScoreInput } from "./scoring";

const base: ScoreInput = {
  foundContradictions: 7,
  totalContradictions: 7,
  wrongAttempts: 0,
  unlockedLeads: 7,
  totalLeads: 7,
  whoCorrect: true,
  howCorrect: true,
  whyCorrect: true,
  hintPoints: 0,
};

describe("computeScore", () => {
  it("caso perfeito dá 100 e 5 estrelas", () => {
    const r = computeScore(base);
    expect(r.total).toBe(100);
    expect(r.stars).toBe(5);
    expect(r.label).toBe("Dupla Lendária");
  });

  it("cada erro custa 4 pontos", () => {
    const r = computeScore({ ...base, wrongAttempts: 3 });
    expect(r.total).toBe(88);
    expect(r.parts.penalty).toBe(12);
  });

  it("acusação errada pesa mas não zera", () => {
    const r = computeScore({ ...base, whoCorrect: false, howCorrect: false, whyCorrect: false });
    expect(r.total).toBe(60);
    expect(r.stars).toBe(3);
  });

  it("nunca fica negativo", () => {
    const r = computeScore({
      foundContradictions: 0,
      totalContradictions: 7,
      wrongAttempts: 50,
      unlockedLeads: 0,
      totalLeads: 7,
      whoCorrect: false,
      howCorrect: false,
      whyCorrect: false,
      hintPoints: 0,
    });
    expect(r.total).toBe(0);
    expect(r.stars).toBe(1);
  });

  it("limiares de estrelas", () => {
    // contradições 50 × 5/7 ≈ 36 + quem 20 + capricho 10 × 3/7 ≈ 4 = 60 → 3★
    const r = computeScore({
      ...base,
      foundContradictions: 5,
      unlockedLeads: 3,
      howCorrect: false,
      whyCorrect: false,
    });
    expect(r.total).toBe(60);
    expect(r.stars).toBe(3);
  });
});

describe("penalidade por dicas", () => {
  it("a escada completa de uma contradição custa 6 pontos", () => {
    const r = computeScore({ ...base, hintPoints: 6 });
    expect(r.parts.hints).toBe(6);
    expect(r.total).toBe(94);
    expect(r.stars).toBe(5);
  });

  it("o teto garante que dica custa no máximo uma estrela", () => {
    const r = computeScore({ ...base, hintPoints: 99 });
    expect(r.parts.hints).toBe(HINT_PENALTY_CAP);
    expect(r.total).toBe(100 - HINT_PENALTY_CAP);
    expect(r.stars).toBe(4);
  });

  it("fica separada dos palpites errados no boletim", () => {
    const r = computeScore({ ...base, wrongAttempts: 2, hintPoints: 3 });
    expect(r.parts.penalty).toBe(8);
    expect(r.parts.hints).toBe(3);
    expect(r.total).toBe(89);
  });

  it("não empurra o total para baixo de zero", () => {
    const r = computeScore({ ...base, wrongAttempts: 50, hintPoints: 99 });
    expect(r.total).toBe(0);
    expect(r.parts.hints).toBe(0); // os palpites já zeraram o que havia
  });

  it("sem dica pedida, os números batem com os de antes da feature", () => {
    expect(computeScore(base).total).toBe(100);
    expect(computeScore({ ...base, wrongAttempts: 3 }).total).toBe(88);
    expect(computeScore(base).parts.hints).toBe(0);
  });
});
