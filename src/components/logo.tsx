import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-ai shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M5 19c0-5 4-6 7-7s5-2.5 5-5"
            stroke="currentColor"
            className="text-primary-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="5" cy="19" r="2.2" className="fill-primary-foreground" />
          <circle cx="17" cy="6" r="2.2" className="fill-primary-foreground" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          Sim<span className="text-gradient">Path</span>
        </span>
      )}
    </Link>
  );
}
