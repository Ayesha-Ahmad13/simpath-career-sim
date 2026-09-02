import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { careerIcon } from "@/components/career-icon";
import { ScoreRing } from "@/components/score-ring";
import { careers, getCareer } from "@/data/careers";
import { getSimulation } from "@/data/simulations";
import { loadRun, type SimRun } from "@/lib/sim-store";

export const Route = createFileRoute("/results/$careerId")({
  loader: ({ params }) => {
    if (!getSimulation(params.careerId)) throw notFound();
    return { careerId: params.careerId };
  },
  head: ({ params }) => {
    const career = getCareer(params.careerId);
    const title = `${career?.name ?? "Simulation"} Results — SimPath`;
    const description = `Your simulation score, skill breakdown and AI feedback for the ${career?.name ?? "career"} scenario.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Results,
});

function Results() {
  const { careerId } = Route.useLoaderData();
  const sim = getSimulation(careerId)!;
  const career = getCareer(careerId)!;
  const Icon = careerIcon(careerId);

  const [run, setRun] = useState<SimRun | null>(null);
  useEffect(() => setRun(loadRun(careerId)), [careerId]);

  const scored = run ? Math.round((run.score / run.maxScore) * 100) : 84;
  const fit = scored >= 80 ? "Strong Match" : scored >= 60 ? "Promising Match" : "Exploratory Match";

  const skills = sim.skills.map((s) => ({
    name: s.name,
    value: Math.max(45, Math.min(99, Math.round(s.base * (0.72 + scored / 300)))),
  }));

  const similar = careers
    .filter((c) => c.category === career.category && c.id !== career.id)
    .slice(0, 3);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3.5 py-1.5 text-xs font-bold text-success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Simulation Complete
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            {sim.title} <span className="text-gradient">debrief</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {run
              ? `${run.decisions.length} decisions recorded · ${career.name}`
              : "Showing a sample debrief — run the simulation for your own score."}
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Score */}
          <section className="rounded-2xl border border-border bg-card p-7 text-center shadow-soft">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ai text-primary-foreground shadow-glow">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Your score
            </p>
            <div className="mt-4 flex justify-center">
              <ScoreRing value={scored} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Career fit
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-gradient">{fit}</p>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Skill breakdown</h2>
            <div className="mt-6 space-y-5">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="font-display font-extrabold text-foreground">{s.value}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-ai transition-[width] duration-1000 ease-out"
                      style={{ width: `${s.value}%`, transitionDelay: `${i * 120}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* AI feedback */}
        <section className="mt-5 rounded-2xl border border-primary/20 bg-gradient-soft p-7">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet" />
            <h2 className="font-display text-lg font-bold text-foreground">AI Feedback</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground">
            {sim.feedback.summary}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-success">
                What you did well
              </h3>
              <ul className="mt-3 space-y-2">
                {sim.feedback.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-warning">
                Areas to improve
              </h3>
              <ul className="mt-3 space-y-2">
                {sim.feedback.improve.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Decisions */}
        {run && run.decisions.length > 0 && (
          <section className="mt-5 rounded-2xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Decision review</h2>
            <ol className="mt-5 space-y-4">
              {run.decisions.map((d, i) => (
                <li key={i} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
                      {d.scenario}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground">
                      {d.quality}
                    </span>
                    <span className="text-[11px] font-bold text-foreground">+{d.points} pts</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">{d.choice}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.response}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Similar careers */}
        {similar.length > 0 && (
          <section className="mt-5 rounded-2xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Explore similar careers</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {similar.map((c) => (
                <Link
                  key={c.id}
                  to="/explore"
                  className="card-hover rounded-xl border border-border bg-surface p-4"
                >
                  <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/simulations/$careerId"
            params={{ careerId }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Explore Similar Careers
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-ai px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            View My Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
