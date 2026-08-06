import { CASE_SUMMARIES } from "../data/cases";
import type { ThemeId } from "../data/types";
import { peekSave, loadRecords } from "../store/saves";
import { useGame } from "../store/gameStore";
import { TopBar } from "../components/ui";
import { IconCoracaoDigital, IconLupa, IconRelogio } from "../components/icons";

/**
 * Prévia de cada tema na pasta: a etiqueta colorida de arquivo e a "foto
 * revelada" presa na pasta (emoji por enquanto; vira a capa ilustrada depois).
 * Cores literais são permitidas aqui: é a prévia de OUTRO tema, o tema
 * completo só entra ao abrir o caso.
 */
const PREVIEW: Record<ThemeId, { emoji: string; chip: string; klass: string }> = {
  noir: { emoji: "🥃", chip: "Noir · 1948", klass: "from-[#141216] to-[#26161a] text-[#e9e2cf]" },
  cozy: { emoji: "🌷", chip: "Vila · Aconchegante", klass: "from-[#b0563b] to-[#8f4630] text-[#fdf4e3]" },
  tech: { emoji: "📱", chip: "Thriller · Digital", klass: "from-[#0d1622] to-[#122c3a] text-[#7fd4f8]" },
  occult: { emoji: "🕯️", chip: "Mansão · Oculto", klass: "from-[#191223] to-[#2a1b2e] text-[#cf9433]" },
};

const DIFFICULTY = ["Leve", "Cabeludo", "Difícil"] as const;

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

      <ul className="flex flex-col gap-7">
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
                className="folder transition-transform active:scale-[.98] disabled:opacity-60"
              >
                <span className="folder-tab">Caso nº {String(i + 1).padStart(2, "0")}</span>
                <div className="folder-body p-5">
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-block rounded-sm bg-gradient-to-br px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${p.klass}`}
                      >
                        {p.chip}
                      </span>
                      <h2 className="mt-3 font-display text-2xl leading-tight">{c.title}</h2>
                      <p className="mt-1 text-[15px] italic opacity-75">{c.tagline}</p>
                    </div>
                    {/* a foto revelada presa na pasta */}
                    <span className="folder-photo mt-1 shrink-0" aria-hidden>
                      {c.cover ? (
                        <img src={c.cover} alt="" className="size-20 object-cover" loading="lazy" />
                      ) : (
                        <span className="flex size-20 items-center justify-center bg-black/5 text-4xl">
                          {p.emoji}
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm opacity-85">
                      <span className="inline-flex items-center gap-1.5">
                        <IconRelogio /> ~{c.estimatedMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="inline-flex gap-1" aria-hidden>
                          {Array.from({ length: c.difficulty }, (_, k) => (
                            <IconLupa key={k} className="size-[1.05em]" />
                          ))}
                        </span>
                        {DIFFICULTY[c.difficulty - 1]}
                      </span>
                      {rec && (
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                          <IconCoracaoDigital filled /> {rec.stars}/5
                        </span>
                      )}
                      {save && !rec && (
                        <span className="font-semibold">Continuar · {minutes(save.elapsedMs)} min jogados</span>
                      )}
                    </div>

                    {/* carimbo de situação, batido no canto da pasta */}
                    {(rec || save) && (
                      <span className={`stamp shrink-0 text-xs ${rec ? "text-ok" : "text-danger"}`}>
                        {rec ? "Resolvido" : "Em aberto"}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
