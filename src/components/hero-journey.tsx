import { useEffect, useState } from "react";
import { Brain, Compass, Gamepad2, Target } from "lucide-react";

const stages = [
  { label: "Discover", icon: Compass, detail: "12 careers matched" },
  { label: "Experience", icon: Gamepad2, detail: "Scenario 03 of 04" },
  { label: "Perform", icon: Brain, detail: "Score 84 / 100" },
  { label: "Decide", icon: Target, detail: "AI Engineer · Strong match" },
];

const paths = ["Medicine", "Technology", "Business", "Law", "Creative"];

/** Animated visual: many career paths converging into one personalised path. */
export function HeroJourney() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7">
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-soft" aria-hidden="true" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping-ring" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Live career journey
            </span>
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
            AI Engine v2
          </span>
        </div>

        {/* Converging paths */}
        <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="flex flex-col gap-2">
            {paths.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>

          <svg viewBox="0 0 240 180" className="h-[180px] w-full" aria-hidden="true">
            <defs>
              <linearGradient id="sp-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--violet)" stopOpacity="1" />
              </linearGradient>
            </defs>
            {[18, 54, 90, 126, 162].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} C 90 ${y}, 110 90, 200 90`}
                fill="none"
                stroke="url(#sp-line)"
                strokeWidth={i === 1 ? 2.6 : 1.4}
                className="animate-dash"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            ))}
            <circle cx="200" cy="90" r="9" fill="var(--violet)" opacity="0.18" />
            <circle cx="200" cy="90" r="5" fill="var(--violet)" />
          </svg>
        </div>

        {/* Stage pipeline */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const on = i <= active;
            return (
              <div
                key={s.label}
                className={`rounded-xl border p-3 transition-all duration-500 ${
                  on
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-background opacity-60"
                }`}
              >
                <Icon className={`h-4 w-4 ${on ? "text-primary" : "text-muted-foreground"}`} />
                <p className="mt-2 text-xs font-bold text-foreground">{s.label}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-ai transition-[width] duration-700 ease-out"
            style={{ width: `${((active + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
