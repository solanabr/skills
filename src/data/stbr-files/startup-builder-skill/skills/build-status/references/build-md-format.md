<!-- Adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/data/specs/phase-handoff.md (build-context.md section and Merging Rules), MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. Build Status, Milestones and the merge rules are kept; Traction and What works today are new; the tooling inventory and the review verdict are dropped. -->

# `.claude/context/build.md` format

The contract for anything that writes or reads `build.md`. The producer in this repo is
[build-status](../SKILL.md). A tool in another repo — for example ai-kit's `/deploy` or
`/plan-feature` — may write the sections it owns, as long as it follows the rules below.
Readers: `idea-sprint`, `pitch-deck`, `hackathon`.

## Rules

1. **Read before writing.** Merge into the existing file; never start it over.
2. **Never delete a section someone else wrote.** Add or update your own.
3. **Lists append** (Milestones). **Scalars overwrite** with the latest value (table cells).
4. **What works today is a snapshot**: rewrite it in full on each run after re-checking it,
   because a flow that broke must leave the list.
5. **Every traction number has a source** — a query, an endpoint or a named system. No source,
   no row.
6. **Mainnet and devnet never mix.** Devnet activity is evidence the code runs, not traction.
7. **No readiness verdict.** There is no "Ready for mainnet: Yes" field. Readiness follows from
   the facts — open Critical or High findings mean not ready — and a boolean next to an open
   finding contradicts it.
8. Update `Updated` on every write. The file is plain markdown that people may edit; there is
   no "do not edit" banner.

Omit a section you have nothing for. Keep the headings exactly as below so readers can find them.

## Format

```markdown
# Build

Updated: 2026-10-05 · by build-status

## Stack

| Field | Value |
|-------|-------|
| Program framework | Anchor 1.0 |
| Programs | escrow |
| Client | Next.js + @solana/kit |
| Repo | <repo URL> @ 3f2c1d0 |

## Build Status

| Field | Value | Source |
|-------|-------|--------|
| Tests passing | Yes, 42/42 | `anchor test`, 2026-10-04 |
| Devnet program ID | Esc1...devnet | `.program-id-devnet` |
| Mainnet program ID | Esc1...main | `.program-id-mainnet` |
| Mainnet deployed | 2026-09-30, slot 371234567 | `solana program show` (slot), `solana block-time <slot>` (date) |
| Upgrade authority | Squads vault 7xQ... (3-of-5) | `solana program show` (address); Squads multisig account (threshold) |
| Verified build | Yes, commit 3f2c1d0 | verify.osec.io status, 2026-10-05 |
| Audit | Acme Audits, 2026-09-20 | `audits/2026-09-acme.pdf` |
| Open findings | 0 Critical, 0 High, 1 Medium | `audits/2026-09-acme.pdf` |

### Milestones

- [x] Escrow program on devnet (2026-09-02)
- [x] External audit, all High findings fixed (2026-09-20)
- [x] Mainnet deploy, verified build (2026-09-30)
- [ ] Jupiter routing integration

## What works today

- Create, fund and release an escrow on mainnet — tx 5h6x...
- Dispute flow on devnet only — tx 3kQp...

Known broken: refunds after expiry fail on mainnet (issue #41).

## Traction

| Metric | Value | Window | As of | Source |
|--------|-------|--------|-------|--------|
| Active user wallets | 412 | 7 days | 2026-10-04 | Dune query 1234567 |
| Successful txs | 3,180 | 7 days | 2026-10-04 | Dune query 1234567 |
| Volume | $182k USDC | 30 days | 2026-10-04 | Dune query 1234568 |
| Fees earned | $910 | 30 days | 2026-10-04 | fee vault 9Fe... balance history |
| D30 retention | 31% (Sep 1 cohort, n=88) | — | 2026-10-04 | Dune query 1234569 |
| Waitlist | 1,240 | total | 2026-10-04 | signups table, `select count(*)` |

Caveats: team and test wallets excluded (list in `analytics/excluded.txt`); a quest campaign
ran 2026-09-10 to 09-17.
```

## Field notes

- **Upgrade authority** is the field investors and integrators read first: a single deployer
  key, a multisig vault (give the threshold), or none. `solana program show` prints only the
  address. It can't tell you the address is a Squads vault or give the threshold; read both from
  the Squads multisig account the vault PDA derives from (the Squads app, or the v4 multisig
  account).
- **Verified build** means the verifier's status says verified for this program ID — not that
  the build command was run. Give the commit it verified.
- **Active user wallets** counts users, not fee payers. When a relayer or the app pays fees,
  the fee payer is one wallet for everyone; see
  [traction-sources.md](traction-sources.md).
- Write absolute dates. "Last week" is wrong by the time someone reads it.
