# Hand-off: a known-issue entry for community-moderation

When an incident opens, the support channels fill with the same question.
[community-moderation](https://github.com/soufoka/community-moderation-skill) owns those
channels and tickets, and its triage step says: *"Before opening a ticket, search open
tickets and the known-issues list; if found, link the member to it instead of creating a
duplicate."* An incident should put an entry on that list within the first update, so
the 200th "withdrawals broken?" message gets a link, not a ticket.

## What the pack actually defines (checked at `e10790e`, 2026-10-05)

- The dedupe rule above, in
  [`resources/support-taxonomy.md`](https://github.com/soufoka/community-moderation-skill/blob/e10790ea57cba41626704560a9355b2761d77816/skills/community-moderation/resources/support-taxonomy.md)
  and Pillar 3 of its `SKILL.md`. Matching is the moderator agent's judgement.
- **No known-issues file, schema or field list.** The only structure that touches it is
  `SupportTicket.links: string[]  // related tickets / known-issue refs` in
  [`resources/data-schemas.md`](https://github.com/soufoka/community-moderation-skill/blob/e10790ea57cba41626704560a9355b2761d77816/skills/community-moderation/resources/data-schemas.md).
- Tickets carry one `tag` from its taxonomy and a `priority` from `P1` to `P4`; its classifier
  example routes by keyword lists per tag.

So the entry below is shaped to what a ticket already carries: the same `tag` and
`priority` vocabulary, a one-line `summary` to compare against, keywords like the
classifier's, and an `id` a ticket can put in `links[]`. If the pack later defines its own
known-issue format, that format wins and this file should follow it.

## Where it goes

The `## Known issues` section of `.claude/context/incidents.md`, one entry per incident,
newest first. Point the community-moderation agent at that section as its known-issues
list. Remove nothing; set `status: resolved` instead, so late reports still match and get
the postmortem link.

## Entry format

```markdown
### KI-20261005-1
- id: KI-20261005-1
- incident: INC-20261005-1
- status: open            # open | mitigated | resolved
- tag: transaction-issue  # one tag from community-moderation's support taxonomy
- priority: P1            # P1-P4, mapped from severity below
- summary: Withdrawals from the USDC vault fail with "custom program error 0x1771" since 14:02 UTC
- symptoms: withdraw fails; "0x1771"; withdrawal stuck; can't withdraw USDC
- affected: withdraw instruction, program <PROGRAM_ID>; deposits unaffected
- user_action: Don't retry; failed transactions still cost fees. Funds stay in the vault.
- reply: We know about this and are on it. Live updates: <STATUS_URL>#INC-20261005-1
- link: <STATUS_URL>#INC-20261005-1
- opened: 2026-10-05T14:10Z
- updated: 2026-10-05T14:40Z
```

Fields a matcher compares: `tag`, `summary`, `symptoms` (the words users actually type,
including the error code they paste), and `affected`. Fields a moderator sends: `reply` and
`link`. Update `status`, `user_action`, `reply` and `updated` with every public update, so
support never says something the status page has moved past.

## Severity to tag and priority

| Incident | `tag` | `priority` |
|---|---|---|
| SEV-1 funds at risk | `transaction-issue` (or `wallet-help` for a malicious frontend) | `P1` |
| SEV-2 halted or broken | `transaction-issue` | `P1` if funds are stuck, else `P2` |
| SEV-3 degraded | `transaction-issue`, or `bug-report` for a display-only issue | `P2` |
| SEV-4 upstream | `technical-dev` or `transaction-issue` | `P2` |

The pack defines `P1` as "money/access at risk", which is why a stuck withdrawal is `P1`
even when no funds are lost.

## Moderators during a SEV-1

Recovery scammers arrive with the first public update, posing as support in DMs and
replies. The `reply` field should always carry "we will never DM you first". Moderation of
those accounts follows the pack's own escalation ladder and scam patterns; this skill does
not restate them.
