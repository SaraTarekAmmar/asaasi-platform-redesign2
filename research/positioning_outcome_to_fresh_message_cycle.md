# Positioning Outcome to Fresh Message Test Cycle

## Research question

How should ASaaSI turn a completed positioning evidence decision into a fresh message test while retaining the original customer language and outcome without copying the prior claim or conclusion?

## External findings

Wynter distinguishes diagnostic message testing from A/B measurement. Its guidance recommends open-ended questions to learn what buyers believe a message says, which parts are unclear, and what change they would make, rather than relying only on a numeric preference.[1]

BuildBetter frames messaging and positioning around exact customer language, segment-specific problems, proven outcomes, supporting proof, and differentiation. Its approach treats customer conversations as source material for a message rather than a marketing guess.[2]

## Design implication for ASaaSI

ASaaSI’s Positioning Evidence workbench should add a completed **positioning outcome → fresh message test** route. The source remains reference-only context, retaining the original buyer language, message, evidence, and completed outcome. A fresh test must require a new target buyer, exact customer phrase, current message, response context, and one observable decision rule. It must not copy an old claim, preference rate, threshold, or Keep/Change/Stop conclusion.

The visual object should be a **Buyer language → Message → Response** ledger. It should privilege source-linked qualitative response and never inflate a few conversations into a market-wide positioning proof.

## Implementation and validation notes

Activity now exposes a dedicated Positioning outcome recovery rail whenever completed Positioning Evidence records exist. Each retained source displays its explicit Keep, Change, or Stop outcome, title, evidence excerpt, direct decision review, and **Open fresh message test** action. The Positioning Evidence workbench resolves only a completed message record and renders its evidence and original test as source context. The founder must author the current buyer, alternative, buyer challenge, buyer phrasing, outcome claim, factual proof, message variant, and response rule again.

Fresh message tests retain `reusedFromDecisionId` and receive a unique record ID, so a new test cannot overwrite the closed source it references. TypeScript and production builds pass. Desktop and 375px Arabic RTL protected Positioning Evidence returns were checked. The landing page remains unchanged.

## References

[1] [Wynter, “Message Testing: The Definitive Guide”](https://wynter.com/post/message-testing)

[2] [BuildBetter, “Build Messaging & Positioning from Customer Language”](https://docs.buildbetter.ai/pages/Use%20Cases/marketing/messaging-positioning)
