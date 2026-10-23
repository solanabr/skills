---
name: pitch-deck
description: Build a pitch deck for a crypto project. Use when the user says "pitch deck", "demo day", "investor presentation", "grant application slides", "accelerator application", "help me pitch", or needs slides for a hackathon final.
user-invocable: true
---

<!-- Adapted from sendaifun/solana-new (create-pitch-deck), MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. Telemetry removed. -->

# Pitch Deck

Interview → detect audience → write the spine → build slides with speaking notes → reader check → objection prep.

Detail lives in `references/`. The one optional upstream pack (visual direction for the rendered deck) is in [upstream-packs.md](references/upstream-packs.md).

Real decks to compare against and a words-per-slide ruler, all sourced, are in [library.md](references/library.md). The ruler's limits come from where TechCrunch's reviewer flags too much text in 78 decks that raised, not from what predicts raising. Where the library and this workflow differ, the workflow wins.

## Context handoff

At start, read `.claude/context/idea.md` and `.claude/context/build.md` ([format](../build-status/references/build-md-format.md), written by [build-status](../build-status/SKILL.md)) if present — pre-fill problem, wedge, traction, and stack from them, and Q5 from build.md's What works today section; take traction only from its Traction table, with the source each row cites. Read `.claude/context/positioning.md` ([format](../positioning/references/positioning-md-format.md), written by [positioning](../positioning/SKILL.md)) if present too — use its Plain one-liner for Q1 and its Primary one-liner on the title slide, and its ICP, alternatives and proof points as written for Q2 and Q8, and its words-to-avoid list when drafting. Read `.claude/context/pricing.md` ([format](../pricing/references/pricing-format.md), written by [pricing](../pricing/SKILL.md)) if present too — take Q9 and the business-model slide from its Model and The number sections as written. Read `.claude/context/market.md` ([format](../market-sizing/references/market-md-format.md), written by [market-sizing](../market-sizing/SKILL.md)) if present too: take the market slide from its Market slide section as written. Only ask what's missing.

## Workflow

### 1. 12-question interview

Blunt, one at a time, skipping anything already answered by context files:

1. What does it do, in one sentence a non-crypto person understands?
2. Who exactly has the problem, and how painful is it (evidence)?
3. Why does this need a blockchain?
4. Why Solana specifically?
5. What works *today* (demo-able) vs. roadmap?
6. Traction numbers — users, volume, TVL, signups, waitlist?
7. Who is the team and what's the unfair edge?
8. Competitors and your moat?
9. Business model — who pays, when?
10. Who is the audience for this deck (judges, VCs, grant committee, accelerator)?
11. The ask — prize, check size, grant amount, admission?
12. Biggest weakness you're afraid they'll ask about?

### 2. Audience detection → slide set

Q10 decides the slide set — full breakdown and per-audience rubrics in [investor-audience-guide.md](references/investor-audience-guide.md):

| Audience | Emphasis | Length |
|----------|----------|--------|
| Hackathon judges | a startup pitch with a working product: team, insight, demo, traction | 5–7 slides |
| VC | market size, traction slope, team, moat, ask | 10–12 |
| Grant committee | ecosystem benefit, public-good angle, milestones, budget | 8–10 |
| Accelerator | team velocity, learning rate, wedge → expansion path | 8–10 |

Slide-by-slide order per audience, plus the optional Tokenomics and Regulatory readiness slides: [pitch-structure.md](references/pitch-structure.md).

### 3. Narrative spine

Write only the slide titles, each a claim, and read them in order before building any slide. The spine passes four checks; sources and the real decks behind each are in [the spine test](references/storytelling-frameworks.md#the-spine-test):

- **"But" or "therefore" fits between every pair of titles, never "and then".** Where only "and then" fits, a cause is missing. That is Parker and Stone's rule for story beats ([video](https://www.youtube.com/watch?v=vGUNqq3jVLg)), and Hoffman's test for LinkedIn's Series B: an investor reading only the titles should follow the argument.
- **An explicit bridge from wedge to vision.** Plant early the problem the wedge solves, say why you start small, and cross in one causal sentence or a today → tomorrow pair of titles. Jumping straight to the giant vision is "a huge mistake" (Aaron Harris, [YC](https://www.ycombinator.com/blog/aaron-harris-on-fundraising-and-meeting-with-investors)); Coinbase's seed deck and Matterport's deck each cross with a pair of titles.
- **The close returns to the cover**, or lists the 3 or 4 points to retain (Geoff Ralston, [YC](https://www.ycombinator.com/blog/guide-to-demo-day-pitches/)). Coinbase's last slide repeats its first.
- **Tense follows the state of the proof.** Present tense only for what works or is measured (Q5, Q6); the roadmap and the vision in the future tense. Matterport's bridge is exactly that: "Take your building online" today, "Tomorrow our data will…".

The frameworks in [storytelling-frameworks.md](references/storytelling-frameworks.md) (PAS, investor arc, BAB, hero's journey, Pixar) are vocabulary for naming the spine, not a step: the real decks there don't share an order, they share the four checks above.

### 4. Build slides + speaking notes

For each slide: headline (a claim, not a label), 3–5 supporting points, visual suggestion, and 30–60s speaking notes. Draw on [slide-templates.md](references/slide-templates.md) (per-slide content and markup) and [onchain-metrics.md](references/onchain-metrics.md) (traction numbers a skeptic can check). Every number on a slide needs a source; never invent one. For a hackathon or Demo Day pitch, what separated Colosseum winners from projects that won nothing is in [what-separates-winners.md](../hackathon/references/what-separates-winners.md), and the line-level checklist in [pitch-rhetoric.md](../hackathon/references/pitch-rhetoric.md).

### 5. Reader check, not a self-score

The author can't test the deck: they already know what every slide meant. Test what a reader takes away instead. [pitch-review](../pitch-review/SKILL.md) runs this check end to end, with the same seven questions, an anonymized copy and a rank against decks that raised, and writes `.claude/context/review.md`. The steps below are the check by hand, and what pitch-review automates.

1. Before anyone reads it, write and date an answer key: the one sentence the deck should leave for (a) what it does and for whom, (b) who pays, (c) why now, (d) why this team, (e) the proof, (f) why it's hard to copy, (g) the vision.
2. Write the reader sheet: read the deck once, at your own pace, without going back; then answer (a)–(g) from memory as open questions. The step stops here until readers answer: hand the founder the key and the sheet, and don't fill in answers for them.
3. Readers are people who haven't seen the deck or heard the pitch: two or three, from the Q10 audience if possible. A fresh session that has never seen the project, given only the deck and the sheet, is a cheap first pass to catch the obvious misses before spending people's time. It doesn't replace the people.
4. When the answers come back, someone other than the author compares them with the key. A question passes when at least two readers get it right. A failed question points at the slide that should have carried it: fix that slide. At most two rounds of fixes; anything still failing goes back to the founder as a decision.
5. Keep the key across versions, so a cut that drops the line carrying an answer shows up as that question failing.

Why: Currier (NFX) puts the bar at retelling, "Your listener needs to be able to retell your story" ([23 rules](https://www.nfx.com/post/23-rules-storytelling-fundraising)), and Ralston notes listeners keep "at most" 3 or 4 points, so test which ones survive. The seven questions follow Colosseum's judging factors ([judging-criteria.md](../hackathon/references/judging-criteria.md)) and Ralston's own list ("Why hasn't this been done before? Why is it hard to do what we are doing?"). The audience rubrics in [investor-audience-guide.md](references/investor-audience-guide.md) are still where to look for weak spots; they are not the gate.

Also check the draft against [crypto-pitch-mistakes.md](references/crypto-pitch-mistakes.md) — flag every mistake the deck still commits and fix it. Any token-return, yield or fee-share claim comes off the slide and goes to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) (Mistake 4).

### 6. Objection-prep Q&A

From Q12 + any questions readers missed in step 5, draft the 8–10 hardest questions this audience will ask, each with a tight 30-second answer. Hostile-question drilling beats slide polish.

## Output

- Deck outline (markdown, one section per slide: headline / points / visual / speaking notes)
- The spine: titles in order, with the bridge and the close marked
- Answer key and reader sheet; once readers have answered, the comparison with the key and the fixes applied
- Objection Q&A sheet
- Before it goes out: [pitch-review](../pitch-review/SKILL.md), which writes `.claude/context/review.md`

Need a rendered deck? Build it as HTML — one self-contained file, one section per slide, with the no-JavaScript shell in [deck-design-system.md](references/deck-design-system.md). It renders anywhere, diffs in git, and Claude Code can design it directly, which a binary office file gives up. Anthropic's [frontend-design](https://github.com/anthropics/skills/tree/8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4/skills/frontend-design) skill carries the visual direction if you have it on disk ([upstream-packs.md](references/upstream-packs.md)), and the same route covers any graphic or marketing asset the deck needs.
