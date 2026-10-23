<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/submit-to-hackathon/references/hackathon-submission-guide.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten; Colosseum's portal fields checked against colosseum.com/hackathon on 2026-10-05. -->

# Submission guide

As of 2026-10-21, [colosseum.com/hackathon](https://colosseum.com/hackathon) shows the Crypto World's Fair (14 Sep – 12 Oct 2026) with judging underway, so check the page for the next edition's dates. Its FAQ says the hackathons are open to builders on every chain, with dedicated prize tracks for several ecosystems.

## What Colosseum's portal asks for

Per the [hackathon FAQ](https://colosseum.com/hackathon), read 2026-10-05:

- product name and a short description
- the chains and tools integrated
- every teammate, with background, and the team's location
- a logo or graphic
- the GitHub repo (open source encouraged; a private repo works only if hackathon@colosseum.com is granted access)
- a **two-to-three-minute presentation video**, among the first things judges review
- a **product-demo video of no more than three minutes**
- go-to-market strategy, demand validation and distribution plans
- optional weekly one-minute update videos, which Colosseum strongly recommends

Two videos, not one: the pitch carries the startup story, the demo carries the build. Script both with [demo-video-script.md](demo-video-script.md). Other organisers' forms differ; read the listing.

## Tagline

What it does, not how, in one sentence a non-crypto reader follows: "[Name]: instant payouts for freelancers, settled in USDC on Solana."

## Description, 200–500 words, five short paragraphs

1. **Problem.** Who has it and what it costs them today.
2. **Solution.** What the product does and how the user touches it. Bold the one novel thing.
3. **Why crypto, why Solana.** What is impossible without the chain, and which Solana primitives you use (named programs, token extensions, an oracle, a specific protocol you compose with).
4. **What works today.** Demo-able claims only, with the program ID and a devnet or mainnet link. Roadmap goes in paragraph 5, never here.
5. **What's next.** Current status, the next month, and whether the team intends to keep building full-time. Colosseum judges for that intent.

The go-to-market and demand-validation fields are judged too ([judging-criteria.md](judging-criteria.md)). Put real evidence there: user conversations, a waitlist with a source, onchain usage. If [idea-sprint](../../idea-sprint/SKILL.md) wrote `.claude/context/idea.md`, its demand evidence goes here.

## Links judges can open

- A live demo; devnet is fine if labelled, with a pre-funded test wallet or a faucet step.
- A repo whose README quickstart works from a clean clone.
- Videos, docs and decks shared publicly or with the judges. Unopenable links are one of Colosseum's listed common misses.

## Choosing a track (when the event has tracks)

Frontier 2026 had none, so check the format first ([winners.md](winners.md)). Where tracks exist:

- Enter where the build actually fits; a judge reads a misfiled project as a misunderstanding.
- Among tracks that fit, prefer the least crowded. A first place in a thin track beats a place in a crowded one. Check density live with [colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot/blob/0453ffe26e8d245152619fcc949689a6adaab1c6/skills/colosseum-copilot/SKILL.md).
- Sponsor and side tracks often draw fewer serious entries; read their own criteria.

## Common misses

- No working demo, or features claimed that don't work yet
- A description written for engineers only
- A track picked for prestige, not fit or crowdedness
- Setup instructions missing, or a private repo with no access granted
- Videos over three minutes, or a demo that shows bugs instead of cutting around them
- Pre-existing code not disclosed (Colosseum judges only work done during the event)
