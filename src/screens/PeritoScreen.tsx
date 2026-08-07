import type { ComponentType } from "react";
import { useGame } from "../store/gameStore";
import { visibleEvidence } from "../store/progress";
import type { EvidenceKind } from "../data/types";
import { SegmentText } from "../components/SegmentText";
import { RoleBadge, TopBar } from "../components/ui";
import { Notebook } from "../components/Notebook";
import {
  IconCaderno,
  IconChip,
  IconDocumento,
  IconEtiqueta,
  IconFoto,
  IconFrasco,
  IconLupa,
  IconMesa,
} from "../components/icons";

/** Cada tipo de prova tem seu ícone na bancada. */
const KIND_ICON: Record<EvidenceKind, ComponentType<{ className?: string }>> = {
  documento: IconDocumento,
  foto: IconFoto,
  laudo: IconFrasco,
  objeto: IconEtiqueta,
  digital: IconChip,
};

/**
 * Rodapé fixo com as saídas do turno. Definido uma vez e usado nos dois ramos
 * de render da tela — por isso o caderno entra aqui, e não na TopBar.
 */
function TurnFooter() {
  const passTo = useGame((s) => s.passTo);
  const openNotebook = useGame((s) => s.openNotebook);
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-3">
        <button
          type="button"
          onClick={openNotebook}
          aria-label="Abrir o caderno do caso"
          className="flex min-h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-muted/40 text-fg active:bg-surface"
        >
          <IconCaderno className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => passTo("detective")}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-2xl border border-accent/50 px-4 font-display text-lg text-accent active:bg-surface"
        >
          <IconLupa /> Passar ao Detetive
        </button>
        <button
          type="button"
          onClick={() => passTo("board")}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-4 font-display text-lg text-bg shadow-[0_4px_0_rgba(0,0,0,.3)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,.3)]"
        >
          <IconMesa /> Ir para a Mesa
        </button>
      </div>
      {/* o caderno mora junto do botão que o abre: um lugar só para os 2 ramos */}
      <Notebook />
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
    const Icon = KIND_ICON[open.kind];
    return (
      <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
        <TopBar title="Bancada de perícia" onBack={closeEvidence} right={<RoleBadge role="perito" />} />
        <div className="dossier anim-pop mt-2 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink/10">
              <Icon className="size-7" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-xs uppercase tracking-[0.28em] opacity-55">{open.kind}</p>
              <h2 className="font-display text-2xl leading-tight">{open.name}</h2>
            </div>
          </div>
          <div className="hairline my-5" />
          <SegmentText segments={open.body} markClass="mark-fact" />
          <div className="hairline my-5" />
          <p className="text-sm leading-relaxed opacity-70">
            Os trechos <mark className="mark-fact">destacados</mark> são <strong>fatos</strong> — o que a prova
            mostra. Conte ao seu parceiro. Se algum depoimento bater de frente, vocês registram na Mesa.
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
          const Icon = KIND_ICON[e.kind];
          return (
            <li key={e.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => openEvidence(e.id)}
                className={`panel flex w-full items-center gap-4 p-5 text-left active:scale-[.98] ${seen ? "opacity-70" : ""}`}
              >
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent2/15 text-accent2 ring-1 ring-accent2/25"
                  aria-hidden
                >
                  <Icon className="size-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-tight text-fg">{e.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    <span className="capitalize">{e.kind}</span> · {seen ? "analisada" : "não analisada"}
                  </span>
                </span>
                {!seen && <span className="size-2.5 shrink-0 rounded-full bg-accent2" aria-hidden />}
              </button>
            </li>
          );
        })}
      </ul>
      <TurnFooter />
    </main>
  );
}
