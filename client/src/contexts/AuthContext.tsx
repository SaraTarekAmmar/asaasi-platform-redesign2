/* Editorial Operating System, no real backend exists yet, so "signed in" is a durable client-side flag
   that every gated surface (workspace routes, full search, community threads) reads from one place. */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextValue = { isAuthed: boolean; login: () => void; logout: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("asaasi-authed") === "true");
  useEffect(() => { window.localStorage.setItem("asaasi-authed", String(isAuthed)); }, [isAuthed]);
  return <AuthContext.Provider value={{ isAuthed, login: () => setIsAuthed(true), logout: () => setIsAuthed(false) }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
