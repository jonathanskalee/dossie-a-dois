/**
 * Iconografia própria do jogo — traço 2px, cantos redondos, `currentColor`.
 *
 * Substitui os emoji de UI: emoji ficam só como conteúdo (retratos v1).
 * Tamanho segue o texto por padrão (1.2em); passe `className` para fixar.
 */
import type { ReactNode } from "react";

function I(props: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className ?? "size-[1.2em] shrink-0"}
      aria-hidden
      focusable="false"
    >
      {props.children}
    </svg>
  );
}

/** Lupa — o Detetive. */
export function IconLupa(props: { className?: string }) {
  return (
    <I className={props.className}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m15 15 5.5 5.5" />
    </I>
  );
}

/** Frasco de perícia — o Perito. */
export function IconFrasco(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M9.5 3h5M11 3v5.2L5.7 18.8A1.6 1.6 0 0 0 7.2 21h9.6a1.6 1.6 0 0 0 1.5-2.2L13 8.2V3" />
      <path d="M7.7 15h8.6" />
    </I>
  );
}

/** Dois aros que se cruzam — a Mesa, o "juntos". */
export function IconMesa(props: { className?: string }) {
  return (
    <I className={props.className}>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </I>
  );
}

/** Balança — a acusação. */
export function IconBalanca(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M12 3.5v17M7.5 20.5h9" />
      <path d="M12 5.5 5.5 7.5m6.5-2 6.5 2" />
      <path d="m2.5 13 3-5.5 3 5.5a3.4 3.4 0 0 1-6 0Z" />
      <path d="m15.5 13 3-5.5 3 5.5a3.4 3.4 0 0 1-6 0Z" />
    </I>
  );
}

/** Relógio — duração. */
export function IconRelogio(props: { className?: string }) {
  return (
    <I className={props.className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </I>
  );
}

/** Raio — a contradição ("isso não bate!"). */
export function IconRaio(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M13 2.5 5.5 13.5H10L9.5 21.5 18.5 9.5H13.5L13 2.5Z" />
    </I>
  );
}

/** Cadeado aberto — pista desbloqueada. */
export function IconDestrancado(props: { className?: string }) {
  return (
    <I className={props.className}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.8-1.2" />
    </I>
  );
}

/** Caderno de espiral — o registro do que já se descobriu. */
export function IconCaderno(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7Z" />
      <path d="M7 3H5.5A1.5 1.5 0 0 0 4 4.5v15A1.5 1.5 0 0 0 5.5 21H7" />
      <path d="M10.5 8.5h5M10.5 12.5h5" />
    </I>
  );
}

/** Ponto de interrogação — pedir uma dica. */
export function IconDica(props: { className?: string }) {
  return (
    <I className={props.className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9.2a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.2-2.6 4" />
      <path d="M12 17.4v.1" />
    </I>
  );
}

export function IconCheck(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </I>
  );
}

export function IconX(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </I>
  );
}

export function IconSom(props: { className?: string; off?: boolean }) {
  return (
    <I className={props.className}>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
      {props.off ? <path d="m16 9.5 5 5m0-5-5 5" /> : <path d="M16 8.5a5 5 0 0 1 0 7" />}
    </I>
  );
}

export function IconVibrar(props: { className?: string }) {
  return (
    <I className={props.className}>
      <rect x="8" y="4" width="8" height="16" rx="2" />
      <path d="M4 9.5v5M20 9.5v5" />
    </I>
  );
}

/* ---- tipos de evidência ---- */

export function IconDocumento(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M6 2.5h8l5 5v14H6Z" />
      <path d="M14 2.5V8h5" />
      <path d="M9 13h6M9 17h6" />
    </I>
  );
}

export function IconFoto(props: { className?: string }) {
  return (
    <I className={props.className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7 10 4h4l1.5 3" />
      <circle cx="12" cy="13" r="3.5" />
    </I>
  );
}

export function IconEtiqueta(props: { className?: string }) {
  return (
    <I className={props.className}>
      <path d="M3 11V4h7l10 10-7 7L3 11Z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </I>
  );
}

export function IconChip(props: { className?: string }) {
  return (
    <I className={props.className}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 6V3M14.5 6V3M9.5 21v-3M14.5 21v-3M6 9.5H3M6 14.5H3M21 9.5h-3M21 14.5h-3" />
    </I>
  );
}

/* ---- a marca em miniatura ---- */

const CORACAO =
  "M 0 150 C -20 118 -170 62 -170 -40 C -170 -132 -78 -162 -28 -122 " +
  "C -9 -106 0 -82 0 -62 C 0 -82 9 -106 28 -122 C 78 -162 170 -132 170 -40 " +
  "C 170 62 20 118 0 150 Z";

/**
 * O coração de impressão digital (a marca) em miniatura, usado na nota da
 * dupla no lugar de estrelas.
 *
 * Aqui a marca é reduzida a dois traços — contorno e núcleo. Os quatro anéis
 * do ícone do app se fundem num borrão abaixo de ~64 px; com dois, o desenho
 * continua legível no tamanho de uma estrela.
 */
export function IconCoracaoDigital(props: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={props.className ?? "size-[1.2em] shrink-0"}
      aria-hidden
      focusable="false"
    >
      <g transform="translate(256 254)">
        <path d={CORACAO} fill="none" stroke="currentColor" strokeWidth="42" />
        <g transform="scale(0.46)">
          <path
            d={CORACAO}
            fill={props.filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="90"
          />
        </g>
      </g>
    </svg>
  );
}
