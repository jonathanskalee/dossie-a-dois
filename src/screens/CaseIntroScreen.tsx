import { useGame } from "../store/gameStore";
import { BigButton, RoleBadge } from "../components/ui";

export function CaseIntroScreen() {
  const c = useGame((s) => s.caseData);
  const startInvestigation = useGame((s) => s.startInvestigation);
  const abandonCase = useGame((s) => s.abandonCase);
  const resuming = useGame((s) => s.foundContradictions.length > 0 || s.readInterviews.size > 0 || s.viewedEvidence.size > 0);
  if (!c) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6 pb-[calc(24px+env(safe-area-inset-bottom))] pt-10">
      <div className="anim-fade-up text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Dossiê nº {c.id.slice(4, 6)}</p>
        <h1 className="theme-title mt-2 font-display text-5xl font-semibold text-fg">{c.title}</h1>
        <p className="mt-2 text-lg text-muted">{c.tagline}</p>
      </div>

      <section className="dossier anim-fade-up mt-8 p-6" style={{ animationDelay: "120ms" }}>
        <p className="text-lg leading-relaxed">{c.briefing.shared}</p>
      </section>

      <section className="anim-fade-up mt-6 grid gap-4 sm:grid-cols-2" style={{ animationDelay: "220ms" }}>
        <div className="panel p-5">
          <RoleBadge role="detective" />
          <p className="mt-3 text-fg/90">{c.briefing.detective}</p>
        </div>
        <div className="panel p-5">
          <RoleBadge role="perito" />
          <p className="mt-3 text-fg/90">{c.briefing.perito}</p>
        </div>
      </section>

      <div className="anim-fade-up mt-8 flex flex-col gap-3" style={{ animationDelay: "320ms" }}>
        <p className="text-center text-muted">
          Decidam agora: quem interroga e quem examina. O tablet vai passar de mão em mão.
        </p>
        <BigButton onClick={startInvestigation} className="w-full">
          {resuming ? "Retomar a investigação" : "Começar a investigação"}
        </BigButton>
        <BigButton onClick={abandonCase} variant="ghost" className="w-full">
          Voltar ao arquivo
        </BigButton>
      </div>
    </main>
  );
}
