/**
 * Acusação final: QUEM, COMO e POR QUÊ — decidida em conjunto e sem volta.
 */
import { useState, type ReactNode } from "react";
import { useGame } from "../store/gameStore";
import { visibleSuspects } from "../store/progress";
import { BigButton, Pill, TopBar } from "../components/ui";

export function AccusationScreen() {
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const accusation = useGame((s) => s.accusation);
  const setAccusation = useGame((s) => s.setAccusation);
  const confirmAccusation = useGame((s) => s.confirmAccusation);
  const passTo = useGame((s) => s.passTo);
  const [confirming, setConfirming] = useState(false);
  if (!c) return null;

  const suspects = visibleSuspects(c, unlockedLeads);
  const complete = accusation.who && accusation.how && accusation.why;

  const optionButton = (selected: boolean, onClick: () => void, content: ReactNode, key: string) => (
    <li key={key}>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`w-full rounded-xl border p-4 text-left transition ${
          selected ? "border-danger bg-danger/15 text-fg" : "border-muted/30 bg-surface text-fg/85"
        }`}
      >
        {content}
      </button>
    </li>
  );

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-40">
      <TopBar title="A Acusação" right={<Pill>🤝 juntos</Pill>} />
      <p className="mb-6 mt-1 text-muted">
        Conversem, decidam e apontem. <strong className="text-danger">Não haverá segunda chance.</strong>
      </p>

      <section>
        <h2 className="font-display text-xl font-semibold text-fg">1 · Quem matou?</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3">
          {suspects.map((s) =>
            optionButton(
              accusation.who === s.id,
              () => setAccusation("who", s.id),
              <span className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {s.portraitEmoji}
                </span>
                <span>
                  <span className="block font-semibold">{s.name}</span>
                  <span className="block text-sm text-muted">{s.role}</span>
                </span>
              </span>,
              s.id
            )
          )}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-fg">2 · Como?</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {c.solution.how.map((o) =>
            optionButton(accusation.how === o.id, () => setAccusation("how", o.id), o.text, o.id)
          )}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-fg">3 · Por quê?</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {c.solution.why.map((o) =>
            optionButton(accusation.why === o.id, () => setAccusation("why", o.id), o.text, o.id)
          )}
        </ul>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl gap-3">
          <BigButton variant="ghost" onClick={() => passTo("board")} className="flex-1">
            ← Voltar à Mesa
          </BigButton>
          <BigButton variant="danger" disabled={!complete} onClick={() => setConfirming(true)} className="flex-1">
            ⚖️ Acusar
          </BigButton>
        </div>
      </footer>

      {confirming && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-6">
          <div className="dossier anim-pop w-full max-w-md p-6 text-center">
            <p className="font-display text-2xl font-semibold">A acusação é definitiva.</p>
            <p className="mt-2 opacity-80">Vocês dois concordam com cada resposta?</p>
            <div className="mt-5 flex gap-3">
              <BigButton variant="ghost" onClick={() => setConfirming(false)} className="flex-1">
                Ainda não
              </BigButton>
              <BigButton variant="danger" onClick={confirmAccusation} className="flex-1">
                Concordamos
              </BigButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
