# Slip, hold and abort

Generic launch playbooks assume the launch happens at the time on the calendar. An onchain
launch happens when a transaction finalizes, and that can be late or never. Decide all of
this before T-24h, while nobody is tired.

## What is irreversible

Sort every step into one of these before launch day. A step in the first table is never
taken to "save time" while a gate is still open.

**Cannot be undone**

| Step | Why it is permanent |
|---|---|
| Publishing a program ID, mint address or pool address | Screenshots and copies outlive a deleted post. Impersonation tokens with your name and ticker can appear soon after a ticker is public, so publish the ticker and the mint address in the same message, after G0, and never one without the other. |
| Creating the mint | Decimals are fixed. Supply minted is onchain. Token-2022 extensions are chosen at creation. |
| Revoking mint or freeze authority, or setting upgrade authority to none | One-way by design. Do it as its own step after launch, not inside the launch transaction batch. |
| Transferring an authority to a mistyped address | `solana program set-upgrade-authority` to a Squads vault needs `--skip-new-upgrade-authority-signer-check`, and `spl-token authorize` doesn't check the new authority either, so nothing catches a typo. Check the address against the vault before sending. |
| `solana program close` | It returns the rent, and the program ID can never be deployed to again. |
| Adding the first liquidity | The initial price is set in that transaction and is tradable immediately. Pulling liquidity later reads as a rug whatever the reason. |
| Opening an airdrop claim | Claims finalize as they happen. |
| Publishing the audit report | It names the commit and the findings. |
| An X post, an `@everyone` Discord ping, a Telegram broadcast, a Product Hunt launch | Notifications are delivered before you can delete. A deleted announcement gets screenshotted as "they deleted it". |

**Can be undone**

| Step | How |
|---|---|
| Docs flip, frontend env flip | Revert the deploy. Keep the previous build one command away. |
| Program upgrade (while the authority exists) | Redeploy the previous verified build through the multisig. This is itself a public event users will see in the explorer. |
| A partner's draft | It is still a draft until they post. Holding it costs nothing. |
| A scheduled post | Unschedule it. This is why nothing public is scheduled to a clock time: scheduled posts are where slips leak. |

## Key holders

Fill one row per thing that can post or sign. Two names per row, and both reachable during
the window. A launch stalls when the only person with the X password is asleep.

| Asset | Primary | Backup | How they confirm they are online |
|---|---|---|---|
| Deployer key / buffer authority | | | |
| Multisig signers (count vs threshold; threshold online until G1) | | | |
| Mint / freeze authority | | | |
| Frontend and docs deploy | | | |
| DNS and status page host | | | |
| X account | | | |
| Discord admin | | | |
| Telegram admin | | | |
| Product Hunt maker | | | |
| Partner channel (who sends "go") | | | |

## Slip handling

A slip is a G0 that has not passed at the planned time. Because every public step is on the
L+ clock, a slip needs only three moves:

1. **Hold.** Send partners the pre-written hold message (see [artifacts.md](artifacts.md)).
   They should hear "hold" from you before they ask. Do not explain the cause in the hold
   message; you may not know it yet.
2. **Decide the new window, or abort.** Use the criteria below. Do not let a slip run on
   with no decision: after the second missed retry, decide.
3. **If anything public named a time, post the slip message.** If nothing public named a
   time, post nothing. Users who were not told a time cannot be let down by it, which is
   the argument for announcing a day and "we'll post the address here" instead of a time.

Common slip causes, and the honest message for each:

| Cause | What to say |
|---|---|
| Deploy keeps failing to land (congestion, priority fee too low, buffer write errors) | "Mainnet deployment is taking longer than planned. Nothing is live yet. We'll post the program address here when it is." |
| Multisig short of signatures | Same message. Never "technical difficulties" if it is a people problem you can name to partners. |
| Late audit finding | "We're holding launch to fix an issue found in final review." Then route to the auditor before saying more. |
| Network-wide degradation | Point at [status.solana.com](https://status.solana.com). |

## Abort criteria

Abort means the launch does not happen today; it is rescheduled from scratch. Write the
criteria into the runbook so nobody argues them live. Any one of these aborts:

- The onchain hash does not match the verifiable build of the release commit.
- G2 fails: the production frontend cannot complete the core action against mainnet.
- An audit or review finding of the severity your auditor calls blocking is open.
- Legal gate L1 or L2 is not recorded as passed.
- The multisig cannot reach threshold within the window you set at go/no-go.
- The window you set at go/no-go has passed without G0.
- A partner or aggregator dependency the launch claims ("trade it on X") is not live, and
  the copy cannot be changed and re-approved within the window.

After an abort: send partners the abort message, post the public slip message if a time
was public, record the cause in the runbook log, and re-enter the gate list at T-24h. If
the abort follows an onchain step that did land (the mint exists, the pool does not), the
partial state is public. Treat it as an incident and use
[incident-comms](../../incident-comms/SKILL.md).
