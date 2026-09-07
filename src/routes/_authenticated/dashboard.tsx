import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Flame,
  Lightbulb,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { careerIcon } from "@/components/career-icon";
import { careers } from "@/data/careers";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — SimPath" },
      {
        name: "description",
        content:
          "Track simulations completed, average score, careers explored, your skill profile and the next step in your career journey.",
      },
      { property: "og:title", content: "Student Dashboard — SimPath" },
      { property: "og:description", content: "Your career journey, measured." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Simulations Completed", value: "4", note: "of 5 available" },
  { label: "Average Score", value: "82%", note: "+6% this month" },
  { label: "Careers Explored", value: "7", note: "across 4 fields" },
  { label: "Top Career Match", value: "AI Engineer", note: "92% compatibility" },
];

const skillProfile = [
  { skill: "Analytical", value: 92 },
  { skill: "Creativity", value: 71 },
  { skill: "Communication", value: 76 },
  { skill: "Leadership", value: 68 },
  { skill: "Problem Solving", value: 88 },
  { skill: "Technical", value: 90 },
];

const journey = [
  { title: "Assessment completed", detail: "12 questions · 3 min", done: true },
  { title: "First simulation", detail: "Doctor · scored 84", done: true },
  { title: "Three fields explored", detail: "Tech, Medicine, Business", done: true },
  { title: "Compare shortlist", detail: "AI Engineer vs Cybersecurity", done: true },
  { title: "Advanced AI Lab", detail: "Unlocks at Level 5", done: false },
];

const badges: { icon: LucideIcon; label: string; tone: string }[] = [
  { icon: Trophy, label: "First Simulation", tone: "text-warning" },
  { icon: Brain, label: "Problem Solver", tone: "text-primary" },
  { icon: Lightbulb, label: "Creative Thinker", tone: "text-violet" },
  { icon: Target, label: "Career Explorer", tone: "text-success" },
];

function Dashboard() {
  const recent = careers.filter((c) =>
    ["ai-engineer", "doctor", "ux-designer", "entrepreneur"].includes(c.id),
  );
  const recommended = careers.filter((c) =>
    ["cybersecurity-analyst", "software-engineer", "financial-analyst"].includes(c.id),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Welcome back, Ayesha 👋
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You&apos;re 1,120 XP away from Level 5 — one simulation should do it.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3.5 py-2 text-xs font-bold text-warning">
          <Flame className="h-3.5 w-3.5" /> 6-day streak
        </span>
      </header>

      {/* KPI cards */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card-hover rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-3 font-display text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* Recently explored */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-foreground">Recently explored</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {recent.map((c) => {
              const Icon = careerIcon(c.id);
              return (
                <div
                  key={c.id}
                  className="card-hover flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-soft text-primary ring-1 ring-primary/15">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-foreground">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Skill radar */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-foreground">Skill profile</h2>
          <div className="mt-2 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillProfile} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--violet)"
                  fillOpacity={0.28}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        {/* Journey */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-foreground">Career journey</h2>
          <ol className="mt-6 space-y-5">
            {journey.map((j, i) => (
              <li key={j.title} className="relative flex gap-4 pl-1">
                {i < journey.length - 1 && (
                  <span
                    className="absolute left-[13px] top-7 h-full w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                    j.done
                      ? "border-transparent bg-gradient-ai text-primary-foreground"
                      : "border-dashed border-primary/40 bg-card text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{j.title}</p>
                  <p className="text-xs text-muted-foreground">{j.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Recommended */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-foreground">Recommended for you</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Generated from your assessment profile and simulation history.
          </p>
          <div className="mt-5 space-y-3">
            {recommended.map((c) => {
              const Icon = careerIcon(c.id);
              return (
                <div
                  key={c.id}
                  className="card-hover flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-ai text-primary-foreground">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-[8rem] flex-1">
                    <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.matchScore}% compatibility</p>
                  </div>
                  {c.simulation ? (
                    <Link
                      to="/simulations/$careerId"
                      params={{ careerId: c.id }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-violet"
                    >
                      Try Simulation <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <Link to="/explore" className="text-xs font-semibold text-primary">
                      Explore
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Badges earned
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground"
                  >
                    <Icon className={`h-3.5 w-3.5 ${b.tone}`} /> {b.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
