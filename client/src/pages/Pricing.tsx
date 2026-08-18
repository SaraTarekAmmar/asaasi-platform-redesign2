/* Editorial Operating System, bilingual outcome-led membership comparison and conversion. */
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { PageIntro, SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";

const plans = [
  {
    name: "Free", price: "Free",
    copy: "See who's building around you before you commit to anything.",
    features: ["Browse the directory, providers, and event calendar", "Read every article, podcast, and video", "Post in the community and get real replies", "One introduction request, one open ask"],
    arName: "مجاني", arCopy: "تعرف إلى من يبني حولك قبل أن تلتزم بأي شيء.",
    arFeatures: ["تصفح الدليل ومزودي الخدمة وتقويم الفعاليات", "اقرأ كل مقال وبودكاست وفيديو", "انشر في المجتمع واحصل على ردود حقيقية", "طلب مقدمة واحد وطلب شبكة مفتوح واحد"],
  },
  {
    name: "Member", price: "$29",
    copy: "For founders done guessing, move with people who've already solved this.",
    features: ["Unlimited introduction and network requests", "Full course library and playbook downloads", "Priority access to member-only events", "Webinar replays, on your schedule"],
    highlight: true,
    arName: "عضو", arCopy: "للمؤسسين الذين لم يعودوا يخمنون، تحرك مع من حل هذا فعلا.",
    arFeatures: ["طلبات مقدمات وطلبات شبكة غير محدودة", "مكتبة الدورات الكاملة وتنزيل الأدلة العملية", "أولوية الوصول لفعاليات الأعضاء فقط", "تسجيلات الندوات، في وقتك المناسب"],
  },
  {
    name: "Growth", price: "$99",
    copy: "For founders scaling past solo mode, masterminds, 1:1 mentors, and the data no one else shares.",
    features: ["Everything in Member", "Facilitated masterminds matched to your stage", "Book 1:1 time with a mentor who's done it", "Market reports, vendor perks, and 5 team seats"],
    arName: "نمو", arCopy: "للمؤسسين الذين يتوسعون بعد مرحلة العمل الفردي، مجموعات إرشادية ومرشدون فرديون وبيانات لا يشاركها أحد غيرنا.",
    arFeatures: ["كل ما في عضوية Member", "مجموعات إرشادية مُيسَرة تُطابق مرحلتك", "احجز وقتا فرديا مع مرشد خاض التجربة", "تقارير سوقية وخصومات موردين و٥ مقاعد فريق"],
  },
];

export default function Pricing() {
  const { t, formatNum, isRTL } = useLocale();
  return <>
    <PageIntro label={t("Membership / Choose your plan", "العضوية / اختر خطتك")} title={t("The membership built for MENA's SaaS ecosystem, not a generic tier chart.", "العضوية المبنية لمنظومة برمجيات المنطقة، لا جدول فئات عام.")} copy={t("Start free and see the network. Upgrade when you're ready for unlimited introductions, the full library, and the people who move faster with company.", "ابدأ مجانا وشاهد الشبكة. رقِ عضويتك عندما تكون جاهزا لمقدمات غير محدودة، والمكتبة الكاملة، والأشخاص الذين يتحركون أسرع برفقة.")} note={<><SignalTag tone="clay">{t("Cancel anytime, no lock-in", "ألغِ في أي وقت، بلا التزام")}</SignalTag><p>{t("Every plan starts with the same 3-minute founder brief, so the network already knows your stage before you pay for anything.", "تبدأ كل خطة بنفس موجز المؤسس ذي الثلاث دقائق، فتعرف الشبكة مرحلتك قبل أن تدفع أي شيء.")}</p><Link href="/signup" className="button button-primary button-small">{t("Start with a brief", "ابدأ بموجز")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></>} />
    <section className="section"><div className="container">
      <div className="pricing-grid">{plans.map((plan) => <article key={plan.name} className={`plan ${plan.highlight ? "highlight" : ""}`}>
        {plan.highlight && <SignalTag>{t("Most founders start here", "معظم المؤسسين يبدأون هنا")}</SignalTag>}
        <h3>{t(plan.name, plan.arName)}</h3>
        <p>{t(plan.copy, plan.arCopy)}</p>
        <div className="plan-price">{plan.price === "Free" ? t("Free", "مجانا") : plan.price}{plan.price.startsWith("$") && <span> / {t("month", "شهر")}</span>}</div>
        <div className="plan-features">{plan.features.map((feature, index) => <div key={feature}><Check className="check" size={15} />{t(feature, plan.arFeatures[index])}</div>)}</div>
        <Link href="/signup" className={`button ${plan.highlight ? "button-primary" : "button-ghost"}`}>{plan.name === "Free" ? t("Join free", "انضم مجانا") : t(`Become a ${plan.name}`, `كن ${plan.arName}`)} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>
      </article>)}</div>
    </div></section>
    <section className="section section-dark"><div className="container"><div className="section-header"><div><SectionLabel light>{t("Why founders upgrade", "لماذا يرقي المؤسسون عضويتهم")}</SectionLabel><h2>{t("Free gets you in the room. Membership gets you moving.", "المجاني يدخلك الغرفة. العضوية تحركك.")}</h2></div><p>{t("Every upgrade removes a real limit, not a feature you'd never use.", "كل ترقية تزيل حدا حقيقيا، لا ميزة لن تستخدمها أبدا.")}</p></div><div className="proof-strip"><div className="proof-cell accent"><strong>{formatNum(1)}</strong><span>{t("No more capped requests, ask the network as often as you actually need to.", "لا مزيد من الطلبات المحدودة، اسأل الشبكة بقدر ما تحتاج فعلا.")}</span></div><div className="proof-cell"><strong>{formatNum(2)}</strong><span>{t("The full library, not the first three courses.", "المكتبة كاملة، لا أول ثلاث دورات فقط.")}</span></div><div className="proof-cell"><strong>{formatNum(3)}</strong><span>{t("Mentors and masterminds who've built in this region, not generic advice.", "مرشدون ومجموعات إرشادية بنوا في هذه المنطقة تحديدا، لا نصائح عامة.")}</span></div><div className="proof-cell"><strong>{formatNum(4)}</strong><span>{t("Vendor perks worth more than the membership fee in your first month.", "خصومات موردين تفوق قيمتها رسم العضوية من أول شهر.")}</span></div></div></div></section>
    <section className="section"><div className="container form-shell"><div><SectionLabel>{t("Not sure yet?", "لست متأكدا بعد؟")}</SectionLabel><h2>{t("Tell us the decision you're stuck on.", "أخبرنا بالقرار الذي تتوقف عنده.")}</h2><p>{t("The founder brief takes three minutes and points you to the right starting point, a free event, a specific resource, or membership, instead of another comparison table.", "يستغرق موجز المؤسس ثلاث دقائق ويوجهك إلى نقطة البداية الصحيحة، فعالية مجانية أو مورد محدد أو عضوية، بدلا من جدول مقارنة آخر.")}</p></div><div className="resource-card"><SignalTag tone="soft">{t("Takes 3 minutes", "يستغرق ٣ دقائق")}</SignalTag><h3>{t("Build your founder brief.", "ابنِ موجز مؤسسك.")}</h3><p>{t("No credit card. Just the context the network needs to make your first introduction a good one.", "بلا بطاقة ائتمان. فقط السياق الذي تحتاجه الشبكة لجعل مقدمتك الأولى جيدة.")}</p><Link href="/signup" className="button button-dark">{t("Build my founder brief", "ابنِ موجز مؤسسي")} {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link></div></div></section>
  </>;
}
