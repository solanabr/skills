# Channel order and the Solana amplification layer

<!-- The press-vs-direct-outreach rule and the partner co-launch phases are adapted from beingsmit/technical-product-gtm@ef1aa7dd8564b4d824021cf152468ece278e1513, skills/0-to-1-launch/SKILL.md and skills/partnership-architecture/SKILL.md section 7 (MIT, (c) 2026 Smit Patel; mirrored in github/awesome-copilot as skills/gtm-*). The Hacker News timing note is adapted from jonathimer/devmarketing-skills@500b44b53220292879223a807ce0d349aafe2537, skills/open-source-marketing/SKILL.md (MIT, (c) 2026 Jonathan Reimer). Notices in THIRD_PARTY_NOTICES.md. -->

Facts about third parties below were checked on 2026-10-05. Re-check anything you rely on.

## Order, and why

Everything here runs on the L+ clock (see [runbook.md](runbook.md)). The order exists for
one reason above the others: **the address has to propagate from a single source.** Every
post that types an address by hand is a chance for a typo or a swap, and scammers copy the
shape of real launches within minutes.

| # | When | Channel | Why it sits here |
|---|---|---|---|
| 1 | L+10m | Explorer: verified build submitted, IDL published | When people check the address, the explorer should already decode instructions and show the build. An undecodable program on launch day reads as "unverified" whatever the copy says. |
| 2 | L+20m | Docs flip and the address page | Every later post links here instead of carrying its own copy of the address. Docs that still say "devnet" when the thread goes out generate the first support wave. |
| 3 | L+20m | Status page | Traffic arrives with the thread. If the app strains, users need somewhere to look that is not the app. |
| 4 | L+30m | Your X thread, from the main account | The canonical claim. Partners quote this post, so the address comes from you. |
| 5 | L+35m | Discord and Telegram pinned message | It links the thread and the address page. Moderators are briefed on "is this the real address?" answers before the ping. |
| 6 | L+35m | "Go" to partners | They quote your post or use the exact copy they got at T-24h. A partner posting first, or at a clock time, is how an announcement goes out for a launch that slipped. |
| 7 | L+1h onward | Ecosystem layer (below) | It amplifies something already true and checkable. |
| 8 | L+1h | Long-form post, newsletters, press | Long-form needs the addresses, the audit link and the first-hour reality. |
| 9 | another day | Product Hunt, Show HN | See below. |

Partners get the context at T-7d and the **exact copy at T-24h**, with the address fields
as placeholders and the rule "post after ours, not at a time". Copy they write themselves
on the day will have the wrong address or the wrong claim, and you will not have reviewed
it. For each partner, ask what they lose if the integration fails; a partner with nothing
at stake will not post at all.

**Direct before broadcast.** If a new user cannot get value in minutes without help (a
wallet, funds on Solana, maybe a bridge), broadcast reach will not convert. Reach the target
users and teams directly first, and treat the broadcast as confirmation for them, not
acquisition.

## The Solana amplification layer

These are the surfaces that move a Solana launch. For each one's listing requirements see
[ecosystem-bd's surface map](../../ecosystem-bd/references/surfaces.md); here is only what matters on launch day.

**Aggregators and wallets come before amplification converts.** A swap that routes
nowhere, or a token a wallet marks unverified, turns attention into support tickets. Most
of these surfaces can only act once the onchain object exists, so they fall in the L+
window. Plan for hours or days of "not yet listed", and put that sentence in the FAQ
instead of letting users discover it. Add a second line: Solflare shows every token minted
less than 24 hours ago as "Unverified", so on launch day the tag is expected, not a warning
sign ([Solflare help](https://help.solflare.com/en/articles/16233587-understanding-unverified-tokens)).

| Surface | Launch-day relevance | Official source |
|---|---|---|
| Jupiter routing | A pool on a DEX Jupiter already integrates (Meteora, Raydium, Orca Whirlpool and others) is routed automatically, then has to keep passing Jupiter's liquidity test once its grace period ends. Integrating a new AMM into the router is a separate project with its own prerequisites, not a launch-day item. | [market listing](https://developers.jup.ag/docs/swap/routing/amm/market-listing.md) |
| Jupiter token verification (VRFD) | Jupiter weighs market cap, organic score, token holders, ticker uniqueness, Smart Followers on X and onchain liquidity. Most rejections are duplicates, low trading activity or weak social proof, and tags are pruned later for low activity. Expect "unverified" on launch day, check ticker uniqueness when you pick the ticker, and submit at [verified.jup.ag](https://verified.jup.ag) after G0. | [VRFD FAQ](https://verified.jup.ag/faq) |
| Wallets: Phantom, Solflare, Backpack | Phantom runs no verification of its own: its badge reflects Jupiter and CoinGecko, and spam flags are appealed through Blockaid. Without Metaplex metadata the token shows as "Unknown". Solflare verifies automatically and marks any token minted less than 24h ago, or with low liquidity, volume, holders or organic volume, as "Unverified", so expect the tag for at least the first day. | [Phantom token verification](https://docs.phantom.com/best-practices/tokens/token-verification.md), [Solflare: unverified tokens](https://help.solflare.com/en/articles/16233587-understanding-unverified-tokens) |
| Explorers: Solana Explorer, Solscan | Where people check the address you posted. Explorer shows the verified-build badge and aggregates token verification from others; Solscan's logo and socials come from a one-shot form, so file it once, carefully, after G0. | [verified builds](https://solana.com/docs/programs/verified-builds.md), [Solscan token update](https://docs.solscan.io/integration/update-token-details.md) |
| DefiLlama | TVL listing needs an adapter PR merged, and DefiLlama says a listing appears about 24h after merge, so it trails launch. Have the PR ready to open at G0. | [submit a project](https://docs.llama.fi/list-your-project/submit-a-project.md) |

Official X accounts, from links on each operator's site: [@JupiterExchange](https://x.com/JupiterExchange),
[@phantom](https://x.com/phantom), [@solflare](https://x.com/solflare),
[@Backpack](https://x.com/Backpack), [@helius](https://x.com/helius); from their GitHub
org pages: [@solscanofficial](https://x.com/solscanofficial), [@defillama](https://x.com/defillama).
None of them has a documented route for amplifying a launch. Tag them only if you integrate
them, and expect nothing.

**Superteam.** Regional chapters (the site says "25+"), each with its X account linked from its region page on
[superteam.fun](https://superteam.fun) (for example `superteam.fun/earn/regions/brazil/` links
[@superteambr](https://x.com/superteambr)). The 25 listed on 2026-10-05, each handle as linked from
its region page:

Argentina @SuperteamAR, Australia @SuperteamAU, Balkan @SuperteamBLKN, Brazil @superteambr,
Canada @SuperteamCAN, Georgia @SuperteamGEO, Germany @SuperteamDE, India @SuperteamIN,
Ireland @superteamie, Japan @SuperteamJapan, Kazakhstan @SuperteamKZ, Korea @superteamkorea,
Malaysia @SuperteamMY, Netherlands @SuperteamNL, Nigeria @superteamng, Poland @SuperteamPOL,
Singapore @SuperteamSG, Spain @LaFamilia_so, Thailand @SuperteamTH, Turkey @superteamtr,
UAE @SuperteamAE, UK @superteamuk, Ukraine @SuperteamUKR, USA @SuperteamUSA, Vietnam @superteamvn.

Global: [@Superteam](https://x.com/Superteam),
[@SuperteamEarn](https://x.com/SuperteamEarn). There is no documented "list your launch"
route. The routes that do exist: contact your chapter through its X account; sponsor a
bounty on [Superteam Earn](https://earn.superteam.fun), which any Solana project can do
permissionlessly (a launch-week content or integration bounty puts your launch in front of
the chapter's builders); and [support@superteam.fun](mailto:support@superteam.fun) for
partnerships. A chapter is most likely to amplify a team it already knows, so the
relationship has to exist before T-7d.

**Solana Foundation.** [@solana](https://x.com/solana), [@solana_devs](https://x.com/solana_devs)
(linked from solana.com), and [@SolanaFndn](https://x.com/SolanaFndn) (linked from the
`solana-foundation` GitHub org). No public route exists for a project to get onto
solana.com or into Foundation posts, so do not plan a launch around one. The
[newsletter](https://solana.com/newsletter) is a signup, not a submission route.

**Colosseum.** [@colosseum](https://x.com/colosseum). If you came through a Colosseum
hackathon or the accelerator, tell them before T-7d.

## Product Hunt and Hacker News: not on the onchain day

- **Product Hunt runs on a fixed clock.** Its day resets at midnight Pacific and a launch is
  scheduled ahead (up to a month, per producthunt.com's launch guide, checked via search
  2026-10-05; the page blocks scripted fetches). That is a wall-clock commitment, the
  opposite of the L+ rule: if G0 slips, the Product Hunt page goes up for a product that is
  not live. A TGE day also pulls the comments toward price talk. Launch on Product Hunt a
  few days after G0, when the product is stable, as its own event.
- **Show HN needs something people can try now.** The
  [Show HN guidelines](https://news.ycombinator.com/showhn.html) (checked 2026-10-05) rule
  out landing pages and fundraisers, ask for no signup barriers, and forbid asking friends to
  upvote. A token sale is off-topic, and "connect a funded mainnet wallet" is a barrier. An
  open-source SDK, a devnet demo or a tool that runs locally fits. HN's ranking favours the
  first hours, so post when the team can answer comments for the rest of the day, and never
  on a day the onchain step might still slip.

## After launch

Launch is not the finish line. For partner co-launches: a shared channel with each partner
for the support issues that cross over, a weekly adoption check, and a written case study
once there is a number worth quoting. If traction stalls, check in order whether the message
is wrong (it sounds like competitors), the experience is wrong (attention but no first
transaction), or the team is pulling different ways, before spending more on reach.
