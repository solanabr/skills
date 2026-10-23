<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/crypto-pitch-mistakes.md, with the ask lines from pitch-reference-sources.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten; Mistake 4's fee-share example replaced, invented statistics removed. -->

# Crypto pitch mistakes

Twelve antipatterns. Bracketed examples are shapes for the founder's own numbers, never figures to reuse.

**1. Leading with technology.** "A ZK-compressed state channel with recursive proofs" → "[Persona] loses [X%] on every [action]. We cut that to [Y]." Problem first; architecture only once they care.

**2. Top-down market sizing.** "DeFi is a $NT market" → "[Count of reachable users, with source] × [price they'd pay] = [SAM]." Count users you can find onchain or name in a community. Never invent the count.

**3. No crypto necessity.** "Uber on the blockchain" fails. Cover the word "Solana" in the pitch: if the product still makes sense, find the load-bearing reason or drop the chain ([test](../../idea-sprint/references/crypto-necessity-test.md)).

**4. Token without utility, or a token sold on returns.**
- Bad: "Our token will appreciate as the network grows."
- Also bad: "Stakers earn a share of protocol fees at [N]% APY." Promising holders yield, fee share, buybacks or price support is the classic securities red flag, and it is the first thing a crypto-literate investor or lawyer will circle.
- Better: state what the token *does* inside the product, such as paying for a metered resource, posting a bond that can be slashed, or gating an action. Then show allocation and vesting. If the only reason to hold it is price, drop the token.
- Any token-economics claim, and the wording of it, goes through [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) and then counsel before it reaches a slide.

**5. "No competitors."** That reads as no research. Name the alternatives, including "do nothing" and spreadsheets, admit what they do well, and show the one dimension you win on.

**6. No demo.** "Beta in Q3" → a live link, a devnet wallet with test SOL, and a recorded backup.

**7. Vanity metrics.** Followers and Discord members → active wallets, retention and fees, each with a public source ([onchain-metrics.md](onchain-metrics.md)).

**8. A vague ask.** Specific amount, instrument (SAFE, equity, token warrant, grant), use of funds by line, the milestone it buys, and the runway. "Raising [amount] on [instrument] for [hires and runway] to reach [metric] by [date]." For token warrants or token rounds, the instrument is a legal choice: route it to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill).

**9. No why-now.** Name the change in the last 12–18 months that makes this possible: a Solana feature or standard that shipped, a regulation that took effect, a behaviour shift with evidence.

**10. Crowded slides.** One idea per slide, large type, about six short bullets at most. If it can't be grasped in five seconds, it fails.

**11. Unit economics that ignore onchain costs.** Gross margin after priority fees, RPC and indexing, account rent, oracle and any per-transaction protocol fees, at your projected volume.

**12. Token overhang.** A large team allocation with a short cliff signals sell pressure. Show every bucket's cliff and vesting, the circulating supply over time, and what happens to the protocol if the token falls 90%. Allocation design is a token-engineering and legal question, not a slide-design one.

## Pre-flight checklist

- [ ] Slide 1 hooks in five seconds
- [ ] A non-crypto reader understands the problem slide
- [ ] There is a why-now slide with a named change
- [ ] Why-crypto is concrete
- [ ] Every number has a source; none is assumed or invented
- [ ] The market is sized bottom-up
- [ ] The demo works today, with a recorded backup
- [ ] Competition is acknowledged honestly
- [ ] The ask has amount, instrument, use, milestone and timeline
- [ ] No slide promises token returns, yield or fee share
- [ ] The three hardest questions have rehearsed answers
