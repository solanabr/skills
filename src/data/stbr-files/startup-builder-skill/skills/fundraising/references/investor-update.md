<!-- Format, cadence and the bad-news structure are adapted from beingsmit/technical-product-gtm@ef1aa7d, skills/board-and-investor-communication/SKILL.md (MIT © 2026 Smit Patel), with crypto-specific sections added. Notice in THIRD_PARTY_NOTICES.md. -->

# Investor update

## Cadence

- **Monthly, on the same day every month**, including the bad months. Six good months followed by silence tells investors exactly what you aren't saying.
- **Within a week of major news**, without waiting for the scheduled date.
- **During an active raise:** weekly to warm prospects, monthly to existing investors.
- **Crypto-specific:** a program upgrade, an authority change, a token unlock, a TGE, a listing or the end of an incentive programme goes in an update only once it is public or already scheduled onchain (a vesting contract's unlock, say). An unannounced TGE, listing or unlock date is inside information: sending it privately to investors who may hold or trade the token is selective disclosure, which market-abuse rules such as MiCA Title VI target. Announce it publicly first, or route it to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) or counsel.

## Rules

- **The same metrics every month**, quoted from `build.md`'s Traction table and the definitions in `data-room.md`. You can add a metric. Never drop one because it looks bad this month: that is the fastest way to lose credibility on every number.
- **Actuals against plan, every time.** The gap is the conversation.
- **Wallet metrics sybil-adjusted**, with the raw figure next to them. Use the same filter every month.
- **One context sentence per metric:** what it means, and whether it is good or bad.

## Template

```text
Subject: <Company> — <Month YYYY> update

<One-line headline: where we are against the plan.>

TL;DR
- Number: <the metric that matters most right now, vs plan>
- Win: <specific — partner name, integration, milestone>
- Problem: <specific> — <what we're doing about it>

Metrics (definitions: data room)
| Metric                        | This month | Last month | 3-mo avg | Plan | Proof |
|-------------------------------|-----------:|-----------:|---------:|-----:|-------|
| Active user wallets, 7d (adj.)|            |            |          |      | link  |
| Active user wallets, 7d       |            |            |          |      | link  |
| Fees earned, 30d              |            |            |          |      | link  |
| Grant share of income (6 mo)  |            |            |          |      |       |
| Burn                          |            |            |          |      |       |
| Runway — stablecoins only     |            |            |          |      |       |
| Runway — total treasury       |            |            |          |      |       |

Authority & security changes
- <Upgrades deployed (commit, verifiable build), signer rotations, audits started/finished, incidents. "None" is a valid line.>

Upcoming token events (if a token exists; public or scheduled onchain only)
- <Unlocks in the next 30 days (amount, recipient class), incentive programme start/end, listings, each already announced or onchain.>

Key updates
- <2–3: hires, launches, integrations, course corrections.>

Asks
- <1–2, specific: "intro to the integrations lead at <wallet>", not "intros to wallets".>
```

**Runway in two lines.** If the treasury holds SOL or your own token, total runway moves with the market. Investors discount it, so give them the stablecoins-only figure next to it. Don't present a runway that depends on selling your own token as if it were cash.

## When the news is bad

Use four parts. Don't sandwich the bad news between good news, because investors read through that immediately.

1. **What happened**, in one specific, non-defensive sentence.
2. **Why** it happened: the root cause, not an external excuse.
3. **The impact**, stated honestly, in numbers.
4. **What you are doing**: the actions, the owners and the dates.

Before the full update goes out, brief your lead investor 48 to 72 hours ahead. In every later update, report on the issue you flagged until it is closed.

**If the bad news is an exploit or an incident,** the public chain may show it before you can describe it. Notify investors quickly, but the timing of disclosure, and anything that touches regulators or recoverable funds, goes to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) first. Its `/triage` command hard-stops to counsel on formal regulator contact. Don't improvise that part. An update never describes an unpatched vulnerability or open recovery talks with an attacker.
