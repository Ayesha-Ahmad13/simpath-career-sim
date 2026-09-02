import { Link } from "@tanstack/react-router";
import { ArrowRight, Gauge } from "lucide-react";
import { difficultyTone, type Career } from "@/data/careers";
import { careerIcon } from "@/components/career-icon";

export function CareerCard({ career }: { career: Career }) {
  const Icon = careerIcon(career.id);
  return (
    <article className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/15">
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${difficultyTone[career.difficulty]}`}
        >
          {career.difficulty}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{career.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{career.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {career.skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Gauge className="h-3.5 w-3.5" />
        <span>Match potential</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-ai" style={{ width: `${career.matchScore}%` }} />
        </div>
        <span className="font-semibold text-foreground">{career.matchScore}%</span>
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        {career.simulation ? (
          <Link
            to="/simulations/$careerId"
            params={{ careerId: career.id }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-violet"
          >
            Try Simulation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            Simulation coming soon
          </span>
        )}
      </div>
    </article>
  );
}
