# Event-to-decision evidence comparison: research cycle

## Research question

How can ASaaSI let founders inspect a factual event observation beside one retained decision source without implying that the event proves, changes, or completes the decision?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Herbig: Evidence-informed Product Discovery Decisions](https://herbig.co/product-discovery-decisions/) | Product teams benefit from explicitly discussing evidence proximity and commitment rather than applying a rigid universal formula. First-hand and indirect sources carry different context. | ASaaSI can place factual room observations beside decision evidence while preserving source labels and differences. It will not score, weight, or declare one source stronger. |
| [Marvin: What Is a Research Repository](https://heymarvin.com/resources/research-repository) | A research repository is useful only when insights remain traceable to underlying raw material. | ASaaSI must keep direct event and decision routes, original test and preparation context, and the source record identities visible in every comparison. It will not summarize source material into an unsupported conclusion. |

## Product decision

Build a bilingual **Event and Decision Evidence Desk** in Activity. The founder explicitly selects one observed event and one retained decision. The desk places source context side by side: the event’s factual room observation, preparation question, and follow-through metadata beside the decision’s retained evidence, original test, owner, and review point. It gives direct event, decision, and accountability routes.

The desk is a comparison boundary, not evidence synthesis. It will not count supporting signals, score proximity or commitment, infer causality, claim confirmation or contradiction, alter a decision, create a conclusion, task, reminder, follow-up, or customer test.

## Validation plan

Confirm that only events with factual observations are selectable, all retained decisions may be used as context, both source routes remain visible, no record is changed when selections change, English and Arabic RTL labels remain correct, the desktop and mobile layouts remain readable, modified sources contain no em dashes, and the landing page remains unchanged.

## Activity audit note

Activity already contained a bounded two-decision comparison desk, cross-event observation review, event debrief source review, and decision-to-event planning handoff. None of those mechanisms let a founder inspect a factual room observation and a decision record side by side while preserving their difference. The Event and Decision Evidence Desk belongs after cross-event review and before event debrief source filtering, so founders can compare one selected source pair before choosing whether to reopen either detailed record.

## Implementation and validation notes

Activity now includes a bilingual **Event and Decision Evidence Desk**. A founder independently selects one observed event and one retained decision. The event source retains the factual room observation, preparation question, explicit event label, follow-through context, and direct event and event-debrief routes. The decision source retains original evidence, original test, owner, review point, decision status, direct source route, and decision-specific accountability route.

The desk makes a comparison boundary explicit. It does not score, weight, or count sources; infer confirmation, contradiction, causality, quality, or progress; change a decision; create a conclusion, task, reminder, follow-up, or customer test. Changing a selection does not persist or alter any workflow record. Only events with a factual room observation are available as event sources, and all retained decisions remain selectable as context.

TypeScript and production builds pass. The component uses existing bilingual translations, RTL-safe soft rectangular source panels, linear saffron provenance text, visible focus states, and responsive breakpoints. The modified sources contain no em dashes, and the landing page remains unchanged.
