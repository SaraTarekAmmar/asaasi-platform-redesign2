/* Small, self-contained UI utilities shared across the app: theme toggle, back-to-top, floating
   contact, scroll progress, a first-visit cookie notice, a reusable confirm dialog, and a
   password field with a visibility toggle. Bundled in one file since each is a handful of lines -
   splitting them into their own files would just be more places to look for the same thing. */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUp, Eye, EyeOff, MessageCircle, Moon, Send, Sparkles, Sun, X } from "lucide-react";
import { useLocale } from "../../contexts/LocaleContext";
import { useTheme } from "../../contexts/ThemeContext";
import "../../site-extras.css";

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  return (
    <button
      type="button"
      className={`icon-button theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("Switch to light mode", "التبديل إلى الوضع الفاتح") : t("Switch to dark mode", "التبديل إلى الوضع الداكن")}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="scroll-progress-track" aria-hidden="true"><div className="scroll-progress-bar" style={{ width: `${progress}%` }} /></div>;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button type="button" className="floating-action back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t("Back to top", "العودة إلى الأعلى")}>
      <ArrowUp size={18} />
    </button>
  );
}

// ponytail: an honest keyword router, same pattern and same caveat as the dashboard's AI coach
// (see COACH_TOPICS in ProductFlows.tsx) - not a real model, so it says so, and always keeps a
// real human-support link visible rather than pretending to be a live agent.
type SupportBi = [string, string];
const SUPPORT_TOPICS: { match: RegExp; reply: SupportBi; href: string; linkLabel: SupportBi }[] = [
  { match: /price|pricing|cost|membership|subscri|plan\b/i, reply: ["Membership starts free - you only move to paid Subscriber access once the full library and guidance would actually help. See the access path and what each stage unlocks.", "العضوية تبدأ مجانا - تنتقل إلى وصول المشترك المدفوع فقط عندما تساعدك المكتبة الكاملة والإرشاد فعلا. اطلع على مسار الوصول وما تفتحه كل مرحلة."], href: "/membership", linkLabel: ["Open the membership path", "افتح مسار العضوية"] },
  { match: /sign\s?up|register|create.*account|join/i, reply: ["Creating a profile is free and takes about two minutes - it's how the network learns your stage so it can point you at relevant people and tools.", "إنشاء الملف الشخصي مجاني ويستغرق نحو دقيقتين - وهو ما يتيح للشبكة معرفة مرحلتك لتوجيهك إلى الأشخاص والأدوات ذات الصلة."], href: "/signup", linkLabel: ["Create a free profile", "أنشئ ملفا مجانيا"] },
  { match: /event|workshop|summit|demo day|webinar/i, reply: ["Events are listed with the date, room, and the outcome each one is meant to move - browse what's coming up next.", "الفعاليات مدرجة مع التاريخ والغرفة والنتيجة التي يُقصد بها تحريكها - تصفح ما هو قادم."], href: "/events", linkLabel: ["Browse events", "تصفح الفعاليات"] },
  { match: /provider|lawyer|legal|accountant|designer|freelanc|hire.*(specialist|expert)/i, reply: ["Verified providers are listed by the specific work they do, not a generic marketplace category - browse by specialty.", "مزودو الخدمات الموثقون مدرجون حسب العمل المحدد الذي يؤدونه، لا فئة سوق عامة - تصفح حسب التخصص."], href: "/providers", linkLabel: ["Browse providers", "تصفح مزودي الخدمة"] },
  { match: /match|introduc|connect|network|find (a |)(person|founder|mentor|cofounder)/i, reply: ["Matching starts with the decision in front of you, not a browse-everyone directory - it points you to someone who's actually faced it.", "تبدأ المطابقة بالقرار الذي أمامك، لا بدليل تتصفحه بالكامل - إذ توجهك إلى شخص واجه هذا القرار فعلا."], href: "/connect", linkLabel: ["Find people", "ابحث عن أشخاص"] },
  { match: /learn|course|roadmap|stage|podcast|article/i, reply: ["Learning content is mapped to your stage on the 7-stage roadmap and the function you're stuck on, not a generic course catalog.", "المحتوى التعليمي مرتبط بمرحلتك على خريطة الطريق ذات السبع مراحل وبالوظيفة التي تواجه فيها التحدي، لا فهرس دورات عام."], href: "/learn", linkLabel: ["Open the learning hub", "افتح مركز التعلم"] },
];
const SUPPORT_FALLBACK: SupportBi = ["I'm a simple assistant, not a live agent - I can point you to the right page, but for anything specific to your account, a real person on the team can help.", "أنا مساعد بسيط لا وكيل مباشر - يمكنني توجيهك إلى الصفحة المناسبة، لكن لأي أمر خاص بحسابك، يمكن لشخص حقيقي من الفريق المساعدة."];

export function FloatingContact() {
  const { t, isRTL } = useLocale();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [thread, setThread] = useState<{ role: "user" | "assistant"; text: string; href?: string; linkLabel?: string }[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" }); }, [open, thread]);
  const reply = (userText: string, topic?: (typeof SUPPORT_TOPICS)[number]) => {
    setThread((current) => [...current, { role: "user", text: userText }, topic ? { role: "assistant", text: t(...topic.reply), href: topic.href, linkLabel: t(...topic.linkLabel) } : { role: "assistant", text: t(...SUPPORT_FALLBACK) }]);
  };
  // ponytail: chips resolve their topic directly instead of re-matching their own (translated)
  // label text against the English-only regexes below - matching a chip's Arabic label against
  // an English pattern would always miss and fall through to the fallback reply.
  const askTopic = (topic: (typeof SUPPORT_TOPICS)[number]) => reply(t(...topic.linkLabel), topic);
  const send = (event: FormEvent) => {
    event.preventDefault();
    const clean = prompt.trim();
    if (!clean) return;
    reply(clean, SUPPORT_TOPICS.find((entry) => entry.match.test(clean)));
    setPrompt("");
  };
  return (
    <>
      {open && <div className="support-chat-panel" role="dialog" aria-label={t("ASaaSI support assistant", "مساعد دعم أساسي")}>
        <div className="support-chat-header">
          <div><span className="mono">{t("ASaaSI ASSISTANT · AUTOMATED", "مساعد أساسي · آلي")}</span><strong>{t("Ask a quick question", "اطرح سؤالا سريعا")}</strong></div>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label={t("Close chat", "إغلاق المحادثة")}><X size={16} /></button>
        </div>
        <div className="support-chat-body" ref={bodyRef}>
          <div className="coach-message coach-system"><span className="coach-orb"><Sparkles size={13} /></span><p>{t("Hi - I'm an automated assistant, not a live person. Ask about pricing, signup, events, providers, or matching, and I'll point you to the right place.", "مرحبا - أنا مساعد آلي، لست شخصا حقيقيا. اسأل عن التسعير أو التسجيل أو الفعاليات أو مزودي الخدمة أو المطابقة، وسأوجهك إلى المكان المناسب.")}</p></div>
          {thread.map((message, index) => message.role === "user"
            ? <div className="coach-message coach-user" key={index}><span className="mono">{t("You", "أنت")}</span><p>{message.text}</p></div>
            : <div className="coach-message coach-system" key={index}><span className="coach-orb"><Sparkles size={13} /></span><div><p>{message.text}</p>{message.href && <Link href={message.href} onClick={() => setOpen(false)} className="text-link">{message.linkLabel} <ArrowRight size={13} /></Link>}</div></div>)}
        </div>
        {thread.length === 0 && <div className="support-chat-chips">{SUPPORT_TOPICS.map((topic) => <button type="button" key={topic.href} onClick={() => askTopic(topic)}>{t(...topic.linkLabel)}</button>)}</div>}
        <form className="support-chat-composer" onSubmit={send}>
          <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={t("Type a question...", "اكتب سؤالا...")} aria-label={t("Ask the support assistant", "اسأل مساعد الدعم")} />
          <button type="submit" className="icon-button" aria-label={t("Send", "إرسال")}><Send size={14} /></button>
        </form>
        <Link href="/contact" onClick={() => setOpen(false)} className="support-chat-human">{t("Need a real person instead?", "تحتاج شخصا حقيقيا بدلا من ذلك؟")} <ArrowRight size={13} /></Link>
      </div>}
      <button type="button" className="floating-action floating-contact" aria-expanded={open} onClick={() => setOpen((value) => !value)} aria-label={open ? t("Close support assistant", "إغلاق مساعد الدعم") : t("Open support assistant", "افتح مساعد الدعم")}>
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>
    </>
  );
}

export function CookieBanner({ noHeader }: { noHeader?: boolean }) {
  const { t } = useLocale();
  const [dismissed, setDismissed] = useState(() => typeof window !== "undefined" && !!window.localStorage.getItem("asaasi-cookie-consent"));
  if (dismissed) return null;
  const respond = (value: "accepted" | "declined") => {
    window.localStorage.setItem("asaasi-cookie-consent", value);
    setDismissed(true);
  };
  return (
    <div className={`cookie-banner${noHeader ? " cookie-banner-no-header" : ""}`} role="region" aria-label={t("Cookie notice", "إشعار ملفات تعريف الارتباط")}>
      <p>{t("We use a small set of cookies to keep you signed in and remember your preferences. No tracking cookies.", "نستخدم مجموعة صغيرة من ملفات تعريف الارتباط لإبقائك مسجلا وحفظ تفضيلاتك. لا توجد ملفات تعقب.")}</p>
      <div>
        <button type="button" className="button button-ghost" onClick={() => respond("declined")}>{t("Decline", "رفض")}</button>
        <button type="button" className="button button-primary" onClick={() => respond("accepted")}>{t("Accept", "قبول")}</button>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel }: {
  open: boolean; title: string; body: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void;
}) {
  const { t } = useLocale();
  if (!open) return null;
  return (
    <div className="confirm-dialog-overlay" role="presentation" onClick={onCancel}>
      <div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" onClick={(event) => event.stopPropagation()}>
        <h2 id="confirm-dialog-title">{title}</h2>
        <p>{body}</p>
        <div className="confirm-dialog-actions">
          <button type="button" className="button button-ghost" onClick={onCancel}>{t("Cancel", "إلغاء")}</button>
          <button type="button" className="button button-dark" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function PasswordField({ value, onChange, placeholder, label }: {
  value?: string; onChange?: (value: string) => void; placeholder?: string; label: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  // Uncontrolled fallback: a couple of call sites (signup, reset password) are still
  // placeholder-only demo fields with no tracked value - give them the same toggle without
  // forcing every parent to add password state just to render an input.
  const [internalValue, setInternalValue] = useState("");
  const { t } = useLocale();
  const isControlled = value !== undefined && onChange !== undefined;
  return (
    <label className="password-field">
      {label}
      <span className="password-field-input">
        <input
          type={visible ? "text" : "password"}
          value={isControlled ? value : internalValue}
          onChange={(event) => (isControlled ? onChange!(event.target.value) : setInternalValue(event.target.value))}
          placeholder={placeholder}
        />
        <button type="button" className="password-field-toggle" onClick={() => setVisible((current) => !current)} aria-label={visible ? t("Hide password", "إخفاء كلمة المرور") : t("Show password", "إظهار كلمة المرور")}>
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </span>
    </label>
  );
}
