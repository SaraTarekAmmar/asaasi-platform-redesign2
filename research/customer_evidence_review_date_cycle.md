# Customer evidence review-date editor: research cycle

## Research question

How can ASaaSI let a founder adjust the review date attached to a saved Customer Evidence record without turning timing into an automatic urgency score, task queue, reminder, or assessment of evidence quality?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Plane: Decision Log](https://plane.so/blog/decision-log-what-it-is-why-teams-use-it-and-template) | A structured decision record preserves reasoning, ownership, and later review context so decisions can be revisited rather than restarted. | ASaaSI can expose a review date as an explicit founder-editable field on the saved evidence record, preserving the surrounding source and reasoning. |
| [Mixpanel: Product Discovery](https://mixpanel.com/blog/what-is-product-discovery/) | Product discovery challenges assumptions using customer data and treats research artifacts as living documents that should be revisited and improved. | ASaaSI can allow a founder to revise when an evidence record will be revisited, while keeping the date separate from whether the evidence is good, conclusive, urgent, or validated. |

## Product decision

Build a bilingual **Customer Evidence Review Point** editor immediately after a Customer Evidence record is saved. The founder sees the current saved review date, chooses a new calendar date, and explicitly saves the revised timing. The editor updates only the record’s existing review-date fields.

The review point is a cadence record, not an action engine. It will not score urgency, assess evidence quality or freshness, set a task, send a reminder, update a source, select a next action, or claim that a date resolves an assumption.

## Validation plan

Confirm the editor appears only for a saved Customer Evidence record, updates only its review timing, preserves customer-evidence fields and source references, supports English and Arabic RTL, has responsive layout and visible focus states, carries no em dashes in modified sources, and leaves the landing page unchanged.

## Workflow audit note

Customer Evidence already saves an ISO review date and source references with each record, then surfaces the record through Activity evidence and review views. The missing gap was a founder-controlled way to adjust the timing after the evidence record existed. The editor therefore appears only after saving Customer Evidence and updates only the existing record’s `reviewDue`, `reviewDate`, and Arabic review-date label.

## Implementation and validation notes

Customer Evidence now includes a bilingual **Founder-controlled Review Point** editor after a saved record. The founder sees the saved record and chooses a calendar date to revisit it. Saving preserves every customer-evidence field, source reference, owner, status, and decision relationship while updating only the review timing fields. The field uses an explicit calendar input and confirms the change in place.

The review point is intentionally a cadence field, not an execution engine. It does not score urgency, assess evidence quality or freshness, set a task, send a reminder, change a source, choose a next action, update an outcome, or claim the review date resolves an assumption.

TypeScript and production builds pass. The editor uses existing bilingual translations, RTL-safe soft rectangular surfaces, a navy heading rule, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
