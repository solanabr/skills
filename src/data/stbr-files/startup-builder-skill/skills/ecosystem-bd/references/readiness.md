# Readiness first

Outreach does not substitute for the artifact a surface asks for. Before any ask, check
which of these exist. Each missing one is engineering work, and it belongs in
[solanabr/ai-kit](https://github.com/solanabr/ai-kit), not in a pitch.

| Artifact | Who asks for it (see [surfaces.md](surfaces.md)) | Build it with ai-kit |
|---|---|---|
| **Published IDL** (Program Metadata or Anchor) | Explorer and Solscan decoding, Orb, Dune decoded tables; any integrator generating a client | [`/deploy`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/deploy.md) step 5 (`anchor idl init` / `upgrade`) |
| **Verifiable build** and the verification PDA | Explorer verified-build badge (also read by Orb and SolanaFM); any integrator's diligence | [`/build-program`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/build-program.md), then [`deployment.md`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/skills/deployment.md) for `solana-verify` |
| **Audit report** naming the deployed commit | Jupiter AMM integration (prerequisite and submission item); DexScreener DEX listing; DefiLlama listing (audit links field) | [`/audit-solana`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/audit-solana.md) as preparation, then an external auditor |
| **Typed client** (Codama or Anchor TS) | No surface checked on 2026-10-05 requires one, but an integrator's engineer will usually want one, and it is the fastest proof that your IDL is right | [`/generate-idl-client`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/generate-idl-client.md) |
| **Rust `Amm` implementation** with LiteSVM quote-parity tests and fixtures | Jupiter router (also DFlow's and Titan's equivalents) | ai-kit's `defi-engineer` agent |
| **Metaplex token metadata** | Phantom display, Jupiter verification, Solflare, Explorer | ai-kit's `token-engineer` agent |
| **Onchain TVL / fees computation** | DefiLlama adapters (onchain data only for new projects) | write it against your own IDL; the queries double as your data-room metrics |
| **Integration docs** | every integrator | [`/write-docs`](https://github.com/solanabr/ai-kit/blob/fae10fe6c13590a88817562baa2a81c81a43d134/.claude/commands/write-docs.md) |
| **`security.txt` and a disclosure contact** | Orb displays it; it is where an integrator's security reviewer looks for a contact | the [`solana-security-txt`](https://github.com/neodyme-labs/solana-security-txt) crate's `security_txt!` macro, added by ai-kit's `anchor-engineer` agent |

## The check

Score each row present, partial or missing for the surfaces on your target list. Missing
rows for a surface mean: do not ask that surface yet. Write the gaps into
`.claude/context/partners.md` as blockers, and hand them to engineering.

The volume number is also an artifact. Aggregators and dashboards read onchain activity,
not claims. If the honest number is small, lead with the integration artifact and the
smallest true number, and ask for the step that matches it (a pilot, a test route), not the
headline listing.
