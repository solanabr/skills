# Sizing traps

Read this before adding anything up. Each trap is one a skeptical investor checks first.

## Sources that don't hold

- **Report mills.** Paid market reports that recycle the same growth rate across categories,
  publish two numbers for one category on the same date, give a range where a number should
  be, date the data in the future, or cover a category no established research firm covers.
  Check these signals on any firm, whatever its name. A report that fails them stays out of
  every sum.
- **Ghost categories.** A trillion-dollar figure built by stretching the horizon and bundling
  everything into a category no established firm publishes. If the category doesn't exist at
  an established firm, cite the nearest real one by name instead.
- **Firms far apart.** Two firms 10x apart on the same cut means there is no top-down for that
  cut. 2x to 5x apart: order of magnitude only, always with the firm's name.
- **Incumbent rhetoric.** A "$N trillion opportunity" from a keynote or a company blog is
  quoted as "company X frames it as", never as a TAM.
- **A stale number.** Firms publish new editions, and an old slide can mix a new figure with
  an old one. Re-open the source before reusing any number.
- **A preliminary report cited as final.** Check whether a final version exists with a
  different number.
- **A search-result summary.** A number seen only in a search snippet is `secondary`. Open the
  page; the snippet and the page can disagree.

## What doesn't add up

- **A stock is not an annual flow.** TVL, a treasury balance, stablecoin supply, market cap
  and credit outstanding are balances. None of them is anyone's yearly spend.
- **Volume is not spend.** Value moved through a protocol is Context. What the buyer pays to
  move it (fees, spreads, vendor invoices) can be C or S. With a price in bps, the volume per
  account per year is the unit the bps applies to, never the market itself.
- **A one-off event is not recurring.** One large exploit is R for the problem slide, not a
  market.
- **Spend that has ended.** A programme, grant round or incentive campaign that is over.
- **A price with no count.** A unit price without the number of units.
- **Anything labelled `secondary`.**
- **The whole industry.** Context only.
- **C, S and R with each other.** The same dollar never appears under two types.

## Buyers that don't exist

- **A buyer counted from an authorisation.** A licence, waiver or approval is not a purchasing
  programme: it says who may operate, not who will buy. Count the holder once a budget for
  the purchase shows up.
- **A proposed rule.** It doesn't create mandatory purchases. Read the text and look for the
  clause that would. Where a purchase exists only because a rule compels it, say so.
- **Wallets as accounts.** One person runs many wallets, and one bot runs thousands. Count
  transacting wallets and deduplicate them ([traction checks](../../build-status/references/traction-sources.md#inflation-checks-run-before-writing-a-number));
  state accounts in humans or teams ([crypto ICP](../../positioning/references/crypto-icp.md)).
- **Listings as teams.** One team can run several listed protocols, and a fee overview can
  list the chain itself. Keep protocols only and group by parent before counting (example in
  [number-with-source.md](number-with-source.md#examples)).
- **Incentive-inflated activity.** Fees and users during an airdrop, points or quest campaign
  are not demand. Check the window, and apply pricing's
  [comparable red flags](../../pricing/references/wtp-methods.md#1-fee-comparables-from-defillama).

## Math that misleads

- **"We only need 1%."** SOM as a percentage of TAM.
- **TAM/SAM/SOM bubbles** with no calculation behind them.
- **"Global"** with no geography.
- **Bottom-up and top-down** that don't meet in order of magnitude.
- **Periods mixed.** Every factor is per account per year. A loose × 12 on a count that is
  already yearly makes the result 12x too large; a monthly count left unconverted, 12x too
  small. Convert on the count's own line, with its source.
- **The billing unit switched mid-calculation.** Per task and per unit can differ by orders of
  magnitude. State the unit and why.
- **A concentrated sum with no warning.** Say how many sources make most of the sum, and the
  spread of data years.
- **Currency with no date.** Token-denominated amounts converted at a price with no date, or
  data years mixed without saying so. State the token, the price and the date. A figure that
  rises and falls with your own token's price is not a market; restate it in a stable unit or
  keep it out.
