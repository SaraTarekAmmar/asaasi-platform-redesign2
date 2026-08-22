# Event Debrief Source Filters Cycle

## Research question

How should ASaaSI help founders review retained event observations and follow-up work by source without turning partial room notes, attendance, or a drafted message into a fabricated event outcome?

## External findings

Guidebook recommends a structured, timely event debrief that captures feedback and concrete improvements. Its guidance emphasizes a defined archive, specific feedback rather than vague impressions, named owners, deadlines, and review of prior debriefs before planning the next event.[1]

HeySummit separates source facts, interpretation, proposals, decisions, ownership, and follow-up. Its event debrief guidance is explicit that data limitations and unknowns should remain visible, and that a small committed list is more useful than a long unranked set of suggestions.[2]

## Design implication for ASaaSI

ASaaSI should add a compact **Event Debrief Source Review** to Activity. It should filter retained event records by factual observation, follow-up draft status, and linked decision, while each row keeps the original event source, dated observation, assigned next move, due date, and direct recovery route. It must not count observations as outcomes, infer a causal pattern, equate a follow-up draft with an action sent, or make a market conclusion from event attendance.

The visual object should be an **Event → Fact → Follow-through** source ledger. Filters are navigation aids, not analytical conclusions. The same output explicitly signals missing observation, missing next move, or missing review date rather than filling gaps with predictions.

## Implementation and validation notes

Activity now includes a bilingual **Event Debrief Source Review**. Founders can filter retained event context by factual observation, saved follow-up draft, linked decision, or no follow-up draft. Each source row preserves the event, date, factual room observation, current follow-through status, direct event route, linked decision route when present, and a focused draft or revise follow-up route.

The review does not count attendance, draft status, or linked decisions as event outcomes. It does not infer a causal pattern, synthesize a market conclusion, score events, or select a priority. When a source lacks a factual observation or follow-up draft, the UI names that gap rather than filling it. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Activity returns were checked. The landing page remains unchanged.

## References

[1] [Guidebook, “What is an Event Debrief Template?”](https://www.guidebook.com/glossary/what-is-event-debrief-template)

[2] [HeySummit, “Event Debrief Template: Turn Event Results Into Clear Next Actions”](https://heysummit.com/blog/event-debrief-template)
