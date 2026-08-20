/* Founder relevance feedback stays local to the operating workspace and removes weak recommendations from the active shortlist. */
export type RecommendationFeedbackReason = "stage" | "market" | "focus" | "timing" | "other";
export type RecommendationFeedbackEntry = { reason: RecommendationFeedbackReason; updatedAt: string };
export type RecommendationFeedback = Record<string, RecommendationFeedbackEntry>;

const STORAGE_KEY = "asaasi-recommendation-feedback";

export function getRecommendationFeedback(): RecommendationFeedback {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, RecommendationFeedbackEntry | "not-relevant">;
    const migrated: RecommendationFeedback = {};
    Object.entries(parsed).forEach(([name, value]) => { migrated[name] = value === "not-relevant" ? { reason: "other", updatedAt: new Date(0).toISOString() } : value; });
    return migrated;
  } catch {
    return {};
  }
}

export function saveRecommendationFeedback(feedback: RecommendationFeedback) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

export function setRecommendationFeedback(feedback: RecommendationFeedback, name: string, reason: RecommendationFeedbackReason) {
  const next: RecommendationFeedback = { ...feedback, [name]: { reason, updatedAt: new Date().toISOString() } };
  saveRecommendationFeedback(next);
  return next;
}

export function removeRecommendationFeedback(feedback: RecommendationFeedback, name: string) {
  const { [name]: _removed, ...next } = feedback;
  saveRecommendationFeedback(next);
  return next;
}
