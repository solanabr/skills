<!-- The grandfathering pattern is adapted from beingsmit/technical-product-gtm@ef1aa7d, skills/technical-product-pricing/SKILL.md (MIT © 2026 Smit Patel); notice in THIRD_PARTY_NOTICES.md. -->

# Changing a price later

On Solana a price change is a deployment, a transaction or a governance vote, and it is public the moment it lands. Decide the change path before the first price ships, because where the fee lives decides what changing it costs.

## Where the fee lives

| Fee lives in | How it changes | Cost and risk |
|---|---|---|
| **A constant in program code** | A program upgrade | It needs the upgrade authority, usually a multisig. Ship a new verifiable build so integrators and explorers can check what changed. The new bytecode is public before your announcement is. If the upgrade authority has been revoked, the fee can never change: you need a new program and a migration. |
| **A field in a config account, set by an admin instruction** | One signed transaction | Cheap, so constrain it in code: a hard `MAX_FEE_BPS` the instruction can't exceed, a pending value with an effective-after slot or epoch (a timelock), and an event on every change. Integrators should read the config account, not hardcode the number. |
| **A Token-2022 transfer fee** | `SetTransferFee` from the fee-config authority | The protocol enforces the notice: a fee set in epoch N applies from epoch N+2, and setting it again before then restarts the delay. `maximum_fee` caps it per transfer. Setting the authority to None freezes the fee permanently. Details: ai-kit's [token-extensions fees reference](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/skills/token-extensions/references/fees.md). |
| **A governance-controlled parameter** | A proposal and a vote | Plan for weeks, plus a public debate about your margin. |
| **Offchain (API tier, subscription)** | Your billing system | This is the ordinary SaaS case. |

The config-account row is the usual right answer for a new program. It turns a price change into an operations task without making it unbounded. The design belongs with engineering: [solanabr/ai-kit](https://github.com/solanabr/ai-kit)'s `/plan-feature` and its `solana-architect` agent.

## What breaks when the number moves

- **Integrators.** SDKs, aggregator adapters and partners' quoting code often hardcode or cache the fee. A change you didn't warn them about produces wrong quotes and failed slippage checks in someone else's product, and they will route away. Give integrators the new value, the effective slot or epoch, and the account to read it from, before you announce publicly.
- **Trust.** Raising a fee that sits behind an admin key reads, to part of the audience, as the team taking more because it can. The hard cap in code is what answers that: "we can't exceed X".
- **Revenue shares.** Any partner whose cut is defined as a share of your fee changes income when you change the fee. Tell them first.

## Grandfathering onchain

In SaaS the usual move is to keep existing customers on the old price for 12 to 24 months (beingsmit). Onchain, everyone moves at the same moment unless the program can tell users apart. If you want grandfathering, build it in from day one: a fee-tier field on the user's account, or a fee-tier PDA, set when the account is created. You can't add it retroactively without migrating every account.

## The announcement

The change needs:

- the old value, the new value, and the effective slot or epoch
- the cap that bounds future changes
- the reason, in one line
- where integrators read the live value

Publish it before the change takes effect, not after. If the fee change also changes what token holders receive, stop and route it to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) first. A fee switch to holders is a classification question, not a pricing one.
