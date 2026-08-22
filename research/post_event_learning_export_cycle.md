# Post-event learning export: research cycle

## Research question

How can ASaaSI help a founder retain an event’s planned context, factual observation, and direct decision return path in a reviewable post-event artifact without judging event success or generating an automatic conclusion?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Cvent: 13 Event Debrief Questions](https://www.cvent.com/en/blog/events/event-debrief-questions) | A useful debrief gathers pre-event documentation and event information, then makes time to discuss what worked, what did not, and what should change next. Cvent also centres event data, feedback, and measurement. | ASaaSI can retain the founder’s pre-event question, factual room observation, linked decision source, and recovery path in a reusable artifact. It will not assess attendance, calculate ROI, or decide whether an event worked. |
| [Goldcast: Event Debrief Template](https://www.goldcast.io/blog-post/post-event-debrief-template) | Post-event reviews often separate what was planned, what happened, why differences appeared, and what can be learned. The guidance also uses event KPIs and business-outcome analysis. | ASaaSI can maintain a founder-authored source record with a clear fact-versus-learning boundary. It will not infer causes, generate recommendations, score outcomes, or turn attendance and conversations into business evidence. |

## Product decision

Build a bilingual **Post-event Learning Export** in Activity for retained event records with a factual observation. The founder chooses one event record and downloads a Markdown artifact containing only the retained preparation question, room observation, optional linked decision context, event outcome label when explicitly saved, follow-up draft metadata when explicitly saved, and direct source routes. The document must call out missing fields without filling them.

The export is a review artifact, not a post-event scorecard. It will not calculate event performance, attribution, event ROI, attendance quality, conversion, or a conclusion. It will not create a decision, outcome, task, reminder, or communication.

## Validation plan

Confirm only retained observed event records are selectable, a user controls the selected record and download, original source paths remain present, Arabic RTL output is translated, empty states are explicit, source records remain unchanged, modified sources contain no em dashes, and the landing page is unchanged.

## Activity audit note

Activity already separates factual room observations, direct event recovery, linked decision context, and optional editable follow-up drafts. The most useful next artifact is therefore a founder-selected one-event export placed immediately after the Event Debrief Source Review and before the follow-up drafting desk. This placement retains the source-first sequence: reopen event context, prepare a bounded learning artifact, then independently decide whether a follow-up draft is appropriate.

## Implementation and validation notes

Activity now includes a bilingual **Post-event Learning Export** for event records that retain a factual room observation. A founder selects one observed event and downloads a Markdown artifact containing the retained preparation question, factual room observation, explicit event label when saved, optional linked decision context, optional follow-up metadata, checked missing fields, and direct return paths. The source preview keeps the event and decision links visible before download.

The document is deliberately a review artifact rather than an event report card. It does not calculate attendance, event performance, event ROI, conversion, attribution, quality, causality, or a conclusion. It does not create decisions, outcomes, tasks, reminders, messages, or follow-up drafts. A missing field is named plainly and no source data is altered by the export.

TypeScript and production builds pass. The component uses existing Activity translations, RTL-safe soft rectangular surfaces, narrow saffron provenance, and the same download behavior as the validated Monthly Decision Review. The modified sources contain no em dashes, and the landing page remains unchanged.
