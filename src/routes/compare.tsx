import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { careerIcon } from "@/components/career-icon";
import { careers, type Career } from "@/data/careers";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Careers — SimPath" },
      {
        name: "description",
        content:
          "Put two or three careers side by side: skills, responsibilities, education, work environment, growth and simulation compatibility.",
      },
      { property: "og:title", content: "Compare Careers — SimPath" },
      { property: "og:description", content: "AI Engineer vs Cybersecurity Analyst — and any other pair you like." },
    ],
  }),
  component: Compare,
});

const rows: { label: string; render: (c: Career) => React.ReactNode }[] = [
  {
    label: "Skills",
    render: (c) => (
      <div className="flex flex-wrap gap-1.5">
        {c.skills.map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Responsibilities",
    render: (c) => (
      <ul className="space-y-1.5">
        {c.responsibilities.map((r) => (
          <li key={r} className="flex gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" /> {r}
          </li>
        ))}
      </ul>
    ),
  },
  { label: "Education", render: (c) => <span className="text-sm text-foreground">{c.education}</span> },
  { label: "Work environment", render: (c) => <span className="text-sm text-foreground">{c.environment}</span> },
  { label: "Career growth", render: (c) => <span className="text-sm text-foreground">{c.growth}</span> },
  { label: "Difficulty", render: (c) => <span className="text-sm font-semibold text-foreground">{c.difficulty}</span> },
  {
    label: "Simulation score",
    render: (c) => (
      <span className="text-sm text-foreground">
        {c.simulation ? `${Math.round(c.matchScore * 0.95)} / 100 (demo run)` : "No simulation yet"}
      </span>
    ),
  },
  {
    label: "Career compatibility",
    render: (c) => (
      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Match</span>
          <span className="font-display font-extrabold text-foreground">{c.matchScore}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-ai" style={{ width: `${c.matchScore}%` }} />
        </div>
      </div>
    ),
  },
];

function Compare() {
  const [selected, setSelected] = useState<string[]>(["ai-engineer", "cybersecurity-analyst"]);
  const picked = selected.map((id) => careers.find((c) => c.id === id)!).filter(Boolean);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length >= 3 ? prev : [...prev, id],
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Compare</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
          Two futures, <span className="text-gradient">side by side.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Pick up to three careers and compare what the work actually involves.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {careers.map((c) => {
          const on = selected.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                on
                  ? "border-transparent bg-gradient-ai text-primary-foreground shadow-glow"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c.name}
              {on && <X className="h-3 w-3" />}
            </button>
          );
        })}
      </div>

      {picked.length < 2 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Select at least two careers to compare.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <div
            className="grid min-w-[720px] gap-4"
            style={{ gridTemplateColumns: `160px repeat(${picked.length}, minmax(0, 1fr))` }}
          >
            <div />
            {picked.map((c) => {
              const Icon = careerIcon(c.id);
              return (
                <div key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-ai text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-bold text-foreground">{c.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{c.tagline}</p>
                </div>
              );
            })}

            {rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="flex items-start pt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </div>
                {picked.map((c) => (
                  <div
                    key={c.id + row.label}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    {row.render(c)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
