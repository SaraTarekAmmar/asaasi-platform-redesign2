/* Editorial Operating System, outcome-first cards for directories, events, tools, and resources. */
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { SignalTag } from "./SiteShell";
import { useLocale } from "../../contexts/LocaleContext";

export function EventCard({ day, month, title, copy, meta, tag, href = "/events/founder-briefing", outcome, location }: { day: string; month: string; title: string; copy: string; meta: string; tag?: string; href?: string; outcome?: string; location?: string }) {
  const { t } = useLocale();
  return <Link href={href} className="event-card"><div className="event-date"><strong>{day}</strong><span>{month}</span></div><div className="event-card-main"><SignalTag tone="soft">{tag ?? t("Workshop", "ورشة عمل")}</SignalTag><h3>{title}</h3><p>{copy}</p><span className="event-card-outcome">{t("Outcome", "النتيجة")} / {outcome ?? t("Leave with one decision to test", "غادر بقرار واحد لاختباره")}</span></div><div className="event-card-meta"><div><CalendarDays size={13} /> {meta}</div><div><MapPin size={13} /> {location ?? t("Online + MENA", "عبر الإنترنت + المنطقة")}</div><span className="card-arrow"><ArrowUpRight size={15} /></span></div></Link>;
}

export function PersonCard({ initials, name, role, copy, tag, action, href = "/connect" }: { initials: string; name: string; role: string; copy: string; tag: string; action?: string; href?: string }) {
  const { t } = useLocale();
  return <article className="person-card"><div className="person-top"><div className="avatar" aria-hidden="true">{initials}</div><SignalTag tone="soft">{tag}</SignalTag></div><h3>{name}</h3><p className="person-role">{role}</p><p>{copy}</p><div className="card-footer"><span>{t("Open to a focused intro", "متاح لمقدمة مركزة")}</span><Link href={href} className="button button-ghost button-small">{action ?? t("View profile", "شاهد الملف")} <ArrowUpRight size={14} /></Link></div></article>;
}

export function ToolCard({ title, copy, tag, duration, tone = "", href = "/tools", next }: { title: string; copy: string; tag: string; duration: string; tone?: string; href?: string; next?: string }) {
  const { t } = useLocale();
  return <Link href={href} className="tool-card"><div className="tool-card-main"><SignalTag tone={tone}>{tag}</SignalTag><h3>{title}</h3><p>{copy}</p></div><div className="tool-meta"><span><Clock3 size={12} /> {duration}</span><span>{next ?? t("Start with the question", "ابدأ بالسؤال")} <ArrowUpRight size={13} /></span></div></Link>;
}

export function ResourceCard({ title, copy, tag, duration, featured = false, href = "/learn", badge }: { title: string; copy: string; tag: string; duration: string; featured?: boolean; href?: string; badge?: string }) {
  return <Link href={href} className={`resource-card ${featured ? "featured" : ""}`}><div><SignalTag tone={featured ? "" : "soft"}>{tag}</SignalTag>{badge && <span className="resource-badge">{badge}</span>}<h3>{title}</h3><p>{copy}</p></div><div className="resource-foot"><span>{duration}</span><ArrowUpRight size={18} /></div></Link>;
}

export function EmptyState({ title, copy }: { title: string; copy: string }) {
  const { t } = useLocale();
  return <div className="resource-card"><SignalTag tone="clay"><Sparkles size={12} /> {t("Next signal", "الإشارة التالية")}</SignalTag><h3>{title}</h3><p>{copy}</p><Link href="/signup" className="button button-dark button-small">{t("Build my founder brief", "ابنِ موجز مؤسسك")} <ArrowUpRight size={14} /></Link></div>;
}
