<!-- Written from a study of Colosseum pitch videos by this file's contributor (Sep–Oct 2026). Codebook, coded values per project, code and every number below: https://github.com/lucatrevisanii/colosseum-pitch-study/tree/43e3f87fa700bac3f209efa102d5329096cc9ccd. Aggregates only: no transcript is reproduced. Quotes are under 25 words, taken from automatic transcripts of the public pitch videos, each linked to the project's Colosseum page, read 2026-10-08. -->

# What separated winners in Colosseum pitch videos

Read this before scripting the presentation video ([demo-video-script.md](demo-video-script.md)). It shows what winners said more often than projects from the same hackathons that won nothing. That is association, not cause, it covers the pitch video only, and a language model did the coding: read [Method and limits](#method-and-limits) before leaning on any line.

## The study, in five lines

1. **Winners:** 43 of the 61 companies Colosseum took into its accelerator (cohorts 1–5, from Renaissance 2024 to Frontier 2026) whose hackathon pitch video could be downloaded. (The Demo Day section's 65 pitches are a different set; see there.)
2. **Controls:** one project per accelerated company, drawn at random from the same hackathon and category, with no prize, honourable mention or accelerator place; 60 were drawn and 47 could be coded.
3. **Coding:** a closed codebook, fixed before any transcript was read, applied by a language model to each video's transcript and up to 12 frames, blind to group.
4. **Tests:** two-sided Fisher exact per variable, 22 tests. "Robust" means it survives a Holm correction across all 22, added after the original analysis.
5. **Data:** the codebook, the coded values per project, the code and the results are in the [study repository](https://github.com/lucatrevisanii/colosseum-pitch-study/tree/43e3f87fa700bac3f209efa102d5329096cc9ccd).

## What separated, robustly

| Said in the pitch video | Winners | Controls | p | Holm-adjusted p | Second-pass kappa |
|---|---|---|---|---|---|
| Any traction | 34/43 | 12/47 | < 0.001 | < 0.001 | 0.89 |
| A team credential | 37/43 | 25/47 | 0.001 | 0.024 | 1.0 |

- Traction holds in both periods: 8/11 vs 3/17 in 2024, 26/32 vs 9/30 in 2025–26. The credential gap comes from 2025–26 (28/32 vs 16/30); in 2024 alone it is 9/11 vs 9/17 (p 0.23).
- Traction with a number (23/43 vs 9/47) also clears the correction, but it is a subset of traction: among projects that cite any, 23/34 winners and 9/12 controls give a number (p 0.73). Say the number; don't count it as a third signal.
- 35 of the 47 controls cited no traction of any kind. The winners' traction, by type (projects per type): users 19, partnerships 15, volume 9, revenue 7, grants or prizes 7, LOIs or pilots 5, waitlist 1.
- What it sounds like:
  - [CrowdBrain](https://colosseum.com/arena/projects/crowdbrain), Frontier Grand Champion: "We already have a live alpha node in Georgia, two deployment partners and an active government partnership."
  - [CargoBill](https://colosseum.com/arena/projects/cargobill): "our initial customers who have done $70,000 in payment volume"
  - [stablecorp](https://colosseum.com/arena/projects/stablecorp): "We have 13 paying users. We launched 1.5 months ago and we're doing 8k in MRR."
  - Credential tied to the problem: "In my 15 years of experience working in logistics" ([CargoBill](https://colosseum.com/arena/projects/cargobill)); "Previously, we founded and exited our computer vision company and scaled our gamified DeFi up to $4 billion and 100,000 monthly active users." ([CrowdBrain](https://colosseum.com/arena/projects/crowdbrain))

## Weak signals (do not survive correction)

- **Face on camera:** 35/41 vs 24/43, p 0.004, Holm-adjusted 0.077. Only from 2025 on: 29/31 vs 12/26, against 6/10 vs 12/17 in 2024.
- **Revenue as the traction:** 7/43 vs 1/47, p 0.025.

## Where the study detected no difference

| Said or shown in the pitch video | Winners | Controls | p |
|---|---|---|---|
| Product running on screen | 20/37 | 23/36 | 0.48 |
| Onchain proof on screen (explorer, transaction) | 4/33 | 10/35 | 0.13, fewer winners |
| Explicit "why Solana" | 21/43 | 16/47 | 0.20 |
| Market size with a number | 18/43 | 17/47 | 0.67 |
| Token mentioned | 8/42 | 9/46 | 1.0 |
| Problem stated with a number | 19/43 | 16/47 | 0.39 |
| A specific, named user | 21/42 | 19/45 | 0.52 |
| Revenue model stated | 25/43 | 22/47 | 0.30 |
| Competition mentioned | 31/43 | 26/47 | 0.13 |
| An ask or next steps | 31/43 | 30/47 | 0.50 |

- "No difference detected" is not "doesn't matter". At these sample sizes a test with 80% power only catches gaps of roughly 25 to 35 points: with 64% of controls showing the product running, winners would have had to be at 30% or below, or 91% or above; with 29% of controls showing onchain proof, winners would have needed 64% or more.
- Product on screen and onchain proof were judged from up to 12 still frames per video, not from the video itself.
- Denominators below 43 and 47 leave out videos where the item couldn't be judged (no screen shown, for example).
- Language, computed by script: numbers per minute, counted one per number, 1.9 vs 1.8 (p 0.04997 uncorrected, the smallest of 14 language metrics; about 0.70 after Holm, so not a finding); sentence length 17 vs 14 words (p 0.41); Flesch reading ease 59 vs 65 (p 0.41); analogies a median of 0 in both groups. Same median length (177 s vs 176 s) and the same time to the problem (15.5 s vs 15 s).
- Dropped for low agreement, so unknown: the type of opening (agreement 0.57 when it was dropped, kappa about 0.3) and stated full-time commitment (0.5).

**What it means for the two videos.** The pitch video reads as evidence of a company: who uses it, who pays, why this team. That matches Colosseum's own framing that its hackathons "are startup competitions" ([FAQ](https://colosseum.com/hackathon)). Spend pitch-video seconds on traction and team. For the product on screen and the explorer transaction the study detected no difference in the pitch video, in either direction; the walkthrough and the transaction belong in the demo video, which this study did not code ([demo-video-script.md](demo-video-script.md)).

## No traction yet: the other way in

9 of the 43 winners cited no traction (TapeDrive, Reflect, Urani, Archer, Rekt, Kormos, Banger, TypeX, WeLikeSports): 5 infrastructure or a new financial primitive, 4 consumer products. Two kinds of substitute show up among them:

- **A technical artifact a judge can check:** "We've deployed the program to DevNet. There's a reference miner and an archive node" ([TapeDrive](https://colosseum.com/arena/projects/tapedrive), Breakout Grand Champion).
- **A team whose record carries the claim:** "core contributor to ethereum and led the development of solidity" ([WeLikeSports](https://colosseum.com/arena/projects/welikesports)).

Nine projects are too few to say what else wins without traction.

## Category: two outliers, the rest is chance

From [colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot/blob/0453ffe26e8d245152619fcc949689a6adaab1c6/skills/colosseum-copilot/SKILL.md)'s primary-category labels across 8,286 submissions and 180 winners in five hackathons (Renaissance to Frontier), pulled late September 2026. Expected wins = the category's share of each hackathon's submissions times its winners; P = the chance of a count that far from expected if winners were drawn at random.

- **DePIN** won 17 of the 119 prizes in Renaissance, Radar and Breakout, against 3.7 expected (P < 0.001).
- **Verifiable records** (proofs, attestations, registries) won 0 of 180 across all five, against 3.7 expected (P 0.02).
- Gaps that look like a trend but fit chance: agent-control-plane, 5% of Frontier's submissions and 0 of its 28 winners (1.4 expected, P 0.23); token-launch, 3 winners against 5.7 expected (P 0.17); DePIN's 0 wins in Cypherpunk and Frontier (1.1 expected); games, 4 of Renaissance's 34 winners (3.6 expected) and 0 of Cypherpunk's 33 (1.8 expected).

Check the current edition's category in Copilot before treating a hot category as a tailwind.

## Demo Day: what changes after the hackathon

65 Demo Day pitches from accelerator cohorts 1–5: 59 of the 61 companies above, plus 6 with no Colosseum hackathon project in the data (MetaDAO, Boost, Slant, Tempo, Synthesis, Laso), while 2 of the 61 (adx.so, trenches.top) have no Demo Day pitch in the data (cohort 5's teams are listed in [Cohort V Demo Day](https://blog.colosseum.com/cohort-v-demo-day-solana-microscope-alpenglow-migration/)), coded with the same codebook by the same model. Unlike the hackathon videos, the company name was replaced in the transcript and blacked out on the frames where OCR found it (184 of 335).

- **The same 43 companies, hackathon pitch vs Demo Day pitch** (paired, McNemar): median length 177 s → 133 s, and 33 of 43 got shorter; an ask or next steps 31 → 39 (p 0.06), and 58 of all 65 Demo Day pitches have one; a named, specific user 21 → 13 (p 0.04). Traction with a number 23 → 30 and "why Solana" 21 → 15, neither significant. Word rate (170 → 167 a minute) and numbers per minute (1.93 → 1.95) didn't change.
- **Who raised afterwards vs the rest** (cohorts 1–4, 6 vs 38): mentioning a token, 5/6 vs 7/38 (p 0.004), the strongest signal, and it doesn't survive Holm across the 30 tests (0.11). Traction with a number did not separate (3/6 vs 23/38). Cohort mattered more than pitch: 4 of 11 raised from cohort 1, 2 of 12 from cohort 2, none from cohorts 3 and 4, which had had less time.
- Outcome rules: a round led only by Colosseum doesn't count; a token sale counts as a token. 50 of 65 outcomes are unknown, meaning "not found in public sources", not "didn't raise".

## Method and limits

- **Association, not cause.** Traction and credentials may simply mark stronger companies. They are also what Colosseum's FAQ says judges look for, so the reading is consistent, not proven.
- **A language model coded every video; no person did.** A second pass by the same model with the same prompt, on 18 of the 90 projects, agrees with the first (kappa 0.89 for traction, 1.0 for the credential). That measures how stable the model is, not whether a person would code the same way.
- **Blinding covers the group only.** The coder never saw which group a video was in, but project names stay in the hackathon transcripts, the frames were not redacted, and a model can recognise a well-known project whatever it is told.
- **Material.** The whisper transcript plus up to 12 frames picked at scene changes. Product on screen, onchain proof and face on camera were judged from those stills.
- **The pairing was lost.** Controls were drawn one per winner, but 18 of 61 winners and 13 of 60 drawn controls (22%) had no video that could be coded, so the analysis compares two groups (Fisher), not pairs. The surviving controls likely skew stronger, which would make the gaps conservative.
- **"Traction with a number" is a regular expression** for any digit in the coder's free-text quote of the traction, not a codebook variable.
- **The correction came afterwards.** The original analysis ran the 22 tests uncorrected; Holm was applied later. Traction and the credential also survive Holm over 19 tests (without the dropped variables) and over 36 (adding the 14 language metrics).
- **Pitch video only.** Nothing here speaks to the demo video, the written description or the interview round.
- **Top vs bottom.** Accelerated winners against projects that won nothing. It says nothing about the middle: track winners and honourable mentions who weren't accelerated are in neither group.
- **Colosseum only.** Sponsor tracks and other organisers judge to their own criteria ([judging-criteria.md](judging-criteria.md#other-organisers)).
