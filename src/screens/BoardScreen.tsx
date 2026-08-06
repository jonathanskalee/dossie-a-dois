/**
 * A Mesa de Contradições — território comum do casal.
 *
 * De um lado, tudo que o Detetive OUVIU; do outro, tudo que o Perito VIU.
 * Escolher um de cada e registrar. O jogo não mostra de antemão quais pares
 * existem: a dedução acontece na conversa, a tela só confere.
 */
import { useGame } from "../store/gameStore";
import { heardClaims, seenFacts } from "../store/progress";
import { BigButton, Meter, Pill, TopBar } from "../components/ui";

export function BoardScreen() {
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const foundContradictions = useGame((s) => s.foundContradictions);
  const wrongPairs = useGame((s) => s.wrongPairs);
  const readInterviews = useGame((s) => s.readInterviews);
  const viewedEvidence = useGame((s) => s.viewedEvidence);
  const progress = { unlockedLeads, foundContradictions, wrongPairs, readInterviews, viewedEvidence };
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

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-40">
      <TopBar title="Mesa de Contradições" right={<Pill>🤝 juntos</Pill>} />

      <div className="panel mt-1 p-4">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            Contradições: <strong className="tabular text-fg">{found}/{total}</strong>
          </span>
          <span>
            Tentativas erradas: <strong className="tabular text-fg">{progress.wrongPairs.length}</strong>
          </span>
        </div>
        <div className="mt-2">
          <Meter value={found} max={total} />
        </div>
        {!canAccuse && (
          <p className="mt-2 text-sm text-muted">
            Encontrem pelo menos {c.solution.minContradictions} contradições para liberar a acusação.
          </p>
        )}
      </div>

      {claims.length === 0 && facts.length === 0 && (
        <p className="mt-6 text-center text-muted">
          A mesa ainda está vazia: interroguem suspeitos e analisem provas primeiro.
        </p>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {/* alegações ouvidas */}
        <section key={`claims-${flashWrong}`} className={flashWrong > 0 && !reveal ? "anim-shake" : ""}>
          <h2 className="mb-2 font-display text-lg font-semibold uppercase tracking-wider text-accent">
            🕵️ O que foi dito
          </h2>
          <ul className="flex flex-col gap-2">
            {claims.map((cl) => (
              <li key={cl.id}>
                <button
                  type="button"
                  onClick={() => selectClaim(selectedClaim === cl.id ? null : cl.id)}
                  aria-pressed={selectedClaim === cl.id}
                  className={`w-full rounded-xl border p-3 text-left text-[15px] leading-snug transition ${
                    selectedClaim === cl.id
                      ? "border-accent bg-accent/15 text-fg"
                      : "border-muted/30 bg-surface text-fg/85 active:bg-accent/10"
                  }`}
                >
                  {cl.summary}
                  <span className="mt-1 block text-xs text-muted">— {cl.suspectName}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* fatos vistos */}
        <section key={`facts-${flashWrong}-b`} className={flashWrong > 0 && !reveal ? "anim-shake" : ""}>
          <h2 className="mb-2 font-display text-lg font-semibold uppercase tracking-wider text-accent2">
            🔬 O que foi provado
          </h2>
          <ul className="flex flex-col gap-2">
            {facts.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => selectFact(selectedFact === f.id ? null : f.id)}
                  aria-pressed={selectedFact === f.id}
                  className={`w-full rounded-xl border p-3 text-left text-[15px] leading-snug transition ${
                    selectedFact === f.id
                      ? "border-accent2 bg-accent2/15 text-fg"
                      : "border-muted/30 bg-surface text-fg/85 active:bg-accent2/10"
                  }`}
                >
                  {f.summary}
                  <span className="mt-1 block text-xs text-muted">— {f.evidenceName}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* rodapé de ações */}
      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <BigButton
            onClick={registerContradiction}
            disabled={!selectedClaim || !selectedFact}
            className="w-full"
          >
            💥 Isso não bate! Registrar contradição
          </BigButton>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => passTo("detective")}
              className="min-h-12 flex-1 rounded-xl border border-accent/40 text-accent active:bg-surface"
            >
              🕵️ Detetive
            </button>
            <button
              type="button"
              onClick={() => passTo("perito")}
              className="min-h-12 flex-1 rounded-xl border border-accent2/40 text-accent2 active:bg-surface"
            >
              🔬 Perito
            </button>
            <button
              type="button"
              onClick={goAccusation}
              disabled={!canAccuse}
              className="min-h-12 flex-1 rounded-xl bg-danger font-semibold text-bg disabled:opacity-35"
            >
              ⚖️ Acusar
            </button>
          </div>
        </div>
      </footer>

      {/* revelação de contradição */}
      {reveal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-6"
        >
          <div className="dossier anim-pop anim-reveal max-h-[80dvh] w-full max-w-lg overflow-y-auto p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-danger">
              Contradição encontrada
            </p>
            <p className="mt-3 text-lg leading-relaxed">{reveal.contradiction.explanation}</p>
            {reveal.newLeads.length > 0 && (
              <div className="mt-4 rounded-xl bg-black/8 p-4">
                <p className="font-semibold">🔓 Novas pistas:</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {reveal.newLeads.map((l) => (
                    <li key={l.id}>
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-sm opacity-80">{l.narration}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <BigButton onClick={dismissReveal} className="mt-5 w-full">
              Continuar investigando
            </BigButton>
          </div>
        </div>
      )}
    </main>
  );
}
