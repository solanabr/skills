# Diligence in both directions

## Inbound: should we depend on them?

Use [solsentry/solana-counterparty-gate](https://github.com/solsentry/solana-counterparty-gate/blob/86fc51eb9ef9efbe23d0d864bddec9cbafd843e0/skill/SKILL.md)
before you CPI into, compose with or route through someone else's program, oracle, keeper
or multisig. It resolves the program to its upgrade authority and scores that operator's
history. This skill does not restate it.

Two things it does not cover, so check them yourself: multisig thresholds and signers
(it treats a multisig address as an input only), and what happens to you if the partner
pauses or upgrades.

## Outbound: what are we asking them to take on?

The integrator's security team will ask these, and the answers decide whether a partner
can say yes. Have them written before the first call, in the partner's terms: what could
your program do to *their* users.

| Question | What to have ready |
|---|---|
| Who can upgrade the program? | Upgrade authority address, multisig threshold and signers, timelock if any; or "immutable since slot N". |
| What admin powers exist? | Every privileged instruction: pause, parameter changes, fee changes, withdrawal of protocol funds, authority transfer. Who holds each. |
| Can you freeze or pause their users? | Pause scope (all instructions or some), who can trigger it, how users get out while paused. |
| Token authorities | Mint and freeze authority (or revoked), Token-2022 extensions such as permanent delegate or transfer hooks that act on holders. |
| Oracle and external dependencies | Which oracles, staleness and confidence checks, what happens when the oracle fails. Any off-chain keeper your program needs to stay healthy. |
| Upgrade notice | How long before an upgrade they will hear about it, and where. Whether account layouts or the IDL can change under them. |
| Support load | Who answers when their user's transaction into your program fails. A shared channel, an escalation contact, incident updates (see [incident-comms](../../incident-comms/SKILL.md)). |
| Proof | Verified build, audit report naming the deployed commit, `security.txt` (see [readiness.md](readiness.md)). |

If an answer would worry you as the integrator, fix it before the ask. Transferring the
upgrade authority to a multisig, adding a timelock or narrowing a pause is cheaper than a
lost partner, and it is engineering work for ai-kit.
