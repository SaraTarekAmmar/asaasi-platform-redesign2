# Experiment Learning Archive and Evidence Handoff Cycle

## External findings

Product Talk frames the purpose of discovery as learning faster, moving key questions about customer value and desired outcomes earlier rather than treating shipping as the learning event.[1] This supports an archive that preserves the specific question, evidence, and next decision rather than a generic “successful experiment” label.

Atlassian’s current Jira Product Discovery framing connects feedback, insights, roadmaps, and delivery work, emphasizing a transparent path from captured opportunities to a decision and its downstream work.[2] The useful ASaaSI pattern is **recoverable context with a visible route**, not an aggregate score that hides trade-offs.

Conversion describes its repository as a robustly tagged collection of experiment data and emphasizes its use as an accessible source of prior experimental learning.[3] The relevant interaction pattern is filtering and retrieving retained records before a founder starts again, while retaining the original test context instead of flattening it into a single result.

## ASaaSI implication

ASaaSI should add a bounded **Completed Experiment Learning Archive** only for records with an explicit Keep, Change, or Stop outcome. It should keep source tool, original evidence, original test, outcome timing, operating rule, and direct recovery visible. It can group and compare retained fields, but it must not infer causal patterns, rank founders’ work, calculate a confidence score, or create an ungrounded recommendation.

## ASaaSI audit and selected scope

ASaaSI already has a Founder Learning Archive for all completed decisions and a Cross-Tool Decision Archive that can select any two retained decisions. The remaining gap is a dedicated view for **completed founder-tool experiments**. A founder cannot currently filter only completed tool experiments by source and Keep, Change, or Stop, then compare two closed experiments while retaining each original workbench path and evidence.

The selected enhancement is a bilingual **Completed Tool Experiment Archive** in Activity. It will contain only decision records from founder-tool routes that have an explicit outcome. It will filter by source tool and outcome, preserve completion timing, retained evidence, original test, working rule, and direct workbench recovery, and reuse ASaaSI’s bounded two-record comparison desk. It will not compare incomplete work, recommend a winner, infer a recurring pattern, score results, or manufacture a new experiment.

## Implementation and validation notes

Activity now includes the bilingual Completed Tool Experiment Archive. It preserves only explicit Keep, Change, and Stop outcomes from founder-tool routes, allows filtering by outcome and source tool, retains the original test, source evidence, working rule, completion date, direct workbench route, and generic decision-review path. A founder can select exactly two closed records for the existing field-by-field comparison desk. The archive deliberately excludes open decisions and does not calculate a score, generate a pattern, nominate a winner, or create a new experiment.

TypeScript and production builds pass. The available browser session had no authenticated retained tool outcomes, so no synthetic founder data was added simply to populate the archive; archive behavior was instead validated through its typed record filters and compiled UI.

The final visual refinement integrated identity more visibly into route-specific protected return desks. Registrations now labels identity as the indexed step that restores an event commitment, while Customer Evidence labels identity as the indexed step that restores customer language. The review’s request for circular nodes and rings was not adopted because it conflicts with ASaaSI’s explicit no-circle rule; saffron remains reserved for active state, index, route, and return signals.

## References

[1] [Product Talk, “The Evolution of Modern Product Discovery”](https://www.producttalk.org/evolution-product-discovery/)  
[2] [Atlassian, “Jira Product Discovery”](https://www.atlassian.com/software/jira/product-discovery)  
[3] [Conversion, “The Conversion Experiment Repository”](https://conversion.com/blog/experiment-repository/)
