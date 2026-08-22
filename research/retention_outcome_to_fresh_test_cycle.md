# Retention Outcome to Fresh Test Cycle

## Research question

How should ASaaSI turn a completed retention-recovery decision into a new bounded recovery test while keeping the original cohort, evidence, and intervention visible without copying a causal conclusion?

## External findings

Amplitude recommends retention investigation through defined behavioral cohorts and time windows, then asks teams to form a hypothesis and test product changes. Its guidance warns that retention is often driven by multiple conditions, so a cohort pattern should motivate a test rather than become an unsupported causal claim.[1]

Churnkey distinguishes early expectation failures, later habit gaps, and evolving-customer needs as different retention contexts. Its guidance reinforces that a stated cancellation reason can mask a deeper value, friction, or timing issue, so recovery work needs the concrete customer context and observed behavior beside the intervention.[2]

## Design implication for ASaaSI

ASaaSI’s Retention Recovery workbench should add a completed **Retention outcome → fresh recovery test** route. The completed record remains source-only context. A fresh test must require a current cohort, observable return behavior, present friction or value gap, one reversible intervention, a response rule, and a dated review. It must not inherit the original rate, threshold, or Keep/Change/Stop conclusion.

The visual object should be a **Cohort → Return behavior → Recovery move** ledger. It should support structured retention learning without becoming an automated churn predictor, a health score, or a claim that a single change caused the observed outcome.

## Implementation and validation notes

Activity now exposes a dedicated Retention outcome recovery rail whenever completed Retention Recovery records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh recovery test** action. The Retention Recovery workbench resolves only a completed retention record and renders its evidence and original recovery move as source context. The founder must author a current cohort, risk moment, observed context, account counts, recovery intervention, and response rule again.

Fresh recovery records retain `reusedFromDecisionId` and receive a unique record ID, so a new intervention cannot overwrite the closed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Retention returns were checked. The landing page remains unchanged.

## References

[1] [Amplitude, “How to Perform a SaaS Cohort Analysis to Reduce Churn”](https://amplitude.com/blog/saas-cohort-analysis)

[2] [Churnkey, “Complete Guide to Customer Retention”](https://churnkey.co/blog/what-is-customer-retention-the-complete-guide-to-keeping-customers)
