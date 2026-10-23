---
name: launch
description: Plan and run a Solana launch day as a runbook gated on the onchain event (deploy, mint, TGE, liquidity add, audit release), with T-minus gates, slip and abort rules, channel order and pre-staged copy. Use for "/launch", "launch day plan", "announcement sequence" or "the deploy slipped".
user-invocable: true
---

# Launch

A launch on Solana is coupled to a transaction that either lands or does not. This skill
writes a runbook in which nothing public happens until that transaction is finalized and
checked, so a slip moves the schedule instead of breaking it. It is a sequence, not a list
of ideas.

It does not deploy anything (ai-kit's
[`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md)
does), and it does not answer legal questions
([crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) does).

## Context handoff

At start, read `.claude/context/idea.md`, `build.md`, `positioning.md` and `pricing.md` if
present. Take the one-liner and the words to avoid from `positioning.md`, and what works
today from `build.md`. If `.claude/context/launch.md` exists, resume it: report its status
and the next open gate instead of starting over.

Writes `.claude/context/launch.md` in the format defined in
[runbook.md](references/runbook.md#runbook-file-layout), and the drafts it lists under
`launch/` in the project.

## Mode 1: plan (any time before T-24h)

1. **Pin the event.** Ask only what the context files do not answer:
   - which onchain event: program deploy or upgrade, mint or TGE, liquidity add, airdrop
     claim, audit release (several are fine; each gets its own G0 row)
   - planned T-0 as a date in UTC, and who signs (deployer key or multisig, threshold)
   - whether a token is involved, and in which jurisdictions users are
   - partners who will amplify, and the team's own channels
2. **Build the gate list** from [runbook.md](references/runbook.md). Keep the rows that
   apply, compute T- dates from T-0, and name an owner per row. Every gate gets a condition
   that is true or false.
3. **Legal gates L1 (T-30d) and L2 (T-7d) are hard gates.** Tell the user to run
   crypto-legal-skill's `/launch-checklist`, and record counsel's sign-off in the runbook
   with name and date. That skill writes no file, so the runbook is where the sign-off
   lives. Do not mark either gate passed on the user's say-so that "legal is fine".
4. **Readiness is engineering's.** If the verifiable build, IDL or audit is not done, route
   to ai-kit ([`/build-program`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/build-program.md),
   [`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md),
   [`/audit-solana`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/audit-solana.md))
   and leave the T-14d gate open.
5. **Fill the key-holder table and the abort criteria** from
   [slip-and-abort.md](references/slip-and-abort.md). Mark every step reversible or not.
   Two names per key. Decide the abort criteria now, not on the day.
6. **Plan the channels** with [channels.md](references/channels.md): the order, the partner
   kit, the Superteam chapter and other ecosystem accounts, and a separate day for Product
   Hunt or Show HN.
7. **Draft the artifacts** in [artifacts.md](references/artifacts.md), including the hold,
   slip and abort messages. Pages start from [launch-post.html](references/launch-post.html)
   and stay one self-contained HTML file. Use writer-style-skill and content-gen-skill for
   voice and long-form if present.
8. **Write `.claude/context/launch.md`** with status `planning`, then `armed` once every
   T-24h gate has passed.

## Mode 2: execute (launch day)

Run `/launch` again on the day. Walk the gates in order and write a UTC timestamp into the
runbook as each one passes.

- **Before G0, nothing public.** No post, no scheduled post, no partner "go", no Product
  Hunt.
- **G0 is a finalized transaction checked from a second RPC**, against the event's row in
  runbook.md. A wallet's success toast is not G0.
- **After G0, the L+ clock runs.** Fill only the address placeholders, then release the
  artifacts in channel order.
- **On a slip:** send the partner hold message at once, set a decision time, and post the
  public slip message only if a time was public. See
  [slip-and-abort.md](references/slip-and-abort.md#slip-handling).
- **On an abort:** run the abort steps there. If part of the onchain state already landed,
  this is now an incident; use [incident-comms](../incident-comms/SKILL.md).
- **At L+24h:** set status `landed`, log what slipped and why, and list the listings still
  pending.

## Rules

- No public copy carries a wall-clock time. Partners post after your post.
- The ticker and the mint address are published together, after G0, from your account
  first.
- Revoking authorities, adding first liquidity and opening claims are separate steps with
  their own gate, never folded into the launch batch to save time.
- Anything legal or tax-related goes to crypto-legal-skill. Say so and stop. Do not
  improvise an answer.
