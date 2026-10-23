---
name: incident-comms
description: Tell users about a Solana product incident (failing txs, paused program, broken upgrade, exploit) with a severity ladder tied to onchain state, pre-written updates, an HTML status page and a user-facing postmortem. Use for "incident", "outage", "status page", "exploit comms" or "postmortem".
user-invocable: true
---

# Incident comms

The stack can detect an incident and diagnose it. This skill decides what users are told,
where, and by when. It is deliberately thin on top of three packs, and links them instead of
restating them:

| Job | Owner |
|---|---|
| Detection, triage, technical report | [auditor-skill](https://github.com/solanabr/auditor-skill/blob/c6a4a17297f8994dfb1bb9f2e9e0d19acaab421a/checklists/17-logging-monitoring-incident-response.md), ai-kit [`/audit-infra`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/audit-infra.md) and [`/debug-user-tx`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/debug-user-tx.md) |
| Disclosure law, regulators, counsel | [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) |
| Community channels and tickets | [community-moderation](https://github.com/soufoka/community-moderation-skill) |
| Sending email, push and SMS | [courier-skills](https://github.com/trycourier/courier-skills) (the delivery half; see [#5](https://github.com/solanabr/startup-builder-skill/issues/5)) |
| What is said, where, by when | this skill |

## Context handoff

At start, read `.claude/context/incidents.md` if present: it holds this team's ladder,
roles, approved templates and open incidents. Read `.claude/context/launch.md` if present;
an incident during a launch's L+ window also changes that runbook. Take product name and
the words to avoid from `.claude/context/positioning.md` if present.

Writes `.claude/context/incidents.md` in the format at the end of
[severity.md](references/severity.md), including the `## Known issues` section.

## Mode 1: prepare (peacetime; do this first)

1. Fill the ladder and roles in [severity.md](references/severity.md) with this team's
   channels, deadlines and two names per role.
2. Adapt the templates in [updates.md](references/updates.md) to the product: real
   action names, the vault and program accounts users can check, the support link. Get the
   SEV-1 versions, and any wording about user losses, approved once by counsel, and record
   who approved them and when.
3. Build the status page from [status-page.html](references/status-page.html) and deploy it
   on a host and domain that do not fail with the app. Confirm someone other than the app's
   CI can update it.
4. List the integrators who route users to you (aggregators, wallets, partners) with a
   direct contact for each. In a SEV-1 they are the fastest way to stop new users arriving.
5. Write `.claude/context/incidents.md`.

## Mode 2: during an incident

1. **Set severity** from onchain reality using the ladder. Ask: can a user lose funds, act
   on their funds, or only see the wrong thing? Open `INC-<YYYYMMDD>-<n>` in the log.
2. **Acknowledge before you understand.** Post update 1 from
   [updates.md](references/updates.md) to the status page, then link it in each channel the
   ladder names, within the first-update deadline. For a malicious frontend or DNS, the
   first line is "don't use {{DOMAIN}}", and nothing delays it.
3. **Write the known-issue entry** in the same minute, per
   [known-issue.md](references/known-issue.md), so community-moderation's dedupe step links
   members to the status page instead of opening duplicate tickets.
4. **SEV-1: switch to the [exploit track](references/exploit-track.md).** The warning goes
   out now; amounts, cause, compensation, messages to the attacker and any contact with
   regulators, law enforcement or issuers wait for counsel via crypto-legal-skill. Do not
   draft those here, and do not guess at them.
5. **Progress updates on the ladder's cadence**, even when nothing changed. Re-grade
   severity on evidence, in either direction, and say so in the next update.
6. **Resolve** with update 3. A SEV-1 stays "Mitigated" while the cause is unknown or funds
   are still held by an attacker.

## Mode 3: after

- Write the user-facing account from [postmortem.html](references/postmortem.html): what
  users lost, what is being done about it, what changes. It links the auditor's technical
  report and does not replace it. For a SEV-1, or any postmortem that mentions user losses,
  counsel sees it before it is published.
- Add the postmortem link to the status page entry and the known-issue entry, and set both
  to resolved.
- If preparation failed (a late first update, an unreachable signer, a status page that went
  down with the app), fix the plan in `incidents.md` now.

## Rules

- "Funds are safe" is a statement about chain state. Say it only after the accounts have
  been checked onchain.
- Every onchain action you take (pause, upgrade, authority change) is announced with its
  transaction link, before someone else finds it.
- Legal, regulatory and compensation questions go to crypto-legal-skill. Say so and stop.
