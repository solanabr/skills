---
name: build-status
description: Capture what is built, deployed and used into .claude/context/build.md — program IDs, verified build, audit state, what works today, and traction with the query behind each number. Use before a deck, hackathon submission, grant or investor update, or when asked "what have we shipped".
user-invocable: true
---

# Build Status

Inspect the repo and the chain → record what is true today → write `.claude/context/build.md`.
Every claim gets a source. This file feeds `pitch-deck`, `hackathon` and `idea-sprint`, so a
wrong number here ends up on a slide.

Format and merge rules (the contract every producer follows):
[build-md-format.md](references/build-md-format.md).

## Context handoff

- At start: read `.claude/context/build.md` if present and merge into it; read
  `.claude/context/idea.md` if present for the product name and the core flow.
- On completion: write `.claude/context/build.md`. Never delete a section another skill or
  tool wrote.

## Workflow

### 1. Gather from the repo, not the founder

Ask only for what the repo cannot tell you. Look first:

- Program IDs: `declare_id!`, `Anchor.toml` `[programs.*]`, and the files ai-kit's
  [`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md)
  records (`.program-id-devnet`, `.program-id-mainnet`, `deployment-mainnet.json` with
  deployer, upgrade authority and commit).
- Tests: run the suite once and record pass/fail with the date. Don't record "passing" from
  memory or from a CI badge you did not check.
- Audit state: the latest report in the repo, or an `/audit-solana` findings file. Count open
  findings by severity.
- Milestones: `git log` tags and merge commits, dated.

### 2. Confirm against the chain

For each program ID on mainnet (and devnet, labelled as such):

- `solana program show <ID> -u <cluster>` → exists, upgrade authority, last deploy slot.
- Verified build: `https://verify.osec.io/status/<ID>` returns `is_verified`, the repo and the
  commit. "Built with `solana-verify`" is not the same as verified; only the status counts.
- Upgrade authority is a trust fact, not a detail: deployer key, a Squads vault, or none
  (immutable). Write which. For a vault, take the threshold from the Squads multisig account,
  not from `solana program show`, which prints only the address.

### 3. What works today

List only flows a stranger could run right now, each with its cluster and a proof — a
transaction signature, an explorer link or a live URL. Re-check the list on every run and drop
anything that no longer works; roadmap never goes here. Optionally note known-broken flows
underneath so nobody demos them by accident.

### 4. Traction, with sources

Mainnet only. For each number: value, window, as-of date, and the query or system it came
from. A number without a source is not written. Methods per metric, and the Solana-specific
ways these numbers get inflated: [traction-sources.md](references/traction-sources.md).

Pre-launch is fine — write the waitlist or pilot counts with their source, or write
"none yet". Don't let a deck invent what this file says is zero.

### 5. Write and show the diff

Merge per the format rules, set `Updated`, and show the user what changed against the
previous version. Flag any number that moved more than 2x since the last run and ask why
before keeping it.

## Hand-offs

- Deploy, verification, audits: ai-kit's
  [`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md),
  the verify-PDA upload and `solana-verify remote submit-job` in its
  [deployment skill](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/skills/deployment.md#mainnet-first-deploy)
  (`/deploy` only verifies locally; the verify.osec.io status flips after the submit-job),
  [`/build-program`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/build-program.md)
  and [`/audit-solana`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/audit-solana.md).
  This skill records their results; it doesn't redo them.
- Next: [pitch-deck](../pitch-deck/SKILL.md) or [hackathon](../hackathon/SKILL.md), which
  pre-fill traction and "what works" from this file.
