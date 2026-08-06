import { CASE_SUMMARIES } from "../data/cases";
import type { ThemeId } from "../data/types";
import { peekSave, loadRecords } from "../store/saves";
import { useGame } from "../store/gameStore";
import { TopBar } from "../components/ui";

/** Prévia visual de cada tema no cartão (o tema completo só entra ao abrir o caso). */
const PREVIEW: Record<ThemeId, { emoji: string; chip: string; klass: string }> = {
  noir: { emoji: "🥃", chip: "Noir · 1948", klass: "from-[#141216] to-[#26161a] text-[#e9e2cf]" },
  cozy: { emoji: "🌷", chip: "Vila · Aconchegante", klass: "from-[#fdf4e3] to-[#f2dfc4] text-[#3d2f24]" },
  tech: { emoji: "📱", chip: "Thriller · Digital", klass: "from-[#0d1622] to-[#122c3a] text-[#d9e6f2]" },
  occult: { emoji: "🕯️", chip: "Mansão · Oculto", klass: "from-[#191223] to-[#2a1b2e] text-[#e8dcc2]" },
};

function minutes(ms: number): number {
  return Math.max(1, Math.round(ms / 60000));
}

export function CaseSelectScreen() {
  const openCase = useGame((s) => s.openCase);
  const goTitle = useGame((s) => s.goTitle);
  const loading = useGame((s) => s.loadingCase);
  const records = loadRecords();

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-[calc(24px+env(safe-area-inset-bottom))]">
      <TopBar title="Arquivo de casos" onBack={goTitle} />
      <p className="mb-6 mt-1 text-muted">
        Cada dossiê é uma noite de investigação. Escolham um caso e preparem-se para discordar.
      </p>

      <ul className="flex flex-col gap-5">
        {CASE_SUMMARIES.map((c, i) => {
          const save = peekSave(c.id);
          const rec = records[c.id];
          const p = PREVIEW[c.theme];
          return (
            <li key={c.id} className="anim-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <button
                type="button"
                disabled={loading}
                onClick={() => openCase(c.id)}
                className={`w-full rounded-3xl bg-gradient-to-br p-6 text-left shadow-[0_10px_28px_rgba(0,0,0,.35)] transition-transform active:scale-[.98] disabled:opacity-60 ${p.klass}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                    {p.chip}
                  </span>
                  <span className="text-4xl" aria-hidden>
                    {p.emoji}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold">{c.title}</h2>
                <p className="mt-1 opacity-80">{c.tagline}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-90">
                  <span>⏱️ ~{c.estimatedMinutes} min</span>
                  <span>{"🔎".repeat(c.difficulty)} {c.difficulty === 1 ? "Leve" : c.difficulty === 2 ? "Cabeludo" : "Difícil"}</span>
                  {rec && <span>⭐ {rec.stars}/5 resolvido</span>}
                  {save && !rec && <span className="font-semibold">▶ Continuar ({minutes(save.elapsedMs)} min jogados)</span>}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
