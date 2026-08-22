# Founder reading to review agenda: research cycle

## Research question

How can ASaaSI let a founder carry one unresolved, source-linked reading into a weekly review agenda without auto-selecting a priority, assigning work, or turning the note into a decision outcome?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Zoom: Meeting Agenda Examples](https://www.zoom.com/en/blog/meeting-agenda-examples/) | Useful agendas clarify purpose and make relevant material available as pre-read context before discussion. | ASaaSI can carry one selected founder reading into a clearly labelled review pre-read, while keeping the underlying event and decision source routes visible. |
| [Productboard: Meeting Agenda Generator](https://www.productboard.com/product-management-prompts-library/meeting-agenda-generator/) | Effective agendas name item type, meeting goal, decision context, owner, time boundaries, and what is outside scope. Productboard also encourages decision and action capture. | ASaaSI can carry a founder-selected reading as a discussion input with an open question and source path. It will not assign a time block, owner, decision, action, or outcome automatically. |

## Product decision

Build a bilingual **Founder Reading Review Handoff**. The founder selects one saved evidence reading in Activity and explicitly adds it as a separate, source-linked review agenda item. Weekly Decision Review exposes that selected item as a pre-read with the founder’s interpretation, open question, event route, decision route, and decision-specific accountability path.

The handoff is an agenda input, not a recommendation or execution engine. It will not choose the reading, rank it, schedule a meeting, assign an owner, declare an agenda priority, make or update a decision, create a task or reminder, or alter the original reading and source records.

## Validation plan

Confirm only saved founder readings can be carried, the selected handoff persists separately, the weekly review exposes original source routes and labels the item as an author reading, source records remain unchanged, English and Arabic RTL labels are correct, modified sources contain no em dashes, and the landing page remains unchanged.

## Activity audit note

Founder Evidence Reading already persists a separate author note with an event source, decision source, interpretation, and open question. Weekly Decision Review already brings together retained decision evidence but had no safe way to expose a founder reading as a pre-read. The new handoff follows the reading workspace in Activity and creates a second, separate agenda-input note that references the reading ID. Weekly Review resolves the original reading and its source pair from that pointer instead of copying or altering their contents.

## Implementation and validation notes

Activity now includes a bilingual **Founder Reading to Review** handoff. A founder chooses one saved founder reading, checks the author interpretation, open question, and paired event and decision source paths, then explicitly adds it as a review pre-read. This saves a separate agenda-input record with the founder reading ID. A reading can only be carried once through this control, and selecting it never changes the reading, source event, source decision, owner, review date, outcome, or follow-up state.

Weekly Decision Review now resolves the most recently carried reading into a **Founder Reading Pre-read** before the decision agenda. It keeps the founder’s original wording, open question, event route, decision route, and decision-specific accountability route in view. The pre-read is explicitly not a verified pattern, primary bet, outcome, recommendation, or instruction. It does not rank readings, set a meeting, assign ownership, create a task or reminder, select a decision, or turn evidence into a conclusion.

TypeScript and production builds pass. The Activity handoff and Weekly Review pre-read use existing bilingual translations, RTL-safe soft rectangular panels, linear saffron labels, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
