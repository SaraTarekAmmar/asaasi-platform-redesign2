// Editorial Operating System: Weekly Review uses a cadence-led decision workspace with linear saffron state cues and no circular decoration.
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, Download, Target } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { getWorkflowRecords, upsertWorkflowRecord, type WorkflowRecord } from "../lib/workflowRecords";
import {
  cancelWeeklyPrimaryBetCarryForward,
  clearWeeklyPrimaryBet,
  completeWeeklyPrimaryBet,
  getWeekStart,
  getWeeklyPrimaryBet,
  setWeeklyPrimaryBet,
  setWeeklyPrimaryBetIntent,
  setWeeklyPrimaryBetReminder,
  stageWeeklyPrimaryBetCarryForward,
} from "../lib/weeklyPrimaryBet";
import { ProductShell } from "./ProductFlows";

type PrimaryOutcome = "keep" | "change" | "stop";

function reviewStatus(record: WorkflowRecord, today: string, t: (en: string, ar: string) => string) {
  if (record.outcome) return { label: t("Learning recorded", "تم تسجيل التعلم"), tone: "complete" };
  if (record.reviewDue && record.reviewDue < today) return { label: t("Overdue", "متأخر"), tone: "overdue" };
  if (record.reviewDue === today) return { label: t("Due today", "مستحق اليوم"), tone: "today" };
  return { label: record.reviewDue ? t(`Due ${record.reviewDue}`, `مستحق ${record.reviewDue}`) : t("Set a review date", "حدد تاريخ المراجعة"), tone: "open" };
}

function researchCadenceDueDate(weekStart?: string, today?: string) {
  const date = new Date(`${weekStart ?? getWeekStart()}T12:00:00`);
  date.setDate(date.getDate() + 4);
  const computed = date.toISOString().slice(0, 10);
  const floor = today ?? new Date().toISOString().slice(0, 10);
  return computed < floor ? floor : computed;
}

function weeklyDecisionSource(record: WorkflowRecord, t: (en: string, ar: string) => string) {
  if (!record.href.startsWith("/tools/")) return t("Founder workspace", "مساحة عمل المؤسس");
  const slug = record.href.split("/").filter(Boolean).at(-1) ?? "";
  const labels: Record<string, [string, string]> = {
    pricing: ["Pricing decision", "قرار التسعير"],
    "saas-health": ["SaaS health", "صحة SaaS"],
    "founder-diagnostic": ["Founder diagnostic", "تشخيص المؤسس"],
    "unit-economics": ["Unit economics", "اقتصاديات الوحدة"],
    "retention-recovery": ["Retention recovery", "استعادة الاحتفاظ"],
    "activation-evidence": ["Activation evidence", "دليل التفعيل"],
    "gtm-map": ["GTM channel map", "خريطة قناة GTM"],
    "positioning-evidence": ["Positioning evidence", "دليل التموضع"],
    "customer-evidence": ["Customer evidence", "دليل العميل"],
    "market-map": ["Market map", "خريطة السوق"],
    "survival-calculator": ["Runway", "المدرج النقدي"],
  };
  const label = labels[slug] ?? ["Founder tool", "أداة المؤسس"];
  return t(label[0], label[1]);
}

function WeeklyLearningDigest({ records }: { records: WorkflowRecord[] }) {
  const { t, isRTL, formatNum } = useLocale();
  const weekStart = getWeekStart();
  const completed = records
    .filter((record) => record.kind === "decision" && Boolean(record.outcome) && Boolean(record.outcomeAt) && (record.outcomeAt ?? "").slice(0, 10) >= weekStart)
    .sort((a, b) => (b.outcomeAt ?? b.updatedAt).localeCompare(a.outcomeAt ?? a.updatedAt));
  const outcomeLabel = (record: WorkflowRecord) => record.outcome === "keep" ? t("Keep", "استمر") : record.outcome === "change" ? t("Change", "غيّر") : t("Stop", "أوقف");
  const dateLabel = (record: WorkflowRecord) => new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-GB", { weekday: "short", month: "short", day: "numeric" }).format(new Date(record.outcomeAt ?? record.updatedAt));
  const excerpt = (record: WorkflowRecord) => {
    const source = record.evidence || record.weeklyReflection || record.nextAction || "";
    if (!source) return t("No separate evidence note was retained. Reopen the source before you apply this learning.", "لم تُحتفظ بملاحظة دليل منفصلة. أعد فتح المصدر قبل تطبيق هذا التعلم.");
    return source.length > 220 ? `${source.slice(0, 217).trim()}…` : source;
  };
  if (!completed.length) return null;
  return <section className="weekly-learning-digest" aria-labelledby="weekly-learning-digest-title"><header className="weekly-learning-digest__heading"><div><SectionLabel>{t("This week’s retained learning", "تعلم هذا الأسبوع المحتفظ به")}</SectionLabel><h2 id="weekly-learning-digest-title">{t("Read what closed before you open the next question.", "اقرأ ما أُغلق قبل أن تفتح السؤال التالي.")}</h2><p>{t("These are explicit Keep, Change, and Stop outcomes completed this week. They remain source records, not a ranking or a prescription for the next bet.", "هذه نتائج صريحة من استمر وغيّر وأوقف اكتملت هذا الأسبوع. تظل سجلات مصدر، وليست ترتيبا أو وصفة للرهان التالي.")}</p></div><dl><div><dt>{t("Closed this week", "أُغلقت هذا الأسبوع")}</dt><dd>{formatNum(completed.length)}</dd></div><div><dt>{t("Week of", "أسبوع")}</dt><dd>{weekStart}</dd></div></dl></header><div className="weekly-learning-digest__boundary"><span className="mono">{t("LEARNING BOUNDARY", "حد التعلم")}</span><p>{t("The digest keeps original context close. It does not merge outcomes, infer a recurring pattern, or choose a primary bet.", "يبقي الملخص السياق الأصلي قريبا. لا يدمج النتائج ولا يستنتج نمطا متكررا ولا يختار رهانا رئيسيا.")}</p></div><div className="weekly-learning-digest__records">{completed.slice(0, 3).map((record, index) => <article key={record.id} className={`is-${record.outcome}`}><header><span>{isRTL ? `٠${index + 1}` : String(index + 1).padStart(2, "0")}</span><div><strong>{outcomeLabel(record)}</strong><small>{dateLabel(record)}</small></div></header><div className="weekly-learning-digest__copy"><span className="mono">{weeklyDecisionSource(record, t)}</span><h3>{t(record.title, record.titleAr)}</h3><p>{excerpt(record)}</p></div><dl><div><dt>{t("Original test", "الاختبار الأصلي")}</dt><dd>{t(record.nextAction ?? "Open the source record", record.nextActionAr ?? "افتح سجل المصدر")}</dd></div><div><dt>{t("Owner", "المالك")}</dt><dd>{t(record.owner ?? "Founder", record.ownerAr ?? "المؤسس")}</dd></div></dl><div className="weekly-learning-digest__actions"><Link href={record.href} className="button button-light">{t("Reopen source", "أعد فتح المصدر")}</Link><Link href={`/tools/customer-evidence?reuse=${encodeURIComponent(record.id)}`} className="text-link">{t("Open a fresh customer test", "افتح اختبار عميل جديد")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div></article>)}</div><footer><Link href="/dashboard/registrations" className="text-link">{t("Open full learning archive", "افتح أرشيف التعلم الكامل")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link><p>{t("Only the three latest closed records are shown here. Activity retains the complete archive.", "تُعرض هنا فقط أحدث ثلاثة سجلات مغلقة. يحتفظ النشاط بالأرشيف الكامل.")}</p></footer></section>;
}

function FounderReadingPreRead({ records }: { records: WorkflowRecord[] }) {
  const { t, isRTL } = useLocale();
  const agendaItem = records.filter((record) => record.kind === "note" && Boolean(record.founderReadingReviewAgenda)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const reading = records.find((record) => record.id === agendaItem?.founderReadingReviewAgenda?.founderReadingId && Boolean(record.founderEvidenceReading));
  if (!agendaItem || !reading?.founderEvidenceReading) return null;
  const event = records.find((record) => record.id === reading.founderEvidenceReading?.eventSourceId);
  const decision = records.find((record) => record.id === reading.founderEvidenceReading?.decisionSourceId);
  return <section className="weekly-founder-reading-preread" aria-labelledby="weekly-founder-reading-preread-title"><header><div><SectionLabel>{t("Founder reading pre-read", "مادة قراءة المؤسس المسبقة")}</SectionLabel><h2 id="weekly-founder-reading-preread-title">{t("Read one unresolved source pair before you set the week’s decision agenda.", "اقرأ زوج مصدر مفتوحا واحدا قبل تحديد جدول قرارات الأسبوع.")}</h2><p>{t("This is a founder-authored interpretation carried from Activity. It is not a verified pattern, primary bet, decision outcome, or instruction for the week.", "هذا تفسير كتبه المؤسس محمول من النشاط. ليس نمطا موثقا أو رهانا رئيسيا أو نتيجة قرار أو تعليمة للأسبوع.")}</p></div><span className="mono">{t("PRE-READ", "مادة مسبقة")}</span></header><div className="weekly-founder-reading-preread__body"><article><span className="mono">{t("AUTHOR READING", "قراءة المؤسس")}</span><strong>{reading.founderEvidenceReading.interpretation}</strong><p>{t("Question kept open: ", "السؤال الذي يبقى مفتوحا: ")}{reading.founderEvidenceReading.nextQuestion}</p></article><aside><span className="mono">{t("SOURCE PAIR", "زوج المصدر")}</span><dl><div><dt>{t("Event", "الفعالية")}</dt><dd>{t(event?.title ?? "Event source no longer available", event?.titleAr ?? "مصدر الفعالية لم يعد متاحا")}</dd></div><div><dt>{t("Decision", "القرار")}</dt><dd>{t(decision?.title ?? "Decision source no longer available", decision?.titleAr ?? "مصدر القرار لم يعد متاحا")}</dd></div></dl><div>{event && <Link href={event.href} className="text-link">{t("Open event", "افتح الفعالية")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>}{decision && <><Link href={decision.href} className="text-link">{t("Open decision", "افتح القرار")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link><Link href={`/dashboard/decision-accountability?decision=${encodeURIComponent(decision.id)}`} className="text-link">{t("Open accountability", "افتح المساءلة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></>}</div></aside></div><footer><Link href="/dashboard/registrations#founder-evidence-reading-notes" className="button button-light">{t("Open founder reading", "افتح قراءة المؤسس")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link><p>{t("Use the source routes if you need more context. Weekly Review does not change this reading or turn it into a decision by showing it here.", "استخدم مسارات المصدر إذا احتجت إلى سياق أكبر. لا تغير المراجعة الأسبوعية هذه القراءة ولا تحولها إلى قرار بمجرد عرضها هنا.")}</p></footer></section>;
}

function FounderReadingRevisitAcknowledgement({ records, onRecordsChanged }: { records: WorkflowRecord[]; onRecordsChanged: () => void }) {
  const { t, isRTL } = useLocale();
  const agendaItem = records.filter((record) => record.kind === "note" && Boolean(record.founderReadingReviewAgenda)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const reading = records.find((record) => record.id === agendaItem?.founderReadingReviewAgenda?.founderReadingId && Boolean(record.founderEvidenceReading));
  const revisit = records.filter((record) => record.kind === "note" && record.founderReadingRevisit?.reviewAgendaId === agendaItem?.id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const [remainingUncertainty, setRemainingUncertainty] = useState("");
  const [saved, setSaved] = useState(false);
  if (!agendaItem || !reading?.founderEvidenceReading) return null;
  const saveRevisit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!remainingUncertainty.trim()) return;
    const revisitedAt = new Date().toISOString();
    upsertWorkflowRecord({
      id: `founder-reading-revisit-${Date.now()}`,
      kind: "note",
      title: `Open question revisited: ${reading.title}`,
      titleAr: `سؤال مفتوح تمت مراجعته: ${reading.titleAr}`,
      href: "/dashboard/weekly-review",
      status: "saved",
      nextAction: remainingUncertainty.trim(),
      nextActionAr: remainingUncertainty.trim(),
      founderReadingRevisit: { founderReadingId: reading.id, reviewAgendaId: agendaItem.id, remainingUncertainty: remainingUncertainty.trim(), revisitedAt },
    });
    setRemainingUncertainty("");
    setSaved(true);
    onRecordsChanged();
  };
  return <section className="weekly-founder-reading-revisit" aria-labelledby="weekly-founder-reading-revisit-title"><header><div><SectionLabel>{t("Open question revisit", "مراجعة السؤال المفتوح")}</SectionLabel><h2 id="weekly-founder-reading-revisit-title">{t("Record that you returned to the question, without claiming the question is settled.", "سجل أنك عدت إلى السؤال، من دون الادعاء بأن السؤال قد حُسم.")}</h2><p>{t("The acknowledgement keeps the founder reading open. Name what remains uncertain after this review rather than forcing a result or a next task.", "يبقي الإقرار قراءة المؤسس مفتوحة. سمِ ما يبقى غير مؤكد بعد هذه المراجعة بدلا من فرض نتيجة أو مهمة تالية.")}</p></div><span className="mono">{t("HUMAN REVISIT", "مراجعة بشرية")}</span></header><div className="weekly-founder-reading-revisit__context"><div><span className="mono">{t("QUESTION CARRIED", "السؤال المحمول")}</span><strong>{reading.founderEvidenceReading.nextQuestion}</strong></div><div><span className="mono">{t("REVIEW BOUNDARY", "حد المراجعة")}</span><p>{t("This does not update the reading, sources, decision, primary bet, owner, date, outcome, or follow-up. It does not create a priority, recommendation, task, or reminder.", "لا يحدث هذا القراءة أو المصادر أو القرار أو الرهان الرئيسي أو المالك أو التاريخ أو النتيجة أو المتابعة. ولا ينشئ أولوية أو توصية أو مهمة أو تذكيرا.")}</p></div></div>{revisit ? <div className="weekly-founder-reading-revisit__saved"><span className="mono">{t("MOST RECENT REVISIT", "أحدث مراجعة")}</span><strong>{t("Revisited on ", "تمت المراجعة في ")}{new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-GB", { month: "short", day: "numeric", year: "numeric" }).format(new Date(revisit.founderReadingRevisit?.revisitedAt ?? revisit.updatedAt))}</strong><p>{revisit.founderReadingRevisit?.remainingUncertainty}</p><Link href="/dashboard/registrations#founder-evidence-reading-notes" className="text-link">{t("Reopen founder reading", "أعد فتح قراءة المؤسس")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div> : <form className="weekly-founder-reading-revisit__form" onSubmit={saveRevisit}><label>{t("What remains uncertain after revisiting this question?", "ما الذي يبقى غير مؤكد بعد مراجعة هذا السؤال؟")}<textarea value={remainingUncertainty} onChange={(event) => { setRemainingUncertainty(event.target.value); setSaved(false); }} required placeholder={t("Keep the uncertainty specific. Do not force a conclusion that the source pair cannot support.", "أبقِ عدم اليقين محددا. لا تفرض استنتاجا لا يمكن لزوج المصدر دعمه.")} /></label><div><button type="submit" className="button button-dark"><Check size={14} /> {t("Acknowledge revisit", "أقرّ بالمراجعة")}</button>{saved && <span className="inline-success"><Check size={14} /> {t("Open question revisit saved separately", "حُفظت مراجعة السؤال المفتوح بشكل منفصل")}</span>}</div></form>}<footer><p>{t("A revisit is not evidence of resolution. Reopen the source pair before you decide whether more context is needed.", "المراجعة ليست دليلا على الحسم. أعد فتح زوج المصدر قبل أن تقرر ما إذا كان هناك حاجة إلى سياق إضافي.")}</p><Link href="/dashboard/registrations" className="button button-light">{t("Open Activity", "افتح النشاط")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></footer></section>;
}

function FounderReadingRevisitEvidenceHandoff({ records }: { records: WorkflowRecord[] }) {
  const { t, isRTL } = useLocale();
  const revisit = records.filter((record) => record.kind === "note" && Boolean(record.founderReadingRevisit)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  if (!revisit?.founderReadingRevisit) return null;
  return <section className="weekly-founder-reading-evidence-handoff" aria-labelledby="weekly-founder-reading-evidence-handoff-title"><div><SectionLabel>{t("Fresh customer evidence", "دليل عميل جديد")}</SectionLabel><h2 id="weekly-founder-reading-evidence-handoff-title">{t("Take the remaining uncertainty to one new customer moment.", "خذ عدم اليقين المتبقي إلى لحظة عميل جديدة واحدة.")}</h2><p>{t("The revisit remains source context. Customer Evidence will require new buyer facts, a concrete moment, a workaround, exact language, a success condition, and an observable response rule.", "تظل المراجعة سياق مصدر. سيتطلب دليل العميل حقائق مشترٍ جديدة ولحظة ملموسة وحلا التفافيا ولغة دقيقة وشرط نجاح وقاعدة استجابة قابلة للملاحظة.")}</p></div><aside><span className="mono">{t("REMAINING UNCERTAINTY", "عدم اليقين المتبقي")}</span><strong>{revisit.founderReadingRevisit.remainingUncertainty}</strong><p>{t("No source field is copied into the test. The new evidence keeps only the revisit ID as a traceable reference.", "لا يُنسخ أي حقل مصدر إلى الاختبار. يحتفظ الدليل الجديد بمعرف المراجعة فقط كمرجع قابل للتتبع.")}</p><Link href={`/tools/customer-evidence?revisit=${encodeURIComponent(revisit.id)}`} className="button button-dark">{t("Open fresh customer evidence", "افتح دليل عميل جديد")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></aside></section>;
}

export function WeeklyDecisionReviewWorkspace() {
  const { t, formatNum, isRTL } = useLocale();
  const [records, setRecords] = useState(() => getWorkflowRecords());
  const [primaryBet, setPrimaryBet] = useState(() => getWeeklyPrimaryBet());
  const [weekIntent, setWeekIntent] = useState(() => primaryBet?.weekIntent ?? "");
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [weekIntentSaved, setWeekIntentSaved] = useState(false);
  const [closedPrimaryOutcome, setClosedPrimaryOutcome] = useState<PrimaryOutcome | null>(null);
  const [researchQuestion, setResearchQuestion] = useState("");
  const [researchBuyer, setResearchBuyer] = useState("");
  const [researchDueDate, setResearchDueDate] = useState("");
  const [researchResponseRule, setResearchResponseRule] = useState("");
  const [researchSaved, setResearchSaved] = useState(false);
  const [includeRuleGuide, setIncludeRuleGuide] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const decisions = records.filter((record) => record.kind === "decision");
  const agenda = decisions
    .filter((record) => !record.outcome)
    .sort((a, b) => (a.reviewDue ?? "9999-12-31").localeCompare(b.reviewDue ?? "9999-12-31"));
  const overdue = agenda.filter((record) => record.reviewDue && record.reviewDue < today);
  const dueThisWeek = agenda.filter((record) => record.reviewDue && record.reviewDue >= today && record.reviewDue <= new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10));
  const primaryRecord = decisions.find((record) => record.id === primaryBet?.recordId);
  const primaryRuleGuide = primaryRecord?.knowledgeGuidance;
  const candidateResearchCadence = primaryRecord?.researchCadence;
  const activeResearchCadence = candidateResearchCadence?.primaryBetWeek === primaryBet?.weekStart ? candidateResearchCadence : undefined;
  const completedThisWeek = decisions
    .filter((record) => Boolean(record.outcome) && Boolean(record.outcomeAt) && (record.outcomeAt ?? "").slice(0, 10) >= getWeekStart())
    .sort((a, b) => (b.outcomeAt ?? b.updatedAt).localeCompare(a.outcomeAt ?? a.updatedAt))
    .slice(0, 3);
  const introductionLearnings = records.filter((record) => record.kind === "introduction" && record.status === "completed" && record.introductionReflection && record.linkedDecisionId && agenda.some((decision) => decision.id === record.linkedDecisionId));
  const canClosePrimary = Boolean(reflection.trim() || primaryRecord?.weeklyReflection || primaryRecord?.evidence);
  const repeatedDeferral = (primaryBet?.carryCount ?? 0) >= 2;
  const commitmentCandidates = [...agenda]
    .sort((a, b) => {
      const score = (record: WorkflowRecord) => Number(record.reviewDue === today) * 4 + Number(Boolean(record.reviewDue && record.reviewDue < today)) * 3 + Number(Boolean(record.evidence || record.weeklyReflection));
      return score(b) - score(a) || (a.reviewDue ?? "9999-12-31").localeCompare(b.reviewDue ?? "9999-12-31");
    })
    .slice(0, 3);

  useEffect(() => {
    setReflection(primaryRecord?.weeklyReflection ?? "");
    setWeekIntent(primaryBet?.weekIntent ?? "");
    const cadence = primaryRecord?.researchCadence;
    const currentCadence = cadence?.primaryBetWeek === primaryBet?.weekStart ? cadence : undefined;
    setResearchQuestion(currentCadence?.question ?? "");
    setResearchBuyer(currentCadence?.buyer ?? "");
    setResearchDueDate(currentCadence?.dueDate ?? researchCadenceDueDate(primaryBet?.weekStart, today));
    setResearchResponseRule(currentCadence?.responseRule ?? "");
    setIncludeRuleGuide(Boolean(currentCadence?.ruleSourceId && primaryRecord?.knowledgeGuidance));
    setReflectionSaved(false);
    setWeekIntentSaved(false);
    setResearchSaved(false);
    setClosedPrimaryOutcome(null);
  }, [primaryRecord?.id, primaryBet?.weekStart]);

  const choosePrimary = (recordId: string) => setPrimaryBet(setWeeklyPrimaryBet(recordId));
  const completePrimary = () => setPrimaryBet(completeWeeklyPrimaryBet());
  const clearPrimary = () => {
    clearWeeklyPrimaryBet();
    setPrimaryBet(null);
  };
  const setReminder = (reminderDay?: "tuesday" | "thursday") => setPrimaryBet(setWeeklyPrimaryBetReminder(reminderDay));
  const saveWeekIntent = () => {
    const saved = setWeeklyPrimaryBetIntent(weekIntent);
    if (!saved) return;
    setPrimaryBet(saved);
    setWeekIntentSaved(true);
  };
  const stageCarryForward = () => setPrimaryBet(stageWeeklyPrimaryBetCarryForward());
  const cancelCarryForward = () => setPrimaryBet(cancelWeeklyPrimaryBetCarryForward());

  const downloadWeeklyReview = () => {
    const labels = isRTL
      ? { title: "موجز التشغيل الأسبوعي من ASaaSI", week: "أسبوع", primary: "الرهان الرئيسي", intention: "نية الجمعة", plan: "حالة الخطة", carry: "حالة الترحيل", carryCount: "مرات الترحيل", reflection: "تأمل الجمعة", research: "خطوة البحث الحالية", learning: "تعلم صريح أُغلق هذا الأسبوع", open: "أقرب قرارات مفتوحة", source: "سجل المصدر", status: primaryBet?.completedAt ? "تم تحديد الخطة" : "قيد الإعداد", carried: primaryBet?.carryForward ? "مقرر للأسبوع التالي" : "غير مقرر", none: "لم يتم اختيار رهان رئيسي بعد", noReflection: "لم يُسجل تأمل بعد", noIntention: "لم تُسجل نية الجمعة بعد", noResearch: "لا توجد خطوة بحث حالية مرتبطة بالرهان الرئيسي", noLearning: "لا توجد نتيجة صريحة مكتملة هذا الأسبوع", noOpen: "لا توجد قرارات مفتوحة مجدولة" }
      : { title: "ASaaSI weekly operating brief", week: "Week of", primary: "Primary bet", intention: "Friday intention", plan: "Plan status", carry: "Carry-forward status", carryCount: "Carry-forward count", reflection: "Friday reflection", research: "Current research move", learning: "Explicit learning closed this week", open: "Nearest open decisions", source: "Source record", status: primaryBet?.completedAt ? "Plan set" : "In progress", carried: primaryBet?.carryForward ? "Staged for next week" : "Not staged", none: "No primary bet selected yet", noReflection: "No reflection recorded yet", noIntention: "No Friday intention recorded yet", noResearch: "No current research move attached to the primary bet", noLearning: "No explicit outcome was completed this week", noOpen: "No open decisions are scheduled" };
    const outcomeLabel = (record: WorkflowRecord) => record.outcome === "keep" ? t("Keep", "استمر") : record.outcome === "change" ? t("Change", "غيّر") : t("Stop", "أوقف");
    const decisionLines = agenda.slice(0, 3).map((record) => `- ${t(record.title, record.titleAr)}\n  - ${t(record.owner ?? "Founder", record.ownerAr ?? "المؤسس")}: ${t(record.nextAction ?? "No next action", record.nextActionAr ?? "لا توجد خطوة تالية")}\n  - ${labels.source}: ${record.href}`).join("\n");
    const learningLines = completedThisWeek.map((record) => `- ${outcomeLabel(record)} | ${weeklyDecisionSource(record, t)} | ${t(record.title, record.titleAr)}\n  - ${record.evidence || record.weeklyReflection || t("No separate evidence note retained.", "لم تُحتفظ بملاحظة دليل منفصلة.")}\n  - ${labels.source}: ${record.href}`).join("\n");
    const researchLine = activeResearchCadence
      ? `${activeResearchCadence.question}\n- ${t("Buyer", "المشتري")}: ${activeResearchCadence.buyer}\n- ${t("Due", "الموعد")}: ${activeResearchCadence.dueDate}\n- ${t("Decision rule", "قاعدة القرار")}: ${activeResearchCadence.responseRule}\n- ${labels.source}: ${primaryRecord?.href ?? "/dashboard/weekly-review"}`
      : labels.noResearch;
    const summary = [
      `# ${labels.title}`,
      "",
      `${labels.week}: ${primaryBet?.weekStart ?? getWeekStart()}`,
      `${labels.primary}: ${primaryRecord ? t(primaryRecord.title, primaryRecord.titleAr) : labels.none}`,
      `${labels.intention}: ${primaryBet?.weekIntent ?? labels.noIntention}`,
      `${labels.plan}: ${labels.status}`,
      `${labels.carry}: ${labels.carried}`,
      `${labels.carryCount}: ${primaryBet?.carryCount ?? 0}`,
      `${labels.reflection}: ${primaryRecord?.weeklyReflection ?? labels.noReflection}`,
      "",
      `## ${labels.research}`,
      researchLine,
      "",
      `## ${labels.learning}`,
      learningLines || `- ${labels.noLearning}`,
      "",
      `## ${labels.open}`,
      decisionLines || `- ${labels.noOpen}`,
      "",
      t("This brief contains retained source records only. It does not rank learnings, infer a trend, choose a priority, or create a task.", "يحتوي هذا الموجز على سجلات مصدر محفوظة فقط. لا يرتب التعلم ولا يستنتج اتجاها ولا يختار أولوية ولا ينشئ مهمة."),
      "",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([summary], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `asaasi-weekly-operating-brief-${primaryBet?.weekStart ?? getWeekStart()}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPrimaryBetCalendar = () => {
    if (!primaryRecord) return;
    const weekStart = new Date(`${primaryBet?.weekStart ?? getWeekStart()}T09:00:00`);
    const offset = primaryBet?.reminderDay === "thursday" ? 3 : primaryBet?.reminderDay === "tuesday" ? 1 : 0;
    weekStart.setDate(weekStart.getDate() + offset);
    const end = new Date(weekStart.getTime() + 30 * 60 * 1000);
    const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const escapeIcs = (value: string) => value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
    const title = isRTL ? `مراجعة الرهان الرئيسي: ${primaryRecord.titleAr}` : `Primary bet check-in: ${primaryRecord.title}`;
    const description = isRTL ? `الخطوة التالية: ${primaryRecord.nextActionAr ?? "راجع الرهان الرئيسي"}${primaryBet?.weekIntent ? `\\nما ينبغي أن يتغير بحلول الجمعة: ${primaryBet.weekIntent}` : ""}` : `Next action: ${primaryRecord.nextAction ?? "Review the primary bet"}${primaryBet?.weekIntent ? `\\nBy Friday: ${primaryBet.weekIntent}` : ""}`;
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ASaaSI//Primary Bet//EN", "BEGIN:VEVENT", `UID:primary-bet-${primaryRecord.id}-${primaryBet?.weekStart ?? getWeekStart()}@asaasi`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(weekStart)}`, `DTEND:${stamp(end)}`, `SUMMARY:${escapeIcs(title)}`, `DESCRIPTION:${escapeIcs(description)}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `asaasi-primary-bet-${primaryRecord.id}-${primaryBet?.weekStart ?? getWeekStart()}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const saveReflection = () => {
    if (!primaryRecord || !reflection.trim()) return;
    upsertWorkflowRecord({
      ...primaryRecord,
      weeklyReflection: reflection.trim(),
      weeklyReflectionAt: new Date().toISOString(),
      evidence: primaryRecord.evidence || reflection.trim(),
    });
    setRecords(getWorkflowRecords());
    setReflectionSaved(true);
  };

  const saveResearchCadence = () => {
    if (!primaryRecord || !primaryBet || !researchQuestion.trim() || !researchBuyer.trim() || !researchDueDate || !researchResponseRule.trim()) return;
    upsertWorkflowRecord({
      ...primaryRecord,
      researchCadence: {
        primaryBetWeek: primaryBet.weekStart,
        question: researchQuestion.trim(),
        buyer: researchBuyer.trim(),
        dueDate: researchDueDate,
        responseRule: researchResponseRule.trim(),
        ruleSourceId: includeRuleGuide && primaryRuleGuide ? primaryRecord.id : undefined,
        ruleClaim: includeRuleGuide && primaryRuleGuide ? primaryRuleGuide.claim : undefined,
        ruleScope: includeRuleGuide && primaryRuleGuide ? primaryRuleGuide.scope : undefined,
        ruleNextEvidenceMove: includeRuleGuide && primaryRuleGuide ? primaryRuleGuide.nextEvidenceMove : undefined,
        createdAt: primaryRecord.researchCadence?.primaryBetWeek === primaryBet.weekStart ? primaryRecord.researchCadence.createdAt : new Date().toISOString(),
      },
    });
    setRecords(getWorkflowRecords());
    setResearchSaved(true);
  };

  const closePrimaryWithLearning = (outcome: PrimaryOutcome) => {
    if (!primaryRecord) return;
    const learning = reflection.trim() || primaryRecord.weeklyReflection || primaryRecord.evidence;
    if (!learning) return;
    const now = new Date().toISOString();
    upsertWorkflowRecord({
      ...primaryRecord,
      status: "completed",
      outcome,
      outcomeAt: now,
      weeklyReflection: learning,
      weeklyReflectionAt: primaryRecord.weeklyReflectionAt ?? now,
      evidence: primaryRecord.evidence || learning,
    });
    setRecords(getWorkflowRecords());
    clearWeeklyPrimaryBet();
    setPrimaryBet(null);
    setClosedPrimaryOutcome(outcome);
  };

  if (!decisions.length) {
    return <ProductShell title={t("Weekly review", "المراجعة الأسبوعية")} active="/dashboard/registrations"><div className="workspace-route-page"><div className="empty-state"><h2>{t("A weekly review starts with one saved decision.", "تبدأ المراجعة الأسبوعية بقرار محفوظ واحد.")}</h2><p>{t("Export a tool brief, then return here to decide which bet needs attention before the week fills up.", "صدّر موجز أداة، ثم عد هنا لتقرر أي رهان يحتاج الانتباه قبل أن يمتلئ الأسبوع.")}</p><Link href="/tools" className="button button-dark">{t("Open founder tools", "افتح أدوات المؤسس")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></div></div></ProductShell>;
  }

  const outcomeOptions: { id: PrimaryOutcome; label: string; labelAr: string }[] = [
    { id: "keep", label: "Keep approach", labelAr: "استمر بالنهج" },
    { id: "change", label: "Change approach", labelAr: "غيّر النهج" },
    { id: "stop", label: "Stop this approach", labelAr: "أوقف هذا النهج" },
  ];

  return <ProductShell title={t("Weekly review", "المراجعة الأسبوعية")} active="/dashboard/registrations">
    <div className="workspace-route-page weekly-decision-review">
      <div className="product-page-heading compact">
        <div>
          <SectionLabel>{t("Workspace / Weekly review", "مساحة العمل / المراجعة الأسبوعية")}</SectionLabel>
          <h1>{t("Choose the few bets worth your week.", "اختر الرهانات القليلة التي تستحق أسبوعك.")}</h1>
          <p>{t("This agenda brings together open decision reviews in due-date order. Start with the evidence most likely to change the next move.", "يجمع هذا الجدول مراجعات القرارات المفتوحة حسب تاريخ الاستحقاق. ابدأ بالدليل الأرجح لتغيير الخطوة التالية.")}</p>
        </div>
        <SignalTag tone={overdue.length ? "clay" : "soft"}>{overdue.length ? t(`${formatNum(overdue.length)} overdue`, `${formatNum(overdue.length)} متأخر`) : t("Review ready", "جاهز للمراجعة")}</SignalTag>
      </div>

      <section className="weekly-review-brief">
        <div>
          <SectionLabel>{t("This week", "هذا الأسبوع")}</SectionLabel>
          <h2>{overdue.length ? t("Clear the overdue evidence before adding another bet.", "أغلق الأدلة المتأخرة قبل إضافة رهان آخر.") : dueThisWeek.length ? t("These are the decisions that can move this week.", "هذه هي القرارات التي يمكن أن تتحرك هذا الأسبوع.") : t("Set the next review point before the week disappears.", "حدد نقطة المراجعة التالية قبل أن يختفي الأسبوع.")}</h2>
          <p>{t("One decision does not need more activity. It needs a named owner, a review date, and the evidence that changes the approach.", "لا يحتاج قرار واحد إلى نشاط أكثر. يحتاج إلى مالك مسمى وتاريخ مراجعة ودليل يغيّر النهج.")}</p>
        </div>
        <dl><div><dt>{t("Open", "مفتوحة")}</dt><dd>{formatNum(agenda.length)}</dd></div><div><dt>{t("This week", "هذا الأسبوع")}</dt><dd>{formatNum(dueThisWeek.length)}</dd></div><div><dt>{t("Overdue", "متأخرة")}</dt><dd>{formatNum(overdue.length)}</dd></div></dl>
        <div className="weekly-review-brief__actions"><Link href="/dashboard/decision-accountability" className="button button-light">{t("Assign accountability", "عيّن المساءلة")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link><button type="button" className="text-link" onClick={downloadWeeklyReview}><Download size={14} /> {t("Download operating brief", "نزّل موجز التشغيل")}</button></div>
      </section>

      <WeeklyLearningDigest records={records} />

      <FounderReadingPreRead records={records} />
      <FounderReadingRevisitAcknowledgement records={records} onRecordsChanged={() => setRecords(getWorkflowRecords())} />
      <FounderReadingRevisitEvidenceHandoff records={records} />

      {introductionLearnings.length > 0 && <section className="weekly-introduction-learning">
        <div><SectionLabel>{t("Conversation learning", "تعلم المحادثة")}</SectionLabel><h2>{t("New conversation evidence is ready for the next decision.", "دليل محادثة جديد جاهز للقرار التالي.")}</h2></div>
        <div>{introductionLearnings.map((record) => <article key={record.id}><strong>{t(record.title, record.titleAr)}</strong><p>{record.introductionReflection}</p></article>)}</div>
        <Link href="/dashboard/registrations" className="text-link">{t("Open Activity", "افتح النشاط")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>
      </section>}

      {!primaryRecord && commitmentCandidates.length > 0 && <section className="weekly-preweek-commitment" aria-label={t("Pre-week commitment", "التزام ما قبل الأسبوع")}>
        <div className="weekly-preweek-commitment__intro"><SectionLabel>{t("Pre-week commitment", "التزام ما قبل الأسبوع")}</SectionLabel><h2>{t("Name one decision you want to return to on Friday.", "سمِ قرارا واحدا تريد العودة إليه يوم الجمعة.")}</h2><p>{t("Choose an existing decision, not another task. The short intention you add next will give Friday’s reflection something specific to test.", "اختر قرارا قائما، لا مهمة أخرى. ستمنح النية القصيرة التي تضيفها لاحقا لتأمل الجمعة شيئا محددا لاختباره.")}</p></div>
        <div className="weekly-preweek-commitment__items">{commitmentCandidates.map((record) => { const status = reviewStatus(record, today, t); return <article key={record.id}><span>{status.label}</span><h3>{t(record.title, record.titleAr)}</h3><p>{t(record.nextAction ?? "Choose the next action", record.nextActionAr ?? "اختر الخطوة التالية")}</p><div><button type="button" className="button button-light" onClick={() => choosePrimary(record.id)}>{t("Choose for this week", "اختره لهذا الأسبوع")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</button><Link href={`/dashboard/decision-review?decision=${encodeURIComponent(record.id)}`} className="text-link">{t("Review first", "راجع أولا")}</Link></div></article>; })}</div>
        <Link href="/dashboard/decision-review" className="text-link weekly-preweek-commitment__review">{t("Prepare a different decision in Decision Review", "جهز قرارا مختلفا في مراجعة القرار")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>
      </section>}

      {primaryRecord && <>
        <section className={`weekly-primary-bet ${primaryBet?.completedAt ? "is-complete" : ""}`}>
          <div>
            <SectionLabel>{primaryBet?.carriedFromWeekStart ? t("Carried primary bet", "رهان رئيسي مرحّل") : primaryBet?.completedAt ? t("Weekly review closed", "أُغلقت المراجعة الأسبوعية") : t("This week's primary bet", "الرهان الرئيسي لهذا الأسبوع")}</SectionLabel>
            <h2>{t(primaryRecord.title, primaryRecord.titleAr)}</h2>
            <p>{t(primaryRecord.nextAction ?? "Choose the next action", primaryRecord.nextActionAr ?? "اختر الخطوة التالية")}</p>
            {primaryBet?.carriedFromWeekStart && <p className="weekly-primary-bet__carry-note">{repeatedDeferral ? t(`This is the same primary bet carried ${formatNum(primaryBet.carryCount ?? 0)} times. Do not let it roll forward without deciding whether the underlying approach still fits.`, `هذا هو الرهان الرئيسي نفسه المُرحّل ${formatNum(primaryBet.carryCount ?? 0)} مرات. لا تدعه يُرحّل دون تحديد ما إذا كان النهج الأساسي ما زال مناسبا.`) : t(`Carried from the week of ${primaryBet.carriedFromWeekStart}. Keep the evidence, but choose its next move deliberately.`, `مُرحّل من أسبوع ${primaryBet.carriedFromWeekStart}. احتفظ بالدليل، لكن اختر خطوته التالية عن قصد.`)}</p>}
          </div>
          <div className="weekly-primary-intention"><label>{t("By Friday, what do you want to know, decide, or change?", "بحلول الجمعة، ماذا تريد أن تعرف أو تقرر أو تغيّر؟")}<textarea value={weekIntent} onChange={(event) => { setWeekIntent(event.target.value); setWeekIntentSaved(false); }} placeholder={t("For example: know whether three buyer conversations support the new offer framing.", "مثلا: معرفة ما إذا كانت ثلاث محادثات مع مشترين تدعم صياغة العرض الجديدة.")} /></label><div><button type="button" className="button button-light" onClick={saveWeekIntent} disabled={!weekIntent.trim()}>{t("Save Friday intention", "احفظ نية الجمعة")}</button>{weekIntentSaved && <span className="inline-success"><Check size={14} /> {t("Intention saved with this week’s bet", "حُفظت النية مع رهان هذا الأسبوع")}</span>}</div></div>
          <div className="weekly-primary-bet__actions">
            {primaryBet?.completedAt ? <><span className="inline-success"><Check size={14} /> {t("Weekly plan set", "تم تحديد خطة الأسبوع")}</span><button type="button" className="text-link" onClick={clearPrimary}>{t("Choose another bet", "اختر رهانا آخر")}</button></> : <><Link href={`/dashboard/decision-review?decision=${encodeURIComponent(primaryRecord.id)}`} className="button button-light">{t("Open primary bet", "افتح الرهان الرئيسي")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link><button type="button" className="button button-dark" onClick={completePrimary}><Check size={14} /> {t("Set this week's plan", "حدد خطة هذا الأسبوع")}</button></>}
            <div className="weekly-primary-reminder"><span>{t("Desk reminder", "تذكير المكتب")}</span><div><button type="button" className={primaryBet?.reminderDay === "tuesday" ? "is-active" : ""} onClick={() => setReminder(primaryBet?.reminderDay === "tuesday" ? undefined : "tuesday")}>{t("Tuesday check-in", "مراجعة الثلاثاء")}</button><button type="button" className={primaryBet?.reminderDay === "thursday" ? "is-active" : ""} onClick={() => setReminder(primaryBet?.reminderDay === "thursday" ? undefined : "thursday")}>{t("Thursday check-in", "مراجعة الخميس")}</button></div><button type="button" className="text-link" onClick={downloadPrimaryBetCalendar}><CalendarPlus size={13} /> {t("Download calendar reminder", "نزّل تذكير التقويم")}</button></div>
          </div>
        </section>

        <section className="weekly-research-cadence" aria-labelledby="weekly-research-cadence-title">
          <div className="weekly-research-cadence__intro"><SectionLabel>{t("Research cadence", "إيقاع البحث")}</SectionLabel><h2 id="weekly-research-cadence-title">{t("Let one customer conversation reduce this bet’s uncertainty.", "دع محادثة عميل واحدة تقلل عدم يقين هذا الرهان.")}</h2><p>{t("Plan one short conversation or evidence move tied to the primary bet. This is a dated learning move, not a promise that the buyer will respond.", "خطط لمحادثة قصيرة واحدة أو خطوة دليل مرتبطة بالرهان الرئيسي. هذه خطوة تعلم مؤرخة، وليست وعدا بأن المشتري سيرد.")}</p></div>
          {primaryRuleGuide && <aside className={`weekly-rule-application ${includeRuleGuide ? "is-included" : ""}`}><div><span className="mono">{t("REVISABLE FIELD GUIDE", "دليل ميداني قابل للمراجعة")}</span><h3>{t("Carry this rule as context, not as a conclusion.", "احمل هذه القاعدة كسياق، لا كاستنتاج.")}</h3><p>{t("This working rule was saved on the current primary bet. You can keep it beside this week’s research, but the new question, buyer, and response rule below must still be written for this fresh move.", "حُفظت قاعدة العمل هذه على الرهان الرئيسي الحالي. يمكنك إبقاؤها بجانب بحث هذا الأسبوع، لكن يجب أن تكتب السؤال والمشتري وقاعدة الاستجابة أدناه لهذه الخطوة الجديدة.")}</p></div><dl><div><dt>{t("Current rule", "القاعدة الحالية")}</dt><dd>{primaryRuleGuide.claim}</dd></div><div><dt>{t("Use only when", "استخدم فقط عندما")}</dt><dd>{primaryRuleGuide.scope}</dd></div><div><dt>{t("Prior revision move", "خطوة المراجعة السابقة")}</dt><dd>{primaryRuleGuide.nextEvidenceMove}</dd></div></dl><label><input type="checkbox" checked={includeRuleGuide} onChange={(event) => { setIncludeRuleGuide(event.target.checked); setResearchSaved(false); }} /><span>{t("Keep this rule as reference context for this week’s evidence move", "أبقِ هذه القاعدة كسياق مرجعي لخطوة دليل هذا الأسبوع")}</span></label>{includeRuleGuide && <p className="weekly-rule-application__notice">{t("The rule will travel with the saved research cadence and appear as a reference in Customer Evidence. It will not prefill or decide the new test.", "ستنتقل القاعدة مع إيقاع البحث المحفوظ وتظهر كمرجع في دليل العميل. لن تملأ الاختبار الجديد مسبقا ولن تقرره.")}</p>}</aside>}
          <form onSubmit={(event) => { event.preventDefault(); saveResearchCadence(); }} className="weekly-research-cadence__form"><label>{t("Focused question", "السؤال المركّز")}<textarea value={researchQuestion} onChange={(event) => { setResearchQuestion(event.target.value); setResearchSaved(false); }} placeholder={t("What customer fact could change this week’s approach?", "ما حقيقة العميل التي يمكن أن تغيّر نهج هذا الأسبوع؟")} required /></label><label>{t("Buyer context", "سياق المشتري")}<input value={researchBuyer} onChange={(event) => { setResearchBuyer(event.target.value); setResearchSaved(false); }} placeholder={t("Who has the relevant recent experience?", "من لديه الخبرة الحديثة ذات الصلة؟")} required /></label><label>{t("By when", "بحلول متى")}<input type="date" min={today} value={researchDueDate} onChange={(event) => { setResearchDueDate(event.target.value); setResearchSaved(false); }} required /></label><label>{t("Response that changes the bet", "الاستجابة التي تغيّر الرهان")}<textarea value={researchResponseRule} onChange={(event) => { setResearchResponseRule(event.target.value); setResearchSaved(false); }} placeholder={t("Name the observable reply or behavior that would keep, change, or stop the approach.", "سمِ الرد أو السلوك الملحوظ الذي سيبقي النهج أو يغيره أو يوقفه.")} required /></label><div className="weekly-research-cadence__actions"><button type="submit" className="button button-dark"><Check size={14} /> {t("Save research move", "احفظ خطوة البحث")}</button>{researchSaved && <span className="inline-success"><Check size={14} /> {t("Research plan saved with this primary bet", "حُفظت خطة البحث مع هذا الرهان الرئيسي")}</span>}{activeResearchCadence && <Link href={`/tools/customer-evidence?primaryBet=${encodeURIComponent(primaryRecord.id)}`} className="button button-light">{t("Capture customer evidence", "التقط دليل العميل")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>}</div></form>
          {activeResearchCadence && <aside className="weekly-research-cadence__saved"><span className="mono">{t("SAVED RESEARCH MOVE", "خطوة البحث المحفوظة")}</span><strong>{activeResearchCadence.question}</strong><p>{t("Buyer: ", "المشتري: ")}{activeResearchCadence.buyer} · {t("Due: ", "الموعد: ")}{activeResearchCadence.dueDate}</p><p>{t("Decision rule: ", "قاعدة القرار: ")}{activeResearchCadence.responseRule}</p>{activeResearchCadence.ruleClaim && <div className="weekly-research-cadence__rule-source"><span className="mono">{t("RULE CONTEXT", "سياق القاعدة")}</span><strong>{activeResearchCadence.ruleClaim}</strong><p>{t("Scope: ", "النطاق: ")}{activeResearchCadence.ruleScope}</p><p>{t("Prior revision move: ", "خطوة المراجعة السابقة: ")}{activeResearchCadence.ruleNextEvidenceMove}</p></div>}</aside>}
        </section>

        <section className="weekly-friday-reflection">
          <div><SectionLabel>{t("Friday reflection", "تأمل الجمعة")}</SectionLabel><h2>{t("Compare the intended move with what actually changed.", "قارن الخطوة المقصودة بما تغيّر فعليا.")}</h2><p><strong>{t("This week you intended:", "هذا الأسبوع كنت تنوي:")}</strong> {t(primaryRecord.nextAction ?? "Choose the next action", primaryRecord.nextActionAr ?? "اختر الخطوة التالية")}</p></div>
          <label>{t("What did you learn from the work?", "ماذا تعلمت من العمل؟")}<textarea value={reflection} onChange={(event) => { setReflection(event.target.value); setReflectionSaved(false); }} placeholder={t("Record the customer language, result, or constraint that should change the next decision.", "سجل لغة العميل أو النتيجة أو القيد الذي ينبغي أن يغيّر القرار التالي.")} /></label>
          <div className="weekly-friday-reflection__actions">
            <button type="button" className="button button-dark" onClick={saveReflection} disabled={!reflection.trim()}><Check size={14} /> {t("Save Friday reflection", "احفظ تأمل الجمعة")}</button>
            <Link href={`/dashboard/decision-review?decision=${encodeURIComponent(primaryRecord.id)}`} className="text-link">{t("Open decision review", "افتح مراجعة القرار")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>
            {reflectionSaved && <span className="inline-success"><Check size={14} /> {t("Learning carried into the decision record", "نُقل التعلم إلى سجل القرار")}</span>}

            <div className="weekly-carry-forward">
              <div><span>{t("Week close", "إغلاق الأسبوع")}</span><p>{primaryBet?.carryForward ? t("This decision will reopen as the next week’s primary bet with its current evidence and reminder.", "سيُعاد فتح هذا القرار كرهان رئيسي للأسبوع التالي مع دليله وتذكيره الحاليين.") : t("Do not silently roll unfinished work forward. Keep it in review, close it with learning, or deliberately carry the same decision into next week.", "لا ترحّل العمل غير المكتمل بصمت. أبقه في المراجعة أو أغلقه بتعلم أو رحّل القرار نفسه إلى الأسبوع التالي عن قصد.")}</p></div>{primaryBet?.carryForward ? <button type="button" className="text-link" onClick={cancelCarryForward}>{t("Keep in this week", "أبقِه في هذا الأسبوع")}</button> : <button type="button" className="button button-light" onClick={stageCarryForward}>{t("Carry into next week", "رحّله إلى الأسبوع التالي")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</button>}</div>

            {repeatedDeferral && <div className="weekly-repeated-deferral">
              <div><span>{t("Repeated deferral", "ترحيل متكرر")}</span><p>{t("This bet has remained in focus across more than one rollover. Reframe the decision with its evidence, close the approach with learning, or release the primary-bet slot for a new commitment.", "بقي هذا الرهان في التركيز عبر أكثر من ترحيل واحد. أعد صياغة القرار مع دليله أو أغلق النهج بتعلم أو حرر خانة الرهان الرئيسي لالتزام جديد.")}</p></div>
              <div><Link href={`/dashboard/decision-review?decision=${encodeURIComponent(primaryRecord.id)}`} className="button button-light">{t("Reframe in Decision Review", "أعد الصياغة في مراجعة القرار")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link><button type="button" className="text-link" onClick={clearPrimary}>{t("Release primary bet", "حرر الرهان الرئيسي")}</button></div>
            </div>}

            <div className="weekly-close-learning">
              <div><span>{t("Decision close", "إغلاق القرار")}</span><p>{t("When the week produced enough learning, close the same decision with the outcome that should govern the next move.", "عندما ينتج الأسبوع تعلما كافيا، أغلق القرار نفسه بالنتيجة التي ينبغي أن تحكم الخطوة التالية.")}</p></div>
              <div>{outcomeOptions.map((option) => <button key={option.id} type="button" className={option.id === "keep" ? "button button-light" : "text-link"} disabled={!canClosePrimary} onClick={() => closePrimaryWithLearning(option.id)}>{t(option.label, option.labelAr)}</button>)}</div>
            </div>
          </div>
        </section>
      </>}

      {closedPrimaryOutcome && <section className="weekly-primary-close-success" role="status"><Check size={16} /><div><SectionLabel>{t("Decision closed", "تم إغلاق القرار")}</SectionLabel><h2>{closedPrimaryOutcome === "keep" ? t("The approach has a clear reason to continue.", "للنهج سبب واضح للاستمرار.") : closedPrimaryOutcome === "change" ? t("The learning is now ready to change the approach.", "أصبح التعلم جاهزا لتغيير النهج.") : t("The decision is closed with its learning intact.", "أُغلق القرار مع بقاء تعلمه محفوظا.")}</h2><p>{t("The completed outcome is retained in the decision record and can be revisited from Activity or the Founder Operating Desk.", "تُحفظ النتيجة المكتملة في سجل القرار ويمكن إعادة زيارتها من النشاط أو مكتب تشغيل المؤسس.")}</p></div><Link href="/dashboard/registrations" className="button button-light">{t("Open Activity", "افتح النشاط")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></section>}

      <section className="weekly-review-agenda" aria-label={t("Weekly decision agenda", "جدول القرارات الأسبوعي")}>
        <div className="weekly-review-agenda__heading"><div><SectionLabel>{t("Review agenda", "جدول المراجعة")}</SectionLabel><h2>{t("Start with the next decision that could change.", "ابدأ بالقرار التالي الذي يمكن أن يتغير.")}</h2></div><Link href="/dashboard/registrations" className="text-link">{t("Open Activity", "افتح النشاط")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div>
        <div>{agenda.map((record, index) => {
          const status = reviewStatus(record, today, t);
          const isPrimary = primaryBet?.recordId === record.id;
          const owner = record.owner === "Founder" ? t("Founder", "المؤسس") : record.owner ?? t("Founder", "المؤسس");
          return <article key={record.id} className={`weekly-review-row is-${status.tone} ${isPrimary ? "is-primary" : ""}`}>
            <span className="weekly-review-row__index">{isPrimary ? <Target size={15} /> : formatNum(index + 1).padStart(2, "0")}</span>
            <div className="weekly-review-row__main"><header><span>{isPrimary ? t("Primary bet", "الرهان الرئيسي") : status.label}</span><small>{owner}</small></header><h3>{t(record.title, record.titleAr)}</h3><p>{t(record.nextAction ?? "Choose the next action", record.nextActionAr ?? "اختر الخطوة التالية")}</p></div>
            <div className="weekly-review-row__evidence"><span>{t("Evidence", "الدليل")}</span><p>{record.evidence || t("No evidence recorded. Return to capture the result while it is specific.", "لم يُسجل دليل. عد لالتقاط النتيجة بينما تظل محددة.")}</p></div>
            <div className="weekly-review-row__actions"><Link href={`/dashboard/decision-review?decision=${encodeURIComponent(record.id)}`} className="button button-ghost">{t("Review", "مراجعة")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>{isPrimary ? <button type="button" className="text-link" onClick={clearPrimary}>{t("Clear primary", "أزل الرهان الرئيسي")}</button> : <button type="button" className="text-link" onClick={() => choosePrimary(record.id)}>{t("Make primary", "اجعله رئيسيا")}</button>}<Link href={`/dashboard/decision-accountability?decision=${encodeURIComponent(record.id)}`} className="text-link">{t("Owner & date", "المالك والتاريخ")}</Link></div>
          </article>;
        })}</div>
      </section>
    </div>
  </ProductShell>;
}
