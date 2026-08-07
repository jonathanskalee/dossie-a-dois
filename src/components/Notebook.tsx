/**
 * O caderno do caso — sobreposto, não tela nova.
 *
 * Tela nova quebraria a invariante de que toda troca de tela entre papéis passa
 * pelo handoff, e obrigaria todas as guardas de `screen` do store a tratar "e
 * se o caderno estiver por cima". O modal de revelação da Mesa já é assim.
 *
 * Só mostra o que a dupla descobriu JUNTA na Mesa, então pode ficar disponível
 * também nas telas de papel: não há o que vazar.
 */
import { useState } from "react";
import { useGame } from "../store/gameStore";
import { buildNotebook } from "../store/notebook";
import { BigButton } from "./ui";
import { IconDestrancado, IconRaio, IconX } from "./icons";

export function Notebook() {
  const open = useGame((s) => s.notebookOpen);
  const close = useGame((s) => s.closeNotebook);
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const foundContradictions = useGame((s) => s.foundContradictions);
  const wrongPairs = useGame((s) => s.wrongPairs);
  const readInterviews = useGame((s) => s.readInterviews);
  const viewedEvidence = useGame((s) => s.viewedEvidence);
  const hintPoints = useGame((s) => s.hintPoints);
  const [verBecos, setVerBecos] = useState(false);

  if (!open || !c) return null;

  const n = buildNotebook(c, {
    unlockedLeads,
    foundContradictions,
    wrongPairs,
    readInterviews,
    viewedEvidence,
    hintPoints,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Caderno do caso"
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 p-4 sm:p-6"
    >
      <div className="dossier anim-pop flex max-h-[86dvh] w-full max-w-lg flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-3 p-5 pb-3">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.28em] opacity-55">Caderno do caso</p>
            <p className="tabular mt-1 text-sm opacity-70">
              {n.counts.found} de {n.counts.total} contradições · {n.counts.leads} de {n.counts.totalLeads} pistas
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar o caderno"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/25"
          >
            <IconX />
          </button>
        </header>

        <div className="hairline mx-5" />

        <div className="flex-1 overflow-y-auto p-5">
          {n.entries.length === 0 && n.orphanLeads.length === 0 && (
            <p className="py-6 text-center leading-relaxed opacity-70">
              O caderno ainda está em branco.
              <br />
              Cruzem uma fala com uma prova na Mesa.
            </p>
          )}

          <ul className="flex flex-col gap-6">
            {n.entries.map((e, i) => (
              <li key={e.contradictionId}>
                <p className="font-display text-xs uppercase tracking-[0.24em] opacity-50">
                  Contradição {i + 1}
                </p>
                {/* mesma faixa "fala ⚡ prova" que a Mesa mostra ao registrar */}
                {/* o texto usa `ink` (a cor do papel), não `accent`/`accent2`:
                    sobre papel claro o cinza do noir some. A cor fica só no
                    fundo, que é o que codifica fala × prova. */}
                <div className="mt-2 flex items-center gap-2 text-xs leading-tight text-ink">
                  <span className="flex-1 rounded-lg bg-accent/20 px-2.5 py-1.5">{e.claimSummary}</span>
                  <IconRaio className="size-5 shrink-0 text-danger" />
                  <span className="flex-1 rounded-lg bg-accent2/25 px-2.5 py-1.5">{e.factSummary}</span>
                </div>
                <p className="mt-3 leading-relaxed">{e.explanation}</p>
                {e.leads.length > 0 && (
                  <div className="mt-3 rounded-xl bg-ink/10 p-3">
                    {e.leads.map((l) => (
                      <div key={l.id} className="[&+div]:mt-3">
                        <p className="flex items-center gap-2 font-semibold">
                          <IconDestrancado /> {l.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed opacity-80">{l.narration}</p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {n.orphanLeads.length > 0 && (
              <li>
                <p className="font-display text-xs uppercase tracking-[0.24em] opacity-50">Outras pistas</p>
                <div className="mt-2 rounded-xl bg-ink/10 p-3">
                  {n.orphanLeads.map((l) => (
                    <div key={l.id} className="[&+div]:mt-3">
                      <p className="flex items-center gap-2 font-semibold">
                        <IconDestrancado /> {l.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed opacity-80">{l.narration}</p>
                    </div>
                  ))}
                </div>
              </li>
            )}
          </ul>

          {n.deadEnds.length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setVerBecos(!verBecos)}
                aria-expanded={verBecos}
                className="w-full rounded-xl border border-ink/20 p-3 text-sm opacity-70"
              >
                {verBecos ? "Esconder" : "Ver"} os {n.deadEnds.length}{" "}
                {n.deadEnds.length === 1 ? "par já descartado" : "pares já descartados"}
              </button>
              {verBecos && (
                <ul className="mt-3 flex flex-col gap-2 text-sm opacity-70">
                  {n.deadEnds.map((d, i) => (
                    <li key={i} className="leading-snug">
                      {d.claimSummary} <span className="opacity-60">×</span> {d.factSummary}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="p-5 pt-3">
          <BigButton onClick={close} className="w-full">
            Voltar
          </BigButton>
        </div>
      </div>
    </div>
  );
}
