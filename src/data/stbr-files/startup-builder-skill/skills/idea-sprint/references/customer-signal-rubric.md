<!-- Adapted from sendaifun/solana-new@e81c261, skills/idea/validate-idea/references/customer-signal-rubric.md (signal tables and score) and validation-framework.md (user-conversation questions). MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten. -->

# Customer-signal rubric

Separates demand from noise. Talk is cheap; effort, money and gas are not.

## Strong signals

| Signal | Why it counts |
|---|---|
| People run a manual version today (spreadsheets, bots, multisig rituals) | They pay for it in time already |
| A related open-source project has active forks or issues asking for this | Developers are spending effort on it |
| Protocol teams post bounties or grants for it | There is budget behind the need |
| Onchain activity shows a growing workaround pattern | Users already pay fees to get around the gap |
| Several teams tried and failed | The problem is real; the solution is hard |

## Weak signals (never build on these alone)

| Signal | Why it misleads |
|---|---|
| "I'd definitely use that" in a DM | No commitment behind it |
| Likes, reposts, forum upvotes | Engagement is not willingness to pay or switch |
| "The market is huge" | A top-down TAM hides the absence of a specific buyer |
| VC interest without user pull | Investors follow narratives; users follow utility |
| A hackathon prize exists for the category | Prize money is not product-market fit |

## Score (feeds "market pull" in the [scoring rubric](scoring-rubric.md))

| Score | Evidence |
|---|---|
| 3 | Several strong signals from independent sources |
| 2 | One strong signal plus several weak ones |
| 1 | Weak signals only |
| 0 | Nothing, or demand for a different thing |

Below 2: validate harder before writing code.

## Collecting signals by talking to users

Find five to ten people who would be first users. Ask about the past, never the hypothetical:

- "How do you solve [problem] today?" — not "Would you use [product]?"
- "What is the most annoying part of that workflow?"
- "When did it last cost you money or time? How much?"

Listen for specificity and emotion. Vague interest is not demand.

Onchain evidence (wallet counts, fee spend on a workaround) is checkable with an explorer or Dune; treat wallet counts as an upper bound, since one user can run many wallets.
