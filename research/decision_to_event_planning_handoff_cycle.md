# Decision-to-event planning handoff: research cycle

## Research question

How can ASaaSI let a founder take one existing open decision into a relevant event-preparation path while preserving original source context and avoiding automatic relevance judgments, scoring, or new task state?

## External patterns reviewed

| Source | Observed pattern | Bounded ASaaSI interpretation |
| --- | --- | --- |
| [Monday.com: Event Management Guide](https://monday.com/blog/marketing/event-management/) | Modern event operations commonly centralize goals, timelines, stakeholders, and reusable checklists. The guide also promotes dashboards, automation, and AI-led risk insights. | ASaaSI can offer an explicit founder-selected event-planning route that carries one decision’s original context into a room. It will not create a project plan, timeline, risk score, automation, or operational task system. |
| [Productboard: Link feedback to feature ideas via insights](https://support.productboard.com/hc/en-us/articles/360056354514-Link-feedback-to-feature-ideas-via-insights) | A source record can be linked to one or more work items while retaining the original feedback and allowing the link itself to be removed without destroying the source. Productboard also supports importance scoring and AI suggestions. | ASaaSI can preserve a voluntary, removable decision-to-event link and expose the original decision evidence, test, owner, and review point as reference context. It will not assign importance, aggregate signals, recommend an event, or use automated matching. |

## Product decision

Build a bilingual **Decision-to-Event Planning Handoff** in Activity for open decisions. A founder selects one retained open decision, then deliberately opens Events with its ID as source context. Events treats the decision as reference-only: it preselects the existing decision in the preparation desk, shows source context, and requires the founder to write or revise the room question before saving event preparation.

The handoff is an intentional bridge between two existing workspaces, not a recommendation engine. It must not choose an event, register the founder, create a new decision, copy the decision’s evidence into the event record, change a decision owner or review date, create tasks, set reminders, or determine that an event will change the decision.

## Validation plan

Confirm the Activity source picker includes only open decisions, Events accepts a valid decision query ID as reference context, the founder still controls the event question and save action, invalid or completed decision IDs do not preselect a record, Arabic RTL carries the handoff language, source routes stay direct, modified files have no em dashes, and the landing page is unchanged.

## Activity audit note

The Activity workspace already retains a compact Cross-Tool Decision Archive and connected decision-review, accountability, and event-preparation routes. The new handoff belongs after the archive and before the monthly export because it is a forward-looking planning bridge rather than a review lens or completed-learning artifact. Its picker considers only open decision records. The selected source remains visible with its original test, owner, review point, and direct recovery links before any Events route is opened.

## Implementation and validation notes

Activity now includes a bilingual **Decision-to-Event Planning Handoff** for open decisions. A founder selects one live decision in Activity and sees its retained source context, original test, owner, review point, direct source route, and decision-specific accountability route. The founder can then open Events through an explicit `?decision=` route. Events recognizes only a valid open decision ID and preselects it in the existing preparation desk as reference-only context.

No event preparation is created by the handoff. The founder still writes or revises the room question, chooses whether to save preparation, and can remove the decision link before saving. Unknown, completed, or unavailable decision IDs are ignored. The link does not select an event, register attendance, copy decision evidence into an event record, alter owner or review timing, create a task, set a reminder, or claim that a room will change the decision.

TypeScript and production builds pass. Authenticated English and Arabic RTL Activity views were reviewed with a retained open decision, and the handoff keeps direct source and accountability recovery visible. The modified sources contain no em dashes. The landing page remains unchanged.
