<!-- Adapted from sendaifun/solana-new@e81c261, skills/idea/validate-idea/references/pivot-or-persist.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten. -->

# Pivot or persist

The go/no-go after scoring and validation.

**Which rule decides:** the /15 score in [SKILL.md](../SKILL.md) (≥ 8 go, 6–7 conditional,
< 6 no-go). The only exception is the no-go list below: any one of those stops the idea
whatever it scored. The five go checks are not a second vote; use them as evidence when
you score.

## Go checks: evidence for the score

1. Demand score ≥ 2 on the [customer-signal rubric](customer-signal-rubric.md)
2. Feasibility is "straightforward" or "hard but solvable"; no open research problem
3. A testable MVP in two weeks or less
4. The founder has an unfair advantage: domain, existing users, unique data or relationships
5. Crypto is necessary: the product is worse or impossible without the chain

## No-go: any one is enough

1. Demand score is 0
2. A well-funded team already shipped a good version (you are late and worse)
3. The core technical problem is unsolved (that is research, not a product)
4. Crypto is ornamental: the chain adds friction, not value

## Every no-go gets a pivot

| Pivot | Keep | Change |
|---|---|---|
| Adjacent | the problem | the user segment |
| Wedge | the users | a smaller first problem |
| Stack | the concept | the layer (infra, app or protocol) |
| Chain | the idea | the ecosystem, where timing or liquidity is better |

## State the confidence

| Confidence | Meaning |
|---|---|
| 0.8–1.0 | Signals point clearly one way |
| 0.5–0.7 | Mixed; one more week of validation is worth it |
| 0.0–0.4 | Not enough data to decide; research before deciding |
