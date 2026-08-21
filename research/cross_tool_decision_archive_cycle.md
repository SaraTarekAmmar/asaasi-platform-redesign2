# Cross-Tool Decision Archive and Learning Retrieval Research

**Research date:** 21 August 2026  
**Scope:** High-signal decision retrieval, cross-tool experiment archives, outcome filtering, and evidence traceability.

## Evidence-led findings

Monday and Plane both describe a useful decision archive as a selective, searchable source of truth rather than a chronological dump. The retained record needs to preserve a compact summary, contextual rationale, ownership, date, outcome or status, next action, review trigger, and direct links to supporting work. Search and consistent classification are necessary as the log grows, but the archive should retain only consequential decisions to prevent noise from replacing judgement [1] [2].

Microsoft Research recommends archiving hypotheses, test metadata, and observed metric movement after an experiment. Its central lesson for ASaaSI is that the archive preserves a test’s original setup and result so founders can revisit it before starting similar work. It does not justify treating correlations, one test result, or every tool output as reusable truth [3].

Spotify’s experimentation work shows the value of shared naming conventions, pre-defined hypothesis, evidence and decision-rule fields, and a gradual system that makes every experiment transparent and self-explanatory to future readers. Its practices reinforce that cross-tool retrieval must expose original test context, not a synthetic score [4].

## Product implication

The next release should add a **Cross-Tool Decision Archive** within Activity. It should search only saved decision records, preserve source-tool provenance, distinguish open from completed Keep, Change, and Stop outcomes, and offer outcome and source filters. A founder should be able to search a practical phrase, inspect a matched evidence excerpt, see the original review date, and reopen the source workbench or Decision Review. It should not summarize across records into claims, rank tools, fabricate similarities, or show customer data without the original source context.

Browser review confirmed two interface-adjacent lessons. Monday’s article itself is structured for topical retrieval through a persistent, named section index before the long-form body, reinforcing the need for an archive that makes its retrieval boundaries obvious rather than hiding them in a general feed. Microsoft’s archive explanation explicitly frames the retained object as the original hypothesis, test metadata, metric movements, and resulting outcome. ASaaSI should therefore show a named source and original evidence excerpt in every archive result instead of deriving a new conclusion.

## ASaaSI audit and selected scope

Activity already has three useful but separate retrieval surfaces: a current-month outcome view, Founder Learning Archive for completed outcomes, and an Interview Pattern Archive for customer evidence. Open decisions are visible in the general feed and Decision Review, but a founder cannot search across both completed and open tool decisions, restrict the view to one source type, or quickly recover the original test context from a matched phrase. The current archive therefore helps reflection but does not yet make prior work reliably retrievable before a new founder action.

The selected release adds a **Cross-Tool Decision Archive** immediately after the Activity learning summary. It will include only decision records, search title, evidence, weekly reflection, next action, and the monthly operating principle, and offer outcome and source filtering. Each result will show the record’s current outcome or open status, a source provenance label derived from its route, original evidence excerpt, review timing, and direct links to the original workbench and Decision Review. It will never synthesize related records, infer patterns from a search term, or turn archive matches into a confidence score.

## Live verification

Authenticated Activity verification confirmed that the archive is shown directly after the decision-learning summary and before other Activity-specific surfaces. With the current retained record, it presents an Open Review status, a date, Customer Evidence provenance, original next-test language, review timing, and separate direct routes to Decision Review and the source workbench. The explicit Retrieval Rule and both outcome and source controls are visible in the live interface. This confirms that the archive adds a selective retrieval layer rather than replacing the existing Activity feed.

## Implementation outcome

The Cross-Tool Decision Archive is now live in Activity. It searches only saved decision records across titles, bilingual evidence, reflections, next actions, and operating principles. Founders can filter the retained set by open, keep, change, or stop state and by founder-tool or workspace origin. Every returned record shows a dated status, source provenance, an original evidence excerpt, the original test action, review timing, and direct recovery routes to Decision Review and, when applicable, the source workbench.

The archive is deliberately bounded. It does not generate similarities, merge records, rank tool quality, assign confidence, or turn matched words into a cross-record conclusion. An explicit retrieval rule and an empty state make these limitations visible rather than implicit.

Visual review also triggered a supported refinement of the protected access system. Registration, Founder Workspace, Weekly Review, and Customer Evidence now make the saved route a stronger rectangular return desk before identity fields. Identity controls are labelled access desks with route-specific Arabic and English return captions, fine rules, sequenced state markers, and neutral input surfaces. The review’s request for circular node and ring marks was intentionally rejected because the product explicitly forbids circles and rings. A verified 375px protected registration state retains legible linear route steps and the access form. TypeScript and production builds passed; the landing page remains unchanged.

## Design constraints

The archive will use ASaaSI’s warm off-white editorial foundation, navy hierarchy, linear saffron provenance marks, soft rectangular controls, Arabic RTL parity, and no circles or rings. It will not modify the landing page.

## References

[1] [monday.com, “Decision log: build a system for better decision tracking”](https://monday.com/blog/project-management/decision-log/)  
[2] [Plane, “Decision log: What it is, why teams use it, and template”](https://plane.so/blog/decision-log-what-it-is-why-teams-use-it-and-template)  
[3] [Microsoft Research, “Patterns of Trustworthy Experimentation: Post-Experiment Stage”](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/)  
[4] [Spotify Engineering, “Search Journey Towards Better Experimentation Practices”](https://engineering.atspotify.com/2022/02/search-journey-towards-better-experimentation-practices)
