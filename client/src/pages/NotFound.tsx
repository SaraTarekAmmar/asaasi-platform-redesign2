/* Editorial Operating System, recoverable empty state for unknown routes. */
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";

export default function NotFound() {
  const { t, isRTL } = useLocale();
  return <section className="section" style={{ minHeight: "70vh" }}><div className="container" style={{ maxWidth: 760 }}><SectionLabel>{t("404 / Missing signal", "٤٠٤ / إشارة مفقودة")}</SectionLabel><h1 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 54px)", margin: "20px 0 16px", color: "var(--ink)" }}>{t("This page moved.", "انتقلت هذه الصفحة.")}</h1><p style={{ maxWidth: 500, color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>{t("The page you're looking for is not in this route map. Let's get you back to a useful next step.", "الصفحة التي تبحث عنها ليست في خريطة المسارات هذه. دعنا نعيدك إلى خطوة تالية مفيدة.")}</p><div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}><Link href="/" className="button button-dark">{t("Return home", "العودة إلى الرئيسية")} {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link><Link href="/connect" className="button button-ghost"><Search size={15} /> {t("Find a person", "ابحث عن شخص")}</Link></div><div style={{ marginTop: 70 }}><SignalTag tone="clay">{t("Try these", "جرب هذه")}</SignalTag><div className="story-list" style={{ maxWidth: 520 }}><Link href="/events" className="story-list"><div><strong>{t("See what's happening", "شاهد ما يحدث")}</strong><span>{t("Events", "الفعاليات")} →</span></div></Link><Link href="/learn" className="story-list"><div><strong>{t("Open the field guide", "افتح الدليل الميداني")}</strong><span>{t("Learn", "تعلم")} →</span></div></Link></div></div></div></section>;
}
