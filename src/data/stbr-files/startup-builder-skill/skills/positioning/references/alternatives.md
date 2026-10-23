<!-- Adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/idea/competitive-landscape/references/landscape-mapping.md and moat-analysis.md, MIT © 2026 SendAI and Superteam; full notice in THIRD_PARTY_NOTICES.md. Rewritten to pick three alternatives for positioning, not to map a landscape. -->

# Picking the three alternatives

Mapping who exists is an input; positioning needs only the three alternatives the ICP actually
weighs, and the one dimension you beat each on.

## Where to look, in order

1. **What the ICP does today without you.** The manual workaround, the spreadsheet, the
   multisig, the CEX, the Discord bot. This is usually alternative #1 and the one founders
   leave out.
2. **Solana projects doing the job.** Check live usage, not landing pages: the program's
   recent transactions, DefiLlama if listed, GitHub activity.
3. **The same job on other chains**, if the ICP can move there. For an integrator, an EVM
   version they would have to bridge to is a real alternative.
4. **Dead projects** in the space. Why they died is the bear case your positioning has to answer.
5. **Hackathon entries** ([colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot/blob/0453ffe26e8d245152619fcc949689a6adaab1c6/skills/colosseum-copilot/SKILL.md)
   for crowdedness). They tell you how crowded the idea is, but they are rarely what a paying ICP
   compares you to.

For each candidate, capture: name, link, live / beta / dead, chain, a usage number with its
source, what it does well, where it is weak.

## Choosing three

Choose the three the ICP would name if asked "what would you use instead?", and include at least
one non-product alternative (doing it by hand, or not doing it). Then, for each, write:

- **We win on:** one dimension, concrete enough to demo or measure: settlement time, a fee
  in bps, the number of signers, custody, the steps to integrate.
- **It wins on:** be honest. The reader already knows, and leaving it out costs credibility.

If you cannot name a dimension you win on for an alternative, that is a positioning problem,
not a copy problem. Send it back to [idea-sprint](../../idea-sprint/SKILL.md).

## What makes the win stick

Six moat types, with the question that tests each one in crypto:

| Moat | Test question |
|------|---------------|
| Network effects (liquidity, two-sided markets) | Is there a credible path to the critical mass where it starts to compound? |
| Switching costs | What would a user lose by moving to a fork? Composability makes this weaker onchain than in SaaS. |
| Data | Does the product get better with usage in a way a fork cannot copy from chain data? |
| Technical complexity | How long until a good team replicates it? The code is usually public. |
| Distribution and ecosystem lock-in | How many wallets, protocols and tools depend on you, or route through you? |
| Brand and trust | Would the ICP trust a no-name fork with funds? |

Prefer a win backed by a moat. A win on price alone ends when a fork lowers its fee.
