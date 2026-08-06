/**
 * O epílogo narra a verdade completa — acertando ou errando a acusação.
 */
import { useGame } from "../store/gameStore";
import { BigButton } from "../components/ui";

export function EpilogueScreen() {
  const c = useGame((s) => s.caseData);
  const score = useGame((s) => s.score);
  const accusation = useGame((s) => s.accusation);
  const finishEpilogue = useGame((s) => s.finishEpilogue);
  if (!c || !score) return null;

  const whoCorrect = accusation.who === c.solution.culpritId;
  const culprit = c.suspects.find((s) => s.id === c.solution.culpritId);
  const accused = c.suspects.find((s) => s.id === accusation.who);

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-6 pb-[calc(24px+env(safe-area-inset-bottom))] pt-10">
      <p className="anim-fade-up text-center font-display text-sm font-semibold uppercase tracking-[0.3em] text-muted">
        Caso encerrado
      </p>
      <h1 className="theme-title anim-fade-up mt-2 text-center font-display text-4xl font-semibold text-fg">
        A verdade sobre {c.title}
      </h1>

      <div className={`anim-fade-up mx-auto mt-6 max-w-lg rounded-2xl border p-5 text-center ${whoCorrect ? "border-ok/60 bg-ok/10" : "border-danger/60 bg-danger/10"}`} style={{ animationDelay: "120ms" }}>
        {whoCorrect ? (
          <p className="text-lg text-fg">
            ✅ Vocês apontaram <strong>{culprit?.name}</strong> — e acertaram em cheio.
          </p>
        ) : (
          <p className="text-lg text-fg">
            ❌ Vocês acusaram <strong>{accused?.name ?? "—"}</strong>, mas o verdadeiro culpado era{" "}
            <strong>{culprit?.name}</strong>. Eis o que realmente aconteceu:
          </p>
        )}
      </div>

      <article className="dossier anim-fade-up mt-6 flex flex-col gap-5 p-7" style={{ animationDelay: "240ms" }}>
        {c.epilogue.map((b, i) => (
          <div key={i}>
            {b.heading && <h2 className="theme-title mb-2 font-display text-2xl font-semibold">{b.heading}</h2>}
            <p className="leading-relaxed">{b.text}</p>
          </div>
        ))}
      </article>

      <div className="anim-fade-up mt-8" style={{ animationDelay: "360ms" }}>
        <BigButton onClick={finishEpilogue} className="w-full">
          Ver a avaliação da dupla
        </BigButton>
      </div>
    </main>
  );
}
