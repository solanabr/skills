---
name: idea-sprint
description: Find and validate what to build in crypto. Use when the user asks "what should I build", "validate this idea", "is this worth building", "find me a startup idea", "crypto idea", or wants blunt feedback on a project concept before writing code.
user-invocable: true
---

<!-- Adapted from sendaifun/solana-new (find-next-crypto-idea, validate-idea), MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. Telemetry removed. -->

# Idea Sprint

Interview → necessity gate → 3 candidates → score → go/no-go. Output is a decision, not a brainstorm.

Detail lives in `references/`. The only upstream links are the Superteam ideas dataset and colosseum-copilot; see [upstream-packs.md](references/upstream-packs.md).

## Context handoff

- At start: read `.claude/context/idea.md` and `.claude/context/build.md` ([format](../build-status/references/build-md-format.md), written by [build-status](../build-status/SKILL.md)) if present — resume from prior state instead of re-interviewing. On a re-run, also read `.claude/context/positioning.md` ([format](../positioning/references/positioning-md-format.md), written by [positioning](../positioning/SKILL.md)) if present: its ICP and alternatives are inputs to the Distribution and Market pull scores, not evidence (score market pull from the [customer-signal rubric](references/customer-signal-rubric.md)), and a no-go or pivot means it needs redoing — say so.
- On completion: write/update `.claude/context/idea.md` with the chosen idea, scores, validation evidence, and open risks. Downstream skills (pitch-deck, hackathon) read it.

## Workflow

### 1. Blunt interview

No flattery. Short, pointed questions, one at a time. Hard gate before any idea generation:

- **Edge** — what the founder knows/can do that most can't (domain, distribution, tech)
- **Constraint** — what they are optimising for now: time, money, team, chain commitments
- **Crypto touchpoint** — which part of the product genuinely benefits from being onchain

Then pin the **wedge**: the niche entry point, not the end-state vision. "DeFi for everyone" is not a wedge. Probes by starting point: [interview-framework.md](references/interview-framework.md).

### 2. Crypto-necessity gate

Kill question: **"What gets worse if I remove the blockchain?"** If the answer is vague, aesthetic, or marketing-driven — redirect the idea before scoring it. Pass criteria, redirect patterns and the incumbent check: [crypto-necessity-test.md](references/crypto-necessity-test.md).

### 3. Exactly 3 candidates

Generate three **diverse** candidates (different mechanisms/markets, not three flavors of one idea; diversity rule in [scoring-rubric.md](references/scoring-rubric.md)). For each:

- One-line pitch + target user
- **Winner case** — what's true in 18 months if it works
- **Bear case** — the most likely way it dies

Seed from the dataset + live landscape (below), then combine with fresh research. Datasets are inspiration, not constraints.

### 4. Score /15

Each candidate, 0–3 per dimension (full anchors and tie-breaks: [scoring-rubric.md](references/scoring-rubric.md)):

| Dimension | 3 means |
|-----------|---------|
| Founder fit | unfair advantage |
| MVP speed | shippable in under a week |
| Distribution | first ten users are obvious |
| Market pull | people already paying for bad alternatives |
| Revenue path | clear monetization story |

### 5. Validate + go/no-go

Check demand signals against [customer-signal-rubric.md](references/customer-signal-rubric.md) — manual workarounds, active forks, bounties, on-chain activity = real; likes and "cool idea" replies = noise. The same file has the user-conversation questions: ask about past behaviour, never "would you use it?".

- **≥ 8/15** → go. Write `idea.md`, then scaffold the project — [solanabr/ai-kit](https://github.com/solanabr/ai-kit) ships a `/scaffold` command for this if it is installed.
- **6–7** → conditional: name the one dimension to de-risk first.
- **< 6** → strong no-go. **Every no-go gets a pivot suggestion** — use [pivot-or-persist.md](references/pivot-or-persist.md), which also gives how to state confidence.

This score is the go/no-go rule. The one override is a hard no-go from [pivot-or-persist.md](references/pivot-or-persist.md) (demand 0, a well-funded team already shipped it, unsolved core tech, ornamental crypto), which stops the idea at any score.

### 6. Write `.claude/context/idea.md`

Chosen idea, wedge, scores table, demand evidence, bear case, next step. Format: [idea-md.md](references/idea-md.md).

## Idea dataset

[superteam-ideas.json](https://github.com/sendaifun/solana-new/blob/e81c261645035c0e902eaaa518ff58722d188bb7/skills/data/ideas/superteam-ideas.json): 240 Solana-native ideas as inert JSON (every entry carries the same `published` date, 2025-10-14, so it doesn't date the idea). Inspiration only.

For other idea lists, read the publishers' own pages (a16z crypto, YC's Requests for Startups, Alliance) rather than a scraped copy, and date anything you cite.

## Live hackathon landscape

[colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot/blob/0453ffe26e8d245152619fcc949689a6adaab1c6/skills/colosseum-copilot/SKILL.md) — 5,400+ Colosseum submissions for crowdedness checks, winner patterns, and gap analysis. CLI-backed: sign in once per machine with `npx @colosseum-org/copilot-connect login` (Node 20+). Install routes: [upstream-packs.md](references/upstream-packs.md). Dated list of past Grand Champions and track winners: [hackathon winners](../hackathon/references/winners.md).
