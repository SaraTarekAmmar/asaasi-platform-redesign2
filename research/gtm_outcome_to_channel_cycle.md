# GTM Outcome to Fresh Channel Test Cycle

## Research question

How should ASaaSI turn a completed go-to-market channel experiment into a disciplined next test without copying a conclusion, silently inheriting outdated baselines, or presenting a generic growth dashboard?

## External findings

GTM Playbook frames a credible GTM experiment around five upfront elements: a falsifiable hypothesis, an observed baseline, a predefined decision rule, a test design that isolates the relevant change, and measurement setup before the experiment runs. Its model treats a decision rule as protection against rewriting success criteria after outcomes appear.[1]

Pedowitz recommends testing a new GTM motion as a time-boxed pilot on a matched audience, isolating a single variable where possible, using stage-appropriate leading and lagging measures, and deciding scale criteria before launch. It specifically distinguishes a repeatable play from a one-off result and recommends documenting the inputs needed to operationalize a winning motion.[2]

## Design implication for ASaaSI

ASaaSI’s existing GTM Channel Map records a selected motion and a dated decision. The highest-value recovery gap is a completed **GTM Channel outcome → fresh Channel test** path. A closed outcome should remain a source-only reference, while the founder enters a fresh buyer context, channel, message, expected response, metric baseline, one change, and dated review. The fresh record should retain `reusedFromDecisionId` but never inherit an old target, threshold, score, or Keep/Change/Stop conclusion.

The visual object should be an editorial **Audience → Motion → Return signal** ledger, with current context readable before fields. Saffron marks provenance and active sequencing only. The feature should avoid unnecessary control-versus-variant complexity for early-stage founders, but keep one-variable focus and an explicit next review.

## Implementation and validation notes

Activity now exposes a dedicated Channel outcome recovery rail when completed GTM Channel Map records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh channel test** action. The GTM workbench resolves only a completed channel record and renders its evidence and original motion as reference-only context. The founder must still author a current audience, buyer situation, promise, channel, planned set, response rule, and signal.

The fresh GTM test persists `reusedFromDecisionId` and receives a unique record ID, so it cannot overwrite the closed outcome it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected GTM returns were checked. The landing page remains unchanged.

## References

[1] [GTM Playbook, “GTM Experimentation Framework for Product Marketing”](https://discover.gtmplaybook.co/gtm-experimentation-framework)

[2] [Pedowitz Group, “How should GTM teams test new motions or offers?”](https://www.pedowitzgroup.com/how-should-gtm-teams-test-new-motions-or-offers)
