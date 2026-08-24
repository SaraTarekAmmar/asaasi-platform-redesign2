/* Editorial operating system: one factual room observation becomes one revisable, source-linked follow-up draft. No outcome is inferred or sent. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, Copy } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel } from "./site";
import { useLocale } from "../contexts/LocaleContext";
import { upsertWorkflowRecord, type WorkflowRecord } from "../lib/workflowRecords";

type Props = {
  events: WorkflowRecord[];
  decisions: WorkflowRecord[];
  onRecordsChanged: () => void;
};

export function EventFollowUpDraftDesk({ events, decisions, onRecordsChanged }: Props) {
  const { t, isRTL, formatNum } = useLocale();
  const [selectedId, setSelectedId] = useState(() => events[0]?.id ?? "");
  const selected = events.find((record) => record.id === selectedId) ?? events[0];
  const [recipientContext, setRecipientContext] = useState("");
  const [nextMove, setNextMove] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const preparation = (record: WorkflowRecord) => (record.evidence ?? "").replace("Event question: ", "").replace("سؤال الفعالية: ", "") || t("No focused room question was retained.", "لم يتم الاحتفاظ بسؤال مركز للغرفة.");
  const chooseSource = (record: WorkflowRecord) => {
    setSelectedId(record.id);
    setRecipientContext(record.eventFollowUp?.recipientContext ?? "");
    setNextMove(record.eventFollowUp?.nextMove ?? "");
    setDueDate(record.eventFollowUp?.dueDate ?? "");
    setDraft(record.eventFollowUp?.draft ?? "");
    setSaved(Boolean(record.eventFollowUp));
    setCopied(false);
  };
  useEffect(() => { if (selected) chooseSource(selected); }, [selectedId, events.length]);
  if (!events.length || !selected) return null;
  const linkedDecision = decisions.find((record) => record.id === selected.linkedDecisionId);
  const canCompose = Boolean(recipientContext.trim() && nextMove.trim() && dueDate);
  const composeDraft = () => {
    if (!canCompose) return;
    setDraft(isRTL
      ? `مرحبًا،\n\nأتابع بعد ${selected.titleAr}. الملاحظة التي سأبقيها في نطاق العمل هي: «${selected.eventOutcomeNote}».\n\nهل يناسبك ${nextMove.trim()} بحلول ${dueDate}؟\n\nشكرًا،`
      : `Hello,\n\nI’m following up after ${selected.title}. The observation I am keeping in view is: “${selected.eventOutcomeNote}”.\n\nWould you be open to ${nextMove.trim()} by ${dueDate}?\n\nThank you,`);
    setSaved(false);
  };
  const saveDraft = () => {
    if (!canCompose || !draft.trim()) return;
    upsertWorkflowRecord({ ...selected, eventFollowUp: { recipientContext: recipientContext.trim(), nextMove: nextMove.trim(), dueDate, draft: draft.trim(), createdAt: selected.eventFollowUp?.createdAt ?? new Date().toISOString(), copiedAt: selected.eventFollowUp?.copiedAt } });
    onRecordsChanged();
    setSaved(true);
  };
  const copyDraft = async () => {
    if (!selected.eventFollowUp?.draft) return;
    try { await navigator.clipboard.writeText(selected.eventFollowUp.draft); } catch { /* The saved draft remains selectable if clipboard access is unavailable. */ }
    upsertWorkflowRecord({ ...selected, eventFollowUp: { ...selected.eventFollowUp, copiedAt: new Date().toISOString() } });
    onRecordsChanged();
    setCopied(true);
  };
  return <section id="event-follow-up-desk" className="event-follow-up-desk" aria-labelledby="event-follow-up-title"><header className="event-follow-up-desk__heading"><div><SectionLabel>{t("Event follow-through", "متابعة الفعالية")}</SectionLabel><h2 id="event-follow-up-title">{t("Turn a room observation into one accountable follow-up.", "حوّل ملاحظة الغرفة إلى متابعة واحدة مسؤولة.")}</h2><p>{t("Choose a saved observation, keep its original room context visible, and write an editable draft with one recipient context, next move, and due date. ASaaSI does not send it or claim a result.", "اختر ملاحظة محفوظة، وأبقِ سياق الغرفة الأصلي ظاهرا، واكتب مسودة قابلة للتعديل بسياق مستلم واحد وخطوة تالية وتاريخ استحقاق. لا يرسلها أساسي ولا يدعي نتيجة.")}</p></div><div className="event-follow-up-desk__metric"><strong>{formatNum(events.length)}</strong><span>{t("room observation", "ملاحظة غرفة")}</span></div></header><div className="event-follow-up-desk__boundary"><span className="mono">{t("FOLLOW-UP BOUNDARY", "حد المتابعة")}</span><p>{t("A draft carries a factual observation forward. It is not proof that a connection, commitment, or decision has happened.", "تحمل المسودة ملاحظة واقعية إلى الأمام. ليست دليلا على أن اتصالا أو التزاما أو قرارا قد حدث.")}</p></div><div className="event-follow-up-desk__body"><aside className="event-follow-up-desk__sources"><div><SectionLabel>{t("01 / Room observation", "٠١ / ملاحظة الغرفة")}</SectionLabel><h3>{t("Choose what you heard, not what you assume.", "اختر ما سمعته، لا ما تفترضه.")}</h3></div><div>{events.map((record, index) => <button type="button" key={record.id} className={record.id === selected.id ? "is-active" : ""} aria-pressed={record.id === selected.id} onClick={() => chooseSource(record)}><span>{formatNum(index + 1).padStart(2, "0")}</span><div><small>{record.eventFollowUp ? t("DRAFT SAVED", "مسودة محفوظة") : t("OBSERVATION READY", "الملاحظة جاهزة")}</small><strong>{t(record.title, record.titleAr)}</strong><p>{record.eventOutcomeNote}</p></div></button>)}</div></aside><div className="event-follow-up-desk__editor"><div className="event-follow-up-desk__source-context"><span className="mono">{t("SOURCE REFERENCE", "مرجع المصدر")}</span><strong>{t(selected.title, selected.titleAr)}</strong><dl><div><dt>{t("Room observation", "ملاحظة الغرفة")}</dt><dd>{selected.eventOutcomeNote}</dd></div><div><dt>{t("Original question", "السؤال الأصلي")}</dt><dd>{preparation(selected)}</dd></div><div><dt>{t("Linked decision", "القرار المرتبط")}</dt><dd>{linkedDecision ? t(linkedDecision.title, linkedDecision.titleAr) : t("No linked decision retained", "لم يتم الاحتفاظ بقرار مرتبط")}</dd></div></dl><div>{linkedDecision && <Link href={`/dashboard/decision-review?decision=${encodeURIComponent(linkedDecision.id)}`} className="text-link">{t("Open linked decision", "افتح القرار المرتبط")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link>}<Link href={selected.href} className="text-link">{t("Revisit event", "عد إلى الفعالية")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></div></div><div className="event-follow-up-desk__form-heading"><SectionLabel>{t("02 / Draft the next move", "٠٢ / اكتب مسودة الخطوة التالية")}</SectionLabel><h3>{t("Make the context specific before you write the message.", "اجعل السياق محددا قبل كتابة الرسالة.")}</h3></div><div className="event-follow-up-desk__fields"><label>{t("Recipient context", "سياق المستلم")}<input value={recipientContext} onChange={(event) => { setRecipientContext(event.target.value); setSaved(false); }} placeholder={t("e.g. founder I met after the pricing session", "مثال: مؤسس قابلته بعد جلسة التسعير")} required /></label><label>{t("Due date", "تاريخ الاستحقاق")}<input type="date" value={dueDate} onChange={(event) => { setDueDate(event.target.value); setSaved(false); }} required /></label><label className="event-follow-up-desk__next-move">{t("One next move", "خطوة تالية واحدة")}<input value={nextMove} onChange={(event) => { setNextMove(event.target.value); setSaved(false); }} placeholder={t("e.g. compare the current onboarding handoff in a 20-minute call", "مثال: قارن تسليم التهيئة الحالي في مكالمة مدتها ٢٠ دقيقة")} required /></label></div><div className="event-follow-up-desk__draft-action"><button type="button" className="button button-light" disabled={!canCompose} onClick={composeDraft}><CalendarPlus size={14} /> {t("Draft from this context", "اكتب مسودة من هذا السياق")}</button><p>{t("The draft is a starting point. Edit it before saving or copying.", "المسودة نقطة بداية. عدلها قبل الحفظ أو النسخ.")}</p></div><label className="event-follow-up-desk__draft">{t("Editable follow-up draft", "مسودة متابعة قابلة للتعديل")}<textarea value={draft} onChange={(event) => { setDraft(event.target.value); setSaved(false); }} placeholder={t("Write one short, contextual follow-up. Keep the observation factual and the ask proportionate.", "اكتب متابعة قصيرة وسياقية. أبقِ الملاحظة واقعية والطلب متناسبا.")} required /></label><div className="event-follow-up-desk__actions"><button type="button" className="button button-dark" disabled={!canCompose || !draft.trim()} onClick={saveDraft}><Check size={14} /> {t("Save follow-up draft", "احفظ مسودة المتابعة")}</button>{selected.eventFollowUp && <button type="button" className="button button-light" onClick={copyDraft}><Copy size={14} /> {copied ? t("Draft copied", "تم نسخ المسودة") : t("Copy saved draft", "انسخ المسودة المحفوظة")}</button>}{saved && <span className="inline-success"><Check size={14} /> {t("Draft retained with its room observation", "تم الاحتفاظ بالمسودة مع ملاحظة غرفتها")}</span>}</div></div></div></section>;
}
