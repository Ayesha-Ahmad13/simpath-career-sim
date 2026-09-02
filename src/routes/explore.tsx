import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { CareerCard } from "@/components/career-card";
import { careers, categories, featuredCareers, type CategoryId } from "@/data/careers";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Careers — SimPath" },
      {
        name: "description",
        content:
          "Browse 20+ careers across medicine, technology, business, law and the creative industries, with skills, difficulty and live simulations.",
      },
      { property: "og:title", content: "Explore Careers — SimPath" },
      {
        property: "og:description",
        content: "Search and filter careers, then step into a simulation instead of just reading about it.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return careers.filter((c) => {
      const inCategory = category === "all" || c.category === category;
      const inQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [query, category]);

  const grouped = categories
    .map((cat) => ({ cat, items: results.filter((c) => c.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Career explorer</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
          Find the career worth <span className="text-gradient">experiencing</span>.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Filter by field, scan the skills that actually matter, and jump straight into a simulation.
        </p>
      </header>

      {/* Featured */}
      <section className="mt-12">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet" />
          <h2 className="font-display text-lg font-bold text-foreground">Featured careers</h2>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCareers.map((c) => (
            <CareerCard key={c.id} career={c} />
          ))}
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-16 z-30 mt-14 -mx-4 border-y border-border glass px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search careers or skills…"
              className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No careers match &ldquo;{query}&rdquo;. Try a different search.
        </p>
      ) : (
        grouped.map(({ cat, items }) => (
          <section key={cat.id} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-xl font-bold text-foreground">{cat.label}</h2>
              <span className="text-sm text-muted-foreground">{cat.blurb}</span>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((c) => (
                <CareerCard key={c.id} career={c} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
        active
          ? "border-transparent bg-gradient-ai text-primary-foreground shadow-glow"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
