# Decision and event review cadence: research cycle

## Research question

How can ASaaSI give founders one bounded view of retained decision and event review points without silently selecting priorities, creating a task queue, or treating a date as evidence of progress?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Working Backwards: The Amazon Operating Cadence](https://workingbackwards.com/concepts/amazon-operating-cadence/) | Operating cadence is the repeating process of planning, reviewing, and adjusting. Weekly reviews surface facts that inform later actions, while planning reviews work at distinct time horizons. | ASaaSI can give founders a time-windowed recovery view of retained review points and source context. It will not draw conclusions from the dates, declare progress, or prescribe adjustments. |
| [Pedowitz: Best Cadence for Business Reviews](https://www.pedowitzgroup.com/best-cadence-for-business-reviews-weekly-monthly-quarterly) | Review tiers work best when their inputs, purpose, decisions, owners, and dates are visible. The guidance also advocates scorecards and priority setting. | ASaaSI can retain a human-controlled weekly window and direct source routes, separating event follow-through and decision reviews. It will not introduce scorecards, ranking, automatic priorities, or task assignment. |

## Product decision

Build a bilingual **Decision and Event Review Window** in Activity. The founder selects a calendar week and sees only retained review points from open decisions and events that have factual observations. Each row preserves source type, owner if retained, review timing, original evidence or observation, the original test or follow-up context, and direct source routes. Event observations appear separately from decisions, and neither lane calculates a combined priority.

The view is a time-windowed source-recovery aid, not a weekly plan, event calendar, or urgency queue. It must not choose a priority, score a record, infer progress or quality, shift dates, create tasks, reminders, meetings, decisions, or follow-up drafts.

## Validation plan

Confirm week selection is founder-controlled, events require a factual observation to appear, decisions remain open-only, undated records are disclosed without being treated as failures, English and Arabic RTL labels stay correct, source routes recover the intended records, modified sources contain no em dashes, and the landing page remains unchanged.

## Activity audit note

Activity already holds separate review tools for monthly evidence, evidence freshness, decision ownership, review-date reconciliation, event debrief sources, and post-event learning. The missing connection was a single founder-selected time window that could show only retained dated reviews without collapsing decisions and event observations into one verdict. The new window sits after Review Date Reconciliation and before cross-event source synthesis, where it can expose routes without replacing those deeper reviews.

## Implementation and validation notes

Activity now includes a bilingual **Decision and Event Review Window**. The founder selects an ISO calendar week, then sees two separate lanes: open decisions with a retained review date inside the selected week, and observed events with a retained factual room observation and date inside the selected week. Every decision row preserves evidence, original test, owner, review timing, source recovery, and decision-specific accountability. Every event row preserves its factual observation, preparation question, follow-through context, event source route, and event debrief route.

The selected week is a source-recovery boundary, not a priority or urgency engine. The component does not score records, infer progress, evidence quality, event value, causality, or a combined decision result. It does not move dates, create work, send reminders, schedule meetings, choose a next move, or generate follow-up drafts. Undated open decisions and observed events remain visible as separate counts outside the selected week, without being labeled as failures.

TypeScript and production builds pass. The window uses existing Activity translations, RTL-safe soft rectangular lanes, narrow saffron provenance, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
