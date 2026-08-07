import type { ComponentType } from "react";
import { useGame } from "../store/gameStore";
import { BigButton, Meter, Stars } from "../components/ui";
import { IconBalanca, IconLupa, IconRaio } from "../components/icons";

/** Uma linha do boletim: o que a dupla fez e quanto valeu. */
function ScoreLine(props: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  max: number;
  tone?: "accent" | "accent2";
}) {
  const Icon = props.icon;
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="inline-flex items-center gap-2 text-muted">
          <Icon /> {props.label}
        </span>
        <span className="tabular font-display text-fg">
          {props.value}
          <span className="text-muted">/{props.max}</span>
        </span>
      </div>
      <div className="mt-1.5">
        <Meter value={props.value} max={props.max} tone={props.tone} />
      </div>
    </div>
  );
}

export function ResultScreen() {
  const c = useGame((s) => s.caseData);
  const score = useGame((s) => s.score);
  const exitCase = useGame((s) => s.exitCase);
  if (!c || !score) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 pb-[calc(24px+env(safe-area-inset-bottom))] pt-10 text-center">
      <p className="anim-fade-up font-display text-xs uppercase tracking-[0.36em] text-muted">
        Avaliação da dupla
      </p>

      <div className="mt-6">
        <Stars n={score.stars} />
      </div>

      <div className="anim-fade-up mt-6" style={{ animationDelay: "260ms" }}>
        <h1 className="theme-title font-display text-4xl leading-tight text-accent">{score.label}</h1>
        <p className="tabular mt-3 font-display text-7xl leading-none text-fg">{score.total}</p>
        <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted">de 100 pontos</p>
      </div>

      <div
        className="panel anim-fade-up mt-9 flex flex-col gap-5 p-6 text-left"
        style={{ animationDelay: "380ms" }}
      >
        <ScoreLine icon={IconRaio} label="Contradições desmontadas" value={score.parts.contradictions} max={50} />
        <ScoreLine icon={IconBalanca} label="Acusação (quem · como · por quê)" value={score.parts.accusation} max={40} />
        <ScoreLine icon={IconLupa} label="Investigação completa" value={score.parts.thoroughness} max={10} tone="accent2" />
        {score.parts.penalty > 0 && (
          <p className="text-sm text-danger">
            − {score.parts.penalty} pontos por palpites errados na Mesa
          </p>
        )}
        {score.parts.hints > 0 && (
          <p className="text-sm text-danger">− {score.parts.hints} pontos por dicas pedidas</p>
        )}
      </div>

      <div className="anim-fade-up mt-8" style={{ animationDelay: "480ms" }}>
        <BigButton onClick={exitCase} className="w-full">
          Voltar ao arquivo de casos
        </BigButton>
      </div>
    </main>
  );
}
