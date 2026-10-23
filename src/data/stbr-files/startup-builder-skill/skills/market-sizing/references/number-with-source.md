# Number with source

Every number in `market.md` and in the research notes behind it is one line in this format.
A number that can't fill the line doesn't go in.

```
value · what it counts, per period · geography · data year · access, kind · URL · "short quote" · calculation, if (est.)
```

## Labels

Two labels per number: whether the source was opened, and what kind of claim it is.

| Access | Meaning |
|---|---|
| `observed` | The page, PDF, filing or API response was opened, and the quote was checked in its text |
| `secondary` | Seen only in a search snippet, or through another source that cites it. Never summed, never on a slide. |

| Kind | Meaning |
|---|---|
| `realized` | A filing, a public price list, or onchain data that was measured |
| `reported` | A third party citing it, or a company talking about itself |
| `projection` | A forecast, with whoever signs it |
| `(est.)` | Our calculation, with the calculation on the same line |
| `[inferred]` | A reading, not a measurement |

Keep the quote to the few words that carry the number, never a paragraph. For an API
response, give the field and the filter instead. Take the date from the system clock, not
from memory.

## Examples

A counted onchain buyer base, pulled 2026-10-08. **Re-pull it; don't reuse it.**

```
85 teams · Solana protocols with ≥ US$100k fees in the trailing 30 days · Solana · 2026-10-08 · observed, realized · https://api.llama.fi/overview/fees/solana · protocols[] where protocolType = "protocol" and total30d ≥ 100000 → 106 listings · (est.) grouped by parentProtocol, a null parent counted as its own team = 85 teams
```

What it shows: the account count for a product sold to protocols is readable from public
data, in two steps. Keep `protocolType = "protocol"`: the response also carries a row for
the chain itself (`"chain"`, Solana's own fees). Group by `parentProtocol`, counting a listing
with no parent as its own team (106 listings, 85 teams; 53 of the listings have no parent).
The per-chain endpoint already returns each protocol's Solana slice, not its all-chain total:
deBridge's 30-day fees are US$113,789 here against US$540,641 in `/summary/fees/debridge`
the same day.
The threshold is a filter you choose and state; it is not evidence that those teams will buy.

A unit-based serviceable market from a filed deck:

```
50B vehicle miles traveled · serviceable market for autonomous trucking by the start of 2028; the source states no period · US · 2024 deck · observed, projection · https://www.sec.gov/Archives/edgar/data/1828108/000182810824000062/analystinvestorday2024pd.htm · "50B VMT serviceable addressable market" · none
```

## Research note header

The notes behind `market.md` (front reports, the money-type sum) open with:

```
type: <what this is, and what it is not, e.g. "inputs to the market slide; not the slide">
as-of: <date and time from the system clock>
basis: <what each label means in this file, if it differs from the table above>
siblings: <other notes on the same question>
```
