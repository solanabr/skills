# Partner map

<!-- The TVL tiers and the TVL-vs-fees matrix are adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/idea/defillama-research/references/tvl-as-trust-metric.md and defi-opportunity-framework.md (MIT, (c) 2026 SendAI and Superteam), reframed from "competitors and build targets" to "partners". The relationship tiers and staged pilots are adapted from beingsmit/technical-product-gtm@ef1aa7dd8564b4d824021cf152468ece278e1513, skills/partnership-architecture/SKILL.md sections 4 and 5 (MIT, (c) 2026 Smit Patel). The sponsorship and champion notes are adapted from jonathimer/devmarketing-skills@500b44b53220292879223a807ce0d349aafe2537, skills/hackathon-sponsorship/SKILL.md and skills/power-user-cultivation/SKILL.md (MIT, (c) 2026 Jonathan Reimer). Notices in THIRD_PARTY_NOTICES.md. -->

The competitive-landscape tools map the same protocols you would partner with, and frame
every one as a competitor. This file reframes them as targets: who to integrate with, in
what order, and how deep.

## 1. Size the candidates with public data

Pull the candidates from DefiLlama (Solana chain, your category and adjacent ones) and sort
them into size bands. The bands are a sizing convention, not an official tiering; take
current numbers from DefiLlama on the day you build the map.

| Band | TVL | As a partner |
|---|---|---|
| 1 | $1B+ | Integrating them is safe and expected. They have a process (often a form or PR, see [surfaces.md](surfaces.md)) and little reason to give you more than that. |
| 2 | $100M-$1B | The best partners: proven, and still reachable by a human. |
| 3 | $10M-$100M | Peers. A co-integration or co-announcement can help both sides. |
| 4 | $1M-$10M | Early. Partner only for a specific capability, after inbound diligence. |
| 5 | under $1M | Do not depend on them unless you know the team. |

Then read fees against TVL, because TVL alone is the wrong signal for a partner whose
users you want:

| | High fees | Low fees |
|---|---|---|
| **High TVL** | Real usage. Their users transact; integration routes real flow. | Capital parked for yield. Big number, little flow for you. |
| **Low TVL** | Capital-efficient: much activity per dollar. Often the best flow partner for its size. | Early or dying. Check the trend before spending time. |

Red flags before you depend on one: TVL that spiked with an incentive launch and is not
holding; one wallet holding most of the TVL; TVL rising while fees fall. Fee and revenue
figures come from DefiLlama's fees dashboards; run every candidate you would depend on
through [inbound diligence](diligence.md#inbound-should-we-depend-on-them).

## 2. Pick the depth

| Depth | What it is | Typical Solana shape | Commitment |
|---|---|---|---|
| **Listed** | Self-serve: their process, your artifacts | Jupiter verification, DefiLlama adapter, Solscan form, platform list | Forms and PRs; no relationship needed |
| **Integrated** | Their product calls yours or yours calls theirs | Routed pools, a wallet surfacing your action, a protocol using your program via CPI | A shared channel, an engineer on each side |
| **Strategic** | Joint roadmap or joint product | Co-built vaults, shared liquidity programs, a joint launch | A signed charter ([ask.md](ask.md)), named owners, exit criteria |

Start one depth lower than you want, and move up only when the current one has hit its
number. Most partners should stay at "listed" or "integrated"; only a few relationships
earn strategic depth.

Stage every integrated or strategic partner: a narrow pilot first, with a stated metric
and a go/no-go, then a broader rollout. Set the pass mark with the partner before the
pilot starts.

## 3. Ecosystem programs you can sponsor

The surfaces in sections 5 and 6 of [surfaces.md](surfaces.md) also work in the other
direction: sponsoring puts your product in builders' hands.

- **Earn bounties and hackathon tracks.** "Best use of {{your program}}" or a challenge built
  around the problem you solve brings integrations you did not have to build. In-kind
  prizes (RPC credits, API access) suit a team with little budget. Ask for a workshop slot
  and for the right to contact participants afterwards, with their consent. Follow up:
  winners within 48 hours, every consenting participant within a week with no hard sell, and
  check after 30 days which projects still use you. Measure the projects still running on
  your program at 30, 60 and 90 days, not the impressions.
- **Champions.** The builders who already integrate you are a distribution channel. Start
  invite-only and small: early access, a direct line to the team, credits. No content
  quotas and no commission-based referrals.

## 4. `.claude/context/partners.md`

The committed artifact this skill writes.

```markdown
# Partners: <product>
Updated: <date>   Surfaces checked against surfaces.md as of: <date>

## Readiness
| Artifact | Status: present / partial / missing | Link |

## Pipeline
| Partner / surface | Band | Depth | Leverage (1-5) | Blockers (from readiness) | Ask sent | Status | Owner | Next step (date) |

## Charters
- <partner>: <link to signed charter>, exit criteria: <one line>

## Co-announcements
- <partner>: launch runbook <.claude/context/launch.md or archive path>
```
