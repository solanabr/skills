# Q×A rubric for ranking wedges

Each candidate gets Q and A, 1 to 5. Rank by Q×A. D only breaks ties. Reject only where the
wedge is technically infeasible, and write why.

## Before scoring: the vision in three lines

Write the project's vision, its cycle and its pillars, one line each. Without them A turns
into taste.

Illustrative (invented project): *Vision:* any app on Solana can pay out to anyone in their
local currency. *Cycle:* a partner integrates once → payouts settle → each new corridor is
reused by every partner. *Pillars:* the settlement program, the corridor liquidity, the
compliance routing.

## Q: quality of the problem, 1 to 5

| Score | Anchor |
|---|---|
| 5 | Funds, a whole operation or many users at stake, or a large operation blocked from scaling, with an incident or a rule behind it |
| 4 | A large, recurring loss or a blocked scale-up, with money spent, an in-house fix, or a documented gap |
| 3 | Real, but moderate |
| 2 | Small, or speculative |
| 1 | No sign that anyone cares |

The customer must have shown they care: an incident, a rule, money lost, or something built
in-house. On Solana that is often public: a postmortem, a governance proposal with a budget,
a bounty, an in-house fork or script. Grade it against idea-sprint's
[customer-signal rubric](../../idea-sprint/references/customer-signal-rubric.md); weak
signals don't lift Q.

## A: how much solving it builds the vision, 1 to 5

| Score | Anchor |
|---|---|
| 5 | One customer's problem needs the whole cycle and leaves an asset the next customer reuses |
| 4 | Nearly the whole cycle, plus one pillar |
| 3 | One pillar, across several units |
| 2 | One unit, one pillar |
| 1 | Nothing |

## D: distance from what is built, 0 to 2

| Score | Anchor |
|---|---|
| 0 | Runs on what already works today |
| 1 | One piece not yet built or measured |
| 2 | Several |

Read "what already works" from `build.md`'s What works today, not from the roadmap. D orders
candidates with the same Q×A and never rejects one.

## Rules

- A count of problems is not a weight: one large problem outweighs a thousand small ones.
- A buyer counted from an authorisation is not a buyer: regulatory permission to operate is
  not a programme that buys anything ([traps](traps.md#buyers-that-dont-exist)).
- Reject only where it is technically infeasible: the chain, the data or the hardware can't
  do it today. Write the reason. A low score is not a rejection, because a desk score is
  `[inferred]` and only a conversation with a buyer decides among the top few.
