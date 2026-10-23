<!-- Merge rules adapted from sendaifun/solana-new@e81c261, skills/data/specs/phase-handoff.md (MIT © 2026 SendAI and Superteam); notice in THIRD_PARTY_NOTICES.md. -->

# `.claude/context/pricing.md` format

The `pricing` skill writes this file and other skills read it. Commit it. Its format is defined here once, so consumers link here instead of restating it.

## Merge rules

- On a re-price, overwrite the scalar fields: the model, the number and the date.
- Append to **History**, and never delete earlier rows.
- Leave sections that another skill added untouched.

## Template

```markdown
# Pricing

Last priced: YYYY-MM-DD · Status: hypothesis | tested | validated

## Model
- Fee surface: <bps on amount | flat lamports | spread | Token-2022 transfer fee | platform fee | subscription/API | token-gated | hybrid>
- Unit of value: <what one charge is for>
- Payer: <who funds the transaction fee> · Customer with budget: <who pays the price>
- Visible before signing: yes / no / partly (<how>)

## The number
- Price: <e.g. 15 bps, capped at $X per transaction>
- Rejected below: <value>, because <reason>
- Rejected above: <value>, because <reason>

## Floor cost
| Component | Per action | Source | Date |
|---|---|---|---|
| Signatures × 5,000 lamports | | solana.com fee docs | |
| Priority fee (p90 of own landed txs) | | | |
| Rent fronted, not refunded | | getMinimumBalanceForRentExemption | |
| Oracle posts | | | |
| RPC / indexer share | | provider pricing page | |
| **Floor** | | SOL at $<price> on <date> | |

Margin over floor: at current volume <x> · at 10x <y> · break-even volume <z>
Subsidy (if the price is below the floor): funded by <who>, until <date or condition>

## Comparables
| Comparable | What they charge | Take rate | Fees/TVL | Source (URL) | Date |
|---|---|---|---|---|---|

## Demand evidence
Signal-ladder score: 0–3 — <the rungs present, with links>

## Falsification test
If <observable result> is below <threshold> by <date>, then <action>.
Owner: <name>

## Change path
- Fee lives in: <program constant | config account | Token-2022 mint | governance | offchain>
- Hard cap in code: <value or n/a> · Timelock / notice: <value>
- Grandfathering: <none | per-account fee tier>

## Open legal questions
<Anything routed to crypto-legal-skill, with the date asked and its answer status. Never a conclusion written here.>

## History
| Date | Change | Why | Test result |
|---|---|---|---|
```

Any field without evidence says `unknown`, not a guess.
