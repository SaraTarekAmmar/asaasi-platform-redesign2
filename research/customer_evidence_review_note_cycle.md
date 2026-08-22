# Customer evidence review note: research cycle

## Research question

How can ASaaSI let a founder record a short review note beside a saved customer-evidence record while keeping raw customer facts, interpretation, and remaining uncertainty visibly distinct?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Nielsen Norman Group: Research Repositories](https://www.nngroup.com/articles/research-repositories/) | Central repositories retain notes, raw artifacts, insights, and reports as separate but accessible research materials. | ASaaSI can store a founder review note separately from Customer Evidence, link it back to the evidence record, and preserve a direct source route. |
| [Dovetail: Research Synthesis](https://dovetail.com/research/research-synthesis/) | Synthesis moves from raw information through coding and grouping to interpretation and documentation, with interpretation following review of available data. | ASaaSI can ask the founder to state an authored reading and remaining uncertainty, while explicitly avoiding automatic pattern, conclusion, or decision claims. |

## Product decision

Build a bilingual **Founder Evidence Review Note** after the review-date editor on a saved Customer Evidence record. The founder must author two short fields: what the evidence changes or leaves open, and what remains to be revisited. Saving creates a separate note record with the Customer Evidence ID and direct source route.

The note will be a founder interpretation, not a verified finding. It will not modify Customer Evidence, score evidence, create an outcome, set a priority, select a decision, create a task or reminder, or infer an answer from one customer fact.

## Validation plan

Confirm both fields are founder-authored, the note persists separately, original Customer Evidence remains unchanged, direct source recovery is present, English and Arabic RTL copy is correct, modified sources contain no em dashes, and the landing page remains unchanged.

## Workflow audit note

Customer Evidence now retains customer facts, a founder-controlled review date, and source references. A date alone does not capture what the founder learned or still needs to examine. The new review note therefore appears only after a Customer Evidence record is saved, creates its own note record, and points back to the Customer Evidence ID. Activity exposes these author notes separately beside their underlying customer facts.

## Implementation and validation notes

Customer Evidence now includes a bilingual **Founder Evidence Review Note**. The founder must write both a reading of what the customer fact changed or left open and a remaining question. Saving creates a separate note record with the Customer Evidence ID, authored fields, timestamp, and original source route. Activity now provides a bounded review-note archive showing the source customer fact, founder reading, remaining open question, and direct route back to the original evidence.

The note is intentionally not a verified finding, a merged customer insight, or a decision update. It does not change Customer Evidence, merge customer facts, score evidence, infer a pattern, confidence, validation, causality, outcome, or answer. It creates no priority, recommendation, task, reminder, meeting, follow-up, or test.

TypeScript and production builds pass. The form and Activity archive use existing bilingual translations, RTL-safe soft rectangular source surfaces, linear saffron labels, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
