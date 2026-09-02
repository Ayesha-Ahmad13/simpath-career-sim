import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Beaker,
  Brain,
  Compass,
  Flame,
  Gamepad2,
  Lightbulb,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { HeroJourney } from "@/components/hero-journey";
import { careerIcon } from "@/components/career-icon";
import { featuredCareers } from "@/data/careers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SimPath — Experience Your Future Before You Choose It" },
      {
        name: "description",
        content:
          "Explore careers through AI-powered simulations, discover your strengths, and find the career path that's right for you.",
      },
      { property: "og:title", content: "SimPath — Experience Your Future Before You Choose It" },
      {
        property: "og:description",
        content: "A flight simulator, but for careers. Discover, experience, perform, decide.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Explore careers based on your interests, skills, and personality.",
    icon: Compass,
  },
  {
    n: "02",
    title: "Experience",
    body: "Enter realistic interactive career simulations.",
    icon: Gamepad2,
  },
  {
    n: "03",
    title: "Decide",
    body: "Use your performance and AI insights to make a confident career decision.",
    icon: Target,
  },
];

const badges = [
  { icon: Trophy, label: "First Simulation", tone: "text-warning" },
  { icon: Brain, label: "Problem Solver", tone: "text-primary" },
  { icon: Lightbulb, label: "Creative Thinker", tone: "text-violet" },
  { icon: Target, label: "Career Explorer", tone: "text-success" },
];

const labs = [
  { name: "Medical Lab", icon: Beaker },
  { name: "AI Lab", icon: Brain },
  { name: "Cybersecurity Lab", icon: Shield },
  { name: "Engineering Lab", icon: Award },
];

function Landing() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-soft blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24 lg:px-8">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Career Simulation Platform
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Experience Your Future{" "}
              <span className="text-gradient">Before You Choose It.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore careers through AI-powered simulations, discover your strengths, and find the
              career path that&apos;s right for you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-ai px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Explore Careers
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { k: "20+", v: "Careers mapped" },
                { k: "5", v: "Live simulations" },
                { k: "6", v: "Skills profiled" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl font-extrabold text-foreground">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise lg:animate-float">
            <HeroJourney />
          </div>
        </div>
      </section>

      {/* TRUST / VALUE */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
              Explore. <span className="text-gradient">Experience.</span> Decide.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Most students choose a career by reading about it. SimPath lets them live a day inside
              it — making the same calls a real doctor, engineer, lawyer or founder makes, and seeing
              exactly how they perform before committing years of their life.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How SimPath works"
          title="A career decision, in three moves"
          subtitle="No quizzes that guess. A loop that measures."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="card-hover relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <span className="font-display text-5xl font-extrabold text-muted/70">{s.n}</span>
                <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ai text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED SIMULATIONS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured simulations"
            title="Step inside the job"
            subtitle="Real scenarios, real trade-offs, instant feedback."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCareers.map((c) => {
              const Icon = careerIcon(c.id);
              return (
                <Link
                  key={c.id}
                  to="/simulations/$careerId"
                  params={{ careerId: c.id }}
                  className="card-hover group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">{c.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{c.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Enter Simulation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GAMIFICATION */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Progress that means something"
              title="Career levels, XP and evidence"
              subtitle="Every simulation you complete builds a measurable profile — not a personality label."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="card-hover flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
                  >
                    <Icon className={`h-5 w-5 ${b.tone}`} />
                    <span className="text-sm font-semibold text-foreground">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Career Level
                </p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  Level 4 · Explorer
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5 text-xs font-bold text-warning">
                <Flame className="h-3.5 w-3.5" /> 6-day streak
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "XP to Level 5", value: 72, note: "2,880 / 4,000 XP" },
                { label: "Careers explored", value: 35, note: "7 of 20" },
                { label: "Simulations completed", value: 80, note: "4 of 5" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{row.label}</span>
                    <span className="text-muted-foreground">{row.note}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-ai transition-all duration-700"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coming soon"
            title="Where SimPath is heading"
            subtitle="Deeper environments and shared simulations."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {labs.map((l) => {
              const Icon = l.icon;
              return (
                <div
                  key={l.name}
                  className="card-hover relative overflow-hidden rounded-2xl border border-dashed border-primary/25 bg-card p-6"
                >
                  <span className="absolute right-4 top-4 rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet">
                    Soon
                  </span>
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-display text-base font-bold text-foreground">{l.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Hands-on AI laboratory environment.
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-violet/30 bg-card p-7">
            <div className="flex flex-wrap items-center gap-3">
              <Users className="h-5 w-5 text-violet" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Multiplayer Career Simulations
              </h3>
              <span className="rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet">
                Soon
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Run a company together — as CEO, Marketing Manager, Finance Manager and Product Manager
              — inside one shared simulation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["CEO", "Marketing Manager", "Finance Manager", "Product Manager"].map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-ai px-6 py-14 text-center shadow-glow sm:px-12">
          <h2 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Don&apos;t just choose your career.
          </h2>
          <p className="mt-2 font-display text-3xl font-extrabold text-primary-foreground/80 sm:text-4xl">
            Experience it first.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Take the assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/simulations"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Browse simulations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}
