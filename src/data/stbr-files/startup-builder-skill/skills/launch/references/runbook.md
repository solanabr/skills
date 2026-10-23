# Runbook: gates and schedule

The format of `.claude/context/launch.md`, which `launch` writes and other skills read if
present. One file per launch; archive the old one under `.claude/context/launches/` when
the next launch starts.

## Two clocks

A launch runs on two clocks, and mixing them up is what turns a slip into an incident.

- **Countdown (T-)** runs to the *planned* time of the onchain event. Everything on it can
  happen without the event landing: preparation, sign-offs, heads-ups, drafts.
- **Landed (L+)** starts when gate **G0** passes: the event's transaction is finalized and
  checked. Everything public runs on this clock. If the event slips two hours, the L+
  schedule moves two hours with it and nothing on it has to be rewritten.

No public step carries a wall-clock time. Partners get "after our post", never "at 14:00".

## What "landed" means per event

G0 checks state, not a wallet's success toast. Use `finalized` commitment, check from a
second machine or RPC provider, and record the signature in the runbook.

| Event | G0 passes when | Check with |
|---|---|---|
| Program deploy | ProgramData exists, upgrade authority is the planned one (multisig vault, not the deployer's hot key), onchain hash equals the release's verifiable-build hash | `solana program show <ID> -u mainnet-beta`, `solana-verify get-program-hash -um <ID>`; mechanics in ai-kit [`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md) |
| Program upgrade | Same as deploy, plus the IDL is upgraded and the previous client version either still works or is blocked with a message | `anchor idl fetch <ID>` against the release IDL; ai-kit [`deployment.md`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/skills/deployment.md) |
| Token mint / TGE | Mint exists with the planned supply, decimals, mint and freeze authorities (or none), extensions and metadata | `spl-token display <MINT> -um` |
| Liquidity add | Pool account exists at the intended initial price, LP position is held by the planned owner, a test swap fills | the DEX's own UI and explorer; a small swap from a non-team wallet |
| Audit release | Auditor has issued the final report, and the commit hash it names matches the deployed hash | the report's scope section against `solana-verify get-program-hash` |
| Airdrop / claim open | Claim program or distributor is funded and a claim from an eligible non-team wallet succeeds | explorer, finalized |

## Gate list

Each gate has a condition that is either true or false. "Looks fine" is not a condition.
Copy the rows that apply into the runbook, fill owner and check, and delete the rest.

| When | Gate | Passes when | Owner |
|---|---|---|---|
| T-30d | **Legal L1** | crypto-legal-skill [`/launch-checklist`](#legal-gates) has run for this launch, every item in its `T-90 to T-60` and `T-60 to T-30` buckets is closed or marked not applicable by counsel, and counsel's sign-off is recorded in this runbook with a name and date. Do not pass on "in progress". | founder |
| T-30d | Event defined | One event type from the table above; addresses that can be derived ahead (program ID from its keypair, a vanity mint) are recorded privately, not published | eng lead |
| T-14d | Readiness | Verifiable build reproduces from the release commit; IDL publishes; audit fixes merged; the full sequence has run end to end on devnet with the production scripts | eng lead |
| T-14d | Listings planned | Each surface the launch depends on (aggregator, wallet display, explorer, DefiLlama) has its requirement mapped and its earliest possible date known. Most need the onchain object to exist first, so plan the L+ window, not a T- one. See [ecosystem-bd's surface map](../../ecosystem-bd/references/surfaces.md) | BD |
| T-7d | **Legal L2** | The `T-30 to T-7` bucket is closed, including FP-10 (pre-launch communications reviewed by counsel for insider-trading and market-abuse implications). Counsel has seen the final announcement copy, any token wording and the geo restrictions. Recorded as for L1. LR-2 and LR-6 (final counsel sign-off, final go/no-go) are then due before T-0 and are checked again at go/no-go. | founder |
| T-7d | Audit publishable | Auditor has agreed the publication date and the report version; the report names the commit you will deploy | eng lead |
| T-7d | Partners briefed | Each amplifier knows the day and the event, and has agreed in principle. No copy yet. | BD |
| T-24h | Copy frozen | Every artifact in [artifacts.md](artifacts.md) is drafted, reviewed and staged unposted, including the slip and abort messages | comms |
| T-24h | Partners armed | Partners have the exact copy, the links that will exist after G0 marked as placeholders, and the rule "post after our post, not at a time" | BD |
| T-24h | Keys mapped | The key-holder table in [slip-and-abort.md](slip-and-abort.md) is complete, with a backup for every row | founder |
| T-24h | Verify PDA staged | Program deploy or upgrade with a multisig authority: `solana-verify export-pda-tx <REPO_URL> --program-id <ID> --uploader <VAULT> --encoding base58` for the release commit is imported as a Squads proposal, awaiting signatures. The vault can't sign `verify-from-repo`'s upload, so G1 runs through this proposal ([multisig verification](https://solana.com/docs/programs/verified-builds#how-to-verify-your-program-when-its-controlled-by-a-multisig-like-squads)) | eng lead |
| T-2h | Go / no-go | Deployer funded (a program deploy needs about twice the `.so` rent until the buffer closes); multisig signers reachable, enough of them for the threshold, and that many staying online until G1 passes; RPC and priority fees normal on [status.solana.com](https://status.solana.com); no open abort criterion; `/launch-checklist` LR-2 and LR-6 recorded as signed | eng lead |
| T-0 | Execute | The event's transaction is sent. Nothing public happens. | eng lead |
| L+0 | **G0 landed** | The row for this event in the table above is true at `finalized` | eng lead |
| L+10m | G1 verified | Verification submitted, IDL published, explorer decodes an instruction. Multisig authority: confirm the hash with `solana-verify verify-from-repo -um` and decline its upload prompt, the signers execute the staged verify-PDA proposal, then `solana-verify remote submit-job --program-id <ID> --uploader <VAULT>`. Single-key authority: `verify-from-repo` uploads the PDA, then `remote submit-job`. The old `--remote` flag is deprecated. The verified badge can trail; the hash match cannot. | eng lead |
| L+15m | G2 first tx | A wallet that is not the deployer completes the core action through the **production** frontend, finalized. This proves the frontend flipped to mainnet addresses and the client matches the program. | eng lead |
| L+20m | Docs flipped | Docs, frontend env, and the address page show the mainnet program ID and mint; the status page exists | eng lead |
| L+30m | Public | Channel order in [channels.md](channels.md) starts | comms |
| L+24h | Settled | Listings submitted that needed the object to exist; first-day issues triaged; the runbook records what slipped and why | founder |

## Legal gates

[solanabr/crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) ships
[`/launch-checklist`](https://github.com/solanabr/crypto-legal-skill/blob/0f0de7ccbf39213c20bc34fa76791628ad43b838/commands/launch-checklist.md)
(`/crypto-legal:launch-checklist` once its `install.sh` has run): a regulatory calendar in
buckets `T-90 to T-60`, `T-60 to T-30`, `T-30 to T-7`, `T-7 to T-0` and `T+0 to T+30`, with
statutory cites per item. It does not sequence a launch day and this skill does not restate
it.

L1 and L2 are hard gates. That skill returns its checklist inline and writes no file, so
counsel's sign-off exists nowhere unless this runbook records it: who signed, on what
date, for which bucket. If a legal question comes up mid-launch (a geography, a token
claim, a regulator's message), stop and route it to that skill. Its `/triage` treats formal
regulator contact as a hard stop that goes to counsel. This skill does not answer legal
questions.

## Runbook file layout

```markdown
# Launch: <name>, <event type>
Planned T-0: <date, UTC>          Status: planning | armed | executing | landed | slipped | aborted
Program ID / mint: <recorded privately until G0>
Signature (G0): <tx signature, finalized>

## Gates
| When | Gate | Passes when | Check | Owner | Passed (UTC) |

## Key holders
(see slip-and-abort.md)

## Artifacts
| Artifact | File | Status: draft / staged / posted / held |

## Log
- <UTC> <what happened>
```
