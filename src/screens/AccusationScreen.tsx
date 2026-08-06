/**
 * Acusação final: QUEM, COMO e POR QUÊ — decidida em conjunto e sem volta.
 *
 * A numeração das três seções não é enfeite: é a ordem em que a dupla
 * precisa fechar a história, e cada resposta vale ponto separado.
 */
import { useState, type ReactNode } from "react";
import { useGame } from "../store/gameStore";
import { visibleSuspects } from "../store/progress";
import { BigButton, Pill, TopBar } from "../components/ui";
import { Portrait } from "../components/Portrait";
import { IconBalanca, IconMesa } from "../components/icons";

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
        className={`w-full rounded-xl border p-4 text-left leading-snug transition ${
          selected
            ? "border-danger bg-danger/15 text-fg shadow-[0_0_0_3px] shadow-danger/20"
            : "border-muted/30 bg-surface text-fg/85 active:bg-danger/5"
        }`}
      >
        {content}
      </button>
    </li>
  );

  const heading = (n: number, text: string, answered: boolean) => (
    <h2 className="flex items-center gap-3 font-display text-xl text-fg">
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-sm ${
          answered ? "border-danger bg-danger/20 text-danger" : "border-muted/40 text-muted"
        }`}
      >
        {n}
      </span>
      {text}
    </h2>
  );

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-40">
      <TopBar
        title="A Acusação"
        right={
          <Pill>
            <IconMesa /> juntos
          </Pill>
        }
      />
      <p className="mb-7 mt-1 leading-relaxed text-muted">
        Conversem, decidam e apontem. <strong className="text-danger">Não haverá segunda chance.</strong>
      </p>

      <section>
        {heading(1, "Quem matou?", Boolean(accusation.who))}
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {suspects.map((s) =>
            optionButton(
              accusation.who === s.id,
              () => setAccusation("who", s.id),
              <span className="flex items-center gap-3">
                <Portrait suspect={s} />
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{s.name}</span>
                  <span className="block truncate text-sm text-muted">{s.role}</span>
                </span>
              </span>,
              s.id
            )
          )}
        </ul>
      </section>

      <section className="mt-9">
        {heading(2, "Como?", Boolean(accusation.how))}
        <ul className="mt-3 flex flex-col gap-3">
          {c.solution.how.map((o) =>
            optionButton(accusation.how === o.id, () => setAccusation("how", o.id), o.text, o.id)
          )}
        </ul>
      </section>

      <section className="mt-9">
        {heading(3, "Por quê?", Boolean(accusation.why))}
        <ul className="mt-3 flex flex-col gap-3">
          {c.solution.why.map((o) =>
            optionButton(accusation.why === o.id, () => setAccusation("why", o.id), o.text, o.id)
          )}
        </ul>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl gap-3">
          <BigButton variant="ghost" onClick={() => passTo("board")} className="flex-1">
            Voltar à Mesa
          </BigButton>
          <BigButton variant="danger" disabled={!complete} onClick={() => setConfirming(true)} className="flex-1">
            <span className="inline-flex items-center gap-2">
              <IconBalanca /> Acusar
            </span>
          </BigButton>
        </div>
      </footer>

      {confirming && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 p-6">
          <div className="dossier anim-pop w-full max-w-md p-7 text-center">
            <span className="stamp anim-stamp-flat text-danger">Definitivo</span>
            <p className="mt-5 font-display text-2xl leading-tight">A acusação não tem volta.</p>
            <p className="mt-2 leading-relaxed opacity-80">Vocês dois concordam com cada resposta?</p>
            <div className="mt-6 flex gap-3">
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
