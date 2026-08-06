import { useGame } from "../store/gameStore";
import { visibleEvidence } from "../store/progress";
import type { EvidenceKind } from "../data/types";
import { SegmentText } from "../components/SegmentText";
import { Pill, RoleBadge, TopBar } from "../components/ui";

const KIND_ICON: Record<EvidenceKind, string> = {
  documento: "📄",
  foto: "📷",
  laudo: "🧪",
  objeto: "🧤",
  digital: "💾",
};

function TurnFooter() {
  const passTo = useGame((s) => s.passTo);
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-3">
        <button
          type="button"
          onClick={() => passTo("detective")}
          className="min-h-13 flex-1 rounded-2xl border border-accent/50 px-4 font-display text-lg font-semibold text-accent active:bg-surface"
        >
          🕵️ Passar ao Detetive
        </button>
        <button
          type="button"
          onClick={() => passTo("board")}
          className="min-h-13 flex-1 rounded-2xl bg-accent px-4 font-display text-lg font-semibold text-bg shadow-[0_4px_0_rgba(0,0,0,.3)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,.3)]"
        >
          🤝 Ir para a Mesa
        </button>
      </div>
    </footer>
  );
}

export function PeritoScreen() {
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const viewedEvidence = useGame((s) => s.viewedEvidence);
  const openEvidenceId = useGame((s) => s.openEvidenceId);
  const openEvidence = useGame((s) => s.openEvidence);
  const closeEvidence = useGame((s) => s.closeEvidence);
  if (!c) return null;

  const evidence = visibleEvidence(c, unlockedLeads);
  const open = evidence.find((e) => e.id === openEvidenceId) ?? null;

  /* ---- evidência aberta ---- */
  if (open) {
    return (
      <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
        <TopBar title="Bancada de perícia" onBack={closeEvidence} right={<RoleBadge role="perito" />} />
        <div className="dossier anim-pop mt-2 p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {KIND_ICON[open.kind]}
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-60">{open.kind}</p>
              <h2 className="font-display text-2xl font-semibold">{open.name}</h2>
            </div>
          </div>
          <div className="hairline my-4" />
          <SegmentText segments={open.body} markClass="mark-fact" />
          <div className="hairline my-4" />
          <p className="text-sm opacity-70">
            Os trechos <mark className="mark-fact">destacados</mark> são <strong>fatos</strong> — o que a prova
            MOSTRA. Conte ao seu parceiro. Se algum depoimento bater de frente, vocês registram na Mesa.
          </p>
        </div>
        <TurnFooter />
      </main>
    );
  }

  /* ---- armário de evidências ---- */
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
      <TopBar title="Evidências" right={<RoleBadge role="perito" />} />
      <p className="mb-5 mt-1 text-muted">
        Examine cada prova, anote os fatos destacados e <strong>descreva tudo em voz alta</strong> ao seu
        detetive.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {evidence.map((e, i) => {
          const seen = viewedEvidence.has(e.id);
          return (
            <li key={e.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => openEvidence(e.id)}
                className="panel w-full p-5 text-left active:scale-[.98]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-accent2/15 text-3xl" aria-hidden>
                    {KIND_ICON[e.kind]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-xl font-semibold text-fg">{e.name}</h2>
                    <p className="text-sm capitalize text-muted">{e.kind}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  {seen ? <Pill tone="muted">analisada</Pill> : <Pill tone="accent2">não analisada</Pill>}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <TurnFooter />
    </main>
  );
}
