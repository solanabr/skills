# Severity ladder

Severity is set by what is true onchain and what users can lose, not by how loud the
Discord is. The chain is public: users, bots and researchers can often see a broken state
before you describe it, so the ladder is built around "what can a user see, and what can a
user lose".

The deadlines below are this skill's defaults, not an industry standard. Change them in
`.claude/context/incidents.md` and keep them short enough that the first update goes out
before the theories do.

## The ladder

| Sev | Onchain reality | Examples | First update | Then every | Channels |
|---|---|---|---|---|---|
| **SEV-1** Funds at risk | Value can leave user or protocol accounts that should not, or users are being asked to sign transactions that harm them | Exploit in progress or suspected; unexpected upgrade or authority change; vault balance diverging from accounting; oracle failure causing bad liquidations; frontend, DNS or npm package compromised and serving malicious transactions | 15 min | 30 min | All: status page, X, Discord, Telegram, in-app banner if the app is up, email; integrators and partners directly. Goes to the [exploit track](exploit-track.md). |
| **SEV-2** Halted or broken | Funds are where they should be but users cannot act on them, or a deployed change broke clients | Program paused by you; an upgrade changed an account layout or IDL and old clients fail; a core instruction fails for everyone; a stuck withdrawal queue | 30 min | 1 h | Status page, X, Discord, Telegram, in-app banner; integrators whose users route through you |
| **SEV-3** Degraded | The program is fine; transactions fail or land slowly for some users, or the UI shows wrong numbers | Priority fees too low for current demand, blockhash expiry, compute limit hits, stale oracle causing reverts; indexer or API lag showing wrong balances | 1 h | 2 h or on change | Status page, Discord, Telegram; X only if it is visible at scale |
| **SEV-4** Upstream | Not your code, but your users feel it | RPC provider outage; Solana cluster degradation; a wallet release bug; an aggregator routing issue | 1 h, if users are affected | on change | Status page with a link to the upstream status page, Discord |

## Rules that hold at every level

- **"Funds are safe" is a claim about chain state.** Say it only after someone has checked
  the vault and authority accounts onchain and the numbers reconcile. Until then: "We have
  no evidence funds are affected, and we are checking." A retracted "funds are safe" is the
  most damaging sentence in crypto incident comms.
- **Escalate on evidence, downgrade on evidence.** A SEV-3 becomes SEV-1 the moment a
  balance moves that should not. Do not wait for the next scheduled update to say so.
- **Display-only incidents say so.** If the chain is right and the UI is wrong, the first
  sentence is "Your balance onchain is unaffected; our display is wrong", with an explorer
  link users can check themselves.
- **Upstream incidents point upstream.** Link [status.solana.com](https://status.solana.com)
  or the provider's page instead of paraphrasing it.
- **Everything public goes on the status page first**, then gets linked. One source of truth,
  same reason as a launch.

## Who decides

Fill this in `.claude/context/incidents.md` before you need it.

| Role | Does | Primary | Backup |
|---|---|---|---|
| Incident lead | Sets severity, owns the clock | | |
| Comms | Writes and posts every update | | |
| Engineering | Diagnoses; feeds facts to comms; never posts | | |
| Signers | Pause, upgrade, authority actions through the multisig | | |
| Counsel contact | Reached on every SEV-1, via crypto-legal-skill's routing | | |

Detection, triage and remediation are not this skill's job. They live in
[auditor-skill](https://github.com/solanabr/auditor-skill/blob/c6a4a17297f8994dfb1bb9f2e9e0d19acaab421a/checklists/17-logging-monitoring-incident-response.md)
(incident response, LM-041 to LM-052) and ai-kit's
[`/debug-user-tx`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/debug-user-tx.md).
This skill turns what they find into words users can act on.

## `.claude/context/incidents.md`

The committed artifact this skill writes: the plan in peacetime, the log during an
incident.

```markdown
# Incident plan: <product>
Status page: <url>   Host: <where it is deployed, and that it is not the app's host>
Program IDs / mints: <list, with explorer links>

## Ladder
(the table above, with this team's deadlines and channels)

## Roles
(the table above, filled)

## Pre-approved templates
- acknowledgement, progress, resolution: <paths>, approved by <counsel / founder> on <date>

## Incidents
### <INC-YYYYMMDD-n> <one-line summary>
Sev: <1-4>   Opened: <UTC>   Resolved: <UTC>   Known-issue id: <id>
- <UTC> <update posted, where, link>
Postmortem: <url or "not yet">

## Known issues
(one entry per incident, in the format in known-issue.md)
```
