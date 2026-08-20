/* Editorial operating system: an overdue decision is a small operational signal, not a decorative alert. */
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { getWorkflowRecords } from "../lib/workflowRecords";
import { ActivityWorkspace } from "./ActivityWorkspace";

export function AccountableActivityWorkspace() {
  const { t, formatNum, isRTL } = useLocale();
  const today = new Date().toISOString().slice(0, 10);
  const overdue = getWorkflowRecords().filter((record) => record.kind === "decision" && !record.outcome && record.reviewDue && record.reviewDue < today);
  return <><ActivityWorkspace />{overdue.length > 0 && <Link href="/dashboard/decision-accountability" className="decision-accountability-float"><AlertTriangle size={15} /><span><strong>{t(`${formatNum(overdue.length)} review${overdue.length === 1 ? "" : "s"} overdue`, `${formatNum(overdue.length)} مراجعة متأخرة`)}</strong><small>{t("Assign an owner or update the date", "عيّن مالكا أو حدّث التاريخ")}</small></span>{isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>}</>;
}
