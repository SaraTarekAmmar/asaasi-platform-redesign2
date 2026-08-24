/* Editorial operating system: an overdue decision is a small operational signal, not a decorative alert. */
import { useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { getWorkflowRecords } from "../lib/workflowRecords";
import { ActivityWorkspace } from "./ActivityWorkspace";

// ponytail: dismissal is per browser tab session (sessionStorage), not per-decision snooze -
// good enough to stop the nag from re-appearing on every scroll/navigation within a visit.
const DISMISS_KEY = "asaasi-accountable-activity-float-dismissed";

export function AccountableActivityWorkspace() {
  const { t, formatNum, isRTL } = useLocale();
  const today = new Date().toISOString().slice(0, 10);
  const overdue = getWorkflowRecords().filter((record) => record.kind === "decision" && !record.outcome && record.reviewDue && record.reviewDue < today);
  const [dismissed, setDismissed] = useState(() => typeof window !== "undefined" && window.sessionStorage.getItem(DISMISS_KEY) === "true");
  const dismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };
  return <><ActivityWorkspace />{overdue.length > 0 && !dismissed && <div className="decision-accountability-float"><Link href="/dashboard/decision-accountability"><AlertTriangle size={15} /><span><strong>{t(`${formatNum(overdue.length)} review${overdue.length === 1 ? "" : "s"} overdue`, `${formatNum(overdue.length)} مراجعة متأخرة`)}</strong><small>{t("Assign an owner or update the date", "عيّن مالكا أو حدّث التاريخ")}</small></span>{isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link><button type="button" aria-label={t("Dismiss", "إغلاق")} onClick={dismiss}><X size={13} /></button></div>}</>;
}
