/* Founder identity: the name/email a founder actually typed at signup, so the dozen places that
   render "who is signed in" (sidebar, header avatar, profile page) show the real person instead of
   a hardcoded demo persona. Falls back to the original "Sara Ammar" demo name only when nothing was
   ever typed (e.g. a session that only ever used Login, which has no real credentials to derive a
   name from since this app has no backend). */
export type FounderProfile = { name: string; email?: string };

const STORAGE_KEY = "asaasi-founder-profile";
const DEMO_PROFILE: FounderProfile = { name: "Sara Ammar" };

export function getFounderProfile(): FounderProfile {
  if (typeof window === "undefined") return DEMO_PROFILE;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? (JSON.parse(value) as FounderProfile) : null;
    return parsed?.name.trim() ? parsed : DEMO_PROFILE;
  } catch {
    return DEMO_PROFILE;
  }
}

export function saveFounderProfile(profile: FounderProfile) {
  if (typeof window === "undefined" || !profile.name.trim()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function founderInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (initials || "SA").toUpperCase();
}
