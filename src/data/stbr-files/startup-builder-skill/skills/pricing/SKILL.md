---
name: pricing
description: Decide what an onchain product charges and how it is packaged - fee surface, payer, number, floor-cost math, comparables, falsification test - and write .claude/context/pricing.md. Use for "what should we charge", "protocol fee", "bps", "take rate", "token-gated tier", "pricing page".
user-invocable: true
---

<!-- Adapted in part from beingsmit/technical-product-gtm@ef1aa7d (skills/technical-product-pricing/SKILL.md, MIT © 2026 Smit Patel) and sendaifun/solana-new@e81c261 (skills/idea/defillama-research, skills/idea/validate-idea, MIT © 2026 SendAI and Superteam); full notices in THIRD_PARTY_NOTICES.md. -->

# Pricing

Pick the fee surface → name the payer → compute the floor → pull comparables → set the number → write the test that would prove it wrong. Output is a decision in `.claude/context/pricing.md`, not a menu of options.

Generic SaaS pricing (per-seat, freemium tiers, "contact sales") misleads here. Revenue on Solana is mostly a fee taken inside a transaction, often paid by someone other than the user, against costs denominated in SOL.

## Context handoff

- At start, read `.claude/context/idea.md`, `.claude/context/positioning.md` and `.claude/context/build.md` if present. `idea.md` gives the wedge and demand evidence, `positioning.md` the ICP and the alternatives you beat, `build.md` what is deployed and the traction. Only ask what they don't answer.
- If `.claude/context/pricing.md` exists, this is a re-price: read it, and go to step 7 before changing anything.
- On completion, write `.claude/context/pricing.md` in the format in [pricing-format.md](references/pricing-format.md). A deck's business-model slide and investor diligence answers should come from this file, so they never disagree with it.

## Workflow

### 1. Who pays, for what

Ask, one at a time, skipping what context answers:

1. What is the unit of value: a swap, a mint, a settled payment, an API call, a seat in a DAO tool?
2. Who signs the transaction, and who is the fee payer? Are they the same wallet?
3. Who is the customer with a budget: the end user, an integrator, a protocol, a DAO or foundation?
4. What does that customer use today instead, and what does it cost them?
5. Is the fee logic inside a deployed program, or offchain (API key, subscription)?

If answers 2 and 3 name different parties, price for the one with the budget. The [payer ≠ user patterns](references/fee-surfaces.md#payer--user) show how.

### 2. Pick the fee surface

Choose from [fee-surfaces.md](references/fee-surfaces.md): bps on amount, flat lamports per action, spread, Token-2022 transfer fee, priority-fee markup, rent capture, offchain subscription or API tier, token-gated tier. For each candidate, write down whether the user sees it in the wallet's pre-sign simulation. A fee the user discovers after signing costs more in trust than it earns.

A token-gated tier needs its own check before it goes further: run the [5x test](references/fee-surfaces.md#token-gated-tiers). If the gate's dollar value or your revenue depends on the token price, flag it and route the token mechanics to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill), which is information-only and not a lawyer.

### 3. Compute the floor

Build the per-unit cost from [floor-costs.md](references/floor-costs.md): signatures and priority fees per action, rent you front and whether you get it back, RPC and indexer spend per user action, oracle updates. Re-query rent and fees on the day; the numbers there are dated, and rent has been cut twice with further cuts proposed but not scheduled. A price below the floor at the expected volume is a subsidy. Name who funds it and until when.

### 4. Pull comparables

Use [wtp-methods.md](references/wtp-methods.md):

- DefiLlama fees and revenue per protocol, the take rate (revenue ÷ fees), and annualised fees-to-TVL, for every comparable you can name
- published fee schedules from the venues your user already uses
- bounty and grant rates for the same job
- the cost of the bad alternative (the value ratio)

Every row gets a source and a date. A number with no source does not go in the table.

### 5. Read the demand evidence

Grade the WTP evidence on the [signal ladder](references/wtp-methods.md#the-signal-ladder). Surveys and "I'd pay for that" are the bottom rung, because this audience answers them dishonestly. If nothing above the weak rung exists, the number in step 6 is a hypothesis, so say that in `pricing.md` and make the falsification test cheaper and sooner.

### 6. Set the number and the test

- One model, one number, and the range you rejected on each side with the reason.
- The floor margin at three volumes: the volume you have, ten times that, and the break-even volume.
- **The falsification test**: an observable result, a threshold, a date, and the action you take if it fails. Example shape: "If fewer than N of the M integrators we pitched at X bps sign by DATE, we drop to Y bps or switch to a flat fee." The founder picks N, M, X and Y; don't invent them.

### 7. Plan the change before you ship the first price

A fee inside a deployed program changes only through a program upgrade or an admin instruction, with an announcement attached. Decide the change path now, using [changing-price.md](references/changing-price.md): a config account, a hard cap in code, timelock and notice, and a grandfathering mechanism if you need one. If the fee lives in program code, hand the implementation to an engineer. [solanabr/ai-kit](https://github.com/solanabr/ai-kit)'s `/plan-feature` covers the account design.

## Boundaries

- **Legal and tax.** Whether a fee model, a fee-share to token holders, or a token-gated tier is lawful where you operate is [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill)'s question: `/airdrop-assessment` and its tokenomics-legality decision tree. It is information-only, and this skill won't improvise an answer.
- **Token supply and allocation** belong to tokenomics, which is ai-kit's `token-engineer` agent. Tokenomics decides the allocation, pricing decides the invoice, and crypto-legal decides whether the invoice is legal where you are.
- **The pitch.** The business-model slide belongs to [pitch-deck](../pitch-deck/SKILL.md). Hand it the numbers from `pricing.md`.

## Output

- `.claude/context/pricing.md`, committed (format: [pricing-format.md](references/pricing-format.md))
- A one-paragraph summary for the founder: the number, the floor margin, and the falsification date
