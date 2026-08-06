import { useGame } from "../store/gameStore";
import { BigButton } from "../components/ui";

export function TitleScreen() {
  const goCaseSelect = useGame((s) => s.goCaseSelect);
  const settings = useGame((s) => s.settings);
  const toggleSound = useGame((s) => s.toggleSound);
  const toggleVibe = useGame((s) => s.toggleVibe);

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-10 px-8 pb-[env(safe-area-inset-bottom)] text-center">
      <div className="anim-fade-up">
        {/* as duas lupas da marca */}
        <div className="mb-6 text-7xl" aria-hidden>
          🔍🔎
        </div>
        <h1 className="font-display text-6xl font-semibold tracking-tight text-fg">
          Dossiê <span className="text-accent">a Dois</span>
        </h1>
        <p className="mt-4 text-xl text-muted">
          Um caso. Dois olhares. <br />
          A verdade só aparece quando vocês conversam.
        </p>
      </div>

      <div className="anim-fade-up flex w-full max-w-sm flex-col gap-4" style={{ animationDelay: "120ms" }}>
        <BigButton onClick={goCaseSelect} className="w-full">
          Abrir o arquivo de casos
        </BigButton>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={settings.soundOn}
            onClick={toggleSound}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              settings.soundOn ? "border-accent/60 text-accent" : "border-muted/40 text-muted"
            }`}
          >
            {settings.soundOn ? "🔊 Som ligado" : "🔇 Som desligado"}
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={settings.vibeOn}
            onClick={toggleVibe}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              settings.vibeOn ? "border-accent/60 text-accent" : "border-muted/40 text-muted"
            }`}
          >
            {settings.vibeOn ? "📳 Vibração" : "📴 Sem vibração"}
          </button>
        </div>
      </div>

      <p className="text-sm text-muted/70">Para dois jogadores, num só tablet.</p>
    </main>
  );
}
