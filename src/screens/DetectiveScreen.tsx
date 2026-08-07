import { useGame } from "../store/gameStore";
import { visibleInterviews, visibleSuspects } from "../store/progress";
import { SegmentText } from "../components/SegmentText";
import { Pill, RoleBadge, TopBar } from "../components/ui";
import { Portrait } from "../components/Portrait";
import { Notebook } from "../components/Notebook";
import { IconCaderno, IconFrasco, IconMesa } from "../components/icons";

/**
 * Rodapé fixo com as saídas do turno. Definido uma vez e usado nos três ramos
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
          onClick={() => passTo("perito")}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-2xl border border-accent2/50 px-4 font-display text-lg text-accent2 active:bg-surface"
        >
          <IconFrasco /> Passar ao Perito
        </button>
        <button
          type="button"
          onClick={() => passTo("board")}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-4 font-display text-lg text-bg shadow-[0_4px_0_rgba(0,0,0,.3)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,.3)]"
        >
          <IconMesa /> Ir para a Mesa
        </button>
      </div>
      {/* o caderno mora junto do botão que o abre: um lugar só para os 3 ramos */}
      <Notebook />
    </footer>
  );
}

export function DetectiveScreen() {
  const c = useGame((s) => s.caseData);
  const unlockedLeads = useGame((s) => s.unlockedLeads);
  const readInterviews = useGame((s) => s.readInterviews);
  const openSuspectId = useGame((s) => s.openSuspectId);
  const openInterviewId = useGame((s) => s.openInterviewId);
  const openSuspect = useGame((s) => s.openSuspect);
  const closeSuspect = useGame((s) => s.closeSuspect);
  const openInterview = useGame((s) => s.openInterview);
  const closeInterview = useGame((s) => s.closeInterview);
  if (!c) return null;

  const suspects = visibleSuspects(c, unlockedLeads);
  const suspect = suspects.find((s) => s.id === openSuspectId) ?? null;

  /* ---- depoimento aberto ---- */
  if (suspect && openInterviewId) {
    const interview = suspect.interviews.find((i) => i.id === openInterviewId);
    if (!interview) return null;
    return (
      <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
        <TopBar title={suspect.name} onBack={closeInterview} right={<RoleBadge role="detective" />} />
        {/* o depoimento é uma transcrição: pergunta datilografada, resposta em prosa */}
        <div className="dossier anim-pop mt-2 p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.28em] opacity-55">Transcrição do interrogatório</p>
          <p className="mt-3 border-l-2 border-ink/25 pl-4 text-lg font-semibold leading-snug">
            “{interview.question}”
          </p>
          <div className="hairline my-5" />
          <SegmentText segments={interview.answer} markClass="mark-claim" />
          <div className="hairline my-5" />
          <p className="text-sm leading-relaxed opacity-70">
            Os trechos <mark className="mark-claim">destacados</mark> são <strong>alegações</strong> — o que{" "}
            {suspect.name.split(" ")[0]} afirma. Conte ao seu parceiro. Se alguma prova desmentir, vocês a
            registram na Mesa.
          </p>
        </div>
        <TurnFooter />
      </main>
    );
  }

  /* ---- ficha do suspeito: escolha de pergunta ---- */
  if (suspect) {
    const interviews = visibleInterviews(c, suspect, unlockedLeads);
    return (
      <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
        <TopBar title="Interrogatório" onBack={closeSuspect} right={<RoleBadge role="detective" />} />
        {/* a ficha do suspeito: retrato, identificação e o que se sabe dele */}
        <div className="panel anim-fade-up mt-2 flex gap-5 p-5">
          <Portrait suspect={suspect} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl leading-tight text-fg">{suspect.name}</h2>
            <p className="text-muted">{suspect.role}</p>
            <p className="mt-3 leading-relaxed text-fg/90">{suspect.description}</p>
          </div>
        </div>

        <h3 className="mt-7 font-display text-sm uppercase tracking-[0.28em] text-muted">Perguntas</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {interviews.map((i) => {
            const read = readInterviews.has(`${suspect.id}:${i.id}`);
            return (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => openInterview(i.id)}
                  className={`panel w-full p-4 text-left transition active:scale-[.99] ${read ? "opacity-70" : ""}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-lg text-fg">“{i.question}”</span>
                    {read ? <Pill tone="muted">ouvida</Pill> : <Pill>nova</Pill>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <TurnFooter />
      </main>
    );
  }

  /* ---- lista de suspeitos ---- */
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-36">
      <TopBar title="Suspeitos" right={<RoleBadge role="detective" />} />
      <p className="mb-5 mt-1 text-muted">
        Interrogue, anote as alegações destacadas e <strong>conte tudo em voz alta</strong> ao seu perito.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {suspects.map((s, i) => {
          const vis = visibleInterviews(c, s, unlockedLeads);
          const readCount = vis.filter((iv) => readInterviews.has(`${s.id}:${iv.id}`)).length;
          const done = readCount === vis.length;
          return (
            <li key={s.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              {/* a ficha: a arte ocupa o topo, os dados ficam embaixo */}
              <button
                type="button"
                onClick={() => openSuspect(s.id)}
                className="panel w-full overflow-hidden text-left active:scale-[.98]"
              >
                <span className="relative block">
                  <Portrait suspect={s} size="banner" />
                  {/* a foto se dissolve no cartão em vez de terminar em corte seco */}
                  {s.portrait && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface to-transparent"
                    />
                  )}
                </span>
                <span className="block p-4">
                  <span className="block truncate font-display text-xl text-fg">{s.name}</span>
                  <span className="block truncate text-sm text-muted">{s.role}</span>
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span className="tabular text-sm text-muted">
                      {readCount} de {vis.length} perguntas feitas
                    </span>
                    {!done && <Pill>nova</Pill>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <TurnFooter />
    </main>
  );
}
