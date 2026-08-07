/**
 * A Mesa de Contradições — território comum do casal.
 *
 * De um lado, tudo que o Detetive OUVIU; do outro, tudo que o Perito VIU.
 * Escolher um de cada e registrar. O jogo não mostra de antemão quais pares
 * existem: a dedução acontece na conversa, a tela só confere.
 *
 * O rodapé mostra o par montado (fala × prova) antes de registrar — é o
 * resumo do que o casal está prestes a afirmar em voz alta.
 */
import { useGame } from "../store/gameStore";
import { heardClaims, seenFacts } from "../store/progress";
import { hintFor } from "../store/hints";
import { BigButton, Meter, TopBar } from "../components/ui";
import { Notebook } from "../components/Notebook";
import { HintPanel } from "../components/HintPanel";
import { IconCaderno, IconDestrancado, IconDica, IconFrasco, IconLupa, IconRaio } from "../components/icons";

export function BoardScreen() {
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const foundContradictions = useGame((s) => s.foundContradictions);
  const wrongPairs = useGame((s) => s.wrongPairs);
  const readInterviews = useGame((s) => s.readInterviews);
  const viewedEvidence = useGame((s) => s.viewedEvidence);
  const hintPoints = useGame((s) => s.hintPoints);
  const hintLevel = useGame((s) => s.hintLevel);
  const hintTargetId = useGame((s) => s.hintTargetId);
  const openHints = useGame((s) => s.openHints);
  const openNotebook = useGame((s) => s.openNotebook);
  const progress = {
    unlockedLeads,
    foundContradictions,
    wrongPairs,
    readInterviews,
    viewedEvidence,
    hintPoints,
  };
  const selectedClaim = useGame((s) => s.selectedClaim);
  const selectedFact = useGame((s) => s.selectedFact);
  const selectClaim = useGame((s) => s.selectClaim);
  const selectFact = useGame((s) => s.selectFact);
  const registerContradiction = useGame((s) => s.registerContradiction);
  const reveal = useGame((s) => s.reveal);
  const dismissReveal = useGame((s) => s.dismissReveal);
  const flashWrong = useGame((s) => s.flashWrong);
  const passTo = useGame((s) => s.passTo);
  const goAccusation = useGame((s) => s.goAccusation);
  if (!c) return null;

  const claims = heardClaims(c, progress);
  const facts = seenFacts(c, progress);
  const found = progress.foundContradictions.length;
  const total = c.contradictions.length;
  const canAccuse = found >= c.solution.minContradictions;
  const armed = Boolean(selectedClaim && selectedFact);
  const claim = claims.find((cl) => cl.id === selectedClaim);
  const fact = facts.find((f) => f.id === selectedFact);
  const shaking = flashWrong > 0 && !reveal;

  // No terceiro degrau a dica entrega o par; a Mesa destaca os dois cartões.
  const apontado = hintLevel === 3 ? hintFor(c, progress, hintLevel, hintTargetId) : null;
  const falaApontada = apontado?.kind === "hint" ? apontado.claimId : null;
  const provaApontada = apontado?.kind === "hint" ? apontado.factId : null;

  const botaoTopo =
    "flex size-11 items-center justify-center rounded-full border border-muted/40 text-fg active:bg-surface";

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-52">
      <TopBar
        title="Mesa de Contradições"
        right={
          <div className="flex gap-2">
            <button type="button" onClick={openNotebook} aria-label="Abrir o caderno do caso" className={botaoTopo}>
              <IconCaderno />
            </button>
            <button type="button" onClick={openHints} aria-label="Pedir uma dica" className={botaoTopo}>
              <IconDica />
            </button>
          </div>
        }
      />

      <div className="panel mt-1 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-sm uppercase tracking-[0.2em] text-muted">Contradições</span>
          <span className="tabular font-display text-2xl text-fg">
            {found}
            <span className="text-muted">/{total}</span>
          </span>
        </div>
        <div className="mt-2">
          <Meter value={found} max={total} />
        </div>
        <p className="mt-2 text-sm text-muted">
          {canAccuse
            ? "Já dá para acusar — ou continuem cavando para não errarem o motivo."
            : `Encontrem pelo menos ${c.solution.minContradictions} contradições para liberar a acusação.`}
          {progress.wrongPairs.length > 0 && (
            <>
              {" "}
              <span className="text-danger">
                {progress.wrongPairs.length} {progress.wrongPairs.length === 1 ? "tentativa errada" : "tentativas erradas"}.
              </span>
            </>
          )}
        </p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* alegações ouvidas */}
        <section key={`claims-${flashWrong}`} className={shaking ? "anim-shake" : ""}>
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-accent">
            <IconLupa /> O que foi dito
          </h2>
          {claims.length === 0 && (
            <p className="rounded-xl border border-dashed border-muted/30 p-4 text-sm leading-relaxed text-muted">
              Nada ainda. O Detetive precisa interrogar alguém e trazer as alegações para cá.
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {claims.map((cl) => (
              <li key={cl.id}>
                <button
                  type="button"
                  onClick={() => selectClaim(selectedClaim === cl.id ? null : cl.id)}
                  aria-pressed={selectedClaim === cl.id}
                  className={`w-full rounded-xl border p-3 text-left text-[15px] leading-snug transition ${
                    selectedClaim === cl.id
                      ? "border-accent bg-accent/15 text-fg shadow-[0_0_0_3px] shadow-accent/20"
                      : "border-muted/30 bg-surface text-fg/85 active:bg-accent/10"
                  } ${falaApontada === cl.id ? "ring-2 ring-danger" : ""}`}
                >
                  {cl.summary}
                  <span className="mt-1.5 block font-display text-xs uppercase tracking-wider text-muted">
                    {cl.suspectName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* fatos vistos */}
        <section key={`facts-${flashWrong}-b`} className={shaking ? "anim-shake" : ""}>
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-accent2">
            <IconFrasco /> O que foi provado
          </h2>
          {facts.length === 0 && (
            <p className="rounded-xl border border-dashed border-muted/30 p-4 text-sm leading-relaxed text-muted">
              Nada ainda. O Perito precisa examinar as provas e trazer os fatos para cá.
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {facts.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => selectFact(selectedFact === f.id ? null : f.id)}
                  aria-pressed={selectedFact === f.id}
                  className={`w-full rounded-xl border p-3 text-left text-[15px] leading-snug transition ${
                    selectedFact === f.id
                      ? "border-accent2 bg-accent2/15 text-fg shadow-[0_0_0_3px] shadow-accent2/20"
                      : "border-muted/30 bg-surface text-fg/85 active:bg-accent2/10"
                  } ${provaApontada === f.id ? "ring-2 ring-danger" : ""}`}
                >
                  {f.summary}
                  <span className="mt-1.5 block font-display text-xs uppercase tracking-wider text-muted">
                    {f.evidenceName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* rodapé de ações */}
      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl flex-col gap-2.5">
          {/* o par montado, lado a lado, antes de bater o martelo */}
          {armed && (
            <div className="anim-fade-up flex items-center gap-2 text-xs leading-tight">
              <span className="line-clamp-2 flex-1 rounded-lg bg-accent/15 px-2.5 py-1.5 text-accent">
                {claim?.summary}
              </span>
              <IconRaio className="size-5 shrink-0 text-danger" />
              <span className="line-clamp-2 flex-1 rounded-lg bg-accent2/15 px-2.5 py-1.5 text-accent2">
                {fact?.summary}
              </span>
            </div>
          )}

          <BigButton onClick={registerContradiction} disabled={!armed} className="w-full">
            <span className="inline-flex items-center gap-2">
              <IconRaio /> {armed ? "Isso não bate! Registrar" : "Escolham uma fala e uma prova"}
            </span>
          </BigButton>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => passTo("detective")}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-accent/40 text-sm text-accent active:bg-surface"
            >
              <IconLupa /> Detetive
            </button>
            <button
              type="button"
              onClick={() => passTo("perito")}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-accent2/40 text-sm text-accent2 active:bg-surface"
            >
              <IconFrasco /> Perito
            </button>
            <button
              type="button"
              onClick={goAccusation}
              disabled={!canAccuse}
              className="min-h-12 flex-1 rounded-xl bg-danger text-sm font-semibold text-bg disabled:opacity-35"
            >
              Acusar
            </button>
          </div>
        </div>
      </footer>

      <Notebook />
      <HintPanel />

      {/* revelação de contradição — z-40 para ganhar dos painéis (z-30) */}
      {reveal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-6"
        >
          <div className="dossier anim-pop anim-reveal max-h-[82dvh] w-full max-w-lg overflow-y-auto p-6 sm:p-8">
            <span className="stamp anim-stamp-flat text-danger">Contradição</span>
            <p className="mt-5 text-lg leading-relaxed">{reveal.contradiction.explanation}</p>
            {reveal.newLeads.length > 0 && (
              <div className="mt-6 rounded-xl bg-ink/10 p-4">
                <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em]">
                  <IconDestrancado /> Novas pistas
                </p>
                <ul className="mt-3 flex flex-col gap-3">
                  {reveal.newLeads.map((l) => (
                    <li key={l.id}>
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-sm leading-relaxed opacity-80">{l.narration}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <BigButton onClick={dismissReveal} className="mt-6 w-full">
              Continuar investigando
            </BigButton>
          </div>
        </div>
      )}
    </main>
  );
}
