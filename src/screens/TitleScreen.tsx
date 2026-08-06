/**
 * A capa do dossiê.
 *
 * A tela de abertura é a pasta em cima da mesa do arquivo: etiqueta datilografada,
 * a marca carimbada a tinta e, embaixo, o aviso de que o caso precisa de dois.
 */
import { useGame } from "../store/gameStore";
import { BigButton } from "../components/ui";
import { IconSom, IconVibrar } from "../components/icons";

export function TitleScreen() {
  const goCaseSelect = useGame((s) => s.goCaseSelect);
  const settings = useGame((s) => s.settings);
  const toggleSound = useGame((s) => s.toggleSound);
  const toggleVibe = useGame((s) => s.toggleVibe);

  const toggle = "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors";

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-9 px-8 pb-[env(safe-area-inset-bottom)]">
      <div className="anim-fade-up w-full max-w-md text-center">
        <img
          src="/logo.svg"
          alt=""
          aria-hidden
          className="anim-stamp-flat mx-auto mb-7 h-28 w-28"
          style={{ animationDelay: "260ms" }}
        />

        <p className="font-display text-xs uppercase tracking-[0.42em] text-muted">Arquivo confidencial</p>

        <h1 className="mt-3 font-display text-5xl leading-[1.05] text-fg sm:text-6xl">
          Dossiê
          <span className="mt-1 block text-accent">a Dois</span>
        </h1>

        <div className="hairline mx-auto mt-6 w-40" />

        <p className="mt-6 text-lg leading-relaxed text-muted">
          Um interroga. O outro examina as provas.
          <br />
          A verdade só aparece quando vocês conversam.
        </p>
      </div>

      <div className="anim-fade-up flex w-full max-w-sm flex-col gap-5" style={{ animationDelay: "140ms" }}>
        <BigButton onClick={goCaseSelect} className="w-full">
          Abrir o arquivo de casos
        </BigButton>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={settings.soundOn}
            onClick={toggleSound}
            className={`${toggle} ${settings.soundOn ? "border-accent/60 text-accent" : "border-muted/40 text-muted"}`}
          >
            <IconSom off={!settings.soundOn} />
            {settings.soundOn ? "Som ligado" : "Sem som"}
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={settings.vibeOn}
            onClick={toggleVibe}
            className={`${toggle} ${settings.vibeOn ? "border-accent/60 text-accent" : "border-muted/40 text-muted"}`}
          >
            <IconVibrar />
            {settings.vibeOn ? "Vibração" : "Sem vibração"}
          </button>
        </div>
      </div>

      <p className="font-display text-xs uppercase tracking-[0.3em] text-muted/60">
        Dois jogadores · um tablet
      </p>
    </main>
  );
}
