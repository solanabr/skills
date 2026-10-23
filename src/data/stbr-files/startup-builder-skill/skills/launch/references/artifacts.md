# Pre-staged artifacts

<!-- Copy rules below adapted from sendaifun/solana-new@e81c261645035c0e902eaaa518ff58722d188bb7, skills/launch/tone-guide.md lines 31-68 (MIT, (c) 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md). The lowercase house style is dropped. -->

Everything here is written, reviewed and approved before T-24h, then staged unposted. On
launch day the only edit allowed is filling the placeholders that exist only after G0.
Copy that names a token, a yield, a geography or a legal property is checked by counsel at
gate L2 (crypto-legal-skill), not edited on the day.

## The set

| Artifact | Format | Where it goes | Posted at |
|---|---|---|---|
| Announcement thread | text, 4-7 posts | X | L+30m |
| Long-form post | HTML page, from [launch-post.html](launch-post.html) | blog or docs site | L+30m, linked from the thread |
| Docs changelog entry | HTML or the docs site's own format | docs | L+20m, before the thread links to it |
| Address page | HTML section | docs | L+20m. The single source of truth for every mainnet address; every other artifact links here |
| Pinned message | text | Discord announcements, Telegram | L+35m |
| Partner kit | text: their post, your quote, the links | partner channel | sent T-24h, released at L+30m |
| Hold message (partners) | text | partner channel | on slip |
| Slip message (public) | text | X, Discord, Telegram | on slip, only if a time was public |
| Abort message (partners and public) | text | all of the above | on abort |
| Status page | HTML, from [incident-comms](../../incident-comms/references/status-page.html) | separate host | live by L+20m |

Draft the announcement thread and the long-form post with
[writer-style-skill](https://github.com/solanabr/writer-style-skill/blob/77372715fb5596cd29cc9fbbcaeb859cc9335b39/skills/writer-style/SKILL.md) for voice
and [content-gen-skill](https://github.com/solanabr/content-gen-skill/blob/ce49a7e82b7120dd49be22c015648f9deeb3b86e/skills/content-gen/SKILL.md) for the
long-form piece, if present. If `.claude/context/positioning.md` exists, take the one-liner
and the words to avoid from it rather than re-deriving them.

## Placeholders

Only these may be filled on the day. Anything else changing means the copy goes back
through review.

- `{{PROGRAM_ID}}`, `{{MINT}}`, `{{POOL}}`: from the runbook after G0
- `{{EXPLORER_URL_PROGRAM}}`, `{{EXPLORER_URL_MINT}}`, `{{EXPLORER_URL_AUTHORITY}}`: the explorer page for the program, the mint and the upgrade-authority vault
- `{{FIRST_TX}}`: the G2 signature, if you show it
- `{{ADDRESS_PAGE}}`: the docs URL for the address page

## Copy rules for launch artifacts

- Say what it does, not what it is. "Finds the best swap price across Solana DEXes" beats
  "a decentralized liquidity protocol".
- Numbers over adjectives, and only numbers you can link: "$0 to deploy", "settles in one
  slot", not "massive", "significant", "growing fast".
- Name real protocols you integrate with. Not "decentralized infrastructure".
- Reference what is live at G0, never what is planned. The launch post is not a roadmap.
- An "X for Y" anchor in the first line saves three paragraphs, if the audience already
  respects X.
- Crypto jargon is fine for a builder audience (TVL, LP, CLOB, MEV). Generic filler is not:
  "rapidly evolving landscape", "at the forefront", "cutting-edge".
- No hedging ("perhaps", "it seems"), no passive voice, no "furthermore".

Per format:

- **Thread**: the first post carries the claim, the mint or program address, and the
  address page link. Short paragraphs. One call to action. Three hashtags at most, or none.
- **Long-form post**: the addresses and the audit link above the fold. What works today,
  then how to try it, then what is next in one paragraph.
- **Video or image overlays**: eight words at most, and metrics as the hook.
- **Pinned message**: the address, the address page, "we will never DM you first", and
  where support lives.

## Message templates

**Hold, to partners (on slip).** Send from the person partners know, in the shared channel.

> Hold please. Our mainnet step hasn't landed yet, so nothing is live. Don't post until you
> get "go" from me here. Your copy and links are unchanged. Next update from me within
> {{N}} minutes.

**Slip, public (only if a time was public).**

> Mainnet launch is running late. Nothing is live yet. Any token or link claiming to be
> {{NAME}} before we post the address here is not us. We'll post the address in this
> thread when it's live.

**Abort, public.**

> We're not launching today. {{ONE TRUE SENTENCE OF CAUSE, OR "We found something in final
> checks we want to fix first."}} Nothing is live and no funds were involved. New date
> when we have one, here first.

If any onchain step did land before the abort, "nothing is live" is false. Say exactly
what exists, link it, and say whether users should interact with it.

**Go, to partners.**

> Live: {{ADDRESS_PAGE}}. Our post: {{THREAD_URL}}. Go ahead, thank you.
