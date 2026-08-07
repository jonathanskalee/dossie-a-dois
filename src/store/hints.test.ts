import { describe, expect, it } from "vitest";
import { lab, tudoAberto } from "./__fixtures__/labCase";
import { emptyProgress, type Progress } from "./progress";
import { HINT_COST, hintFor, reachableContradictions } from "./hints";

/** Progresso em que só a contradição k1 é cruzável. */
function k1Cruzavel(): Progress {
  const p = emptyProgress();
  p.readInterviews.add("ana:ana-1");
  p.viewedEvidence.add("ev-recibo");
  return p;
}

describe("nada a cruzar", () => {
  it("sem nada lido nem visto, pede os dois lados", () => {
    const h = hintFor(lab, emptyProgress(), 0);
    expect(h).toMatchObject({ kind: "none", reason: "bothSides" });
  });

  it("com a fala ouvida e sem a prova, manda o Perito à bancada", () => {
    const p = emptyProgress();
    p.readInterviews.add("ana:ana-1");
    expect(hintFor(lab, p, 0)).toMatchObject({ kind: "none", reason: "examineEvidence" });
  });

  it("com a prova vista e sem a fala, manda o Detetive interrogar", () => {
    const p = emptyProgress();
    p.viewedEvidence.add("ev-recibo");
    expect(hintFor(lab, p, 0)).toMatchObject({ kind: "none", reason: "askSuspects" });
  });

  it("com tudo encontrado, manda acusar", () => {
    const p = tudoAberto();
    p.foundContradictions = ["k1", "k2"];
    expect(hintFor(lab, p, 0)).toMatchObject({ kind: "none", reason: "allFound" });
  });
});

describe("escada de dicas", () => {
  it("no nível 0 só oferece, e anuncia o preço do primeiro degrau", () => {
    const h = hintFor(lab, k1Cruzavel(), 0);
    expect(h).toMatchObject({ kind: "ready", nextLevel: 1, nextCost: HINT_COST[1] });
  });

  it("nível 1 dá o suspeito e mais nada", () => {
    const h = hintFor(lab, k1Cruzavel(), 1);
    expect(h.kind).toBe("hint");
    if (h.kind !== "hint") return;
    expect(h.suspectName).toBe("Ana");
    expect(h.evidenceName).toBeNull();
    expect(h.claimId).toBeNull();
    expect(h.factId).toBeNull();
    expect(h.nextCost).toBe(HINT_COST[2]);
  });

  it("nível 2 acrescenta a prova, mas ainda não o par", () => {
    const h = hintFor(lab, k1Cruzavel(), 2);
    expect(h.kind).toBe("hint");
    if (h.kind !== "hint") return;
    expect(h.evidenceName).toBe("Recibo");
    expect(h.claimId).toBeNull();
    expect(h.factId).toBeNull();
  });

  it("nível 3 entrega o par e encerra a escada", () => {
    const h = hintFor(lab, k1Cruzavel(), 3);
    expect(h.kind).toBe("hint");
    if (h.kind !== "hint") return;
    expect(h.claimId).toBe("cl-fora");
    expect(h.factId).toBe("f-recibo");
    expect(h.nextLevel).toBeNull();
    expect(h.nextCost).toBeNull();
  });
});

describe("escolha do alvo", () => {
  it("ignora contradições já encontradas", () => {
    const p = tudoAberto();
    p.foundContradictions = ["k1"];
    expect(reachableContradictions(lab, p).map((k) => k.id)).toEqual(["k2"]);
  });

  it("é determinística: segue a ordem do arquivo do caso", () => {
    const p = tudoAberto();
    expect(reachableContradictions(lab, p).map((k) => k.id)).toEqual(["k1", "k2"]);
    const a = hintFor(lab, p, 1);
    const b = hintFor(lab, p, 1);
    expect(a.kind === "hint" && a.contradictionId).toBe("k1");
    expect(b.kind === "hint" && b.contradictionId).toBe("k1");
  });

  it("respeita o alvo fixado, para a escada não trocar de assunto no meio", () => {
    const p = tudoAberto();
    const h = hintFor(lab, p, 2, "k2");
    expect(h.kind === "hint" && h.contradictionId).toBe("k2");
    expect(h.kind === "hint" && h.evidenceName).toBe("Foto");
  });

  it("alvo fixado que já não serve cai de volta na ordem do arquivo", () => {
    const p = tudoAberto();
    p.foundContradictions = ["k2"];
    const h = hintFor(lab, p, 1, "k2");
    expect(h.kind === "hint" && h.contradictionId).toBe("k1");
  });
});
