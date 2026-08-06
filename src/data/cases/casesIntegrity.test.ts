/**
 * Integridade de TODOS os casos registrados.
 *
 * Caso novo entra no registro → entra automaticamente aqui. Estes testes são a
 * ferramenta de autoria: escreveu caso, rodou `npm test`, corrigiu o que caiu.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadAllCases, CASE_SUMMARIES } from "./index";
import { validateCase } from "../validateCase";
import { solveCase } from "../solveCase";

const cases = await loadAllCases();

describe("registro", () => {
  it("todo resumo tem caso carregável e consistente", () => {
    expect(cases.length).toBe(CASE_SUMMARIES.length);
    for (const s of CASE_SUMMARIES) {
      const c = cases.find((x) => x.id === s.id);
      expect(c, `resumo sem caso: ${s.id}`).toBeTruthy();
      expect(c!.title).toBe(s.title);
      expect(c!.theme).toBe(s.theme);
      expect(c!.difficulty).toBe(s.difficulty);
      expect(c!.estimatedMinutes).toBe(s.estimatedMinutes);
    }
  });
});

describe.each(cases.map((c) => [c.id, c] as const))("caso %s", (_id, c) => {
  it("passa na validação referencial", () => {
    expect(validateCase(c)).toEqual([]);
  });

  it("é solucionável, sem pistas mortas nem conteúdo órfão", () => {
    const r = solveCase(c);
    expect(r.unreachableContradictions, "contradições inalcançáveis").toEqual([]);
    expect(r.deadLeads, "pistas que nunca disparam").toEqual([]);
    expect(r.orphanSuspects, "suspeitos que nunca aparecem").toEqual([]);
    expect(r.orphanInterviews, "entrevistas que nunca aparecem").toEqual([]);
    expect(r.orphanEvidence, "evidências que nunca aparecem").toEqual([]);
    expect(r.solvable).toBe(true);
  });

  it("a acusação é liberável e as opções corretas existem", () => {
    expect(c.solution.minContradictions).toBeGreaterThanOrEqual(1);
    expect(c.solution.minContradictions).toBeLessThanOrEqual(c.contradictions.length);
    expect(c.suspects.some((s) => s.id === c.solution.culpritId)).toBe(true);
  });

  // Um caminho errado em `portrait` não quebra nada em runtime: só some a
  // arte. Aqui ele quebra o teste, com o id do suspeito.
  it("todo retrato ilustrado existe em public/", () => {
    const faltando = c.suspects
      .filter((s) => s.portrait && !existsSync(join(process.cwd(), "public", s.portrait)))
      .map((s) => `${s.id} → ${s.portrait}`);
    expect(faltando, "retratos ausentes").toEqual([]);
  });
});
