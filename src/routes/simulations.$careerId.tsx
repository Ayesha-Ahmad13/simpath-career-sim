import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, CircleDot, LogOut, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { careerIcon } from "@/components/career-icon";
import { getCareer } from "@/data/careers";
import { getSimulation, type SimOption } from "@/data/simulations";
import { saveRun, type SimRunDecision } from "@/lib/sim-store";

export const Route = createFileRoute("/simulations/$careerId")({
  loader: ({ params }) => {
    const sim = getSimulation(params.careerId);
    if (!sim) throw notFound();
    return { careerId: params.careerId };
  },
  head: ({ params }) => {
    const career = getCareer(params.careerId);
    const title = `${career?.name ?? "Career"} Simulation — SimPath`;
    const description = `Step into a ${career?.name ?? "career"} scenario, make real decisions and get scored instantly.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SimulationRunner,
});

const qualityTone: Record<SimOption["quality"], string> = {
  optimal: "border-success/30 bg-success/10 text-success",
  acceptable: "border-primary/30 bg-primary/10 text-primary",
  suboptimal: "border-warning/30 bg-warning/10 text-warning",
};

function SimulationRunner() {
  const { careerId } = Route.useLoaderData();
  const navigate = useNavigate();
  const sim = getSimulation(careerId)!;
  const career = getCareer(careerId)!;
  const Icon = careerIcon(careerId);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<SimOption | null>(null);
  const [decisions, setDecisions] = useState<SimRunDecision[]>([]);

  const scenario = sim.scenarios[index];
  const maxScore = sim.scenarios.length * 25;
  const score = decisions.reduce((t, d) => t + d.points, 0);
  const progress = (index / sim.scenarios.length) * 100;
  const isLast = index === sim.scenarios.length - 1;

  function choose(option: SimOption) {
    if (selected) return;
    setSelected(option);
    setDecisions((d) => [
      ...d,
      {
        scenario: scenario.title,
        choice: option.label,
        response: option.response,
        points: option.points,
        quality: option.quality,
      },
    ]);
  }

  function next() {
    if (!selected) return;
    if (isLast) {
      saveRun({
        careerId,
        score: score,
        maxScore,
        decisions,
        completedAt: Date.now(),
      });
      navigate({ to: "/results/$careerId", params: { careerId } });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HUD */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-ai text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-display text-lg font-extrabold text-foreground">{sim.title}</h1>
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{sim.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-border bg-background px-3.5 py-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Score
                </p>
                <p className="font-display text-base font-extrabold text-foreground">
                  {score}
                  <span className="text-muted-foreground">/{maxScore}</span>
                </p>
              </div>
              <Link
                to="/simulations"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" /> Exit Simulation
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
              <span>
                {scenario.title} of {String(sim.scenarios.length).padStart(2, "0")}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-ai transition-[width] duration-500 ease-out"
                style={{ width: `${selected ? ((index + 1) / sim.scenarios.length) * 100 : progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          {/* Scenario */}
          <div key={scenario.id} className="animate-rise space-y-5">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-violet">
                <CircleDot className="h-3 w-3" /> {scenario.title}
              </span>
              <p className="mt-4 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
                {scenario.brief}
              </p>

              <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Mission</p>
                <p className="mt-1.5 text-sm text-foreground">{scenario.mission}</p>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Your decision
              </h2>
              <div className="mt-4 grid gap-2.5">
                {scenario.options.map((o) => {
                  const chosen = selected?.id === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={!!selected}
                      onClick={() => choose(o)}
                      className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                        chosen
                          ? "border-primary bg-primary/5 shadow-glow"
                          : selected
                            ? "border-border bg-background opacity-50"
                            : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-glow"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold uppercase ${
                          chosen
                            ? "bg-gradient-ai text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {chosen ? <Check className="h-3.5 w-3.5" /> : o.id}
                      </span>
                      <span className="text-sm font-medium text-foreground">{o.label}</span>
                    </button>
                  );
                })}
              </div>

              {selected && (
                <div className="animate-rise mt-5 rounded-xl border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-ai px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      <Sparkles className="h-3 w-3" /> Simulated outcome
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${qualityTone[selected.quality]}`}
                    >
                      {selected.quality}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-foreground">
                      <Trophy className="h-3 w-3 text-warning" /> +{selected.points} pts
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{selected.response}</p>

                  <button
                    type="button"
                    onClick={next}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-ai px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                  >
                    {isLast ? "Finish & see results" : "Continue"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Side rail */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-sm font-bold text-foreground">
                {scenario.contextTitle}
              </h2>
              <dl className="mt-4 space-y-3">
                {scenario.context.map((c) => (
                  <div key={c.label} className="rounded-xl bg-surface p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-sm text-foreground">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-sm font-bold text-foreground">Decision history</h2>
              {decisions.length === 0 ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Your choices will appear here as you progress.
                </p>
              ) : (
                <ol className="mt-4 space-y-3">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-l-2 border-primary/30 pl-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        {d.scenario} · +{d.points}
                      </p>
                      <p className="mt-0.5 text-xs text-foreground">{d.choice}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <div className="rounded-2xl border border-dashed border-primary/25 bg-card p-5">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Prototype notice: responses are realistic mock outcomes written with domain reference,
                not live AI output. The interface is built to plug into a real model later.
              </p>
              <p className="mt-3 text-xs font-semibold text-foreground">
                Exploring: {career.name}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
