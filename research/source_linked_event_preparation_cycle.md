# Source-linked event preparation: research cycle

## Research question

How can ASaaSI help a founder arrive at an event with a specific decision context and return point while avoiding auto-selected meetings, engagement scoring, attendance claims, or automated outreach?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Cvent Mobile Event Apps](https://www.cvent.com/en/event-marketing-management/mobile-event-apps) | Event apps commonly combine a personal agenda, appointments, event information, note-taking, and post-event summaries. Cvent also promotes recommendations and engagement scoring. | ASaaSI can preserve a founder-chosen event question, one linked decision, a factual observation field, and a return path. It will not add automated agenda recommendations, scoring, or inferred event results. |
| [Eventbrite: How to Organize a Networking Event](https://www.eventbrite.com/blog/how-to-organise-networking-event-ds00/) | Event follow-through benefits from capturing immediate feedback and allowing relationships to continue beyond the event. | ASaaSI can retain a source-linked preparation checklist and editable follow-up recovery path. It will not send communications, claim a relationship, or treat attendance as proof of a useful outcome. |

## Product decision

Build a bilingual **Source-linked Event Preparation Checklist** for retained registered event records. The founder can consciously attach one open decision, see its existing original evidence and test as source context, write or revise an event question, and retain a small preparation checklist. The preparation record should lead back to the event, the linked decision, and its accountability editor.

The checklist will be an event-context and source-recovery aid, not an event scorecard. It must not recommend people, sessions, or goals; infer meeting quality or event ROI; auto-complete items; create reminders; send outreach; or modify the linked decision's evidence, owner, status, or review timing.

## Validation plan

Confirm English and Arabic RTL rendering, selected-decision recovery, empty open-decision state, source routes, saved checklist behavior, responsive composition, no em dashes in modified sources, and an unchanged landing page.

## Implementation and validation notes

Events now adds a bilingual **Source-linked Event Preparation Checklist** directly after the existing preparation desk. Once a founder saves preparation for the featured room, the checklist shows the retained event source, the exact selected decision source when one is linked, its original evidence, original test, review point, source route, and decision-specific accountability route. It also retains three founder-marked preparation checks: read the decision source, read the room question, and prepare one factual observation. Each mark is explicit and manually toggled.

The feature extends the retained event record with a small `eventPreparation` field. Existing event, Activity, observation, and follow-up records remain compatible. A founder can revise the focused room question and selected decision without a new record. The source-linked checklist remains available when no decision is selected, plainly describes that gap, and does not manufacture missing context.

The checklist is intentionally not a meeting recommendation or event-management engine. It does not recommend people or sessions, infer attendance or event ROI, auto-complete items, create reminders, send outreach, alter a linked decision, or claim an event result. Cvent and Bizzabo expose agenda, appointment, engagement, and measurement features; ASaaSI adopts only the founder-controlled context and return-path principle while rejecting scoring and automated recommendations. Eventbrite's follow-up guidance supports keeping a factual post-event handoff available without treating a connection as established.

TypeScript and production builds pass. Authenticated Arabic and English Events views were reviewed, along with desktop and 375px mobile compositions. The modified sources contain no em dashes. The landing page remains unchanged.
