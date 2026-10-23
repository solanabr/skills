# Words per slide: 78 decks that raised, and where the reviewer flags too much text

Base: the 100 teardowns in TechCrunch's "Pitch Deck Teardown" series (Haje Jan Kamps, April 2022
to June 2024), listed with links in [library-teardown-catalog.md](library-teardown-catalog.md).
Measured: the 78 complete pre-seed, seed and Series A decks embedded in those articles, 1,170
content slides (cover, closing, divider and appendix slides excluded). Words were counted by OCR
(macOS Vision); against hand counts on 11 slides, the median absolute error was 0% and the mean
2.1%. Every number below is our own count; the slides and the articles stay at TechCrunch.
Counted 2026-10-06.

Use it when you size the text on a deck: to decide between a deck that is read and one that is
presented, and to check a draft slide by slide. Every deck here raised, so the corpus cannot say
what raising takes. The limits in the ruler come from where one reviewer, the series author,
complains about text. They are a threshold for his critique, not a predictor of raising.

## What the decks that raised look like

- **Words per content slide:** median 54 (p25 32, p75 86, p90 126; 1,180 slides, including 10
  inline slides from two decks without a full embed). Taking each deck's median: 51 (p25 41, p75
  73; 78 decks).
- **By stage, deck median:** pre-seed 43 (14 decks), seed 55 (37), Series A 51 (27).
- **Content slides per deck:** median 14.5 (p25 11, p75 18); 29 of 78 decks have 12 or fewer.
  Cover, closing, dividers and appendix are not counted, so the whole decks run longer than the
  10 to 12 slides [SKILL.md](../SKILL.md) sets for a VC deck.
- **Distribution:** 0-15 words 8% of slides, 16-30 15%, 31-50 23%, 51-75 23%, 76-100 14%,
  101-150 12%, over 150 6%.
- **Almost every deck is a reading deck:** 69 reading, 8 mixed, 1 presented (definitions below).
  Mixed decks have a median of 33 words (p75 40); the single presented deck, 28.
- **Where the reviewer complains about too much text:** he says slides carry too much text in 10
  of the 78 decks (Five Flute, Wilco, Arkive, Enduring Planet, Qortex, NOQX, Dutch, Hour One,
  Diamond Standard, Cloudsmith); their deck median is 74 (p25 68). The other 68 decks sit at 49
  (p75 69). Counting any remark about wordy or overloaded slides, 19 decks at 72.5 against 59 at
  47.5. A quarter of all slides carry more than 86 words, so long slides are common outside the
  decks he flags too.
- **Clarity weighs more than volume:** clarity critiques in 57 of 98 decks (82 items); too much
  text in 11 decks, or 24 counting any remark about wordy or overloaded slides. The commonest
  other critiques: use of funds (34 items), go-to-market (24), the ask (21), business model (20),
  product (20).
- **Claim titles are a minority:** the script tags 38% of titles as claims (444 of 1,170), but
  that is a ceiling, since it also tags slogans. Corrected by the manual check (5 of 8 right),
  about 24% (444 × 0.62 / 1,170; small sample, wide interval). Labels 49%, no title 13%. Only 22
  of 78 decks use mostly claim titles. The share rises with stage: pre-seed 28%, seed 38%, Series
  A 42%.
- **Numbers are everywhere:** 71% of content slides carry a number.
- **Short text did not predict the next round:** the 26 decks whose company later raised equity
  or was acquired have a median of 62 words per slide and 33% claim titles; the other 52 have 50
  and 37%. The group that raised again is wordier, and this proves nothing either way: 48 of
  those 52 are simply unknown.

## The ruler

These are thresholds for the reviewer's critique of text, not for raising.

1. **Reading deck, sent before the call:** median at most 50 words per content slide, and a
   reason for every slide over 80. Basis: the 10 decks where the reviewer complains about text
   have a median of 74; the 68 he does not flag sit at 49 and the whole corpus at 51. 80 sits just
   under the p75 of all slides (86), so about one slide in four runs longer: 80 flags a slide to
   check, it is not a cap.
2. **Presented deck, with a speaker:** at most 30 words per slide. The weakest line of the ruler:
   the mixed decks have a median of 33 and the one presented deck 28, because the corpus has
   almost none of this kind.
3. **Titles:** every content slide states a claim (a verb or a number), not a label. Only about
   24% to 38% of titles in the corpus do, so it sets a deck apart, but nothing here shows it helps
   raise.
4. **Test clarity before cutting words.** In 10 of the 13 decks the reviewer said needed a
   voice-over, our measure called the deck a reading deck (measured type and reviewer agree in 3
   of 18 decks where he gave a verdict). A slide that can be read alone is not necessarily
   understood alone.

## How it was measured, to reapply to your own deck

- **Content slide:** everything except the cover (slide 1), the closing slide (thanks, contact or
  logo only), dividers (three words or fewer, all section labels) and anything after an appendix
  divider.
- **Words:** tokens with at least one letter or digit, everything the reader sees (logo and chart
  text included), except page numbers.
- **Title:** the line or lines in the largest font in the top 35% of the slide, at least 1.1 times
  the median line height, and not just the company name.
- **Claim title:** says something that could be true or false: a conjugated verb or gerund and 3+
  words, or a number and 3+ words ("Robots waste 3 days per site", "$2.1M ARR in 9 months";
  illustrative). **Label:** a section name or a noun phrase with no data ("Problem", "Market
  opportunity"), or one starting with how, why, what, who, where or when ("How it works", "Why
  now"). With a colon, judge the part after it.
- **Self-explanatory slide:** a claim title, or a body with at least one sentence with a verb and
  6+ words. A bare number or chart does not count.
- **Deck type** (at least 5 content slides; s = share of self-explanatory slides): reading if s ≥
  0.60, presented if s < 0.30, mixed in between. Word count is not part of the definition, so the
  ruler by type is not circular. Cutoffs were set before looking at the data.
- **Has a number:** ignores acronyms (B2B, 3D, 5G, Web3, 24/7, Q1-Q4) and a bare year.
- **Critiques:** one line per point the reviewer praises or criticizes (mostly his "three things
  to love" and "three things that could be improved"), tagged too-much-text, clarity, traction,
  team, design, market or other. The too-much-text split was recounted on 2026-10-21 by reading
  every article: a deck counts when he says a slide carries too much text, too many words or
  dense text; "any remark" adds wordy, overloaded or too-much-information slides.
- **Raised again:** a later equity round or an acquisition with a public source. Debt financings
  and a team joining another company do not count.

## Limits

- Survivorship: every deck raised, and the series author chose them.
- One reviewer: every critique is his, so the text thresholds measure one reader's taste.
- Titles were checked by hand on 20 slides, not the 40 planned; the script finds every real claim
  and also calls some slogans claims.
- The search for later rounds ran with web search exhausted, so part of "unknown" is searching
  not done, not an absence of events. Three debt financings did not count as a round.
