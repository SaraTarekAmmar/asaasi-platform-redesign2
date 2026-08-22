# Review Date Reconciliation Cycle

## Research question

How should ASaaSI help founders inspect alignment between a decision’s retained owner, review date, evidence, and review route without transforming review timing into an automated priority or generic task plan?

## External findings

Pedowitz recommends operating reviews with a visible decision log, owners, dates, defined purpose, and documented changes across a recurring cadence.[1]

YogoQ describes useful decision-log review cadence as explicit scope, evidence, owner, consequence, and review timing. It cautions against adding process before ambiguity, ownership, and exception paths are clear.[2]

## Design implication for ASaaSI

ASaaSI should add a compact **Review Date Reconciliation** view to Activity. It should classify only open decisions by retained review-date state: dated review with owner, dated review without owner, owner without date, and neither field retained. Each row must keep the original evidence, original test, next review field, and direct accountability/source routes.

The view is a record-consistency aid. It should not decide which review is most urgent, calculate a health score, infer execution progress, auto-fill missing fields, send reminders, or create a task. Its visual grammar should be **Owner → Review date → Source**, expressed through linear state rules and quiet rectangular rows.

## Implementation and validation notes

Activity now includes a bilingual **Review Date Reconciliation** view for open decisions. It groups retained records into owner with review date, review date without owner, owner without review date, and neither field retained. Each row retains the owner field, review point, original evidence, original test, direct source route, and direct decision-specific accountability route.

The view is intentionally a record-alignment aid, not an urgency engine. It does not score decisions, determine which review matters most, infer execution progress, auto-fill fields, create a task, or send reminders. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Activity and accountability returns were checked. The landing page remains unchanged.

## References

[1] [Pedowitz Group, “What’s the Best Cadence for Business Reviews?”](https://www.pedowitzgroup.com/best-cadence-for-business-reviews-weekly-monthly-quarterly)

[2] [YogoQ Core, “Decision Log Review Cadence”](https://core.yogoq.com/en-US/core/data-decision-log-review-cadence)
