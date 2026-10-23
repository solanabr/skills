---
name: hackathon
description: Prepare a winning hackathon submission. Use when the user says "hackathon submission", "submit to hackathon", "demo script", "demo video", "which track should I enter", "Colosseum", "help me win the hackathon", or asks about hackathon grants and Superteam Earn.
user-invocable: true
---

<!-- Adapted from sendaifun/solana-new (submit-to-hackathon, apply-grant), MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. Telemetry removed. -->

# Hackathon Submission

Track choice → scannable description → two scripts (2–3-min pitch, ≤3-min demo) → checklist. Optimize for a judge who has 90 seconds, not a reader who has 10 minutes.

Detail lives in `references/`. The remaining upstream links (colosseum-copilot, the Superteam ideas dataset) are in [upstream-packs.md](references/upstream-packs.md).

## Context handoff

At start, read `.claude/context/idea.md` and `.claude/context/build.md` ([format](../build-status/references/build-md-format.md), written by [build-status](../build-status/SKILL.md)) if present — pull the pitch, wedge, and what actually works (its "What works today" section) from them instead of asking again. Read `.claude/context/positioning.md` ([format](../positioning/references/positioning-md-format.md), written by [positioning](../positioning/SKILL.md)) if present too — the tagline is its plain one-liner, the alternatives table feeds "the novel part", and its words-to-avoid list applies to the description.

## Workflow

### 1. Check the format, then pick the least-crowded track

Colosseum runs its hackathons as startup competitions, and formats change: Frontier 2026 had no tracks at all. Read the current rules first. Where tracks exist, winning a thin track beats placing in a fat one. Per candidate track: estimate entry volume, fit with what's actually built, and judge appetite (sponsor tracks often have the fewest serious entries).

- Winner history: [winners.md](references/winners.md) — Grand Champions and track first places from Grizzlython 2023 to Frontier 2026, dated, each row linked to its announcement post
- Live crowdedness check: [colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot/blob/0453ffe26e8d245152619fcc949689a6adaab1c6/skills/colosseum-copilot/SKILL.md) — query 5,400+ past submissions for cluster density and gaps. CLI-backed: sign in once per machine with `npx @colosseum-org/copilot-connect login` (Node 20+).

### 2. Write a scannable description

**Judges read 100+ submissions.** Yours gets one skim deciding whether it gets a real read:

- Tagline: what it does, one sentence, no jargon
- First paragraph: problem + who has it
- Bold the one thing that's novel
- "What works today" list — demo-able claims only, never roadmap dressed as product
- Why Solana (one concrete reason: speed, fees, composability with X)

Full structure (200–500 words, paragraph-by-paragraph) and the fields Colosseum's portal asks for, including go-to-market and demand validation: [submission-guide.md](references/submission-guide.md). Score the draft against [judging-criteria.md](references/judging-criteria.md) before submitting: Colosseum's seven published factors, which carry no published weights.

### 3. Videos (each ≤ 3 minutes)

Colosseum asks for two: a 2–3 minute **presentation** video (the startup pitch, judged first) and a **product demo** of at most 3 minutes. Scripts for both: [demo-video-script.md](references/demo-video-script.md). The product demo, in outline:

| Time | Beat |
|------|------|
| 0:00–0:15 | What you're about to show, one sentence |
| 0:15–2:00 | One happy path in the real product, real data, on-chain proof (explorer tx) |
| 2:00–2:40 | One technical highlight and why you built it that way (Solana integration, on-chain logic) |
| 2:40–3:00 | What works today vs. next; repo and live link on screen |

Rule: if the demo can fail live, record it.

Before scripting the presentation video, read [what-separates-winners.md](references/what-separates-winners.md): citing traction and a founder credential separated 43 accelerated winners from 47 projects from the same hackathons that won nothing; for the product on screen and an explorer transaction the study detected no difference. The script checklist is [pitch-rhetoric.md](references/pitch-rhetoric.md).

### 4. Submission checklist

- [ ] Track (if the event has tracks) chosen by fit, then crowdedness, not vanity
- [ ] Tagline passes the "non-crypto friend" test
- [ ] Description scannable in 90 seconds (bold claims, short paragraphs)
- [ ] Presentation video 2–3 min (team, problem, evidence, why now)
- [ ] Demo video ≤ 3 min, real transaction shown
- [ ] Go-to-market and demand-validation fields filled with sourced evidence
- [ ] Pre-existing code disclosed; every link opens for a logged-out judge
- [ ] Repo public (or access granted to judges), README quickstart actually works from clone
- [ ] Deployed link (devnet OK) + program ID listed
- [ ] Team and contact info complete
- [ ] Pitch deck attached if track requires one — use [pitch-deck](../pitch-deck/SKILL.md)

## After the hackathon: grants

Losing the track doesn't mean losing the funding. Same artifacts (description, demo, deck) feed grant applications:

- **Superteam Earn** (earn.superteam.fun) — bounties + grants up to ~$10k USDC equivalent, fast cycles, regional Superteams
- **Solana Foundation grants** — milestone-based, public-good angle; reuse the scannable description with an ecosystem-benefit paragraph
- **Superteam Agentic Engineering grant** — 200 USDG toward an AI coding subscription, half on approval and half once a live Solana MVP ships ([page](https://superteam.fun/earn/grants/agentic-engineering/); applications showed as paused on 2026-10-05)
- Grant-shaped ideas dataset: [superteam-ideas.json](https://github.com/sendaifun/solana-new/blob/e81c261645035c0e902eaaa518ff58722d188bb7/skills/data/ideas/superteam-ideas.json)
