/* Small, self-contained UI utilities shared across the app: theme toggle, back-to-top, floating
   contact, scroll progress, a first-visit cookie notice, a reusable confirm dialog, and a
   password field with a visibility toggle. Bundled in one file since each is a handful of lines -
   splitting them into their own files would just be more places to look for the same thing. */
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUp, Eye, EyeOff, MessageCircle, Moon, Sun } from "lucide-react";
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

export function FloatingContact() {
  const { t } = useLocale();
  return (
    <Link href="/contact" className="floating-action floating-contact" aria-label={t("Contact us", "تواصل معنا")}>
      <MessageCircle size={18} />
    </Link>
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
