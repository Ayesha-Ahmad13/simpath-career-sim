import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            SimPath lets students experience careers through AI-powered simulations before they commit
            years of their life to one. Don&apos;t just choose your career — experience it first.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-foreground">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/explore" className="transition-colors hover:text-primary">Explore Careers</Link></li>
            <li><Link to="/simulations" className="transition-colors hover:text-primary">Simulations</Link></li>
            <li><Link to="/assessment" className="transition-colors hover:text-primary">Career Assessment</Link></li>
            <li><Link to="/compare" className="transition-colors hover:text-primary">Compare Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-foreground">Experience</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/mentor" className="transition-colors hover:text-primary">AI Mentor</Link></li>
            <li><Link to="/dashboard" className="transition-colors hover:text-primary">Student Dashboard</Link></li>
            <li><Link to="/simulations" className="transition-colors hover:text-primary">Featured Simulations</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SimPath. Prototype build.</p>
          <p>Discover → Experience → Perform → Decide</p>
        </div>
      </div>
    </footer>
  );
}
