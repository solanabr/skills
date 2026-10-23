<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/slide-templates.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten for the shell in deck-design-system.md. -->

# Slide templates

Markup for the shell in [deck-design-system.md](deck-design-system.md). Every slide is a `<section class="slide">` with a label, a claim as the headline, one block of evidence and a `.notes` block. Which slides to use, and in what order, is in [pitch-structure.md](pitch-structure.md).

## Per-slide content

| Slide | Headline shape | Evidence block | Speaker-note prompt |
|---|---|---|---|
| Title | `{{NAME}}`, then "does {{WHAT}} for {{WHO}}" | Category and stage tags | The bar test in one breath; create curiosity, don't explain |
| Problem | The pain as a claim, with a number | Three pain points, or one real user quote | Let it land; "costs $X, takes Y hours, fails Z% of the time", each sourced |
| Why now | "Until {{CHANGE}}, this wasn't possible" | Before/after of the enabling change, dated | Why didn't this exist two years ago? |
| Solution | What it does in one sentence | Three features, each answering one pain | Map each feature to a pain from the problem slide |
| Demo | The outcome the user gets | A real screenshot (inlined), three callouts, explorer link | Live if you can, recorded backup either way |
| Why crypto / Solana | What is impossible without the chain | Two or three concrete reasons as you measured them | If this slide is hard to fill, revisit the idea |
| Traction | The best checkable metric and its trend | Three metric cards with sources ([onchain-metrics.md](onchain-metrics.md)) | Explain filtering of bots and incentivised flow before they ask |
| Market | Bottom-up SAM as one number | The multiplication, each factor sourced | Never top-down |
| Competition | The one dimension you win on | Comparison table with your row highlighted | Admit competitor strengths |
| Business model | Who pays, when, how much | Price, volume and margin after onchain costs | "Free now, monetise later" is not a model |
| Team | Why this team for this problem | Two to four people, one shipped thing each | Shipped, scaled, domain expert; not "passionate" |
| Ask | Amount, instrument, milestone | Use-of-funds split and the milestone it buys | Specific; instrument choices for tokens go to legal |
| Roadmap (optional) | The next milestone with a metric | Three or four phases, current one marked | "1k weekly active wallets on mainnet", not "launch mainnet" |
| Tokenomics (optional) | What the token does in the product | Allocation, cliffs, vesting, circulating supply | No returns, yield or fee-share language; see [crypto-pitch-mistakes.md](crypto-pitch-mistakes.md) #4 |
| Contact | Name and one link | Email or handle, site, repo, program ID | End here; no extra summary |

## Markup

Claim slide (problem, why now, solution, why crypto):

```html
<section class="slide">
  <span class="label">The problem</span>
  <h1>{{CLAIM}} <span class="em">{{ONE_WORD}}</span></h1>
  <ul><li>{{POINT_1}}</li><li>{{POINT_2}}</li><li>{{POINT_3}}</li></ul>
  <aside class="notes">{{SPEAKER_NOTES}}</aside>
</section>
```

Metrics slide (traction, market):

```html
<section class="slide">
  <span class="label">Traction</span>
  <h1>{{HEADLINE_METRIC_AS_A_CLAIM}}</h1>
  <div class="grid">
    <div class="card"><div class="metric">{{VALUE}}</div><p>{{LABEL}}</p>
      <span class="source">Source: {{LINK_OR_QUERY}}</span></div>
    <!-- two more cards -->
  </div>
  <aside class="notes">{{HOW_BOTS_AND_INCENTIVES_ARE_FILTERED}}</aside>
</section>
```

Comparison slide (competition):

```html
<section class="slide">
  <span class="label">Competition</span>
  <h1>{{THE_DIMENSION_YOU_WIN_ON}}</h1>
  <table>
    <tr><th></th><th>{{CRITERION_1}}</th><th>{{CRITERION_2}}</th><th>{{CRITERION_3}}</th></tr>
    <tr><td>{{ALTERNATIVE}}</td><td class="yes">✓</td><td class="no">—</td><td class="no">—</td></tr>
    <tr class="us"><td>{{PROJECT}}</td><td class="yes">✓</td><td class="yes">✓</td><td class="yes">✓</td></tr>
  </table>
  <aside class="notes">{{WHAT_THE_ALTERNATIVES_DO_WELL}}</aside>
</section>
```

Title and contact slides drop the label and use `<h1 class="hero">`. Screenshots go in as `<img src="data:image/png;base64,…" alt="…">` so the file stays self-contained.
