/**
 * Painel de dicas da Mesa.
 *
 * Toda a regra (qual contradição, o que cada degrau revela, quanto custa) vive
 * em `store/hints.ts`. Aqui só se pinta o que veio pronto — inclusive o preço
 * do próximo degrau, para não haver aritmética em componente.
 */
import { useGame } from "../store/gameStore";
import { hintFor } from "../store/hints";
import { BigButton } from "./ui";
import { IconDica, IconX } from "./icons";

export function HintPanel() {
  const open = useGame((s) => s.hintOpen);
  const close = useGame((s) => s.closeHints);
  const ask = useGame((s) => s.askHint);
  const c = useGame((s) => s.caseData);
  const hintLevel = useGame((s) => s.hintLevel);
  const hintTargetId = useGame((s) => s.hintTargetId);
  const hintPoints = useGame((s) => s.hintPoints);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const foundContradictions = useGame((s) => s.foundContradictions);
  const wrongPairs = useGame((s) => s.wrongPairs);
  const readInterviews = useGame((s) => s.readInterviews);
  const viewedEvidence = useGame((s) => s.viewedEvidence);

  if (!open || !c) return null;

  const estado = hintFor(
    c,
    { unlockedLeads, foundContradictions, wrongPairs, readInterviews, viewedEvidence, hintPoints },
    hintLevel,
    hintTargetId
  );

  const proximoCusto = estado.kind === "none" ? null : estado.kind === "ready" ? estado.nextCost : estado.nextCost;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dica"
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 p-4 sm:p-6"
    >
      <div className="dossier anim-pop w-full max-w-md p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.28em] opacity-55">
            <IconDica /> Uma ajudinha
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar a dica"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/25"
          >
            <IconX />
          </button>
        </div>

        <p className="mt-4 text-lg leading-relaxed">{estado.text}</p>

        {hintPoints > 0 && (
          <p className="tabular mt-3 text-sm opacity-60">
            Dicas pedidas até agora: −{hintPoints} {hintPoints === 1 ? "ponto" : "pontos"} na avaliação final.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {proximoCusto !== null && (
            <BigButton onClick={ask} className="w-full">
              {estado.kind === "ready" ? "Quero a dica" : "Contem mais"} (−{proximoCusto})
            </BigButton>
          )}
          <BigButton onClick={close} variant="ghost" className="w-full">
            {proximoCusto === null ? "Fechar" : "Deixa comigo"}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
