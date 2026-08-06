/**
 * O epílogo narra a verdade completa — acertando ou errando a acusação.
 */
import { useGame } from "../store/gameStore";
import { BigButton } from "../components/ui";
import { Portrait } from "../components/Portrait";
import { IconCheck, IconX } from "../components/icons";

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
      <p className="anim-fade-up text-center font-display text-xs uppercase tracking-[0.36em] text-muted">
        Caso encerrado
      </p>
      <h1 className="theme-title anim-fade-up mt-3 text-center font-display text-4xl leading-tight text-fg">
        A verdade sobre {c.title}
      </h1>

      {/* o veredito, com a cara de quem realmente fez */}
      <div
        className={`anim-fade-up mx-auto mt-7 flex max-w-lg items-center gap-4 rounded-2xl border p-5 text-left ${
          whoCorrect ? "border-ok/60 bg-ok/10" : "border-danger/60 bg-danger/10"
        }`}
        style={{ animationDelay: "120ms" }}
      >
        {culprit && <Portrait suspect={culprit} size="md" />}
        <div className="min-w-0">
          <p className={`flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.24em] ${whoCorrect ? "text-ok" : "text-danger"}`}>
            {whoCorrect ? <IconCheck /> : <IconX />}
            {whoCorrect ? "Acusação correta" : "Acusaram a pessoa errada"}
          </p>
          {whoCorrect ? (
            <p className="mt-1.5 leading-relaxed text-fg">
              Era mesmo <strong>{culprit?.name}</strong>. Vocês leram a noite direito.
            </p>
          ) : (
            <p className="mt-1.5 leading-relaxed text-fg">
              Vocês apontaram <strong>{accused?.name ?? "ninguém"}</strong>. Quem matou foi{" "}
              <strong>{culprit?.name}</strong>.
            </p>
          )}
        </div>
      </div>

      <article className="dossier anim-fade-up mt-7 flex flex-col gap-6 p-7 sm:p-9" style={{ animationDelay: "240ms" }}>
        {c.epilogue.map((b, i) => (
          <div key={i}>
            {b.heading && <h2 className="theme-title mb-2 font-display text-2xl leading-tight">{b.heading}</h2>}
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
