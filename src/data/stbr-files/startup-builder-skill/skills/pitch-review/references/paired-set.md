# Paired comparison against decks that raised

The author's score of their own deck doesn't count. Founders rate their own odds far above the base rate: of 2,994 new business owners, 81% put their chances at 7 out of 10 or better and 33% at 10 out of 10 ([Cooper, Woo and Dunkelberg 1988](https://doi.org/10.1016/0883-9026%2888%2990020-1), read 2026-10-08). What replaces that score is the readers' recall against the answer key ([funnel.md](funnel.md) P3). The rank among real decks that went on to raise is a weak signal next to it: two judges, one set, and five decks that can only be made roughly alike.

## Method

1. Pick four real decks in the same format as yours (a reading deck against reading decks) and at the same stage, each with a funding round after the deck that you can link.
2. Get each deck whole, as one PDF with one page per slide. In a TechCrunch teardown the full deck is the SlideShare embed under "The full pitch deck"; the images in the article body are only a few of its slides. The embed loads through JavaScript, so a script gets a challenge page instead of the slides: open the article in a browser, page through the embed and save every slide. If you can't get every slide, pick another deck; a partial deck isn't comparable.
3. Treat all five the same way, since a judge who can tell which deck is yours from how it was treated is ranking the treatment. The reference decks are slide images, so in practice every deck keeps its pictures: render yours with `anonymize.sh paired` ([anonymize.md](anonymize.md)), then, on all five, box out the company name, logos, people's names and faces on each page and flatten the result (export each page as an image and rebuild the PDF), so no box can be lifted off. The teardown decks already carry their companies' own redactions; leave none of the five visibly cleaner than the others.
4. Put each deck in its own subfolder, `deck-A` to `deck-E`, in a shuffled order, inside one new folder outside your home. Write the key from letter to deck in a file outside that folder.
5. Two fresh judges, VC and event judge, from a session opened in that folder ([blind-reader.md](blind-reader.md)), with [reader-prompts.md](reader-prompts.md) §2. Their leak check lists your fake name and the four companies' real names, and each judge says which decks it recognized. Record both in the round.
6. They rank all five from 1 to 5 on "would take the meeting", on clarity and on story. Report the position only (for example 3rd of 5). Don't turn it into a score, and don't fix the deck to climb one place.

Keep the same four decks across versions so the positions compare. With two judges and one set, a difference of one place is noise.

## Default set

Seed reading decks from TechCrunch's [Pitch Deck Teardown](https://techcrunch.com/tag/pitch-deck-teardown/) series, each followed by a later round. The table is metadata only. Get each deck from its article for your own review, and don't commit or redistribute the slides: they belong to the companies and to TechCrunch.

| Company | Sector | Teardown (round named in the title) | Slides | Later round |
|---|---|---|---|---|
| DeckMatch | AI for investors | [$1M seed deck](https://techcrunch.com/2023/08/18/sample-seed-pitch-deck-deckmatch/), 2023-08-18 | 14 | [$3.1M oversubscribed seed](https://arcticstartup.com/deckmatch-raises-3-1m-oversubscribed-seed/) |
| Fifth Dimension AI | AI for real estate | [$2.8M seed deck](https://techcrunch.com/2023/11/17/sample-seed-pitch-deck-fifth-dimension-ai/), 2023-11-17 | 13 | [$7M seed](https://proptechconnect.com/fifth-dimension-ai-raises-7m-seed-funding-to-expand-into-the-us/) |
| Metafuels | Climate (aviation fuel) | [$8M seed deck](https://techcrunch.com/2023/12/15/sample-seed-pitch-deck-metafuels/), 2023-12-15 | 13 | [$9M round](https://tech.eu/2025/01/15/swiss-saf-firm-metafuels-raises-9m/), 2025-01-15 |
| Xpanceo | Hardware (smart lenses) | [$40M seed deck](https://techcrunch.com/2024/04/12/sample-seed-pitch-deck-xpanceo/), 2024-04-12 | 19 | [$250M Series A](https://www.roadtovr.com/smart-contact-xpanceo-250m-investment-valuation/), 2025-07-09 |

All links read 2026-10-08; each later-round page states the amount in the table. Slide counts are those given in each article for the full deck. TechCrunch notes redactions in three of them: DeckMatch's deck came "lightly redacted", Fifth Dimension removed some customer logos and quotes, and Metafuels made minor redactions.

Xpanceo's later round was widely reported, so a judge may recognize its deck even with the name boxed out. That is what the leak check records.

None of the four is a crypto company. For a Solana deck, swap in decks closer to your sector when you can link both the deck and a later round, and keep the format and stage matched. Whatever set you choose, freeze it for the life of the deck.
