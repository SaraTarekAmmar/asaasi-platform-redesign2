# Monthly Decision Review Export: research cycle

## Research question

How can ASaaSI help a founder prepare a monthly decision review from retained records while preserving source context and avoiding automated prioritization, scoring, or conclusions?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Atlassian Jira Product Discovery: What are insights?](https://support.atlassian.com/jira-product-discovery/docs/what-are-insights/) | Insights can retain descriptive context, a source link, and labels to inform prioritization discussions. | Preserve individual decision evidence, original tests, dates, and source routes in the export rather than presenting an unlabeled summary. ASaaSI will not import Atlassian's rating or aggregation mechanics. |
| [Tim Herbig: From Information to Evidence](https://herbig.co/product-discovery-decisions/) | Evidence should remain explicit about proximity to the source and the commitment it represents, including the limits of weak evidence. | The export will retain source location and avoid treating record presence, field completion, or a date as proof of evidence strength. |
| [Zentrik: From customer evidence to initiatives](https://zentrik.ai/docs/product/customer-evidence-to-initiatives) | The published path describes a transition from customer evidence toward learnings, problems, bets, and solution ideas. | The export will make the transition inspectable with direct recovery paths but will not transform evidence into a suggested initiative, decision, or conclusion. |

## Product decision

Build a founder-controlled, bilingual **Monthly Decision Review Export** from the existing Activity learning archive. The download should compile only existing retained records for a founder-selected calendar month: completed Keep, Change, and Stop outcomes, the attached original decision context, review timing, owner, and direct source paths. It should state what is missing without filling a gap itself.

The export is a preparation artifact, not a management system. It must not score evidence, calculate a health status, rank decisions, infer causality or progress, choose priorities, set future review dates, send reminders, assign work, create tasks, or alter source records.

## Validation plan

Confirm that the download is useful in English and Arabic RTL, handles a month with no retained outcomes, remains source-linked, uses existing editorial tokens and soft rectangular UI surfaces, carries no em dashes, and leaves the landing page unchanged.

## Implementation and validation notes

Activity now includes a bilingual **Monthly Decision Review Export** beneath the cross-tool archive and before the Founder Learning Archive. The founder selects a calendar month and downloads a Markdown review containing every retained completed Keep, Change, and Stop outcome for that month. Each exported record preserves its decision title, outcome date, source, owner, review point, retained evidence, original test, original source route, and direct decision-specific accountability route. When one of the checked fields is absent, the document names the gap without filling it.

The export is intentionally a review-preparation artifact rather than a management engine. It does not score evidence, rank decisions, infer progress or causality, choose priorities, assign work, create tasks, set dates, or send reminders. The Activity preview exposes only the three most recent selected records, while the download includes every retained monthly outcome. The no-outcome state remains downloadable and explicitly states the absence without changing source records.

TypeScript and production builds pass. English and Arabic RTL authenticated Activity views were checked, including the translated month control, export boundary, empty state, and source-recovery actions. The modified source and stylesheet contain no em dashes, and the landing page remains unchanged.
