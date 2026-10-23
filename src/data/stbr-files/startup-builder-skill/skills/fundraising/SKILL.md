---
name: fundraising
description: Fundraising beyond the deck for a crypto team - data room index, diligence questions with honest answers, investor updates, token-vs-equity orientation. Writes .claude/context/data-room.md. Use for "data room", "due diligence", "investor update", "token and equity".
user-invocable: true
---

<!-- Adapted in part from sendaifun/solana-new@e81c261 (create-pitch-deck, roast-my-product, launch-token references; MIT © 2026 SendAI and Superteam) and beingsmit/technical-product-gtm@ef1aa7d (skills/board-and-investor-communication/SKILL.md; MIT © 2026 Smit Patel); full notices in THIRD_PARTY_NOTICES.md. -->

# Fundraising

Index the data room → define the metrics once → prepare the diligence answers → send updates from the same metrics → frame token vs equity and route the legal half.

This is the complement to [pitch-deck](../pitch-deck/SKILL.md), not a second deck skill. The deck gets the meeting; this skill covers what follows it: "send us the data room", the diligence call, the monthly update, and "how do the token and the equity relate?"

For running the raise itself (intros, the first meeting, parallel or serial, follow-up), what investors prescribe and where they disagree, with sources: [library-investor-advice.md](../pitch-deck/references/library-investor-advice.md).

## Context handoff

- At start, read whichever of these exist and only ask what they don't answer:
  - `.claude/context/data-room.md`: resume from it
  - `.claude/context/idea.md`: the wedge and the bear case
  - `.claude/context/build.md`: program IDs, deploy status, traction. Format: [build-md-format.md](../build-status/references/build-md-format.md).
  - `.claude/context/positioning.md`: the ICP and the alternatives
  - `.claude/context/pricing.md`: the business model and the floor-cost math. Format: [pricing-format.md](../pricing/references/pricing-format.md).
  - `.claude/context/market.md`: the market numbers and the entry wedge, each with its source, for the [market questions](references/diligence-bank.md#i-market) in diligence. Format: [market-md-format.md](../market-sizing/references/market-md-format.md).
- On completion, write `.claude/context/data-room.md` in the format in [data-room.md](references/data-room.md#claudecontextdata-roommd-format) and commit it. It defines only the investor metrics `build.md` doesn't carry. Traction keeps `build.md`'s names and definitions ([format](../build-status/references/build-md-format.md)), which is also where pitch-deck reads traction, so the deck, the data room and the updates quote the same numbers.

## Workflow

### 1. What was asked

Data room, diligence call, investor update, or the token question. Go straight to that step, but build step 2 first if `data-room.md` doesn't exist yet. The other steps all read the metric definitions it creates.

### 2. Index the data room

Walk the crypto-specific index in [data-room.md](references/data-room.md). A crypto data room differs from a SaaS one. Diligence starts on chain:

- program IDs and who holds the upgrade authority
- multisig signers and the threshold
- audits matched to the deployed commit
- verifiable-build status
- mint and freeze authorities
- vesting contracts
- grants received

For every item record where it lives, its as-of date, its owner, and whether it is `ready`, `missing` or `n/a`. A `missing` item that an investor will ask for is a task to do before the meeting, not after.

Read authorities from the chain, not from memory. Engineering checks route to [solanabr/ai-kit](https://github.com/solanabr/ai-kit): `/build-program` for a verifiable build, `/audit-solana` and [auditor-skill](https://github.com/solanabr/auditor-skill) for audits, `/audit-infra` for keys and CI. [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill)'s `program-authority-auditor` and `token-inspector` agents read upgrade, mint and freeze authority and the Token-2022 extensions, along with what each fact signals legally.

### 3. Define the metrics once

Use the metric table in [data-room.md](references/data-room.md#metrics). Each metric gets a definition, the query or link that produces it, its owner and the date it was last run. Report wallets twice: raw, and sybil-adjusted. An investor will run the second number themselves.

### 4. Prepare the diligence answers

Run the [diligence bank](references/diligence-bank.md). For each question, write the honest answer: the fact, the onchain proof, the risk it leaves, and the mitigation with a date. Where the honest answer is bad, there are two options: fix it before the meeting, or lead with it. Never let the investor find it first, because on a public chain they will.

[pitch-deck](../pitch-deck/SKILL.md)'s objection drill prepares for a pitch meeting. This bank is the deeper second-meeting version, and its answers go into `data-room.md` so they stay consistent.

### 5. Investor update

Fill the template in [investor-update.md](references/investor-update.md) from the metric definitions in `data-room.md`: the same metrics every month, actuals against plan, one ask. Add the crypto-only sections: authority and security changes, upcoming token events, and treasury runway in stablecoins only.

### 6. Token vs equity

Give the orientation in [token-vs-equity.md](references/token-vs-equity.md): what an investor can be buying, the questions that must be answered before a term sheet, and what earlier token rights do to the next round. Every legal or tax consequence goes to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill), which is information-only and not a lawyer. Don't draft terms, don't classify a token, and don't estimate tax. Say that plainly when asked, and route the question.

## Output

- `.claude/context/data-room.md`, committed: the index, the metric definitions, and the diligence answers with their status
- On request, the index rendered as one HTML page. It is self-contained: inline CSS, no fonts, scripts or images fetched from elsewhere, and the only links are to the documents themselves. Never pptx or docx.
- The investor update as plain text or markdown, ready to paste into an email
- A list of open items that the legal or engineering skills must close before the room is shared
