/* Landing-roadmap detail page: Manrope display type, DM Sans body, warm paper, navy structure, and saffron-only progress signals. */
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { SectionLabel } from "../components/site";
import { useLocale } from "../contexts/LocaleContext";
import NotFound from "./NotFound";

type Pair = readonly [string, string];
type Outcome = { title: Pair; detail: Pair };
type Stage = {
  number: string;
  slug: string;
  title: Pair;
  routeLabel: Pair;
  promise: Pair;
  intro: Pair;
  workingRule: Pair;
  courseName: Pair;
  courseMeta: Pair;
  courseNote: Pair;
  courseHref: string;
  outcomes: Outcome[];
  moves: Pair[];
};

const stages: Stage[] = [
  {
    number: "01", slug: "validation", title: ["Validation", "التحقق"], routeLabel: ["Find proof before you build", "اعثر على الدليل قبل أن تبني"],
    promise: ["Find one person with one burning problem who will pay.", "اعثر على شخص واحد لديه مشكلة ملحّة ومستعد للدفع."],
    intro: ["Stage 1 turns a promising idea into evidence. Talk to buyers, score the signal, make a specific offer, and ask for a commitment before you invest in a larger build.", "تحوّل المرحلة الأولى الفكرة الواعدة إلى دليل. تحدث مع المشترين، وقيّم الإشارة، وقدّم عرضا محددا، واطلب التزاما قبل الاستثمار في بناء أكبر."],
    workingRule: ["Until paying customers prove the assumption, the founder is a researcher, not a feature factory.", "حتى يثبت العملاء الدافعون الافتراض، يكون المؤسس باحثا لا مصنع ميزات."],
    courseName: ["MENA SaaS Foundation Masterclass, Stage 1", "ماستر كلاس أساسيات SaaS في الشرق الأوسط، المرحلة الأولى"],
    courseMeta: ["6 modules · 17 steps · build-as-you-go", "٦ وحدات · ١٧ خطوة · بناء أثناء التعلم"],
    courseNote: ["Leave with working buyer evidence, an outbound engine, committed pilots, and a price you can defend.", "غادر بدليل مشترين فعلي، ومحرك تواصل، وتجارب ملتزمة، وسعر يمكنك الدفاع عنه."],
    courseHref: "/courses/roadmap-validation",
    outcomes: [
      { title: ["Validated ICP", "شريحة عميل مؤكدة"], detail: ["Three scored buyer profiles backed by real BANT+ evidence.", "ثلاثة ملفات مشترين مقيّمة ومدعومة بدليل BANT+ حقيقي."] },
      { title: ["Committed pilots", "تجارب ملتزمة"], detail: ["Signed LOIs or paid concierge pilots, not compliments.", "خطابات نوايا موقعة أو تجارب مدفوعة، لا مجاملات."] },
      { title: ["Defensible price", "سعر قابل للدفاع"], detail: ["A value-based price you can hold under pressure.", "سعر قائم على القيمة يمكنك التمسك به تحت الضغط."] },
    ],
    moves: [["Name the buyer and the painful job", "سمِّ المشتري والمهمة المؤلمة"], ["Run conversations that test willingness to pay", "أجرِ محادثات تختبر الاستعداد للدفع"], ["Turn proof into a focused pilot offer", "حوّل الدليل إلى عرض تجريبي مركز"]],
  },
  {
    number: "02", slug: "mvp", title: ["MVP", "المنتج الأولي"], routeLabel: ["Build with the cohort closest to proof", "ابنِ مع المجموعة الأقرب إلى الدليل"],
    promise: ["Build the MVP with your committed cohort that is closest to product-market fit.", "ابنِ المنتج الأولي مع مجموعتك الملتزمة الأقرب لملاءمة المنتج للسوق."],
    intro: ["Stage 2 narrows the build to the workflow buyers already asked for. Your job is not to launch every idea; it is to make one promised outcome reliably usable.", "تضيّق المرحلة الثانية البناء إلى سير العمل الذي طلبه المشترون بالفعل. مهمتك ليست إطلاق كل فكرة، بل جعل نتيجة واحدة موعودة قابلة للاستخدام بثقة."],
    workingRule: ["Build the shortest path from the buyer’s recurring problem to one observable outcome.", "ابنِ أقصر طريق من مشكلة المشتري المتكررة إلى نتيجة واحدة قابلة للملاحظة."],
    courseName: ["Stage 2 course, MVP with a committed cohort", "دورة المرحلة الثانية، المنتج الأولي مع مجموعة ملتزمة"],
    courseMeta: ["Course track · build, test, tighten", "مسار الدورة · ابنِ، اختبر، شدد"],
    courseNote: ["Use the course to turn pilot learning into a minimum product your earliest customers can actually use.", "استخدم الدورة لتحويل تعلم التجارب إلى منتج أدنى يمكن لعملائك الأوائل استخدامه فعليا."],
    courseHref: "/courses/roadmap-mvp",
    outcomes: [
      { title: ["Committed build scope", "نطاق بناء ملتزم"], detail: ["A narrow product promise tied to the highest-value buyer workflow.", "وعد منتج ضيق مرتبط بسير عمل المشتري الأعلى قيمة."] },
      { title: ["Cohort feedback loop", "حلقة تغذية راجعة للمجموعة"], detail: ["Weekly proof from the people who agreed to try the product.", "دليل أسبوعي من الأشخاص الذين وافقوا على تجربة المنتج."] },
      { title: ["Usable first release", "إصدار أول قابل للاستخدام"], detail: ["A reliable path to the outcome you sold, without needless surface area.", "طريق موثوق إلى النتيجة التي بعتها، دون نطاق زائد."] },
    ],
    moves: [["Choose the one workflow to make reliable", "اختر سير العمل الواحد الذي ستجعله موثوقا"], ["Ship only what the cohort needs to finish it", "أطلق فقط ما تحتاجه المجموعة لإكماله"], ["Measure use, friction, and return intent", "قِس الاستخدام والاحتكاك ونية العودة"]],
  },
  {
    number: "03", slug: "acquisition", title: ["Acquisition & distribution", "الاكتساب والتوزيع"], routeLabel: ["Find the repeatable path to the buyer", "اعثر على المسار المتكرر إلى المشتري"],
    promise: ["Learn how and where to find repeatable lead channels.", "تعلّم كيف وأين تجد قنوات عملاء محتملين قابلة للتكرار."],
    intro: ["Stage 3 converts one-off outreach into a repeatable customer path. Test channels deliberately, make the message sharper, and keep the numbers visible before scaling spend.", "تحوّل المرحلة الثالثة التواصل الفردي إلى مسار عملاء متكرر. اختبر القنوات بوعي، واجعل الرسالة أدق، وأبق الأرقام ظاهرة قبل توسيع الإنفاق."],
    workingRule: ["A channel is not real until you can explain its audience, message, conversion, and cost.", "القناة ليست حقيقية حتى تستطيع شرح جمهورها ورسالتها وتحويلها وتكلفتها."],
    courseName: ["Stage 3 course, Acquisition & distribution", "دورة المرحلة الثالثة، الاكتساب والتوزيع"],
    courseMeta: ["Course track · message, channel, conversion", "مسار الدورة · رسالة، قناة، تحويل"],
    courseNote: ["Build a channel test plan that replaces activity with an explainable route to qualified conversations.", "ابنِ خطة اختبار قنوات تستبدل النشاط بمسار قابل للشرح نحو محادثات مؤهلة."],
    courseHref: "/courses/roadmap-acquisition",
    outcomes: [
      { title: ["Channel test map", "خريطة اختبار القنوات"], detail: ["A short list of channels with a buyer, hypothesis, and success threshold.", "قائمة قصيرة من القنوات مع مشترٍ وفرضية وحد نجاح."] },
      { title: ["Message library", "مكتبة رسائل"], detail: ["Messages that name the buyer’s job rather than your feature list.", "رسائل تسمّي مهمة المشتري بدلا من قائمة ميزاتك."] },
      { title: ["Conversion rhythm", "إيقاع التحويل"], detail: ["A visible cadence for leads, conversations, trials, and wins.", "إيقاع ظاهر للعملاء المحتملين والمحادثات والتجارب والنجاحات."] },
    ],
    moves: [["Choose two channels worth learning from", "اختر قناتين تستحقان التعلم منهما"], ["Make one message specific enough to test", "اجعل رسالة واحدة محددة بما يكفي للاختبار"], ["Keep every conversion ratio visible", "أبق كل نسبة تحويل ظاهرة"]],
  },
  {
    number: "04", slug: "retention", title: ["Customer retention", "الاحتفاظ بالعملاء"], routeLabel: ["Fix the leaky bucket before you scale", "أصلح الدلو المتسرب قبل أن تتوسع"],
    promise: ["Fix the leaky bucket before aggressive scaling.", "أصلح الدلو المتسرب قبل التوسع العنيف."],
    intro: ["Stage 4 makes the product essential after the first sale. Find where value drops, speak to customers before they disappear, and create a habit that earns the next renewal.", "تجعل المرحلة الرابعة المنتج ضروريا بعد أول بيع. اعثر على موضع انخفاض القيمة، وتحدث إلى العملاء قبل اختفائهم، واصنع عادة تكسب التجديد التالي."],
    workingRule: ["Retention is a customer outcome and a company habit, not a late rescue campaign.", "الاحتفاظ نتيجة للعميل وعادة للشركة، لا حملة إنقاذ متأخرة."],
    courseName: ["Stage 4 course, Customer retention", "دورة المرحلة الرابعة، الاحتفاظ بالعملاء"],
    courseMeta: ["Course track · activation, value, renewal", "مسار الدورة · تفعيل، قيمة، تجديد"],
    courseNote: ["Turn customer evidence into a visible retention system before adding more top-of-funnel volume.", "حوّل دليل العملاء إلى نظام احتفاظ ظاهر قبل إضافة مزيد من حجم أعلى القمع."],
    courseHref: "/courses/roadmap-retention",
    outcomes: [
      { title: ["Activation signal", "إشارة تفعيل"], detail: ["A practical definition of the first customer outcome that matters.", "تعريف عملي لأول نتيجة للعميل تهم فعلا."] },
      { title: ["Churn conversations", "محادثات الانسحاب"], detail: ["A structured way to learn from silence, downgrades, and cancellations.", "طريقة منظمة للتعلم من الصمت والتخفيضات والإلغاءات."] },
      { title: ["Renewal rhythm", "إيقاع التجديد"], detail: ["An operating cadence that keeps value visible before the renewal date.", "إيقاع تشغيلي يبقي القيمة ظاهرة قبل تاريخ التجديد."] },
    ],
    moves: [["Define the first moment of value", "حدد أول لحظة قيمة"], ["Find the step where customers go quiet", "اعثر على الخطوة التي يصمت عندها العملاء"], ["Design the next useful customer check-in", "صمم فحص العميل المفيد التالي"]],
  },
  {
    number: "05", slug: "focus", title: ["Product focus", "تركيز المنتج"], routeLabel: ["Become the clear choice for a specific niche", "كن الخيار الواضح لشريحة محددة"],
    promise: ["Be recognized as number one in your niche, and have the power to say no.", "كن معروفا كرقم واحد في شريحتك، وامتلك القدرة على قول لا."],
    intro: ["Stage 5 is where a useful product becomes a clear category choice. Narrow the promise, decide what you will not build, and let the right customers recognize themselves in the story.", "المرحلة الخامسة هي حيث يتحول المنتج المفيد إلى خيار فئة واضح. ضيّق الوعد، وقرر ما لن تبنيه، ودع العملاء المناسبين يرون أنفسهم في القصة."],
    workingRule: ["Focus is a strategic refusal that makes your strongest customer say, ‘this is for me.’", "التركيز هو رفض استراتيجي يجعل أقوى عملائك يقول: هذا لي."],
    courseName: ["Stage 5 course, Product focus", "دورة المرحلة الخامسة، تركيز المنتج"],
    courseMeta: ["Course track · niche, promise, restraint", "مسار الدورة · شريحة، وعد، انضباط"],
    courseNote: ["Use the course to sharpen your category story and choose the work that strengthens it.", "استخدم الدورة لصقل قصة فئتك واختيار العمل الذي يقويها."],
    courseHref: "/courses/roadmap-focus",
    outcomes: [
      { title: ["Niche thesis", "أطروحة الشريحة"], detail: ["A specific market, customer, and problem you can serve better than a generalist.", "سوق وعميل ومشكلة محددة يمكنك خدمتها أفضل من المتخصص العام."] },
      { title: ["Focused promise", "وعد مركز"], detail: ["A clear claim the right customer can repeat in their own language.", "ادعاء واضح يمكن للعميل المناسب تكراره بلغته."] },
      { title: ["Strategic no-list", "قائمة لا الاستراتيجية"], detail: ["A visible boundary around work that distracts from the category you own.", "حد ظاهر حول العمل الذي يشتت عن الفئة التي تمتلكها."] },
    ],
    moves: [["Name the customer you serve best", "سمِّ العميل الذي تخدمه بأفضل شكل"], ["Write the category promise in one sentence", "اكتب وعد الفئة في جملة واحدة"], ["Make the next product no explicit", "اجعل رفض المنتج التالي صريحا"]],
  },
  {
    number: "06", slug: "scale", title: ["Scalability & growth", "القابلية للتوسع والنمو"], routeLabel: ["Grow beyond today’s capacity without losing the signal", "انمُ بعد قدرتك الحالية دون فقد الإشارة"],
    promise: ["Grow beyond your normal capacity into new products or markets.", "انمُ بعد قدرتك المعتادة إلى منتجات أو أسواق جديدة."],
    intro: ["Stage 6 expands what is already working. Add capacity, talent, and new-market tests only when the core engine is clear enough to reproduce without founder heroics.", "توسع المرحلة السادسة ما يعمل بالفعل. أضف القدرة والمواهب واختبارات الأسواق الجديدة فقط عندما يكون المحرك الأساسي واضحا بما يكفي لتكراره دون بطولات المؤسس."],
    workingRule: ["Scale a proven operating system, not the founder’s personal stamina.", "وسّع نظام تشغيل مثبت، لا قدرة المؤسس الشخصية على التحمل."],
    courseName: ["Stage 6 course, Scalability & growth", "دورة المرحلة السادسة، القابلية للتوسع والنمو"],
    courseMeta: ["Course track · capacity, market, operating rhythm", "مسار الدورة · قدرة، سوق، إيقاع تشغيلي"],
    courseNote: ["Build the capacity map and decision rules that let growth travel further than the founding team.", "ابنِ خريطة القدرة وقواعد القرار التي تجعل النمو يتجاوز فريق التأسيس."],
    courseHref: "/courses/roadmap-scale",
    outcomes: [
      { title: ["Capacity map", "خريطة القدرة"], detail: ["A clear view of the people, process, and cash constraints that growth will expose.", "رؤية واضحة لقيود الأشخاص والعمليات والنقد التي سيكشفها النمو."] },
      { title: ["Market test rules", "قواعد اختبار السوق"], detail: ["A disciplined way to learn from expansion before making it permanent.", "طريقة منضبطة للتعلم من التوسع قبل جعله دائما."] },
      { title: ["Operating cadence", "إيقاع تشغيلي"], detail: ["A repeatable decision rhythm that keeps quality visible as the team grows.", "إيقاع قرار متكرر يبقي الجودة ظاهرة مع نمو الفريق."] },
    ],
    moves: [["Map the next real capacity constraint", "ارسم قيد القدرة الحقيقي التالي"], ["Test one expansion assumption at a time", "اختبر افتراض توسع واحدا في كل مرة"], ["Document the work that cannot stay founder-owned", "وثّق العمل الذي لا يمكن أن يبقى مملوكا للمؤسس"]],
  },
  {
    number: "07", slug: "governance", title: ["Governance", "الحوكمة"], routeLabel: ["Control expansion and regain operating quality", "اضبط التوسع واستعد جودة التشغيل"],
    promise: ["Control the expansion and regain your operations quality.", "اضبط التوسع واستعد جودة عملياتك."],
    intro: ["Stage 7 gives the company the structure to keep its promises as complexity grows. Make decisions traceable, define ownership, and protect the standards that customers already trust.", "تمنح المرحلة السابعة الشركة الهيكل للحفاظ على وعودها مع نمو التعقيد. اجعل القرارات قابلة للتتبع، وحدد الملكية، واحمِ المعايير التي يثق بها العملاء بالفعل."],
    workingRule: ["Governance is how a growing company stays legible to its team, customers, and future partners.", "الحوكمة هي كيف تبقى الشركة النامية واضحة لفريقها وعملائها وشركائها المستقبليين."],
    courseName: ["Stage 7 course, Governance", "دورة المرحلة السابعة، الحوكمة"],
    courseMeta: ["Course track · ownership, controls, quality", "مسار الدورة · ملكية، ضوابط، جودة"],
    courseNote: ["Use the course to set the operating guardrails that keep expansion deliberate and dependable.", "استخدم الدورة لوضع حواجز التشغيل التي تجعل التوسع مدروسا ويمكن الاعتماد عليه."],
    courseHref: "/courses/roadmap-governance",
    outcomes: [
      { title: ["Decision ledger", "سجل القرارات"], detail: ["A visible record of the bets, owners, and thresholds that shape the company.", "سجل ظاهر للرهانات والملاك والحدود التي تشكل الشركة."] },
      { title: ["Clear ownership", "ملكية واضحة"], detail: ["A practical map of what each operating role is responsible for.", "خريطة عملية لما يكون كل دور تشغيلي مسؤولا عنه."] },
      { title: ["Quality controls", "ضوابط الجودة"], detail: ["A small set of standards that protects the customer experience through growth.", "مجموعة صغيرة من المعايير التي تحمي تجربة العميل عبر النمو."] },
    ],
    moves: [["Make the next major decision traceable", "اجعل القرار الكبير التالي قابلا للتتبع"], ["Name the owner for each critical operating loop", "سمِّ المالك لكل حلقة تشغيلية حرجة"], ["Set the quality threshold before the next expansion", "حدد عتبة الجودة قبل التوسع التالي"]],
  },
];

const stageArtifacts: Record<string, { label: Pair; items: Pair[] }> = {
  validation: { label: ["Proof gate", "بوابة الدليل"], items: [["Buyer named", "تمت تسمية المشتري"], ["Pain scored", "تم تقييم الألم"], ["Commitment asked", "تم طلب الالتزام"]] },
  mvp: { label: ["Build loop", "حلقة البناء"], items: [["One workflow", "سير عمل واحد"], ["Cohort test", "اختبار المجموعة"], ["Usable release", "إصدار قابل للاستخدام"]] },
  acquisition: { label: ["Channel map", "خريطة القنوات"], items: [["Buyer", "المشتري"], ["Message", "الرسالة"], ["Conversion", "التحويل"]] },
  retention: { label: ["Retention loop", "حلقة الاحتفاظ"], items: [["Activation", "التفعيل"], ["Value moment", "لحظة القيمة"], ["Renewal", "التجديد"]] },
  focus: { label: ["Focus worksheet", "ورقة التركيز"], items: [["Best customer", "أفضل عميل"], ["Clear promise", "وعد واضح"], ["Strategic no", "رفض استراتيجي"]] },
  scale: { label: ["Scale ladder", "سلم التوسع"], items: [["Constraint", "القيد"], ["Repeatable system", "نظام متكرر"], ["Expansion test", "اختبار التوسع"]] },
  governance: { label: ["Decision register", "سجل القرارات"], items: [["Decision", "القرار"], ["Owner", "المالك"], ["Quality threshold", "عتبة الجودة"]] },
};

const stageWorkingObjects: Record<string, { label: Pair; heading: Pair; copy: Pair; evidence: Pair }> = {
  validation: { label: ["Proof gate", "بوابة الدليل"], heading: ["A proof gate, not a feature list.", "بوابة دليل، لا قائمة ميزات."], copy: ["The next move is earned when the buyer, painful job, and commitment are visible in the same record.", "تُكتسب الخطوة التالية عندما يكون المشتري والمهمة المؤلمة والالتزام ظاهرين في السجل نفسه."], evidence: ["Proof to carry forward", "دليل تحمله معك"] },
  mvp: { label: ["Build loop", "حلقة البناء"], heading: ["Turn commitment into repeatable use.", "حوّل الالتزام إلى استخدام متكرر."], copy: ["Keep one workflow inside the loop: narrow the scope, test it with the cohort, then release the outcome they can actually use.", "أبقِ سير عمل واحد داخل الحلقة: ضيّق النطاق، اختبره مع المجموعة، ثم أطلق النتيجة التي يمكنهم استخدامها فعلا."], evidence: ["Build-loop record", "سجل حلقة البناء"] },
  acquisition: { label: ["Channel map", "خريطة القنوات"], heading: ["Map the route before you add spend.", "ارسم المسار قبل أن تضيف إنفاقا."], copy: ["A channel only becomes useful when the buyer, message, and conversion checkpoint are connected and explainable.", "لا تصبح القناة مفيدة إلا عندما يكون المشتري والرسالة ونقطة التحويل متصلين وقابلين للشرح."], evidence: ["Channel evidence", "دليل القنوات"] },
  retention: { label: ["Retention loop", "حلقة الاحتفاظ"], heading: ["Keep the customer value loop intact.", "أبقِ حلقة قيمة العميل سليمة."], copy: ["Trace the first value moment through the renewal conversation so silence becomes a signal, not a surprise.", "تتبّع أول لحظة قيمة حتى محادثة التجديد ليصبح الصمت إشارة لا مفاجأة."], evidence: ["Retention signals", "إشارات الاحتفاظ"] },
  focus: { label: ["Focus worksheet", "ورقة التركيز"], heading: ["Choose what stays inside the promise.", "اختر ما يبقى داخل الوعد."], copy: ["Use a visible worksheet to name the best customer, the promise they repeat, and the work you now refuse.", "استخدم ورقة ظاهرة لتسمية أفضل عميل والوعد الذي يكرره والعمل الذي ترفضه الآن."], evidence: ["Focus decisions", "قرارات التركيز"] },
  scale: { label: ["Scale ladder", "سلم التوسع"], heading: ["Climb one capacity constraint at a time.", "اصعد قيد قدرة واحدا في كل مرة."], copy: ["Growth stays deliberate when each new rung names the constraint, the repeatable system, and the expansion test.", "يبقى النمو مدروسا عندما تسمي كل درجة القيد والنظام المتكرر واختبار التوسع."], evidence: ["Scale readiness", "جاهزية التوسع"] },
  governance: { label: ["Decision register", "سجل القرارات"], heading: ["Make the operating record legible.", "اجعل السجل التشغيلي واضحا."], copy: ["A decision register keeps the bet, accountable owner, and quality threshold together before complexity hides the work.", "يبقي سجل القرارات الرهان والمالك المسؤول وعتبة الجودة معا قبل أن يخفي التعقيد العمل."], evidence: ["Decision record", "سجل القرار"] },
};

export default function RoadmapStagePage() {
  const { stage: requestedStage } = useParams<{ stage?: string }>();
  const { t, isRTL, formatNum } = useLocale();
  const activeIndex = stages.findIndex((item) => item.slug === requestedStage);
  // ponytail: used to clamp an unmatched slug to index 0 and silently render Stage 1 as if
  // /roadmap/typo were a real page. A real 404 is one line here; NotFound is already what
  // every other unknown route in the app renders.
  if (activeIndex === -1) return <NotFound />;
  const stage = stages[activeIndex];
  const courseReady = Number(stage.number) <= 2;
  const artifact = stageArtifacts[stage.slug];
  const workingObject = stageWorkingObjects[stage.slug];
  const previous = stages[activeIndex - 1];
  const next = stages[activeIndex + 1];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }} className={`roadmap-stage-route roadmap-stage-route--${stage.slug}`} dir={isRTL ? "rtl" : "ltr"}>
    <section className="roadmap-stage-hero">
      <div className="container roadmap-stage-hero__inner">
        <div className="roadmap-stage-hero__copy">
          <Link href="/#how-it-works" className="roadmap-stage-back">{isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t("Growth roadmap", "خارطة النمو")}</Link>
          <span className="roadmap-stage-mark"><i /> {t("Stage", "المرحلة")} {formatNum(stage.number)} / {t(stage.title[0], stage.title[1])}</span>
          <SectionLabel>{t("The company journey", "رحلة الشركة")}</SectionLabel>
          <h1>{t(stage.routeLabel[0], stage.routeLabel[1])}</h1>
          <p>{t(stage.intro[0], stage.intro[1])}</p>
          <Link href={courseReady ? stage.courseHref : "/signup"} className="button button-primary">{courseReady ? t("Open the course", "افتح الدورة") : t("Get the stage briefing", "احصل على موجز المرحلة")} <Arrow size={15} /></Link>
        </div>
        <aside className="roadmap-stage-hero__evidence">
          <span className="mono">{t("The stage promise", "وعد المرحلة")}</span>
          <strong>{t(stage.promise[0], stage.promise[1])}</strong>
          <p>{t(stage.workingRule[0], stage.workingRule[1])}</p>
        </aside>
        <ol className="roadmap-stage-progress" aria-label={t("Seven-stage growth roadmap", "خارطة النمو ذات المراحل السبع")}>
          {stages.map((item, index) => <li key={item.slug} className={index === activeIndex ? "is-current" : index < activeIndex ? "is-complete" : ""}>
            <Link href={`/roadmap/${item.slug}`} aria-current={index === activeIndex ? "page" : undefined}><span>{formatNum(item.number)}</span><b>{t(item.title[0], item.title[1])}</b></Link>
          </li>)}
        </ol>
        <div className={`roadmap-stage-artifact roadmap-stage-artifact--${stage.slug}`} aria-label={t(artifact.label[0], artifact.label[1])}><span className="mono">{t(artifact.label[0], artifact.label[1])}</span>{artifact.items.map((item, index) => <div key={item[0]} className={index === 0 ? "is-active" : ""}><i>{formatNum(index + 1)}</i><strong>{t(item[0], item[1])}</strong></div>)}</div>
      </div>
    </section>

    <section className="roadmap-stage-work">
      <div className="container roadmap-stage-work__grid">
        <div className="roadmap-stage-work__intro">
          <SectionLabel>{t(workingObject.label[0], workingObject.label[1])}</SectionLabel>
          <h2>{t(workingObject.heading[0], workingObject.heading[1])}</h2>
          <p>{t(workingObject.copy[0], workingObject.copy[1])}</p>
          <div className="roadmap-stage-moves">
            {stage.moves.map((move, index) => <div key={move[0]}><span>{formatNum(`0${index + 1}`)}</span><p>{t(move[0], move[1])}</p></div>)}
          </div>
        </div>
        <div className="roadmap-stage-outcomes">
          <span className="mono">{t(workingObject.evidence[0], workingObject.evidence[1])}</span>
          {stage.outcomes.map((outcome, index) => <article key={outcome.title[0]}>
            <span>{formatNum(`0${index + 1}`)}</span>
            <div><h3>{t(outcome.title[0], outcome.title[1])}</h3><p>{t(outcome.detail[0], outcome.detail[1])}</p></div>
            <Check size={16} aria-hidden="true" />
          </article>)}
        </div>
      </div>
    </section>

    <section className="roadmap-stage-course">
      <div className="container roadmap-stage-course__inner">
        <div>
          <SectionLabel>{courseReady ? t("Course for this stage", "دورة هذه المرحلة") : t("Stage briefing", "موجز المرحلة")}</SectionLabel>
          <h2>{courseReady ? t(stage.courseName[0], stage.courseName[1]) : t(`Stage ${stage.number} curriculum is in development.`, `منهج المرحلة ${stage.number} قيد التطوير.`)}</h2>
          <p>{courseReady ? t(stage.courseNote[0], stage.courseNote[1]) : t("The stage framework is public now. Create a founder profile to keep its working rules, evidence, and future release signal attached to your company context.", "إطار المرحلة متاح علنا الآن. أنشئ ملف مؤسس للاحتفاظ بقواعد العمل والدليل وإشارة الإصدار المستقبلي المرتبطة بسياق شركتك.")}</p>
        </div>
        <div className="roadmap-stage-course__action">
          <span className="mono">{courseReady ? t(stage.courseMeta[0], stage.courseMeta[1]) : t("ROADMAP / FUTURE RELEASE", "خارطة النمو / إصدار مستقبلي")}</span>
          <Link href={courseReady ? stage.courseHref : "/signup"} className="button button-primary">{courseReady ? t("Open the course", "افتح الدورة") : t("Get the stage briefing", "احصل على موجز المرحلة")} <Arrow size={15} /></Link>
        </div>
      </div>
    </section>

    <nav className="container roadmap-stage-neighbours" aria-label={t("Roadmap navigation", "تنقل خارطة النمو")}>
      {previous ? <Link href={`/roadmap/${previous.slug}`} className="roadmap-stage-neighbour roadmap-stage-neighbour--previous"><span>{t("Previous stage", "المرحلة السابقة")}</span><strong>{t(previous.title[0], previous.title[1])}</strong></Link> : <span />}
      {next ? <Link href={`/roadmap/${next.slug}`} className="roadmap-stage-neighbour roadmap-stage-neighbour--next"><span>{t("Next stage", "المرحلة التالية")}</span><strong>{t(next.title[0], next.title[1])}</strong></Link> : <Link href="/assessment" className="roadmap-stage-neighbour roadmap-stage-neighbour--next"><span>{t("Not sure where to start?", "غير متأكد من أين تبدأ؟")}</span><strong>{t("Take the founder test", "أجر اختبار المؤسس")}</strong></Link>}
    </nav>
  </motion.main>;
}

export function RoadmapCoursePage({ stageSlug }: { stageSlug?: string }) {
  const { stage: requestedStage } = useParams<{ stage?: string }>();
  const { t, isRTL, formatNum } = useLocale();
  const stage = stages.find((item) => item.slug === (stageSlug ?? requestedStage));
  if (!stage) return <NotFound />;
  const courseReady = Number(stage.number) <= 2;
  // ponytail: not-ready stages duplicated the stage page's content behind a route nothing
  // links to (stage page only links here when courseReady). 404 instead of maintaining a
  // second near-identical render of the same stage data.
  if (!courseReady) return <NotFound />;
  const artifact = stageArtifacts[stage.slug];
  const workingObject = stageWorkingObjects[stage.slug];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }} className={`roadmap-stage-route roadmap-course-route roadmap-stage-route--${stage.slug}`} dir={isRTL ? "rtl" : "ltr"}>
    <section className="roadmap-stage-hero roadmap-course-hero">
      <div className="container roadmap-stage-hero__inner">
        <div className="roadmap-stage-hero__copy">
          <Link href={`/roadmap/${stage.slug}`} className="roadmap-stage-back">{isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t("Back to stage", "العودة إلى المرحلة")} {formatNum(stage.number)}</Link>
          <span className="roadmap-stage-mark"><i /> {t("Course", "الدورة")} / {t("Stage", "المرحلة")} {formatNum(stage.number)}</span>
          <SectionLabel>{t("MENA SaaS growth roadmap", "خارطة نمو SaaS في المنطقة")}</SectionLabel>
          <h1>{courseReady ? t(stage.courseName[0], stage.courseName[1]) : t(`Stage ${stage.number} curriculum / in development`, `منهج المرحلة ${stage.number} / قيد التطوير`)}</h1>
          <p>{courseReady ? t(stage.courseNote[0], stage.courseNote[1]) : t("The company-stage framework is ready to use; the facilitated curriculum will open only after its MENA-specific content and delivery sequence are complete.", "إطار مرحلة الشركة جاهز للاستخدام؛ سيفتح المنهج الميسّر فقط بعد اكتمال محتواه وتسلسل تقديمه الخاص بالمنطقة.")}</p>
        </div>
        <aside className="roadmap-stage-hero__evidence">
          <span className="mono">{courseReady ? t("Course format", "تنسيق الدورة") : t("READINESS", "الجاهزية")}</span>
          <strong>{courseReady ? t(stage.courseMeta[0], stage.courseMeta[1]) : t("Curriculum development in progress", "تطوير المنهج جارٍ")}</strong>
          <p>{courseReady ? t("A practical stage guide built around decisions, evidence, and working deliverables, not generic theory.", "دليل عملي للمرحلة مبني حول القرارات والدليل والمخرجات العملية، لا نظرية عامة.") : t("Follow the stage briefing, not a premature course promise. The roadmap keeps the next operating questions visible while the curriculum is built.", "تابع موجز المرحلة، لا وعد دورة مبكر. تُبقي الخارطة أسئلة التشغيل التالية ظاهرة أثناء بناء المنهج.")}</p>
        </aside>
        <div className={`roadmap-stage-artifact roadmap-stage-artifact--course roadmap-stage-artifact--${stage.slug}`} aria-label={t(artifact.label[0], artifact.label[1])}><span className="mono">{t(artifact.label[0], artifact.label[1])}</span>{artifact.items.map((item, index) => <div key={item[0]} className={index === 0 ? "is-active" : ""}><i>{formatNum(index + 1)}</i><strong>{t(item[0], item[1])}</strong></div>)}</div>
      </div>
    </section>

    <section className="roadmap-stage-work roadmap-course-outline">
      <div className="container roadmap-stage-work__grid">
        <div className="roadmap-stage-work__intro">
          <SectionLabel>{t(workingObject.label[0], workingObject.label[1])}</SectionLabel>
          <h2>{t(workingObject.heading[0], workingObject.heading[1])}</h2>
          <p>{t(workingObject.copy[0], workingObject.copy[1])}</p>
          <div className="roadmap-stage-moves">
            {stage.moves.map((move, index) => <div key={move[0]}><span>{t("MODULE", "وحدة")} {formatNum(`0${index + 1}`)}</span><p>{t(move[0], move[1])}</p></div>)}
          </div>
        </div>
        <div className="roadmap-stage-outcomes">
          <span className="mono">{t(workingObject.evidence[0], workingObject.evidence[1])}</span>
          {stage.outcomes.map((outcome, index) => <article key={outcome.title[0]}>
            <span>{formatNum(`0${index + 1}`)}</span>
            <div><h3>{t(outcome.title[0], outcome.title[1])}</h3><p>{t(outcome.detail[0], outcome.detail[1])}</p></div>
            <Check size={16} aria-hidden="true" />
          </article>)}
        </div>
      </div>
    </section>

    <section className="roadmap-stage-course roadmap-course-enrol">
      <div className="container roadmap-stage-course__inner">
        <div>
          <SectionLabel>{courseReady ? t("Start this course", "ابدأ هذه الدورة") : t("Stay close to this stage", "ابق قريبا من هذه المرحلة")}</SectionLabel>
          <h2>{courseReady ? t("Bring your company context. Leave with a working next move.", "أحضر سياق شركتك. وغادر بخطوة تالية عملية.") : t("Put your company context next to the work the curriculum will need to solve.", "ضع سياق شركتك بجانب العمل الذي سيحتاج المنهج إلى حله.")}</h2>
          <p>{courseReady ? t("Create your profile, then move to active Subscriber access before buying a paid stage cohort.", "أنشئ ملفك، ثم انتقل إلى وصول مشترك نشط قبل شراء دفعة مرحلة مدفوعة.") : t("Create a free founder profile to follow the stage framework and receive the future course release when it is ready.", "أنشئ ملف مؤسس مجانيا لمتابعة إطار المرحلة وتلقي إصدار الدورة المستقبلي عند جاهزيته.")}</p>
        </div>
        <div className="roadmap-stage-course__action">
          <span className="mono">{t("STAGE", "المرحلة")} {formatNum(stage.number)} / {t(stage.title[0], stage.title[1])}</span>
          <Link href={courseReady ? "/pricing" : "/signup"} className="button button-primary">{courseReady ? t("See Subscriber access", "شاهد وصول المشترك") : t("Create my founder profile", "أنشئ ملف مؤسسي")} <Arrow size={15} /></Link>
        </div>
      </div>
    </section>
  </motion.main>;
}
