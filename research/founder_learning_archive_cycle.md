# Founder Learning Archive and Operating-Principle Research

**Research date:** 21 August 2026  
**Scope:** Founder decision archives, experiment outcomes, retrospective practice, and reusable operating principles.

## Research findings

Aha!’s decision-log pattern retains concise decision metadata such as date, category, alternatives, rationale, stakeholders, and impact. Its value is a searchable record of **why** a decision was made, not an exhaustive archive of every intermediate discussion [1].

Product Talk recommends using the same artifacts for doing discovery, communicating the useful highlights, and archiving the final decision-relevant version. It cautions that retaining all noisy iterations obscures the few decisions needed to avoid repeating old work or mistakes [2]. Browser review confirmed that this selective, outcome-oriented archive is the core interaction rather than a chronological dump.

Atlassian’s retrospective sequence moves from feedback to patterns to action items with owners and deadlines. It warns against turning a one-time event into the focus of an improvement cycle; the action should be tied to a pattern that can shape later work [3]. Browser review confirmed a structured, time-bounded review surface that makes the next improvement explicit.

Aha!’s discovery guidance makes a direct connection between customer research and product decisions, reinforcing that insights only become useful when they change a visible decision rather than remaining notes [4].

## Product implication

ASaaSI should add a conditional **Founder Learning Archive** to Activity. It should include only completed decision records with retained outcomes, preserve the original evidence and next-test context, and let founders filter by Keep, Change, or Stop. It should display concise outcome groups, not a generic feed, and allow a founder to carry one completed outcome into a single monthly operating principle.

The monthly reflection must be deliberately bounded. It should ask the founder to choose one completed record, write a reusable rule with a scope, and name the next place it will be applied. It must label the principle as a working rule that can be revised, not a certainty or broad company doctrine. A source record and date keep it traceable.

## Design constraints

The archive will keep ASaaSI’s editorial system: warm off-white base, deep navy hierarchy, narrow saffron provenance marks, soft rectangular panels, direct routes back to the original evidence, Arabic RTL parity, and no circles or rings. It will not modify the landing page.

## ASaaSI audit and selected scope

ASaaSI already records outcomes on decision records and exposes a current-month keep, change, and stop summary. However, the learning is distributed across the Activity feed, Decision Review, and individual tool records. Founders cannot scan completed outcomes by outcome class, compare the originating test context, or turn one retained result into a clearly scoped rule for future work. The current monthly learning surface is a helpful summary but not a reusable archive.

The selected release contains two connected objects:

1. **Founder Learning Archive.** A conditional Activity section that includes only decisions with a completed keep, change, or stop outcome. Founders can filter the same retained set by outcome, see the source tool, original evidence, outcome date, and latest reflection, and reopen the original decision rather than copy notes into a new artifact.
2. **Monthly Operating-Principle Reflection.** One small, optional monthly reflection attached to a selected completed decision. The founder writes a working rule, its scope, and the next decision context in which it will be applied. It is stored on the original outcome record with the source and month, appears beside that record in the archive, and is always labelled revisable rather than treated as a certainty.

## Implementation outcome

The release is complete. Activity now conditionally shows a **Founder Learning Archive** whenever a founder has completed decisions. It retains only Keep, Change, and Stop decisions, offers outcome filtering, and shows the original retained evidence, next test, outcome date, route, and direct access back to the originating workbench or decision review. It deliberately excludes uncompleted records and noisy interim drafts.

The same archive includes one optional monthly operating-principle reflection. The founder selects one completed decision, writes a working rule, states its scope, and names the next place it will be applied. The rule is attached to the source workflow record with its month and creation time, can be revised, and stays visibly labelled as a working principle. Saving a new monthly rule clears the prior same-month attachment, preserving one current rule without creating a detached note collection.

TypeScript and production builds passed. Authenticated Activity verification confirmed that the archive remains conditional when no completed decision exists, preserving the existing Activity hierarchy until learning is actually available. The landing page remains unchanged.

## References

[1] [Aha!, “Decision log template”](https://www.aha.io/roadmapping/guide/templates/create/decision-log)  
[2] [Product Talk, “Discovery Is Messy: How Do We Keep Track of All That We Are Learning?”](https://www.producttalk.org/keeping-track-of-discovery/)  
[3] [Atlassian Team Playbook, “Sprint Retrospectives”](https://www.atlassian.com/team-playbook/plays/retrospective)  
[4] [Aha!, “Product discovery and the discovery process explained”](https://www.aha.io/roadmapping/guide/what-is-product-discovery)
