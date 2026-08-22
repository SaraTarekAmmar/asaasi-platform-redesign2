# Outcome-to-Tool Recovery Cycle

## External findings

Mixpanel describes structured experimentation as hypothesis-driven, data-informed, and iterative. Its guidance emphasizes defining a specific success metric and guardrails before a test, then using a shared result repository to form later hypotheses rather than treating a result as automatically reusable.[1]

Product Talk frames modern discovery around learning quickly and progressing from outcomes to the next question, rather than treating outputs as the goal.[2] For ASaaSI, a completed outcome should therefore be reference context for a deliberately new bounded test, not copied into a replacement experiment as a conclusion.

## ASaaSI implication

The most useful next handoff is from a closed source decision to one practical founder tool that requires a fresh test, response threshold, and dated review. The source outcome, evidence, and original test should remain visible while the next tool preserves its own founder-authored fields. This should never move a source outcome, working principle, or threshold into the new record automatically.

## ASaaSI audit and selected scope

Completed Tool Experiment Archive already preserves closed founder-tool records and has a bounded comparison desk. Customer Evidence already supports a source-reuse path, but closed pricing decisions could not reopen a fresh pricing workbench with their original evidence visibly retained. The pricing workbench already requires its own buyer, alternative, promise, price, conversation set, close-rate assumption, and dated seven-day review, making it the safest first non-customer-evidence recovery destination.

The selected enhancement is a bilingual **Completed Pricing Outcome → Fresh Pricing Test** handoff. It will appear only for a completed Pricing Decision record in the completed-tool archive. Pricing will render the old title, Keep/Change/Stop outcome, evidence, and original test as source reference. It will not prefill the new buyer, alternative, promise, price, conversation set, close-rate assumption, or review point. The new record will retain `reusedFromDecisionId` for traceability.

## Implementation and validation notes

Completed Tool Experiment Archive now shows **Open fresh pricing test** only for closed Pricing Decision records. Pricing reads the selected source from the query, verifies that it is a completed pricing record, displays its outcome, retained evidence, and original test as source reference, and saves the fresh pricing test with `reusedFromDecisionId`. Every new pricing field remains empty and required: buyer, alternative, promise, price, conversation set, close-rate assumption, and dated review. No prior outcome, working rule, or response threshold is copied.

TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Pricing and Activity returns were checked after the visual refinement. Pricing now uses a dedicated Buyer → Value → Price return ledger, while Activity registrations uses a commitment-return ledger with an explicit identity checkpoint. Circular nodes and rings were not adopted because they conflict with ASaaSI’s no-circle rule; numbered linear state fields and narrow saffron current-step markers remain the visual grammar.

## References

[1] [Mixpanel, “What is product experimentation?”](https://mixpanel.com/blog/product-experimentation/)  
[2] [Product Talk, “The Evolution of Modern Product Discovery”](https://www.producttalk.org/evolution-product-discovery/)
