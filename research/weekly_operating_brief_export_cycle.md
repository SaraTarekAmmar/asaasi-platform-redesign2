# Weekly Operating Brief Export Cycle

## Research question

How should ASaaSI turn its saved founder decisions, active experiments, and completed learning into a concise weekly operating brief without converting incomplete evidence into a scorecard, automated priority, or recommendation?

## External findings

Reforge describes operating cadence as a decision system rather than a synchronization ritual. Its example uses posted work-in-progress and a small set of explicit responses: move forward, bring the work into review, or escalate it for further input.[1]

Working Backwards describes a weekly business review as a recurring fact-based review of customer experience, business performance, and progress toward goals. It emphasizes that the review should surface initiatives to continue or problems to address rather than merely replay status.[2]

## Design implication for ASaaSI

ASaaSI should add a founder-owned **Weekly Operating Brief download** in Weekly Review. The brief should contain only persisted workflow records: the active primary bet when one exists, up to three current-week explicit Keep/Change/Stop outcomes, active review timing, and a bounded evidence-recovery route. It should state when there is no active primary bet or no completed current-week outcome. It must not calculate a health score, invent a priority, rank learnings, infer a trend, or create a task.

The interface should read as a **Decision → Evidence → Next review** editorial ledger. Export should create a local Markdown file for the founder, not send an email or imply an automated cadence.

## Implementation and validation notes

Weekly Review now exports a bilingual local Markdown **Weekly Operating Brief**. It retains the selected week, the primary bet, Friday intention, plan and carry-forward status, the primary reflection, one active research move when present, up to three explicit Keep/Change/Stop outcomes completed in the current week, and up to three nearest open decisions. Every exported learning and decision includes its original source route.

The export is intentionally bounded. It states when no primary bet, current research move, current-week completed outcome, or scheduled decision exists. It does not rank learnings, calculate a health score, infer a trend, choose a priority, create a task, send an email, or automate a cadence. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Weekly Review returns were checked. The landing page remains unchanged.

## References

[1] [Reforge, “Rethinking Your Operating Cadence”](https://www.reforge.com/blog/operating-cadence)

[2] [Working Backwards, “The Amazon Operating Cadence”](https://workingbackwards.com/concepts/amazon-operating-cadence/)
