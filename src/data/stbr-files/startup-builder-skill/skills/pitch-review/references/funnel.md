# The review funnel, P0 to P6

Cheapest check first. The material moves to the next gate only after it passes the one before. Whoever wrote it never runs a gate that needs judgement (P2 onwards) and never checks the answer key.

## P0. Facts

Every number in the material traces to a source: a row in `.claude/context/build.md`'s Traction table, `.claude/context/pricing.md`, or a URL with the date you read it. A volatile number (users, volume, TVL, price) was re-read in the last 30 days. Present tense only for what is measured; design and vision are in the future tense or labelled as such.

List every number in the deck, notes included, and tick each one against its source:

```sh
perl -CSD -Mutf8 -0ne 's/<(style|script)\b.*?<\/\1>//gis; s/<[^>]+>/ /g; print "$&\n" while /[\$€£]?\d[\d.,]*(?:\s?(?:%|[kKMB]\b))?/g' deck.html | sort -u
```

Pass: no number without a source, no present-tense claim without a measurement.

## P1. Density

Words per slide, notes and inline SVG excluded:

```sh
perl -0ne 'while (/<section\b.*?<\/section>/gs) { ($s = $&) =~ s/<(aside|style|script|svg)\b.*?<\/\1>//gs; $s =~ s/<[^>]+>/ /g; $n = () = $s =~ /\S+/g; printf "slide %02d: %d words\n", ++$i, $n }' deck.html
```

Bars: the ruler in pitch-deck's [library-teardown-ruler.md](../../pitch-deck/references/library-teardown-ruler.md) (reading deck, presented deck, claim headlines). Measured on TechCrunch's Pitch Deck Teardown series, it marks where the teardown's author starts criticizing a deck for its text: a reviewer's threshold, not a predictor of raising.

Pass: the deck sits inside the ruler's line for its kind, and its headlines state claims. Cutting words is not enough: the same series criticizes clarity far more often than the amount of text, which is why P2 and P3 follow.

## P2. Five-second test, per slide

A reader sees one slide once and writes one sentence: what it says. A second reader compares it with the sentence the author intended, written before the round. Pass: at least 90% of slides with the same meaning. In practice it runs inside P3, as the reader's sentence per slide.

## P3. Closed-book recall, whole deck

- Anonymized material ([anonymize.md](anonymize.md)) and readers with no context ([blind-reader.md](blind-reader.md)).
- Three readers: VC, buyer, judge ([personas.md](personas.md)).
- One pass, no going back. Then, without the material, the seven questions of the answer key: (a) what the company does, (b) who pays and for what, (c) why now, (d) why this team, (e) what proof exists, (f) why it is hard to copy, (g) the long-term vision.
- The key is written before the round and checked by a fresh reader, never the author.

Pass: each question in the target marked right for at least 2 of 3 readers; a partial doesn't count.

## P4. Fatal flaw

Each reader names the one objection that would make them pass. Five angel investors on the Canadian TV show Dragons' Den, deciding on 150 pitches over a season, rejected on a single fatal flaw before weighing anything else ([Maxwell, Jeffrey and Lévesque 2011](https://doi.org/10.1016/j.jbusvent.2009.09.002); setting from [Deutsch and Lévesque in The Globe and Mail, 2014](https://schulich.yorku.ca/wp-content/uploads/2018/04/Running-ballistics-on-the-Dragons-eight-silver-bullets-The-Globe-and-Mail.pdf), read 2026-10-08). That a VC, a buyer or a judge reading a deck by link does the same is our inference. An objection named by 2 or more readers becomes a fix or a ready answer. A factual error counts from one reader.

## P5. Paired comparison

The deck, shuffled among four real decks that raised and anonymized the same way as them, ranked by two fresh judges: [paired-set.md](paired-set.md). Report the position as a weak signal. It doesn't replace the author's score on its own: the recall against the key (P3) does.

## P6. Real people, before it circulates

Three to five people outside the team read it through a link that records time per page, such as [Papermark](https://www.papermark.com/) (read 2026-10-08) or DocSend (unverified). Record time per slide, where they stop, and ask the seven questions by message. Save the analytics before uploading a new version.

## Limits

Three readers and two judges per round, one paired set: a one-place difference in rank, or one reader's opinion, is noise. Language-model readers stand in for strangers; P6 is the check that they read like people.
