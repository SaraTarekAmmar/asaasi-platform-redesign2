/* Landing-aligned ASaaSI shell: the supplied wordmark, warm paper navigation, navy structure, and landing-page components are shared across every non-landing route. */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Bell, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { LanguageToggle, useLocale } from "../../contexts/LocaleContext";
import { useAuth } from "../../contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import "../../navigation.css";
import "../../logo-asset.css";

export function Logo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  const [location] = useLocation();
  const src = inverted ? "/manus-storage/asaasi-logo-white_c6d1d735.svg" : "/manus-storage/asaasi-logo-navy_b67d2a37.svg";
  const classes = `brand ${className}`.trim();
  const image = <img className="brand-logo-asset" src={src} alt="ASaaSI أساسي" />;
  // Login and signup wrap Logo in a route link for their bespoke account layouts; avoid rendering a second anchor inside it.
  if (location === "/login" || location === "/signup") return <span className={classes}>{image}</span>;
  return <Link href="/" className={classes} aria-label="ASaaSI home">{image}</Link>;
}

// "Forward" icons need to point the other way in RTL, since they follow reading direction.
function DirectionalArrow({ isRTL, size = 14 }: { isRTL: boolean; size?: number }) {
  return isRTL ? <ArrowLeft size={size} /> : <ArrowRight size={size} />;
}
function DirectionalChevron({ isRTL, size = 17 }: { isRTL: boolean; size?: number }) {
  return isRTL ? <ChevronLeft size={size} /> : <ChevronRight size={size} />;
}

export function SignalTag({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`signal-tag ${tone}`}><span className="signal-dot" />{children}</span>;
}

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow mono ${light ? "eyebrow-light" : ""}`}>{children}</div>;
}

export function PageIntro({ label, title, copy, note }: { label: string; title: ReactNode; copy: string; note?: ReactNode }) {
  const [location] = useLocation();
  const route = location.split("/").filter(Boolean)[0] || "home";
  const routeMark: Record<string, string> = { connect: "01 / MATCH", community: "02 / THREAD", events: "03 / DATE", tools: "04 / WORK", pricing: "05 / MOVE", learn: "06 / FIELD" };
  return <section className={`page-hero landing-page-intro landing-page-intro--${route}`}><div className="container page-hero-grid landing-page-intro__inner"><span className="landing-route-mark" aria-hidden="true"><i />{routeMark[route] ?? "ASaaSI / MENA"}</span><div className="landing-page-intro__content"><SectionLabel light>{label}</SectionLabel><h1>{title}</h1><p>{copy}</p></div>{note && <div className="page-hero-note landing-page-intro__note">{note}</div>}</div></section>;
}

type MenuItem = { href: string; label: string; labelAr: string; description: string; descriptionAr: string; badge?: string; badgeAr?: string };
type MenuGroup = { label: string; labelAr: string; items: MenuItem[] };
export type NavMenu = { id: string; label: string; href: string; eyebrow: string; eyebrowAr: string; description: string; descriptionAr: string; groups: MenuGroup[]; feature: { label: string; labelAr: string; title: string; titleAr: string; href: string } };

export const navigationMenus: NavMenu[] = [
  { id: "connect", label: "Connect", href: "/connect", eyebrow: "People / asks / introductions", eyebrowAr: "أشخاص / طلبات / تعارف", description: "The MENA SaaS founder who has already faced your exact decision — not a generic accelerator alumni list.", descriptionAr: "مؤسس SaaS في المنطقة واجه قرارك بالضبط من قبل، لا قائمة خريجي برنامج تسريع عام.", groups: [
    { label: "Discover people", labelAr: "اكتشف أشخاصا", items: [{ href: "/directory", label: "Directory", labelAr: "الدليل", description: "Browse founders and operators by context.", descriptionAr: "تصفح المؤسسين والمشغلين حسب السياق." }, { href: "/startups", label: "Startups", labelAr: "الشركات الناشئة", description: "See what MENA founders are building.", descriptionAr: "شاهد ما يبنيه مؤسسو المنطقة." }] },
    { label: "Make a connection", labelAr: "اصنع تواصلا", items: [{ href: "/matching", label: "Open matching", labelAr: "فتح المطابقة", description: "Let the next useful fit surface.", descriptionAr: "دع أفضل تطابق مفيد يظهر." }] },
  ], feature: { label: "Next move", labelAr: "الخطوة التالية", title: "Show me the right move", titleAr: "أرني الخطوة المناسبة", href: "/matching" } },
  { id: "community", label: "Community", href: "/community", eyebrow: "Questions / posts / discussion", eyebrowAr: "أسئلة / منشورات / نقاش", description: "Real MENA SaaS peers who answer in public, not a WhatsApp group that goes quiet after the intro round.", descriptionAr: "أقران حقيقيون في SaaS بالمنطقة يجيبون علنا، لا مجموعة واتساب تصمت بعد جولة التعارف.", groups: [
    { label: "Join the conversation", labelAr: "شارك في النقاش", items: [{ href: "/community", label: "Browse posts", labelAr: "تصفح المنشورات", description: "See what founders are asking right now.", descriptionAr: "شاهد ما يسأل عنه المؤسسون الآن." }, { href: "/community#popular", label: "Popular this week", labelAr: "الأكثر تفاعلا هذا الأسبوع", description: "The threads getting the most replies.", descriptionAr: "المواضيع التي تحصل على أكثر الردود." }] },
  ], feature: { label: "Start here", labelAr: "ابدأ هنا", title: "Ask the network a real question", titleAr: "اطرح سؤالا حقيقيا على الشبكة", href: "/community#ask" } },
  { id: "providers", label: "Providers", href: "/providers", eyebrow: "Specialist help / verified", eyebrowAr: "مساعدة متخصصة / موثقة", description: "A capped, vetted layer — about 20 spots a year — not another generic freelancer marketplace.", descriptionAr: "طبقة موثقة ومحدودة، نحو ٢٠ مكانا في السنة، لا سوق مستقلين عام آخر.", groups: [
    { label: "Find a provider", labelAr: "اعثر على مزود", items: [{ href: "/providers", label: "View all providers", labelAr: "عرض كل المزودين", description: "Browse verified specialists by service.", descriptionAr: "تصفح المتخصصين الموثقين حسب الخدمة." }] },
    { label: "Offer services", labelAr: "قدم خدماتك", items: [{ href: "/providers/join", label: "Join as a provider", labelAr: "انضم كمزود خدمة", description: "List your practice in front of founders.", descriptionAr: "اعرض ممارستك أمام المؤسسين." }] },
  ], feature: { label: "Verified specialists", labelAr: "متخصصون موثقون", title: "View all service providers", titleAr: "عرض كل مزودي الخدمة", href: "/providers" } },
  { id: "learn", label: "Learn", href: "/learn", eyebrow: "7-stage roadmap / 9 functions", eyebrowAr: "٧ مراحل / ٩ وظائف", description: "Mapped to the MENA SaaS 7-Stage Growth Roadmap and its 9 functional pillars — not generic startup advice repackaged for SaaS.", descriptionAr: "مرتبط بخريطة نمو SaaS ذات السبع مراحل في المنطقة وركائزها الوظيفية التسع، لا نصائح عامة عن الشركات الناشئة أعيد تغليفها لـ SaaS.", groups: [
    { label: "Browse the library", labelAr: "تصفح المكتبة", items: [{ href: "/learn", label: "Learning hub", labelAr: "مركز التعلم", description: "Start with a guided founder path.", descriptionAr: "ابدأ بمسار مؤسس موجه." }, { href: "/articles", label: "Articles", labelAr: "مقالات", description: "Clear notes for consequential decisions.", descriptionAr: "ملاحظات واضحة للقرارات المهمة." }, { href: "/podcasts", label: "Podcasts", labelAr: "بودكاست", description: "Long-form conversations with operators.", descriptionAr: "حوارات مطولة مع مشغلين." }, { href: "/webinars", label: "Webinars", labelAr: "ندوات مباشرة", description: "Live sessions with real time to ask questions.", descriptionAr: "جلسات مباشرة مع وقت حقيقي لطرح الأسئلة." }] },
    { label: "Go deeper", labelAr: "تعمق أكثر", items: [{ href: "/courses/pricing", label: "Courses", labelAr: "الدورات", description: "Move from concept to repeatable practice.", descriptionAr: "انتقل من الفكرة إلى ممارسة قابلة للتكرار." }, { href: "/playbooks", label: "Playbooks", labelAr: "أدلة عملية", description: "Practical sequences for the next test.", descriptionAr: "خطوات عملية للاختبار التالي." }, { href: "/videos", label: "Videos", labelAr: "فيديوهات", description: "Watch the idea work in the real world.", descriptionAr: "شاهد الفكرة تعمل في الواقع." }, { href: "/workshops", label: "Workshops", labelAr: "ورش عمل", description: "A facilitated half-day, per company.", descriptionAr: "نصف يوم مُيسَر، لكل شركة." }] },
  ], feature: { label: "Founder brief", labelAr: "موجز المؤسس", title: "Build the next good decision", titleAr: "ابنِ القرار الجيد التالي", href: "/assessment" } },
  { id: "events", label: "Events", href: "/events", eyebrow: "Webinars / Summit / Demo Days", eyebrowAr: "ندوات / قمة / أيام عرض", description: "From monthly webinars to the SaaS Summit and Demo Days — choose the event by the outcome you want, not the size of the calendar.", descriptionAr: "من الندوات الشهرية إلى قمة SaaS وأيام العرض، اختر الفعالية حسب النتيجة التي تريدها، لا حسب حجم التقويم.", groups: [
    { label: "Find your event", labelAr: "اعثر على فعاليتك", items: [{ href: "/events", label: "Events calendar", labelAr: "تقويم الفعاليات", description: "Upcoming events in MENA and online.", descriptionAr: "فعاليات قادمة في المنطقة وعبر الإنترنت." }, { href: "/events#past", label: "Past events", labelAr: "فعاليات سابقة", description: "What already happened, for context.", descriptionAr: "ما حدث بالفعل، للسياق." }, { href: "/demo-day", label: "Demo day", labelAr: "يوم العرض", description: "See what is ready to be shared.", descriptionAr: "شاهد ما هو جاهز للمشاركة." }] },
    { label: "Keep moving", labelAr: "واصل التقدم", items: [{ href: "/events", label: "Next event", labelAr: "الفعالية التالية", description: "The closest useful conversation.", descriptionAr: "أقرب محادثة مفيدة.", badge: "Soon", badgeAr: "قريبا" }, { href: "/dashboard/registrations", label: "My registrations", labelAr: "تسجيلاتي", description: "Return to events you have chosen.", descriptionAr: "عد إلى الفعاليات التي اخترتها." }, { href: "/dashboard/events", label: "My event workspace", labelAr: "مساحة فعالياتي", description: "Keep event follow-ups together.", descriptionAr: "احتفظ بمتابعات الفعاليات في مكان واحد." }, { href: "/events/host", label: "Host an event", labelAr: "استضف فعالية", description: "Submit a community event for the calendar.", descriptionAr: "أرسل فعالية مجتمعية للتقويم." }] },
  ], feature: { label: "This week", labelAr: "هذا الأسبوع", title: "Find your next event", titleAr: "اعثر على فعاليتك التالية", href: "/events" } },
  { id: "tools", label: "Tools", href: "/tools", eyebrow: "Workbenches / assessments / progress", eyebrowAr: "أدوات عمل / تقييمات / تقدم", description: "Stop rebuilding the wheel: founder tools and sheets for problems already solved a hundred times, plus negotiated perks.", descriptionAr: "لا تعد بناء العجلة: أدوات وقوالب للمؤسسين لمشكلات تم حلها مئات المرات من قبل، بالإضافة إلى مزايا تفاوضنا عليها.", groups: [
    { label: "Use a workbench", labelAr: "استخدم أداة عمل", items: [{ href: "/tools", label: "Tools library", labelAr: "مكتبة الأدوات", description: "Browse founder tools by job to be done.", descriptionAr: "تصفح أدوات المؤسسين حسب المهمة المطلوبة." }, { href: "/tools/runway", label: "Runway planner", labelAr: "مخطط الاستمرارية المالية", description: "See the months behind the decision.", descriptionAr: "شاهد الأشهر التي تقف خلف القرار." }, { href: "/tools/pricing", label: "Pricing canvas", labelAr: "لوحة التسعير", description: "Turn an abstract offer into a test.", descriptionAr: "حول عرضا مجردا إلى اختبار." }, { href: "/tools/market-map", label: "Market map", labelAr: "خريطة السوق", description: "Frame the landscape without noise.", descriptionAr: "أطر المشهد دون ضوضاء." }] },
    { label: "Track your signal", labelAr: "تتبع إشارتك", items: [{ href: "/assessment", label: "Founder assessment", labelAr: "تقييم المؤسس", description: "Name the work in front of you.", descriptionAr: "حدد العمل الذي أمامك." }, { href: "/knowledge", label: "Knowledge workspace", labelAr: "مساحة المعرفة", description: "Keep notes attached to the next action.", descriptionAr: "أبقِ الملاحظات مرتبطة بالخطوة التالية." }, { href: "/dashboard/saved", label: "Saved items", labelAr: "العناصر المحفوظة", description: "Return to ideas worth testing.", descriptionAr: "عد إلى الأفكار التي تستحق الاختبار." }, { href: "/dashboard/progress", label: "Progress", labelAr: "التقدم", description: "See what has moved since your last brief.", descriptionAr: "شاهد ما تحرك منذ آخر موجز لك." }] },
  ], feature: { label: "Start here", labelAr: "ابدأ هنا", title: "Build my founder brief", titleAr: "ابنِ موجز مؤسسي", href: "/assessment" } },
  { id: "membership", label: "Membership", href: "/pricing", eyebrow: "Free to start, subscribe for the full system", eyebrowAr: "مجاني للبدء، اشترك للنظام الكامل", description: "A free profile gets you into the directory. Subscribing unlocks the full video library and the SaaS AI Coach — and is the gate before enrolling in any cohort course.", descriptionAr: "الملف المجاني يدخلك الدليل. الاشتراك يفتح مكتبة الفيديو الكاملة ومرشد SaaS بالذكاء الاصطناعي، وهو الشرط قبل الالتحاق بأي دورة جماعية.", groups: [
    { label: "For founders", labelAr: "للمؤسسين", items: [{ href: "/pricing", label: "Membership plans", labelAr: "خطط العضوية", description: "Free, Member ($29/mo), and Growth ($99/mo), compared honestly.", descriptionAr: "مجاني، وعضو (٢٩ دولارا/شهر)، ونمو (٩٩ دولارا/شهر)، بمقارنة صادقة." }, { href: "/signup", label: "Join free", labelAr: "انضم مجانا", description: "3 minutes, no credit card.", descriptionAr: "٣ دقائق، بلا بطاقة ائتمان." }, { href: "/about", label: "Why ASaaSI", labelAr: "لماذا أساسي", description: "Understand the network’s operating idea.", descriptionAr: "افهم الفكرة التشغيلية للشبكة." }] },
    { label: "For organizations", labelAr: "للمؤسسات", items: [{ href: "/partners", label: "Partner with ASaaSI", labelAr: "كن شريكا لأساسي", description: "Build a founder program with context.", descriptionAr: "ابنِ برنامج مؤسسين له سياق واضح." }, { href: "/sponsors", label: "Sponsor an event", labelAr: "ارعَ فعالية", description: "Reach founders when the question is real.", descriptionAr: "صِل إلى المؤسسين حين يكون السؤال حقيقيا." }, { href: "/featured", label: "Featured placement", labelAr: "ظهور مميز", description: "Make relevance the reason to appear.", descriptionAr: "اجعل الملاءمة هي سبب الظهور." }] },
  ], feature: { label: "Start free today", labelAr: "ابدأ مجانا اليوم", title: "See what Members get", titleAr: "شاهد ما يحصل عليه الأعضاء", href: "/pricing" } },
];

function isRouteActive(location: string, href: string) {
  return location === href || (href !== "/" && location.startsWith(`${href}/`));
}

function menuHasActiveRoute(menu: NavMenu, location: string) {
  return isRouteActive(location, menu.href) || menu.groups.some((group) => group.items.some((item) => isRouteActive(location, item.href)));
}

export function SiteHeader() {
  const { t, isRTL } = useLocale();
  const { isAuthed } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const labels: Record<string, string> = {
    Connect: t("Connect", "تواصل"), Community: t("Community", "المجتمع"), Providers: t("Providers", "المزودون"), Learn: t("Learn", "تعلم"), Events: t("Events", "الفعاليات"), Tools: t("Tools", "الأدوات"), Membership: t("Membership", "العضوية"),
  };
  const clearCloseTimer = () => { if (closeTimerRef.current !== null) { window.clearTimeout(closeTimerRef.current); closeTimerRef.current = null; } };
  const scheduleMenuClose = () => { clearCloseTimer(); closeTimerRef.current = window.setTimeout(() => { setOpenMenu(null); closeTimerRef.current = null; }, 140); };
  const closeMenus = () => { clearCloseTimer(); setOpenMenu(null); setMobileOpen(false); setMobileSection(null); };
  const toggleMenu = (id: string) => setOpenMenu((current) => current === id ? null : id);

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); setMobileSection(null); }, [location]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenus(); };
    const onPointerDown = (event: PointerEvent) => { if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); clearCloseTimer(); };
  }, []);

  const renderMenu = (menu: NavMenu, mobile = false) => {
    const active = menuHasActiveRoute(menu, location);
    const isOpen = mobile ? mobileSection === menu.id : openMenu === menu.id;
    const label = labels[menu.label] ?? menu.label;
    if (mobile) return <div className={`mobile-nav-group ${isOpen ? "is-expanded" : ""}`} key={menu.id}>
      <button type="button" className={`mobile-nav-trigger ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined} aria-expanded={isOpen} aria-controls={`mobile-menu-${menu.id}`} onClick={() => setMobileSection((current) => current === menu.id ? null : menu.id)}><span>{label}</span><ChevronDown size={17} aria-hidden="true" /></button>
      <div id={`mobile-menu-${menu.id}`} className="mobile-submenu">{isOpen && <><Link href={menu.href} className="mobile-overview" onClick={closeMenus}>{t("View all", "عرض الكل")} {label} <DirectionalArrow isRTL={isRTL} size={14} /></Link>{menu.groups.map((group) => <div className="mobile-subgroup" key={group.label}><span>{t(group.label, group.labelAr)}</span>{group.items.map((item) => <Link href={item.href} key={item.href} aria-current={isRouteActive(location, item.href) ? "page" : undefined} onClick={closeMenus}>{t(item.label, item.labelAr)}</Link>)}</div>)}</>}</div>
    </div>;
    return <div key={menu.id} className={`nav-menu ${isOpen ? "is-open" : ""}`} onMouseEnter={() => { clearCloseTimer(); setOpenMenu(menu.id); }} onMouseLeave={scheduleMenuClose} onFocusCapture={() => { clearCloseTimer(); setOpenMenu(menu.id); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) scheduleMenuClose(); }}>
      <button type="button" className={`nav-menu-trigger ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined} aria-expanded={isOpen} aria-haspopup="true" aria-controls={`nav-menu-${menu.id}`} onClick={() => { clearCloseTimer(); toggleMenu(menu.id); }}>{label}<ChevronDown size={15} aria-hidden="true" /></button>
      <div id={`nav-menu-${menu.id}`} className="nav-mega-menu" role="menu" aria-hidden={!isOpen} onMouseEnter={clearCloseTimer} onMouseLeave={scheduleMenuClose}>
        <div className="nav-mega-intro"><span className="mono">{t(menu.eyebrow, menu.eyebrowAr)}</span><p>{t(menu.description, menu.descriptionAr)}</p><Link href={menu.href} className="nav-mega-overview" role="menuitem" onClick={closeMenus}>{t("View all", "عرض الكل")} {label} <DirectionalArrow isRTL={isRTL} size={14} /></Link></div>
        <div className="nav-mega-groups">{menu.groups.map((group) => <div className="nav-mega-group" key={group.label}><span className="nav-mega-group-label">{t(group.label, group.labelAr)}</span>{group.items.map((item) => <Link key={item.href} href={item.href} role="menuitem" aria-current={isRouteActive(location, item.href) ? "page" : undefined} onClick={closeMenus}><span><strong>{t(item.label, item.labelAr)}</strong>{item.badge && <em>{t(item.badge, item.badgeAr ?? item.badge)}</em>}</span><small>{t(item.description, item.descriptionAr)}</small></Link>)}</div>)}</div>
        <Link href={menu.feature.href} className="nav-mega-feature" role="menuitem" onClick={closeMenus}><span className="mono">{t(menu.feature.label, menu.feature.labelAr)}</span><strong>{t(menu.feature.title, menu.feature.titleAr)}</strong><DirectionalChevron isRTL={isRTL} size={17} /></Link>
      </div>
    </div>;
  };

  return <header className="site-header landing-site-header" ref={navRef}>
    <div className="network-strip"><div className="container"><span>{t("ASaaSI / The SaaS ecosystem for MENA", "أساسي / منظومة البرمجيات لمنطقة الشرق الأوسط وشمال أفريقيا")}</span><span className="network-strip-accent">{t("Free to join · 2026", "الانضمام مجاني · ٢٠٢٦")}</span></div></div>
    <div className="container"><div className="nav-row landing-header-row"><Logo /><nav className="nav-links landing-header-nav" aria-label={t("Primary", "التنقل الرئيسي")}>{navigationMenus.map((menu) => renderMenu(menu))}</nav><div className="nav-actions landing-header-actions">{isAuthed ? <><LanguageToggle compact /><Link href="/dashboard/notifications" className="icon-button" aria-label={t("Open notifications", "فتح الإشعارات")}><Bell size={17} /><span className="notification-dot" /></Link><Link href="/dashboard/profile" className="avatar-button" aria-label={t("Open profile", "فتح الملف الشخصي")}>SA</Link><Link href="/dashboard" className="button button-primary button-small">{t("Dashboard", "لوحتي")} <DirectionalArrow isRTL={isRTL} size={14} /></Link></> : <><LanguageToggle /><Link href="/signup" className="button button-primary button-small">{t("Join ASaaSI", "انضم إلى ASaaSI")} <DirectionalArrow isRTL={isRTL} size={14} /></Link></>}<button className="menu-button" type="button" aria-label={mobileOpen ? t("Close menu", "إغلاق القائمة") : t("Open menu", "فتح القائمة")} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { setMobileOpen((current) => !current); setOpenMenu(null); }}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button></div></div>
      <nav id="mobile-navigation" className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-label={t("Mobile navigation", "تنقل الجوال")} aria-hidden={!mobileOpen}>{navigationMenus.map((menu) => renderMenu(menu, true))}<div className="mobile-menu-footer">{isAuthed ? <><LanguageToggle compact /><Link href="/dashboard" className="button button-primary button-small" onClick={closeMenus}>{t("Dashboard", "لوحتي")} <DirectionalArrow isRTL={isRTL} size={14} /></Link></> : <><LanguageToggle compact /><Link href="/signup" className="button button-primary button-small" onClick={closeMenus}>{t("Join ASaaSI", "انضم إلى ASaaSI")} <DirectionalArrow isRTL={isRTL} size={14} /></Link></>}</div></nav>
    </div>
  </header>;
}

export function WorkspaceHeader() {
  const { t } = useLocale();
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  return <header className="site-header workspace-header landing-site-header">
    <div className="container nav-row landing-header-row">
      <Logo />
      <div className="nav-actions">
        <Link href="/pricing" className="nav-login">{t("Join ASaaSI", "انضم إلى ASaaSI")}</Link>
        <LanguageToggle compact />
        <Link href="/dashboard/notifications" className="icon-button" aria-label={t("Open notifications", "فتح الإشعارات")}><Bell size={17} /><span className="notification-dot" /></Link>
        <Link href="/dashboard/profile" className="avatar-button" aria-label={t("Open profile", "فتح الملف الشخصي")}>SA</Link>
        <button type="button" className="nav-login" onClick={() => { logout(); setLocation("/"); }}>{t("Log out", "تسجيل الخروج")}</button>
      </div>
    </div>
  </header>;
}

export function SiteFooter() {
  const { t, isRTL } = useLocale();
  return <footer className="site-footer landing-site-footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Logo inverted /><p>{t("The SaaS ecosystem for MENA, people, events, learning, and tools in one place. Free to join.", "منظومة البرمجيات لمنطقة الشرق الأوسط وشمال أفريقيا، الأشخاص والفعاليات والتعلم والأدوات في مكان واحد. الانضمام مجاني.")}</p><Link href="/signup" className="button button-primary button-small">{t("Find my next step", "اعثر على خطوتي التالية")} <DirectionalArrow isRTL={isRTL} size={14} /></Link></div><div className="footer-col"><h3>{t("Connect", "تواصل")}</h3><Link href="/connect">{t("Find people", "ابحث عن أشخاص")}</Link><Link href="/requests/browse">{t("Browse requests", "تصفح الطلبات")}</Link><Link href="/events">{t("Events", "الفعاليات")}</Link><Link href="/community">{t("Community", "المجتمع")}</Link></div><div className="footer-col"><h3>{t("Learn", "تعلم")}</h3><Link href="/learn">{t("Learning hub", "مركز التعلم")}</Link><Link href="/articles">{t("Articles", "المقالات")}</Link><Link href="/podcasts">{t("Podcasts", "البودكاست")}</Link><Link href="/tools">{t("Founder tools", "أدوات المؤسسين")}</Link></div><div className="footer-col"><h3>{t("For organizations", "للمنظمات")}</h3><Link href="/partners">{t("Partner with us", "تعاون معنا")}</Link><Link href="/sponsors">{t("Sponsor a program", "ارعى برنامجا")}</Link><Link href="/featured">{t("Featured placement", "عرض مميز")}</Link><Link href="/contact">{t("Contact", "تواصل")}</Link></div></div><div className="footer-bottom"><span>{t("© 2026 ASaaSI. Built for founders in the region.", "© ٢٠٢٦ أساسي. مبني للمؤسسين في المنطقة.")}</span><span><Link href="/privacy">{t("Privacy", "الخصوصية")}</Link> · <Link href="/terms">{t("Terms", "الشروط")}</Link> · <Link href="/accessibility">{t("Accessibility", "إتاحة الوصول")}</Link></span></div></div></footer>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const [location] = useLocation();
  const routeName = location.replace(/^\//, "").split("/")[0] || "home";
  // Account routes (login/signup) are full-bleed 100vh flows with their own embedded logo, // the site header pushes their form off-screen, so they stay header-free. Every other
  // authenticated app route now gets the same header as the public site, just without the footer.
  const accountRoute = /^\/(login|signup)/.test(location);
  const appRoute = /^\/(dashboard|knowledge|matching|organizations|requests\/(new|[^/]+)|tools\/[^/]+|admin)/.test(location);
  // The landing page ("/") ships its own self-contained header and footer (see Home.tsx +
  // flint-landing.css) in a different visual system, so it opts out of the shared chrome too.
  const landingRoute = location === "/";
  {/* app-product (see flint-workspace.css) is applied to every route so the whole app - not just
      the dashboard - picks up the landing's navy/gold Flint palette and Manrope headings; the
      landing route itself is unaffected since flint-landing.css uses literal colors, not these vars. */}
  return <div className={`app route-${routeName} app-product`}><a className="skip-link" href="#main-content">{t("Skip to main content", "انتقل إلى المحتوى الرئيسي")}</a>{(accountRoute || landingRoute) ? children : appRoute ? <><WorkspaceHeader />{children}</> : <><SiteHeader /><AnimatePresence mode="wait" initial={false}><motion.main id="main-content" key={location} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.main></AnimatePresence><SiteFooter /></>}</div>;
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => { const timer = window.setTimeout(onClose, 3400); return () => window.clearTimeout(timer); }, [message, onClose]);
  return <div className="toast" role="status">{message}</div>;
}

export function useToast() {
  const [message, setMessage] = useState("");
  return { message, showToast: setMessage, clearToast: () => setMessage("") };
}
