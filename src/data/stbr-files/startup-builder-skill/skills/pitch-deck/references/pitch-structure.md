<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/pitch-structure.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten; invented example statistics removed. -->

# Pitch structure

A slide order drawn from the common Sequoia, YC and Kawasaki deck advice, with the crypto-specific slides added. Examples in brackets are shapes to fill with the founder's own numbers, never figures to reuse.

## Rules for every slide

- One idea per slide; if it carries two, split it.
- Large type (Kawasaki's 30pt rule) and at most about six short bullets.
- A visual (metric, table, before/after, screenshot) beats a paragraph.
- The headline is a claim, not a label: "Agents can't pay each other without a human co-signer", not "Problem".

## Core slides

| # | Slide | What it must do | Crypto-specific bar |
|---|---|---|---|
| 1 | Title + hook | Name, one-liner a stranger understands, one striking fact | The fact is yours and sourced |
| 2 | Problem | A moment of pain for a named persona, and today's workaround | Not "DeFi is hard": [N% of X fail at step Y, per source] |
| 3 | Why now | What changed in the last 12–18 months | Name the change: a Solana feature or standard that shipped, a regulatory event, a behaviour shift. "Crypto is growing" is not one |
| 4 | Solution | One sentence, three bullets, a screenshot | Plain words: "best swap price across Solana DEXes in one click", not "liquidity aggregation protocol" |
| 5 | Why crypto / why Solana | What is impossible without a chain, and why this chain | Pass the [crypto-necessity test](../../idea-sprint/references/crypto-necessity-test.md). Pick two or three concrete reasons (fee level, confirmation time, composability with a named protocol), stated as you measured them |
| 6 | Demo | Live link or 3–4 screenshots of the core flow | Devnet is fine for hackathons; investors expect mainnet or a clear date. Show an explorer link |
| 7 | Market | Bottom-up: [reachable users] × [willingness to pay] | Count users you can find onchain or in a named community; never "crypto is a $NT market" |
| 8 | Traction | The single best metric, big, with its trend | Onchain metrics over social metrics: see [onchain-metrics.md](onchain-metrics.md) |
| 9 | Business model | Who pays, when, how much | Margins **after** onchain costs: priority fees, RPC, indexing, rent |
| 10 | Competition | Landscape table or 2×2, with honest strengths | "No competitors" reads as no research |
| 11 | Team | Why this team for this problem | Shipped things, not "passionate about blockchain" |
| 12 | Ask | Amount, instrument, use of funds, milestone, timeline | For a token round or token warrant, the instrument choice is a legal question: route to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) |
| 13 | Contact | Email or handle, site, repo, program address or explorer link | — |

## Optional slides

**Tokenomics** (only if a token exists; VCs and some grant committees)
- What holding or using the token *does* in the product.
- Allocation by bucket with vesting and cliffs, and the circulating-supply schedule.
- A stress test: what happens to the protocol if the token price falls 90%?
- Leave out any promise of returns, yield, fee share, buybacks or price. Those framings are the classic securities red flag; route token design and its wording to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) before they go on a slide.

**Regulatory readiness** (VCs, increasingly expected)
- Which jurisdictions you serve and whether you geofence.
- Whether counsel has reviewed the token and the product flows, and when.
- Structure in one line (equity only, equity plus token warrant, token).
- Content for this slide comes from counsel, not the agent. Use [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) for orientation only, and say so on the slide's notes.

**Integration architecture** (strategic partners)
- How you plug into their stack, docs status, time to integrate, what their users gain.

## Order by audience

| Audience | Order | Skip |
|---|---|---|
| Hackathon | Title, Problem, Solution, Demo, Why crypto, Traction, Ask | Market sizing, financials, regulatory |
| VC | Title, Problem, Why now, Solution, Demo, Market, Traction, Business model, Competition, Team, Tokenomics (if any), Ask | Nothing |
| Grant | Title, Problem, Solution, Why Solana, Demo, Ecosystem impact, Traction, Milestones and budget, Ask | Heavy financials, tokenomics |
| Accelerator | Title, Problem, Solution, Demo, Traction, Team, Ask | The grand vision; focus on the next three months |
| Partner | Title, Problem, Solution, Demo, Integration plan, Mutual benefit, Ask | Your fundraising |
