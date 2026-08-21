# Experiment Reuse and Monthly Evidence Review Research

**Research date:** 21 August 2026  
**Scope:** Reusing prior experiment context, reusable hypothesis handoffs, and continuous evidence review.

## Evidence-led findings

Railsware distinguishes a hypothesis from an idea by requiring a testable, specific relationship between defined variables and confirmation criteria. Prior work can accelerate a new test, but a reusable starting point still needs a fresh problem statement, variable choice, and validation condition; copying an earlier outcome as a new prediction weakens accountability [1].

Product Talk frames continuous discovery as small, weekly customer touchpoints connected to a desired outcome. It recommends surfacing hidden assumptions and collecting specific past-behaviour stories, reinforcing that reused learning should provide context for the next question rather than replace a current conversation [2].

Miro’s continuous-discovery guidance similarly treats shared learning as a living space for interview snapshots, opportunity context, tests, and fresh decisions. It recommends small, focused tests that answer a clear question, then feeding the learning back into prioritization instead of treating past evidence as permanent [3].

## Product implication

The next release should add a **Reuse as a New Test** handoff from a selected record in the Decision Comparison Desk. It may carry only the source provenance, buyer or context evidence, and original test question into an appropriate workbench. The founder must author a new observation, reversible change, and response threshold. The handoff must label the source record as reference context, never duplicate a prior outcome, status, or decision rule, and must preserve a direct route back to the original record.

Browser review of Miro confirmed the value of a persistent, topic-led index for discovery work and a shared visual context where interview snapshots, opportunities, and tests remain distinguishable. ASaaSI should preserve that distinction in the reuse handoff: a source reference remains visible at the top of the new workbench, while the new test must explicitly state its own current observation and response threshold.

## ASaaSI audit and selected scope

The Decision Comparison Desk now shows the retained context for two sources but ends at review. Customer Evidence already has the strongest source-aware workbench pattern: it distinguishes a direct saved-interview revisit from a primary-bet-linked research plan, persists a new dated record, and requires factual past behaviour plus a fresh response rule. It is therefore the appropriate first reusable experiment destination.

The selected release adds **Reuse as a new customer test** actions to both selected comparison records. The handoff passes only the chosen source ID. Customer Evidence will show the original title, provenance, evidence excerpt, and original test as reference context. It will optionally prefill a retained buyer context where one exists, but will require a new concrete moment, trigger, workaround, exact quote, buyer-defined success condition, meaningful action, and new observable response rule. The saved record will retain `reusedFromDecisionId` for traceability, while no outcome, outcome claim, status, working principle, or threshold is copied.

## Implementation validation notes

The production build and TypeScript check pass after implementation. The authenticated browser sample currently contains one decision record, so the intentional two-record comparison boundary cannot render the reuse actions without fabricating a second founder record. Customer Evidence was opened with a non-matching test source ID to confirm the standard empty, required-field path remains intact; the reference block is conditional and will render only when a retained decision ID is supplied by the comparison action. Final visual validation should use a genuine two-record founder workspace or a user-created second record rather than test data.

## Design constraints

The reuse handoff will use ASaaSI’s warm off-white editorial base, deep navy hierarchy, narrow saffron provenance cues, soft rectangular controls, Arabic RTL parity, and no circles or rings. It will not modify the landing page.

## References

[1] [Railsware, “How to Generate and Validate Product Hypotheses”](https://www.railsware.com/blog/product-hypotheses/)  
[2] [Product Talk, “Everyone Can Do Continuous Discovery”](https://www.producttalk.org/getting-started-with-discovery/)  
[3] [Miro, “A guide to continuous product discovery”](https://miro.com/product-development/continuous-discovery/)
