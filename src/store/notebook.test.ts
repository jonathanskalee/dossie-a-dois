import { describe, expect, it } from "vitest";
import type { Case } from "../data/types";
import { lab, tudoAberto } from "./__fixtures__/labCase";
import { emptyProgress } from "./progress";
import { buildNotebook } from "./notebook";

describe("caderno do caso", () => {
  it("começa vazio", () => {
    const n = buildNotebook(lab, emptyProgress());
    expect(n.entries).toEqual([]);
    expect(n.deadEnds).toEqual([]);
    expect(n.counts).toMatchObject({ found: 0, total: 2, leads: 0, totalLeads: 1 });
  });

  it("segue a ordem em que a dupla descobriu, não a do arquivo", () => {
    const p = tudoAberto();
    p.foundContradictions = ["k2", "k1"];
    expect(buildNotebook(lab, p).entries.map((e) => e.contradictionId)).toEqual(["k2", "k1"]);
  });

  it("resolve os nomes de quem falou e de qual prova", () => {
    const p = tudoAberto();
    p.foundContradictions = ["k1"];
    const e = buildNotebook(lab, p).entries[0];
    expect(e).toMatchObject({
      suspectName: "Ana",
      claimSummary: "Ana: fora da cidade",
      evidenceName: "Recibo",
      factSummary: "Recibo na cidade",
      explanation: "Ana estava na cidade.",
    });
    expect(e.leads.map((l) => l.id)).toEqual(["l1"]);
  });

  it("não lista pista que a contradição abre mas que ainda não foi desbloqueada", () => {
    const p = emptyProgress();
    p.foundContradictions = ["k1"];
    expect(buildNotebook(lab, p).entries[0].leads).toEqual([]);
  });

  it("não repete a mesma pista em duas contradições", () => {
    const duasAbremAMesma: Case = {
      ...lab,
      contradictions: [
        lab.contradictions[0],
        { ...lab.contradictions[1], unlocks: ["l1"] },
      ],
    };
    const p = tudoAberto();
    p.foundContradictions = ["k1", "k2"];
    const n = buildNotebook(duasAbremAMesma, p);
    expect(n.entries[0].leads.map((l) => l.id)).toEqual(["l1"]);
    expect(n.entries[1].leads).toEqual([]);
    expect(n.counts.leads).toBe(1);
  });

  it("pista aberta sem contradição-mãe vai para 'outras pistas'", () => {
    const p = emptyProgress();
    p.unlockedLeads.add("l1");
    const n = buildNotebook(lab, p);
    expect(n.entries).toEqual([]);
    expect(n.orphanLeads.map((l) => l.id)).toEqual(["l1"]);
  });

  it("pares errados viram texto legível; ids mortos são descartados", () => {
    const p = tudoAberto();
    p.wrongPairs = ["cl-fora|f-foto", "nao-existe|f-foto"];
    const n = buildNotebook(lab, p);
    expect(n.deadEnds).toEqual([
      {
        claimSummary: "Ana: fora da cidade",
        suspectName: "Ana",
        factSummary: "Beto na cena",
        evidenceName: "Foto",
      },
    ]);
    expect(n.counts.deadEnds).toBe(1);
  });

  it("contradição de outra versão do caso não estoura", () => {
    const p = emptyProgress();
    p.foundContradictions = ["contradicao-que-sumiu"];
    expect(buildNotebook(lab, p).entries).toEqual([]);
  });
});
