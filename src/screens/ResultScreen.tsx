import { useGame } from "../store/gameStore";
import { BigButton, Meter, Stars } from "../components/ui";

export function ResultScreen() {
  const c = useGame((s) => s.caseData);
  const score = useGame((s) => s.score);
  const exitCase = useGame((s) => s.exitCase);
  if (!c || !score) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 pb-[calc(24px+env(safe-area-inset-bottom))] pt-10 text-center">
      <p className="anim-fade-up font-display text-sm font-semibold uppercase tracking-[0.3em] text-muted">
        Avaliação da dupla
      </p>

      <div className="anim-pop mt-4" style={{ animationDelay: "150ms" }}>
        <Stars n={score.stars} />
        <h1 className="theme-title mt-3 font-display text-4xl font-semibold text-accent">{score.label}</h1>
        <p className="tabular mt-2 text-6xl font-bold text-fg">{score.total}</p>
        <p className="text-muted">de 100 pontos</p>
      </div>

      <div className="panel anim-fade-up mt-8 flex flex-col gap-4 p-6 text-left" style={{ animationDelay: "300ms" }}>
        <div>
          <div className="flex justify-between text-sm text-muted">
            <span>💥 Contradições desmontadas</span>
            <span className="tabular">{score.parts.contradictions}/50</span>
          </div>
          <div className="mt-1">
            <Meter value={score.parts.contradictions} max={50} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-muted">
            <span>⚖️ Acusação (quem · como · por quê)</span>
            <span className="tabular">{score.parts.accusation}/40</span>
          </div>
          <div className="mt-1">
            <Meter value={score.parts.accusation} max={40} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-muted">
            <span>🧹 Investigação completa</span>
            <span className="tabular">{score.parts.thoroughness}/10</span>
          </div>
          <div className="mt-1">
            <Meter value={score.parts.thoroughness} max={10} tone="accent2" />
          </div>
        </div>
        {score.parts.penalty > 0 && (
          <p className="text-sm text-danger">− {score.parts.penalty} pontos por palpites errados na Mesa</p>
        )}
      </div>

      <div className="anim-fade-up mt-8" style={{ animationDelay: "420ms" }}>
        <BigButton onClick={exitCase} className="w-full">
          Voltar ao arquivo de casos
        </BigButton>
      </div>
    </main>
  );
}
