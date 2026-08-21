# Market Map Evidence Workbench Research

**Research date:** 21 August 2026  
**Scope:** Founder market discovery, segment prioritization, and experiment selection for early-stage SaaS.

## Evidence-led findings

Strategyzer’s Test Card makes a hypothesis, test method, measurement, and success threshold explicit before a team runs an experiment. Its value is not the card metaphor itself but the discipline of separating an assumption from the observable condition that could invalidate it [1]. Browser review confirmed that the visual object is structured as a stepwise record, not a score or generic survey.

Miro’s market-segmentation matrix keeps audience attributes visible across geographic, psychographic, behavioural, and demographic dimensions, then encourages teams to annotate feasibility and segment size. The valuable ASaaSI adaptation is a compact comparison of founder-defined segments, not an unrestricted sticky-note board [2]. Browser review also showed a searchable template library with one clear object per page, an interaction pattern that ASaaSI can translate into an immediately legible founder workbench.

Startups.com distinguishes problem, solution, willingness-to-pay, and commercial validation, warning that these are different evidence levels. A customer interview is not evidence of paid demand; a paid pilot is stronger but not proof of a repeatable commercial motion [3]. Kromatic similarly separates generative market research from evaluative market experiments and stresses that an evaluative test needs a specific, falsifiable hypothesis and defined customer segment to avoid misleading signals [4].

## Product implication

The next high-value release should rebuild ASaaSI’s remaining **Market Map** route as a bounded **Segment Evidence Workbench**. It should capture one named segment, live buyer situation, existing workaround, reachable channel, evidence source, estimated opportunity signal, confidence, and a dated next test. It should not output market size, demand forecasts, or segment rankings as if they were objective facts.

The result should classify the founder’s current work as **generative market discovery** or **evaluative market test**, explain why, show the exact evidence threshold, and persist a unique decision record. The saved record should be ready for Activity and relevant customer-evidence work, providing a practical bridge from segment choice to a next interview, smoke test, or paid-pilot conversation.

## Design constraints

The workbench will preserve ASaaSI’s off-white editorial canvas, navy hierarchy, linear saffron provenance cues, soft rectangular controls, English and Arabic RTL parity, and no-circle rule. It will not modify the landing page.

## ASaaSI audit and selected scope

The previous Market Map route was a generic two-choice brief. It could name an alternative and a desired evidence item, but it did not retain a named segment, buyer situation, access path, evidence quality, validation level, falsifiable test, or dated decision in a route-specific record. Exporting it saved one fixed generic decision, which also made distinct market hypotheses overwrite each other.

The selected release replaces that generic template with a Segment Evidence Workbench. Its first screen presents the named segment object rather than a questionnaire, and the founder records the live buyer situation, current workaround, one credible reach path, evidence source, number of retained sources, discovery or evaluative mode, next test, and threshold. The result never claims market size, demand, or objective ranking. Each save creates a distinct structured workflow record, ready for Activity and customer-evidence follow-through.

Browser verification confirmed the dedicated route now renders the Segment Evidence hero and its explicit evidence boundary in the authenticated workspace. A visibility correction was also applied to ensure navy workbench headlines remain fully legible, restoring the intended large editorial hierarchy.

## Implementation outcome

The Market Map route is now a dedicated bilingual **Segment Evidence Workbench**. It retains one named segment, live buyer situation, current workaround, credible reach path, current evidence source and count, discovery or evaluative market mode, reversible next test, response threshold, and seven-day review. The output is deliberately bounded: it does not calculate market size, forecast demand, or declare a segment winner.

Each save creates a distinct structured `marketEvidence` workflow record, rather than reusing one generic decision. The record is visible to the existing shared Activity workflow and preserves the evidence boundary needed for a later keep, change, or stop decision.

The Market Map protected return was also refined after visual review. It now opens as a stepped **Customer situation → Evidence quality → Positioning test** editorial map. Identity confirmation is framed as one narrow step within the resumed market work, rather than as the main page object. The visual review’s proposed circle and ring motif was not adopted because it conflicts with ASaaSI’s explicit prohibition on circles and rings; the route uses connected linear saffron rules, stepped rectangular records, and provenance labels instead.

Final validation passed TypeScript and production compilation. Desktop protected-return review and 375px Arabic RTL review verified that the market evidence path is legible and route-specific on large and small screens. The landing page remains unchanged.

## References

[1] [Strategyzer, “Validate your ideas with The Test Card”](https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card)  
[2] [Miro, “Market Segmentation Matrix”](https://miro.com/templates/market-segmentation-matrix/)  
[3] [Startups.com, “Market Validation”](https://www.startups.com/lexicon/market-validation)  
[4] [Kromatic, “Which Lean Startup Experiment Should You Run?”](https://kromatic.com/blog/what-type-of-lean-startup-experiment-should-i-run/)
