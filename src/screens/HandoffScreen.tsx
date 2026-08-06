/**
 * A tela de passagem do tablet — o momento-assinatura do jogo.
 *
 * Nada do papel anterior fica montado; só se avança segurando o botão
 * (HoldButton), então um toque acidental não revela o lado do outro.
 * Visualmente é um lacre: o carimbo bate na tela e a leitura fica barrada
 * até que a pessoa certa esteja com o tablet na mão.
 */
import { useGame } from "../store/gameStore";
import { HoldButton } from "../components/HoldButton";
import { RoleBadge } from "../components/ui";
import { IconFrasco, IconLupa, IconMesa } from "../components/icons";

export function HandoffScreen() {
  const target = useGame((s) => s.pendingTarget);
  const confirmHandoff = useGame((s) => s.confirmHandoff);
  if (!target) return null;

  const isBoard = target === "board";

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-9 px-8 pb-[env(safe-area-inset-bottom)] text-center">
      <span
        className={`stamp anim-stamp-flat text-2xl ${isBoard ? "text-accent" : target === "detective" ? "text-accent" : "text-accent2"}`}
      >
        {isBoard ? "Mesa comum" : "Confidencial"}
      </span>

      <div className="anim-fade-up flex flex-col items-center gap-5" style={{ animationDelay: "150ms" }}>
        {isBoard ? (
          <>
            <span className="flex items-center gap-2 text-accent">
              <IconLupa className="size-9" />
              <IconMesa className="size-12" />
              <IconFrasco className="size-9" />
            </span>
            <p className="text-2xl text-fg">
              Coloquem o tablet <strong>entre os dois</strong>.
            </p>
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              A Mesa de Contradições é território comum: contem um ao outro o que ouviram e o que viram — e
              cruzem as versões.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-sm uppercase tracking-[0.32em] text-muted">Passe o tablet para</p>
            <RoleBadge role={target} big />
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              {target === "detective"
                ? "Hora de interrogar. Só quem interroga deve ver a próxima tela."
                : "Hora de examinar as provas. Só quem examina deve ver a próxima tela."}
            </p>
          </>
        )}
      </div>

      <div className="anim-fade-up w-full max-w-sm" style={{ animationDelay: "300ms" }}>
        <HoldButton
          label={isBoard ? "Segurem juntos para abrir" : "Segure para abrir o dossiê"}
          onComplete={confirmHandoff}
        />
        <p className="mt-3 text-sm text-muted/80">Mantenha pressionado até o preenchimento completar.</p>
      </div>
    </main>
  );
}
