/* Editorial operating system: Activity preserves the decision, conversation, and outcome as one calm return path. */
/* Editorial operating system: Activity turns specific founder learning into a bounded next commitment, using existing records rather than duplicate task state. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { getCustomerEvidenceRecords, getWorkflowRecords, removeWorkflowRecord, upsertWorkflowRecord, type WorkflowRecord } from "../lib/workflowRecords";
import { setWeeklyPrimaryBet } from "../lib/weeklyPrimaryBet";
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

type EvidenceLane = "quote" | "workaround" | "commitment";

function evidenceValue(record: WorkflowRecord, lane: EvidenceLane) {
  const evidence = record.customerEvidence;
  if (!evidence) return "";
  if (lane === "quote") return evidence.quote;
  if (lane === "workaround") return evidence.workaround;
  return evidence.action;
}

function normalizedEvidence(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[“”"'،,.!?؛:]/g, "").replace(/\s+/g, " ");
}

type LearningFilter = "all" | "keep" | "change" | "stop";

function FounderLearningArchive({ records, onRecordsChanged }: { records: WorkflowRecord[]; onRecordsChanged: () => void }) {
  const { t, isRTL, formatNum } = useLocale();
  const [filter, setFilter] = useState<LearningFilter>("all");
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [rule, setRule] = useState("");
  const [scope, setScope] = useState("");
  const [applyNext, setApplyNext] = useState("");
  const currentMonth = new Date().toISOString().slice(0, 7);
  const completed = records.filter((record) => record.kind === "decision" && Boolean(record.outcome)).sort((a, b) => (b.outcomeAt ?? b.updatedAt).localeCompare(a.outcomeAt ?? a.updatedAt));
  const filtered = filter === "all" ? completed : completed.filter((record) => record.outcome === filter);
  const currentPrinciple = completed.find((record) => record.operatingPrinciple?.month === currentMonth);
  const selected = completed.find((record) => record.id === targetId) ?? currentPrinciple ?? completed[0];
  const outcomeLabel = (outcome: WorkflowRecord["outcome"]) => outcome === "keep" ? t("Keep", "استمر") : outcome === "change" ? t("Change", "غيّر") : t("Stop", "أوقف");
  const openReflection = (record = currentPrinciple ?? completed[0]) => {
    if (!record) return;
    setTargetId(record.id);
    setRule(record.operatingPrinciple?.rule ?? "");
    setScope(record.operatingPrinciple?.scope ?? "");
    setApplyNext(record.operatingPrinciple?.applyNext ?? "");
    setReflectionOpen(true);
  };
  const savePrinciple = () => {
    if (!selected || !rule.trim() || !scope.trim() || !applyNext.trim()) return;
    records.filter((record) => record.id !== selected.id && record.operatingPrinciple?.month === currentMonth).forEach((record) => {
      const { operatingPrinciple: _removed, ...withoutPrinciple } = record;
      upsertWorkflowRecord(withoutPrinciple);
    });
    upsertWorkflowRecord({ ...selected, operatingPrinciple: { month: currentMonth, rule: rule.trim(), scope: scope.trim(), applyNext: applyNext.trim(), createdAt: new Date().toISOString() } });
    onRecordsChanged();
    setReflectionOpen(false);
  };
  if (!completed.length) return null;
  return <section className="founder-learning-archive" aria-labelledby="founder-learning-archive-title"><header className="founder-learning-archive__heading"><div><SectionLabel>{t("Founder learning archive", "أرشيف تعلم المؤسس")}</SectionLabel><h2 id="founder-learning-archive-title">{t("Archive the decision that changed the work, not every draft around it.", "أرشف القرار الذي غيّر العمل، لا كل مسودة حوله.")}</h2><p>{t("Each outcome retains its original evidence, review, and route. Use this archive to avoid restarting an experiment without its context.", "تحتفظ كل نتيجة بدليلها الأصلي ومراجعتها ومسارها. استخدم هذا الأرشيف لتجنب إعادة بدء تجربة من دون سياقها.")}</p></div><div className="founder-learning-archive__metric"><strong>{formatNum(completed.length)}</strong><span>{t("completed decisions", "قرارات مكتملة")}</span></div></header><div className="founder-learning-archive__rule"><span className="mono">{t("ARCHIVE RULE", "قاعدة الأرشيف")}</span><p>{t("Only a completed Keep, Change, or Stop outcome belongs here. The record remains linked to the test that produced it.", "لا ينتمي هنا إلا ناتج مكتمل: استمر أو غيّر أو أوقف. يظل السجل مرتبطا بالاختبار الذي أنتجه.")}</p></div><div className="founder-learning-archive__filters" role="toolbar" aria-label={t("Filter completed decisions", "تصفية القرارات المكتملة")}>{(["all", "keep", "change", "stop"] as LearningFilter[]).map((option) => <button type="button" key={option} className={filter === option ? "active" : ""} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option === "all" ? t("All outcomes", "كل النتائج") : outcomeLabel(option)}</button>)}</div><div className="founder-learning-archive__records">{filtered.slice(0, 6).map((record) => <article key={record.id} className={`is-${record.outcome}`}><header><span>{outcomeLabel(record.outcome)}</span><small>{new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-GB", { month: "short", day: "numeric" }).format(new Date(record.outcomeAt ?? record.updatedAt))}</small></header><h3>{t(record.title, record.titleAr)}</h3><p>{record.evidence || record.weeklyReflection || t("The outcome was retained without a separate evidence note.", "احتُفظ بالنتيجة من دون ملاحظة دليل منفصلة.")}</p><dl><div><dt>{t("Original test", "الاختبار الأصلي")}</dt><dd>{record.nextAction ? t(record.nextAction, record.nextActionAr ?? record.nextAction) : t("Open the source record", "افتح السجل المصدر")}</dd></div><div><dt>{t("Route", "المسار")}</dt><dd>{record.href.replace("/tools/", "").replace("/dashboard/", "") || t("Decision review", "مراجعة القرار")}</dd></div></dl>{record.operatingPrinciple && <div className="founder-learning-archive__principle"><span className="mono">{t("WORKING PRINCIPLE", "مبدأ عمل")}</span><strong>{record.operatingPrinciple.rule}</strong><p>{t("Scope: ", "النطاق: ")}{record.operatingPrinciple.scope}</p></div>}<div className="founder-learning-archive__actions"><Link href="/dashboard/decision-review" className="text-link">{t("Open source decision", "افتح القرار المصدر")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>{record.href.startsWith("/tools/") && <Link href={record.href} className="button button-light">{t("Reopen workbench", "أعد فتح طاولة العمل")}</Link>}</div></article>)}</div>{filtered.length === 0 && <div className="founder-learning-archive__empty"><strong>{t("No completed outcome in this filter.", "لا توجد نتيجة مكتملة في هذا الفلتر.")}</strong><button type="button" className="text-link" onClick={() => setFilter("all")}>{t("See all outcomes", "شاهد كل النتائج")}</button></div>}<section className="founder-operating-principle"><div><SectionLabel>{t("Monthly operating principle", "مبدأ التشغيل الشهري")}</SectionLabel><h3>{currentPrinciple ? t("Keep one working rule close to its original outcome.", "أبقِ قاعدة عمل واحدة قريبة من نتيجتها الأصلية.") : t("Turn one retained outcome into a rule you can test again.", "حوّل نتيجة محتفظا بها إلى قاعدة يمكنك اختبارها مرة أخرى.")}</h3><p>{t("This is a revisable operating rule, not a company truth. It remains attached to one completed decision and names where you will apply it next.", "هذه قاعدة تشغيل قابلة للمراجعة، وليست حقيقة للشركة. تظل مرتبطة بقرار مكتمل واحد وتسمِ المكان الذي ستطبقها فيه لاحقا.")}</p></div>{currentPrinciple ? <div className="founder-operating-principle__saved"><span className="mono">{t("THIS MONTH", "هذا الشهر")}</span><strong>{currentPrinciple.operatingPrinciple?.rule}</strong><p>{t("Next use: ", "الاستخدام التالي: ")}{currentPrinciple.operatingPrinciple?.applyNext}</p><button type="button" className="button button-light" onClick={() => openReflection(currentPrinciple)}>{t("Revise working rule", "راجع قاعدة العمل")}</button></div> : <button type="button" className="button button-dark" onClick={() => openReflection()}>{t("Write one working rule", "اكتب قاعدة عمل واحدة")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</button>}</section>{reflectionOpen && selected && <form className="founder-operating-principle__form" onSubmit={(event) => { event.preventDefault(); savePrinciple(); }}><div><SectionLabel>{t("Retained source", "المصدر المحتفظ به")}</SectionLabel><strong>{t(selected.title, selected.titleAr)}</strong><p>{t("Use one completed outcome. The form does not create a new decision or claim certainty.", "استخدم نتيجة مكتملة واحدة. لا ينشئ النموذج قرارا جديدا ولا يدعي اليقين.")}</p></div><div className="founder-operating-principle__fields"><label>{t("Completed decision", "القرار المكتمل")}<select value={selected.id} onChange={(event) => { const next = completed.find((record) => record.id === event.target.value); if (!next) return; setTargetId(next.id); setRule(next.operatingPrinciple?.rule ?? ""); setScope(next.operatingPrinciple?.scope ?? ""); setApplyNext(next.operatingPrinciple?.applyNext ?? ""); }}>{completed.map((record) => <option key={record.id} value={record.id}>{t(record.title, record.titleAr)} · {outcomeLabel(record.outcome)}</option>)}</select></label><label>{t("Working rule", "قاعدة العمل")}<textarea value={rule} onChange={(event) => setRule(event.target.value)} placeholder={t("e.g. When an operations buyer asks for reporting, start with the renewal deadline and their current reconciliation work.", "مثال: عندما يطلب مشتري العمليات تقارير، ابدأ بموعد التجديد وعمل التسوية الحالي.")} required /></label><label>{t("Scope of this rule", "نطاق هذه القاعدة")}<input value={scope} onChange={(event) => setScope(event.target.value)} placeholder={t("Name where this applies and where it does not yet apply.", "سمِ أين تنطبق هذه القاعدة وأين لا تنطبق بعد.")} required /></label><label>{t("Next place to apply it", "المكان التالي لتطبيقها")}<input value={applyNext} onChange={(event) => setApplyNext(event.target.value)} placeholder={t("e.g. Next five customer-evidence conversations", "مثال: محادثات دليل العميل الخمس التالية")} required /></label><div><button type="submit" className="button button-dark"><Check size={14} /> {t("Save revisable rule", "احفظ القاعدة القابلة للمراجعة")}</button><button type="button" className="text-link" onClick={() => setReflectionOpen(false)}>{t("Cancel", "إلغاء")}</button></div></div></form>}</section>;
}

function InterviewPatternArchive({ records }: { records: WorkflowRecord[] }) {
  const { t, isRTL, formatNum } = useLocale();
  const lanes: Array<{ key: EvidenceLane; label: string; labelAr: string; title: string; titleAr: string; copy: string; copyAr: string }> = [
    { key: "quote", label: "BUYER LANGUAGE", labelAr: "لغة المشتري", title: "Exact phrases worth carrying forward.", titleAr: "عبارات دقيقة تستحق أن تنتقل معك.", copy: "Verbatim language stays beside its source. It becomes a repeat only when another retained interview supports the same phrase.", copyAr: "تبقى اللغة الحرفية بجانب مصدرها. لا تصبح تكرارا إلا عندما تدعم مقابلة محفوظة أخرى العبارة نفسها." },
    { key: "workaround", label: "CURRENT WORKAROUNDS", labelAr: "الحلول الالتفافية الحالية", title: "What buyers do before they change anything.", titleAr: "ما يفعله المشترون قبل أن يغيروا أي شيء.", copy: "A workaround is evidence of the current job context, not automatic proof of a market-wide problem.", copyAr: "الحل الالتفافي دليل على سياق العمل الحالي، وليس إثباتا تلقائيا لمشكلة على مستوى السوق." },
    { key: "commitment", label: "MEANINGFUL COMMITMENTS", labelAr: "الالتزامات ذات المعنى", title: "Actions that make the next learning harder than an opinion.", titleAr: "أفعال تجعل التعلم التالي أصعب من مجرد رأي.", copy: "These are the next actions requested in the interview. Check the source and response rule before treating one as evidence.", copyAr: "هذه هي الأفعال التالية المطلوبة في المقابلة. افحص المصدر وقاعدة الاستجابة قبل اعتبار أي منها دليلا." },
  ];
  const sourceDate = (record: WorkflowRecord) => record.customerEvidence?.capturedAt ?? record.updatedAt;
  const formatDate = (value: string) => new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-GB", { month: "short", day: "numeric" }).format(new Date(value));
  const groupLane = (lane: EvidenceLane) => {
    const grouped = new Map<string, WorkflowRecord[]>();
    records.forEach((record) => {
      const value = evidenceValue(record, lane);
      const key = normalizedEvidence(value);
      if (!key) return;
      grouped.set(key, [...(grouped.get(key) ?? []), record]);
    });
    return Array.from(grouped.values()).map((sources) => ({ sources: sources.sort((a, b) => sourceDate(b).localeCompare(sourceDate(a))), value: evidenceValue(sources[0], lane) })).sort((a, b) => b.sources.length - a.sources.length || sourceDate(b.sources[0]).localeCompare(sourceDate(a.sources[0])));
  };
  return <section id="interview-patterns" className="interview-pattern-archive" aria-labelledby="interview-patterns-title"><header className="interview-pattern-archive__heading"><div><SectionLabel>{t("Interview pattern archive", "أرشيف أنماط المقابلات")}</SectionLabel><h2 id="interview-patterns-title">{t("Keep the customer evidence that can change the next decision in view.", "أبقِ دليل العميل الذي يمكن أن يغير القرار التالي في نطاق الرؤية.")}</h2><p>{t("This archive groups only the phrases, workarounds, and requested commitments you saved. It does not generate themes or call one conversation a pattern.", "يجمع هذا الأرشيف فقط العبارات والحلول الالتفافية والالتزامات المطلوبة التي حفظتها. لا يولد موضوعات ولا يسمي محادثة واحدة نمطا.")}</p></div><div className="interview-pattern-archive__metric"><strong>{formatNum(records.length)}</strong><span>{t("saved interviews", "مقابلات محفوظة")}</span></div></header><div className="interview-pattern-archive__rule"><span className="mono">{t("EVIDENCE RULE", "قاعدة الدليل")}</span><p>{t("A pattern needs two retained sources. Single-source evidence remains visible as a lead to test, not a conclusion to scale.", "يحتاج النمط إلى مصدرين محفوظين. يظل الدليل ذو المصدر الواحد ظاهرا كإشارة للاختبار، لا كاستنتاج للتوسع.")}</p></div><div className="interview-pattern-archive__lanes">{lanes.map((lane) => { const groups = groupLane(lane.key); const recurring = groups.filter((group) => group.sources.length >= 2).slice(0, 2); const early = groups.filter((group) => group.sources.length === 1).slice(0, recurring.length ? 1 : 2); const shown = [...recurring, ...early]; return <article key={lane.key} className="interview-pattern-lane"><div className="interview-pattern-lane__intro"><span className="mono">{t(lane.label, lane.labelAr)}</span><h3>{t(lane.title, lane.titleAr)}</h3><p>{t(lane.copy, lane.copyAr)}</p></div><div className="interview-pattern-lane__groups">{shown.map((group) => { const lead = group.sources[0]; const isRecurring = group.sources.length >= 2; return <div key={`${lane.key}-${lead.id}`} className={isRecurring ? "interview-pattern-group is-recurring" : "interview-pattern-group"}><div className="interview-pattern-group__status"><span>{isRecurring ? t("Recurring evidence", "دليل متكرر") : t("Needs another source", "يحتاج مصدرا آخر")}</span><strong>{formatNum(group.sources.length)} {t(group.sources.length === 1 ? "source" : "sources", group.sources.length === 1 ? "مصدر" : "مصادر")}</strong></div><blockquote>{lane.key === "quote" ? `“${group.value}”` : group.value}</blockquote><p>{t(`Latest source: ${formatDate(sourceDate(lead))}.`, `أحدث مصدر: ${formatDate(sourceDate(lead))}.`)}</p><div className="interview-pattern-group__actions"><Link href={lead.href} className="text-link">{t("Open source", "افتح المصدر")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>{lane.key === "quote" && <Link href={`/tools/positioning-evidence?customerEvidence=${encodeURIComponent(lead.id)}`} className="button button-light">{t("Use in message test", "استخدمه في اختبار رسالة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>}</div></div>; })}{shown.length === 0 && <div className="interview-pattern-lane__empty"><strong>{t("No saved evidence in this lane yet.", "لا يوجد دليل محفوظ في هذا المسار بعد.")}</strong><Link href="/tools/customer-evidence" className="text-link">{t("Capture a customer fact", "التقط حقيقة عميل")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div>}</div></article>; })}</div><footer className="interview-pattern-archive__footer"><p>{t("Counter-signals are intentionally not suppressed. A single source stays visible with its date and source link until another conversation supports or changes it.", "لا تُخفى الإشارات المضادة عمدا. يظل المصدر الواحد ظاهرا بتاريخه ورابط مصدره إلى أن تدعمه محادثة أخرى أو تغيره.")}</p><Link href="/tools/customer-evidence" className="button button-dark">{t("Capture next customer fact", "التقط حقيقة العميل التالية")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></footer></section>;
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
  const [outcomeTargetId, setOutcomeTargetId] = useState<string | null>(null);
  const [introductionOutcome, setIntroductionOutcome] = useState<"next-step" | "useful-learning" | "not-a-fit">("next-step");
  const [outcomeCheckNote, setOutcomeCheckNote] = useState("");
  const [promotedEventId, setPromotedEventId] = useState<string | null>(null);
  useEffect(() => { window.localStorage.setItem("asaasi-event-follow-ups", JSON.stringify(followUps)); }, [followUps]);
  useEffect(() => { window.localStorage.setItem("asaasi-workflow-reviewed", JSON.stringify(reviewed)); }, [reviewed]);

  const decisions = records.filter((record) => record.kind === "decision");
  const toolDecisions = decisions.filter((record) => record.href?.startsWith("/tools/"));
  const customerEvidenceRecords = getCustomerEvidenceRecords(records);
  const introductions = records.filter((record) => record.kind === "introduction");
  const learnedDecisions = decisions.filter((record) => Boolean(record.outcome));
  const openDecisions = decisions.filter((record) => !record.outcome);
  const currentOutcomeMonth = new Date().toISOString().slice(0, 7);
  const monthlyLearnedDecisions = learnedDecisions
    .filter((record) => record.outcomeAt?.slice(0, 7) === currentOutcomeMonth)
    .sort((a, b) => (b.outcomeAt ?? b.updatedAt).localeCompare(a.outcomeAt ?? a.updatedAt));
  const monthlyOutcomeCounts = {
    keep: monthlyLearnedDecisions.filter((record) => record.outcome === "keep").length,
    change: monthlyLearnedDecisions.filter((record) => record.outcome === "change").length,
    stop: monthlyLearnedDecisions.filter((record) => record.outcome === "stop").length,
  };
  const unreviewedEventOutcomes = records.filter((record) => record.kind === "event" && Boolean(record.eventOutcome) && !reviewed[record.id]);
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
  const eventOutcomeLabel = (record: WorkflowRecord) => record.eventOutcome === "decision-moved" ? t("Decision moved", "تغير القرار") : record.eventOutcome === "useful-connection" ? t("Useful connection", "اتصال مفيد") : record.eventOutcome === "useful-learning" ? t("Useful learning", "تعلم مفيد") : t("No change to the next move", "لا تغيير في الخطوة التالية");
  const makeEventDecisionPrimary = (record: WorkflowRecord) => {
    const linkedDecision = decisions.find((decision) => decision.id === record.linkedDecisionId && !decision.outcome);
    if (!linkedDecision) return;
    setWeeklyPrimaryBet(linkedDecision.id);
    setPromotedEventId(record.id);
    setReviewed((current) => ({ ...current, [record.id]: true }));
  };
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
    const outcomeCheckDue = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
    const evidenceLine = isRTL ? `تعلم من مقدمة ${record.titleAr}: ${reflection}` : `Introduction learning from ${record.title}: ${reflection}`;
    if (linkedDecision) upsertWorkflowRecord({ ...linkedDecision, evidence: linkedDecision.evidence ? `${linkedDecision.evidence}\n\n${evidenceLine}` : evidenceLine, reviewDue: linkedDecision.reviewDue && linkedDecision.reviewDue < outcomeCheckDue ? linkedDecision.reviewDue : outcomeCheckDue, reviewDate: isRTL ? `راجع نتيجة المقدمة بحلول ${outcomeCheckDue}` : `Review introduction outcome by ${outcomeCheckDue}`, reviewDateAr: `راجع نتيجة المقدمة بحلول ${outcomeCheckDue}` });
    const followUpDraft = isRTL ? `مرحبًا، شكرًا مرة أخرى على وقتك. أكثر نقطة سأحملها إلى قراري التالي هي: ${reflection} سأعود إليك بعد أن أختبر الخطوة التالية.` : `Thank you again for your time. The point I am carrying into my next decision is: ${reflection} I will come back once I have tested the next step.`;
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
  const startOutcomeCheck = (record: WorkflowRecord) => {
    setOutcomeTargetId(record.id);
    setIntroductionOutcome(record.introductionOutcome ?? "next-step");
    setOutcomeCheckNote(record.introductionOutcomeNote ?? "");
  };
  const saveOutcomeCheck = (record: WorkflowRecord) => {
    const note = outcomeCheckNote.trim();
    if (!note) return;
    const linkedDecision = decisions.find((decision) => decision.id === record.linkedDecisionId);
    const outcomeLabel = introductionOutcome === "next-step" ? t("A next step was agreed", "تم الاتفاق على خطوة تالية") : introductionOutcome === "useful-learning" ? t("Useful learning, no next step", "تعلم مفيد دون خطوة تالية") : t("Not the right connection", "ليست المقدمة المناسبة");
    const evidenceLine = isRTL ? `نتيجة المقدمة ${record.titleAr}: ${outcomeLabel}. ${note}` : `Introduction outcome from ${record.title}: ${outcomeLabel}. ${note}`;
    if (linkedDecision) upsertWorkflowRecord({ ...linkedDecision, evidence: linkedDecision.evidence ? `${linkedDecision.evidence}\n\n${evidenceLine}` : evidenceLine });
    upsertWorkflowRecord({ ...record, outcomeCheckCompletedAt: new Date().toISOString(), introductionOutcome, introductionOutcomeNote: note });
    setRecords(getWorkflowRecords());
    setOutcomeTargetId(null);
    setOutcomeCheckNote("");
  };

  return <ProductShell title={t("Activity", "النشاط")} active="/dashboard/registrations"><div className="workspace-route-page activity-workspace">
    {outcomeTargetId && (() => { const target = introductions.find((record) => record.id === outcomeTargetId); return target ? <section className="activity-outcome-check"><div><SectionLabel>{t("Introduction outcome", "نتيجة المقدمة")}</SectionLabel><h2>{t("Name what changed after the connection.", "سمِ ما الذي تغير بعد المقدمة.")}</h2><p>{t("This result will travel with the linked decision and inform the next introduction brief.", "ستنتقل هذه النتيجة مع القرار المرتبط وتفيد موجز المقدمة التالي.")}</p></div><form onSubmit={(event) => { event.preventDefault(); saveOutcomeCheck(target); }}><label>{t("Outcome", "النتيجة")}<select value={introductionOutcome} onChange={(event) => setIntroductionOutcome(event.target.value as "next-step" | "useful-learning" | "not-a-fit")}><option value="next-step">{t("A next step was agreed", "تم الاتفاق على خطوة تالية")}</option><option value="useful-learning">{t("Useful learning, no next step", "تعلم مفيد دون خطوة تالية")}</option><option value="not-a-fit">{t("Not the right connection", "ليست المقدمة المناسبة")}</option></select></label><label>{t("What should shape the next move?", "ما الذي ينبغي أن يشكل الخطوة التالية؟")}<textarea value={outcomeCheckNote} onChange={(event) => setOutcomeCheckNote(event.target.value)} placeholder={t("Capture the specific result, constraint, or evidence.", "سجل النتيجة أو القيد أو الدليل المحدد.")} required /></label><div><button type="submit" className="button button-dark"><Check size={14} /> {t("Save outcome", "احفظ النتيجة")}</button><button type="button" className="text-link" onClick={() => setOutcomeTargetId(null)}>{t("Cancel", "إلغاء")}</button></div></form></section> : null; })()}
    <div className="product-page-heading compact"><div><SectionLabel>{t("Workspace / Activity", "مساحة العمل / النشاط")}</SectionLabel><h1>{t("See what the work taught you.", "شاهد ما الذي علّمك إياه العمل.")}</h1><p>{t("Decisions, introductions, event commitments, and applications stay connected so the useful context is never rebuilt from scratch.", "تبقى القرارات والمقدمات والتزامات الفعاليات والطلبات متصلة حتى لا يعاد بناء السياق المفيد من الصفر.")}</p></div><SignalTag tone="soft">{t(`${formatNum(records.length)} records`, `${formatNum(records.length)} سجلات`)}</SignalTag></div>

    <section className="activity-learning-summary" aria-labelledby="activity-learning-title"><div className="activity-learning-summary__intro"><SectionLabel>{t("Decision learning", "تعلم القرار")}</SectionLabel><h2 id="activity-learning-title">{t("Keep the signal, not just the file.", "احتفظ بالإشارة لا بالملف فقط.")}</h2><p>{t("Review outcomes stay beside the evidence, owner, and next action that gave each decision its shape.", "تبقى نتائج المراجعة بجانب الدليل والمالك والخطوة التالية التي أعطت كل قرار شكله.")}</p></div><div className="activity-learning-summary__metrics"><div><span>{t("Saved", "محفوظة")}</span><strong>{formatNum(decisions.length)}</strong></div><div><span>{t("From tools", "من الأدوات")}</span><strong>{formatNum(toolDecisions.length)}</strong></div><div><span>{t("Learned", "تم التعلم")}</span><strong>{formatNum(learnedDecisions.length)}</strong></div><div><span>{t("Open review", "مراجعة مفتوحة")}</span><strong>{formatNum(openDecisions.length)}</strong></div></div><Link href="/dashboard/decision-review" className="button button-dark">{t("Review decisions", "راجع القرارات")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></section>

    {monthlyLearnedDecisions.length > 0 && <section className="activity-monthly-learning" aria-label={t("This month’s decision learning", "تعلم قرارات هذا الشهر")}><div className="activity-monthly-learning__intro"><SectionLabel>{t("This month’s decision learning", "تعلم قرارات هذا الشهر")}</SectionLabel><h2>{t("Use what changed before you ask for another conversation.", "استخدم ما تغيّر قبل أن تطلب محادثة أخرى.")}</h2><p>{t("This is a short retained-learning view, not a scorecard. Each outcome keeps its original evidence and can become context for the next relevant introduction.", "هذه رؤية قصيرة للتعلم المحتفظ به، وليست بطاقة نتائج. تحتفظ كل نتيجة بدليلها الأصلي ويمكن أن تصبح سياقا للمقدمة المناسبة التالية.")}</p><dl><div><dt>{t("Keep", "استمر")}</dt><dd>{formatNum(monthlyOutcomeCounts.keep)}</dd></div><div><dt>{t("Change", "غيّر")}</dt><dd>{formatNum(monthlyOutcomeCounts.change)}</dd></div><div><dt>{t("Stop", "أوقف")}</dt><dd>{formatNum(monthlyOutcomeCounts.stop)}</dd></div></dl></div><div className="activity-monthly-learning__records">{monthlyLearnedDecisions.slice(0, 3).map((record) => <article key={record.id} className={`is-${record.outcome}`}><span>{outcomeLabel(record)}</span><h3>{t(record.title, record.titleAr)}</h3><p>{record.evidence || record.weeklyReflection || t("The outcome is saved, ready to reopen when the next question needs context.", "النتيجة محفوظة وجاهزة لإعادة الفتح عندما يحتاج السؤال التالي إلى سياق.")}</p><div><Link href="/dashboard/decision-review" className="text-link">{t("Review learning", "راجع التعلم")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link><Link href={`/dashboard/network?decision=${encodeURIComponent(record.id)}&intent=outcome-learning`} className="button button-light">{t("Find a relevant conversation", "ابحث عن محادثة مناسبة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div></article>)}</div></section>}

    {learnedDecisions.length > 0 && <FounderLearningArchive records={records} onRecordsChanged={() => setRecords(getWorkflowRecords())} />}

    {customerEvidenceRecords.length > 0 && <InterviewPatternArchive records={customerEvidenceRecords} />}

    {introductions.length > 0 && <section className="activity-introduction-summary"><div><SectionLabel>{t("Introduction follow-through", "متابعة المقدمة")}</SectionLabel><h2>{t("Keep the first conversation attached to the decision it can change.", "أبقِ المحادثة الأولى مرتبطة بالقرار الذي يمكن أن تغيّره.")}</h2><p>{t(`${formatNum(introductions.filter((record) => record.status === "submitted").length)} brief${introductions.filter((record) => record.status === "submitted").length === 1 ? "" : "s"} awaiting a connection and ${formatNum(introductions.filter((record) => record.status === "introduced").length)} active conversation${introductions.filter((record) => record.status === "introduced").length === 1 ? "" : "s"}.`, `${formatNum(introductions.filter((record) => record.status === "submitted").length)} موجز${introductions.filter((record) => record.status === "submitted").length === 1 ? "" : "ات"} بانتظار الربط و${formatNum(introductions.filter((record) => record.status === "introduced").length)} محادثة نشطة.`)}</p></div><Link href="#activity-introductions" className="button button-light"><MessageSquare size={14} /> {t("Review introductions", "راجع المقدمات")}</Link></section>}

    {unreviewedEventOutcomes.length > 0 && <section className="activity-event-outcomes"><div><SectionLabel>{t("Event outcome", "نتيجة الفعالية")}</SectionLabel><h2>{t("Bring the room back into the work.", "أعد الغرفة إلى العمل.")}</h2><p>{t("These event signals are waiting to shape the next decision or follow-up.", "إشارات الفعاليات هذه تنتظر لتشكيل القرار أو المتابعة التالية.")}</p></div><div className="activity-event-outcomes__records">{unreviewedEventOutcomes.slice(0, 2).map((record) => { const linkedDecision = decisions.find((decision) => decision.id === record.linkedDecisionId && !decision.outcome); return <article key={record.id}><span className="mono">{eventOutcomeLabel(record)}</span><strong>{t(record.title, record.titleAr)}</strong><p>{record.eventOutcomeNote}</p><div><Link href={record.href} className="text-link">{t("Revisit event", "عد إلى الفعالية")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>{linkedDecision && (promotedEventId === record.id ? <><span className="inline-success"><Check size={13} /> {t("Linked decision is this week's bet", "القرار المرتبط هو رهان هذا الأسبوع")}</span><Link href="/dashboard/weekly-review" className="text-link">{t("Open weekly review", "افتح المراجعة الأسبوعية")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></> : <button type="button" className="text-link" onClick={() => makeEventDecisionPrimary(record)}>{t("Make linked decision this week's bet", "اجعل القرار المرتبط رهان هذا الأسبوع")}</button>)}<button type="button" className="text-link" onClick={() => setReviewed((current) => ({ ...current, [record.id]: true }))}>{t("Mark reviewed", "علِّم كمراجَع")}</button></div></article>; })}</div></section>}

    {decisions.length > 0 && <section className="activity-learning-ledger" aria-label={t("Decision learning ledger", "سجل تعلم القرار")}><div className="activity-learning-ledger__heading"><div><SectionLabel>{t("Learning ledger", "سجل التعلم")}</SectionLabel><h2>{t("The latest useful evidence.", "أحدث الأدلة المفيدة.")}</h2></div><Link href="/dashboard/decision-review" className="text-link">{t("Open full review", "افتح المراجعة الكاملة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div><div className="activity-learning-records">{decisions.slice(0, 3).map((record) => <article key={record.id}><header><span className={record.outcome ? "is-complete" : ""}>{record.outcome ? <Check size={13} /> : t("OPEN", "مفتوح")}</span><strong>{outcomeLabel(record)}</strong></header><h3>{t(record.title, record.titleAr)}</h3><p className="activity-learning-records__evidence">{record.evidence || t("No evidence recorded yet. Return while the customer language or result is still specific.", "لم يُسجل دليل بعد. عد بينما تظل لغة العميل أو النتيجة محددة.")}</p><dl><div><dt>{t("Owner", "المالك")}</dt><dd>{t(record.owner ?? "Founder", record.ownerAr ?? "المؤسس")}</dd></div><div><dt>{t("Next action", "الخطوة التالية")}</dt><dd>{t(record.nextAction ?? "Choose the next action", record.nextActionAr ?? "اختر الخطوة التالية")}</dd></div><div><dt>{t("Review", "المراجعة")}</dt><dd>{t(record.reviewDate ?? "Review after 7 days", record.reviewDateAr ?? "راجع بعد ٧ أيام")}</dd></div></dl><Link href="/dashboard/decision-review" className="text-link">{record.outcome ? t("Review learning", "راجع التعلم") : t("Record learning", "سجل التعلم")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></article>)}</div></section>}

    <div className="request-tabs" role="toolbar" aria-label={t("Filter workspace activity", "تصفية نشاط مساحة العمل")}>{(["all", "decision", "introduction", "event", "application"] as ActivityFilter[]).map((kind) => <button type="button" key={kind} className={filter === kind ? "active" : ""} aria-pressed={filter === kind} onClick={() => setFilter(kind)}>{labels[kind]}</button>)}</div>
    {shown.length ? <div id="activity-introductions" className="receipt-list">{shown.map((record) => <article key={record.id} className={reviewed[record.id] ? "is-reviewed" : ""}><div><span className="mono">{reviewed[record.id] ? t("REVIEWED", "تمت المراجعة") : record.kind === "decision" && record.outcome ? t(`DECISION / ${outcomeLabel(record).toUpperCase()}`, `قرار / ${outcomeLabel(record)}`) : record.kind === "introduction" ? t(`INTRODUCTION / ${introductionStatusLabel(record, t).toUpperCase()}`, `مقدمة / ${introductionStatusLabel(record, t)}`) : t(`${recordKindLabel(record, t).toUpperCase()} / ${record.status.toUpperCase()}`, `${recordKindLabel(record, t)} / ${record.status === "submitted" ? "مقدم" : record.status === "registered" ? "مسجل" : "محفوظ"}`)}</span><h2>{t(record.title, record.titleAr)}</h2><p>{record.kind === "decision" ? record.evidence ? t(`Learning: ${record.evidence}`, `التعلم: ${record.evidence}`) : t("Return to record the evidence before the next conversation makes it less specific.", "عد لتسجيل الدليل قبل أن تجعل المحادثة التالية تفاصيله أقل تحديدا.") : record.kind === "event" ? record.evidence ? t(`Event preparation: ${record.evidence.replace("Event question: ", "")}`, `تحضير الفعالية: ${record.evidence.replace("سؤال الفعالية: ", "")}`) : t("Keep the event close with a calendar handoff or reminder.", "أبقِ الفعالية قريبة عبر إضافة للتقويم أو تذكير.") : record.kind === "introduction" ? introductionCopy(record) : t("Your brief is in review. Return to it if the route asks for more context.", "موجزك قيد المراجعة. عد إليه إذا طلب المسار مزيدا من السياق.")}</p>{record.kind === "introduction" && record.status === "completed" && record.introductionReflection && <div className="activity-introduction-learning"><strong>{t("Conversation learning", "تعلم المحادثة")}</strong><p>{record.introductionReflection}</p><label>{t("Follow-up draft", "مسودة المتابعة")}<textarea defaultValue={record.followUpDraft} onBlur={(event) => saveFollowUpDraft(record, event.target.value)} /></label><div className="activity-introduction-learning__actions"><button type="button" className="text-link" onClick={() => copyFollowUpDraft(record)}>{copiedFollowUpId === record.id ? t("Follow-up copied", "تم نسخ المتابعة") : t("Copy follow-up", "انسخ المتابعة")}</button>{record.outcomeCheckCompletedAt ? <span className="inline-success"><Check size={13} /> {t("Outcome checked", "تم فحص النتيجة")}</span> : <button type="button" className="text-link" onClick={() => startOutcomeCheck(record)}>{record.outcomeCheckDue ? t(`Check outcome by ${record.outcomeCheckDue}`, `افحص النتيجة بحلول ${record.outcomeCheckDue}`) : t("Record outcome", "سجل النتيجة")}</button>}</div></div>}</div><div className="activity-row-actions">{record.kind === "decision" ? <Link href="/dashboard/decision-review" className="button button-ghost">{record.outcome ? t("Review", "مراجعة") : t("Record learning", "سجل التعلم")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link> : <Link href={record.href} className="button button-ghost">{t("Open", "افتح")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>}{record.kind === "event" && <button type="button" className="button button-light" aria-pressed={followUps[record.id] ?? false} onClick={() => setFollowUps((current) => ({ ...current, [record.id]: !current[record.id] }))}><CalendarPlus size={14} /> {followUps[record.id] ? t("Follow-up set", "تم ضبط المتابعة") : t("Set follow-up", "اضبط المتابعة")}</button>}{record.kind === "introduction" && record.status === "submitted" && <button type="button" className="button button-light" onClick={() => updateIntroduction(record, "introduced")}><Check size={14} /> {t("Mark connected", "علِّم كمربوط")}</button>}{record.kind === "introduction" && record.status === "introduced" && (reflectionTargetId === record.id ? <form className="activity-introduction-reflection" onSubmit={(event) => { event.preventDefault(); saveIntroductionReflection(record); }}><label>{t("What changed after this conversation?", "ما الذي تغير بعد هذه المحادثة؟")}<textarea value={introductionReflection} onChange={(event) => setIntroductionReflection(event.target.value)} placeholder={t("Capture the exact insight that should change the linked decision.", "سجل الرؤية الدقيقة التي ينبغي أن تغيّر القرار المرتبط.")} required /></label><div><button type="submit" className="button button-light"><Check size={14} /> {t("Save learning", "احفظ التعلم")}</button><button type="button" className="text-link" onClick={() => setReflectionTargetId(null)}>{t("Cancel", "إلغاء")}</button></div></form> : <button type="button" className="button button-light" onClick={() => startIntroductionReflection(record)}><Check size={14} /> {t("Reflect conversation", "وثّق المحادثة")}</button>)}<button type="button" className="text-link" onClick={() => setReviewed((current) => ({ ...current, [record.id]: !current[record.id] }))}>{reviewed[record.id] ? t("Reopen", "أعد الفتح") : t("Mark reviewed", "علِّم كمراجَع")}</button><button type="button" className="text-link" onClick={() => clear(record.id)}>{t("Remove", "إزالة")}</button></div></article>)}</div> : <div className="empty-state compact-empty"><h2>{t("Your activity will collect here.", "سيتجمع نشاطك هنا.")}</h2><p>{t("Save a decision, keep an event, submit an application, or draft an introduction to create a useful return point.", "احفظ قرارا أو احتفظ بفعالية أو قدم طلبا أو اكتب موجز مقدمة لإنشاء نقطة عودة مفيدة.")}</p><Link href="/tools" className="button button-dark">{t("Open founder tools", "افتح أدوات المؤسس")}</Link></div>}
  </div></ProductShell>;
}
