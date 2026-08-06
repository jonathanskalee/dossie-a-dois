/**
 * Botão "segure para confirmar" da tela de passagem do tablet.
 *
 * Exige ~900 ms de toque contínuo antes de disparar — um toque acidental não
 * abre o conteúdo do outro papel. O anel de progresso é a própria confirmação
 * visual de que segurar está funcionando.
 */
import { useRef, useState } from "react";

const HOLD_MS = 900;

export function HoldButton(props: { label: string; onComplete: () => void }) {
  const [holding, setHolding] = useState(false);
  const timer = useRef<number | null>(null);
  const done = useRef(false);

  const start = () => {
    if (timer.current !== null) return;
    done.current = false;
    setHolding(true);
    timer.current = window.setTimeout(() => {
      done.current = true;
      timer.current = null;
      setHolding(false);
      props.onComplete();
    }, HOLD_MS);
  };

  const cancel = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (!done.current) setHolding(false);
  };

  return (
    <button
      type="button"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={(e) => e.preventDefault()}
      className="relative min-h-16 w-full touch-none select-none overflow-hidden rounded-2xl bg-accent font-display text-xl font-semibold text-bg shadow-[0_6px_0_rgba(0,0,0,.35)]"
    >
      {/* preenchimento do progresso */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-black/25"
        style={{
          width: holding ? "100%" : "0%",
          transition: holding ? `width ${HOLD_MS}ms linear` : "width 150ms ease",
        }}
      />
      <span className="relative">{props.label}</span>
    </button>
  );
}
