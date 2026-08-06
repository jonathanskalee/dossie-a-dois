import { useGame } from "../store/gameStore";
import { visibleInterviews, visibleSuspects } from "../store/progress";
import { SegmentText } from "../components/SegmentText";
import { Pill, RoleBadge, TopBar } from "../components/ui";

/** Rodapé fixo com as saídas do turno. */
function TurnFooter() {
  const passTo = useGame((s) => s.passTo);
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-muted/20 bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-3">
        <button
          type="button"
          onClick={() => passTo("perito")}
          className="min-h-13 flex-1 rounded-2xl border border-accent2/50 px-4 font-display text-lg font-semibold text-accent2 active:bg-surface"
        >
          🔬 Passar ao Perito
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
        <div className="dossier anim-pop mt-2 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-60">Você pergunta:</p>
          <p className="mt-1 text-lg font-semibold">“{interview.question}”</p>
          <div className="hairline my-4" />
          <SegmentText segments={interview.answer} markClass="mark-claim" />
          <div className="hairline my-4" />
          <p className="text-sm opacity-70">
            Os trechos <mark className="mark-claim">destacados</mark> são <strong>alegações</strong> — o que{" "}
            {suspect.name.split(" ")[0]} AFIRMA. Conte ao seu parceiro. Se alguma prova desmentir, vocês a
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
        <div className="panel anim-fade-up mt-2 flex items-center gap-4 p-5">
          <span className="flex size-16 items-center justify-center rounded-full bg-accent/15 text-4xl" aria-hidden>
            {suspect.portraitEmoji}
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-fg">{suspect.name}</h2>
            <p className="text-muted">{suspect.role}</p>
          </div>
        </div>
        <p className="mt-4 text-fg/90">{suspect.description}</p>

        <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-wider text-muted">Perguntas</h3>
        <ul className="mt-2 flex flex-col gap-3">
          {interviews.map((i) => {
            const read = readInterviews.has(`${suspect.id}:${i.id}`);
            return (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => openInterview(i.id)}
                  className="panel w-full p-4 text-left active:scale-[.99]"
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
          return (
            <li key={s.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => openSuspect(s.id)}
                className="panel w-full p-5 text-left active:scale-[.98]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-3xl" aria-hidden>
                    {s.portraitEmoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-xl font-semibold text-fg">{s.name}</h2>
                    <p className="truncate text-sm text-muted">{s.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-muted">
                  <span>
                    {readCount}/{vis.length} perguntas feitas
                  </span>
                  {readCount < vis.length && <Pill>há perguntas novas</Pill>}
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
