/* Editorial Operating System, Community is a real discussion surface: founders post questions, others react and comment.
   The list stays a plain feed (no inline react/comment controls); opening a post is where the real interaction, reacting,
   reading replies, and commenting, happens, and that view is gated behind sign-in like the rest of the workspace. */
import { useEffect, useMemo, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, ImagePlus, LockKeyhole, MessageCircle, Search, Send, ThumbsUp, X } from "lucide-react";
import { PageIntro, SectionLabel, SignalTag, Toast, useToast } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { useAuth } from "../contexts/AuthContext";
import { upsertWorkflowRecord } from "../lib/workflowRecords";
import { setWeeklyPrimaryBet } from "../lib/weeklyPrimaryBet";

const postTopics = ["All posts", "Pricing", "Growth", "Hiring", "Cofounder", "Enterprise"] as const;
const topicArabic: Record<(typeof postTopics)[number], string> = { "All posts": "كل المنشورات", Pricing: "التسعير", Growth: "النمو", Hiring: "التوظيف", Cofounder: "شريك مؤسس", Enterprise: "المؤسسات" };

export const posts = [
  { id: "mrr", topic: "Growth", author: "Karim Aboul-Fotouh", initials: "KA", tone: "yellow", title: "We just crossed $10K MRR, here’s what actually moved the needle.", body: "Wrote up the three changes that mattered. Curious what worked for others at this stage.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", reactions: 47, comments: 21, time: "2h ago", arTitle: "تجاوزنا للتو ١٠ آلاف دولار إيراد شهري متكرر، إليكم ما الذي أحدث الفرق فعلا.", arBody: "كتبت التغييرات الثلاثة التي كان لها أثر حقيقي. فضولي لمعرفة ما نجح مع الآخرين في هذه المرحلة.", arTime: "قبل ساعتين", seedComments: [{ author: "Mariam Al-Hadid", text: "The pricing change is the one I’d copy first. Did you test it with existing customers too?", arText: "تغيير التسعير هو أول ما سأنسخه. هل اختبرته مع العملاء الحاليين أيضا؟" }, { author: "Youssef Amin", text: "Congrats! What was the single biggest lever of the three?", arText: "مبروك! ما كان الأكبر أثرا من التغييرات الثلاثة؟" }] },
  { id: "enterprise", topic: "Enterprise", author: "Omar Nassar", initials: "ON", tone: "clay", title: "What’s actually working for first enterprise conversations in the Gulf right now?", body: "Five discovery calls in, every one turns into a custom quote. Looking for a pattern that repeats.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80", reactions: 31, comments: 14, time: "5h ago", arTitle: "ما الذي ينجح فعلا في أولى محادثات المؤسسات في الخليج الآن؟", arBody: "خمس مكالمات اكتشاف حتى الآن، وكل واحدة تتحول إلى عرض سعر مخصص. أبحث عن نمط يتكرر.", arTime: "قبل ٥ ساعات", seedComments: [{ author: "Lina Haddad", text: "Standardize the custom quote into three fixed tiers, it stopped every deal from being bespoke for us.", arText: "حول عرض السعر المخصص إلى ثلاث فئات ثابتة، أوقف ذلك تخصيص كل صفقة عندنا." }] },
  { id: "pricing", topic: "Pricing", author: "Mariam Al-Hadid", initials: "MA", tone: "mint", title: "How do I package an early B2B offer without scaring off small buyers?", body: "Torn between one simple price and a tiered structure. What did you ship first?", image: "", reactions: 24, comments: 9, time: "1d ago", arTitle: "كيف أُغلف عرضا مبكرا لشركات B2B دون تخويف المشترين الصغار؟", arBody: "متردد بين سعر واحد بسيط وهيكل متدرج. ما الذي أطلقتموه أولا؟", arTime: "قبل يوم", seedComments: [{ author: "Karim Aboul-Fotouh", text: "One simple price first. Add tiers once you have enough conversations to know where the line actually sits.", arText: "سعر واحد بسيط أولا. أضف الفئات بعد أن تجمع محادثات كافية لمعرفة أين يقع الخط فعلا." }] },
  { id: "cofounder", topic: "Cofounder", author: "Lina Haddad", initials: "LH", tone: "mint", title: "Looking for a technical cofounder in fintech, how did you vet yours?", body: "Past the pitch-deck stage now. What actually told you it would work long-term?", image: "", reactions: 18, comments: 12, time: "1d ago", arTitle: "أبحث عن شريك مؤسس تقني في التقنية المالية، كيف قيمتم شريككم؟", arBody: "تجاوزنا مرحلة العرض التقديمي. ما الذي أخبركم فعلا أن الأمر سينجح على المدى الطويل؟", arTime: "قبل يوم", seedComments: [] },
  { id: "hiring", topic: "Hiring", author: "Youssef Amin", initials: "YA", tone: "yellow", title: "Anyone hiring their first salesperson in MENA? What worked?", body: "Trying to decide between a generalist operator and a dedicated closer this early.", image: "", reactions: 15, comments: 7, time: "2d ago", arTitle: "هل وظف أحد أول موظف مبيعات في المنطقة؟ ما الذي نجح؟", arBody: "أحاول أن أقرر بين مشغل عام ومندوب مبيعات متخصص في هذه المرحلة المبكرة.", arTime: "قبل يومين", seedComments: [] }
];

/* User-created posts are stored outside React state (module-scoped store, subscribed via
   useSyncExternalStore) so both the feed (Community) and a post's own page (CommunityPost,
   a separate route/mount) see the same list instead of the post vanishing on navigation. */
let newPostsStore: typeof posts = [];
const newPostsListeners = new Set<() => void>();
function addNewPost(post: (typeof posts)[number]) { newPostsStore = [post, ...newPostsStore]; newPostsListeners.forEach((listener) => listener()); }
function subscribeNewPosts(listener: () => void) { newPostsListeners.add(listener); return () => newPostsListeners.delete(listener); }
function useNewPosts() { return useSyncExternalStore(subscribeNewPosts, () => newPostsStore); }

function ThreadRouteState({ title, copy, unavailable = false }: { title: string; copy: string; unavailable?: boolean }) {
  const { t, formatNum, isRTL } = useLocale();
  const note = <div className="community-hero-thread-stack thread-route-state__map"><span className="mono">{t("THREAD / ROUTE / ANSWER", "الموضوع / المسار / الإجابة")}</span><ol><li className="is-active"><i>{formatNum("01")}</i><div><strong>{unavailable ? t("Route", "المسار") : t("Thread", "الموضوع")}</strong><small>{unavailable ? t("find an active question", "اعثر على سؤال نشط") : t("read the context first", "اقرأ السياق أولا")}</small></div></li><li><i>{formatNum("02")}</i><div><strong>{t("Reply", "رد")}</strong><small>{t("add useful context", "أضف سياقا مفيدا")}</small></div></li><li><i>{formatNum("03")}</i><div><strong>{t("Answer", "إجابة")}</strong><small>{t("carry one next move", "احمل خطوة تالية واحدة")}</small></div></li></ol><dl className="thread-route-state__evidence"><div><dt>{t("Thread context", "سياق الموضوع")}</dt><dd>{title}</dd></div><div><dt>{t("Return", "العودة")}</dt><dd>{t("Sign in to keep the useful answer beside the next move it should shape.", "سجل الدخول لإبقاء الإجابة المفيدة بجانب الخطوة التالية التي ينبغي أن تشكلها.")}</dd></div></dl></div>;
  return <><section className="community-thread-access"><div className="container"><div className="community-thread-access__layout"><div className="community-thread-access__copy"><SectionLabel>{t("Community / Thread access", "المجتمع / وصول الموضوع")}</SectionLabel><h1>{title}</h1><p>{copy}</p><Link href={unavailable ? "/community#ask" : "/login?continue=/dashboard/discussions"} className="button button-dark">{unavailable ? t("Write a focused question", "اكتب سؤالا مركزا") : t("Sign in to open the thread", "سجل الدخول لفتح الموضوع")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></div>{note}</div></div></section><section className="section"><div className="container"><div className="thread-route-state"><div><SectionLabel>{unavailable ? t("Thread routing desk", "مكتب توجيه المواضيع") : t("Member thread access", "وصول عضو للموضوع")}</SectionLabel><h2>{unavailable ? t("The useful question is still in the room.", "السؤال المفيد ما زال في الغرفة.") : t("Keep the context connected to the reply.", "أبقِ السياق متصلا بالرد.")}</h2><p>{unavailable ? t("Choose a live founder question, then add the experience that moves it forward.", "اختر سؤالا حيا لمؤسس، ثم أضف الخبرة التي تدفعه للأمام.") : t("Your member profile keeps the people, replies, and decisions around this conversation in one place.", "يحفظ ملف عضويتك الأشخاص والردود والقرارات حول هذه المحادثة في مكان واحد.")}</p></div><ol><li><span>{formatNum("01")}</span><Link href="/community">{t("Browse active questions", "تصفح الأسئلة النشطة")} <ArrowRight size={14} /></Link></li><li><span>{formatNum("02")}</span><Link href={unavailable ? "/community#ask" : "/login?continue=/dashboard/discussions"}>{unavailable ? t("Write a focused question", "اكتب سؤالا مركزا") : t("Sign in to open the thread", "سجل الدخول لفتح الموضوع")} <ArrowRight size={14} /></Link></li></ol></div></div></section></>;
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => { const id = window.location.hash.replace("#", ""); if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

export default function Community() {
  const { t, formatNum, isRTL } = useLocale();
  const { isAuthed } = useAuth();
  const { message, showToast, clearToast } = useToast();
  useHashScroll();
  const [topic, setTopic] = useState<(typeof postTopics)[number]>("All posts");
  const [query, setQuery] = useState("");
  const newPosts = useNewPosts();
  const [askTopic, setAskTopic] = useState<(typeof postTopics)[number]>("Growth");
  const [askText, setAskText] = useState("");
  const [askImage, setAskImage] = useState("");
  const allPosts = [...newPosts, ...posts];

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { showToast(t("Please choose an image file.", "الرجاء اختيار ملف صورة.")); return; }
    if (file.size > 5 * 1024 * 1024) { showToast(t("Image must be under 5MB.", "يجب أن تكون الصورة أقل من ٥ ميغابايت.")); return; }
    const reader = new FileReader();
    reader.onload = () => setAskImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const PAGE_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filteredPosts = useMemo(() => allPosts.filter((post) => (topic === "All posts" || post.topic === topic) && `${post.title} ${post.author}`.toLowerCase().includes(query.toLowerCase())), [allPosts, topic, query]);
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [topic, query]);
  const displayPosts = filteredPosts.slice(0, visibleCount).map((post) => ({ ...post, title: t(post.title, post.arTitle), body: t(post.body, post.arBody), time: t(post.time, post.arTime), topicLabel: t(post.topic, topicArabic[post.topic as (typeof postTopics)[number]]) }));
  const popular = [...allPosts].sort((a, b) => b.reactions - a.reactions).slice(0, 3);

  const submitQuestion = (event: FormEvent) => {
    event.preventDefault();
    if (!isAuthed) { showToast(t("Sign in to post a question.", "سجل الدخول لنشر سؤال.")); return; }
    if (!askText.trim()) return;
    const id = `q-${Date.now()}`;
    addNewPost({ id, topic: askTopic, author: t("You", "أنت"), initials: "YO", tone: "yellow", title: askText.trim(), body: askText.trim(), image: askImage, reactions: 0, comments: 0, time: t("Just now", "الآن"), arTitle: askText.trim(), arBody: askText.trim(), arTime: t("Just now", "الآن"), seedComments: [] });
    setAskText("");
    setAskImage("");
    showToast(t("Your question is live.", "سؤالك منشور الآن."));
  };

  return <>
    <PageIntro label={t("Community", "المجتمع")} title={t("Ask the question you actually need answered.", "اطرح السؤال الذي تحتاج إجابته فعلا.")} copy={t("Real questions from founders building right now, with real replies, not just likes.", "أسئلة حقيقية من مؤسسين يبنون الآن، بردود حقيقية، لا مجرد إعجابات.")} note={<div className="hero-aside-note"><span className="mono">{t("RIGHT NOW", "الآن")}</span><strong>{t(`${allPosts.length} open questions, ${allPosts.filter((post) => post.comments === 0).length} still waiting on a first reply`, `${formatNum(allPosts.length)} سؤال مفتوح، ${formatNum(allPosts.filter((post) => post.comments === 0).length)} ينتظر أول رد`)}</strong><p>{t("Founders here reply with what actually worked for them, not general advice.", "يرد المؤسسون هنا بما نجح معهم فعلا، لا بنصائح عامة.")}</p><a href="#ask" className="button button-primary button-small">{t("Ask a question", "اطرح سؤالا")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</a></div>} />
    <section className="section section-network-map connection-section"><div className="container"><div className="connection-route__intro"><div><SectionLabel>{t("How it works", "كيف يعمل")}</SectionLabel><h2>{t("Post it, and the network replies.", "انشره، وسترد الشبكة.")}</h2></div><p>{t("Ask a focused question, open a thread to see the full discussion, then comment with what you know.", "اطرح سؤالا مركزا، افتح موضوعا لرؤية النقاش كاملا، ثم علق بما تعرفه.")}</p></div><ol className="connection-route" aria-label={t("How community posts work", "كيف تعمل منشورات المجتمع")}><li className="connection-route__step is-active"><div className="connection-route__index">{formatNum("01")}</div><span className="connection-route__meta">{t("START WITH / THE QUESTION", "ابدأ بـ / السؤال")}</span><h3>{t("Post", "انشر")}</h3><p>{t("Ask a focused question or share a result.", "اطرح سؤالا أو شارك نتيجة.")}</p><span className="connection-route__arrow" aria-hidden="true">↗</span></li><li className="connection-route__step"><div className="connection-route__index">{formatNum("02")}</div><span className="connection-route__meta">{t("OPEN / THE THREAD", "افتح / الموضوع")}</span><h3>{t("Open", "افتح")}</h3><p>{t("See the full discussion and who replied.", "شاهد النقاش كاملا ومن رد.")}</p><span className="connection-route__arrow" aria-hidden="true">↗</span></li><li className="connection-route__step"><div className="connection-route__index">{formatNum("03")}</div><span className="connection-route__meta">{t("LEAVE WITH / AN ANSWER", "غادر بـ / إجابة")}</span><h3>{t("Comment", "علق")}</h3><p>{t("Replies turn into a real answer.", "تتحول الردود إلى إجابة حقيقية.")}</p></li></ol><div className="connection-route__footer"><div><span className="mono">{t("THE RULE OF A GOOD POST", "قاعدة المنشور الجيد")}</span><p>{t("Specific beats broad. One real question gets a real answer.", "التحديد يتفوق على العموم. سؤال حقيقي واحد يحصل على إجابة حقيقية.")}</p></div><a href="#ask" className="button button-dark button-small">{t("Ask a question", "اطرح سؤالا")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</a></div></div></section>

    <section className="section section-clay" id="ask"><div className="container"><div className="section-header"><div><SectionLabel>{t("Have something to ask?", "لديك ما تسأل عنه؟")}</SectionLabel><h2>{t("Post it. This network answers.", "انشره. هذه الشبكة تجيب.")}</h2></div></div>{isAuthed ? <form className="coach-composer" onSubmit={submitQuestion}><select value={askTopic} onChange={(event) => setAskTopic(event.target.value as (typeof postTopics)[number])} aria-label={t("Topic", "الموضوع")}>{postTopics.filter((topicOption) => topicOption !== "All posts").map((topicOption) => <option key={topicOption} value={topicOption}>{t(topicOption, topicArabic[topicOption])}</option>)}</select><textarea value={askText} onChange={(event) => setAskText(event.target.value)} placeholder={t("What do you actually need to know?", "ما الذي تحتاج معرفته فعلا؟")} aria-label={t("Your question", "سؤالك")} /><div className="composer-attach-row"><label className="composer-attach"><ImagePlus size={15} /> {t("Add photo", "أضف صورة")}<input type="file" accept="image/*" onChange={handleImageSelect} /></label>{askImage && <div className="composer-image-preview"><img src={askImage} alt="" /><button type="button" onClick={() => setAskImage("")} aria-label={t("Remove image", "إزالة الصورة")}><X size={13} /></button></div>}</div><div><span className="mono">{t("Visible to the whole network", "مرئي للشبكة كاملة")}</span><button className="button button-dark" type="submit"><Send size={14} /> {t("Post question", "انشر السؤال")}</button></div></form> : <div className="empty-state"><h2>{t("Sign in to post.", "سجل الدخول للنشر.")}</h2><p>{t("Create a free account to ask the network a question.", "أنشئ حسابا مجانيا لطرح سؤال على الشبكة.")}</p><Link href="/login" className="button button-dark">{t("Sign in", "تسجيل الدخول")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></div>}</div></section>

    <section className="section" id="popular"><div className="container"><div className="section-header"><div><SectionLabel>{t("Popular this week", "الأكثر تفاعلا هذا الأسبوع")}</SectionLabel><h2>{t("The threads getting the most replies.", "المواضيع التي تحصل على أكثر الردود.")}</h2></div></div><ol className="popular-week-list">{popular.map((post, index) => <li key={post.id}><Link href={`/community/${post.id}`}><span className="popular-week-rank">{formatNum(index + 1)}</span><div><strong>{t(post.title, post.arTitle)}</strong><span>{post.author}{post.seedComments.length > 0 && <> · <SignalTag tone="soft"><Check size={12} /> {t("Answered", "تمت الإجابة")}</SignalTag></>}</span></div><div className="popular-week-stats"><span><ThumbsUp size={13} /> {formatNum(post.reactions)}</span><span><MessageCircle size={13} /> {formatNum(post.comments)}</span></div></Link></li>)}</ol></div></section>

    <section className="section"><div className="container content-layout"><aside className="filter-rail"><h3>{t("Filter by topic", "تصفية حسب الموضوع")}</h3><div className="filter-group"><div className="filter-options">{postTopics.map((option) => <label className="filter-option" key={option}><span><input type="radio" name="community-topic" checked={topic === option} onChange={() => setTopic(option)} /> {t(option, topicArabic[option])}</span><span className="filter-count">{formatNum(option === "All posts" ? allPosts.length : allPosts.filter((post) => post.topic === option).length)}</span></label>)}</div></div></aside><div><div className="results-head"><div><SectionLabel>{t("Browse posts", "تصفح المنشورات")}</SectionLabel><h2>{formatNum(filteredPosts.length)} {t(filteredPosts.length === 1 ? "post" : "posts", filteredPosts.length === 1 ? "منشور" : "منشورات")}</h2><p>{t("Every post has a real question and a founder waiting on a useful answer.", "كل منشور فيه سؤال حقيقي ومؤسس ينتظر إجابة مفيدة.")}</p></div><label style={{ position: "relative" }}><Search size={16} style={{ position: "absolute", left: 15, top: 13, color: "var(--muted)" }} /><input className="search-input" style={{ paddingLeft: 40 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search by title or author", "ابحث بالعنوان أو الكاتب")} /></label></div><div className="post-list">{displayPosts.map((post) => <Link href={`/community/${post.id}`} className="post-card" key={post.id}>
        <div className={`avatar avatar-${post.tone}`} aria-hidden="true">{post.initials}</div>
        <div className="post-card-main">
          <div className="post-card-meta"><strong>{post.author}</strong><span className="mono">{post.topicLabel}</span><span>{post.time}</span></div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.image && <img className="post-card-image" src={post.image} alt="" loading="lazy" />}
          <div className="post-card-actions post-card-stats"><span aria-label={t(`${post.reactions} reactions`, `${post.reactions} تفاعلات`)}><ThumbsUp size={14} aria-hidden="true" /> {formatNum(post.reactions)}</span><span aria-label={t(`${post.comments} comments`, `${post.comments} تعليقات`)}><MessageCircle size={14} aria-hidden="true" /> {formatNum(post.comments)}</span></div>
        </div>
      </Link>)}{!displayPosts.length && <div className="empty-state"><h2>{t("No posts match yet.", "لا توجد منشورات مطابقة بعد.")}</h2><p>{t("Try a different topic or search term.", "جرب موضوعا أو كلمة بحث مختلفة.")}</p></div>}</div>{filteredPosts.length > visibleCount && <div className="load-more-row"><button type="button" className="button button-ghost" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>{t(`Load more (${filteredPosts.length - visibleCount} left)`, `تحميل المزيد (${formatNum(filteredPosts.length - visibleCount)} متبق)`)} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</button></div>}</div></div></section>
    {message && <Toast message={message} onClose={clearToast} />}
  </>;
}

export function CommunityPost() {
  const { t, formatNum, isRTL } = useLocale();
  const { isAuthed } = useAuth();
  const { message, showToast, clearToast } = useToast();
  const params = useParams<{ id: string }>();
  const newPosts = useNewPosts();
  const post = [...newPosts, ...posts].find((item) => item.id === params.id);
  const [reacted, setReacted] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(() => post?.seedComments ?? []);
  const [nextMove, setNextMove] = useState("");
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [weeklyCommitment, setWeeklyCommitment] = useState(false);

  if (!post) return <ThreadRouteState unavailable title={t("This thread is no longer active.", "هذا الموضوع لم يعد نشطا.")} copy={t("The network can still route you to a live founder question with room for a useful answer.", "لا تزال الشبكة قادرة على توجيهك إلى سؤال حي لمؤسس يتسع لإجابة مفيدة.")} />;

  const title = t(post.title, post.arTitle);
  const topicLabel = t(post.topic, topicArabic[post.topic as (typeof postTopics)[number]]);

  if (!isAuthed) return <ThreadRouteState title={t("Sign in to read this thread.", "سجل الدخول لقراءة هذا الموضوع.")} copy={t(`"${title}" and its comments are visible once you’re signed in.`, `"${title}" وتعليقاته مرئية بمجرد تسجيل الدخول.`)} />;

  const submitComment = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    setComments((current) => [...current, { author: t("You", "أنت"), text: comment.trim(), arText: comment.trim() }]);
    setComment("");
  };
  const saveNextMove = (event: FormEvent) => {
    event.preventDefault();
    const action = nextMove.trim();
    if (!action) return;
    const reviewDue = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
    const evidence = t(`Community thread: ${title}. My next move: ${action}`, `موضوع المجتمع: ${title}. خطوتي التالية: ${action}`);
    upsertWorkflowRecord({ id: `community-learning-${post.id}`, kind: "decision", title: `Community learning: ${post.title}`, titleAr: `تعلم من المجتمع: ${post.arTitle}`, href: `/community/${post.id}`, status: "saved", owner: "Founder", ownerAr: "المؤسس", nextAction: action, nextActionAr: action, reviewDate: t(`Review the thread learning by ${reviewDue}`, `راجع تعلم الموضوع بحلول ${reviewDue}`), reviewDateAr: `راجع تعلم الموضوع بحلول ${reviewDue}`, reviewDue, evidence });
    setCaptured(true);
    setWeeklyCommitment(false);
    setCaptureOpen(false);
    showToast(t("Your next move is now waiting in Decision Review.", "خطوتك التالية تنتظرك الآن في مراجعة القرار."));
  };
  const makeWeeklyCommitment = () => {
    setWeeklyPrimaryBet(`community-learning-${post.id}`);
    setWeeklyCommitment(true);
    showToast(t("Your community next move is now this week's primary bet.", "أصبحت خطوتك من المجتمع رهان هذا الأسبوع الرئيسي."));
  };

  const reactionCount = post.reactions + (reacted ? 1 : 0);

  return <>
    <section className="section" style={{ paddingBottom: 0 }}><div className="container" style={{ maxWidth: "42rem" }}>
      <Link href="/community" className="text-link" style={{ marginBottom: 18 }}>{t("← Back to all posts", "→ العودة إلى كل المنشورات")}</Link>
    </div></section>
    <section className="section"><div className="container">
      <article className="post-detail-card">
        <div className="post-detail-head"><div className={`avatar avatar-${post.tone}`} aria-hidden="true">{post.initials}</div><div className="post-detail-head-meta"><strong>{post.author}</strong><span><span className="mono">{topicLabel}</span> · {t(post.time, post.arTime)}</span></div></div>
        <h1 className="post-detail-title">{title}</h1>
        <p className="post-detail-body">{t(post.body, post.arBody)}</p>
        {post.image && <img className="post-detail-image" src={post.image} alt="" />}
        <div className="post-detail-stats"><span><ThumbsUp size={13} /> {formatNum(reactionCount)}</span><span>{t(`${comments.length} comments`, `${formatNum(comments.length)} تعليقات`)}</span></div>
        <div className="post-detail-actionbar">
          <button type="button" className={reacted ? "is-active" : ""} aria-pressed={reacted} onClick={() => { setReacted((current) => !current); if (!reacted) showToast(t(`You reacted to ${post.author}’s post.`, `تفاعلت مع منشور ${post.author}.`)); }}><ThumbsUp size={16} /> {reacted ? t("Reacted", "تم التفاعل") : t("Like", "إعجاب")}</button>
          <button type="button" onClick={() => document.getElementById("comment-input")?.focus()}><MessageCircle size={16} /> {t("Comment", "علق")}</button>
          <button type="button" className={captured ? "is-active" : ""} onClick={() => setCaptureOpen((current) => !current)}><Check size={16} /> {captured ? t("Next move captured", "تم حفظ الخطوة التالية") : t("Capture next move", "احفظ الخطوة التالية")}</button>
        </div>
        {captureOpen && <form className="community-next-move" onSubmit={saveNextMove}><div><SectionLabel>{t("Thread learning", "تعلم من الموضوع")}</SectionLabel><h2>{t("What will you test or change because of this thread?", "ماذا ستختبر أو تغيّر بسبب هذا الموضوع؟")}</h2><p>{t("Keep the move specific. ASaaSI will save it beside the thread context and bring it back for review in seven days.", "أبقِ الخطوة محددة. سيحفظها أساسي بجانب سياق الموضوع ويعيدها للمراجعة بعد سبعة أيام.")}</p></div><label>{t("Your next move", "خطوتك التالية")}<textarea value={nextMove} onChange={(event) => setNextMove(event.target.value)} placeholder={t("For example: test the simple offer with three existing buyers.", "مثلا: اختبر العرض البسيط مع ثلاثة مشترين حاليين.")} required /></label><div><button className="button button-dark" type="submit"><Check size={14} /> {t("Save to Decision Review", "احفظ في مراجعة القرار")}</button><button className="text-link" type="button" onClick={() => setCaptureOpen(false)}>{t("Cancel", "إلغاء")}</button></div></form>}
        {captured && <section className="community-next-move-return" aria-live="polite"><div><SectionLabel>{t("Founder commitment", "التزام المؤسس")}</SectionLabel><h2>{t("Keep this thread close to the week.", "أبقِ هذا الموضوع قريبا من الأسبوع.")}</h2><p>{t("Your next move now carries the thread context and a seven-day review. Make it the primary bet only if it deserves the week’s focus.", "تحمل خطوتك الآن سياق الموضوع ومراجعة بعد سبعة أيام. اجعلها الرهان الرئيسي فقط إذا كانت تستحق تركيز الأسبوع.")}</p></div><div>{weeklyCommitment ? <><span className="inline-success"><Check size={14} /> {t("This is this week's primary bet", "هذا هو رهان هذا الأسبوع الرئيسي")}</span><Link href="/dashboard/weekly-review" className="button button-light">{t("Open weekly review", "افتح المراجعة الأسبوعية")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></> : <><button type="button" className="button button-dark" onClick={makeWeeklyCommitment}><Check size={14} /> {t("Make this week's primary bet", "اجعله رهان هذا الأسبوع الرئيسي")}</button><Link href="/dashboard/decision-review" className="text-link">{t("Review first", "راجع أولا")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</Link></>}</div></section>}
        <div className="post-detail-comments">{comments.map((item, index) => <div className="comment-row" key={index}><div className="avatar avatar-clay avatar-sm" aria-hidden="true">{item.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div className="comment-bubble"><strong>{item.author}</strong><p>{t(item.text, item.arText)}</p></div></div>)}{!comments.length && <p style={{ color: "var(--muted)", fontSize: ".85rem" }}>{t("No comments yet, be the first to reply.", "لا توجد تعليقات بعد، كن أول من يرد.")}</p>}</div>
        <form className="post-detail-composer" onSubmit={submitComment}><div className="avatar avatar-yellow avatar-sm" aria-hidden="true">SA</div><input id="comment-input" value={comment} onChange={(event) => setComment(event.target.value)} placeholder={t("Write a comment...", "اكتب تعليقا...")} aria-label={t("Add a comment", "أضف تعليقا")} /><button type="submit" aria-label={t("Post comment", "انشر التعليق")}><Send size={15} /></button></form>
      </article>
    </div></section>
    {message && <Toast message={message} onClose={clearToast} />}
  </>;
}
