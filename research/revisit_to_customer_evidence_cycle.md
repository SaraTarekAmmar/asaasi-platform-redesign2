# Open-question revisit to customer evidence: research cycle

## Research question

How can ASaaSI let a founder use a remaining uncertainty from a Weekly Review revisit as reference context for a fresh customer-evidence inquiry, without copying that uncertainty into new evidence or assuming the next customer interaction will resolve it?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Dovetail: Customer Discovery](https://dovetail.com/product-development/product-adoption/) | Discovery begins with an explicit hypothesis, tests that hypothesis, and uses customer input to validate or invalidate assumptions rather than substitute for it. | ASaaSI can carry the remaining uncertainty into Customer Evidence as a reference-only question. The founder must still author a fresh buyer, trigger, workaround, quote, success, action, and response threshold. |
| [Great Question: Research Repository](https://greatquestion.co/features/research-repository) | Research claims should remain backed by traceable source material; when evidence is absent, the system should not invent it. | ASaaSI can expose direct routes back to the revisit and original reading, but must not prefill a new claim, quote, customer observation, or conclusion. |

## Product decision

Build a bilingual **Open Question to Customer Evidence** handoff from a saved revisit acknowledgement. The founder opens Customer Evidence using a revisit ID. The tool shows the remaining uncertainty and the original source route as reference-only context, then requires every current evidence field to be freshly authored. The resulting Customer Evidence record retains the revisit source ID for traceability.

The handoff will not copy the revisit text into evidence, choose a customer, infer an answer, set an outcome, modify the source records, create a task or reminder, or state that the customer interaction validates or resolves the question.

## Validation plan

Confirm only saved revisit acknowledgements open the reference block, invalid IDs are ignored, the new Customer Evidence record has a unique ID and retains the revisit reference without overwriting it, every evidence input is fresh, English and Arabic RTL labels are correct, modified sources contain no em dashes, and the landing page remains unchanged.

## Workflow audit note

Customer Evidence already supports several source-reference routes, including saved customer evidence, completed decision reuse, event observations, and the weekly primary-bet research cadence. Each route retains context but keeps the customer-evidence inputs independently authored. The revisit handoff extends this same pattern: it resolves only a valid saved revisit note, displays the remaining uncertainty and recovery links as reference context, and saves the new record with a distinct `reusedFromRevisitId` rather than copying any source field.

## Implementation and validation notes

Weekly Review now exposes a bilingual **Fresh Customer Evidence** handoff after a saved Open Question Revisit. It displays the remaining uncertainty and makes clear that it is a reference, not a claim or evidence. Opening Customer Evidence with the revisit ID shows a source-reference block containing the remaining uncertainty, the original Founder Reading route, and the Weekly Review return route. Invalid or missing revisit IDs produce no reference state.

The Customer Evidence form remains fully fresh: it requires a new buyer, concrete moment, trigger, workaround, direct quote, success condition, meaningful action, and observable response rule. On save, the new uniquely identified Customer Evidence record retains the revisit ID only for traceability. It does not copy revisit content into evidence, infer an answer, select a customer, modify any source record, set an outcome, or create a task, reminder, priority, recommendation, or conclusion.

TypeScript and production builds pass. The handoff uses existing bilingual translations, RTL-safe source-reference surfaces, linear saffron labels, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
