<!-- The "phantom users" checks are adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/build/roast-my-product/references/common-crypto-product-sins.md (sin 7), MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. The rest is new. -->

# Traction sources

How to get each `build.md` traction number on Solana, and how each one gets inflated. Sources
checked 2026-10-05.

## Where the data comes from

| Route | Use it for | Notes |
|-------|-----------|-------|
| Dune `solana.instruction_calls` ([docs](https://docs.dune.com/data-catalog/solana/instruction-calls)) | Users, transactions, retention | Has top-level and CPI calls (`is_inner`), `executing_account`, `account_arguments`, `tx_signer`, `tx_success`, `block_time`. Save the query and cite its ID. |
| RPC `getSignaturesForAddress` on the program ID ([docs](https://solana.com/docs/rpc/http/getsignaturesforaddress)) | Early stage, small counts | Newest first; page back with `before`. Includes failed transactions — drop those with `err` set. Then `getTransaction` per signature for accounts. Slow at volume. |
| DefiLlama `https://api.llama.fi/protocol/{slug}` | TVL, once listed | Cite the slug and date. ([API docs](https://api-docs.defillama.com)) |
| DefiLlama `https://api.llama.fi/summary/fees/{slug}?dataType=dailyFees`, `/summary/dexs/{slug}` | Fees, DEX volume, once listed | Same. Not listed yet → compute from your own vaults. |
| Fee or treasury vault balance history | Fees earned | Name the vault address. |
| Your own backend (signups, waitlist, API keys) | Off-chain metrics | Cite the table and query, not a dashboard screenshot. |

If the Helius MCP is loaded, its parsed transaction history for the program ID is a faster
route to the same counts as the RPC path.

## Per metric

**Active user wallets.** Distinct *user* wallets that called the program in the window. On
Dune, `tx_signer` is the fee payer. When the app, a relayer or a sponsor pays fees (common on
Solana), every user shares one fee payer and `count(distinct tx_signer)` collapses to 1–2.
Count the user's account from `account_arguments` at the position your instruction defines
for the user signer instead. Exclude team, test and bot wallets and keep that list in the repo.

**Successful transactions.** Filter `tx_success = true`. Decide whether CPI calls into your
program from integrators count (`is_inner = true`) and say which in the source cell — they are
real usage, but they are someone else's users.

**Volume.** Sum token amounts moved into or out of your program's vaults, priced at the time of
each transfer, in one currency. State the token(s). Never quote volume from devnet or from
self-trades between team wallets.

**Retention.** Cohort users by the week of their first successful call; D30 = share of that
cohort with another successful call between day 30 and day 37. Give the cohort size — 31% of
12 says something different from 31% of 1,200.

**TVL.** As of a date, from DefiLlama or the sum of vault balances. TVL from your own token at
your own price is not comparable to TVL in SOL or USDC; split it out.

## Inflation checks (run before writing a number)

A crypto-literate reader will run these on you, so run them first:

- **Wallets vs. active transactors.** "10,000 wallets connected" against 50 that transact is
  the classic inflated number. Report transactors.
- **Concentration.** Share of transactions from the top 10 wallets. Above half, say so.
- **Incentive windows.** Activity during an airdrop, points or quest campaign, and the drop
  after it ends. Note campaign dates in Caveats.
- **Funding graph.** Many new wallets funded from one source in the same minutes are one user.
