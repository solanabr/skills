<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/crypto-pitch-examples.md ("On-Chain Metrics That Matter" table only). MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten with sybil and source caveats. -->

# Onchain metrics for a traction slide

An onchain metric is only persuasive if a skeptic can check it. Every number on the slide gets a public link.

| Metric | What it shows | Public proof | The question you will get |
|---|---|---|---|
| Active wallets (daily or weekly) | Usage | A Dune query on your program ID | How many are bots or one user's many wallets? |
| Transactions or instructions | The product is exercised | Your program's page in an explorer, or a Dune query | How many are your own cranks, keepers or tests? |
| Retention (D7, D30 wallet cohorts) | Stickiness | A cohort chart from onchain data | Retention of real users or of farmers chasing points? |
| Volume | Economic throughput | Dune or DefiLlama | Wash-traded or incentivised? |
| TVL | Committed capital | Your DefiLlama protocol page | How much is your own or one whale's? Mercenary after incentives end? |
| Fees and revenue | Willingness to pay | Fee vault or treasury address; DefiLlama fees listing | What share is paid by incentive-farming flow? |
| Integrations | Platform potential | Named protocols calling your program, with links | Live in production, or a demo? |

## Rules

- **Lead with the strongest checkable metric and its trend**, not a cumulative total. Weekly active wallets over twelve weeks beat "100k wallets ever".
- **Treat wallet counts as an upper bound.** One person can run hundreds of wallets, and points or airdrop programs attract exactly that. Say how you filter (minimum balance, minimum activity, known-farmer exclusion) before an investor asks.
- **Separate incentivised from organic.** If a points program or liquidity mining was running, show the curve before and after it.
- **Revenue over TVL, retention over signups, onchain over social.**
- **Pre-launch:** devnet usage, a waitlist with its source, letters of intent and pilot users are fine; label them as such and never present devnet activity as mainnet traction.
