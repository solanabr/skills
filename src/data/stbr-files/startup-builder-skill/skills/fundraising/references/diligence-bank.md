<!-- Sections D and E are adapted from sendaifun/solana-new@e81c261, skills/build/roast-my-product/references/common-crypto-product-sins.md (sins 7 "Phantom Users" and 10 "Grant-Dependent"); section F reframes the "Red Flags That Kill Credibility" table in skills/build/launch-token/references/tokenomics-checklist.md as questions (MIT © 2026 SendAI and Superteam). Rewritten; notice in THIRD_PARTY_NOTICES.md. -->

# Diligence question bank

A crypto-literate investor opens with these questions. They can verify most of the answers on chain before the call, so an answer that differs from the chain ends the conversation.

**Honest answer format**, recorded in `data-room.md`:

- **Fact:** one sentence.
- **Proof:** an address, transaction, report or query link.
- **Risk left:** what can still go wrong.
- **Mitigation:** what you are doing about it, and by when.

If the fact is bad, lead with it.

## A. Control

| Question | The honest answer must cover |
|---|---|
| Who can upgrade the program? | The holder type (single key, multisig, governance or revoked), the threshold, any timelock, and the plan and date to tighten or revoke it. "Multisig" with 2-of-3 signers who are all founders is a single point of control, so say so. |
| What can each admin key do? | Every privileged instruction: pause, set fee, change oracle, withdraw, migrate. List them, and say which ones could move user funds. |
| Who can pause, and has it been used? | The conditions, the signer, the history, and how users exit while paused |
| Is mint or freeze authority live? | Revoked, or kept and why. The same for Token-2022 extension authorities: a permanent delegate can move any holder's tokens. |
| How are keys held? | Hardware keys, devices that are independent and in separate places, rotation, and what happens if one signer disappears |

## B. Custody

| Question | The honest answer must cover |
|---|---|
| Do you ever hold user funds? | Where, under which authority, and for how long |
| "Non-custodial": is it, really? | It is non-custodial in normal operation only if no live authority can move user assets. While the upgrade authority is live, an upgrade could change that, so state it. |
| What happens to user funds if the team disappears? | The exit path without you: can users withdraw directly through the program, without the frontend? |

## C. Dependencies

| Question | The honest answer must cover |
|---|---|
| Which oracle, and what if it is stale or manipulated? | The feed, the staleness and confidence checks in the program, and the fallback behaviour |
| What if your main integration partner drops you? | Their share of your volume, the switching cost, and the contract or incentive that holds them. [counterparty-gate](https://github.com/solsentry/solana-counterparty-gate) helps vet the partners you depend on. |
| RPC or indexer outage? | Your failover, and what users see during one |

## D. Are the users real? ("Phantom Users")

The trap: "10,000 wallets connected" that turn out to be 50 people, with metrics inflated by airdrop farming, bots or sybil wallets. The investor will compare unique wallets with daily active transactors, check whether a few wallets do most of the activity, and look for a drop of most of the activity after an airdrop or the end of incentives.

| Question | The honest answer must cover |
|---|---|
| How many of your wallets are people? | `build.md`'s Active user wallets and the sybil-adjusted figure, with the filter written down (see the data-room metrics) |
| What share of activity comes from your top 10 wallets? | The concentration figure, and who those wallets are, if known (a market maker, your own keeper) |
| What happened when incentives stopped? | The before and after series. If you haven't stopped them yet, say what you expect and why. |
| How much volume is incentivised? | Organic and incentivised figures, separately |

"500 daily active users who each make 3+ transactions" survives diligence. "50k wallets" does not.

## E. Would it survive without grants? ("Grant-Dependent")

The trap: a product that exists only because of ecosystem grants, with no path to sustainability.

| Question | The honest answer must cover |
|---|---|
| Remove the grants: does the team keep working on this? | A direct yes or no, and the reason |
| What share of income is grants? | The grant-share metric, trailing 6 months |
| What is the revenue path, and by when? | The model and number from `pricing.md` if present, the floor margin, and the date grants stop being needed |
| Are any grant milestones open or at risk? | Each milestone's status, and any clawback terms |

## F. Token (if one exists)

The red flags that end a conversation, asked as questions:

| Question | The honest answer must cover |
|---|---|
| Is the liquidity locked? | The LP position's address and lock or burn status. If it isn't locked, say who can pull it and why. |
| Is mint authority revoked? | Yes, with proof, or why it is kept and under what control |
| Is the treasury a single wallet? | The multisig address and threshold. One key means one compromise loses everything. |
| Is team vesting on chain? | The vesting contract address, the cliff and the schedule. Vesting that is only on paper is unverifiable. |
| How large is the team allocation, and why? | The figure, and the reasoning that justifies it |
| Are all allocation addresses published? | Every allocation mapped to an address. Unaccounted supply destroys trust. |
| Where is the tokenomics written down? | A link to a document with the same numbers as the chain |
| How do the token and the equity relate? | See [token-vs-equity.md](token-vs-equity.md). Give the framing and route the legal half. |

Supply and allocation design belongs to tokenomics (ai-kit's `token-engineer`). Whether any of it is lawful is [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill)'s question: its tokenomics-legality decision tree and `/airdrop-assessment`.

## G. Security

| Question | The honest answer must cover |
|---|---|
| Was the deployed code audited? | The audited commit against the deployed, verifiable build. Findings by severity, and which are still open. |
| What changed since the audit? | The diff, and whether that diff was reviewed (ai-kit's `/diff-review`, or [auditor-skill](https://github.com/solanabr/auditor-skill)'s `/diff-audit`) |
| Any incidents? | Each incident's date, impact, what users lost, and the postmortem link. Never say "none" if the chain shows otherwise. |

## H. Regulatory readiness

Don't answer these from this skill. The honest answer is the status of the question:

> "We ran <question> through crypto-legal-skill on <date>. Counsel is <engaged / not yet engaged>. Here is the open-items list."

Classification of a live token is a hard stop to counsel in crypto-legal-skill itself. Don't self-classify in a diligence call.

## I. Market

Answer from `.claude/context/market.md` ([format](../../market-sizing/references/market-md-format.md)) if it exists, so the data room quotes the same number as the deck's market slide.

| Question | The honest answer must cover |
|---|---|
| How did you size the market? | The bottom-up number in `market.md`'s Market slide section: accounts × units per account per year × price, each factor with its source line, and the top-down check (the firm, or "no top-down for this cut"). TVL, volume or market cap is not an answer: none of them is anyone's yearly spend. |
| Why this entry market, and who buys first? | The wedge from `idea.md`, its rank and card in `market.md`'s Wedges section (the evidence: an incident, a rule, money spent), the named buyer and how they decide. Say which scores are desk scores and which buyers you have spoken to. |
