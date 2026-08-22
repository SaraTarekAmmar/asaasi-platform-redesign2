# Revisit-source customer evidence archive: research cycle

## Research question

How can ASaaSI let a founder find fresh customer-evidence records that originated from a remaining uncertainty, while retaining the original question and source path without implying that a grouped archive confirms or resolves anything?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Herbig: Evidence-informed Product Discovery](https://herbig.co/product-discovery-decisions/) | Evidence gains meaning from its context. Proximity and commitment can clarify the limits of a piece of evidence rather than converting it into a generic score. | ASaaSI can keep the original remaining uncertainty next to freshly captured customer records, while avoiding strength scores, combined conclusions, or automated judgments. |
| [Marvin: Research Repository](https://heymarvin.com/resources/research-repository) | A usable repository makes research accessible and traceable to underlying data, helping teams avoid duplicated inquiry. | ASaaSI can group fresh customer evidence by its revisit source and preserve direct routes back to both the revisit and original reading, without treating grouping as proof. |

## Product decision

Build a bilingual **Revisited Question Evidence Archive** in Activity. It will show only Customer Evidence records with a retained `reusedFromRevisitId`, grouped under their original remaining uncertainty. Each group will show direct recovery to the revisit, founder reading, and individual customer-evidence source records.

The archive will be a source-retrieval aid. It will not calculate evidence strength, counts, agreement, conflict, confidence, validation, an answer, a decision, or an outcome. It will not mutate, merge, select, rank, or summarize the source records.

## Validation plan

Confirm only Customer Evidence records with a valid revisit reference appear, missing source notes are disclosed without reconstruction, direct recovery routes remain visible, English and Arabic RTL labels are correct, mobile and desktop panels remain readable, modified sources contain no em dashes, and the landing page remains unchanged.

## Activity audit note

Activity already holds the Founder Evidence Reading archive, founder-reading agenda handoff, and several source-oriented review tools. Fresh Customer Evidence records retain a revisit reference but had no dedicated way to retrieve the customer facts alongside the uncertainty that motivated them. The new archive therefore sits after the founder-reading handoff and before event-source reviews. It groups only Customer Evidence records that explicitly retained a revisit ID and leaves each customer record independent.

## Implementation and validation notes

Activity now includes a bilingual **Revisited Question Evidence Archive**. It groups fresh Customer Evidence by the retained revisit source ID and shows the original remaining uncertainty, direct Weekly Review revisit route, optional Founder Reading route, and individual Customer Evidence source routes. Each record displays only its own buyer, concrete customer moment, direct quote, and response rule. Missing revisit notes are disclosed as unavailable rather than recreated.

The archive is a source-retrieval aid, not a synthesis engine. It does not score, count agreement, infer confidence, validation, conflict, quality, causality, a combined answer, decision, or outcome. It does not modify, merge, rank, select, or summarize the records. A group does not claim that the question is answered or that customers agree.

TypeScript and production builds pass. The archive uses existing bilingual translations, RTL-safe soft rectangular source panels, linear saffron provenance rules, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
