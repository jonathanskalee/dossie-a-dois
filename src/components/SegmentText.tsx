/**
 * Renderiza a prosa de depoimentos e laudos com os trechos marcados.
 *
 * Os destaques não são clicáveis de propósito: o registro do que foi ouvido ou
 * visto acontece na Mesa de Contradições — aqui o trabalho é LER e contar ao
 * parceiro.
 */
import type { Segment } from "../data/types";

export function SegmentText(props: { segments: Segment[]; markClass: "mark-claim" | "mark-fact" }) {
  return (
    <p className="whitespace-pre-wrap leading-relaxed">
      {props.segments.map((seg, i) =>
        seg.ref ? (
          <mark key={i} className={props.markClass}>
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}
