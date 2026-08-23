/* Editorial Operating System, recoverable empty state for unknown routes. */
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";

export default function NotFound() {
  const { t, isRTL } = useLocale();
  return <section className="section not-found" style={{ minHeight: "70vh" }}><div className="container not-found__layout">
    <div className="not-found__main">
      <SectionLabel>{t("404 / Missing signal", "٤٠٤ / إشارة مفقودة")}</SectionLabel>
      <h1 className="ds-display-l">{t("This page moved.", "انتقلت هذه الصفحة.")}</h1>
      <p className="ds-lede">{t("The page you're looking for is not in this route map. Let's get you back to a useful next step.", "الصفحة التي تبحث عنها ليست في خريطة المسارات هذه. دعنا نعيدك إلى خطوة تالية مفيدة.")}</p>
      <div className="not-found__actions"><Link href="/" className="button button-dark">{t("Return home", "العودة إلى الرئيسية")} {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link><Link href="/connect" className="button button-ghost"><Search size={15} /> {t("Find a person", "ابحث عن شخص")}</Link></div>
    </div>
    <aside className="not-found__recovery surface-fill-gold">
      <SignalTag tone="clay">{t("Try these", "جرب هذه")}</SignalTag>
      <div className="ds-step-ledger">
        <Link href="/events"><span>01</span><div><h4>{t("See what's happening", "شاهد ما يحدث")}</h4><p>{t("Events", "الفعاليات")} →</p></div></Link>
        <Link href="/learn"><span>02</span><div><h4>{t("Open the field guide", "افتح الدليل الميداني")}</h4><p>{t("Learn", "تعلم")} →</p></div></Link>
      </div>
    </aside>
  </div></section>;
}
