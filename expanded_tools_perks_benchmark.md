# Expanded Tool Library and Perks Benchmark

## Scope and Design Boundary

This implementation review compares the public tool libraries at **ASaaSI** and **SaaStr AI** to identify useful capability patterns for ASaaSI. The work will adapt functional ideas—clear inputs, a useful record, a bounded next move, and stage-aware discovery—while retaining ASaaSI’s editorial operating-system visual language. It will not copy competitor branding, proprietary datasets, score claims, logos, or marketing language.

## Public Inventory

| Source | Observable tool or perk pattern | ASaaSI implementation direction |
|---|---|---|
| ASaaSI Tools | Pricing Advisor, GTM Strategy Agent, Bootstrapper Survival Calculator, Unit Economics Agent, Fundraising Prep Agent, Series A Readiness Audit, Hiring Scorecard, Co-Founder Compatibility Quiz, Churn Prevention Agent, and Founder Readiness Diagnostic. | Expand the current workbench library around **decision records**: buyer/value/price, channel hypothesis, cash/burn/scenario, unit economics, fundraising evidence, hiring evidence, co-founder alignment, retention recovery, and founder signal. |
| ASaaSI Perks | Stage and category filters, partner deal terms, six practical founder categories, and a vetted/exclusive/practical value promise. | Build a **stage-aware perk ledger** with category filters, eligibility evidence, unlocked outcome, and a clear “request access” action. Do not publish unvalidated external discount claims. |
| SaaStr AI Tools | A broad category map across AI advice, fundraising, benchmarking, executive search, AI agents, and learning, with quick tool discovery and a clear practical outcome for each. | Add an editorial **tool taxonomy and workbench index** with distinctive outcome labels and one focused entry action per tool. Keep conclusions contextual rather than AI-score or benchmark claims. |

## ASaaSI Tool Suite to Build

| Workbench | Working object | Bounded output | Route target |
|---|---|---|---|
| Pricing Decision | Buyer → Value → Price | Price hypothesis and one customer test | `/tools/pricing` |
| GTM Channel Map | Audience → Channel → Proof | A 30-day channel test | `/tools/gtm-map` |
| Runway Ledger | Cash → Net Burn → Scenario | A cash-preservation scenario | `/tools/runway` |
| Unit Economics Record | ARPU → Retention → Acquisition | One metric to verify next | `/tools/unit-economics` |
| Fundraising Readiness | Story → Evidence → Room | A readiness evidence gap | `/tools/fundraise-ready` |
| Hiring Scorecard | Outcome → Competency → Trial | A structured interview brief | `/tools/hiring-scorecard` |
| Co-founder Alignment | Risk → Ownership → Commitment | A conversation agenda, not a compatibility score | `/tools/cofounder-alignment` |
| Retention Recovery | Signal → Cohort → Intervention | One churn-recovery test | `/tools/retention-recovery` |

## Perks Direction

The perks surface will remain an **access and evidence ledger**, not a promotional coupon wall. Each opportunity should state the founder job it supports, the stage where it is relevant, the eligibility or verification step, and the intended unlocked outcome. The current prototype must use clearly labelled illustrative partner records until negotiated terms and partner approval are available.

## Implemented ASaaSI Adaptation

The public `/tools` route now indexes the expanded tool suite as neutral worksheet rows, preserving each tool’s decision, evidence requirement, and next move without treating the directory as a library of promotional cards. GTM Channel Map, Unit Economics Record, Fundraise Evidence Map, and Retention Recovery are available through the shared two-question workbench renderer. Their outputs are deliberately bounded records—one channel test, one metric test, one evidence gap, or one cohort intervention—rather than unvalidated performance scores.

Protected routes for the new tools now preserve the attempted workbench in the access state: **Audience → Channel → Proof**, **ARPU → Retention → Payback**, **Story → Evidence → Room**, and **Signal → Cohort → Intervention**. This ensures sign-in is presented as a continuation of the founder’s operating record rather than a generic interruption.

The new public `/perks` route is a stage-aware access ledger with filters for infrastructure, payments, customer operations, and team operations. It names the job, relevant stage, eligibility review, and access request, and explicitly labels its records as illustrative until partner terms are verified. The mobile right-to-left ledger was separately checked so Arabic outcome text remains in the full content column.

## References

1. [ASaaSI Tools](https://asaasi.vercel.app/tools)
2. [ASaaSI Perks](https://asaasi.vercel.app/perks)
3. [SaaStr AI Tools](https://saastr.ai/tools)
