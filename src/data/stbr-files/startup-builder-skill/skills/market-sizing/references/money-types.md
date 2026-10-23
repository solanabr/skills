# Money by type: the sum template

A research note that sums the money around each wedge, kept apart by type. Its totals feed
`market.md`'s Sizing section; the note itself stays in the team's research folder.

## The three types

| Type | What it is | On Solana, for example |
|---|---|---|
| **C** | Current spend on the check or work the product would do | Fees paid to the protocol or vendor doing the job today; a vendor's published price × accounts; bounties and grants posted for the same job ([Superteam Earn](https://superteam.fun/earn), read 2026-10-08); the team's own hours |
| **S** | Spend on the activity the product touches or checks, including per-unit payments already on record | Transaction and priority fees on the flows the product would route; fees paid across a category, from [DefiLlama](https://api-docs.defillama.com/) (read 2026-10-08) |
| **R** | Money at risk that is not a purchase: loss, exploit, fraud, disputed charges | Funds lost to exploits, failed transactions, slippage the user eats |

R goes on the problem slide, not the market slide. Split **direct R** (money that changes
hands because of what the product does) from **broad R** (losses that also have other
causes). They can be orders of magnitude apart, so every R line says which one it is.

The letters are only for money. The wedge ranking's Q, A and D are scores
([qxa-rubric](qxa-rubric.md)), not types of money.

## Rules for the whole note

1. The three types are never added together, and the same dollar never appears under two.
2. The whole industry, TVL, volume and market cap go under Context, outside every sum
   ([traps](traps.md#what-doesnt-add-up)).
3. Outside every sum: `secondary` numbers, report-mill figures, and buyers counted from an
   authorisation. Where a purchase exists only because a rule compels it, the line says so.
4. The product's price is `[price]` until the founder decides it, or the number in
   `pricing.md`. A third party's price appears only as a labelled anchor.

## Template

```markdown
# <Project>: wedges summed by type of money (<date>)

## 1. By wedge

### Wedge N. <name>
Who pays: <buyer>
- C: <number-with-source line> | Not found: <what was searched for>
- S: ...
- R direct: ... · R broad: ...
- Context: ...

## 2. Sums by type
How the sum was made: only annual numbers labelled observed (realized or reported) or (est.)
on an opened source; geography (US vs global, and which is the floor); data years, with no
inflation adjustment; token and FX prices with date and source.

### 2.1 C
### 2.2 S
- The calculation, line by line, with a low and a high bound.
- Weight: which sources make what share of the sum.
### 2.3 R
- Direct R, kept apart from broad R.
### 2.4 Wedges with no number
- No number in any type: ...
- No C / no S / no R: ...

## 3. Entry, bottom-up
- accounts (source) × units per account per year (source) × [price] = (est.) per year, for
  each candidate billing unit. A monthly count is converted on its own line, with its source.
- With a price in bps: accounts × volume per account per year × bps.

## 4. What is weak
- Concentration, mixed years, cuts with no number, sources that wouldn't open (403, paywall,
  login), preliminary reports.
```
