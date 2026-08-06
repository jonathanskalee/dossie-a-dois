import { describe, expect, it } from "vitest";
import { computeScore, type ScoreInput } from "./scoring";

const base: ScoreInput = {
  foundContradictions: 7,
  totalContradictions: 7,
  wrongAttempts: 0,
  unlockedLeads: 7,
  totalLeads: 7,
  whoCorrect: true,
  howCorrect: true,
  whyCorrect: true,
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
