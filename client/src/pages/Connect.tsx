/* Landing-derived Connect page: image-led editorial composition with a practical founder-matching slate. */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MapPin, Search } from "lucide-react";
import { Link } from "wouter";
import { SectionLabel, SignalTag } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";

const connectArtwork = "/manus-storage/asaasi-community-network-original_df78b7ff.webp";
const signalArtwork = "/manus-storage/asaasi-founder-briefing-thumb-original_024a9eac.webp";

const people = [
  { id: 1, initials: "NH", name: "Nour Haddad", role: "Founder, B2B SaaS · Amman", copy: "Building repeatable sales motion after the first ten customers.", tag: "GTM", arRole: "مؤسسة برمجيات B2B · عمان", arCopy: "تبني حركة مبيعات قابلة للتكرار بعد أول عشرة عملاء.", arTag: "نمو السوق" },
  { id: 2, initials: "OA", name: "Omar Al-Khatib", role: "Product operator · Dubai", copy: "Has shipped pricing changes across two regional SaaS teams.", tag: "Pricing", arRole: "مشغل منتجات · دبي", arCopy: "قاد تغييرات التسعير في فريقين إقليميين للبرمجيات.", arTag: "التسعير" },
  { id: 3, initials: "LS", name: "Layla Saad", role: "People lead · Riyadh", copy: "Hiring the first layer of operators without losing the founder pace.", tag: "Hiring", arRole: "قائدة فريق · الرياض", arCopy: "توظف أول طبقة من المشغلين دون فقدان إيقاع المؤسس.", arTag: "التوظيف" },
  { id: 4, initials: "YK", name: "Youssef Khalil", role: "Founder, workflow SaaS · Cairo", copy: "Learning how to expand from Egypt into the Gulf with focus.", tag: "Expansion", arRole: "مؤسس برمجيات سير عمل · القاهرة", arCopy: "يتعلم كيف يتوسع من مصر إلى الخليج بتركيز.", arTag: "التوسع" },
  { id: 5, initials: "MA", name: "Maha Al-Sayed", role: "Mentor · Manama", copy: "Former revenue lead for startups finding their first repeatable channel.", tag: "Revenue", arRole: "مرشدة · المنامة", arCopy: "قائدة إيرادات سابقة تساعد الشركات الناشئة على إيجاد أول قناة قابلة للتكرار.", arTag: "الإيرادات" },
  { id: 6, initials: "FS", name: "Fadi Saad", role: "Founder, fintech SaaS · Beirut", copy: "Open to sharing the messy version of fundraising and runway planning.", tag: "Fundraising", arRole: "مؤسس برمجيات مالية · بيروت", arCopy: "مستعد لمشاركة الجانب المعقد من جمع التمويل وتخطيط المدرج المالي.", arTag: "جمع التمويل" },
];

const focusOptions = ["All", "Pricing", "Hiring", "Expansion"] as const;

export default function Connect() {
  const { t, formatNum, isRTL } = useLocale();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState<(typeof focusOptions)[number]>("All");
  const focusArabic: Record<(typeof focusOptions)[number], string> = { All: "كل المسارات", Pricing: "التسعير", Hiring: "التوظيف", Expansion: "التوسع" };
  const translated = useMemo(() => people.map((person) => ({ ...person, role: t(person.role, person.arRole), copy: t(person.copy, person.arCopy), tag: t(person.tag, person.arTag), rawTag: person.tag })), [t]);
  const filtered = useMemo(() => translated.filter((person) => `${person.name} ${person.role} ${person.copy} ${person.tag}`.toLowerCase().includes(query.toLowerCase()) && (focus === "All" || person.rawTag === focus)), [translated, query, focus]);
  const direction = isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />;

  return <>
    <section className="connect-landing-hero">
      <div className="container connect-landing-hero__copy">
        <SectionLabel>{t("Connect / Founder network", "تواصل / شبكة المؤسسين")}</SectionLabel>
        <h1>{t("Find the person who makes the next decision easier.", "اعثر على الشخص الذي يجعل القرار التالي أسهل.")}</h1>
        <p>{t("A focused network of founders, operators, mentors, and specialists who understand what it means to build SaaS across MENA.", "شبكة مركزة من المؤسسين والمشغلين والمرشدين والمتخصصين الذين يفهمون معنى بناء SaaS عبر المنطقة.")}</p>
        <div className="connect-landing-hero__actions"><Link href="/requests/new" className="button button-primary">{t("Build a matching brief", "أنشئ موجز مطابقة")} {direction}</Link><a href="#match-slate" className="button button-ghost">{t("Browse the network", "تصفح الشبكة")} <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="connect-landing-visual">
        <img src={connectArtwork} alt={t("Founders and operators in conversation", "مؤسسون ومشغلون في حوار")} />
        <div className="connect-visual-line connect-visual-line--one" /><div className="connect-visual-line connect-visual-line--two" /><div className="connect-visual-line connect-visual-line--three" />
        <div className="connect-floating-context"><span className="mono">{t("MATCHING / CONTEXT FIRST", "المطابقة / السياق أولا")}</span><div><img src={signalArtwork} alt="" /><p>{t("Start with the decision in front of you. We will point you to the right conversation, not the largest directory.", "ابدأ بالقرار الذي أمامك. سنوجهك إلى المحادثة المناسبة، لا إلى أكبر دليل.")}</p></div><Link href="/requests/new">{t("Make the ask useful", "اجعل الطلب مفيدا")} {direction}</Link></div>
      </div>
    </section>

    <section className="connect-landing-intro"><div className="container"><div className="connect-intro-heading"><div><SectionLabel>{t("The founder network", "شبكة المؤسسين")}</SectionLabel><h2>{t("The right introduction begins before the profile card.", "المقدمة المناسبة تبدأ قبل بطاقة الملف الشخصي.")}</h2></div><p>{t("Good matching is not a keyword search. It starts with a real question, the conditions around it, and someone who has walked enough of the path to help.", "المطابقة الجيدة ليست بحثا بالكلمات المفتاحية. تبدأ بسؤال حقيقي والشروط المحيطة به وشخص سار في المسار بما يكفي للمساعدة.")}</p></div></div></section>

    <section className="connect-landing-slate" id="match-slate"><div className="container"><div className="connect-slate-top"><div><SectionLabel>{t("People with context", "أشخاص يملكون السياق")}</SectionLabel><h2>{t("Not more contacts. Better starting points.", "ليس مزيدا من جهات الاتصال. بل نقاط بداية أفضل.")}</h2></div><div className="connect-slate-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search a person, market, or problem", "ابحث عن شخص أو سوق أو مشكلة")} /></div></div><div className="connect-slate-filters"><span>{t("Show people useful for", "اعرض الأشخاص المناسبين لـ")}</span>{focusOptions.map((option) => <button type="button" className={focus === option ? "is-active" : ""} key={option} onClick={() => setFocus(option)}>{t(option, focusArabic[option])}</button>)}</div>{filtered.length ? <div className="connect-landing-grid">{filtered.map((person, index) => <article className="connect-landing-card" key={person.id}><div className="connect-card-top"><span className="connect-card-index">{formatNum(index + 1)}</span><SignalTag tone="soft">{person.tag}</SignalTag></div><div className="connect-card-identity"><span>{person.initials}</span><div><h3>{person.name}</h3><p><MapPin size={12} /> {person.role}</p></div></div><p className="connect-card-reason">{person.copy}</p><div className="connect-card-bottom"><span>{t("Open to a focused introduction", "متاح لمقدمة مركزة")}</span><Link href={`/members/${person.id}`}>{t("View profile", "شاهد الملف")} <ArrowUpRight size={14} /></Link></div></article>)}</div> : <div className="connect-slate-empty"><SignalTag>{t("No exact match yet", "لا توجد مطابقة دقيقة بعد")}</SignalTag><h3>{t("Write the specific question instead.", "اكتب السؤال المحدد بدلا من ذلك.")}</h3><p>{t("The network becomes useful when founders describe the real blocker in plain language.", "تصبح الشبكة مفيدة عندما يصف المؤسسون العائق الحقيقي بلغة واضحة.")}</p><Link href="/requests/new" className="button button-dark">{t("Create a matching brief", "أنشئ موجز مطابقة")} {direction}</Link></div>}</div></section>

    <section className="connect-landing-callout"><div className="container"><div className="connect-callout-image"><img src={signalArtwork} alt="" /><span>{t("One clear next conversation", "محادثة تالية واضحة")}</span></div><div><SectionLabel>{t("Start free", "ابدأ مجانا")}</SectionLabel><h2>{t("One useful introduction can change the shape of the week.", "مقدمة مفيدة واحدة يمكن أن تغير شكل الأسبوع.")}</h2><p>{t("Join the network, write a focused brief, and let the right context travel further than another cold message.", "انضم إلى الشبكة، واكتب موجزا مركزا، ودع السياق المناسب يصل أبعد من رسالة باردة أخرى.")}</p><div><Link href="/signup" className="button button-primary">{t("Join free", "انضم مجانا")} {direction}</Link><Link href="/pricing" className="button button-ghost">{t("Explore membership", "استكشف العضوية")}</Link></div></div></div></section>
  </>;
}
