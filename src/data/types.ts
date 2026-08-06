/**
 * Esquema de um caso do Dossiê a Dois.
 *
 * Um caso é dado puro: nada aqui tem lógica. A integridade (todas as
 * referências existem, o caso é solucionável) é garantida por
 * `validateCase.ts` + `solveCase.ts`, rodados sobre todos os casos em
 * `cases/casesIntegrity.test.ts`.
 *
 * Regra de bloqueio: qualquer suspeito/entrevista/evidência que apareça no
 * `reveals` de alguma pista (Lead) começa BLOQUEADO; todo o resto está
 * disponível desde o início do caso.
 */

export type ThemeId = "noir" | "cozy" | "tech" | "occult";

export type SuspectId = string;
export type InterviewId = string;
export type EvidenceId = string;
export type ClaimId = string;
export type FactId = string;
export type LeadId = string;
export type ContradictionId = string;

/**
 * Texto com trechos selecionáveis embutidos na prosa.
 * Um segmento com `ref` vira um destaque tocável (alegação ou fato).
 */
export interface Segment {
  text: string;
  ref?: ClaimId | FactId;
}

/** Resumo curto exibido na Mesa de Contradições. */
export interface Claim {
  id: ClaimId;
  summary: string;
}

export interface Fact {
  id: FactId;
  summary: string;
}

export interface Interview {
  id: InterviewId;
  /** Pergunta que o Detetive escolhe fazer. */
  question: string;
  /** Depoimento; segmentos com ref=ClaimId aparecem destacados. */
  answer: Segment[];
  /** Toda ClaimId referenciada em `answer` precisa estar aqui. */
  claims: Claim[];
}

export interface Suspect {
  id: SuspectId;
  name: string;
  /** Papel na história: "a governanta", "o sócio". */
  role: string;
  /** Retrato v1: emoji em moldura temática. */
  portraitEmoji: string;
  description: string;
  interviews: Interview[];
}

export type EvidenceKind = "documento" | "foto" | "laudo" | "objeto" | "digital";

export interface Evidence {
  id: EvidenceId;
  name: string;
  kind: EvidenceKind;
  /** Corpo do laudo; segmentos com ref=FactId aparecem destacados. */
  body: Segment[];
  facts: Fact[];
}

export interface Contradiction {
  id: ContradictionId;
  /** O par correto. */
  claimId: ClaimId;
  factId: FactId;
  /** Revelação narrada quando o par é encontrado. */
  explanation: string;
  unlocks: LeadId[];
}

export type LeadReveal =
  | { type: "suspect"; id: SuspectId }
  | { type: "interview"; suspectId: SuspectId; interviewId: InterviewId }
  | { type: "evidence"; id: EvidenceId };

/** Nó do grafo de desbloqueio. */
export interface Lead {
  id: LeadId;
  /** "Registro de chamadas da vítima" */
  title: string;
  /** Texto de sabor exibido no desbloqueio. */
  narration: string;
  reveals: LeadReveal[];
}

export interface AccusationOption {
  id: string;
  text: string;
}

export interface Solution {
  culpritId: SuspectId;
  how: AccusationOption[];
  correctHowId: string;
  why: AccusationOption[];
  correctWhyId: string;
  /** Mínimo de contradições encontradas para liberar a acusação. */
  minContradictions: number;
}

export interface EpilogueBlock {
  heading?: string;
  text: string;
}

export interface Case {
  id: string;
  /** Aumentar invalida saves antigos deste caso. */
  version: number;
  title: string;
  tagline: string;
  theme: ThemeId;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  briefing: {
    /** Lido em voz alta pelos dois. */
    shared: string;
    /** Instruções privadas de cada papel. */
    detective: string;
    perito: string;
  };
  suspects: Suspect[];
  evidence: Evidence[];
  contradictions: Contradiction[];
  leads: Lead[];
  solution: Solution;
  epilogue: EpilogueBlock[];
}

/** Metadados exibidos na seleção de casos (carregados sem o caso inteiro). */
export interface CaseSummary {
  id: string;
  title: string;
  tagline: string;
  theme: ThemeId;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
}
