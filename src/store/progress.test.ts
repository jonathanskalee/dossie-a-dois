import { describe, expect, it } from "vitest";
import { lab } from "./__fixtures__/labCase";
import {
  claimIndex,
  emptyProgress,
  factIndex,
  heardClaims,
  pairKey,
  seenFacts,
  tryContradiction,
  visibleEvidence,
  visibleInterviews,
  visibleSuspects,
} from "./progress";

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

describe("índices de alegações e fatos", () => {
  it("resolvem dono, nome e resumo mesmo do que ainda não foi lido", () => {
    const fala = claimIndex(lab).get("cl-nada");
    expect(fala).toMatchObject({
      suspectId: "beto",
      suspectName: "Beto",
      interviewId: "beto-1",
      summary: "Beto: não viu nada",
    });

    const fato = factIndex(lab).get("f-foto");
    expect(fato).toMatchObject({ evidenceId: "ev-foto", evidenceName: "Foto", summary: "Beto na cena" });
  });

  it("cobrem o caso inteiro, inclusive itens bloqueados", () => {
    expect([...claimIndex(lab).keys()].sort()).toEqual(["cl-conf", "cl-fora", "cl-nada"]);
    expect([...factIndex(lab).keys()].sort()).toEqual(["f-foto", "f-recibo"]);
  });
});
