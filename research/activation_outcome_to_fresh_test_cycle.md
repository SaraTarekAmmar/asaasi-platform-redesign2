# Activation Outcome to Fresh Test Cycle

## Research question

How should ASaaSI turn a completed first-value or activation outcome into a fresh founder experiment without copying past rates, causal claims, or a stale milestone definition?

## External findings

First Round’s account of Superhuman onboarding treats activation as a progression from signup through setup and an aha moment toward an engaged habit. It also emphasizes that onboarding conversations capture specific friction, requests, and unmet needs that analytics cannot fully explain.[1]

ProductLed describes activation velocity as a cohort’s progress to a meaningful onboarding milestone over time. The activation event should fit the business and be measurable from current data, such as a paid conversion, teammate invitation, or completed first project, rather than a generic checklist action.[2]

## Design implication for ASaaSI

ASaaSI’s Activation Evidence workbench already records the cohort, intended value, first-value event, time window, counts, observed friction, and one reversible path change. The next high-value gap is a completed **Activation outcome → fresh activation test** path. A completed record must remain reference-only context, while a fresh test requires a current cohort, a newly chosen value milestone and time window, observed friction, counts, path change, and a dated response rule.

The recovery object should be a calm **Cohort → First value → Return signal** ledger, not an onboarding completion dashboard. It should preserve the original source route and outcome, avoid pretending the earlier path change caused a result, and never copy a prior rate or threshold into the fresh test.

## Implementation and validation notes

Activity now exposes a dedicated Activation outcome recovery rail whenever completed Activation Evidence records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh activation test** action. The Activation workbench resolves only a completed Activation record and renders its evidence and original first-value move as source context. The founder must author the cohort, value promise, milestone, time window, current counts, observed friction, reversible path change, and response rule again.

Fresh activation records retain `reusedFromDecisionId` and receive a unique record ID, so a new experiment cannot overwrite the closed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Activation returns were checked. The landing page remains unchanged.

## References

[1] [First Round Review, “How to Build and Scale Onboarding”](https://review.firstround.com/superhuman-onboarding-playbook/)

[2] [ProductLed, “Activation Velocity”](https://productled.com/blog/activation-velocity)
