/**
 * Store central do Dossiê a Dois.
 *
 * Regras da casa (iguais ao Mimica na Régua):
 * - Toda a lógica de jogo vive aqui; componentes só leem estado e disparam ações.
 * - Toda ação valida a tela atual antes de agir (proteção contra toques duplos
 *   e efeitos duplicados do StrictMode).
 * - Tempo sempre via `lib/clock.now()`, nunca `Date.now()`.
 * - Persistência via `saves.ts`/`settings.ts` ao fim de cada ação que muda progresso.
 */
import { create } from "zustand";
import type { Case, Contradiction, Lead } from "../data/types";
import { loadCase } from "../data/cases";
import { now } from "../lib/clock";
import { keepAwake, releaseAwake, setSound, setVibe, sfx, unlockAudio, vibrate } from "../lib/fx";
import { emptyProgress, pairKey, tryContradiction, type Progress } from "./progress";
import { clearSave, loadSave, saveRecord, writeSave, type CaseSave } from "./saves";
import { computeScore, scoreInputFromCase, type ScoreResult } from "./scoring";
import { DEFAULT_SETTINGS, loadSettings, saveSettings, type Settings } from "./settings";

export type ScreenName =
  | "title"
  | "caseSelect"
  | "caseIntro"
  | "handoff"
  | "detective"
  | "perito"
  | "board"
  | "accusation"
  | "epilogue"
  | "result";

export type Role = "detective" | "perito";
export type HandoffTarget = Role | "board";

/** Revelação pendente após uma contradição correta (modal na Mesa). */
export interface Reveal {
  contradiction: Contradiction;
  newLeads: Lead[];
}

export interface GameState extends Progress {
  screen: ScreenName;
  settings: Settings;

  caseId: string | null;
  caseData: Case | null;
  loadingCase: boolean;

  /** Para onde o handoff vai levar ao confirmar. */
  pendingTarget: HandoffTarget | null;

  /** Navegação interna dos papéis. */
  openSuspectId: string | null;
  openInterviewId: string | null;
  openEvidenceId: string | null;

  /** Mesa de contradições. */
  selectedClaim: string | null;
  selectedFact: string | null;
  reveal: Reveal | null;
  /** Feedback de erro na mesa; contador para reiniciar a animação CSS. */
  flashWrong: number;

  accusation: { who?: string; how?: string; why?: string };
  score: ScoreResult | null;

  /** Tempo acumulado de sessões anteriores + início da sessão atual. */
  elapsedMsBase: number;
  sessionStartMs: number;

  /* ---- ações ---- */
  goTitle(): void;
  goCaseSelect(): void;
  openCase(caseId: string): Promise<void>;
  startInvestigation(): void;
  /** Sair da tela de papel/mesa para o handoff. */
  passTo(target: HandoffTarget): void;
  /** Botão "segure para abrir" da tela de handoff. */
  confirmHandoff(): void;

  openSuspect(id: string): void;
  closeSuspect(): void;
  openInterview(id: string): void;
  closeInterview(): void;
  openEvidence(id: string): void;
  closeEvidence(): void;

  selectClaim(id: string | null): void;
  selectFact(id: string | null): void;
  registerContradiction(): void;
  dismissReveal(): void;

  goAccusation(): void;
  setAccusation(part: "who" | "how" | "why", id: string): void;
  confirmAccusation(): void;
  finishEpilogue(): void;
  exitCase(): void;
  abandonCase(): void;

  toggleSound(): void;
  toggleVibe(): void;
  markOnboarded(): void;
}

function elapsedNow(s: Pick<GameState, "elapsedMsBase" | "sessionStartMs">): number {
  return s.elapsedMsBase + Math.max(0, now() - s.sessionStartMs);
}

function persistProgress(get: () => GameState) {
  const s = get();
  if (!s.caseData) return;
  const save: CaseSave = {
    schema: 1,
    caseVersion: s.caseData.version,
    unlockedLeads: [...s.unlockedLeads],
    foundContradictions: s.foundContradictions,
    wrongPairs: s.wrongPairs,
    readInterviews: [...s.readInterviews],
    viewedEvidence: [...s.viewedEvidence],
    accusation: s.accusation,
    elapsedMs: elapsedNow(s),
    savedAtMs: now(),
  };
  writeSave(s.caseData.id, save);
}

const initialSettings = loadSettings();
setSound(initialSettings.soundOn);
setVibe(initialSettings.vibeOn);

export const useGame = create<GameState>((set, get) => ({
  screen: "title",
  settings: initialSettings,

  caseId: null,
  caseData: null,
  loadingCase: false,

  pendingTarget: null,
  openSuspectId: null,
  openInterviewId: null,
  openEvidenceId: null,

  selectedClaim: null,
  selectedFact: null,
  reveal: null,
  flashWrong: 0,

  accusation: {},
  score: null,

  elapsedMsBase: 0,
  sessionStartMs: 0,

  ...emptyProgress(),

  goTitle() {
    releaseAwake();
    set({ screen: "title", caseId: null, caseData: null });
  },

  goCaseSelect() {
    unlockAudio();
    sfx.page();
    releaseAwake();
    set({ screen: "caseSelect", caseId: null, caseData: null });
  },

  async openCase(caseId) {
    const s = get();
    if (s.screen !== "caseSelect" || s.loadingCase) return;
    unlockAudio();
    set({ loadingCase: true });
    let data: Case;
    try {
      data = await loadCase(caseId);
    } catch {
      set({ loadingCase: false });
      return;
    }
    const saved = loadSave(data);
    sfx.stamp();
    vibrate(20);
    set({
      loadingCase: false,
      screen: "caseIntro",
      caseId,
      caseData: data,
      pendingTarget: null,
      openSuspectId: null,
      openInterviewId: null,
      openEvidenceId: null,
      selectedClaim: null,
      selectedFact: null,
      reveal: null,
      accusation: saved?.accusation ?? {},
      score: null,
      elapsedMsBase: saved?.elapsedMs ?? 0,
      sessionStartMs: now(),
      ...(saved
        ? {
            unlockedLeads: saved.unlockedLeads,
            foundContradictions: saved.foundContradictions,
            wrongPairs: saved.wrongPairs,
            readInterviews: saved.readInterviews,
            viewedEvidence: saved.viewedEvidence,
          }
        : emptyProgress()),
    });
  },

  startInvestigation() {
    const s = get();
    if (s.screen !== "caseIntro") return;
    sfx.stamp();
    vibrate(30);
    keepAwake();
    set({ screen: "handoff", pendingTarget: "detective" });
    persistProgress(get);
  },

  passTo(target) {
    const s = get();
    const from: ScreenName[] = ["detective", "perito", "board", "accusation"];
    if (!from.includes(s.screen)) return;
    sfx.pass();
    vibrate(15);
    set({
      screen: "handoff",
      pendingTarget: target,
      openSuspectId: null,
      openInterviewId: null,
      openEvidenceId: null,
    });
    persistProgress(get);
  },

  confirmHandoff() {
    const s = get();
    if (s.screen !== "handoff" || !s.pendingTarget) return;
    sfx.stamp();
    vibrate(20);
    set({ screen: s.pendingTarget === "board" ? "board" : s.pendingTarget, pendingTarget: null });
  },

  openSuspect(id) {
    const s = get();
    if (s.screen !== "detective") return;
    sfx.page();
    set({ openSuspectId: id, openInterviewId: null });
  },

  closeSuspect() {
    if (get().screen !== "detective") return;
    sfx.page();
    set({ openSuspectId: null, openInterviewId: null });
  },

  openInterview(id) {
    const s = get();
    if (s.screen !== "detective" || !s.openSuspectId) return;
    sfx.page();
    const key = `${s.openSuspectId}:${id}`;
    const read = new Set(s.readInterviews);
    read.add(key);
    set({ openInterviewId: id, readInterviews: read });
    persistProgress(get);
  },

  closeInterview() {
    if (get().screen !== "detective") return;
    sfx.page();
    set({ openInterviewId: null });
  },

  openEvidence(id) {
    const s = get();
    if (s.screen !== "perito") return;
    sfx.page();
    const seen = new Set(s.viewedEvidence);
    seen.add(id);
    set({ openEvidenceId: id, viewedEvidence: seen });
    persistProgress(get);
  },

  closeEvidence() {
    if (get().screen !== "perito") return;
    sfx.page();
    set({ openEvidenceId: null });
  },

  selectClaim(id) {
    if (get().screen !== "board") return;
    set({ selectedClaim: id });
  },

  selectFact(id) {
    if (get().screen !== "board") return;
    set({ selectedFact: id });
  },

  registerContradiction() {
    const s = get();
    if (s.screen !== "board" || s.reveal) return;
    const { caseData, selectedClaim, selectedFact } = s;
    if (!caseData || !selectedClaim || !selectedFact) return;

    const result = tryContradiction(caseData, s, selectedClaim, selectedFact);

    if (result.kind === "correct") {
      sfx.reveal();
      vibrate([30, 40, 60]);
      const unlocked = new Set(s.unlockedLeads);
      for (const l of result.newLeads) unlocked.add(l.id);
      set({
        foundContradictions: [...s.foundContradictions, result.contradiction.id],
        unlockedLeads: unlocked,
        reveal: { contradiction: result.contradiction, newLeads: result.newLeads },
        selectedClaim: null,
        selectedFact: null,
      });
      persistProgress(get);
      return;
    }

    if (result.kind === "wrong") {
      sfx.buzzer();
      vibrate([60, 40, 60]);
      set({
        wrongPairs: [...s.wrongPairs, pairKey(selectedClaim, selectedFact)],
        flashWrong: s.flashWrong + 1,
        selectedClaim: null,
        selectedFact: null,
      });
      persistProgress(get);
      return;
    }

    // repetiu par errado ou contradição já encontrada: feedback sem nova punição
    sfx.buzzer();
    vibrate(40);
    set({ flashWrong: s.flashWrong + 1, selectedClaim: null, selectedFact: null });
  },

  dismissReveal() {
    const s = get();
    if (s.screen !== "board" || !s.reveal) return;
    if (s.reveal.newLeads.length > 0) sfx.unlock();
    set({ reveal: null });
  },

  goAccusation() {
    const s = get();
    if (s.screen !== "board" || s.reveal) return;
    if (!s.caseData) return;
    if (s.foundContradictions.length < s.caseData.solution.minContradictions) return;
    sfx.stamp();
    vibrate(30);
    set({ screen: "accusation" });
    persistProgress(get);
  },

  setAccusation(part, id) {
    const s = get();
    if (s.screen !== "accusation") return;
    sfx.page();
    set({ accusation: { ...s.accusation, [part]: id } });
    persistProgress(get);
  },

  confirmAccusation() {
    const s = get();
    if (s.screen !== "accusation" || !s.caseData) return;
    const { who, how, why } = s.accusation;
    if (!who || !how || !why) return;

    const score = computeScore(scoreInputFromCase(s.caseData, s, s.accusation));
    sfx.stamp();
    vibrate([40, 60, 80]);
    saveRecord(s.caseData.id, {
      stars: score.stars,
      score: score.total,
      bestTimeMs: elapsedNow(s),
    });
    clearSave(s.caseData.id);
    set({ screen: "epilogue", score });
  },

  finishEpilogue() {
    const s = get();
    if (s.screen !== "epilogue") return;
    sfx.fanfare();
    vibrate([30, 50, 30, 50, 100]);
    set({ screen: "result" });
  },

  exitCase() {
    const s = get();
    if (s.screen !== "result") return;
    releaseAwake();
    set({ screen: "caseSelect", caseId: null, caseData: null, score: null });
  },

  /** Sair no meio do caso (progresso já está salvo a cada ação). */
  abandonCase() {
    const s = get();
    if (!s.caseData) return;
    persistProgress(get);
    releaseAwake();
    set({ screen: "caseSelect", caseId: null, caseData: null });
  },

  toggleSound() {
    const s = get();
    const settings = { ...s.settings, soundOn: !s.settings.soundOn };
    setSound(settings.soundOn);
    saveSettings(settings);
    set({ settings });
  },

  toggleVibe() {
    const s = get();
    const settings = { ...s.settings, vibeOn: !s.settings.vibeOn };
    setVibe(settings.vibeOn);
    saveSettings(settings);
    set({ settings });
  },

  markOnboarded() {
    const s = get();
    if (s.settings.onboarded) return;
    const settings = { ...s.settings, onboarded: true };
    saveSettings(settings);
    set({ settings });
  },
}));

export { DEFAULT_SETTINGS };
