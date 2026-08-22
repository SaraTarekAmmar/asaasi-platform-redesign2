# Founder Diagnostic Outcome to Fresh Experiment Cycle

## Research question

How should ASaaSI turn a completed Founder Diagnostic bottleneck experiment into a fresh, bounded founder test without treating the earlier bottleneck or outcome as a permanent diagnosis?

## External findings

Tim Herbig argues that evidence reduces uncertainty only when the context is clear, distinguishing first-hand, consequential customer behavior from weak or anecdotal information. The source advises treating feature ideas and signals as starting points for further discovery rather than commitments to delivery.[1]

FirstPrinciples’ experimentation review prompts teams to retain the original hypothesis, experiment, expected result, observed result, interpretation, differing perspectives, and decision. This supports a transparent loop between a completed test and the next decision rather than a generic score or conclusion.[2]

## Design implication for ASaaSI

ASaaSI’s Founder Diagnostic should support a completed **bottleneck outcome → fresh bottleneck experiment** route. The source must remain reference-only context, retaining the prior operating evidence, hypothesis, and outcome. A fresh test must still require a new live question, current evidence, smallest useful method, expected observation, perceived value, and perceived risk. It should not copy the earlier dimension scores, bottleneck, priority, hypothesis, or Keep/Change/Stop conclusion.

The visual object should be an **Evidence → Bottleneck → Next experiment** ledger. It should make prior context legible while resisting the idea that a self-reported diagnostic is a company diagnosis or a scorecard.

## Implementation and validation notes

Activity now exposes a dedicated Founder Diagnostic outcome recovery rail whenever completed bottleneck experiments exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh bottleneck test** action. The Founder Diagnostic workbench resolves only a completed diagnostic record and renders its evidence and original experiment as source context. The founder must rate the current operating dimensions and author a new live question, current evidence, method, observable response, perceived value, and perceived risk.

Fresh diagnostics retain `reusedFromDecisionId` and receive a unique record ID, so a new bottleneck experiment cannot overwrite the closed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Founder Diagnostic returns were checked. The landing page remains unchanged.

## References

[1] [Tim Herbig, “How to Make Evidence-informed Product Discovery Decisions”](https://herbig.co/product-discovery-decisions/)

[2] [FirstPrinciples, “Experimentation Decision-Making: How To Improve the Quality of Your Decisions”](https://www.firstprinciples.ventures/insights/experimentation-decision-making-how-to-improve-the-quality-of-your-decisions)
