import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { careerIcon } from "@/components/career-icon";
import { careers, type CategoryId } from "@/data/careers";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Career Assessment — SimPath" },
      {
        name: "description",
        content:
          "Answer 12 interactive questions about your interests, skills and working style to see your top career matches with compatibility scores.",
      },
      { property: "og:title", content: "Career Assessment — SimPath" },
      { property: "og:description", content: "Discover where you belong — in about three minutes." },
    ],
  }),
  component: Assessment,
});

type Weights = Partial<Record<CategoryId, number>>;

const questions: { q: string; hint: string; options: { label: string; w: Weights }[] }[] = [
  {
    q: "Which subject do you lose track of time in?",
    hint: "Interests",
    options: [
      { label: "Biology & human body", w: { medicine: 3 } },
      { label: "Maths & computing", w: { technology: 3 } },
      { label: "Economics & markets", w: { business: 3 } },
      { label: "History, law & society", w: { law: 3 } },
    ],
  },
  {
    q: "A friend describes you as…",
    hint: "Personality",
    options: [
      { label: "Calm in a crisis", w: { medicine: 2, law: 1 } },
      { label: "Endlessly curious", w: { technology: 2, creative: 1 } },
      { label: "Persuasive and driven", w: { business: 3 } },
      { label: "Imaginative", w: { creative: 3 } },
    ],
  },
  {
    q: "Which problem sounds most satisfying to solve?",
    hint: "Problem solving",
    options: [
      { label: "Why is this patient deteriorating?", w: { medicine: 3 } },
      { label: "Why is this system slow?", w: { technology: 3 } },
      { label: "Why did revenue drop 12%?", w: { business: 3 } },
      { label: "Why doesn't this design communicate?", w: { creative: 3 } },
    ],
  },
  {
    q: "How do you prefer to work?",
    hint: "Work preferences",
    options: [
      { label: "Hands-on with people all day", w: { medicine: 2, law: 1 } },
      { label: "Deep focus, few interruptions", w: { technology: 3 } },
      { label: "Fast-moving, lots of meetings", w: { business: 3 } },
      { label: "Flexible, project-based", w: { creative: 3 } },
    ],
  },
  {
    q: "What kind of pressure suits you?",
    hint: "Resilience",
    options: [
      { label: "Life-or-death, right now", w: { medicine: 3 } },
      { label: "A production incident at 2am", w: { technology: 3 } },
      { label: "A quarter-end target", w: { business: 3 } },
      { label: "A courtroom deadline", w: { law: 3 } },
    ],
  },
  {
    q: "Pick the skill you most want to master.",
    hint: "Skills",
    options: [
      { label: "Diagnosis and clinical judgement", w: { medicine: 3 } },
      { label: "Building intelligent systems", w: { technology: 3 } },
      { label: "Negotiation and strategy", w: { business: 3 } },
      { label: "Visual and narrative craft", w: { creative: 3 } },
    ],
  },
  {
    q: "How important is creative freedom to you?",
    hint: "Creativity",
    options: [
      { label: "Essential — I need to make things", w: { creative: 3 } },
      { label: "Important, within technical limits", w: { technology: 2, creative: 1 } },
      { label: "Useful for strategy", w: { business: 2 } },
      { label: "Structure matters more", w: { medicine: 2, law: 2 } },
    ],
  },
  {
    q: "In a group project you usually…",
    hint: "Leadership",
    options: [
      { label: "Set direction and delegate", w: { business: 3 } },
      { label: "Own the hardest technical part", w: { technology: 3 } },
      { label: "Keep everyone heard and supported", w: { law: 2, medicine: 1 } },
      { label: "Shape how the work is presented", w: { creative: 3 } },
    ],
  },
  {
    q: "Which conversation energises you?",
    hint: "Communication",
    options: [
      { label: "Explaining something difficult to someone anxious", w: { medicine: 3 } },
      { label: "Debating a position with evidence", w: { law: 3 } },
      { label: "Pitching an idea to a room", w: { business: 3 } },
      { label: "Critiquing work to make it better", w: { creative: 3 } },
    ],
  },
  {
    q: "What does a great outcome look like?",
    hint: "Values",
    options: [
      { label: "Someone is healthier because of me", w: { medicine: 3 } },
      { label: "Something I built is used by millions", w: { technology: 3 } },
      { label: "A business I grew is thriving", w: { business: 3 } },
      { label: "Someone got justice or support", w: { law: 3 } },
    ],
  },
  {
    q: "How much study are you prepared for?",
    hint: "Commitment",
    options: [
      { label: "8+ years, no problem", w: { medicine: 3, law: 1 } },
      { label: "4 years then learn on the job", w: { technology: 3, business: 1 } },
      { label: "Whatever gets me building fastest", w: { business: 2, creative: 2 } },
      { label: "Mostly self-taught with a portfolio", w: { creative: 3 } },
    ],
  },
  {
    q: "Choose your ideal Monday.",
    hint: "Environment",
    options: [
      { label: "Hospital ward round", w: { medicine: 3 } },
      { label: "Sprint planning and code", w: { technology: 3 } },
      { label: "Client meetings and numbers", w: { business: 3 } },
      { label: "Studio, sketching concepts", w: { creative: 3 } },
    ],
  },
];

function Assessment() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [done, setDone] = useState(false);

  const current = questions[index]!;
  const chosen = answers[index];
  const progress = ((index + (chosen !== null ? 1 : 0)) / questions.length) * 100;

  function select(i: number) {
    setAnswers((prev) => prev.map((a, idx) => (idx === index ? i : a)));
  }

  function next() {
    if (chosen === null) return;
    if (index === questions.length - 1) setDone(true);
    else setIndex((i) => i + 1);
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setDone(false);
  }

  if (done) {
    const totals: Record<string, number> = {};
    answers.forEach((a, qi) => {
      if (a === null) return;
      const w = questions[qi]!.options[a]!.w;
      (Object.keys(w) as CategoryId[]).forEach((k) => {
        totals[k] = (totals[k] ?? 0) + (w[k] ?? 0);
      });
    });
    const max = Math.max(1, ...Object.values(totals));

    const matches = careers
      .map((c) => {
        const affinity = (totals[c.category] ?? 0) / max;
        return { career: c, pct: Math.round(Math.min(98, 42 + affinity * 45 + c.matchScore * 0.12)) };
      })
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5);

    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/10 px-3.5 py-1.5 text-xs font-bold text-violet">
            <Sparkles className="h-3.5 w-3.5" /> Assessment complete
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            Your Top <span className="text-gradient">Career Matches</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Based on {questions.length} answers about your interests, skills and working style.
          </p>
        </header>

        <ol className="mt-10 space-y-4">
          {matches.map((m, i) => {
            const Icon = careerIcon(m.career.id);
            return (
              <li
                key={m.career.id}
                className="card-hover rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-display text-2xl font-extrabold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-[9rem] flex-1">
                    <p className="font-display text-lg font-bold text-foreground">{m.career.name}</p>
                    <p className="text-xs text-muted-foreground">{m.career.tagline}</p>
                  </div>
                  <div className="w-full sm:w-56">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Compatibility</span>
                      <span className="font-display font-extrabold text-foreground">{m.pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-ai transition-[width] duration-1000"
                        style={{ width: `${m.pct}%`, transitionDelay: `${i * 100}ms` }}
                      />
                    </div>
                  </div>
                  {m.career.simulation && (
                    <Link
                      to="/simulations/$careerId"
                      params={{ careerId: m.career.id }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-ai px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow"
                    >
                      Try Simulation <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" /> Retake assessment
          </button>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-ai px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            View my dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Career assessment</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            Discover Where <span className="text-gradient">You Belong.</span>
          </h1>
        </header>

        <div className="mt-10 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-ai transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section key={index} className="animate-rise mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
          <p className="text-[11px] font-bold uppercase tracking-wide text-violet">{current.hint}</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold leading-snug text-foreground">
            {current.q}
          </h2>

          <div className="mt-6 grid gap-3">
            {current.options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                onClick={() => select(i)}
                className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                  chosen === i
                    ? "border-primary bg-primary/5 text-foreground shadow-glow"
                    : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary/45"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              disabled={chosen === null}
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-ai px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {index === questions.length - 1 ? "See my matches" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
