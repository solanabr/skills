---
name: ecosystem-bd
description: Get a Solana product listed, routed and integrated by others (Jupiter, wallets, explorers, DefiLlama, Superteam, Foundation): a dated map of what each surface requires, readiness gaps, two-way diligence and the partner ask. Use for "get listed on Jupiter", "partnerships", "integration BD".
user-invocable: true
---

# Ecosystem BD

On Solana, being integrated by someone else is usually a bigger distribution channel than
anything a small team does alone. Almost every surface asks for a technical artifact or an
onchain fact before it says yes, so this skill starts from what each one requires and
treats outreach as the last step.

## Context handoff

At start, read `.claude/context/idea.md`, `build.md`, `positioning.md` and `launch.md` if
present: the product, what is deployed, the one-liner and any launch date. If
`.claude/context/partners.md` exists, resume the pipeline instead of starting over.

Writes `.claude/context/partners.md` in the format at the end of
[partner-map.md](references/partner-map.md).

## Workflow

1. **Pick target surfaces** from [surfaces.md](references/surfaces.md): aggregators and
   routers, wallets, explorers and analytics, DeFi dashboards, Superteam, the Foundation.
   Every row is dated 2026-10-05 and links its official source. Re-open the source before
   acting, and update the date in `partners.md`. Skip rows marked unverified unless the user
   has a current source.
2. **Readiness first.** For each target, check the artifacts it asks for with
   [readiness.md](references/readiness.md): published IDL, verifiable build, audit naming
   the deployed commit, typed client, token metadata, an onchain TVL or fees computation.
   Missing ones go to [solanabr/ai-kit](https://github.com/solanabr/ai-kit) as engineering
   work and into `partners.md` as blockers. Do not draft an ask for a surface whose
   artifacts are missing.
3. **File the self-serve surfaces.** Forms and PRs (Jupiter verification, the platform list,
   DefiLlama adapters, Solscan's one-shot token form, Dune decoding) are done exactly as
   their docs say. Many can only be filed after the program, mint or pool exists; put those
   in the launch runbook's L+ window if a launch is planned.
4. **Map the partners** with [partner-map.md](references/partner-map.md): size candidates
   from DefiLlama, read fees against TVL, choose a depth (listed, integrated, strategic),
   and consider sponsoring an Earn bounty or hackathon track.
5. **Diligence both ways** with [diligence.md](references/diligence.md). Inbound (should we
   depend on them?) goes to
   [counterparty-gate](https://github.com/solsentry/solana-counterparty-gate/blob/86fc51eb9ef9efbe23d0d864bddec9cbafd843e0/skill/SKILL.md).
   Outbound (what they take on by depending on you: upgrade authority, admin keys, pause
   powers, support load) is written here before the first call.
6. **Write the ask** from [ask.md](references/ask.md): the integration artifact and the
   volume number first, the smallest next step as the ask, the leverage stated honestly.
   A yes becomes a signed one-page charter with exit criteria.
7. **Co-announcements** go through [launch](../launch/SKILL.md). The onchain step gates
   them like any launch.
8. **Write `partners.md`**: readiness, pipeline with owner and next date, charters.

## Rules

- No surface in the map is won by a pitch alone. If readiness fails, the next step is
  engineering, and the skill says so.
- No invented thresholds. Where an operator publishes none (Jupiter verification,
  DexScreener, Solflare beyond its 24h minimum age), say that, and do not supply a
  number.
- Revenue shares, token allocations to partners, exclusivity and anything contractual or
  regulatory go to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill).
  Say so and stop.
