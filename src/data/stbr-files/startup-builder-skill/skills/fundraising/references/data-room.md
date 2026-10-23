<!-- The onchain metrics rows are adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/crypto-pitch-examples.md ("On-Chain Metrics That Matter"), and the merge rules from skills/data/specs/phase-handoff.md (MIT © 2026 SendAI and Superteam). Rewritten and extended; notice in THIRD_PARTY_NOTICES.md. -->

# Data room for a crypto team

A SaaS data room is mostly corporate documents. In a crypto data room the first things an investor checks are on chain, and they check them without asking you. Index those first, then the corporate set.

## The index

| # | Section | Items | How to produce or verify |
|---|---|---|---|
| 1 | **Programs** | Program IDs per cluster; deploy dates; current upgrade authority; IDL location | `solana program show <PROGRAM_ID>` shows the upgrade authority and the last deploy slot. ai-kit's `/build-program` covers verifiable builds. |
| 2 | **Verifiable build** | Whether the deployed bytecode matches a public commit, and which commit | A `solana-verify` run against the repo and commit. "Audited" means little if the audited commit is not the deployed one. |
| 3 | **Authorities and keys** | Every authority: upgrade, mint, freeze, Token-2022 extension authorities (fee config, permanent delegate, pause, transfer hook), and admin or config signers. For each: holder type (single key, multisig, governance, revoked), threshold, timelock, and what it can do. | Read from the chain. crypto-legal's `program-authority-auditor` (program) and `token-inspector` (mint) agents read these and say what each signals. |
| 4 | **Multisig** | Address, signer roles (not names, if signers are pseudonymous), threshold, whether signers are independent people on independent devices | The multisig's own UI or account data |
| 5 | **Security** | Audits: auditor, scope, audited commit, date, and findings by severity with fix status. Bug bounty terms. Incident history with postmortems. | Link the reports. Match each audited commit to row 2. |
| 6 | **Onchain metrics** | The [metrics](#metrics) below, each with the query that produces it | Dashboards, plus the definitions in `build.md` and `data-room.md` |
| 7 | **Revenue onchain** | Fee or treasury account addresses, and revenue by month reconciled to the bank or stablecoin accounts | Inflows to the fee account. Model and number from `pricing.md` if present. |
| 8 | **Token** (if one exists) | Mint address; supply; allocation table with **the address of every allocation**; vesting contracts and schedules; the unlock calendar for the next 12 months; liquidity position and whether the LP is locked | Onchain addresses and the vesting program's accounts. Every row needs an address. |
| 9 | **Dependencies** | Oracles, RPC providers, bridges, and the integrations that carry volume, with the share of volume each carries | [counterparty-gate](https://github.com/solsentry/solana-counterparty-gate) vets the operators you depend on |
| 10 | **Grants** | Grantor, amount, date, milestones, delivered or open, and any clawback | Grant agreements |
| 11 | **Financials** | Burn; runway in stablecoins only and in total; treasury composition by asset | Treasury addresses plus bank statements |
| 12 | **Corporate and legal** | Entity and jurisdiction; cap table; SAFEs and notes; **token warrants, side letters and SAFTs**; any foundation and its relation to the company; terms of service; prior legal memos | List them; don't characterise them. Classification and structure questions go to crypto-legal-skill (see [token-vs-equity.md](token-vs-equity.md)). |
| 13 | **Product and narrative** | Deck, demo, docs; `positioning.md`, `pricing.md` and `build.md` if present | The deck is [pitch-deck](../../pitch-deck/SKILL.md)'s |

## Metrics

Traction metrics already have one definition: the Traction table in `build.md` ([build-md-format.md](../../build-status/references/build-md-format.md)), written by build-status. Quote its rows with their names, windows and definitions as they are (Active user wallets over 7 days, Successful txs, Volume, Fees earned, D30 retention, Waitlist), and don't redefine them here. Active user wallets counts users, not relayer fee payers. If a row is missing, run build-status rather than defining it here. `data-room.md` adds only the rows below, which `build.md` doesn't carry. Never change a definition silently: add a new metric and keep the old one.

| Metric | Why an investor asks | Definition to pin down | Proof |
|---|---|---|---|
| **Active user wallets (sybil-adjusted)** | Whether the wallets are people | `build.md`'s Active user wallets, same window, minus the clusters you exclude: wallets funded from the same source, wallets active only around incentive or airdrop windows, and wallets below an activity floor you fix in advance (≥ N transactions on ≥ M days) | The same query with the filters, and the filters written down |
| **Transaction concentration** | Bot or farm detection | The share of `build.md`'s Successful txs, and of its Volume, from the top 10 wallets | A query |
| **TVL** (if you custody deposits) | Economic commitment | DefiLlama's figure for your slug, or your own sum of vault balances | The DefiLlama protocol page or the API `https://api.llama.fi/tvl/{slug}` |
| **Composability** | Platform potential | The protocols that call your program through CPI or route volume to you, with each one's share | A list with program IDs |
| **Grant share of income** | Grant dependence | Grants ÷ (grants + `build.md`'s Fees earned), trailing 6 months | Grant agreements plus the fees query |

The last point is a judgment call. When incentives were running, report organic and incentivised figures separately. The investor will see the post-incentive drop on chain anyway.

## `.claude/context/data-room.md` format

Merge rules: overwrite scalars (dates, statuses); append to lists; never delete another skill's section.

```markdown
# Data room

Last updated: YYYY-MM-DD · Shared with: <fund, date> (append)

## Index
| # | Item | Location (link) | As of | Owner | Status |
|---|---|---|---|---|---|
| 1 | Program IDs + upgrade authority | | | | ready / missing / n/a |

## Metric definitions
<Only the rows build.md's Traction table doesn't carry.>
| Metric | Definition | Query / link | Owner | Last run | Value |
|---|---|---|---|---|---|

## Diligence answers
| Question (bank ref) | Honest answer | Proof | Risk left | Mitigation + date | Status |
|---|---|---|---|---|---|

## Open items
- [ ] <item> — owner — routed to <crypto-legal-skill | ai-kit command> — due

## Routed legal questions
<Question, date routed to crypto-legal-skill, status. Never a conclusion written here.>
```
