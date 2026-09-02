import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "AI Mentor — SimPath" },
      {
        name: "description",
        content:
          "Chat with the SimPath AI Mentor about career choices, simulation scores and the skills worth building next.",
      },
      { property: "og:title", content: "SimPath AI Mentor" },
      { property: "og:description", content: "Your personal guide to choosing the right career." },
    ],
  }),
  component: Mentor,
});

type Msg = { role: "user" | "bot"; text: string };

const canned: { match: string[]; reply: string }[] = [
  {
    match: ["ai", "cyber", "cybersecurity", "choose between"],
    reply:
      "Both suit you, but they reward different instincts. AI Engineering rewards building and experimentation — your Analytical Thinking (90%) and Technical Skills (88%) map directly onto it. Cybersecurity rewards vigilance and pattern recognition under pressure. Your simulation history shows you moved fastest when solving open-ended problems, which leans AI. My suggestion: run the Cybersecurity Analyst simulation next and compare your decision speed against the AI Engineer run.",
  },
  {
    match: ["match my skills", "what career", "which career", "suits me"],
    reply:
      "Based on your assessment and four completed simulations, your top three are AI Engineer (92%), Software Engineer (87%) and UX/UI Designer (83%). The common thread is structured problem-solving with a creative outlet. The weakest fit in your top ten is anything requiring sustained client-facing negotiation.",
  },
  {
    match: ["score", "why did i get", "84"],
    reply:
      "Your 84 came from four scored decisions. You gained full marks on evidence-gathering and escalation timing, but lost points on the communication scenario — you chose the technically correct explanation over the one the listener could act on. That single pattern accounts for most of the gap between 84 and 95.",
  },
  {
    match: ["improve", "skills should i", "get better"],
    reply:
      "Two things, in order. First, communication under pressure: practise explaining one technical decision per week in plain language to someone outside your field. Second, time management: in your last two runs you spent over 40% of your decisions gathering information you already had. Try the Software Engineer simulation and consciously commit earlier.",
  },
  {
    match: ["study", "degree", "university"],
    reply:
      "For AI Engineering, a Computer Science or Data Science degree is the most reliable route, but the differentiator is projects. Three shipped, documented projects beat a high GPA in most hiring processes. Start with one end-to-end model you deploy yourself.",
  },
];

const suggestions = [
  "Should I choose AI or cybersecurity?",
  "What career matches my skills?",
  "Why did I get this simulation score?",
  "What skills should I improve?",
];

function replyFor(input: string) {
  const q = input.toLowerCase();
  const hit = canned.find((c) => c.match.some((m) => q.includes(m)));
  return (
    hit?.reply ??
    "Good question. In this prototype I answer from your simulation history and assessment profile. Try asking about your simulation score, which careers match your skills, or what to improve next — those paths are fully mapped."
  );
}

function Mentor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi Ayesha 👋 I'm your SimPath AI Mentor. I've read your four simulation runs and your assessment. Ask me anything about where to go next.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function send(text: string) {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: replyFor(value) }]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-ai text-primary-foreground shadow-glow">
          <Bot className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          SimPath <span className="text-gradient">AI Mentor</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your personal guide to choosing the right career.
        </p>
      </header>

      <div className="mt-10 flex h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-ping-ring" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </span>
          <span className="text-xs font-semibold text-foreground">Mentor online</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-violet" /> Prototype responses
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  m.role === "bot"
                    ? "bg-gradient-ai text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {m.role === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </span>
              <div
                className={`animate-rise max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "bot"
                    ? "rounded-tl-sm border border-border bg-surface text-foreground"
                    : "rounded-tr-sm bg-gradient-ai text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ai text-primary-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-4">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your mentor anything…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-ai text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
