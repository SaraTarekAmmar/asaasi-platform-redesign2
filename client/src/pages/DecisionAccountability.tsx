/* Editorial operating system: accountability stays lightweight, with a named owner and one visible review date for every decision bet. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { getWorkflowRecords, upsertWorkflowRecord } from "../lib/workflowRecords";
import { ProductShell } from "./ProductFlows";

function dueDateFor(recordDue?: string) {
  return recordDue || new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
}

export function DecisionAccountabilityWorkspace() {
  const { t, formatNum, isRTL } = useLocale();
  const [records, setRecords] = useState(() => getWorkflowRecords());
  const decisions = records.filter((record) => record.kind === "decision");
  const [selectedId, setSelectedId] = useState(() => {
    const requestedId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("decision") : null;
    return decisions.some((record) => record.id === requestedId) ? requestedId ?? "" : decisions[0]?.id ?? "";
  });
  const selected = decisions.find((record) => record.id === selectedId) ?? decisions[0];
  const [owner, setOwner] = useState("");
  const [due, setDue] = useState("");
  const [saved, setSaved] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const overdue = decisions.filter((record) => !record.outcome && record.reviewDue && record.reviewDue < today);
  useEffect(() => {
    if (!selected) return;
    setSelectedId(selected.id);
    setOwner(selected.owner ?? "Founder");
    setDue(dueDateFor(selected.reviewDue));
    setSaved(false);
  }, [selected?.id]);
  const saveAccountability = () => {
    if (!selected || !due) return;
    upsertWorkflowRecord({ ...selected, owner: owner.trim() || "Founder", ownerAr: owner.trim() || "المؤسس", reviewDue: due, reviewDate: `Review by ${due}`, reviewDateAr: `مراجعة في ${due}` });
    setRecords(getWorkflowRecords());
    setSaved(true);
  };
  if (!selected) return <ProductShell title={t("Decision accountability", "مساءلة القرار")} active="/dashboard/registrations"><div className="workspace-route-page"><div className="empty-state"><h2>{t("Assign an owner after you save a tool decision.", "عيّن مالكا بعد حفظ قرار أداة.")}</h2><p>{t("A clear owner and review date keep a decision from becoming a forgotten file.", "يحافظ مالك واضح وتاريخ مراجعة على القرار من أن يصبح ملفا منسيا.")}</p><Link href="/tools" className="button button-dark">{t("Open founder tools", "افتح أدوات المؤسس")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></div></div></ProductShell>;
  return <ProductShell title={t("Decision accountability", "مساءلة القرار")} active="/dashboard/registrations"><div className="workspace-route-page decision-accountability"><div className="product-page-heading compact"><div><SectionLabel>{t("Workspace / Decision accountability", "مساحة العمل / مساءلة القرار")}</SectionLabel><h1>{t("Put a name and a date behind the bet.", "ضع اسما وتاريخا خلف الرهان.")}</h1><p>{t("Every useful decision needs an owner and a review point before the next urgent task replaces it.", "يحتاج كل قرار مفيد إلى مالك ونقطة مراجعة قبل أن تحل المهمة العاجلة التالية محله.")}</p></div><SignalTag tone={overdue.length ? "clay" : "soft"}>{overdue.length ? t(`${formatNum(overdue.length)} overdue`, `${formatNum(overdue.length)} متأخر`) : t("On track", "على المسار")}</SignalTag></div><div className="accountability-layout"><aside><span className="mono">{t("DECISION REVIEW", "مراجعة القرار")}</span>{decisions.map((record) => <button type="button" key={record.id} className={record.id === selected.id ? "is-active" : ""} onClick={() => setSelectedId(record.id)}><span className={record.reviewDue && !record.outcome && record.reviewDue < today ? "is-overdue" : ""}>{record.reviewDue && !record.outcome && record.reviewDue < today ? t("DUE", "مستحق") : record.outcome ? <Check size={13} /> : "·"}</span><div><strong>{t(record.title, record.titleAr)}</strong><small>{record.reviewDue ? t(`Review ${record.reviewDue}`, `مراجعة ${record.reviewDue}`) : t("Set review date", "حدد تاريخ المراجعة")}</small></div></button>)}</aside><section className="accountability-editor"><SectionLabel>{t("Owner and review point", "المالك ونقطة المراجعة")}</SectionLabel><h2>{t(selected.title, selected.titleAr)}</h2><p>{t(selected.nextAction ?? "Choose the next action", selected.nextActionAr ?? "اختر الخطوة التالية")}</p><div className="accountability-fields"><label>{t("Owner", "المالك")}<input value={owner} onChange={(event) => { setOwner(event.target.value); setSaved(false); }} placeholder={t("Founder or teammate", "المؤسس أو زميل")}/></label><label>{t("Review due", "موعد المراجعة")}<input type="date" value={due} onChange={(event) => { setDue(event.target.value); setSaved(false); }}/></label></div><div className="decision-review-editor__actions"><button type="button" className="button button-primary" onClick={saveAccountability}>{t("Save accountability", "احفظ المساءلة")} <Check size={14} /></button><Link href="/dashboard/registrations" className="text-link">{t("Return to Activity", "العودة إلى النشاط")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div>{saved && <div className="inline-success" role="status"><Check size={14} /> {t("Owner and review date saved to this decision.", "حُفظ المالك وتاريخ المراجعة لهذا القرار.")}</div>}</section></div></div></ProductShell>;
}
