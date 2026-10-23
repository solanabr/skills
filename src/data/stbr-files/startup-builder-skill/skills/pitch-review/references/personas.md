# Personas and the objection each one brings

Three readers, three jobs. Each arrives with a question the deck has to answer; if it doesn't, that question becomes the round's fatal objection. Write a ready answer for each one (trigger plus a 30-second answer, in [pitch-deck](../../pitch-deck/SKILL.md)'s objection prep) before the round, not after it.

Angels reject on a single fatal flaw in the first pass, not on a weighted sum of strengths ([Maxwell, Jeffrey and Lévesque 2011](https://doi.org/10.1016/j.jbusvent.2009.09.002); summary read 2026-10-08 at [CEMI](https://cemi.com.au/__static/d131b455b58151434ebbe127488e80d3/06011-maxwell-jeffrey-levesque-2011%282%29.pdf?dl=1)). The setting was the Canadian TV show Dragons' Den: five angel investors and the 150 entrepreneurs who pitched them over one season, coded from the unedited recordings ([Deutsch and Lévesque in The Globe and Mail, 2014](https://schulich.yorku.ca/wp-content/uploads/2018/04/Running-ballistics-on-the-Dragons-eight-silver-bullets-The-Globe-and-Mail.pdf), read 2026-10-08). That a VC, a buyer or a judge reading a deck by link screens the same way is our inference. It is why each reader names one objection, not a list. The eight causes of rejection they found are a checklist for all three personas: adoption, product status, protectability, customer engagement, route to market, market potential, relevant experience, financial model.

## VC

Prompt line: "You are a partner at a {STAGE} fund investing in {SECTOR}. You get dozens of decks a week by link and read each one alone, without the founder, in about 3 minutes."

Predictable objection: who pays. A named buyer, the price, the unit you charge for, a pilot or LOI, and what the money is for. Without a unit, "who pays" comes back "don't know". Take the unit and payer from `.claude/context/pricing.md` ([format](../../pricing/references/pricing-format.md)) so the deck and the answer agree.

Also: the team. Investors respond to information about the founding team and, on average, not to traction or a lead investor ([Bernstein, Korteweg and Laws 2017](https://doi.org/10.1111/jofi.12470), randomized field experiment on AngelList). One credential per person, tied to the problem. Third-party proof works in combination: product certification together with a prominent customer, or with others' interest in investing ([Bapna 2019](https://doi.org/10.1287/mnsc.2017.2833)).

## Buyer

Prompt line: "You run {AREA} at {KIND OF COMPANY THAT WOULD BUY}. A colleague sent you this on Slack and you have 3 minutes between meetings."

Predictable objection: what runs today, on their side. What is in production versus roadmap, what they have to install or integrate, what it replaces, and who is liable when the output is wrong or stale. Take what works today from `.claude/context/build.md`'s What works today section ([format](../../build-status/references/build-md-format.md)) and the alternatives from `.claude/context/positioning.md` ([format](../../positioning/references/positioning-md-format.md)).

A domain expert attacks a technical term compressed into marketing language. That objection is falsifiable and counts with one reader.

## Judge

Prompt line: "You judge {EVENT}. You score on {THE EVENT'S OFFICIAL CRITERIA}. You have a pile of submissions and 3 minutes each." No event: "You screen applications for an accelerator and have 3 minutes per deck."

Predictable objection, at a crypto event: why it needs a chain and not a signed log or a database. Without a party that needs a result it can verify without trusting you, the chain reads as decoration. Run the deck's claim through idea-sprint's [crypto-necessity test](../../idea-sprint/references/crypto-necessity-test.md) and check it against pitch-deck's [crypto-pitch-mistakes.md](../../pitch-deck/references/crypto-pitch-mistakes.md). Token, yield or fee-share questions go to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill), not into an improvised answer.

For Colosseum, the official criteria are in hackathon's [judging-criteria.md](../../hackathon/references/judging-criteria.md).

## All three

- "Why can't the incumbent do this tomorrow?" needs a mechanism: what in your approach they can't copy without breaking something they have. "We own the relationship" or "we're faster" is not an answer.
- A reader who files the deck in the wrong category on their own (a neighbouring product you are not) is a positioning finding, not a contamination one. The deck has to say the difference.
- A market number for the category rather than for the wedge reads as a gap between the proof and the revenue.

## How to answer

- Objection from 2 or more readers: fix the material or prepare a ready answer.
- Answer in growth terms, not defensive ones. Investors ask men more promotion questions and women more prevention questions; each extra prevention question cut the money raised, and in the experiment, answering a prevention question with a promotion answer raised more ([Kanze, Huang, Conley and Higgins 2018](https://doi.org/10.5465/amj.2016.1215)).
- Don't invent a defensive edge or a first user to fill a gap the readers found. Leave the gap open in the fix list for the founder to fill: a missing claim beats one that breaks in diligence.
