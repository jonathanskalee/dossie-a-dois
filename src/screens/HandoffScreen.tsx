/**
 * A tela de passagem do tablet — o momento-assinatura do jogo.
 *
 * Nada do papel anterior fica montado; só se avança segurando o botão
 * (HoldButton), então um toque acidental não revela o lado do outro.
 */
import { useGame } from "../store/gameStore";
import { HoldButton } from "../components/HoldButton";
import { RoleBadge } from "../components/ui";

export function HandoffScreen() {
  const target = useGame((s) => s.pendingTarget);
  const confirmHandoff = useGame((s) => s.confirmHandoff);
  if (!target) return null;

  const isBoard = target === "board";

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-10 px-8 pb-[env(safe-area-inset-bottom)] text-center">
      <div className="anim-stamp rounded-2xl border-4 border-accent px-8 py-4">
        <span className="font-display text-3xl font-semibold uppercase tracking-widest text-accent">
          {isBoard ? "Mesa de reunião" : "Passagem de turno"}
        </span>
      </div>

      <div className="anim-fade-up flex flex-col items-center gap-4" style={{ animationDelay: "150ms" }}>
        {isBoard ? (
          <>
            <div className="text-6xl" aria-hidden>
              🤝
            </div>
            <p className="text-2xl text-fg">
              Coloquem o tablet <strong>entre os dois</strong>.
            </p>
            <p className="text-lg text-muted">
              A Mesa de Contradições é território comum: contem um ao outro o que ouviram e o que viram — e
              cruzem as versões.
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl text-fg">Passe o tablet para</p>
            <RoleBadge role={target} big />
            <p className="text-lg text-muted">
              {target === "detective"
                ? "Hora de interrogar. Só quem interroga deve ver a próxima tela."
                : "Hora de examinar as provas. Só quem examina deve ver a próxima tela."}
            </p>
          </>
        )}
      </div>

      <div className="anim-fade-up w-full max-w-sm" style={{ animationDelay: "300ms" }}>
        <HoldButton
          label={isBoard ? "Segurem juntos para abrir a mesa" : "Segure para abrir o dossiê"}
          onComplete={confirmHandoff}
        />
        <p className="mt-3 text-sm text-muted/80">Mantenha pressionado até o preenchimento completar.</p>
      </div>
    </main>
  );
}
