/* ASaaSI landing page is the ground-truth visual system: warm paper, editorial navy, saffron signals, generous Manrope headings, and precise structured modules. */
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bell, Calculator, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Palette, Play, Plus, Scale, Sparkles, X } from "lucide-react";
import { Logo, navigationMenus } from "../components/site";
import { LanguageToggle, useLocale } from "../contexts/LocaleContext";
import { useAuth } from "../contexts/AuthContext";

const heroArtwork = "/manus-storage/asaasi-ecosystem-hero-original_eb1b1abe.webp";
const pageProductArtwork = "/manus-storage/asaasi-community-network-original_df78b7ff.webp";
const agentProductArtwork = "/manus-storage/asaasi-events-learning-original_c75bc81e.webp";
const announcementArtwork = "/manus-storage/asaasi-founder-briefing-thumb-original_024a9eac.webp";

// Shared with framer-motion so scroll-triggered cards/links stay real <a> tags for
// wouter routing instead of losing client-side navigation to a wrapping motion.div.
// framer's MotionComponentProps<LinkProps> can't unify with wouter's asChild-union LinkProps
// (a TS-only friction, Link forwards className/etc fine at runtime), hence the `any`.
const MotionLink = motion(Link) as any;
const EASE = [0.23, 1, 0.32, 1] as const;

const stories = [
  { label: ["Founder network", "شبكة المؤسسين"], metric: ["The people building the next MENA SaaS companies.", "الأشخاص الذين يبنون شركات SaaS القادمة في المنطقة."], detail: ["Founders, mentors, and specialists with practical experience to share.", "مؤسسون ومرشدون ومتخصصون يشاركون خبرة عملية قابلة للتطبيق."], href: "/connect" },
  { label: ["Companies", "الشركات"], metric: ["A clearer view of the SaaS businesses shaping the region.", "رؤية أوضح لشركات SaaS التي تشكل المنطقة."], detail: ["Learn from the companies, product bets, and operating lessons moving MENA forward.", "تعلم من الشركات وقرارات المنتجات والدروس التشغيلية التي تدفع المنطقة إلى الأمام."], href: "/startups" },
  { label: ["Knowledge", "المعرفة"], metric: ["The shared playbooks behind better decisions.", "أدلة عمل مشتركة لقرارات أفضل."], detail: ["Practical resources, field notes, and real answers for the problem in front of you.", "موارد عملية وملاحظات ميدانية وإجابات واقعية للمشكلة التي تواجهها الآن."], href: "/learn" },
  { label: ["Opportunity", "الفرص"], metric: ["Talent, events, and tools in one place.", "المواهب والفعاليات والأدوات في مكان واحد."], detail: ["Find the next relationship, room, resource, or signal that helps the company move.", "اعثر على العلاقة أو المساحة أو المورد أو الإشارة التي تساعد شركتك على التقدم."], href: "/events" },
] as const;

const introCards = [
  { index: "01", label: ["Founders", "المؤسسون"], link: ["Browse the directory", "تصفح الدليل"], href: "/directory", title: ["Build with people who get the work.", "ابنِ مع أشخاص يفهمون طبيعة العمل."], description: ["Meet founders, operators, mentors, and specialists with the context to make your next question, hire, introduction, or decision more useful.", "تعرف إلى مؤسسين ومشغلين ومرشدين ومتخصصين يملكون السياق الذي يجعل سؤالك أو توظيفك أو مقدمتك أو قرارك التالي أكثر فائدة."], imageAlt: ["Startup founders and advisor collaborating in a product workshop", "مؤسسو شركة ناشئة ومستشار يتعاونون في ورشة عمل للمنتج"], art: pageProductArtwork, className: "pages-card" },
  { index: "02", label: ["Companies", "الشركات"], link: ["Company directory", "دليل الشركات"], href: "/startups", title: ["See what the ecosystem is building next.", "شاهد ما الذي تبنيه المنظومة بعد ذلك."], description: ["Follow the companies, founder conversations, product lessons, and events that are turning regional SaaS ambition into real momentum.", "تابع الشركات وحوارات المؤسسين ودروس المنتجات والفعاليات التي تحول طموح SaaS الإقليمي إلى زخم حقيقي."], imageAlt: ["Founders sharing ideas at an evening SaaS event", "مؤسسون يتبادلون الأفكار في فعالية SaaS مسائية"], art: agentProductArtwork, className: "agents-card" },
] as const;

const roadmapStages = [
  { number: "01", title: ["Validate", "تحقق"], text: ["Find a painful, payable problem.", "اعثر على مشكلة مؤلمة تستحق الدفع لحلها."], channel: ["Learning", "التعلم"], href: "/learn" },
  { number: "02", title: ["Build", "ابنِ"], text: ["Turn the strongest signal into an MVP.", "حول أقوى إشارة إلى منتج أولي."], channel: ["Tools", "الأدوات"], href: "/tools" },
  { number: "03", title: ["Acquire", "اكتسب"], text: ["Prove a repeatable customer path.", "اثبت مسارا متكررا للوصول إلى العملاء."], channel: ["Community", "المجتمع"], href: "/community" },
  { number: "04", title: ["Retain", "احتفظ"], text: ["Make the product essential, not optional.", "اجعل المنتج ضروريا لا اختياريا."], channel: ["Company insight", "رؤى الشركات"], href: "/startups" },
  { number: "05", title: ["Focus", "ركز"], text: ["Own the category that fits you best.", "امتلك الفئة التي تناسبك أكثر."], channel: ["Connection", "الربط"], href: "/connect" },
  { number: "06", title: ["Scale", "توسع"], text: ["Expand with capacity, talent, and focus.", "انمُ بالقدرة والمواهب والتركيز."], channel: ["Growth room", "غرفة النمو"], href: "/events" },
  { number: "07", title: ["Govern", "أدر"], text: ["Build the operating discipline for what is next.", "ابنِ الانضباط التشغيلي لما هو قادم."], channel: ["Specialists", "المتخصصون"], href: "/providers" },
] as const;

const quotes = [
  { number: "01", quote: ["Find the founder who has already faced the decision in front of you.", "تواصل مع المؤسس الذي واجه القرار نفسه من قبل."], label: ["Founder network", "شبكة المؤسسين"], detail: ["Ask how peers handled pricing, hiring, expansion, and product execution in MENA.", "اسأل كيف تعامل الأقران مع التسعير والتوظيف والتوسع وتنفيذ المنتج في المنطقة."] },
  { number: "02", quote: ["Follow the companies showing how SaaS gets built in MENA.", "تابع الشركات التي توضح كيف يبنى SaaS في المنطقة."], label: ["Company intelligence", "رؤى الشركات"], detail: ["Track practical lessons from launches, pivots, hiring, go-to-market experiments, and customer growth.", "تتبع الدروس العملية من الإطلاقات والتحولات والتوظيف وتجارب الوصول إلى السوق ونمو العملاء."] },
  { number: "03", quote: ["Use shared assets that save SaaS teams from starting from zero.", "استخدم أصولا مشتركة توفر على فرق SaaS البدء من الصفر."], label: ["ASaaSI infrastructure", "بنية ASaaSI"], detail: ["Guides, member tools, partner perks, talent pathways, and event rooms built around the work of growing a SaaS company in MENA.", "أدلة وأدوات للأعضاء ومزايا للشركاء ومسارات للمواهب ومساحات للفعاليات مبنية حول مهمة تنمية شركة SaaS في المنطقة."] },
] as const;

const providerCategories = [
  { icon: Scale, query: "legal", name: ["Legal & contracts", "القانون والعقود"], copy: ["Verified service providers with legal and contract expertise who already understand early-stage SaaS needs.", "مزودو خدمات موثقون بخبرة قانونية وتعاقدية يفهمون احتياجات شركات SaaS في مراحلها المبكرة."] },
  { icon: Calculator, query: "finance", name: ["Fractional finance", "المالية الجزئية"], copy: ["Specialist finance support for founders who need practical help without adding another cold search to their week.", "دعم مالي متخصص للمؤسسين الذين يحتاجون مساعدة عملية من دون إضافة بحث بارد جديد إلى أسبوعهم."] },
  { icon: Palette, query: "design", name: ["Brand & product design", "تصميم العلامة والمنتج"], copy: ["Listed design studios and specialists who can help make the product and brand clearer at the stage you are in.", "استوديوهات تصميم ومتخصصون مدرجون يمكنهم مساعدة المنتج والعلامة على أن يصبحا أوضح في المرحلة التي تمر بها."] },
] as const;

const faqItems = [
  ["Why are providers separate from the peer network?", "لماذا مزودو الخدمة منفصلون عن شبكة الأقران؟", "Providers are vetted before they are listed, so founders can look for specialist help without confusing a service search with peer-to-peer community support.", "يخضع مزودو الخدمة للتحقق قبل إدراجهم، كي يجد المؤسسون المساعدة المتخصصة من دون الخلط بين البحث عن خدمة ودعم المجتمع بين الأقران."],
  ["How do I join as a provider?", "كيف أنضم كمزود خدمة؟", "Use the provider path to share your expertise and become visible to founders looking for practical, relevant specialist support.", "استخدم مسار مزودي الخدمة لمشاركة خبرتك والظهور أمام مؤسسين يبحثون عن دعم متخصص وعملي وذي صلة."],
] as const;

const ctaPoints = [
  ["Find people worth knowing", "تعرف إلى أشخاص يستحقون المعرفة"],
  ["Track companies worth learning from", "تابع شركات تستحق التعلم منها"],
  ["Join rooms worth making time for", "انضم إلى مساحات تستحق وقتك"],
] as const;

const footerColumns = [
  { title: ["People", "الأشخاص"], links: [["Founder network", "شبكة المؤسسين", "/connect"], ["Operators", "المشغلون", "/mentors"], ["Specialists", "المتخصصون", "/providers"]] },
  { title: ["Companies", "الشركات"], links: [["Company signals", "إشارات الشركات", "/startups"], ["Founder journeys", "رحلات المؤسسين", "/learn"], ["Events", "الفعاليات", "/events"]] },
  { title: ["Knowledge", "المعرفة"], links: [["Guides", "الأدلة", "/learn"], ["Field notes", "الملاحظات الميدانية", "/articles"], ["Playbooks", "أدلة العمل", "/playbooks"]] },
  { title: ["Infrastructure", "البنية"], links: [["Tools", "الأدوات", "/tools"], ["Talent", "المواهب", "/requests/browse"], ["Providers", "مزودو الخدمة", "/providers"]] },
  { title: ["ASaaSI", "ASaaSI"], links: [["Explore ecosystem", "استكشف المنظومة", "/connect"], ["Join as a provider", "انضم كمزود خدمة", "/providers/join"], ["Explore events", "استكشف الفعاليات", "/events"]] },
] as const;

const menuLabelAr: Record<string, string> = { Connect: "تواصل", Community: "المجتمع", Providers: "المتخصصون", Learn: "تعلم", Events: "الفعاليات", Tools: "الأدوات", Membership: "العضوية" };

function DirectionalArrow({ isRTL, size = 16 }: { isRTL: boolean; size?: number }) {
  return isRTL ? <ArrowLeft size={size} strokeWidth={2.25} /> : <ArrowRight size={size} strokeWidth={2.25} />;
}

function NavDropdown({ menu, isRTL }: { menu: (typeof navigationMenus)[number]; isRTL: boolean }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const clearTimer = () => { if (closeTimer.current !== null) { window.clearTimeout(closeTimer.current); closeTimer.current = null; } };
  const scheduleClose = () => { clearTimer(); closeTimer.current = window.setTimeout(() => setOpen(false), 150); };
  return <div className="nav-item" onMouseEnter={() => { clearTimer(); setOpen(true); }} onMouseLeave={scheduleClose}>
    <button type="button" className="nav-dropdown" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((value) => !value)}>
      {t(menu.label, menuLabelAr[menu.label] ?? menu.label)} <ChevronDown size={13} />
    </button>
    <AnimatePresence>{open && <motion.div className="nav-mega" role="menu" style={{ "--nav-mega-cols": menu.groups.length + 1 } as any} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16, ease: EASE }} onMouseEnter={clearTimer} onMouseLeave={scheduleClose}>
      {menu.groups.map((group) => <div className="nav-mega-group" key={group.label}>
        <span>{t(group.label, group.labelAr)}</span>
        {group.items.map((item) => <Link href={item.href} role="menuitem" key={item.href} onClick={() => setOpen(false)}>
          <strong>{t(item.label, item.labelAr)}</strong>
          <small>{t(item.description, item.descriptionAr)}</small>
        </Link>)}
      </div>)}
      <div className="nav-mega-group">
        <span>{t(menu.feature.label, menu.feature.labelAr)}</span>
        <Link href={menu.feature.href} role="menuitem" onClick={() => setOpen(false)}>
          <strong>{t(menu.feature.title, menu.feature.titleAr)} <DirectionalArrow isRTL={isRTL} size={13} /></strong>
        </Link>
      </div>
    </motion.div>}</AnimatePresence>
  </div>;
}

export default function Home() {
  const { t, isRTL, toggleLocale, formatNum } = useLocale();
  const { isAuthed } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  // Scroll-reveal (fade + rise), skipped entirely when the visitor prefers reduced motion.
  const reveal = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-70px" }, transition: { duration: 0.55, delay, ease: EASE } };
  // Opacity-only variant for elements that already own a CSS hover/active transform
  // (announcement-card, story-card, provider-card), so framer's inline transform
  // never sticks around and cancels those CSS :hover transforms after it resolves.
  const fadeIn = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-70px" }, transition: { duration: 0.6, delay } };
  // Mount animation for the hero, it's above the fold so it plays immediately instead of on scroll.
  const mountReveal = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

  useEffect(() => { document.title = t("ASaaSI | The SaaS ecosystem for MENA", "ASaaSI | منظومة SaaS للشرق الأوسط وشمال أفريقيا"); return () => { document.title = "ASaaSI · MENA SaaS Founder Community"; }; }, [t]);

  return <div id="top" className="flint-landing" dir={isRTL ? "rtl" : "ltr"}>
    <header className="site-header">
      <div className="site-header-inner">
      <div className="wordmark"><Logo /></div>
      <nav className="desktop-nav" aria-label={t("Primary navigation", "التنقل الرئيسي")}>
        {navigationMenus.map((menu) => <NavDropdown menu={menu} isRTL={isRTL} key={menu.id} />)}
      </nav>
      <div className="header-actions">
        <Link href="/assessment" className="sales-link">{t("Take Founder Test", "أجرِ اختبار المؤسس")}</Link>
        <button type="button" className="sign-in language-toggle" onClick={toggleLocale} aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}>
          {t("العربية", "EN")}
        </button>
        {isAuthed ? <>
          <Link href="/dashboard/notifications" className="sign-in" aria-label={t("Notifications", "الإشعارات")}><Bell size={16} /></Link>
          <Link href="/dashboard" className="nav-cta">{t("Dashboard", "لوحتي")} <DirectionalArrow isRTL={isRTL} size={14} /></Link>
        </> : <>
          <Link href="/signup" className="nav-cta">{t("Join ASaaSI", "انضم إلى ASaaSI")} <DirectionalArrow isRTL={isRTL} size={14} /></Link>
        </>}
      </div>
      <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label={t("Toggle navigation", "فتح قائمة التنقل")} aria-expanded={menuOpen}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
      </div>
    </header>

    {menuOpen && <div className="mobile-menu">
      {navigationMenus.map((menu) => <Link href={menu.href} onClick={() => setMenuOpen(false)} key={menu.id}>{t(menu.label, menuLabelAr[menu.label] ?? menu.label)}</Link>)}
      <button type="button" className="mobile-language-toggle" onClick={toggleLocale}>{t("العربية", "EN")}</button>
      {isAuthed
        ? <Link onClick={() => setMenuOpen(false)} className="mobile-cta" href="/dashboard">{t("Dashboard", "لوحتي")} <DirectionalArrow isRTL={isRTL} /></Link>
        : <Link onClick={() => setMenuOpen(false)} className="mobile-cta" href="/signup">{t("Join ASaaSI", "انضم إلى ASaaSI")} <DirectionalArrow isRTL={isRTL} /></Link>}
    </div>}

    <main>
      <section className="hero-section">
        <motion.div className="hero-copy" {...mountReveal()}>
          <p className="eyebrow eyebrow-line">{t("SAAS, POWERED BY EVERYTHING THAT MATTERS", "SaaS، مدعوم بكل ما يهم")}</p>
          <h1>{t("The operating system for SaaS founders in the Middle East.", "نظام التشغيل لمؤسسي SaaS في الشرق الأوسط.")}</h1>
          <p className="hero-subtitle">{t("The structured education, curated network, and practical tools you need to build, run, and scale a sustainable recurring-revenue business — in one place.", "التعليم المنظم والشبكة المنسقة والأدوات العملية التي تحتاجها لبناء وتشغيل وتوسيع عمل مستدام بإيرادات متكررة، في مكان واحد.")}</p>
          <div className="hero-actions">
            {isAuthed ? <Link href="/connect" className="btn btn-black">{t("Explore the ecosystem", "استكشف المنظومة")} <DirectionalArrow isRTL={isRTL} /></Link>
              : <Link href="/signup" className="btn btn-black">{t("Join free", "انضم مجانا")} <DirectionalArrow isRTL={isRTL} /></Link>}
            <Link href="/pricing" className="btn btn-outline">{t("See membership plans", "شاهد خطط العضوية")} <DirectionalArrow isRTL={isRTL} /></Link>
          </div>
        </motion.div>
        <motion.div className="hero-modules" {...mountReveal(0.15)}>
          <img className="hero-artwork" src={heroArtwork} alt={t("Founders working together around a table", "مؤسسون يعملون معا حول طاولة")} />
          <div className="tile-field" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
          <MotionLink className="announcement-card" href="/events/founder-briefing" {...fadeIn(0.5)}>
            <div className="announcement-thumb"><img src={announcementArtwork} alt={t("Founders talking at an ASaaSI briefing", "مؤسسون في جلسة تعريفية لـ ASaaSI")} /><span><Play size={13} fill="currentColor" /></span></div>
            <div className="announcement-content"><span>{t("ASaaSI ecosystem", "منظومة ASaaSI")}</span><strong>{t("Meet the people, companies,", "تعرف إلى الأشخاص والشركات،")}<br />{t("and ideas moving SaaS forward.", "والأفكار التي تدفع SaaS إلى الأمام.")}</strong></div>
            {isRTL ? <ChevronLeft className="announcement-arrow" size={18} /> : <ChevronRight className="announcement-arrow" size={18} />}
          </MotionLink>
        </motion.div>
      </section>

      <section id="stories" className="stories-section" aria-label={t("ASaaSI ecosystem", "منظومة ASaaSI")}>
        <div className="story-track">
          {[...stories, ...stories].map((story, index) => <Link href={story.href} className="story-card" key={`${story.href}-${index}`}>
            <span className="story-logo">{t(story.label[0], story.label[1])}</span>
            <h3>{t(story.metric[0], story.metric[1])}</h3>
            <span>{t(story.detail[0], story.detail[1])} <DirectionalArrow isRTL={isRTL} size={14} /></span>
          </Link>)}
        </div>
      </section>

      <section id="products" className="intro-section section-pad">
        <motion.div className="section-head centered-head" {...reveal()}>
          <p className="eyebrow">{t("THE ECOSYSTEM, CONNECTED", "المنظومة، أكثر ترابطا")}</p>
          <h2>{t("Every part of SaaS.", "كل جزء من SaaS.")}<br />{t("Better connected.", "أكثر ترابطا.")}</h2>
          <p>{t("ASaaSI turns the people, companies, learning, events, and operating tools that founders need into one shared starting point.", "تحول ASaaSI الأشخاص والشركات والتعلم والفعاليات والأدوات التشغيلية التي يحتاجها المؤسسون إلى نقطة انطلاق مشتركة.")}</p>
        </motion.div>
        <div className="product-grid">
          {introCards.map((card, index) => <motion.article id={card.index === "02" ? "events" : undefined} className={`product-card ${card.className}`} key={card.index} {...reveal(index * 0.12)}>
            <div className="product-card-top"><div><span className="product-index">{formatNum(card.index)}</span><span className="product-name">{t(card.label[0], card.label[1])}</span></div><Link href={card.href}>{t(card.link[0], card.link[1])} <DirectionalArrow isRTL={isRTL} size={14} /></Link></div>
            <div className="product-card-copy"><h3>{t(card.title[0], card.title[1])}</h3><p>{t(card.description[0], card.description[1])}</p></div>
            <div className="product-art"><img src={card.art} alt={t(card.imageAlt[0], card.imageAlt[1])} /></div>
          </motion.article>)}
        </div>
      </section>

      <section className="system-section section-pad">
        <motion.div className="section-head system-heading" {...reveal()}><p className="eyebrow eyebrow-line">{t("THE THREE PILLARS", "الركائز الثلاث")}</p><h2>{t("Education, Community, and Tools.", "التعليم والمجتمع والأدوات.")}<br />{t("Run by one SaaS AI Coach.", "يديرها مرشد SaaS واحد بالذكاء الاصطناعي.")}</h2><p>{t("Not three products sharing a logo — the SaaS AI Coach is the kernel running underneath and across all three, the reason they behave like one system.", "ليست ثلاثة منتجات تتشارك شعارا واحدا، فمرشد SaaS بالذكاء الاصطناعي هو النواة التي تعمل تحت الركائز الثلاث وعبرها، وهو ما يجعلها تتصرف كمنظومة واحدة.")}</p></motion.div>
        <div className="system-rows">
          <motion.div className="system-row" {...reveal()}>
            <div className="system-label"><span>{formatNum("01")}</span><h3>{t("Education: learn exactly what your stage needs.", "التعليم: تعلم ما تحتاجه مرحلتك بالضبط.")}</h3></div>
            <p>{t("Courses, videos, articles, guides, webinars, a podcast, and workshops, all mapped to the 7-stage roadmap and the function you are actually stuck on, from people who have built it.", "دورات وفيديوهات ومقالات وأدلة وندوات وبودكاست وورش عمل، كل ذلك مرتبط بخريطة الطريق ذات السبع مراحل وبالوظيفة التي تتعثر فيها فعلا، من أشخاص بنوا ذلك بالفعل.")}</p>
            <div className="knowledge-flow" aria-label={t("Education that compounds.", "تعليم يتراكم أثره.")}>
              <div className="flow-source source-founders"><span>{formatNum("01")}</span><b>{t("Founder", "ملاحظات")}<br />{t("notes", "المؤسسين")}</b></div>
              <div className="flow-source source-companies"><span>{formatNum("02")}</span><b>{t("Company", "أنماط")}<br />{t("patterns", "الشركات")}</b></div>
              <div className="knowledge-core"><i /><span>ASaaSI</span><strong>{t("Shared", "سياق")}<br />{t("context", "مشترك")}</strong></div>
              <div className="knowledge-output">{[t("PLAYBOOKS", "أدلة"), t("FIELD NOTES", "ملاحظات ميدانية"), t("NEXT MOVES", "خطوات تالية")].map((output) => <span key={output}>{output}</span>)}</div>
            </div>
          </motion.div>
          <motion.div className="system-row" {...reveal()}>
            <div className="system-label"><span>{formatNum("02")}</span><h3>{t("Community: you are not figuring this out alone.", "المجتمع: لست تحل هذا وحدك.")}</h3></div>
            <p>{t("A professional directory, a startup directory, vetted service providers, partners, and flagship events like the SaaS Summit and Demo Days replace WhatsApp-group guesswork with a real network.", "دليل للمتخصصين ودليل للشركات الناشئة ومزودو خدمة موثقون وشركاء وفعاليات رئيسية مثل قمة SaaS وأيام العرض، تحل محل التخمين في مجموعات واتساب بشبكة حقيقية.")}</p>
            <div className="ecosystem-map" aria-label={t("A real professional network.", "شبكة متخصصين حقيقية.")}>
              <i className="map-ring ring-one" /><i className="map-ring ring-two" />
              <span className="map-node node-founders">{t("Professionals", "المتخصصون")}</span><span className="map-node node-companies">{t("Companies", "الشركات")}</span><span className="map-node node-learning">{t("Learning", "التعلم")}</span><span className="map-node node-talent">{t("Talent", "المواهب")}</span><span className="map-node node-events">{t("Events", "الفعاليات")}</span>
              <div className="map-core"><Sparkles size={16} /><b>{t("Next", "الفعالية")}<br />{t("event", "التالية")}</b></div>
            </div>
          </motion.div>
          <motion.div className="system-row" {...reveal()}>
            <div className="system-label"><span>{formatNum("03")}</span><h3>{t("Tools: stop rebuilding the wheel.", "الأدوات: لا تعد بناء العجلة.")}</h3></div>
            <p>{t("Ready-to-use founder tools and sheets for fast, practical problem-solving, plus negotiated perks and discounts that remove friction from problems already solved a hundred times.", "أدوات وقوالب جاهزة للمؤسسين لحل المشكلات بسرعة وعملية، بالإضافة إلى مزايا وخصومات تفاوضنا عليها لإزالة العوائق عن مشكلات تم حلها مئات المرات من قبل.")}</p>
            <div className="tools-perks-visual" aria-label={t("Tools and perks that make progress practical.", "أدوات ومزايا تجعل التقدم عمليا.")}>
              <div className="tools-built-card"><span>{t("BUILT BY ASaaSI", "من تطوير ASaaSI")}</span><b>{t("Founder toolbox", "صندوق أدوات المؤسس")}</b><div>{[t("Readiness check", "فحص الجاهزية"), t("Pricing planner", "مخطط التسعير"), t("Stack guide", "دليل التقنيات")].map((tool) => <small key={tool}>{tool}</small>)}</div></div>
              <div className="perks-card"><span>{t("MEMBER PERKS", "مزايا الأعضاء")}</span><b>{t("SaaS deals", "عروض SaaS")}</b><small>{t("Partner rates and useful credits", "أسعار شركاء وامتيازات مفيدة")}</small></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="workflow-section section-pad">
        <motion.div className="section-head roadmap-heading" {...reveal()}>
          <p className="eyebrow">{t("THE COMPANY JOURNEY", "رحلة الشركة")}</p>
          <h2>{t("Seven stages.", "سبع مراحل.")}<br />{t("One growth path.", "مسار نمو واحد.")}</h2>
          <p>{t("Move from a sharp problem to regional scale with the right signal, people, and infrastructure at every stage.", "انتقل من مشكلة واضحة إلى التوسع الإقليمي عبر الإشارة والأشخاص والبنية المناسبة في كل مرحلة.")}</p>
          <div className="roadmap-proof">
            <span><strong>2</strong> {t("stages fully built and taught", "مرحلتان مبنيتان بالكامل ومُدرَستان")}</span>
            <span><strong>9</strong> {t("functional pillars mapped", "ركائز وظيفية مرتبطة")}</span>
            <span>{t("Season 1 podcast recorded with top-tier SaaS founders", "الموسم الأول من البودكاست مسجل مع مؤسسي SaaS من الصفوف الأولى")}</span>
          </div>
        </motion.div>
        <div className="roadmap-key"><span><i /> {t("Company growth roadmap", "خارطة نمو الشركة")}</span><small>{t("Tap a stage to see where ASaaSI can help.", "اختر مرحلة لتعرف أين تساعدك ASaaSI.")}</small></div>
        <div className="growth-roadmap" aria-label={t("Seven-stage SaaS growth roadmap", "خارطة نمو SaaS من سبع مراحل")}>
          {roadmapStages.map((stage, index) => <MotionLink href={stage.href} className={`roadmap-stage stage-${index + 1}`} key={stage.number} {...reveal(index * 0.07)} whileHover={reduceMotion ? undefined : { y: -4 }}>
            <div className="roadmap-node"><i /></div>
            <span className="roadmap-number">{formatNum(stage.number)}</span>
            <h3>{t(stage.title[0], stage.title[1])}</h3>
            <p>{t(stage.text[0], stage.text[1])}</p>
            <span className="roadmap-channel">{t(stage.channel[0], stage.channel[1])}</span>
          </MotionLink>)}
        </div>
        <div className="roadmap-quiz-cta">
          <p className="workflow-closer">{t("Not sure which stage you're at?", "غير متأكد في أي مرحلة أنت؟")}</p>
          <Link href="/assessment" className="btn btn-black">{t("Take the founder test", "أجرِ اختبار المؤسس")} <DirectionalArrow isRTL={isRTL} size={14} /></Link>
        </div>
      </section>

      <section id="testimonials" className="quote-section section-pad">
        <motion.p className="eyebrow centered-eyebrow" {...reveal()}>{t("A SAAS ECOSYSTEM WITH A POINT OF VIEW", "منظومة SaaS برؤية واضحة")}</motion.p>
        <div className="quote-grid">{quotes.map((item, index) => <motion.blockquote className={index === 2 ? "quote-wide" : ""} key={item.number} {...reveal(index * 0.1)}><span>{formatNum(item.number)}</span><p>{t(item.quote[0], item.quote[1])}</p><footer><b>{t(item.label[0], item.label[1])}</b><small>{t(item.detail[0], item.detail[1])}</small></footer></motion.blockquote>)}</div>
      </section>

      <section id="providers" className="faq-section section-pad">
        <motion.div className="faq-heading" {...reveal()}>
          <p className="eyebrow">{t("ECOSYSTEM SUPPORT", "دعم المنظومة")}</p>
          <h2>{t("Specialist support, without leaving the ecosystem.", "دعم متخصص من داخل المنظومة.")}</h2>
          <p>{t("Verified providers who already understand SaaS, listed by the work they do.", "مزودون موثقون يفهمون SaaS بالفعل، مدرجون حسب العمل الذي يقدمونه.")}</p>
          <Link href="/providers" className="btn btn-outline">{t("View all providers", "عرض كل المزودين")} <DirectionalArrow isRTL={isRTL} size={14} /></Link>
        </motion.div>
        <div className="faq-column">
          <motion.div className="provider-strip" {...fadeIn()}>
            <div className="provider-track">{[...providerCategories, ...providerCategories, ...providerCategories].map((category, index) => { const Icon = category.icon; return <Link href={`/providers?service=${category.query}`} className="provider-chip" key={`${category.name[0]}-${index}`}>
              <span className="provider-chip-icon"><Icon size={16} /></span>
              <strong>{t(category.name[0], category.name[1])}</strong>
            </Link>; })}</div>
          </motion.div>
          <p className="provider-strip-hint">{t("Tap a specialty to filter the provider directory.", "اضغط على تخصص لتصفية دليل المزودين.")}</p>
          <div className="faq-subhead">{t("Frequently asked", "أسئلة شائعة")}</div>
          <div className="faq-list">{faqItems.map(([q, qAr, a, aAr], index) => { const isOpen = openFaq === index; return <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={q}><button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span>{t(q, qAr)}</span><Plus size={20} /></button>
            <AnimatePresence initial={false}>{isOpen && <motion.p initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} style={{ overflow: "hidden" }}>{t(a, aAr)}</motion.p>}</AnimatePresence>
          </div>; })}</div>
        </div>
      </section>

      <section id="trial" className="cta-section">
        <div className="cta-grid" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} />)}</div>
        <motion.div className="cta-inner" {...reveal()}>
          <p className="eyebrow">{t("JOIN THE ECOSYSTEM", "انضم إلى المنظومة")}</p>
          <h2>{t("MENA's SaaS economy needs a place to connect its strengths.", "يحتاج اقتصاد SaaS في المنطقة إلى مكان يجمع نقاط قوته.")}</h2>
          <p>{t("ASaaSI brings the people, knowledge, companies, events, tools, and next moves into the same ecosystem.", "تجمع ASaaSI الأشخاص والمعرفة والشركات والفعاليات والأدوات والخطوات التالية في منظومة واحدة.")}</p>
          <ul>{ctaPoints.map((point) => <li key={point[0]}><Check size={14} /> {t(point[0], point[1])}</li>)}</ul>
          <div className="hero-actions">
            {isAuthed ? <Link href="/connect" className="btn btn-black">{t("Explore ASaaSI", "استكشف ASaaSI")} <DirectionalArrow isRTL={isRTL} /></Link>
              : <Link href="/signup" className="btn btn-black">{t("Join free", "انضم مجانا")} <DirectionalArrow isRTL={isRTL} /></Link>}
            <Link href="/pricing" className="btn btn-outline">{t("See membership plans", "شاهد خطط العضوية")} <DirectionalArrow isRTL={isRTL} /></Link>
          </div>
        </motion.div>
      </section>
    </main>

    <footer id="footer" className="site-footer">
      <div className="footer-top">
        <div className="wordmark"><Logo inverted /></div>
        <p>{t("The people, companies, and momentum behind MENA SaaS.", "الأشخاص والشركات والزخم خلف SaaS في المنطقة.")}</p>
      </div>
      <div className="footer-grid">
        {footerColumns.map((column) => <div key={column.title[0]}>
          <h3>{t(column.title[0], column.title[1])}</h3>
          {column.links.map(([label, labelAr, href]) => <Link href={href} key={href}>{t(label, labelAr)}</Link>)}
        </div>)}
      </div>
      <div className="footer-bottom">
        <span>{t("© 2026 ASaaSI · MENA SaaS Founder Community", "© 2026 ASaaSI · مجتمع مؤسسي SaaS في الشرق الأوسط وشمال أفريقيا")}</span>
        <div>
          <button type="button" className={!isRTL ? "is-active" : ""} onClick={() => { if (isRTL) toggleLocale(); }} aria-pressed={!isRTL}>EN</button>
          <button type="button" className={isRTL ? "is-active" : ""} onClick={() => { if (!isRTL) toggleLocale(); }} aria-pressed={isRTL}>العربية</button>
          <Link href="/providers">{t("Providers", "مزودو الخدمة")}</Link>
        </div>
      </div>
    </footer>
  </div>;
}
