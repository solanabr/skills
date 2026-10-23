# Market sizing: what the method sources ask for, and what real decks show

Every source below was read on **2026-10-08**. Quotes are kept short and link to the original. The decks are linked, not
reproduced: open the filing to see the slide.

## What each source asks for

| Source | What it asks for | Quote |
|---|---|---|
| Sequoia, [Writing a Business Plan](https://www.sequoiacap.com/article/writing-a-business-plan/) (published 2019-03-15) | The customer and the market, with why now as its own section | "Identify your customer and your market. Some of the best companies invent their own markets." · "The best companies almost always have a clear why now?" |
| YC, Geoff Ralston, [A guide to seed fundraising](https://www.ycombinator.com/library/4A-a-guide-to-seed-fundraising) | A large market, with evidence it is real | "Total Available Market (TAM) >$1B if possible. Include the most persuasive evidence you have that this is real." Among the things not to do: "silly market size numbers without clear justification" |
| YC, Aaron Harris, [How to build your seed round pitch deck](https://www.ycombinator.com/library/2u-how-to-build-your-seed-round-pitch-deck) | A short answer, not an essay | "What's the market here? Is it going to be big? Will you make it big?" · "This is not the right place to write a treatise on your market or world philosophy." |
| a16z, Hariharan, Chen and Jordan, [16 More Startup Metrics](https://a16z.com/16-more-startup-metrics/), metric 1 (2015-09-23) | Bottom-up, built from the customer profile and willingness to pay | "a bottoms-up analysis, which takes into account your target customer profile, their willingness to pay for your product or service". Top-down "tends to overstate market size". "It is important not to "game" the TAM number when pitching investors." |
| Marc Andreessen, [The only thing that matters](https://pmarchive.com/guide_to_startups_part4.html) (2007) | Market over team and product | "In a great market [...] the market pulls product out of the startup." Rachleff's law: "The #1 company-killer is lack of market." |
| Bill Gurley, [How to Miss By a Mile](https://abovethecrowd.com/2014/07/11/how-to-miss-by-a-mile-an-alternative-look-at-ubers-potential-market-size/) (2014-07-11) | Don't size a new offering by the old market alone | "When you materially improve an offering [...] you can materially expand the market in the process." · "The past can be a poor guide for the future" |
| Bill Aulet (MIT), Disciplined Entrepreneurship Step 4, [2012 course draft](https://web.archive.org/web/2016id_/http://gsl.mit.edu/media/programs/india-bms-summer-2013/materials/step_4_calculate_the_tam_---trepreneurship_101.pdf) (Wayback copy of the PDF a16z links above; every page is headed "PRELIMINARY DRAFT", fall 2012 course only) | The beachhead TAM, counted user by user | The beachhead TAM is "the amount of annual revenue [...] that your business would earn if you achieved 100% market share in your beachhead market." · "the initial market size of about $20 million per year up to $100 million is a good target" · "Anything over $1 billion certainly raises flags" · "Too much top-down analysis will lead you to focus on spreadsheets, not customers" |
| Bill Aulet, [Disciplined Entrepreneurship: 6 questions for startup success](https://mitsloan.mit.edu/ideas-made-to-matter/disciplined-entrepreneurship-6-questions-startup-success) (MIT Sloan, 2024-04-16) | The 100%-share principle, restated in 2024; the page gives no dollar band | "estimate the revenue per year you will get in your beachhead market if you achieve 100% market share" |
| Haje Jan Kamps, [Nokod seed deck teardown](https://techcrunch.com/2023/07/07/sample-seed-pitch-deck-nokod-security/) (TechCrunch, 2023-07-07) | One market slide; customer evidence is a valid alternative to a formula | On three market-sizing slides: "That strikes me as pretty insecure". One alternative he offers: "We've found 20 paying customers that fit this profile, and we believe we can find another 20,000" is "a totally valid explanation", "as long as you can back it up" |

The US$20M to 100M band comes from that 2012 draft, which is marked preliminary
([traps](traps.md#sources-that-dont-hold)). The current edition of the book was not opened
(paywalled) and the 2024 MIT Sloan page has no dollar figure, so whether the book keeps the
band is unverified. Cite it as Aulet's 2012 draft.

## What that asks of a seed market slide [inferred]

- One bottom-up number, built from the customer profile and willingness to pay (a16z, Aulet).
  That is also what pitch-deck's [Market row](../../pitch-deck/references/slide-templates.md)
  asks: the multiplication on the slide, each factor sourced.
- Two bands calibrate it without competing: the beachhead (Aulet's 2012 draft, US$20M to 100M a year,
  counted account by account) and the vision (Ralston, above US$1B, with the most persuasive
  evidence). Aulet's "raises flags" is about the beachhead; Ralston's US$1B is about the
  market addressed.
- Top-down is a check, and usually comes out larger (a16z). It stays in `market.md`.
- Expansion from a material improvement (Gurley) enters as a mechanism, not an inflated number.
- One slide, not three (Kamps). Customer evidence is a valid answer in place of a formula.
- Why now is a separate slide (Sequoia).

## How filed decks size the market

Five examples, all hardware companies; none is crypto. They are here for the shape of each
calculation, which transfers: for a Solana product the units are accounts you can count (see
below). Four were filed with the SEC (Greenfield's is an offering circular, the rest investor
decks); ANYbotics is known through a TechCrunch teardown. None is a seed deck: seed decks
with a legible market slide are rare in public filings, and TechCrunch noted of Agility
Robotics that its "seed/Series A pitch deck wasn't focused on things like addressable market"
([2022-03-07](https://techcrunch.com/2022/03/07/robotics-founders-build-your-pitch-deck-around-problem-solving-not-technology/)).

| Company | Deck | What it shows | What to take from it |
|---|---|---|---|
| Aurora (autonomous trucking) | [Analyst and Investor Day, 2024](https://www.sec.gov/Archives/edgar/data/1828108/000182810824000062/analystinvestorday2024pd.htm) | SAM in physical units: "50B VMT serviceable addressable market (SAM) by the start of 2028", "Based on Aurora truck flow analysis" of IHS and FHWA data, with no period stated. First lane named (Dallas to Houston). Elsewhere in the deck, a third-party TAM: "~$1 trillion U.S.", sourced to "A.T. Kearney State of Logistics, 2022". | The serviceable market is the first use case in units, with its calculation and source. The third-party TAM is what this pack keeps off the market slide: top-down stays in `market.md` as a check. |
| Greenfield Robotics (weeding robots) | [Reg A+ offering circular, 2026](https://www.sec.gov/Archives/edgar/data/1760404/000110465926093504/tm2617498d2_partiiandiii.htm) | TAM "over 250 million acres of broadacre cropland"; SAM "more than 100 million acres of soybean, cotton, and sorghum", "based on USDA Farm Service Agency acreage data from August 9, 2024". In 2025 it "leased a fleet of 23" robots, to customers "primarily" in the US Midwest. | TAM and SAM in units with a dated public source. The SAM covers three crops across the whole US, far past where 23 robots ran in 2025: say how far the serviceable market reaches beyond what is proven. |
| Elroy Air (cargo VTOL) | [Investor presentation, Jun 2026](https://www.sec.gov/Archives/edgar/data/2088805/000121390026072370/ea029605301ex99-2.htm) | "Current Global TAM (2025): ~$420B" by segment. A pipeline of "1,410 units from customers such as Bristow, FedEx, and Barq", split into LOI 1,150, MOU 160 and MPA 100, which "remain conditional upon" regulatory approvals, trials and a definitive agreement. At an "averaged selling price expectation of $3.5 million per aircraft", the deck's own "$4.9B+ Revenue Opportunity". | Named customers × price, with each unit labelled by how firm it is. Every unit is conditional, so the total is a pipeline, not revenue or a market. |
| ANYbotics (inspection robots) | [Series B teardown](https://techcrunch.com/2023/08/11/sample-series-b-pitch-deck-anybotics-ag/) (TechCrunch, 2023-08-11; the article, not the deck) | A "$30 billion total addressable market" "based on 150,000 sites"; Kamps: "a pretty extraordinary amount of money to spend on each site" | Sites × spend per site is the right shape, and the investor goes straight to the spend per account: (est.) US$30B ÷ 150,000 = US$200k per site. The article gives no period. |
| Sarcos (exoskeletons) | [Merger deck, Apr 2021](https://www.sec.gov/Archives/edgar/data/1826681/000121390021020283/ea139001ex99-2_rotoracq.htm) | "$147 BILLION ANNUAL TARGET MARKET IN THE US ALONE", built from "US BLS employment data" at "a blended annual cost of service"; then "Serviceable Obtainable US Market: $15bn", which "Assumes 10% initial market adoption for SOM" | The TAM has a unit (jobs × annual cost of service). The antipattern is the SOM: a fixed share of TAM, with no customer behind it. |

## Reading [inferred]

- Where the serviceable market is the first use case, the two decks that do it well (Aurora,
  Greenfield) measure it in physical units with a dated public source.
- SOM rarely appears. Where it does as a percentage (Sarcos 10%), it is the antipattern.
  Named customers × price (Elroy) is the defensible shape, labelled as the conditional
  pipeline it is.
- For a Solana product the units are accounts you can count: protocols, teams that integrate,
  transacting wallets, merchants, transactions. See [number-with-source.md](number-with-source.md)
  for a counted example.
