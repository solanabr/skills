---
name: market-sizing
description: Size the market bottom-up with a source on every number, and rank entry wedges by problem quality × how much each builds the vision. Writes .claude/context/market.md. Use for "TAM", "market size", "market slide", "beachhead", "wedge", "where do we start".
user-invocable: true
---

# Market sizing

Rank where to enter → count the units it covers → price them → check against a named
top-down figure → write `.claude/context/market.md`. Output is one bottom-up number you can
defend factor by factor and a ranked list of entry wedges. Asked for both flows, run wedges
first, then size the top two or three, plus `idea.md`'s wedge if it isn't among them: the
slide is sized on that one.

What investors and filed decks ask of a market slide: [method-sources.md](references/method-sources.md).
Traps: [traps.md](references/traps.md). Read it before adding anything up.

## Context handoff

- At start, read whichever of these exist, and only ask what they don't answer:
  - `.claude/context/market.md`: a re-size. Re-open every source before reusing its number.
  - `idea.md` ([format](../idea-sprint/references/idea-md.md)): the founder's wedge, a candidate in the ranking.
  - `positioning.md` ([format](../positioning/references/positioning-md-format.md)): the buyer and the alternatives.
  - `pricing.md` ([format](../pricing/references/pricing-format.md)): the price and the floor cost.
  - `build.md` ([format](../build-status/references/build-md-format.md)): What works today sets
    each wedge's distance D; Traction is customer evidence (Kamps: a valid alternative to a formula).
- The price ceiling is what the alternative costs the buyer. No context file stores it: work
  it out with pricing's [cost of the bad alternative](../pricing/references/wtp-methods.md#3-the-cost-of-the-bad-alternative), or ask.
- On completion, write `.claude/context/market.md` ([format](references/market-md-format.md)) for
  [pitch-deck](../pitch-deck/SKILL.md)'s market slide and [fundraising](../fundraising/SKILL.md)'s
  diligence answers. The slide is sized on `idea.md`'s wedge, the one the deck pitches; if the
  top-ranked wedge differs, say so under Open decisions and leave `idea.md` to `idea-sprint`.

## Rules for both flows

- **Units before dollars.** Count accounts and units from a dated source, then price them.
- **Only what was opened counts.** A snippet-only number is `secondary`: never summed, never on a slide.
- **Every number is one line** in the [number-with-source](references/number-with-source.md)
  format: `[inferred]` for a reading, `(est.)` for a calculation written out on the same line.
- **Pages for other people hold principles and the result.** Process stays in the notes.

## Flow A: sizing

1. **Name what the market is:** the spend the product replaces, not an industry category.
   Ceiling = what the alternative costs the buyer; floor = the marginal cost from `pricing.md`.
2. **Bottom-up first.** Accounts × units per account per year × price; a monthly count is
   converted on its own line, never with a loose × 12. With a bps price, the unit is the volume
   per account per year. The beachhead is the annual revenue at 100% share of the first
   market (Aulet).
3. **Top-down only checks,** inside `market.md` and never on the slide: a named firm, its latest
   edition, the same cut, within an order of magnitude of the bottom-up.
4. **Three kinds of money, never added together** ([money-types.md](references/money-types.md)):
   **C**, current spend on the check or work the product would do; **S**, spend on the activity
   it touches; **R**, money at risk, which goes on the problem slide. TVL, volume and market
   cap are Context, outside every sum.
5. **Bands.** Beachhead US$20M to 100M a year (Aulet's 2012 draft, marked preliminary); vision
   above US$1B with the most persuasive evidence (YC). Outside the band, run the reverse
   calculation and label it calibration, never a price.
6. **SOM** = reachable accounts × units per account per year × price, never a share of TAM.
   **Expansion** from a material improvement (Gurley) is a mechanism with no number.
7. **Declare what is weak:** source concentration, data years, the token or FX price and its
   date, cuts with no number, and the billing unit.
8. **Propose the slide** the way pitch-deck's [Market row](../pitch-deck/references/slide-templates.md)
   asks: one bottom-up number, the multiplication with each factor sourced, the source on each
   card. Why now is its own slide. The price and the number are the founder's call.

## Flow B: wedges

1. **Vision, cycle and pillars,** one line each ([qxa-rubric.md](references/qxa-rubric.md)).
2. **Filters before the search,** from how the customer operates: their decision depends on
   what the product observes or does; the gap costs more as they grow; solving it builds the
   vision. One real worked case each; the founder approves them before any search.
3. **Five blind fronts in parallel,** one by analogy, searches capped, reports kept whole:
   [search-front-prompt.md](references/search-front-prompt.md).
4. **Merge and filter before listing,** then one [card](references/wedge-card.md) per candidate.
5. **Rank by Q×A,** D only breaking ties ([rubric](references/qxa-rubric.md)).
6. **One blind review of the map,** by a reader with none of the context: input, not orders.
7. **[Result page](references/result-page.md).** A buyer conversation decides among the top few.

## Onchain buyers

The account count is often public; read it instead of estimating it. Protocols: DefiLlama's
Solana fee overview, protocols only, grouped by parent ([worked count](references/number-with-source.md#examples)).
Users: transacting wallets, deduplicated ([traction checks](../build-status/references/traction-sources.md)),
in humans or teams ([crypto ICP](../positioning/references/crypto-icp.md)). DAOs buy through
proposals and grants, so their C is in past ones. Tokens convert at a dated price. Time or
work saved instead of money: [accelerates-x.md](references/accelerates-x.md).

## Output

- `.claude/context/market.md`, committed.
- A one-paragraph summary for the founder: the top wedge and why, the beachhead with its
  calculation, the proposed slide number, and the open decisions.
- On request, the wedge result page as one self-contained HTML file.
