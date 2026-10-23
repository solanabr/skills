# startup-builder-skill

Agent skills for the non-program half of shipping a product on Solana — the things a small
team hits *around* the code.

## Charter

The all-in-one support skill pack for startups building on Solana. Program work — Anchor
patterns, CU optimisation, account layout — is covered well by
[solanabr/ai-kit](https://github.com/solanabr/ai-kit) and the packs it pins. This repo owns
the startup-operations layer: positioning and pricing, launch, fundraising, go-to-market and
growth, support and operations, and compliance-adjacent operations (pointing at
[solanabr/crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill) for the legal
lane rather than restating it).

Full charter, the gap analysis behind it, and the design constraints: [issue #1](https://github.com/solanabr/startup-builder-skill/issues/1).

Two constraints from that charter shape everything here:

- **Skills stay off the always-on path.** A top-level skill's `description` is listed in
  every session *and every subagent*, so fan-outs of 100+ subagents multiply that cost. These
  load on demand, with detail behind links in `references/`.
- **One `SKILL.md` per skill directory**, routing-only descriptions, progressive disclosure.

## The skills

| Skill | Use it when |
|-------|-------------|
| [idea-sprint](skills/idea-sprint/SKILL.md) | Deciding *what* to build, or stress-testing an idea before any code. Interview → crypto-necessity gate → three candidates → score /15 → go/no-go. Output is a decision, not a brainstorm. |
| [pitch-deck](skills/pitch-deck/SKILL.md) | You need slides — demo day, a VC meeting, a grant application, an accelerator form, a hackathon final. Detects the audience, checks the title spine ("but" or "therefore" between slides, a bridge from wedge to vision), writes speaking notes, then drills the hostile questions. |
| [pitch-review](skills/pitch-review/SKILL.md) | The deck, script or pitch video is about to go out. An answer key written first, an anonymized copy, three readers with no context (VC, buyer, judge), a rank against decks that raised, and the objections that repeat. Writes `.claude/context/review.md`. |
| [hackathon](skills/hackathon/SKILL.md) | A submission is due. Track choice by crowdedness, a description a judge can skim in 90 seconds, scripts for the two videos Colosseum asks for (a 2–3-minute pitch and a demo of at most 3 minutes), and the grant follow-on when the track doesn't land. |
| [build-status](skills/build-status/SKILL.md) | Before a deck, submission, grant or investor update. Records program IDs, upgrade authority, verified-build and audit state, what works today, and traction with the query behind each number into `.claude/context/build.md`. |
| [positioning](skills/positioning/SKILL.md) | Before the deck, site, docs intro or launch post. Writes the one-liner, ICP with disqualifiers, job to be done, three named alternatives with the dimension you beat each on, sourced proof points and words to avoid into `.claude/context/positioning.md`. |
| [pricing](skills/pricing/SKILL.md) | Deciding what an onchain product charges: fee surface, who pays, the floor-cost math (fees, rent, RPC, oracles), comparables pulled from public fee data, and the test that would prove the number wrong. Writes `.claude/context/pricing.md`. |
| [market-sizing](skills/market-sizing/SKILL.md) | Before the market slide, or when choosing where to enter. Ranks entry wedges by problem quality × how much each builds the vision, sizes the first one bottom-up with a source on every number, checks it against a named top-down figure, and keeps money already spent apart from money at risk. Writes `.claude/context/market.md`. |
| [fundraising](skills/fundraising/SKILL.md) | After the deck lands: a crypto data room index (program IDs, authorities, audits vs deployed commit, onchain metrics with their queries), a diligence question bank with honest answers, monthly investor updates from the same metrics, and token-vs-equity framing routed to crypto-legal-skill. Writes `.claude/context/data-room.md`. |
| [launch](skills/launch/SKILL.md) | Mainnet goes live on a date and the announcement has to wait for a transaction. Writes a runbook gated on the onchain event: legal gates via `crypto-legal-skill`, slip and abort rules, channel order, the Superteam and partner layer, and pre-staged copy including the "it slipped" message. Also runs as `/launch`. |
| [incident-comms](skills/incident-comms/SKILL.md) | Something is broken and users are asking. Severity set by onchain state, the three pre-written updates, an exploit track routed to `crypto-legal-skill`, a static HTML status page that stays up when the app is down, a user-facing postmortem, and a known-issue entry `community-moderation` can dedupe against. |
| [ecosystem-bd](skills/ecosystem-bd/SKILL.md) | You want Jupiter, the wallets, the explorers, DefiLlama or a Superteam chapter to list, route or surface you. A dated map of what each surface requires, the readiness gaps to close in `ai-kit` first, diligence in both directions (inbound via `counterparty-gate`), the partner ask and the charter. |

They chain through files in the project's `.claude/context/`. Each skill writes one file, in a
format its own `references/` defines, and reads the others when they exist:

| File | Written by | Read by |
|------|------------|---------|
| `idea.md` | `idea-sprint` | `build-status`, `positioning`, `pricing`, `market-sizing`, `pitch-deck`, `pitch-review`, `hackathon`, `fundraising`, `launch`, `ecosystem-bd` |
| `build.md` | `build-status` | `idea-sprint`, `positioning`, `pricing`, `market-sizing`, `pitch-deck`, `pitch-review`, `hackathon`, `fundraising` |
| `positioning.md` | `positioning` | `idea-sprint`, `pricing`, `market-sizing`, `pitch-deck`, `pitch-review`, `hackathon`, `fundraising`, `launch`, `incident-comms` |
| `pricing.md` | `pricing` | `market-sizing`, `pitch-deck`, `pitch-review`, `fundraising` |
| `market.md` | `market-sizing` | `pitch-deck`, `fundraising` |
| `data-room.md` | `fundraising` | — |
| `review.md` | `pitch-review` | — |
| `launch.md` | `launch` | `incident-comms`, `ecosystem-bd` |
| `incidents.md` | `incident-comms` | — |
| `partners.md` | `ecosystem-bd` | — |

Run the producers first and the later skills get shorter: they pre-fill instead of
re-interviewing you, and a deck, a data room and a launch post all quote the same numbers.
`build.md`'s format is a contract other tools can write to as well:
[build-md-format.md](skills/build-status/references/build-md-format.md).

Rendered decks and any graphic or marketing asset come out as **HTML** — one file, your own
CSS. It renders anywhere, diffs in git, and the agent can design it directly.

## Install

Copy the skills into your project's skills directory. Copy the whole set: the skills link to
each other's format files (`pitch-deck` to `build-status`'s and `pricing`'s, for example), so a
skill copied on its own keeps working but has dead links where it hands off.

```
git clone https://github.com/solanabr/startup-builder-skill
cp -r startup-builder-skill/skills/* .claude/skills/
```

Use `.agents/skills/` instead of `.claude/skills/` for Codex, Cursor, Copilot and other
Agent Skills clients.

The layout is `skills/<name>/SKILL.md` at the repository root, which is what an
upstream-folder fetch expects — so a kit can pin individual skills from here by name without
vendoring the whole repo as a submodule.

## Upstream dependencies

The interview, scoring and validation rubrics, the pitch structure, frameworks, templates and
deck shell, and the hackathon submission guide and video scripts are vendored under each
skill's `references/`, rewritten from [sendaifun/solana-new](https://github.com/sendaifun/solana-new)
with attribution. The hackathon judging criteria and winners index are written from
Colosseum's own FAQ and announcement posts, linked inline.

What remains upstream is small and optional: the Superteam ideas dataset (one pinned JSON
file, 240 entries), [ColosseumOrg/colosseum-copilot](https://github.com/ColosseumOrg/colosseum-copilot)
(5,400+ past submissions, for crowdedness checks) and Anthropic's
[frontend-design](https://github.com/anthropics/skills/tree/8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4/skills/frontend-design). Links are
pinned or point at stable pages, so **nothing has to be installed** for the skills to work.
Each skill's `references/upstream-packs.md` gives the details.

Text adapted from solana-new, [beingsmit/technical-product-gtm](https://github.com/beingsmit/technical-product-gtm) and [jonathimer/devmarketing-skills](https://github.com/jonathimer/devmarketing-skills) keeps its MIT notice in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Checks

`python3 .github/scripts/validate.py` (standard library only) checks what review used to:
- skill frontmatter
- relative links and anchors
- GitHub links pinned to a commit
- the charter's hazard rules (#1): only `.md`, `.html` and `LICENSE`, no `.mcp.json` or settings, no download piped into a shell, no telemetry
- attribution against `THIRD_PARTY_NOTICES.md`
- README coverage of every skill and context file

CI runs it on every pull request, and a weekly job reports dead external links. A file other than Markdown or HTML needs an entry with a reason in the script's `ALLOWED_OTHER_FILES`.
