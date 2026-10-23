# ICP on Solana: what generic positioning gets wrong

## The customer is often another team

For infrastructure, SDKs, oracles, payments rails and most DeFi primitives, the ICP is the
**team that integrates you**: a protocol, a wallet, an aggregator, another founder. Their end
users are your users' users.

- Write the ICP as a team profile: what they ship, their stack (Anchor or native, `@solana/kit`
  or web3.js 1.x), and what they need to see before integrating. That is usually a published IDL,
  a verified build, an audit and a client library, not a pitch.
- Proof points for this ICP are integration facts: time to first call, the CPI interface, who
  holds upgrade authority, and named integrators.
- If the product has both (an end-user app plus an SDK), pick the primary ICP. Two ICPs in one
  one-liner reads as neither.

## "Users" are wallets; the decider may not be a person

- A wallet is not a user. One person runs several; one bot runs thousands. ICP size and
  traction are stated in humans or teams, with the wallet count as evidence (see
  [build-status traction checks](../../build-status/references/traction-sources.md)).
- The buyer can be a **DAO** (a governance proposal, a forum thread, a vote: weeks, public, and
  your competitors read it), a **foundation or ecosystem fund** (a grant with milestones), or a
  **protocol treasury**. Write down how they decide: who proposes, who votes, and what artifact
  they need, such as a forum post, a milestone budget or an audit link.
- The payer may not be the user either. A relayer, a sponsor or the integrator can pay fees for
  the end user. Name who pays.

## Trust properties are risk reduction, not features

"Non-custodial, verifiable build, no admin key" reads as a feature list. Position each one as
the risk it removes for this ICP, and attach the onchain proof:

| Property | Risk it removes | Proof |
|----------|-----------------|-------|
| Non-custodial | We can't lose or freeze your funds, as far as the upgrade authority allows | Program logic and the account model, audited, plus the upgrade-authority row below: whoever holds that authority can change the program |
| Verified build | The deployed code is the code you reviewed | Verifier status for the program ID, with the commit |
| Upgrade authority in a multisig, or none | One stolen key can't change the rules | `solana program show` for the authority address; the Squads multisig account for the threshold |
| No pause or freeze authority | We can't block your exit | All of: the mint's freeze authority is none; no Token-2022 PermanentDelegate or Pausable extension on the mint, or its authority set to none; no admin pause or freeze instruction in the program |

Claim only what is true today, and only when every condition in the proof column holds. If
`build.md` shows a single-key upgrade authority, don't position on immutability or claim
non-custody without that caveat; say what the plan is and when.

## Disqualifiers worth writing down

Crypto products attract people they are not for. Name them so the copy doesn't court them:

- Airdrop and points farmers, if the product isn't a farming product. They inflate the numbers
  and churn.
- Retail users, when the ICP is integrators. A consumer-friendly one-liner pulls the wrong inbound.
- Jurisdictions or user types you can't serve. The *why* is a legal question for
  [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill); the disqualifier
  just records the outcome.
