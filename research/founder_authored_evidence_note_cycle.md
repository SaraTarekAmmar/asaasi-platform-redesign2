# Founder-authored evidence note: research cycle

## Research question

How can ASaaSI let a founder retain their own bounded interpretation after comparing one event source with one decision source, without generating the interpretation automatically or mutating either original record?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Dovetail: Research Synthesis](https://dovetail.com/research/research-synthesis/) | Synthesis comes after collection and before reporting. It organizes and interprets source data, but rigorous work remains grounded in what participants said or did. | ASaaSI can provide a founder-written note attached to selected source IDs and explicit evidence excerpts. It will not create the note, determine a pattern, or replace the underlying records. |
| [Great Question: Research Synthesis](https://greatquestion.co/blog/research-synthesis) | Strong synthesis tracks sources, considers contradiction, and carries enough context for later reuse. Pattern claims need cross-study context, rather than an isolated anecdote. | ASaaSI can require a founder to state a bounded reading and the next question, while labelling the note as a founder interpretation, not a confirmed pattern or decision result. |

## Product decision

Build a bilingual **Founder Evidence Reading Note** after the Event and Decision Evidence Desk. The founder selects one observed event and one decision source, writes an interpretation, names a next question, and saves a separate source-linked note. The note preserves the paired source IDs and routes, but never changes the event, decision, follow-up, owner, review date, or outcome.

The note is not an automated synthesis or a new decision. It will not infer a pattern, claim confirmation or contradiction, score evidence, create a task, reminder, event registration, decision, outcome, follow-up, or customer test. It will retain explicit founder-authored language and a direct reopen route for both sources.

## Validation plan

Confirm the founder must author both fields, only factual event observations can be paired, the note is stored separately from source records, direct source recovery remains available, notes are clearly labelled as interpretations, English and Arabic RTL labels are correct, modified sources contain no em dashes, and the landing page remains unchanged.

## Activity audit note

The Event and Decision Evidence Desk exposes a useful source pair but deliberately has no place for the founder’s own bounded reading. Storing that reading on the event or decision record would falsely make it part of the source itself. The new note therefore persists as a separate `note` workflow record after the evidence desk and before the Event Debrief Source Review, with the two source IDs carried in a dedicated founder-evidence-reading field.

## Implementation and validation notes

Activity now includes a bilingual **Founder Evidence Reading** workspace. A founder selects one observed event and one retained decision, reads a short factual source strip, then must author both an interpretation and an open next question before saving. The saved reading creates a new note record that retains the two source IDs, authored interpretation, open question, timestamp, and direct source paths. Recent notes remain clearly labelled as founder readings rather than results.

The reading is intentionally not a verified pattern, automatic synthesis, or decision update. ASaaSI does not generate, score, validate, or otherwise edit the interpretation. Saving the note does not alter either source event or decision, their owners, dates, outcomes, follow-ups, or evidence. It does not create a task, reminder, event registration, decision, outcome, follow-up draft, or customer test.

TypeScript and production builds pass. The component uses existing bilingual translations, RTL-safe soft rectangular surfaces, linear saffron source labels, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
