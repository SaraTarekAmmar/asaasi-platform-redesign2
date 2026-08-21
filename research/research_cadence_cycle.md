# Research Cadence and Event Follow-Through Research

**Research date:** 21 August 2026  
**Scope:** Founder customer-research rhythm, decision-linked conversations, and event follow-through.

## Research findings

Wren Lanier’s weekly-cadence guidance focuses on protected recurring time for a small number of lightweight research conversations. The useful pattern is not a fixed meeting day or scheduling product; it is a bounded weekly research block that keeps discovery small, iterative, and connected to a synthesis step shortly afterward [1]. Browser review confirmed that this cadence reduces the coordination burden and puts customer language back into planning discussions.

Productboard frames continuous discovery as repeated customer interaction in pursuit of a clear product outcome. Its key product mechanics are linking insight sources to the work they inform and retaining a path back to the original customer words, rather than treating research notes as a separate library [2]. Browser review confirmed an outcome → opportunity → test progression rather than a disconnected meeting log.

Product Talk similarly treats product discovery as customer-inclusive decision-making, with regular interviewing to limit the number of decisions made without customer input. It separates customer interviews, which reveal opportunities, from assumption testing, which compares solutions [3]. Aha! reinforces that discovery inputs must enter a decision path, otherwise valuable customer insight is forgotten rather than implemented [4].

## Product implication

The next ASaaSI release should add a conditional **Research Cadence Prompt** to Weekly Review and the Founder Operating Desk. When a primary bet is active, the founder selects the one customer conversation or evidence move most likely to reduce the current bet’s uncertainty. The prompt captures one focused question, the buyer context, the due date, and the observable reply that will change the decision. It saves as a dated workflow decision connected to the original primary bet, not as a generic recurring task.

The result should be a planned research move, not a promise that an interview will occur. It should provide a direct bridge to Customer Evidence once the founder has spoken with the buyer. The current events workflow should contribute only when an event already contains a relevant linked decision; the research prompt should not create fake attendance or unrelated follow-up work.

## Design constraints

The cadence prompt will use ASaaSI’s warm off-white editorial surfaces, deep navy hierarchy, linear saffron provenance cues, soft rectangular controls, Arabic RTL parity, and no-circle rule. It will not modify the landing page.

## ASaaSI audit and selected scope

ASaaSI already has a strong weekly primary-bet cycle: founders choose one existing decision, record Friday intent, set a reminder, reflect, carry forward deliberately, or close with learning. However, the current system does not turn a selected primary bet into a specific customer conversation plan. Customer Evidence can capture a strong factual interview, but it opens as a separate workbench without a visible reason that this particular conversation matters to this week’s decision.

The selected release adds a **Research Cadence Prompt** directly below the active primary bet. It asks for one focused question, buyer context, date, and observable reply that would keep, change, or stop the approach. It saves this plan on the original primary-decision record for the current week, rather than creating a duplicate task. When saved, it exposes a direct route to Customer Evidence and appears as the next research move on the Founder Operating Desk.

Authenticated browser verification confirmed the prompt appears only with an active primary bet and carries fully localized Arabic RTL labels: إيقاع البحث, السؤال المركّز, سياق المشتري, بحلول متى, and الاستجابة التي تغيّر الرهان. The visual layout continues the existing editorial hierarchy without changing the landing page.

## Implementation outcome

The Research Cadence Prompt is now live in Weekly Review whenever a primary bet is active. The founder records one focused question, buyer context, due date, and response rule that would keep, change, or stop the current approach. This information is saved as a `researchCadence` object on the original primary-decision record for the active week. It is not a generic task and does not claim that an interview has happened or that a buyer will reply.

The Founder Operating Desk now surfaces the saved research move beside the active primary bet. Its direct Customer Evidence path carries the linked decision into the validation workbench, pre-fills only buyer context, preserves the planned date as the review point, displays the focused question and decision rule, and saves any resulting customer-evidence record back to the original decision via `linkedDecisionId`.

After visual review, the protected Founder Workspace, Weekly Review, and Customer Evidence returns were reinforced as distinct destination desks. Identity remains a clearly labelled return mechanism beneath the route-specific operating object. The review request to introduce circular or ring state markers was deliberately not implemented because it conflicts with ASaaSI’s explicit no-circle rule; linear saffron edges, rectangular state fields, rule-separated rails, and sequential numerals carry state instead.

TypeScript and production builds passed. Authenticated English and Arabic Weekly Review rendering confirmed the conditional cadence prompt and RTL localisation. Post-refinement mobile screenshots at 375px confirmed the three protected-return routes retain their route-specific evidence paths and legible soft editorial forms. The landing page remains unchanged.

## References

[1] [24 ways, “Creating a Weekly Research Cadence”](https://24ways.org/2016/creating-a-weekly-research-cadence/)  
[2] [Productboard, “Unlocking Sustained Success Through Continuous Product Discovery”](https://www.productboard.com/blog/unlocking-sustained-success-through-continuous-product-discovery/)  
[3] [Product Talk, “Product Discovery Basics”](https://www.producttalk.org/product-discovery/)  
[4] [Aha!, “Product discovery and the discovery process explained”](https://www.aha.io/roadmapping/guide/what-is-product-discovery)
