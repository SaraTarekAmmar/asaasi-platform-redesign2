/* Founder context is a small, explicit operating input set shared by profile, matching, and desk guidance. */
export type FounderContext = {
  signal: string;
  operatingContext: string;
  stage: string;
  market: string;
  interests: string[];
  visibility: "network" | "matches";
  updatedAt: string;
};

export type FounderContextStatus = {
  complete: number;
  total: number;
  percent: number;
  missing: Array<"signal" | "operatingContext" | "stage" | "market" | "interests">;
};

const STORAGE_KEY = "asaasi-founder-context";

export function getFounderContext(): FounderContext | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as FounderContext : null;
  } catch {
    return null;
  }
}

export function saveFounderContext(context: Omit<FounderContext, "updatedAt">) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...context, updatedAt: new Date().toISOString() } satisfies FounderContext));
}

export function getFounderContextStatus(context = getFounderContext()): FounderContextStatus {
  const checks = [
    ["signal", Boolean(context?.signal.trim())],
    ["operatingContext", Boolean(context?.operatingContext.trim())],
    ["stage", Boolean(context?.stage)],
    ["market", Boolean(context?.market)],
    ["interests", Boolean(context?.interests.length)],
  ] as const;
  const missing = checks.filter(([, complete]) => !complete).map(([key]) => key);
  const complete = checks.length - missing.length;
  return { complete, total: checks.length, percent: Math.round((complete / checks.length) * 100), missing };
}
