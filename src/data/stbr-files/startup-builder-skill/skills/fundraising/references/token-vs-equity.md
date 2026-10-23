# Token vs equity: orientation only

This file frames the founder's structuring question so that the right questions get asked. It doesn't answer the legal or tax half and must not try to. Every consequence goes to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill), which is itself information-only and points you to licensed counsel. If the founder asks "is this legal", "is our token a security" or "how is this taxed", say that this skill doesn't answer that, and route it.

## What an investor can be buying

Name which of these is on the table. Founders often mix them in one conversation without noticing.

| Instrument | Plain description | The founder question it raises |
|---|---|---|
| **Equity or a SAFE** | A claim on the company | If value later accrues to a token rather than the company, what does the equity own? |
| **Token rights alongside equity** (a token warrant or side letter) | A right to receive tokens if and when a token is issued | What allocation was promised, from which pool, and on what vesting? Which entity has to honour it? |
| **A pre-launch token agreement** (SAFT-style) | Payment now for tokens delivered later | Who issues the token, and when does the agreement convert? |
| **A token purchase** | Tokens directly, usually locked | Under what lock and vesting, from which allocation, and at what price relative to other rounds? |

## Questions to settle before a term sheet

Write each answer, or "unknown", into the "Routed legal questions" section of `data-room.md`:

1. **Which entity issues the token**, if one is ever issued: the operating company, a foundation, or something else? How do the equity holders relate to that entity?
2. **Where value accrues:** fees to the company, to the treasury, or to token holders? This decides what the equity is worth if the token succeeds. Fee flows to token holders are also the most sensitive classification point, so route them first.
3. **The token pool for investors:** how much of any future supply has already been promised through earlier side letters or warrants? Every earlier promise reduces what the next round can be offered, and the next lead will diligence the whole stack.
4. **Vesting and lockups:** do investor tokens vest on the same schedule as the team's, and is that enforced on chain (see the [data-room](data-room.md) token row)?
5. **Pro-rata and most-favoured-nation clauses:** do earlier token terms automatically improve when later ones do?
6. **Conflicts:** when equity holders and token holders want different things, such as a fee switch, a treasury spend or a migration, who decides?

## How earlier token rights affect the next round

- **They are a liability on the cap table that isn't on the cap table.** Put every token commitment in one schedule next to the cap table, with its instrument, its holder class, the amount or percentage, and its vesting.
- **The incoming lead will ask** whether the token allocation for investors is already exhausted, whether token and equity investors are treated consistently, and whether any earlier promise conflicts with the token design now planned.
- **Inconsistency is the deal-breaker.** It does more damage than the size of any promise. Make the schedule, the tokenomics document and the onchain vesting agree.

## Route, don't answer

| The founder asks | Route to crypto-legal-skill |
|---|---|
| Is our token, or this token right, a security? Is a pre-launch token agreement safe? | [securities-law.md](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/skill/references/domains/securities-law.md) and the [tokenomics-legality](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/skill/references/domains/tokenomics-legality.md) decision tree. Live-token classification is a hard stop to counsel there. |
| Where should the token entity sit? | Counsel. crypto-legal-skill doesn't answer entity structuring; use the [`legal-triage`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/agents/legal-triage.md) agent or [`/triage`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/commands/triage.md) to frame the question for counsel. Its [`jurisdiction-router`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/agents/jurisdiction-router.md) only maps which regulators apply to a given setup. |
| How are token allocations, vesting or a token sale taxed? | [tax.md](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/skill/references/domains/tax.md) |
| We plan an airdrop or a points conversion | [`/airdrop-assessment`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/commands/airdrop-assessment.md) |
| Is the upgrade authority, or the mint and freeze authority, a problem for classification? | The [`program-authority-auditor`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/agents/program-authority-auditor.md) and [`token-inspector`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/agents/token-inspector.md) agents |

crypto-legal-skill doesn't draft binding language, opinion letters or final SAFTs, and neither does this skill. Counsel drafts the instruments.
