# Experiment Brief to Follow-up Cycle

## Research question

What is the highest-value missing capability between a founder's completed tool outcome and the next grounded action, while preserving evidence, avoiding copied conclusions, and keeping the workflow simple enough for an early-stage SaaS founder?

## External findings

Product Talk’s continuous-discovery guidance recommends a recurring customer cadence, collecting specific stories about past behavior rather than speculative answers, and sharing a concise interview snapshot rather than relying on raw recordings or sprawling notes. It also emphasizes retaining the visible decision points that connect customer feedback loops to the next action.[1]

Amplitude’s experiment guidance begins with a clear problem and purpose, then defines a hypothesis consisting of the problem, a proposed solution, and a predicted result. It further recommends a concrete metric, a deliberately scoped variant, and a documented audience before results are interpreted.[2]

Statsig keeps experiment results accessible after a recorded decision, but freezes the historic result set at that point. This reinforces that a completed outcome remains a recoverable source rather than a living, silently changing conclusion.[3]

Dovetail’s customer-intelligence model foregrounds source context: who said something, when, and why it matters. Its stated trust model requires AI-generated insight to link back to source material, rather than presenting an uninspectable answer.[4]

## Design implication for ASaaSI

ASaaSI already retains evidence, original test, outcome, working principle, review date, and source recovery for tool records. Pricing has a source-linked fresh-test path. The next reusable capability should not be more automated interpretation. It should be a lightweight **experiment brief** for selected founder tools that adds one missing decision-ready structure: a clearly stated problem, a proposed move, and an observable return signal, all authored by the founder and persisted on the new record.

The immediately most valuable use is a **SaaS Health outcome → fresh health check** handoff. A closed health record can provide reference-only context, while a new check should require a fresh target metric, current baseline, specific intervention, audience or account cohort, return signal, and dated review. The design should use ASaaSI’s linear state and editorial ledger language, not a generic analytics dashboard or scorecard.

## Implementation and validation notes

Activity now exposes a dedicated Health outcome recovery rail whenever there are completed SaaS Health records. Each source shows its explicit Keep, Change, or Stop outcome, original title, retained evidence excerpt, direct decision review, and **Open fresh health check** route. The recovery route resolves only a completed SaaS Health record and renders its evidence and original intervention as source context. It still requires a founder to provide a current cohort, new signal inputs, a reversible intervention, and a new observable change.

Fresh SaaS Health records retain `reusedFromDecisionId`. The cycle also corrects a traceability risk in Pricing and Health: each new saved test now receives a unique record ID, so a fresh record cannot overwrite the completed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Health returns were checked; the landing page remains unchanged.

## Guardrails

The improvement must not calculate a score, infer a diagnosis, prescribe a conclusion, copy a prior threshold, or convert a reported metric into a causal claim. It should not make circles, rings, or broad saffron panels. The landing page remains untouched.

## References

[1] [Product Talk, “Everyone Can Do Continuous Discovery—Even You! Here’s How”](https://www.producttalk.org/getting-started-with-discovery/)

[2] [Amplitude, “Feature Experiment Overview”](https://amplitude.com/docs/feature-experiment/overview)

[3] [Statsig, “Make a Decision”](https://docs.statsig.com/experiments/ending/make-decision)

[4] [Dovetail, “Customer Intelligence Platform”](https://dovetail.com/)
