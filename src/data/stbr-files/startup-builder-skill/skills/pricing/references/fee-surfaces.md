# Fee surfaces, payers and token gates

Where an onchain product can take money, who ends up paying it, and the token-gate trap.

## Fee surfaces

"Visible before signing" means the user can see this fee in the wallet's simulation of the transaction, before they approve it. Wallets show net balance changes. They don't show labelled line items unless your UI itemises them.

| Surface | How it's taken | Visible before signing? | What breaks |
|---|---|---|---|
| **Protocol fee in bps** | The program moves `amount × bps / 10_000` to a treasury inside the instruction | Only as a smaller net amount, unless the UI itemises it | Rounding on small amounts: pick ceil or floor deliberately, or dust trades go free. Large trades need a cap, or they route elsewhere. |
| **Flat lamports per action** | SOL transfer to a treasury in the same transaction | Yes, as a separate SOL debit | Regressive. It is a large share of a small action and ignored on a large one, and it is detached from value. Also, users with no SOL can't pay it. |
| **Spread** | Built into the quote or exchange rate | No. The user sees only what they receive | Comparable only against another venue's quote. Aggregators route away the moment your spread is worse, and if users find a spread you didn't disclose, the trust cost exceeds the revenue. |
| **Token-2022 transfer fee** | Withheld from every `TransferChecked` into the recipient's token account, then harvested | Yes, if the wallet reads the extension. Many UIs show only the received amount | It taxes every transfer, including secondary ones you don't facilitate. Collecting it takes harvest and withdraw transactions. Some venues restrict fee-bearing mints. Mechanics: ai-kit's [token-extensions fees reference](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/skills/token-extensions/references/fees.md). |
| **Aggregator platform fee** | An integrator adds its own bps on top of a router's swap (Jupiter's swap API has a platform-fee parameter) | Usually, as part of the total fee | Your fee stacks on the venue's fee. Jupiter's own [swap FAQ](https://docs.jup.ag/user-docs/trade/swap/faq) warns users about browser extensions that inject extra platform fees, which tells you users do read that line. |
| **Sponsored-fee recovery** | You pay the network fees and recover them from the asset | No, only as a worse output | The recovery is fixed per transaction, so it is a large percentage of small trades. Jupiter adds the gas cost to the swap fee, charges no extra fee for gasless itself, and offers gasless only while that cost stays within 10% of the trade, hence a minimum trade size ([Jupiter swap FAQ](https://docs.jup.ag/user-docs/trade/swap/faq), checked 2026-10-05). |
| **Rent capture** | The program closes user-funded accounts and sends the rent refund to the treasury instead of the user | Only on an explorer, after the fact | It is a fee whether or not you call it one, and users who read explorers notice. Its value can also fall: rent has been cut twice and further cuts are proposed (see [floor-costs.md](floor-costs.md#rent)), so don't build revenue on it. |
| **Offchain subscription or API tier** | Invoice, card or stablecoin payment outside the program | Not applicable, since there is no signing step | The usual SaaS failure modes. The hybrid that tends to hold is a platform fee that covers your cost to serve, plus a usage component that tracks value (beingsmit's "hybrid that usually wins"). |
| **Token-gated tier** | Hold or stake N tokens to unlock features | Not applicable | See [Token-gated tiers](#token-gated-tiers). |

Choose the surface the customer with the budget can see and predict. Hiding a fee is a decision about the trust you will lose once it is found, not a pricing decision.

## Payer ≠ user

In a large share of Solana products the wallet that signs isn't the wallet that pays, and neither is the customer with a budget. Price for the party with the budget.

| Pattern | Who actually pays | Pricing consequence |
|---|---|---|
| **Fee payer is a separate signer** (relayer or paymaster, e.g. the Solana Foundation's [Kora](https://github.com/solana-foundation/kora)) | Whoever funds the relayer | Your cost per sponsored action is the signatures, priority fee and any rent you front. Sybil wallets can drain a sponsor, so put a per-wallet cap or an allow-list in the price, and bill the funder per sponsored transaction or per month. |
| **Sponsor, then recover from the asset** (gasless swap) | The user, inside a worse output | The cost is fixed per transaction, so there is a minimum trade size below which recovery exceeds any sane cap. Publish that minimum. |
| **Integrator pays for its users** (wallet, app or protocol embeds you) | The integrator | The end user never sees your price. Price per volume, per MAU or per call to the integrator, and treat the integrator's margin on its users as your ceiling. |
| **Foundation or grant pays** | The grantor, against milestones | That is a customer with a deliverable, not recurring revenue. Investors read a product that only grants pay for as grant-dependent, and ask what happens when the grants stop. |
| **DAO pays** | The treasury, after a governance vote | The purchase process is a proposal. Price to fit one budget line, expect weeks, and expect the vote to be public. |

## Token-gated tiers

**The 5x test.** Holding or staking N tokens is a price set in tokens, while your costs are in SOL and dollars. Recompute the tier at 5x and at 0.2x today's token price:

- **5x up:** the tier now costs a new user five times as much in dollars. Existing holders get a windfall and new users stop converting. Growth stalls exactly when the narrative looks best.
- **0.2x down:** the tier costs a fifth as much, but your per-user floor cost hasn't moved. If 0.2x puts it below the floor, every new tier user loses you money.

**Pricing as token demand.** "Users must buy the token to use the product" is not revenue. When a user buys the token from another holder on a DEX, the company receives nothing, while the user's usage still costs you RPC, fees and rent. Pitching that purchase as buy pressure presents the token as an investment that depends on the team's efforts. That is a classification question, so route it to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) (`/airdrop-assessment`, tokenomics-legality decision tree). Don't answer it here. The same applies to any plan to share fees with token holders.

**Safer shapes, commercially:**

- Price the tier in dollars or a stablecoin, and accept the token at an oracle rate. That adds an oracle read to the floor cost.
- Gate on stake duration and charge a dollar-denominated fee alongside it.
- Publish a re-peg rule: how often N is reset against a dollar target, and who decides.

These are commercial patterns. Their legality is still crypto-legal's question.
