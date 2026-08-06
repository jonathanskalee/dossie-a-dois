/**
 * Retrato de suspeito.
 *
 * Casos com arte ilustrada (`portrait`) mostram a pintura; os demais caem no
 * emoji em moldura. Os dois formatos ocupam exatamente a mesma caixa, então a
 * grade não muda de forma conforme os casos ganham ilustração.
 *
 * `banner` é o formato da ficha na lista de suspeitos: a arte ocupa a largura
 * toda do cartão. Os tamanhos quadrados servem para linhas e listas.
 */
import type { Suspect } from "../data/types";

const QUADRADO = {
  sm: "size-14 text-3xl",
  md: "size-20 text-4xl",
  lg: "size-28 text-5xl",
} as const;

type Tamanho = keyof typeof QUADRADO | "banner";

export function Portrait(props: { suspect: Suspect; size?: Tamanho; className?: string }) {
  const { suspect, size = "sm", className = "" } = props;
  const banner = size === "banner";

  // Sem arte, a faixa encolhe: um emoji perdido num retângulo de foto vazio
  // parece defeito, não estilo.
  const caixa = banner
    ? `w-full ${suspect.portrait ? "aspect-[5/4]" : "h-24 text-5xl"} ${className}`
    : `${QUADRADO[size]} shrink-0 overflow-hidden rounded-2xl ring-1 ring-accent/25 ${className}`;

  if (suspect.portrait) {
    return (
      <img
        src={suspect.portrait}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={`${caixa} bg-surface object-cover object-top`}
      />
    );
  }

  return (
    <span className={`${caixa} flex items-center justify-center bg-accent/15`} aria-hidden>
      {suspect.portraitEmoji}
    </span>
  );
}
