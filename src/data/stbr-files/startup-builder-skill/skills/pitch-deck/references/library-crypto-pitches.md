# Crypto and DePIN pitches

Twenty-nine pitches from crypto infrastructure and physical-infrastructure (DePIN) teams, 28 of
them opened (video or deck); the Solana 2018 seed is known only through a secondary account. Use
it to decide how loud the chain and the token should be in your pitch, and to prepare for the
token question that all three investor Q&As here asked.

Quotes come from auto-captions or local transcription and keep their errors (for example
"salana"). Outcomes use open sources only: 11 next round, 5 token, 2 acquired, 11 unknown.

**Chain role** is our coding of each pitch: **leads** = the chain or the token is the engine of
the pitch (supply via token, the product is the chain, buying the asset); **background** = the
pitch opens on the physical problem and the chain enters as settlement, traceability or a later
phase, or only as a team credential; **absent** = not mentioned. 16 lead, 12 background, 1 absent.

## What repeats across them

1. **Near the money, the chain steps back.** CrowdBrain's hackathon pitch says "Solana makes
   this market enforceable"; at its accelerator demo day Solana appears only as a team
   credential. DeCharge's hackathon deck sells "Recurring revenue for investors"; its demo day
   opens on EV charging and traction and leaves crypto as the capital layer at the end. onocoy
   2023 sells the token model; onocoy 2024 opens on the GNSS market, calls the demand side web2
   and names Solana only at the end.
2. **With a crypto audience, the chain steps up.** NATIX 2020 (blockchain as a security detail)
   versus NATIX 2022 (a Helium-like model); Helium 2017 (no "blockchain" at all) versus 2019
   ("you're mining our blockchain"); BlockMesh's deck (settlement) versus its demo day (the token
   lowers acquisition cost).
3. **All three investor Q&As here hit the token-for-supply question:** what contributors get
   beyond earning (NATIX 2022), when incentives get cut (onocoy 2024), what happens if the token
   price falls (Robot Flow Labs). The strongest answers: paying demand outside crypto that buys
   the token through data credits (onocoy, Robot Flow Labs), and "the token is a part of the
   project is not the project". NATIX answered with intrinsic motivation, which landed weaker.
4. **Chain in the background means traceability or settlement.** ZkyProof signs drone data on
   the device and puts only a proof onchain: "The blockchain sees one thing only. Verify equals
   true. A verdict, not the data." It opens on the field problem and sells the funder the onchain
   usage. Also SvachSakthi and GreenKWh ("transparency and traceability"), BlockMesh's deck
   (micropayments, public registry, reputation), NATIX 2020.
5. **Chain leading usually means token rewards for supply:** Kiko, WeatherXM, Helium 2019, FOAM;
   Kiko sells it as "earn passive income".
   That frame is what triggers the question in item 3. Selling a return ("earn passive income",
   "Recurring revenue for investors", "30% high yields", "100% of the yield") is the securities
   red flag of Mistake 4 in [crypto-pitch-mistakes.md](crypto-pitch-mistakes.md): those lines
   come off the slide and go to [crypto-legal-skill](https://github.com/solanabr/crypto-legal-skill).
6. **Sequencing stated as a defense:** Auki says it will build first and launch a token after,
   and that buying the token is not an investment.
7. **A DePIN pitch that never names the chain can win:** Decen Space, first DePIN pick at
   Breakout, only says "rewards".

## The pitches

| Project | Where | Category | Chain role | In their words | Round at the time | Next event (source) | Pitch |
|---|---|---|---|---|---|---|---|
| FOAM | NYC Media Lab, 2018 | DePIN, mapping | leads | "The entire system is driven by a cryptographic token ... you can earn more tokens the more work you provide" | token sale $16.5M, closed after the pitch, Aug 2018 | token live: map launched on Ethereum, Sep 2018 ([CoinDesk](https://www.coindesk.com/markets/2018/09/13/foam-is-live-decentralized-world-map-launches-on-ethereum)) | [video](https://www.youtube.com/watch?v=Lyb7DX0TIQw) |
| Helium | Hardwired talk, 2017 | DePIN, wireless | background | "network coverage using commodity components that is decentralized ... a mechanism for autonomous payments that has cryptographic location built into it" | - | Series C $15M (USV, Multicoin), Jun 2019 ([TechCrunch](https://techcrunch.com/2019/06/12/helium-network/)); HNT from Jul 2019 | [video](https://www.youtube.com/watch?v=9gQp6XPfBfA) |
| Helium | influencer video, 2019 | DePIN, wireless | leads | "for providing coverage and the hotspot access, you're mining our blockchain, which then results in the reward of a token" | - | token: first HNT Jul 2019, migrated to Solana Apr 2023 ([Helium docs](https://docs.helium.com/tokens/hnt-token/)) | [video](https://www.youtube.com/watch?v=trvKElukgCY) |
| NATIX | Blockrocket competition, 2020 | DePIN, sensors | background | "end-to-end security which is device data and interaction security but over here that's here is where we are using ssi and blockchain" | - | $3.5M (2023) and $4.6M strategic, Apr 2024 ([The Block](https://www.theblock.co/post/290927/depin-natix-funding-token-airdrop-solana)) | [video](https://www.youtube.com/watch?v=Q078ypZfKm0) |
| Tupelo (Quorum Control) | Blockrocket competition, 2020 | L1, infrastructure | leads | "a platform purposely designed for all of the real world projects ... not designed first for currency but designed for ownership" | - | unknown; likely pivot ([GitHub org](https://github.com/quorumcontrol)) | [video](https://www.youtube.com/watch?v=Q078ypZfKm0) |
| NATIX Network | BFG Superstars demo day, 2022 | DePIN, mapping | leads | "this decentralized network is powered by blockchain is powered by crypto currency as well why not" | - | token: TGE Jul 2024 ([NATIX blog](https://www.natix.network/blog/progress-update-natix-network-july-2024)) | [video](https://www.youtube.com/watch?v=eKQynVSie3k) |
| Auki Labs | investor AMA, 2022 | DePIN, mapping | background | "we would not fund what we're doing by launching a token before we build something we're gonna build something and then launch a token" | $13M raised to date; $7M SAFT allocation open at a $120M valuation (said in the video) | token: AUKI trading from Aug 2024 ([Auki](https://www.auki.com/community/news/the-posemeshs-auki-token-tge-828-details)) | [video](https://www.youtube.com/watch?v=3Yw5zPZKiYo) |
| WeatherXM | IPFS Camp developer showcase, 2022 | DePIN, sensors | leads | "we're building an economic system around weather data in which weather station owners are rewarded with our token" | $5M seed closed before the pitch, Jun 2022 | Series A $7.7M led by Lightspeed Faction, May 2024; WXM token the same month ([The Block](https://www.theblock.co/post/295807/lightspeed-faction-leads-7-7-million-series-a-round-for-depin-weather-startup-weatherxm)) | [video](https://www.youtube.com/watch?v=J7aDajwBSic) |
| onocoy | one-minute pitch, 2023 | DePIN, mapping | leads | "we pay station owners and tokens giving them a piece of the Network's Revenue which we tie to token value via deflationary burnamment model" | - | private token sale $940K+, Sep 2024 ([onocoy](https://onocoy.com/news/onocoy-secures-funding-from-strategic-web3-and-gps-industry-investors-for-imminent-token-launch)) | [video](https://www.youtube.com/watch?v=E1SnkFFxVJI) |
| onocoy | Crypto Valley competition, 2024 | DePIN, mapping | background | "there's not additional things built on top because it's an it's a web3 approach to solving a traditional industry problem" | SAFT, target CHF 7.5M (said in the pitch) | token: ONO TGE in 2025 ([onocoy](https://onocoy.com/blog/onocoy-2025-year-in-review-from-tge-to-global-gnss-leadership)) | [video](https://www.youtube.com/watch?v=dRgueJlJmmw) |
| BlockMesh | Colosseum Renaissance hackathon deck, 2024 | DePIN, bandwidth | background | "BlockMesh uses Solana blockchain to enable international micropayments, public online registrar, reputation tracking and configuration." | - | merged with Perceptron Network, Jun 2025 ([Decrypt, sponsored](https://decrypt.co/326202/perceptron-network-merges-with-blockmesh-to-create-first-end-to-end-decentralized-ai-data-infrastructure)) | [deck](https://docs.google.com/presentation/d/16yqwxWx3vHPVmdpsko9U76sAowi9L-8yrc9wmfwEIok/edit?usp=sharing) |
| DeCharge | Colosseum Renaissance hackathon deck, 2024 | DePIN, energy | leads | "One time investment for a Real world Asset / Recurring revenue for investors" | - | Colosseum Accelerator Cohort 1, then $2.5M seed led by Lemniscap, Mar 2025 ([Chainwire](https://chainwire.org/2025/03/27/decharge-raises-2-5m-to-deliver-ai-powered-energy-network-for-electric-vehicles/)) | [deck](https://docs.google.com/presentation/d/1WBal3ysYwnFy4H-KCSMn38Eap6em3wJou4tVfEf3OVc/edit?usp=drive_web) |
| MeshMap | Colosseum Accelerator demo day, Cohort 1, 2024 | DePIN, mapping | leads | "and Solana's Global St machine for placing and tracking objects and issuing token incentives crowdsource mapping can be extremely effective" | - | $4M (a16z CSX, Colosseum, GSR), Sep 2024 ([ChainCatcher](https://www.chaincatcher.com/en/article/2145114)) | [video](https://www.youtube.com/watch?v=GDIZ-P0la3c) |
| DeCharge | Colosseum Accelerator demo day, Cohort 1, 2024 | DePIN, energy | background | "as a protocol we stand to leverage deepen real world asset organization to deploy Global capital for local energy initiatives" | "multi-million dollar seed round" in progress (said in the pitch) | $2.5M seed led by Lemniscap, Mar 2025 ([Chainwire](https://chainwire.org/2025/03/27/decharge-raises-2-5m-to-deliver-ai-powered-energy-network-for-electric-vehicles/)) | [video](https://www.youtube.com/watch?v=GDIZ-P0la3c) |
| BlockMesh | Colosseum Accelerator demo day, Cohort 1, 2024 | DePIN, bandwidth | leads | "block mesh crowdsource the supply side using token incentives which reduces the user acquisition cost considerably" | - | merged with Perceptron Network, Jun 2025 ([Decrypt, sponsored](https://decrypt.co/326202/perceptron-network-merges-with-blockmesh-to-create-first-end-to-end-decentralized-ai-data-infrastructure)) | [video](https://www.youtube.com/watch?v=GDIZ-P0la3c) |
| DBunker | Colosseum Accelerator demo day, Cohort 1, 2024 | DePIN, finance | leads | "tokenizing mining power or Hardware itself managing the devices on behalf users and later passing on the rewards" | - | unknown | [video](https://www.youtube.com/watch?v=GDIZ-P0la3c) |
| Rakurai | Colosseum Accelerator demo day, Cohort 1, 2024 | Solana validator client, staking | leads | "rakurai A3 infra startup we offer sing but with 30% high yields built upon custom High throughput nodes powered by salana" | - | $3M seed led by Anagram, Mar 2025 ([FinSMEs](https://www.finsmes.com/2025/03/rakurai-raises-3m-in-seed-funding.html), unverified) | [video](https://www.youtube.com/watch?v=GDIZ-P0la3c) |
| SvachSakthi (later GreenKWh) | Colosseum Radar hackathon, 1st in DePIN, 2024 | DePIN, energy | background | "by tokenizing all these energy transactions on chain, we ensure a clear transparency and traceability of the energy flow" | "raising seed capital", no amount (said in the pitch) | joined Colosseum Accelerator Cohort 2 as GreenKWh ([Colosseum](https://blog.colosseum.com/introducing-colosseum-accelerator-cohort-2/)) | [video](https://drive.google.com/file/d/1XI0-9wEjClFWJywuRuJHkLSlorHnkr6e/) |
| Kiko Network | Colosseum Radar hackathon, 2024 | DePIN, sensors | leads | "anyone can just buy the device and deploy it and contribute to the network and earn passive income" | - | unknown; domain no longer resolves | [video](https://www.loom.com/share/fdba10ede5bf45938023f50706da7492) |
| SkyTrade | Next Top Blockchain Startup, 2024 | drones, airspace | leads | "the plan is to tokenize all of the aites and allow to trade them like effectively like you would trade the nft tokens" | pre-seed, undisclosed (Modular Capital, Portal Ventures), Jul 2024 ([Newsfile](https://www.newsfilecorp.com/release/218110/SkyTrade-Announces-PreSeed-Round-CoLed-by-Modular-Capital-and-Portal-Ventures)); raising a seed at the time | unknown; still on points, no token, Oct 2025 ([DroneXL](https://dronexl.co/2025/10/17/skytrade-promises-drone-air-rights-income/)) | [video](https://www.youtube.com/watch?v=tMyT2tDj5AU) |
| GreenKWh | Colosseum Accelerator demo day, Cohort 2, 2025 | DePIN, energy | background | "by recording all these energy transactions on chain we ensure a clear transparency and traceability of the clean energy flow" | - | unknown | [video](https://www.youtube.com/watch?v=7kiQQ7iHK04) |
| Decen Space | Colosseum Breakout hackathon, 2025 | DePIN, satellite | absent | "a decentralized ground station network with new receive-only nodes that decrease latency and provide rewards to incentivize the infrastructure development and participation" | - | unknown; joined ESA BIC Northern Germany ([ESA](https://commercialisation.esa.int/startups/decen-space/)) | [video](https://www.loom.com/share/e9c08f8e1ce846e9af95727e352ac5c2) |
| Tape Drive | Colosseum Accelerator demo day, Cohort 3, 2025 | storage | leads | "Tape drive is native to Salana. So the data lives right there on the ledger where the apps already are." | - | unknown | [video](https://www.youtube.com/watch?v=41PLtfgzA0c) |
| Robot Flow Labs | RWA week pitch, 2026 | robotics data | background | "the token is a part of the project is not the project the project is the data for robots" | $2M seed ask (said in the pitch) | unknown | [video](https://www.youtube.com/watch?v=5oBDYkOufh8) |
| CrowdBrain | Colosseum Frontier hackathon, 2026 | robotics teleoperation | background | "Solana makes this market enforceable. Portable credentials, staking, transparent rewards, global payouts, and bonded robot nodes." | - | joined Colosseum Accelerator Cohort 5 ([Colosseum](https://blog.colosseum.com/announcing-colosseums-accelerator-cohort-5/)) | [video](https://youtu.be/tI7T3X5IRT8) |
| CrowdBrain | Colosseum Accelerator demo day, Cohort 5, Aug 2026 | robotics teleoperation | background | "We have built the networks before, including one of the largest applications on Solana, serving 100,000 monthly active users." | - | unknown | [video](https://x.com/colosseum/status/2102785151587827811) |
| Mintera | DePIN deck, 2024 | DePIN, storage mining | leads | "DePIN storage mined by Mintera 100% of the yield backed by Storage DePIN" | - | unknown | [deck](https://mintera.co/wp-content/uploads/2024/02/Mintera-DePIN.pdf) |
| ZkyProof (Edda Labs) | Midnight Build Club grant pitch, 2026 | drone data verification | background | "The blockchain sees one thing only. Verify equals true. A verdict, not the data." | - | unknown | [video](https://www.youtube.com/watch?v=Y1KZ-XJRLY8) |
| Solana | seed round, 2018 (as reported) | L1, infrastructure | leads | "Solana is blockchain at NASDAQ speed." | $3.17M at $0.04 per token, Apr 2018, per [Not Boring](https://www.notboring.co/p/solana-summer) (reported) | Series A $20M led by Multicoin, Jul 2019 ([Solana](https://solana.com/news/solana-in-2019--growth--development--and-the-road-to-mainnet)) | [article](https://www.notboring.co/p/solana-summer) |

## Where to find more, and what is closed

- Colosseum's accelerator demo days (Cohorts 1 to 4) are on YouTube with captions; Cohort 5 was
  shown on X.
- Colosseum's public project pages for hackathon entries often link the team's presentation: a
  Google Slides deck that exports without a login, or a video. They are the best source of real
  pre-seed crypto decks.
- Older competitions with investor Q&A are on YouTube: NYC Media Lab 2018, Blockrocket 2020, BFG
  Superstars 2022, Crypto Valley 2024, Next Top Blockchain Startup 2024.
- Closed or not found: no seed deck from a physical-DePIN company with a VC lead is public
  (Helium, Hivemapper, GEODNET, DIMO, NATIX, Spexi, WeatherXM, Silencio); Alliance demo-day
  pitches are not public; a16z CSX is only on X.

Four entries are not raise pitches (Helium 2017 talk, Helium 2019 influencer video, WeatherXM
showcase, Auki AMA) and are kept for the contrast; ZkyProof is a grant pitch, not equity.
