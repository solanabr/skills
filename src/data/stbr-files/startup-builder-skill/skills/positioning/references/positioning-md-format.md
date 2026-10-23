<!-- "Words to avoid" defaults are adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/launch/tone-guide.md lines 31-45, MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. The rest is new. -->

# `.claude/context/positioning.md` format

The single source of truth for who the product is for and how to describe it. Producer:
[positioning](../SKILL.md). Readers: `pitch-deck`, `hackathon`, `idea-sprint`, and any
content, brand or launch tool that wants an audience instead of asking for one.

## Rules

1. **Read before writing**, and merge. Overwrite a section only when the founder has changed
   that decision; note the change and the date under Changelog.
2. **Readers copy, they don't rewrite.** A deck or tagline uses the one-liner as written. If a
   reader needs a different one, change it here first.
3. **Every proof point has a source.** No source, no proof point.
4. Keep the headings exactly as below. Omit a section you have nothing for.

## Format

```markdown
# Positioning

Updated: 2026-10-05 · by positioning

## One-liner

Primary: Escrow for OTC token deals that releases only when both sides have paid.
Plain: Lets two strangers swap tokens without trusting each other or a middleman.
Anchor: Squads for one-off OTC deals.

## ICP

- **Buyer:** OTC desks and DAO treasuries that settle 5+ off-exchange deals a month.
- **User:** the desk's operator signing the deal; the counterparty, who never installs anything.
- **Decides via:** desk lead; for DAOs, a treasury proposal.
- **Not for:** retail swappers (use an aggregator), anyone needing fiat legs, deals under ~$10k
  where fees dominate.

## Job to be done

When we agree a token deal in a Telegram chat, we want both legs to settle at once, so neither
side has to send first and hope.

## Alternatives

| Alternative | What it is | We win on | It wins on |
|-------------|-----------|-----------|------------|
| Send-first and trust | Today's default | No counterparty risk | Zero setup |
| Escrow agent / middleman | A person holding funds | Non-custodial, settles in one tx | Handles disputes |
| Generic multisig | Shared vault per deal | One link per deal, no signer setup | Already trusted |

## Proof points

- Verified build of the escrow program at commit 3f2c1d0 — verify.osec.io status, 2026-10-05
- 3,180 successful settlements in 7 days — build.md Traction (Dune query 1234567)
- Upgrade authority held by a 3-of-5 Squads vault — `solana program show` (address), Squads multisig account (threshold)

## Words to avoid

| Avoid | Say instead |
|-------|------------|
| decentralized escrow protocol | releases when both sides have paid |
| trustless | non-custodial; neither side can take the funds |
| significant adoption | 3,180 settlements in 7 days |

## Changelog

- 2026-10-05: ICP narrowed from "any token holder" to desks and DAO treasuries.
```

## Default words to avoid

Every `positioning.md` starts with these, and the team adds category-specific ones:

- Generic filler: "in today's rapidly evolving landscape", "at the forefront of innovation",
  "cutting-edge". Say what changed and when.
- Vague traction: "significant adoption", "massive volume", "growing fast". Quote the number
  and its window from `build.md`.
- Describing what it **is** instead of what it **does**: "a decentralized liquidity protocol"
  → "finds the best swap price across Solana DEXs".
- Hedging ("perhaps", "one could argue") and filler transitions ("furthermore").
- "Trustless", "secure", "decentralized" without the property behind them: name it (no admin
  key, verified build, non-custodial) and its proof.
- Returns language — "yield", "APY", "earn", "passive income" — attached to your token or to
  fee sharing. That is a classification question; route it to
  [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) before it reaches copy.

Jargon the ICP itself uses (TVL, AMM, LP, perps, MEV, CLOB) is fine for a builder audience.
Keep the plain one-liner jargon-free.
