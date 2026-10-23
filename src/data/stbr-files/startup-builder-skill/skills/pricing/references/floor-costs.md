# Floor costs

The costs that exist whether or not you charge. A pricing page that ignores them prices below cost. Every number here is dated, so re-query on the day you price, and write the date you used into `pricing.md`.

## Per-action formula

```
floor per action =  signatures × lamports_per_signature
                  + priority fee (on the requested CU limit, not the CU used)
                  + rent you front and don't get back
                  + oracle updates you post
                  + RPC and indexer spend per action
                  + failed and retried attempts (they pay the fees too)
```

Convert lamports to dollars at the SOL price on the date, and show the floor at the volume you have, at 10x, and at break-even.

## Transaction fees

Checked 2026-10-05 against the [Solana fee structure docs](https://solana.com/docs/core/fees/fee-structure):

- **Base fee:** 5,000 lamports per signature, including signatures verified by the Ed25519, Secp256k1 and Secp256r1 precompiles. 50% is burned and 50% goes to the leader. It is charged even when the transaction fails.
- **Priority fee:** `ceil(CU price in micro-lamports × CU limit / 1,000,000)` lamports, all of it to the leader. It is charged on the **requested** limit, so set the limit from a simulation plus a margin, or you pay for compute you don't use. Version 1 transactions carry the priority fee as an absolute lamport total in the message config instead of a per-CU price, so don't port the per-CU arithmetic onto them.
- **Pending change:** [SIMD-0553](https://github.com/solana-foundation/solana-improvement-documents/blob/4b643ca8746742183a469681765e694b385bb315/proposals/0553-resource-fee-burn.md) (Draft) would split the base fee into a 2,500-lamport inclusion fee and a burned resource fee that scales with requested cost units. On 2026-10-05 none of its three feature accounts existed on mainnet, so the 5,000-lamport fee stands. Check again before pricing compute-heavy actions.

**Sizing the priority fee.** Don't price from the raw output of `getRecentPrioritizationFees`. It reports a low-end fee per recent slot, often 0, and that understates what a transaction needs to land under load. Use a provider's estimate API or, better, the 50th and 90th percentiles of your own landed transactions. Price on the 90th: that is what a busy day costs.

Arithmetic example (the CU price is illustrative, not a recommendation): one signature, a 200,000 CU limit at 10,000 micro-lamports per CU:

```
priority = 200,000 × 10,000 / 1,000,000 = 2,000 lamports
fee      = 5,000 + 2,000               = 7,000 lamports
```

## Rent

```
min_balance = (128 + data_len) × lamports_per_byte
```

Read live from mainnet on 2026-10-05: the Rent sysvar gave `lamportsPerByte = 5080` and `getMinimumBalanceForRentExemption` returned the following.

| Account | Data bytes | Rent-exempt minimum (lamports) | SOL |
|---|---|---|---|
| Empty (system) | 0 | 650,240 | 0.00065024 |
| SPL Token mint | 82 | 1,066,800 | 0.0010668 |
| SPL Token account | 165 | 1,488,440 | 0.00148844 |

A Token-2022 account with extensions is larger, so compute it from its length with the formula.

**Rent is moving.** 5080 is the second step of [SIMD-0437](https://github.com/solana-foundation/solana-improvement-documents/blob/4b643ca8746742183a469681765e694b385bb315/proposals/0437-incremental-rent-reduction.md)'s proposed sequence: 6960 → 6333 → **5080** → 2575 → 1322 → 696. SIMD-0437 is still `status: Idea`, and the later steps have no feature keys, so they are not scheduled; each would need its own feature gate and a risk analysis. So any rent figure in a pricing model is a point on a falling line, including the commonly quoted 0.00203928 SOL for a token account, which is the pre-reduction 6960 value. Re-query `getMinimumBalanceForRentExemption(len)`, or read `SysvarRent111111111111111111111111111111111`, every time.

**What rent means for price:**

- Rent is a deposit, not an expense. Closing the account returns it. It becomes a cost only if nobody ever closes the account, or if you choose who gets the refund (see rent capture in [fee-surfaces.md](fee-surfaces.md)).
- It dominates onboarding. In the example above, creating one token account for a new user costs about 200 times the transaction fee. If you front the token account for every new user, onboarding cost is a rent problem, not a fee problem, and your price has to carry it until the account closes.
- Fronted rent is working capital: count it at peak open accounts, not per action.

## RPC and indexing

- Count the calls per user action: reads (`getAccountInfo`, `getMultipleAccounts`; `getProgramAccounts` is usually the expensive one), the send, confirmation polling or websocket subscriptions, and webhooks or streams.
- Providers price in credits or requests per plan, and plans change. Take the credit cost per method from the provider's current pricing page, and record the URL and date.
- Indexers, analytics warehouses and data APIs are a monthly floor, not a per-action cost. Spread them over expected volume.

## Oracles

- **Pull oracles** (Pyth's Solana receiver is the common one): the transaction that needs a fresh price posts the update. The poster pays the fees and the rent for the price-update account, and gets the rent back by closing that account. Pyth's [Solana integration docs](https://docs.pyth.network/price-feeds/core/use-real-time-data/pull-integration/solana) note that posting and verifying an update currently takes more than one transaction, so each fresh price costs several signatures, not one.
- Whoever posts the update is a payer ≠ user decision. If your keeper posts it, that is your floor. If the user's transaction posts it, that is their cost and part of your price.
- Pyth's Hermes, where pull updates are fetched, has required an API key since 2026-08-26 ([Pyth docs](https://docs.pyth.network/price-feeds/core/upgrade/preparing)). Count that access in the oracle floor at its current terms.
- Low-latency or premium data tiers are subscriptions. Price them from the provider's current terms.

## What to write in `pricing.md`

The table of components, with per-action lamports, the dollar value at the dated SOL price, the source of every rate, and the date. Then the floor at three volumes.
