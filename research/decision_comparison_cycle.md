# Decision Comparison and Evidence Review Research

**Research date:** 21 August 2026  
**Scope:** Side-by-side decision comparison, experiment retrospectives, and evidence-preserving founder review.

## Evidence-led findings

Aha! structures its decision log around a repeatable record including date, category, rationale, alternatives, context, impact, owner, and stakeholder inputs. Its key value for ASaaSI is the ability to scan these same fields across two decisions without replacing them with a single calculated winner [1]. Browser review confirmed that the template is framed as a structured record of choices and context, not a recommendation engine.

Atlassian’s retrospective guidance distinguishes gathering feedback, identifying a pattern, and creating owned action items. It explicitly cautions against using one-time successes or mistakes as the basis for future process improvement. The ASaaSI comparison must therefore show original evidence and outcome status beside an explicit comparison boundary, rather than claim that two selected records establish a trend [2]. Browser review confirmed this action-oriented sequence and the emphasis on future follow-through.

## Product implication

The next release should extend the Cross-Tool Decision Archive with a bounded **Decision Comparison Desk**. A founder may select exactly two saved decision records. The desk should show each decision’s title, source provenance, recorded evidence, original test, outcome or open state, review timing, and any retained working principle. It should surface only a factual field-by-field comparison and direct recovery links. It should not calculate a winner, a score, a pattern, or a recommendation, and it should label one or both open decisions as incomplete context.

## Design constraints

The comparison desk will use ASaaSI’s warm off-white editorial base, deep navy hierarchy, linear saffron provenance cues, soft rectangular form controls, Arabic RTL parity, and no circles or rings. It will not modify the landing page.

## ASaaSI audit and selected scope

The new Cross-Tool Decision Archive already makes an individual prior record retrievable, but it deliberately stops before comparison. Founders can search and reopen one source at a time, yet cannot place two retained decisions beside each other to inspect whether their buyer context, evidence, test, outcome, review timing, or operating principle were actually different. Any comparative learning must currently be reconstructed manually from separate routes.

The selected release adds a small **Decision Comparison Desk** inside the existing archive. A founder chooses exactly two saved decision records from archive rows. The desk will compare only retained fields: status, source, evidence, original test, review timing, and working principle. It will preserve direct source and Decision Review routes. It will explicitly state that two records are not a pattern and will flag open records as incomplete context. The comparison will not sort, aggregate, score, judge, or recommend between the two decisions.

## Implementation outcome

The Cross-Tool Decision Archive now includes a bounded Decision Comparison Desk. Founders can select exactly two saved decision records directly from the archive. If they choose a third record, it replaces the earliest selection, keeping the comparison intentionally constrained. With two records selected, the desk presents each original record in parallel with retained status, source provenance, evidence, original test, review timing, working principle, and direct decision or workbench routes.

The comparison boundary is explicit: the desk does not rank, aggregate, score, name a winner, infer a pattern, or make a recommendation. Any open decision is visibly labelled as incomplete context. This retains the practical value of a side-by-side review without converting two disconnected experiments into a fabricated conclusion.

TypeScript and production builds passed after a source-component repair that removed an accidental duplicate comparison declaration. Authenticated Activity verification confirmed the comparison selector, explicit zero-of-two state, result-level selection control, and archive integrity with current founder data. Only one saved decision is currently available in the authenticated workspace, so the desk intentionally remains in its select-one-more state rather than adding synthetic records. The landing page remains unchanged.

## References

[1] [Aha!, “Decision log template”](https://www.aha.io/roadmapping/guide/templates/create/decision-log)  
[2] [Atlassian Team Playbook, “Sprint retrospectives”](https://www.atlassian.com/team-playbook/plays/retrospective)
