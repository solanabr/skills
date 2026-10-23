# `.claude/context/market.md` format

The one place a project's market numbers and entry wedge live, each number with its source.
Producer: [market-sizing](../SKILL.md). Readers: [pitch-deck](../../pitch-deck/SKILL.md) (the
market slide), [fundraising](../../fundraising/SKILL.md) (the market questions in diligence), and
any tool that needs a market number instead of asking for one.

## Rules

1. **Read before writing, and merge.** On a re-size, re-open every source before keeping its
   number. A number not re-opened keeps its old read date, so the reader can see it is stale.
2. **Readers copy, they don't rewrite.** A deck takes the Market slide section as written. If
   a reader needs a different number, change it here first.
3. **Every number is one line** in the [number-with-source](number-with-source.md) format. No
   source, no number. A field with no evidence says `unknown`.
4. **C, S and R are never added together,** and Context is never summed. Every count and
   result is per account per year.
5. **The price comes from `pricing.md`,** or stays `[price]`. This file never sets it.
6. **Process stays out.** Search logs, corrections and the full front reports live in the
   research notes, linked from each card's Origin field.
7. Keep the headings as below. Omit a section you have nothing for.

## Format

Illustrative: the project is the OTC escrow from
[positioning-md-format.md](../../positioning/references/positioning-md-format.md). **Every
number and source below is invented to show the shape.**

```markdown
# Market

Updated: 2026-10-08 · by market-sizing · Status: draft | founder-reviewed

## What the market is
- Spend replaced: what desks and DAO treasuries pay today to settle an off-exchange deal
  safely (an escrow agent's fee, or the loss when the other side doesn't send).
- Price ceiling: an escrow agent's fee per deal (C line 1), the cost of the alternative as in
  pricing's wtp-methods §3 · Floor: pricing.md Floor cost
- Price used: [price]

## Vision
- Vision: any two parties settle any onchain deal without trusting each other.
- Cycle: a desk opens a deal → both legs settle in one transaction → the counterparty reuses the link for its next deal.
- Pillars: the escrow program; the deal link; dispute handling.

## Wedges
Filters (approved 2026-10-06):
1. The deal only settles if the product releases both legs. Worked case: <a real deal, linked>.
2. ...

| # | Wedge | Q | A | Q×A | D | Why (one line) | First step |
|---|---|---|---|---|---|---|---|
| 1 | DAO treasury token swaps | 4 | 4 | 16 | 0 | Proposals already budget for the escrow agent | Two treasuries with open proposals |
| 2 | OTC desks, large deals | 4 | 3 | 12 | 1 | ... | ... |

Rejected:
| Bucket | Reason | Candidates |
|---|---|---|
| Can't work | Needs a fiat leg the program can't see | ... |

Cards: one per ranked wedge, in the [wedge-card](wedge-card.md) format.

## Sizing
### Beachhead (bottom-up)
- Accounts: 140 DAO treasuries · ... · (est.) <query and filter>
- Units per account per year: 60 deals · positioning.md ICP, "5+ off-exchange deals a month" · (est.) 5 × 12 = 60
- Price: [price]
- Beachhead = 140 × 60 × [price] = (est.) 8,400 × [price] per year

### Money by type (never summed across types)
- C: 1. escrow agent fees · ...
- S: ...
- R direct: ... · R broad: ...

### Top-down check
- <firm, edition, number line> · Within an order of magnitude of the bottom-up: yes | no | no top-down for this cut

### SOM
- Reachable accounts × units per account per year × price = (est.) ...

### Expansion
- Mechanism: settlement drops from days to one transaction, so smaller deals start to make sense · Number: none, no elasticity measured

### Context (not summed)
- OTC volume, TVL of the treasuries: stocks and flows, not spend

## Market slide
Laid out as pitch-deck's Market row and metrics-slide markup ask: one bottom-up number as the
headline, one card per factor with its source. Sized on idea.md's wedge.
- Headline: (est.) 8,400 deals a year × [price], DAO treasury token swaps, bottom-up
| Card | Value | Source (goes on the card) |
|---|---|---|
| Accounts | 140 DAO treasuries | <query and filter> |
| Units per account per year | 60 deals | positioning.md ICP (5+ deals a month) |
| Price | [price] | pricing.md |

## Accelerates X
- Skeleton, chosen reading of X, result in person-days, and what is not public (see accelerates-x.md).

## What is weak
- 2 sources make most of the S sum; data years 2024 to 2026; SOL price at <date>.

## Open decisions
- Price: founder, via pricing.
- Slide number: recommend the beachhead. No top-down figure for this cut (firms 10x apart),
  which only matters inside this file: the slide never carries one.

## Changelog
- 2026-10-08: first sizing; idea.md's wedge ranked first on Q×A.
```
