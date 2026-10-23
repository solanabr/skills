<!-- Adapted from sendaifun/solana-new@e81c261, skills/idea/defillama-research/references/defi-opportunity-framework.md, skills/idea/defillama-research/references/tvl-as-trust-metric.md and skills/idea/validate-idea/references/customer-signal-rubric.md (MIT © 2026 SendAI and Superteam), and beingsmit/technical-product-gtm@ef1aa7d, skills/technical-product-pricing/SKILL.md (MIT © 2026 Smit Patel). Rewritten; notices in THIRD_PARTY_NOTICES.md. -->

# Willingness-to-pay methods that work in this market

Crypto users answer pricing surveys dishonestly, and in both directions. "I'd pay for that" costs nothing to say, and "it should be free, it's onchain" costs nothing either. Use what people already pay, which is public onchain far more often than in SaaS.

## 1. Fee comparables from DefiLlama

For any protocol DefiLlama tracks (API docs: <https://api-docs.defillama.com/>):

| Call | Returns |
|---|---|
| `https://api.llama.fi/overview/fees/solana` | Every Solana protocol with fees: `slug`, `category`, `total24h`, `total30d`, `methodology` |
| `https://api.llama.fi/summary/fees/{slug}?dataType=dailyFees` | What users paid in total |
| `https://api.llama.fi/summary/fees/{slug}?dataType=dailyRevenue` | The part the protocol kept |
| `https://api.llama.fi/tvl/{slug}` | Current TVL, as a bare number |

Two ratios:

- **Take rate** = revenue ÷ fees: of what users pay, how much the protocol keeps rather than passing to LPs, lenders or suppliers. This is the number your bps competes with.
- **Annualised fees-to-TVL** = `total30d × 365 / 30 ÷ TVL`: how hard each locked dollar works. High means capital-efficient; low means capital parked for incentives.

Worked example, pulled 2026-10-05. **Re-pull it; don't reuse it.**

| Protocol (slug) | Category | Fees 30d ($) | Revenue 30d ($) | Take rate | TVL ($M) | Ann. fees / TVL |
|---|---|---|---|---|---|---|
| Kamino Lend (`kamino-lend`) | Lending | 4,636,142 | 597,541 | 12.9% | 1,396.9 | 4.0% |
| Jupiter Perpetual Exchange (`jupiter-perpetual-exchange`) | Derivatives | 7,800,434 | 1,950,110 | 25.0% | 817.7 | 11.6% |
| Raydium AMM (`raydium-amm`) | Dexs | 35,029,052 | 5,422,544 | 15.5% | 1,345.7 | 31.7% |

Rules for using the table:

- **Read `methodology` first.** "Fees" means different things across categories: borrow interest, trading fees, liquidation penalties. Compare like with like.
- **Compare within a category.** A lending take rate and a DEX take rate are not substitutes.
- **Check whether incentives inflate it.** The matrix:

| | High fees | Low fees |
|---|---|---|
| **High TVL** | Real usage paying real fees | Capital parked for yield or incentives; its fee level tells you little |
| **Low TVL** | Capital-efficient: study why | Early or dying; check the trend before using it |

- **Red flags that disqualify a comparable:** TVL that spiked right after token incentives launched; a single wallet holding most of the TVL; TVL rising while fees fall; protocol TVL rising while the chain's is flat, which means it is taking share from neighbours, not growing demand.

**Not on DefiLlama?** Read the money onchain. Find the comparable's fee or treasury account from its docs or IDL, then sum 30 days of inflows with an explorer or an indexer. Published fee schedules also count, with a link and a date: [Jupiter Mobile's](https://docs.jup.ag/user-docs/global/mobile/fees), for example, lists 0, 10, 20 and 50 bps by pair class (checked 2026-10-05).

## 2. Bounty and grant rates for the same job

If someone already paid to get this job done once, that is a price. Search [Superteam Earn](https://superteam.fun/earn) listings and ecosystem grant pages for the same deliverable, and record the amount, the sponsor and the date. If your product does that job repeatedly, its recurring price should sit below the one-off rate × how often the job recurs. Otherwise the customer is better off posting another bounty.

## 3. The cost of the bad alternative

What the customer pays today without you:

- an engineer's months to build and maintain it in-house
- a centralised vendor's invoice
- an ops person running a multisig workflow by hand
- the gas they already spend on a clumsy workaround, which is visible onchain
- the loss they currently eat to failed transactions, slippage or MEV

**Value ratio** = alternative cost ÷ your price. beingsmit's rule of thumb, which is one practitioner's heuristic and not measured data: above 10x you are badly underpriced, above 5x underpriced, 3 to 5x healthy, under 3x near the ceiling, and under 2x you need a strong differentiator. Anchor to the alternative, not to competitors' prices. Competitor anchoring is a race to the bottom, and for a protocol fee the bottom is zero.

## The signal ladder

Grade the demand evidence behind the number before trusting it. Rungs are ordered from strongest to weakest:

| Rung | Signal | Why it counts |
|---|---|---|
| 1 | Paid pilot, prepayment, or a fee already collected at this price | Money moved |
| 2 | Users already pay gas for a workaround, and the pattern is growing onchain | Spend you can verify |
| 3 | A protocol posted a bounty for it | There is a budget line behind the need |
| 4 | People maintain a manual or hacked-together version | They want it enough to waste time on it |
| 5 | An open-source attempt has active forks, or several teams tried and failed | The need is real, even if the solution is hard |
| weak | "I'd definitely use that" in a DM; upvotes; "the market is huge"; VC interest without user pull; a hackathon prize for the category | Costless to give. Don't price on these alone. |

Score the evidence:

- **3:** several strong rungs from independent sources
- **2:** one strong rung plus some weak signals
- **1:** weak signals only
- **0:** nothing, or demand for a different thing

Below 2, the price is a hypothesis. Say so in `pricing.md`, and make the falsification test cheaper and sooner.
