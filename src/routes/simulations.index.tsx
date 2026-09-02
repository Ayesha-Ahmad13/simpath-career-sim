import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Layers } from "lucide-react";
import { careerIcon } from "@/components/career-icon";
import { careers, difficultyTone } from "@/data/careers";
import { availableSimulationIds, getSimulation } from "@/data/simulations";

export const Route = createFileRoute("/simulations/")({
  head: () => ({
    meta: [
      { title: "Career Simulations — SimPath" },
      {
        name: "description",
        content:
          "Enter interactive career simulations for doctor, AI engineer, lawyer, entrepreneur and software engineer roles, and get scored on every decision.",
      },
      { property: "og:title", content: "Career Simulations — SimPath" },
      {
        property: "og:description",
        content: "A flight simulator, but for careers. Make the calls, see the consequences.",
      },
    ],
  }),
  component: SimulationsIndex,
});

function SimulationsIndex() {
  const sims = availableSimulationIds
    .map((id) => ({ sim: getSimulation(id)!, career: careers.find((c) => c.id === id)! }))
    .filter((s) => s.career);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Simulations</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
          Enter the job. <span className="text-gradient">Make the calls.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Each simulation puts you inside a real professional moment. Every decision is scored against
          how experienced practitioners actually behave.
        </p>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sims.map(({ sim, career }) => {
          const Icon = careerIcon(career.id);
          return (
            <Link
              key={career.id}
              to="/simulations/$careerId"
              params={{ careerId: career.id }}
              className="card-hover group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ai text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${difficultyTone[career.difficulty]}`}
                >
                  {career.difficulty}
                </span>
              </div>

              <h2 className="mt-5 font-display text-xl font-bold text-foreground">{sim.title}</h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">
                {sim.role}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{sim.intro}</p>

              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> {sim.scenarios.length} scenarios
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> ~{sim.scenarios.length * 2} min
                </span>
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-primary">
                Enter Simulation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
