---
name: positioning
description: Write the one-liner, ICP with disqualifiers, job to be done, three named alternatives and proof points once, into .claude/context/positioning.md, so the deck, site, docs and launch post say the same thing. Use for "positioning", "ICP", "who is this for", "value prop", "how do we describe this".
user-invocable: true
---

# Positioning

Pin down who it is for → what it replaces → why you win → write `.claude/context/positioning.md`.
The artifact matters more than the interview: every other skill reads it instead of re-deriving
the audience, and that is what stops the deck and the launch post from drifting apart.

Format and section rules: [positioning-md-format.md](references/positioning-md-format.md).

## Context handoff

- At start: read `.claude/context/positioning.md`, `.claude/context/idea.md` and
  `.claude/context/build.md` if present. Take the wedge and the bear case from `idea.md`, and
  the proof points from `build.md`'s Traction table and What works today. Ask only for what is
  missing.
- On completion: write `.claude/context/positioning.md`. Readers: [pitch-deck](../pitch-deck/SKILL.md),
  [hackathon](../hackathon/SKILL.md), [idea-sprint](../idea-sprint/SKILL.md) (on a re-run).

## Workflow

### 1. ICP, with who it is not for

Name the buyer and the user separately; on Solana they are often different. The ICP is often
another team (a protocol integrating you, a wallet, another founder), and the one who decides
may be a DAO or a foundation, not a person with a budget. Write **disqualifiers**, the people
who will show up and are not the target. Crypto-specific patterns:
[crypto-icp.md](references/crypto-icp.md).

### 2. Job to be done

One sentence: when <situation>, they want to <progress>, so they can <outcome>. Use the
situation they are in today, not the category you are in.

### 3. Three named alternatives

The real alternatives: a named protocol, the manual workaround, and doing nothing (or the
spreadsheet, the Discord bot, the CEX). For each, the **one dimension** you beat it on, and
where it beats you. Use real names; "existing solutions" is not an alternative. Mapping method
and moat types: [alternatives.md](references/alternatives.md).

### 4. One-liner

Says what it **does** for whom, not what it **is**. Draft three:

- a plain one a non-crypto friend understands (hackathon's tagline test)
- an "X for Y" anchor on something the ICP already respects
- the builder version, with the jargon the ICP uses

Pick one as primary. A one-liner that still works with a competitor's name swapped in is
too generic.

### 5. Proof points with sources

Each one is a fact with a link: a tx, a `build.md` Traction row, an audit, a verified build,
a named integrator. If a trust property is the differentiator (non-custodial, verified
build, no admin key, immutable program), state it as the risk it removes for the ICP and
prove it with the on-chain fact. Never claim a property that `build.md`'s upgrade authority
contradicts.

### 6. Words to avoid

List the words this team must not use, with the replacement. Start from the defaults in the
format file and add the ones this category overuses.

### 7. Write and check

Write `positioning.md`, then read the one-liner against the ICP and the disqualifiers: would
a disqualified reader think it is for them? If so, tighten it.

## Not here

- Visual and verbal brand identity: get-shit-pretty's
  [gsp-brand-strategy](https://github.com/jubscodes/get-shit-pretty/tree/5754ce8c44cd9cc9d9207e25955a1a89cf875bb8/gsp/skills/gsp-brand-strategy)
  can start from this file.
- Anything about how a token, fee share or yield claim is classified, or what you may say
  about it where: [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill). This
  skill does not improvise there.
