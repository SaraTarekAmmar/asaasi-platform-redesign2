# Evidence Freshness Review Cycle

## Research question

How should ASaaSI help founders revisit open decisions whose evidence has not been refreshed recently without treating record age as a confidence score, automatically changing a decision, or inventing a next priority?

## External findings

Dovetail describes continuous discovery as a body of documented knowledge that informs prioritization, roadmap work, and design rather than a collection of standalone conversations.[1]

Miro describes continuous discovery as small, frequent customer-research loops that keep decisions grounded in current customer context and expose shaky assumptions early. It emphasizes recurring contact, but does not claim that simple recency substitutes for the content or quality of the evidence.[2]

## Design implication for ASaaSI

ASaaSI should add a bounded **Evidence Freshness Review** to Activity. It should show only open decisions and group them by the age of their latest retained evidence or reflection: no retained evidence, older evidence, and evidence updated recently. Each row should retain the source, latest evidence date, review timing, original test, and direct recovery route. It should make no quality score, no causal claim, no automatic status change, and no recommendation to abandon a decision.

The visual object should be an **Decision → Last evidence → Next review** ledger. “Older” is a cue to reopen the source and decide what to do, not a verdict about evidence quality. The review must state when a record has no timestamped evidence and keep unknown dates distinct from older dated evidence.

## Implementation and validation notes

Activity now includes a bilingual **Evidence Freshness Review** for open decisions only. It groups decisions into no retained evidence, undated context, evidence recorded over 21 days ago, and evidence recorded within 21 days. Each row retains its source, original test, latest separate evidence date, next review timing, direct decision-review route, and direct source route.

Only captured customer evidence, market evidence, and timestamped Friday reflections establish a separate evidence date. A later saved-record update does not count as fresh evidence. The review never scores evidence, judges quality, changes a decision status, infers a trend, recommends abandonment, or chooses a priority. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Activity returns were checked. The landing page remains unchanged.

## References

[1] [Dovetail, “Continuous Discovery: What It Is and How to Practice It”](https://dovetail.com/research/continuous-discovery/)

[2] [Miro, “What is Continuous Discovery?”](https://miro.com/product-development/continuous-discovery/)
