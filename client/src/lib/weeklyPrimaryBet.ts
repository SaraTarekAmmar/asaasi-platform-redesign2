/* Editorial operating system: one current weekly commitment keeps the review agenda actionable without turning it into a task manager. */
export type WeeklyPrimaryBet = {
  recordId: string;
  weekStart: string;
  selectedAt: string;
  completedAt?: string;
  reminderDay?: "tuesday" | "thursday";
};

const STORAGE_KEY = "asaasi-weekly-primary-bet";

export function getWeekStart(date = new Date()) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = local.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  local.setDate(local.getDate() + offset);
  return local.toISOString().slice(0, 10);
}

export function getWeeklyPrimaryBet(): WeeklyPrimaryBet | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as WeeklyPrimaryBet | null;
    return saved?.weekStart === getWeekStart() ? saved : null;
  } catch {
    return null;
  }
}

function persist(value: WeeklyPrimaryBet | null) {
  if (typeof window === "undefined") return;
  if (!value) window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function setWeeklyPrimaryBet(recordId: string) {
  const value: WeeklyPrimaryBet = { recordId, weekStart: getWeekStart(), selectedAt: new Date().toISOString() };
  persist(value);
  return value;
}

export function completeWeeklyPrimaryBet() {
  const current = getWeeklyPrimaryBet();
  if (!current) return null;
  const value = { ...current, completedAt: new Date().toISOString() };
  persist(value);
  return value;
}

export function setWeeklyPrimaryBetReminder(reminderDay?: WeeklyPrimaryBet["reminderDay"]) {
  const current = getWeeklyPrimaryBet();
  if (!current) return null;
  const value = { ...current, reminderDay };
  persist(value);
  return value;
}

export function clearWeeklyPrimaryBet() {
  persist(null);
}
