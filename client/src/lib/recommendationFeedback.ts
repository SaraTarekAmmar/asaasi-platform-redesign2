/* Founder relevance feedback stays local to the operating workspace and removes weak recommendations from the active shortlist. */
export type RecommendationFeedback = Record<string, "not-relevant">;

const STORAGE_KEY = "asaasi-recommendation-feedback";

export function getRecommendationFeedback(): RecommendationFeedback {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as RecommendationFeedback;
  } catch {
    return {};
  }
}

export function saveRecommendationFeedback(feedback: RecommendationFeedback) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}
