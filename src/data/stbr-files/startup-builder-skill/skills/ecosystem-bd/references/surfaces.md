# The Solana distribution surface map

Every requirement here comes from the operator's own docs, site or GitHub, and every row
was checked on **2026-10-05**. These processes change without notice: re-open the source
link before you act on a row, and update the date when you do. Where no official source
could be reached, the row says **unverified** instead of guessing.

A pattern runs through the whole map: almost nothing here is won with a pitch. Each
surface asks for a technical artifact or an onchain fact, and many can only act once your
program, mint or pool exists. See [readiness.md](readiness.md) for the artifacts and who
builds them.

## 1. Aggregators and routers

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **Jupiter token verification (VRFD)** | Verified status across Jupiter and the wallets and screeners that read it. Levels: verified, unverified, banned. | A holistic review of market cap, organic score, token holders, ticker uniqueness, Smart Followers on X and onchain liquidity; no numeric threshold is published. Most rejections are a duplicate of another token, low trading activity or insufficient social proof, and tags are pruned later for low activity. Expect "unverified" on launch day, and check ticker uniqueness when you pick the ticker. Standard submission is free; Express costs 1000 JUP, needs an API key and guarantees a review in 24-48h, not a pass. Known projects can DM `@jup_vrfd` from the project's X account. | [verified.jup.ag](https://verified.jup.ag) | [VRFD FAQ](https://verified.jup.ag/faq), [Express API](https://developers.jup.ag/docs/tokens/verification.md) |
| **Jupiter organic score** | A 0-100 score of non-bot activity, exposed in the Tokens API. | Nothing to apply for; it is derived from onchain activity. | none | [docs](https://developers.jup.ag/docs/tokens/index.md) |
| Jupiter token lists (V1 GitHub list, Catdet list) | Historical, superseded by VRFD. Do not open PRs against them. | | | [docs, history section](https://developers.jup.ag/docs/tokens/index.md) |
| **Jupiter routing: pools on an integrated DEX** | A new pool on a DEX Jupiter already integrates is routed automatically. | A grace period set by token age, then the market must pass one of two tests: buying $500 and selling back on the same market loses under 30%, or the price per token for a $1,000 buy is within 20% of a $500 buy. Bonding-curve tokens that do not graduate before the grace period ends are removed. | automatic | [market listing](https://developers.jup.ag/docs/swap/routing/amm/market-listing.md) |
| **Jupiter routing: a new AMM or DEX** | Your venue inside Jupiter's router. | Jupiter weighs code health, a security audit, traction, and team and backers. Implement the `Amm` trait from [`jupiter-amm-interface`](https://github.com/jup-ag/jupiter-amm-interface); let Jupiter fork the SDK; no network calls in the implementation; heavy work in `update`, not `quote`; prove quote parity with `jupiter-amm-test-kit` (LiteSVM) with committed fixtures. Submit the SDK repo, audit, traction metrics and team information. | [AMM integrator form](https://support.jup.ag/requests/new/amm-integrators) | [integration docs](https://developers.jup.ag/docs/swap/routing/amm/integration.md) |
| Jupiter RFQ (JupiterZ) | Quote as a market maker. | A webhook to its OpenAPI spec that passes the acceptance and integration tests in `jup-ag/rfq-webhook-toolkit`, then onboarding through its pre-production environment. Read the quoting page for fill-rate terms. | [support form](https://support.jup.ag/requests/new) | [RFQ docs](https://developers.jup.ag/docs/swap/routing/rfq/v1/overview.md) |
| **Jupiter platform list (Portfolio)** | Your protocol appears as a platform in Jupiter's UI and Portfolio. | A PR adding `src/platforms/<id>.ts` (id, name, tags, website and X links required; optional token mints and DefiLlama id) and a 64x64 WebP logo. Portfolio position indexing: ask in Jupiter's Discord `#portfolio`; no written process. | [PR to jup-ag/platform-list](https://github.com/jup-ag/platform-list) | [CONTRIBUTING.md](https://github.com/jup-ag/platform-list/blob/2f6855920f63b282c0483e42c5be62c3b9693ea1/CONTRIBUTING.md) |
| DFlow | A venue in DFlow's routing. | Implement the `Amm` trait in [`dflow-amm-interface`](https://github.com/DFlowProtocol/dflow-amm-interface). Submission route, audit and liquidity bar: **unverified**. | unverified | [liquidity venues](https://pond.dflow.net/spot/liquidity-venues.md) |
| Titan | A venue in Titan's meta-aggregator. | Implement `TradingVenue` from its [integration template](https://github.com/Titan-Pathfinder/integration-template), with LiteSVM tests that the off-chain quote matches onchain, then contact the team. Audit or liquidity bar: **unverified**. | Telegram or Discord, per its docs | [docs](https://titan-exchange.gitbook.io/titan/getting-started/titan-dex-integrations.md) |
| OKX DEX aggregator | | **Unverified**: no official integration doc could be reached. | | |

The superseded Sonarwatch portfolio route is gone: `sonarwatch/portfolio` returns 404, and
its `hub-platforms` repo is archived and points to `jup-ag/platform-list`.

## 2. Wallets

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **Phantom token display** | The token shows with name, symbol and image instead of "Unknown". | A Metaplex Token Metadata account; onchain fields win over the off-chain JSON; `TokenStandard` decides the tab (fungible on Home). | automatic | [token display](https://docs.phantom.com/best-practices/tokens/token-display.md) |
| **Phantom verified badge** | The badge instead of "This token is unverified". | Phantom does not verify tokens and has no form. It reflects third parties, named as Jupiter and CoinGecko. | get verified at Jupiter or CoinGecko | [token verification](https://docs.phantom.com/best-practices/tokens/token-verification.md) |
| Phantom spam flag | Token hidden or warned. | Signals from internal systems and providers including Blockaid; criteria not published. | [Blockaid appeal portal](https://report.blockaid.io/), Phantom support | [token display, visibility](https://docs.phantom.com/best-practices/tokens/token-display.md) |
| Phantom domain and transaction warnings | "New domain" or "could be malicious" when users connect or sign. | New-domain warnings usually clear in days, with a review form after a week. Simulation warnings: one signer where possible, stay within transaction size or use lookup tables, simulate with `sigVerify: false` before sending. | form in the doc | [warnings](https://docs.phantom.com/developer-powertools/domain-and-transaction-warnings.md) |
| Phantom Explore / app directory | Listed in the in-wallet directory. | Needs a domain verified through Phantom Portal, and **Portal is not accepting new applications**, so there is no open route today. | closed | [FAQ](https://docs.phantom.com/resources/faq.md) |
| Solflare | Token shown with metadata and price, without the "Unverified" tag. | Verification is automatic. A token shows as Unverified if it was minted less than 24h ago, or has low liquidity or trading volume, too few holders, or too little organic onchain volume; the tag clears on its own once it meets the criteria. Solflare publishes no thresholds. Solana's docs add Metaplex metadata; its swap list is Jupiter-powered. | automatic; Solflare support | [Solflare: unverified tokens](https://help.solflare.com/en/articles/16233587-understanding-unverified-tokens), [solana.com: verify a token](https://solana.com/docs/tokens/how-to-verify-a-token.md) |
| Backpack | | No official token verification or app listing doc found: **unverified**. | | |
| **Wallet Standard** | How your app discovers wallets. | Nothing to apply for: use a Wallet Standard connector. | | [anza-xyz/wallet-standard](https://github.com/anza-xyz/wallet-standard) |
| **Blinks registry (Dialect)** | Phantom and Backpack render only `trusted` blinks, per Dialect. | `actions.json` at the domain root per the Solana Actions spec, an action that works reliably (test at dial.to), a clear description, a valid contact. Manual review. | email `hello@dialect.to` | [registry](https://docs.dialect.to/blinks/blinks-provider/blink-registry.md), [Actions spec](https://solana.com/docs/advanced/actions.md) |
| **Solana Mobile dApp Store** | Listing in the Seeker dApp Store. | A signed release APK (not an AAB), signed with a key separate from any Google Play key; listing metadata; a publisher wallet with about 0.2 SOL that must be reused for every later release; the publisher policy. Review takes 3-5 business days. | [publish.solanamobile.com](https://publish.solanamobile.com) | [submit a new app](https://docs.solanamobile.com/dapp-store/submit-new-app.md) |

## 3. Explorers and analytics

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **Solana Explorer token info** | Token verified in search and on its page. | No own process: it aggregates RugCheck, Jupiter, CoinGecko, Solflare and Bluprynt, and one of them is enough. Needs Metaplex metadata and liquidity on a supported DEX. | via those providers | [verify a token](https://solana.com/docs/tokens/how-to-verify-a-token.md) |
| **Verified-build badge** | "Verified build" on the program page (Explorer; Orb and SolanaFM read the same data). | A Docker build with `solana-verify` and `Cargo.lock` at the repo root; `solana-verify verify-from-repo` uploads the verification PDA (signed by the upgrade authority; a multisig has its own flow); then `solana-verify remote submit-job` queues OtterSec's check. The `--remote` flag is deprecated. | CLI | [verified builds](https://solana.com/docs/programs/verified-builds.md) |
| **IDL for instruction decoding** | Explorers decode your instructions. | Upload the IDL with Program Metadata (`npx @solana-program/program-metadata write idl <program-id> ./idl.json`, by the upgrade authority) or `anchor idl init`/`upgrade`. The program-metadata README says Explorer currently reads only canonical Codama IDLs, with Anchor IDL support "soon". | CLI | [program-metadata](https://github.com/solana-program/program-metadata) |
| **Solscan token info** | Logo and socials shown. The default reputation, "Unclassified", hides the logo. | The official form only. Requester email on the project's domain or listed on its site, working public links, a neutral description (no "best" or "fastest"), full social URLs. **One submission per mint, final, no edits.** | [solscan.io/token-update](https://solscan.io/token-update) | [docs](https://docs.solscan.io/integration/update-token-details.md) |
| Solscan instruction parsing | Instructions labelled. | Publish the Anchor IDL onchain, then send the program ID to Solscan's admins. The page is old; treat the route as indicative. | DM or Discord | [docs](https://docs.solscan.io/integration/parse-instruction.md) |
| Orb (Helius) | Explorer showing IDL, verification, upgrade authority and `security.txt`. | Reads the IDL and verified-build data; no submission process documented. | none | [docs](https://www.helius.dev/docs/orb/explore-programs.md) |
| **Dune decoded tables** | `{project}_solana` tables anyone can query. | Program ID, project and program name (must match the IDL), type, start slot, and a valid IDL (borsh args, no generics). Native programs need a handwritten IDL. | [dune.com/contracts/new](https://dune.com/contracts/new) | [docs](https://docs.dune.com/web-app/decoding/solana-decoding-submissions.md) |
| DexScreener | Listed automatically once a pool has one transaction. | Paid "Enhanced Token Info" adds socials and locked-supply wallets. A new DEX is listed on request, weighing liquidity, volume, open and audited contracts and community; no thresholds. | [marketplace](https://marketplace.dexscreener.com/product/token-info), Discord | [token listing](https://docs.dexscreener.com/token-listing.md), [DEX listing](https://docs.dexscreener.com/dex-listing.md) |
| CoinGecko, CoinMarketCap | Price pages and the source Phantom reads for verification. | **Unverified**: both sites refused automated fetches. Read their listing pages directly. | | |
| Birdeye, Artemis, Blockworks | | **Unverified**: no documented public listing route found. | | |

## 4. DeFi dashboards

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **DefiLlama TVL** | A protocol page with TVL. | An SDK adapter in a new `projects/<name>/` folder, PR with maintainer edits allowed. TVL must come from onchain data; API-based adapters are no longer accepted for new projects. No new npm dependencies. The PR template asks for audit links, treasury addresses, one category, oracle details, methodology and CoinGecko/CMC ids. Appears about 24h after merge. No minimum TVL or audit stated. | [DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) | [submit a project](https://docs.llama.fi/list-your-project/submit-a-project.md) |
| **DefiLlama fees, revenue, volume** | Dimension dashboards. | A `dimension-adapters` PR returning `dailyFees`, `dailyRevenue` and so on, with a `methodology`; unknown dimensions left undefined, not zero. | [dimension-adapters](https://github.com/DefiLlama/dimension-adapters) | [other dashboards](https://docs.llama.fi/list-your-project/other-dashboards.md) |
| Jupiter Portfolio | Positions shown in Jupiter Portfolio. | See the platform list row in section 1. | | |

## 5. Superteam

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **Regional chapters** | Local builders, events and accounts. 25 region pages on 2026-10-05; the site says "25+". | No documented "list your project" route. A chapter is reached through the X account on its region page, e.g. `superteam.fun/earn/regions/brazil/`. Relationships come from showing up: events, bounties, members. | chapter X account; [support@superteam.fun](mailto:support@superteam.fun) for partnerships | [superteam.fun](https://superteam.fun) |
| **Sponsor a bounty or project on Earn** | Your task in front of Superteam's builders. | "Any Solana project can choose to sponsor a bounty or project through Superteam Earn, permissionlessly." | [earn.superteam.fun](https://earn.superteam.fun) | [Earn FAQ](https://docs.superteam.fun/the-superteam-handbook/community/faqs/superteam-earn-faq) |
| **Chapter-run grants** | "Solana Foundation <Country> Grants", up to $10k USDG each, run by the local chapter. | Read each listing: the UK one requires residence in the country, KYC on Earn, and weighs "prior proof of work and trust in the community" highest. Paid in tranches against progress. | apply on [Earn grants](https://earn.superteam.fun/grants/) | Earn grant listings (live API, 2026-10-05) |
| Member perks | Your product offered as a perk to members. | Whether startups can submit a perk, and how: **unverified**. | | [member perks](https://superteam.fun/member-perks) |
| Instagrants | Still shown as a tile on the superteam.fun homepage, with no link of its own. | The live application form is the chapter grants on Earn (row above). | [Earn grants](https://earn.superteam.fun/grants/) | [superteam.fun](https://superteam.fun) |
| A Superteam accelerator or demo day | | **Unverified**: not shown on current official pages. | | |

## 6. Solana Foundation and Colosseum

| Surface | What it means | What it requires | Route | Source |
|---|---|---|---|---|
| **Foundation grants** | Milestone grants for public goods; convertible grants for public goods with a commercial side; RFPs. | A public good (significant open source or a meaningful free offering), open source, only possible on Solana, a clear budget with milestones. "Primarily commercial" projects should look at convertible grants. About a week to review, about three weeks to decide. Amounts not stated. | one application form, linked from the page | [solana.org/grants-funding](https://solana.org/grants-funding) |
| solana.com ecosystem, news, case studies | Foundation-authored pages. | **No submission route found.** Do not plan distribution around them. | | [solana.com/ecosystem](https://solana.com/ecosystem) |
| Colosseum accelerator | 12 weeks, $250k per the homepage. | Founders must win a Colosseum hackathon to be considered. | via a hackathon | [colosseum.com/accelerator](https://colosseum.com/accelerator) |

Not covered here because the hackathon skill covers it: entering hackathons and Earn
bounties as a participant. See [hackathon](../../hackathon/SKILL.md).
