/**
 * Registro de casos.
 *
 * Os resumos são carregados sempre (tela de seleção); o caso inteiro só via
 * `loadCase`, com import dinâmico — cada caso é prosa longa e vira um chunk
 * próprio no build.
 *
 * Caso novo: criar o arquivo em `cases/`, adicionar o resumo e o loader aqui.
 * Os testes de integridade passam a cobri-lo automaticamente.
 */
import type { Case, CaseSummary } from "../types";

export const CASE_SUMMARIES: CaseSummary[] = [
  {
    id: "caso01-noir",
    title: "O Último Brinde",
    tagline: "Uma boate enfumaçada, um copo envenenado e todo mundo mentindo.",
    theme: "noir",
    difficulty: 2,
    estimatedMinutes: 40,
    cover: "/art/caso01Noir/helena.webp",
  },
  {
    id: "caso02-cozy",
    title: "Morte no Bazar da Primavera",
    tagline: "Na vila onde todos se conhecem, alguém conhecia a vítima bem demais.",
    theme: "cozy",
    difficulty: 1,
    estimatedMinutes: 35,
  },
  {
    id: "caso03-tech",
    title: "Protocolo Fantasma",
    tagline: "Um servidor apagado, um álibi digital perfeito — perfeito até demais.",
    theme: "tech",
    difficulty: 3,
    estimatedMinutes: 45,
  },
  {
    id: "caso04-occult",
    title: "A Vigília da Casa Bragança",
    tagline: "Dizem que foi o fantasma. Fantasmas não deixam pegadas de lama.",
    theme: "occult",
    difficulty: 2,
    estimatedMinutes: 40,
  },
  {
    id: "caso05-folia",
    title: "Ensaio Geral",
    tagline: "A bateria não parou a noite toda. Foi o que todo mundo jurou.",
    theme: "folia",
    difficulty: 3,
    estimatedMinutes: 45,
  },
];

const LOADERS: Record<string, () => Promise<{ default: Case }>> = {
  "caso01-noir": () => import("./caso01Noir"),
  "caso02-cozy": () => import("./caso02Cozy"),
  "caso03-tech": () => import("./caso03Tech"),
  "caso04-occult": () => import("./caso04Occult"),
  "caso05-folia": () => import("./caso05Folia"),
};

export async function loadCase(id: string): Promise<Case> {
  const loader = LOADERS[id];
  if (!loader) throw new Error(`caso desconhecido: ${id}`);
  return (await loader()).default;
}

/** Para os testes de integridade, que precisam de todos os casos de uma vez. */
export async function loadAllCases(): Promise<Case[]> {
  return Promise.all(Object.keys(LOADERS).map((id) => loadCase(id)));
}
