export type SimRunDecision = {
  scenario: string;
  choice: string;
  response: string;
  points: number;
  quality: "optimal" | "acceptable" | "suboptimal";
};

export type SimRun = {
  careerId: string;
  score: number;
  maxScore: number;
  decisions: SimRunDecision[];
  completedAt: number;
};

const KEY = "simpath-last-run";

export function saveRun(run: SimRun) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(run));
  } catch {
    /* storage unavailable */
  }
}

export function loadRun(careerId: string): SimRun | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const run = JSON.parse(raw) as SimRun;
    return run.careerId === careerId ? run : null;
  } catch {
    return null;
  }
}
