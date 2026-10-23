---
name: pitch-review
description: Blind-test a deck, spoken script or pitch video before it goes out - answer key first, anonymized copy, readers with no context, ranked against decks that raised - and write .claude/context/review.md. Use for "review my deck", "is the deck clear", "blind review", "pitch feedback".
user-invocable: true
---

# Pitch review

Answer key → facts and density → anonymize → probe the reader → three blind readers → check against the key → rank against decks that raised → real people. Output is `.claude/context/review.md`: what strangers took away, the objections that repeat, and fixes for the founder to decide. Writing the material is [pitch-deck](../pitch-deck/SKILL.md)'s job; this skill only measures it.

Why it exists: the author can't judge whether a deck is clear. Better-informed people can't ignore what they know ([Camerer, Loewenstein and Weber 1989](https://doi.org/10.1086/261651)), and founders rate their own chances far above what happens ([Cooper, Woo and Dunkelberg 1988](https://doi.org/10.1016/0883-9026%2888%2990020-1)). So the author's score of their own deck doesn't count.

## Context handoff

- At start, read `.claude/context/positioning.md`, `pricing.md`, `build.md` and `idea.md` if present, to pre-fill the answer key: (a) from positioning's Plain one-liner, or idea's One-liner without it, (b) from pricing's Model section (payer and unit), (e) from build's Traction table and What works today, (f) from the "We win on" column of positioning's Alternatives. Ask only for what's missing: (c) why now, (d) team and (g) vision usually are. Formats: [positioning](../positioning/references/positioning-md-format.md), [pricing](../pricing/references/pricing-format.md), [build](../build-status/references/build-md-format.md), [idea](../idea-sprint/references/idea-md.md).
- If `.claude/context/review.md` exists, this is a new round: keep the key unless the intent changed, and compare with the last round.
- On completion, write `.claude/context/review.md` in the format in [review-md-format.md](references/review-md-format.md).

## The four rules that make it blind

1. Whoever wrote the material doesn't review it and doesn't check the key. The writing session prepares and delegates.
2. The answer key is written before any reader runs, dated, with the fake name. It is what catches a regression between versions.
3. Blind needs both an anonymized copy and a reader with no context. Either one alone fails.
4. The readers' recall, checked against the key by someone else, replaces the author's score. The rank among decks that raised is a weak signal next to it, not a replacement.

## Workflow (each step is a gate)

### 1. Intent and answer key (author)
One sentence per slide: what it has to leave in the reader's head. Then the seven questions, each with what counts as right and wrong, and the target: (a) what the company does, (b) who pays and for what, (c) why now, (d) why this team, (e) what proof exists, (f) why it is hard to copy, (g) the long-term vision. They are adapted from Sequoia's [business plan outline](https://www.sequoiacap.com/article/writing-a-business-plan/) (read 2026-10-08). Template in [review-md-format.md](references/review-md-format.md). Gate: the key is dated before any reader runs, and no `{{...}}` placeholder from pitch-deck's [slide templates](../pitch-deck/references/slide-templates.md) is left (`grep -c '{{' deck.html` prints 0), since a leftover placeholder makes the deck read as a draft.

### 2. P0 and P1: facts and density
Every number traced to a source; word count per slide against the bar for a reading or a stage deck. Commands and bars in [funnel.md](references/funnel.md). Gate: no number without a source.

### 3. Anonymize
Write a swap map and a forbidden list, then one command swaps the names, strips comments, images and (for a reading deck) the notes, renders one PDF page per slide with headless Chrome into a new folder outside your home, and runs the leak check: [anonymize.md](references/anonymize.md). Gate: the command ends with `clean`, and every page was looked at for logos, faces and QR codes.

### 4. Probe the reader's context, once per new session
An ordinary subagent inherits the user's instructions, the git snapshot and the working directory, so it may know whose deck it is. Use the agent definition in [blind-reader.md](references/blind-reader.md) (copy it; this pack doesn't install it), open the reading session in the readers' folder with reads outside it blocked, and run the probe. Gate: "none" for instructions and memory, "nothing" about the company. Known residual: the account email still gives the user's name.

### 5. P2 to P4: three readers
One fresh blind reader per persona, in parallel, with [reader-prompts.md](references/reader-prompts.md) §1 and nothing else. Each answers the leak check first, reads once without going back, writes one sentence per slide, the seven answers, a verdict with the sentence that decided it, the one objection that would make them pass, and where they got stuck. A reader who recognized the company counts as a design read, not a clarity read; where it disagrees with the blind readers, the blind readers win.

### 6. Check against the key
A fresh blind reader, never the author, marks the answers with [reader-prompts.md](references/reader-prompts.md) §3. Gate: each target question marked right for at least 2 of 3 (a partial doesn't count); at least 90% of the per-slide sentences match the intent.

### 7. P5: rank against decks that raised (decks only; a weak signal)
The deck, shuffled among four real decks that raised and anonymized the same way as them, ranked 1 to 5 by two fresh judges: [paired-set.md](references/paired-set.md). Report the position; it doesn't replace step 6.

### 8. P6: real people, before it circulates
Three to five people outside the team, through a link with per-page analytics ([funnel.md](references/funnel.md) §P6).

### 9. Write review.md
Each fix carries the number of readers and the slide. The founder decides.

## By material

- **Reading deck**: the whole flow, notes stripped.
- **Stage deck**: notes kept as `notes.txt`; the reader reads each page with its line.
- **Spoken script**: swaps and leak check on the text; the reader takes it block by block; no paired step.
- **Video**: faces and voices can't be anonymized. Two people who don't know the company watch it once at final speed and answer the key's questions (all seven or a subset fixed beforehand). No model reader, no paired step. The script for the presentation video is in hackathon's [demo-video-script.md](../hackathon/references/demo-video-script.md).

## Personas and the objection to prepare

Detail, prompt lines and sources in [personas.md](references/personas.md). Write a ready answer for each before the round.

- **VC**: who pays. Named buyer, price, unit, pilot or LOI, and what the money is for.
- **Buyer** (runs the operation that would use it): what runs today, on their side, what they install, and who is liable when it's wrong.
- **Judge** (the event's own criteria; no event, an accelerator screener): at a crypto event, why this needs a chain and not a signed log.
- **All three**: "why can't the incumbent do this tomorrow?" needs a mechanism, not "we own the customer".

## Round rules

- Run it on material that goes out, not on drafts. At most two rounds of fixes, each read by fresh readers; what's left goes to the founder as a decision with a recommendation.
- A finding from one reader is taste, unless it is a factual error or a falsifiable technical objection.
- An objection from two or more readers becomes a fix or a ready answer, framed around growth, not defence ([personas.md](references/personas.md) § How to answer).
- Every finding keeps the reader's literal sentence and the slide. Fixes are proposals; the founder decides.
- Live feedback (a call, a panel, a demo): each item is logged as absorbed, declined with a reason, or pending the founder.
- Three readers and two judges per round: a one-place move in the ranking is noise. Compare versions on the fixed key, not the verdict; a good verdict can hide a question falling to 0 of 3.

## Boundaries

- Slides, speaking notes and objection prep: [pitch-deck](../pitch-deck/SKILL.md). Hackathon submission and demo video: [hackathon](../hackathon/SKILL.md).
- A reader who flags a token, yield or fee-share claim: [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill), information only.

## Output

- `.claude/context/review.md`, committed ([review-md-format.md](references/review-md-format.md))
- The fix list for the founder, each fix with its reader count and slide
