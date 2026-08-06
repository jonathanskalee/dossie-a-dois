/**
 * Peças de UI compartilhadas. Tudo usa só o vocabulário semântico de tokens
 * (bg-surface, text-ink, border-accent…) — o tema ativo faz o resto.
 */
import type { ReactNode } from "react";
import { IconCoracaoDigital, IconFrasco, IconLupa } from "./icons";

export function BigButton(props: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  const { children, onClick, variant = "primary", disabled, className = "" } = props;
  const skin =
    variant === "primary"
      ? "bg-accent text-bg shadow-[0_6px_0_rgba(0,0,0,.35)] active:shadow-[0_2px_0_rgba(0,0,0,.35)] active:translate-y-1"
      : variant === "danger"
        ? "bg-danger text-bg shadow-[0_6px_0_rgba(0,0,0,.35)] active:shadow-[0_2px_0_rgba(0,0,0,.35)] active:translate-y-1"
        : "bg-transparent text-fg border border-muted/50 active:bg-surface";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-14 rounded-2xl px-6 font-display text-xl tracking-wide transition-transform disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none ${skin} ${className}`}
    >
      {children}
    </button>
  );
}

export function TopBar(props: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center gap-3 bg-bg/90 px-4 backdrop-blur-sm">
      {props.onBack && (
        <button
          type="button"
          onClick={props.onBack}
          aria-label="Voltar"
          className="flex size-11 items-center justify-center rounded-full border border-muted/40 text-xl text-fg active:bg-surface"
        >
          ←
        </button>
      )}
      <h1 className="theme-title flex-1 truncate font-display text-2xl text-fg">{props.title}</h1>
      {props.right}
    </header>
  );
}

export function Pill(props: { children: ReactNode; tone?: "accent" | "accent2" | "muted"; className?: string }) {
  const tone =
    props.tone === "accent2"
      ? "bg-accent2/20 text-accent2"
      : props.tone === "muted"
        ? "bg-muted/20 text-muted"
        : "bg-accent/20 text-accent";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${tone} ${props.className ?? ""}`}
    >
      {props.children}
    </span>
  );
}

export function RoleBadge(props: { role: "detective" | "perito"; big?: boolean }) {
  const detective = props.role === "detective";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-display tracking-wide ${
        detective ? "bg-accent/20 text-accent" : "bg-accent2/20 text-accent2"
      } ${props.big ? "px-6 py-2.5 text-2xl" : "px-3 py-1 text-base"}`}
    >
      {detective ? <IconLupa /> : <IconFrasco />}
      {detective ? "Detetive" : "Perito"}
    </span>
  );
}

/**
 * Nota da dupla: corações de impressão digital carimbados, um a um,
 * cada qual com a inclinação torta de um carimbo de verdade.
 */
export function Stars(props: { n: 1 | 2 | 3 | 4 | 5 }) {
  const tilt = [-7, 4, -3, 6, -5];
  return (
    <div className="flex items-center justify-center gap-2" aria-label={`${props.n} de 5 corações`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={i <= props.n ? "anim-stamp-flat text-accent" : "text-muted opacity-30"}
          style={{ rotate: `${tilt[i - 1]}deg`, animationDelay: `${i * 120}ms` }}
        >
          <IconCoracaoDigital className="size-12" filled={i <= props.n} />
        </span>
      ))}
    </div>
  );
}

/** Barra de progresso fina (contradições encontradas, etc.). */
export function Meter(props: { value: number; max: number; tone?: "accent" | "accent2" }) {
  const pct = props.max === 0 ? 0 : Math.round((100 * props.value) / props.max);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/25">
      <div
        className={`h-full rounded-full transition-all duration-500 ${props.tone === "accent2" ? "bg-accent2" : "bg-accent"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
