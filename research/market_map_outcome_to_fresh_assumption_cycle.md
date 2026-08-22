# Market Map Outcome to Fresh Assumption Cycle

## Research question

How should ASaaSI turn a completed market-map decision into a fresh market-assumption test without copying a prior market conclusion, competitor claim, or evidence threshold?

## External findings

Strategyzer places critical assumptions before build, measure, and learn work. It recommends identifying whether an assumption concerns desirability, feasibility, or viability, choosing the next hypothesis deliberately, and connecting evidence from the test back to the original assumption.[1]

Productboard presents competitor analysis as ongoing rather than one-time work. It cautions against confirmation bias and analysis paralysis, recommends grounding competitor interpretation in customer feedback and buying behavior, and frames analysis as decision support rather than an end in itself.[2]

## Design implication for ASaaSI

ASaaSI’s Market Map should add a completed **market-map outcome → fresh assumption test** route. The source stays reference-only context, preserving the old customer segment, alternative, market signal, evidence, and completed outcome. A new test must require a current market question, defined segment, fresh alternative or signal, source context, smallest test, observable response, and dated rule. It must not copy the old market verdict, competitor comparison, threshold, or Keep/Change/Stop conclusion.

The visual object should be a **Segment → Market signal → Assumption test** ledger. It should make competitor and market observations actionable without presenting them as customer truth or an automatic strategic recommendation.

## Implementation and validation notes

Activity now exposes a dedicated Market Map outcome recovery rail whenever completed market-map records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh assumption test** action. The Market Map workbench resolves only a completed market record and renders its evidence and original test as source context. The founder must author the current segment, buyer situation, alternative, reach path, evidence boundary, work mode, next test, and observable response rule again.

Fresh market tests retain `reusedFromDecisionId` and receive a unique record ID, so a new assumption cannot overwrite the closed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Market Map returns were checked. The landing page remains unchanged.

## References

[1] [Strategyzer, “How To Test Your Idea: Start With The Most Critical Hypotheses”](https://www.strategyzer.com/library/how-to-test-your-idea-start-with-the-most-critical-hypotheses)

[2] [Productboard, “Competitor Analysis: Framework, Template & Best Practices”](https://www.productboard.com/glossary/competitor-analysis/)
