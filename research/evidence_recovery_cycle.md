# Evidence Synthesis and Outcome Recovery Cycle

## External findings

Atlassian frames dynamic product discovery as continuous, integrated, and data-driven, with customer feedback and decision context centralized rather than separated from the work that follows.[1] The relevant ASaaSI interaction principle is a clear return path from a retained signal into the next bounded learning action.

Productboard describes discovery as iterative evidence gathering, assumption validation, and refinement, emphasizing early validation and adaptation based on feedback rather than treating a completed result as the end of learning.[2] This supports a recovery prompt that shows the source outcome but requires fresh founder-authored evidence fields.

## ASaaSI implication

ASaaSI should let founders reopen a saved event observation or completed outcome as reference context for a new Customer Evidence test. The recovery should preserve the original observation, linked decision, and original event route; require a new buyer moment, trigger, workaround, quote, success condition, action, and response rule; and never copy the previous outcome, operating rule, or threshold.

## ASaaSI audit and selected scope

Activity already preserves factual event observations, direct event follow-up drafts, and decision-linked event preparation. Customer Evidence already accepts a retained decision as a reusable reference, but an event observation has no direct route into a fresh customer test. A founder must manually reconstruct the room context even when it clearly implies a question worth taking to a buyer.

The selected enhancement is a bilingual **Event Observation → Customer Evidence** recovery path. Activity will expose the action only on event records with a factual saved observation. Customer Evidence will show the original event, room observation, linked decision, and event recovery path as reference-only context. It will not prefill factual test fields, transfer a result, treat the observation as customer proof, or derive a recommendation. The new saved customer-evidence record will retain the originating event ID for traceability.

## Implementation and validation notes

Activity now exposes **Test this room observation with a customer** only on unreviewed event records with a saved room observation. Customer Evidence receives the event ID, preserves the source event, room observation, and linked-decision relationship as reference-only context, and stores `recoveredFromEventId` on the new customer-evidence record. No test field is prefilled, no event outcome or threshold is copied, and a saved room observation is never described as customer proof.

TypeScript and production builds pass. Desktop and 375px Arabic RTL protected views were checked. The visual-review refinement reduced saffron perimeter use in Activity and Customer Evidence return desks so blue-grey rules describe the operating object and saffron marks only an active sequence or return state. The review request for circular nodes and rings was not adopted because it conflicts with ASaaSI’s explicit no-circle rule.

## References

[1] [Atlassian, “Product discovery”](https://www.atlassian.com/agile/product-management/discovery)  
[2] [Productboard, “Product Discovery Process Tips & Techniques”](https://www.productboard.com/blog/product-discovery-how-to-actionable-tips-and-strategies/)
