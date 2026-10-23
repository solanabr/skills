# The ask

<!-- The leverage ordering, the "what does each side lose" test and the partnership charter are adapted from beingsmit/technical-product-gtm@ef1aa7dd8564b4d824021cf152468ece278e1513, skills/partnership-architecture/SKILL.md sections 1, 3 and 6 (MIT, (c) 2026 Smit Patel; mirrored in github/awesome-copilot as skills/gtm-partnership-architecture). Notice in THIRD_PARTY_NOTICES.md. -->

Most surfaces in [surfaces.md](surfaces.md) are forms and PRs, not conversations: fill
them exactly as their docs say. This template is for the rest, the protocol, wallet or
team whose yes is a human decision.

## Before writing it

- **Readiness**: every artifact the partner will check exists ([readiness.md](readiness.md)).
- **Outbound diligence**: the answers in [diligence.md](diligence.md) are written.
- **Leverage**: answer "if this integration does not happen, what does the partner lose?"
  From strongest to weakest:
  1. **Requirement**: they need you to ship something of theirs (a market they cannot
     serve, a compliance or custody property only you have).
  2. **Economic**: measurable volume, fees or users routed to them.
  3. **Competitive**: their competitor already integrates you, or will.
  4. **Customer pull**: their users are asking for you, and you can show it (issues,
     support threads, onchain flows that already hop between you).
  5. **Co-marketing** alone: a quote-tweet. It rarely moves a partner, and if it is all
     you have, do not send the ask yet.

## The template

Short, technical, and the artifact and the number come first. No deck attached.

> **Subject: {{THEIR PRODUCT}} x {{YOURS}}: {{ONE CONCRETE INTEGRATION}}**
>
> {{ONE SENTENCE: what the integration does for their users.}}
>
> What exists today:
> - Program `{{PROGRAM_ID}}` on mainnet since {{DATE}}, verified build {{EXPLORER LINK}},
>   audited by {{AUDITOR}} ({{REPORT LINK}}, names the deployed commit)
> - IDL published; typed client: {{LINK}}
> - {{THE NUMBER: e.g. "$X routed in the last 30 days", "N wallets", with a Dune or
>   explorer link}}
>
> The ask: {{THE SMALLEST NEXT STEP, e.g. "route our pools in a test environment",
> "review our Amm implementation", "a shared channel with your integrations engineer"}}.
>
> What you take on: {{ONE LINE FROM diligence.md, e.g. "upgrade authority is a 3-of-5
> Squads multisig with a 48h timelock; no pause over user funds"}}.
>
> {{NAME}}, {{ROLE}}. {{ONE CONTACT}}.

Lead with their users, not your raise. Send it from the person who will do the integration
work or own the relationship, not from a generic BD inbox.

## Once they say yes

Write a one-page charter both sides sign before any announcement. If either side will not
put it on paper, there is no partnership yet. A signed charter is a contract: route it
through [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) and counsel
before anyone signs.

- Three shared goals, each with a number.
- What each side gives and gets, and whether both would still do it if the other walked.
- Stages with a go/no-go at each: a narrow pilot first, broader integration only after the
  pilot's number is met.
- Owners on both sides, the escalation path, the review cadence.
- **Exit criteria**: what ends it, and what happens to routed users and shared surfaces
  when it ends.
- Upgrade and incident notice: how far ahead each side hears about upgrades and pauses.

## Co-announcement

A joint announcement is a launch with two teams, and the onchain step still gates it. Do
not plan it here: use [launch](../../launch/SKILL.md). Each partner gets the partner kit
from its [artifacts.md](../../launch/references/artifacts.md) (exact copy at T-24h, "post
after ours, not at a time") and sits in its
[channel order](../../launch/references/channels.md).
