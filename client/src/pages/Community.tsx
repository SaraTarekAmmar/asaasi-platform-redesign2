/* Editorial Operating System, Community is a real discussion surface: founders post questions, others react and comment.
   The list stays a plain feed (no inline react/comment controls); opening a post is where the real interaction, reacting,
   reading replies, and commenting, happens, and that view is gated behind sign-in like the rest of the workspace. */
import { useEffect, useMemo, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, ImagePlus, LockKeyhole, MessageCircle, Search, Send, ThumbsUp, X } from "lucide-react";
import { PageIntro, SectionLabel, SignalTag, Toast, useToast } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import { useAuth } from "../contexts/AuthContext";

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

function SignInGate({ title, copy }: { title: string; copy: string }) {
  const { t, isRTL } = useLocale();
  return <section className="section"><div className="container"><div className="empty-state" style={{ margin: "0 auto", maxWidth: 460 }}><LockKeyhole size={20} /><h2>{title}</h2><p>{copy}</p><Link href="/login" className="button button-dark">{t("Sign in to continue", "سجل الدخول للمتابعة")} {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link></div></div></section>;
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
  const answered = allPosts.filter((post) => post.seedComments.length > 0).slice(0, 4);

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
    <PageIntro label={t("Community", "المجتمع")} title={t("Ask the question you actually need answered.", "اطرح السؤال الذي تحتاج إجابته فعلا.")} copy={t("Real questions from founders building right now, with real replies, not just likes.", "أسئلة حقيقية من مؤسسين يبنون الآن، بردود حقيقية، لا مجرد إعجابات.")} />
    <section className="section section-network-map connection-section"><div className="container"><div className="connection-route__intro"><div><SectionLabel>{t("How it works", "كيف يعمل")}</SectionLabel><h2>{t("Post it, and the network replies.", "انشره، وسترد الشبكة.")}</h2></div><p>{t("Ask a focused question, open a thread to see the full discussion, then comment with what you know.", "اطرح سؤالا مركزا، افتح موضوعا لرؤية النقاش كاملا، ثم علق بما تعرفه.")}</p></div><ol className="connection-route" aria-label={t("How community posts work", "كيف تعمل منشورات المجتمع")}><li className="connection-route__step is-active"><div className="connection-route__index">{formatNum("01")}</div><span className="connection-route__meta">{t("START WITH / THE QUESTION", "ابدأ بـ / السؤال")}</span><h3>{t("Post", "انشر")}</h3><p>{t("Ask a focused question or share a result.", "اطرح سؤالا أو شارك نتيجة.")}</p><span className="connection-route__arrow" aria-hidden="true">↗</span></li><li className="connection-route__step"><div className="connection-route__index">{formatNum("02")}</div><span className="connection-route__meta">{t("OPEN / THE THREAD", "افتح / الموضوع")}</span><h3>{t("Open", "افتح")}</h3><p>{t("See the full discussion and who replied.", "شاهد النقاش كاملا ومن رد.")}</p><span className="connection-route__arrow" aria-hidden="true">↗</span></li><li className="connection-route__step"><div className="connection-route__index">{formatNum("03")}</div><span className="connection-route__meta">{t("LEAVE WITH / AN ANSWER", "غادر بـ / إجابة")}</span><h3>{t("Comment", "علق")}</h3><p>{t("Replies turn into a real answer.", "تتحول الردود إلى إجابة حقيقية.")}</p></li></ol><div className="connection-route__footer"><div><span className="mono">{t("THE RULE OF A GOOD POST", "قاعدة المنشور الجيد")}</span><p>{t("Specific beats broad. One real question gets a real answer.", "التحديد يتفوق على العموم. سؤال حقيقي واحد يحصل على إجابة حقيقية.")}</p></div><a href="#ask" className="button button-dark button-small">{t("Ask a question", "اطرح سؤالا")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</a></div></div></section>

    <section className="section section-clay" id="ask"><div className="container"><div className="section-header"><div><SectionLabel>{t("Have something to ask?", "لديك ما تسأل عنه؟")}</SectionLabel><h2>{t("Post it. This network answers.", "انشره. هذه الشبكة تجيب.")}</h2></div></div>{isAuthed ? <form className="coach-composer" onSubmit={submitQuestion}><select value={askTopic} onChange={(event) => setAskTopic(event.target.value as (typeof postTopics)[number])} aria-label={t("Topic", "الموضوع")}>{postTopics.filter((topicOption) => topicOption !== "All posts").map((topicOption) => <option key={topicOption} value={topicOption}>{t(topicOption, topicArabic[topicOption])}</option>)}</select><textarea value={askText} onChange={(event) => setAskText(event.target.value)} placeholder={t("What do you actually need to know?", "ما الذي تحتاج معرفته فعلا؟")} aria-label={t("Your question", "سؤالك")} /><div className="composer-attach-row"><label className="composer-attach"><ImagePlus size={15} /> {t("Add photo", "أضف صورة")}<input type="file" accept="image/*" onChange={handleImageSelect} /></label>{askImage && <div className="composer-image-preview"><img src={askImage} alt="" /><button type="button" onClick={() => setAskImage("")} aria-label={t("Remove image", "إزالة الصورة")}><X size={13} /></button></div>}</div><div><span className="mono">{t("Visible to the whole network", "مرئي للشبكة كاملة")}</span><button className="button button-dark" type="submit"><Send size={14} /> {t("Post question", "انشر السؤال")}</button></div></form> : <div className="empty-state"><h2>{t("Sign in to post.", "سجل الدخول للنشر.")}</h2><p>{t("Create a free account to ask the network a question.", "أنشئ حسابا مجانيا لطرح سؤال على الشبكة.")}</p><Link href="/login" className="button button-dark">{t("Sign in", "تسجيل الدخول")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link></div>}</div></section>

    <section className="section" id="popular"><div className="container"><div className="section-header"><div><SectionLabel>{t("Popular this week", "الأكثر تفاعلا هذا الأسبوع")}</SectionLabel><h2>{t("The threads getting the most replies.", "المواضيع التي تحصل على أكثر الردود.")}</h2></div></div><ol className="popular-week-list">{popular.map((post, index) => <li key={post.id}><Link href={`/community/${post.id}`}><span className="popular-week-rank">{formatNum(index + 1)}</span><div><strong>{t(post.title, post.arTitle)}</strong><span>{post.author}</span></div><div className="popular-week-stats"><span><ThumbsUp size={13} /> {formatNum(post.reactions)}</span><span><MessageCircle size={13} /> {formatNum(post.comments)}</span></div></Link></li>)}</ol></div></section>

    <section className="section" id="answered"><div className="container"><div className="section-header"><div><SectionLabel>{t("Answered questions", "أسئلة تمت الإجابة عنها")}</SectionLabel><h2>{t("See how founders solved it.", "شاهد كيف حلها مؤسسون آخرون.")}</h2></div></div>{answered.length ? <div className="answered-list">{answered.map((post) => <Link href={`/community/${post.id}`} key={post.id} className="answered-row"><SignalTag tone="soft"><Check size={12} /> {t("Answered", "تمت الإجابة")}</SignalTag><strong>{t(post.title, post.arTitle)}</strong><span>{t(`${post.seedComments.length} replies`, `${formatNum(post.seedComments.length)} ردود`)}</span></Link>)}</div> : <p style={{ color: "var(--muted)" }}>{t("No answered threads yet.", "لا توجد مواضيع تمت الإجابة عنها بعد.")}</p>}</div></section>

    <section className="section"><div className="container content-layout"><aside className="filter-rail"><h3>{t("Filter by topic", "تصفية حسب الموضوع")}</h3><div className="filter-group"><div className="filter-options">{postTopics.map((option) => <label className="filter-option" key={option}><span><input type="checkbox" checked={topic === option} onChange={() => setTopic(option)} /> {t(option, topicArabic[option])}</span><span className="filter-count">{formatNum(option === "All posts" ? allPosts.length : allPosts.filter((post) => post.topic === option).length)}</span></label>)}</div></div></aside><div><div className="results-head"><div><SectionLabel>{t("Browse posts", "تصفح المنشورات")}</SectionLabel><h2>{formatNum(filteredPosts.length)} {t(filteredPosts.length === 1 ? "post" : "posts", filteredPosts.length === 1 ? "منشور" : "منشورات")}</h2><p>{t("Every post has a real question and a founder waiting on a useful answer.", "كل منشور فيه سؤال حقيقي ومؤسس ينتظر إجابة مفيدة.")}</p></div><label style={{ position: "relative" }}><Search size={16} style={{ position: "absolute", left: 15, top: 13, color: "var(--muted)" }} /><input className="search-input" style={{ paddingLeft: 40 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search by title or author", "ابحث بالعنوان أو الكاتب")} /></label></div><div className="post-list">{displayPosts.map((post) => <Link href={`/community/${post.id}`} className="post-card" key={post.id}>
        <div className={`avatar avatar-${post.tone}`} aria-hidden="true">{post.initials}</div>
        <div className="post-card-main">
          <div className="post-card-meta"><strong>{post.author}</strong><span className="mono">{post.topicLabel}</span><span>{post.time}</span></div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.image && <img className="post-card-image" src={post.image} alt="" loading="lazy" />}
          <div className="post-card-actions post-card-stats" aria-hidden="true"><span><ThumbsUp size={14} /> {formatNum(post.reactions)}</span><span><MessageCircle size={14} /> {formatNum(post.comments)}</span></div>
        </div>
      </Link>)}{!displayPosts.length && <div className="empty-state"><h2>{t("No posts match yet.", "لا توجد منشورات مطابقة بعد.")}</h2><p>{t("Try a different topic or search term.", "جرب موضوعا أو كلمة بحث مختلفة.")}</p></div>}</div>{filteredPosts.length > visibleCount && <div className="load-more-row"><button type="button" className="button button-ghost" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>{t(`Load more (${filteredPosts.length - visibleCount} left)`, `تحميل المزيد (${formatNum(filteredPosts.length - visibleCount)} متبق)`)} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</button></div>}</div></div></section>
    {message && <Toast message={message} onClose={clearToast} />}
  </>;
}

export function CommunityPost() {
  const { t, formatNum } = useLocale();
  const { isAuthed } = useAuth();
  const { message, showToast, clearToast } = useToast();
  const params = useParams<{ id: string }>();
  const newPosts = useNewPosts();
  const post = [...newPosts, ...posts].find((item) => item.id === params.id);
  const [reacted, setReacted] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(() => post?.seedComments ?? []);

  if (!post) return <SignInGate title={t("Post not found.", "لم يُعثر على المنشور.")} copy={t("This thread may have been removed.", "قد يكون هذا الموضوع قد أُزيل.")} />;

  const title = t(post.title, post.arTitle);
  const topicLabel = t(post.topic, topicArabic[post.topic as (typeof postTopics)[number]]);

  if (!isAuthed) return <SignInGate title={t("Sign in to read this thread.", "سجل الدخول لقراءة هذا الموضوع.")} copy={t(`"${title}" and its comments are visible once you’re signed in.`, `"${title}" وتعليقاته مرئية بمجرد تسجيل الدخول.`)} />;

  const submitComment = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    setComments((current) => [...current, { author: t("You", "أنت"), text: comment.trim(), arText: comment.trim() }]);
    setComment("");
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
          <button type="button" className={reacted ? "is-active" : ""} onClick={() => { if (!reacted) { setReacted(true); showToast(t(`You reacted to ${post.author}’s post.`, `تفاعلت مع منشور ${post.author}.`)); } }} disabled={reacted}><ThumbsUp size={16} /> {reacted ? t("Reacted", "تم التفاعل") : t("Like", "إعجاب")}</button>
          <button type="button" onClick={() => document.getElementById("comment-input")?.focus()}><MessageCircle size={16} /> {t("Comment", "علق")}</button>
        </div>
        <div className="post-detail-comments">{comments.map((item, index) => <div className="comment-row" key={index}><div className="avatar avatar-clay avatar-sm" aria-hidden="true">{item.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div className="comment-bubble"><strong>{item.author}</strong><p>{t(item.text, item.arText)}</p></div></div>)}{!comments.length && <p style={{ color: "var(--muted)", fontSize: ".85rem" }}>{t("No comments yet, be the first to reply.", "لا توجد تعليقات بعد، كن أول من يرد.")}</p>}</div>
        <form className="post-detail-composer" onSubmit={submitComment}><div className="avatar avatar-yellow avatar-sm" aria-hidden="true">SA</div><input id="comment-input" value={comment} onChange={(event) => setComment(event.target.value)} placeholder={t("Write a comment...", "اكتب تعليقا...")} aria-label={t("Add a comment", "أضف تعليقا")} /><button type="submit" aria-label={t("Post comment", "انشر التعليق")}><Send size={15} /></button></form>
      </article>
    </div></section>
    {message && <Toast message={message} onClose={clearToast} />}
  </>;
}
