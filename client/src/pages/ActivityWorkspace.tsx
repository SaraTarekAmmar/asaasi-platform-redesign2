/* Editorial operating system: Activity preserves the decision, conversation, and outcome as one calm return path. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { getWorkflowRecords, removeWorkflowRecord, upsertWorkflowRecord, type WorkflowRecord } from "../lib/workflowRecords";
import { ProductShell } from "./ProductFlows";

type ActivityFilter = "all" | "decision" | "event" | "application" | "introduction";

function recordKindLabel(record: WorkflowRecord, t: (en: string, ar: string) => string) {
  if (record.kind === "decision") return t("Decision", "قرار");
  if (record.kind === "event") return t("Event", "فعالية");
  if (record.kind === "introduction") return t("Introduction", "مقدمة");
  return t("Application", "طلب");
}

function introductionStatusLabel(record: WorkflowRecord, t: (en: string, ar: string) => string) {
  if (record.status === "introduced") return t("Connected", "تم الربط");
  if (record.status === "completed") return t("Conversation reflected", "تم توثيق المحادثة");
  return t("Brief in review", "الموجز قيد المراجعة");
}

export function ActivityWorkspace() {
  const { t, formatNum, isRTL } = useLocale();
  const [records, setRecords] = useState(() => getWorkflowRecords());
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [followUps, setFollowUps] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem("asaasi-event-follow-ups") ?? "{}"); } catch { return {}; }
  });
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem("asaasi-workflow-reviewed") ?? "{}"); } catch { return {}; }
  });
  const [reflectionTargetId, setReflectionTargetId] = useState<string | null>(null);
  const [introductionReflection, setIntroductionReflection] = useState("");
  const [copiedFollowUpId, setCopiedFollowUpId] = useState<string | null>(null);
  useEffect(() => { window.localStorage.setItem("asaasi-event-follow-ups", JSON.stringify(followUps)); }, [followUps]);
  useEffect(() => { window.localStorage.setItem("asaasi-workflow-reviewed", JSON.stringify(reviewed)); }, [reviewed]);

  const decisions = records.filter((record) => record.kind === "decision");
  const introductions = records.filter((record) => record.kind === "introduction");
  const learnedDecisions = decisions.filter((record) => Boolean(record.outcome));
  const openDecisions = decisions.filter((record) => !record.outcome);
  const shown = filter === "all" ? records : records.filter((record) => record.kind === filter);
  const labels: Record<ActivityFilter, string> = {
    all: t("All activity", "كل النشاط"), decision: t("Decisions", "القرارات"), event: t("Events", "الفعاليات"), application: t("Applications", "الطلبات"), introduction: t("Introductions", "المقدمات"),
  };
  const clear = (id: string) => {
    removeWorkflowRecord(id);
    setRecords(getWorkflowRecords());
    setReviewed((current) => { const { [id]: _removed, ...rest } = current; return rest; });
  };
  const updateIntroduction = (record: WorkflowRecord, status: "introduced") => {
    upsertWorkflowRecord({ ...record, status });
    setRecords(getWorkflowRecords());
  };
  const outcomeLabel = (record: WorkflowRecord) => record.outcome === "keep" ? t("Keep direction", "أبقِ الاتجاه") : record.outcome === "change" ? t("Change approach", "غيّر النهج") : record.outcome === "stop" ? t("Stop bet", "أوقف الرهان") : t("Awaiting review", "بانتظار المراجعة");
  const introductionCopy = (record: WorkflowRecord) => {
    const linkedDecision = decisions.find((decision) => decision.id === record.linkedDecisionId);
    const linkCopy = linkedDecision ? t(`Linked to ${linkedDecision.title}.`, `مرتبط بـ ${linkedDecision.titleAr}.`) : "";
    if (record.status === "introduced") return t(`The connection is ready. Keep the first conversation on the question you named. ${linkCopy}`, `أصبحت المقدمة جاهزة. حافظ على تركيز المحادثة الأولى على السؤال الذي سميته. ${linkCopy}`);
    if (record.status === "completed") return t(`The conversation is reflected. Carry the useful evidence into the next decision review. ${linkCopy}`, `تم توثيق المحادثة. انقل الدليل المفيد إلى مراجعة القرار التالية. ${linkCopy}`);
    return t(`Your focused question is in review. ASaaSI will keep the brief attached to the introduction route. ${linkCopy}`, `سؤالك المركز قيد المراجعة. سيبقي أساسي الموجز مرتبطا بمسار المقدمة. ${linkCopy}`);
  };
  const startIntroductionReflection = (record: WorkflowRecord) => { setReflectionTargetId(record.id); setIntroductionReflection(record.introductionReflection ?? ""); };
  const saveIntroductionReflection = (record: WorkflowRecord) => {
    const reflection = introductionReflection.trim();
    if (!reflection) return;
    const linkedDecision = decisions.find((decision) => decision.id === record.linkedDecisionId);
    const evidenceLine = isRTL ? `تعلم من مقدمة ${record.titleAr}: ${reflection}` : `Introduction learning from ${record.title}: ${reflection}`;
    if (linkedDecision) upsertWorkflowRecord({ ...linkedDecision, evidence: linkedDecision.evidence ? `${linkedDecision.evidence}\n\n${evidenceLine}` : evidenceLine });
    const followUpDraft = isRTL ? `مرحبًا، شكرًا مرة أخرى على وقتك. أكثر نقطة سأحملها إلى قراري التالي هي: ${reflection} سأعود إليك بعد أن أختبر الخطوة التالية.` : `Thank you again for your time. The point I am carrying into my next decision is: ${reflection} I will come back once I have tested the next step.`;
    const outcomeCheckDue = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
    upsertWorkflowRecord({ ...record, status: "completed", introductionReflection: reflection, introductionReflectionAt: new Date().toISOString(), followUpDraft, outcomeCheckDue });
    setRecords(getWorkflowRecords());
    setReflectionTargetId(null);
    setIntroductionReflection("");
  };
  const saveFollowUpDraft = (record: WorkflowRecord, followUpDraft: string) => {
    if (followUpDraft.trim() === (record.followUpDraft ?? "")) return;
    upsertWorkflowRecord({ ...record, followUpDraft: followUpDraft.trim() });
    setRecords(getWorkflowRecords());
  };
  const copyFollowUpDraft = async (record: WorkflowRecord) => {
    if (!record.followUpDraft) return;
    try { await navigator.clipboard.writeText(record.followUpDraft); } catch { /* The draft remains selectable when browser clipboard access is unavailable. */ }
    upsertWorkflowRecord({ ...record, followUpCopiedAt: new Date().toISOString() });
    setRecords(getWorkflowRecords());
    setCopiedFollowUpId(record.id);
  };
  const completeOutcomeCheck = (record: WorkflowRecord) => {
    upsertWorkflowRecord({ ...record, outcomeCheckCompletedAt: new Date().toISOString() });
    setRecords(getWorkflowRecords());
  };

  return <ProductShell title={t("Activity", "النشاط")} active="/dashboard/registrations"><div className="workspace-route-page activity-workspace">
    <div className="product-page-heading compact"><div><SectionLabel>{t("Workspace / Activity", "مساحة العمل / النشاط")}</SectionLabel><h1>{t("See what the work taught you.", "شاهد ما الذي علّمك إياه العمل.")}</h1><p>{t("Decisions, introductions, event commitments, and applications stay connected so the useful context is never rebuilt from scratch.", "تبقى القرارات والمقدمات والتزامات الفعاليات والطلبات متصلة حتى لا يعاد بناء السياق المفيد من الصفر.")}</p></div><SignalTag tone="soft">{t(`${formatNum(records.length)} records`, `${formatNum(records.length)} سجلات`)}</SignalTag></div>

    <section className="activity-learning-summary" aria-labelledby="activity-learning-title"><div className="activity-learning-summary__intro"><SectionLabel>{t("Decision learning", "تعلم القرار")}</SectionLabel><h2 id="activity-learning-title">{t("Keep the signal, not just the file.", "احتفظ بالإشارة لا بالملف فقط.")}</h2><p>{t("Review outcomes stay beside the evidence, owner, and next action that gave each decision its shape.", "تبقى نتائج المراجعة بجانب الدليل والمالك والخطوة التالية التي أعطت كل قرار شكله.")}</p></div><div className="activity-learning-summary__metrics"><div><span>{t("Saved", "محفوظة")}</span><strong>{formatNum(decisions.length)}</strong></div><div><span>{t("Learned", "تم التعلم")}</span><strong>{formatNum(learnedDecisions.length)}</strong></div><div><span>{t("Open review", "مراجعة مفتوحة")}</span><strong>{formatNum(openDecisions.length)}</strong></div></div><Link href="/dashboard/decision-review" className="button button-dark">{t("Review decisions", "راجع القرارات")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></section>

    {introductions.length > 0 && <section className="activity-introduction-summary"><div><SectionLabel>{t("Introduction follow-through", "متابعة المقدمة")}</SectionLabel><h2>{t("Keep the first conversation attached to the decision it can change.", "أبقِ المحادثة الأولى مرتبطة بالقرار الذي يمكن أن تغيّره.")}</h2><p>{t(`${formatNum(introductions.filter((record) => record.status === "submitted").length)} brief${introductions.filter((record) => record.status === "submitted").length === 1 ? "" : "s"} awaiting a connection and ${formatNum(introductions.filter((record) => record.status === "introduced").length)} active conversation${introductions.filter((record) => record.status === "introduced").length === 1 ? "" : "s"}.`, `${formatNum(introductions.filter((record) => record.status === "submitted").length)} موجز${introductions.filter((record) => record.status === "submitted").length === 1 ? "" : "ات"} بانتظار الربط و${formatNum(introductions.filter((record) => record.status === "introduced").length)} محادثة نشطة.`)}</p></div><Link href="#activity-introductions" className="button button-light"><MessageSquare size={14} /> {t("Review introductions", "راجع المقدمات")}</Link></section>}

    {decisions.length > 0 && <section className="activity-learning-ledger" aria-label={t("Decision learning ledger", "سجل تعلم القرار")}><div className="activity-learning-ledger__heading"><div><SectionLabel>{t("Learning ledger", "سجل التعلم")}</SectionLabel><h2>{t("The latest useful evidence.", "أحدث الأدلة المفيدة.")}</h2></div><Link href="/dashboard/decision-review" className="text-link">{t("Open full review", "افتح المراجعة الكاملة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div><div className="activity-learning-records">{decisions.slice(0, 3).map((record) => <article key={record.id}><header><span className={record.outcome ? "is-complete" : ""}>{record.outcome ? <Check size={13} /> : t("OPEN", "مفتوح")}</span><strong>{outcomeLabel(record)}</strong></header><h3>{t(record.title, record.titleAr)}</h3><p className="activity-learning-records__evidence">{record.evidence || t("No evidence recorded yet. Return while the customer language or result is still specific.", "لم يُسجل دليل بعد. عد بينما تظل لغة العميل أو النتيجة محددة.")}</p><dl><div><dt>{t("Owner", "المالك")}</dt><dd>{t(record.owner ?? "Founder", record.ownerAr ?? "المؤسس")}</dd></div><div><dt>{t("Next action", "الخطوة التالية")}</dt><dd>{t(record.nextAction ?? "Choose the next action", record.nextActionAr ?? "اختر الخطوة التالية")}</dd></div><div><dt>{t("Review", "المراجعة")}</dt><dd>{t(record.reviewDate ?? "Review after 7 days", record.reviewDateAr ?? "راجع بعد ٧ أيام")}</dd></div></dl><Link href="/dashboard/decision-review" className="text-link">{record.outcome ? t("Review learning", "راجع التعلم") : t("Record learning", "سجل التعلم")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></article>)}</div></section>}

    <div className="request-tabs" role="toolbar" aria-label={t("Filter workspace activity", "تصفية نشاط مساحة العمل")}>{(["all", "decision", "introduction", "event", "application"] as ActivityFilter[]).map((kind) => <button type="button" key={kind} className={filter === kind ? "active" : ""} aria-pressed={filter === kind} onClick={() => setFilter(kind)}>{labels[kind]}</button>)}</div>
    {shown.length ? <div id="activity-introductions" className="receipt-list">{shown.map((record) => <article key={record.id} className={reviewed[record.id] ? "is-reviewed" : ""}><div><span className="mono">{reviewed[record.id] ? t("REVIEWED", "تمت المراجعة") : record.kind === "decision" && record.outcome ? t(`DECISION / ${outcomeLabel(record).toUpperCase()}`, `قرار / ${outcomeLabel(record)}`) : record.kind === "introduction" ? t(`INTRODUCTION / ${introductionStatusLabel(record, t).toUpperCase()}`, `مقدمة / ${introductionStatusLabel(record, t)}`) : t(`${recordKindLabel(record, t).toUpperCase()} / ${record.status.toUpperCase()}`, `${recordKindLabel(record, t)} / ${record.status === "submitted" ? "مقدم" : record.status === "registered" ? "مسجل" : "محفوظ"}`)}</span><h2>{t(record.title, record.titleAr)}</h2><p>{record.kind === "decision" ? record.evidence ? t(`Learning: ${record.evidence}`, `التعلم: ${record.evidence}`) : t("Return to record the evidence before the next conversation makes it less specific.", "عد لتسجيل الدليل قبل أن تجعل المحادثة التالية تفاصيله أقل تحديدا.") : record.kind === "event" ? t("Keep the event close with a calendar handoff or reminder.", "أبقِ الفعالية قريبة عبر إضافة للتقويم أو تذكير.") : record.kind === "introduction" ? introductionCopy(record) : t("Your brief is in review. Return to it if the route asks for more context.", "موجزك قيد المراجعة. عد إليه إذا طلب المسار مزيدا من السياق.")}</p>{record.kind === "introduction" && record.status === "completed" && record.introductionReflection && <div className="activity-introduction-learning"><strong>{t("Conversation learning", "تعلم المحادثة")}</strong><p>{record.introductionReflection}</p><label>{t("Follow-up draft", "مسودة المتابعة")}<textarea defaultValue={record.followUpDraft} onBlur={(event) => saveFollowUpDraft(record, event.target.value)} /></label><div className="activity-introduction-learning__actions"><button type="button" className="text-link" onClick={() => copyFollowUpDraft(record)}>{copiedFollowUpId === record.id ? t("Follow-up copied", "تم نسخ المتابعة") : t("Copy follow-up", "انسخ المتابعة")}</button>{record.outcomeCheckCompletedAt ? <span className="inline-success"><Check size={13} /> {t("Outcome checked", "تم فحص النتيجة")}</span> : <button type="button" className="text-link" onClick={() => completeOutcomeCheck(record)}>{record.outcomeCheckDue ? t(`Check outcome by ${record.outcomeCheckDue}`, `افحص النتيجة بحلول ${record.outcomeCheckDue}`) : t("Set 7-day outcome check", "اضبط فحص النتيجة بعد ٧ أيام")}</button>}</div></div>}</div><div className="activity-row-actions">{record.kind === "decision" ? <Link href="/dashboard/decision-review" className="button button-ghost">{record.outcome ? t("Review", "مراجعة") : t("Record learning", "سجل التعلم")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link> : <Link href={record.href} className="button button-ghost">{t("Open", "افتح")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>}{record.kind === "event" && <button type="button" className="button button-light" aria-pressed={followUps[record.id] ?? false} onClick={() => setFollowUps((current) => ({ ...current, [record.id]: !current[record.id] }))}><CalendarPlus size={14} /> {followUps[record.id] ? t("Follow-up set", "تم ضبط المتابعة") : t("Set follow-up", "اضبط المتابعة")}</button>}{record.kind === "introduction" && record.status === "submitted" && <button type="button" className="button button-light" onClick={() => updateIntroduction(record, "introduced")}><Check size={14} /> {t("Mark connected", "علِّم كمربوط")}</button>}{record.kind === "introduction" && record.status === "introduced" && (reflectionTargetId === record.id ? <form className="activity-introduction-reflection" onSubmit={(event) => { event.preventDefault(); saveIntroductionReflection(record); }}><label>{t("What changed after this conversation?", "ما الذي تغير بعد هذه المحادثة؟")}<textarea value={introductionReflection} onChange={(event) => setIntroductionReflection(event.target.value)} placeholder={t("Capture the exact insight that should change the linked decision.", "سجل الرؤية الدقيقة التي ينبغي أن تغيّر القرار المرتبط.")} required /></label><div><button type="submit" className="button button-light"><Check size={14} /> {t("Save learning", "احفظ التعلم")}</button><button type="button" className="text-link" onClick={() => setReflectionTargetId(null)}>{t("Cancel", "إلغاء")}</button></div></form> : <button type="button" className="button button-light" onClick={() => startIntroductionReflection(record)}><Check size={14} /> {t("Reflect conversation", "وثّق المحادثة")}</button>)}<button type="button" className="text-link" onClick={() => setReviewed((current) => ({ ...current, [record.id]: !current[record.id] }))}>{reviewed[record.id] ? t("Reopen", "أعد الفتح") : t("Mark reviewed", "علِّم كمراجَع")}</button><button type="button" className="text-link" onClick={() => clear(record.id)}>{t("Remove", "إزالة")}</button></div></article>)}</div> : <div className="empty-state compact-empty"><h2>{t("Your activity will collect here.", "سيتجمع نشاطك هنا.")}</h2><p>{t("Save a decision, keep an event, submit an application, or draft an introduction to create a useful return point.", "احفظ قرارا أو احتفظ بفعالية أو قدم طلبا أو اكتب موجز مقدمة لإنشاء نقطة عودة مفيدة.")}</p><Link href="/tools" className="button button-dark">{t("Open founder tools", "افتح أدوات المؤسس")}</Link></div>}
  </div></ProductShell>;
}
