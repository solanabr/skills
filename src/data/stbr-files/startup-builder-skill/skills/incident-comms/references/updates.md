# The three updates

Pre-write these in peacetime and get them approved once (counsel for the SEV-1 versions),
so that at minute 40 the job is filling blanks, not writing. Post each one to the status
page first, then link it everywhere else.

Every update answers four questions in this order: what users see, what they should do,
what we know, when the next update comes. Leave out the cause until it is confirmed; a
wrong cause in update one gets quoted for years.

## 1. Acknowledgement

The hardest and the most skipped. Post it before you understand the problem. Its job is
to be first, true and short, so that the half-right theory on X is not the only account.

**SEV-3 / SEV-4**

> **Investigating: {{SYMPTOM}}**
> Some {{ACTION, e.g. "withdrawals"}} are failing or taking longer than usual since
> {{UTC TIME}}. We have no evidence funds are affected and are checking. A failed
> transaction doesn't move your funds, only the network fee. Next update by {{UTC TIME}}.

**SEV-2**

> **{{PRODUCT}} {{ACTION}} paused**
> We paused {{ACTION}} at {{UTC TIME}} while we investigate {{SYMPTOM}}. Deposits already
> in the protocol stay where they are; you can verify the vault at {{EXPLORER_LINK}}.
> Please don't retry repeatedly; failed transactions still cost fees. Next update by
> {{UTC TIME}}.

**SEV-1**

> **Security incident: please don't interact with {{PRODUCT}}**
> We are investigating a security incident affecting {{PRODUCT}} since {{UTC TIME}}.
> Until we post an update here:
> - Don't sign transactions on {{DOMAIN}}.
> - Don't trust anyone offering help in DMs. We will never DM you first.
> - {{ONLY IF VERIFIED: "If you have an open position you can withdraw from {{SAFE PATH}}."}}
>
> Next update by {{UTC TIME}}.

Name the affected pool, vault or component only once it is paused or empty. Naming it
earlier tells copycats which one to hit.

For a compromised frontend or DNS, the first line is "Don't use {{DOMAIN}}" and nothing
else may delay it. Users are signing the attacker's transactions while you draft.

## 2. Progress

Post on the ladder's cadence even when nothing changed. "No change, still investigating,
next update at {{TIME}}" is a valid update; silence is not.

> **Update {{N}}: {{ONE LINE STATE}}**
> What we know: {{CONFIRMED FACTS ONLY}}.
> What we've done: {{ACTIONS, e.g. "paused deposits at 14:12 UTC (tx {{SIG}})"}}.
> What you should do: {{SAME AS BEFORE, OR CHANGED}}.
> Next update by {{UTC TIME}}.

Link transactions for every onchain action you take (pause, upgrade, authority change).
Users will find them anyway; linking them first shows you are not hiding them.

## 3. Resolution

> **Resolved: {{SYMPTOM}}**
> {{ACTION}} works again as of {{UTC TIME}}. {{WHAT CHANGED, e.g. "We deployed a fix
> (tx {{SIG}}, verified build {{COMMIT}})"}}.
> Impact: {{WHO WAS AFFECTED, HOW, AND FOR HOW LONG}}. {{IF ANY USER LOST FUNDS: only
> when they will hear more, in wording counsel has approved}}.
> A postmortem follows {{WHEN}}.

Any update that mentions user losses goes to counsel before it is posted, at any severity:
a SEV-2 broken upgrade that strands funds needs the same review as an exploit.

Do not write "resolved" for a SEV-1 while the root cause is unknown or the attacker still
holds funds. Use "Mitigated" and keep the incident open.

## Words to keep out of every update

- "Funds are safe" before the chain says so (see [severity.md](severity.md)).
- "Hack", "exploit", "attacker" before it is confirmed. Whether to use them publicly once
  it is confirmed is counsel's call; once counsel agrees, do not soften them.
- Blame on a named third party (an RPC provider, an oracle, an auditor) before they have
  confirmed. Link their status page instead.
- Any promise of compensation, reimbursement or token action. That is a decision with legal
  weight; route it through crypto-legal-skill and counsel first.
- "Out of an abundance of caution", "we take security seriously" and similar. They read
  as a lawyer wrote them, which is what the founder asked to avoid.

## Delivery

This skill decides what is said and when. Sending it is a separate job: for email, push
and SMS fan-out by severity see
[trycourier/courier-skills](https://github.com/trycourier/courier-skills/blob/957d83ab0a8d9c5524a565ec789989c02f344593/skills/courier/references/transactional.md)
([#5](https://github.com/solanabr/startup-builder-skill/issues/5)), whose security-alert routing maps onto SEV-1 and SEV-2. It has no
guide for outage updates to end users, so the wording here applies.
