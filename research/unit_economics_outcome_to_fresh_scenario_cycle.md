# Unit Economics Outcome to Fresh Scenario Cycle

## Research question

How should ASaaSI turn a completed unit-economics decision into a fresh founder-owned scenario without copying a prior payback result, conclusion, or benchmark?

## External findings so far

G-Squared Partners frames SaaS unit economics as a relationship among LTV, CAC, and payback rather than a single health score. Its guidance highlights that a favorable long-term LTV:CAC relationship can still coexist with near-term cash constraints when payback is long, and that customer mix can alter the interpretation of acquisition cost, payback, retention, and expansion.[1]

Maxio documents CAC payback as CAC divided by monthly recurring revenue at a baseline, and as CAC divided by monthly recurring revenue times gross-margin percentage when costs of goods sold are included. The distinction supports showing the formula basis explicitly instead of silently mixing gross and net contribution assumptions.[2]

## Early design implication

ASaaSI should retain the source assumptions, scenario result, and completed outcome as reference-only context. A new scenario must still require a founder to enter fresh revenue, acquisition cost, gross-margin, retention, and decision-rule inputs. The experience should foreground the trade-off between cash recovery and long-term value rather than assign an automatic recommendation.

The fresh scenario will show the selected formula basis in its evidence record. It will not embed a universal LTV:CAC benchmark, forecast, investment recommendation, or copied threshold.

## Implementation and validation notes

Activity now exposes a dedicated Unit Economics outcome recovery rail whenever completed Unit Economics records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, scenario evidence excerpt, direct decision review, and **Open fresh scenario** action. The Unit Economics workbench resolves only a completed scenario and renders its assumptions and original evidence move as source context. The founder must author a current cohort or channel, currency, CAC, monthly ARPA, gross margin, retention, uncertainty context, and response rule again.

Fresh scenarios retain `reusedFromDecisionId` and receive a unique record ID, so a new scenario cannot overwrite the closed source it references. The calculator remains explicit about its formula basis: payback uses CAC divided by monthly gross profit, while retention is used only for the stated LTV proxy. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Unit Economics returns were checked. The landing page remains unchanged.

## References

[1] [G-Squared Partners, “SaaS Unit Economics: The Metrics Investors and Operators Rely On”](https://www.gsquaredcfo.com/blog/saas-unit-economics)

[2] [Maxio, “CAC Payback: Why It’s Important and How to Calculate It”](https://www.maxio.com/saaspedia/cac-payback)
