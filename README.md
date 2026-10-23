# skills.solana.com

Agent skills for building on Solana — a curated registry of **official Solana Foundation skills** (hosted verbatim, per-file) plus an explorer for **ecosystem skill repositories** (Jupiter, Helius, Metaplex, SendAI, Solana Mobile, Trail of Bits, Pyth, OKX, and more).

Unlike sites that reskin a single community aggregator, this registry indexes **30 independent source repositories** — protocol-native ones included — every skill pinned to an immutable commit with published integrity hashes.

Built with [Astro](https://astro.build) as a fully static site. No client framework — a few hundred bytes of vanilla JS for search, tabs, and copy buttons.

## What the site does

- **`/`** — landing: official skills, three ways to use a skill, ecosystem highlights.
- **`/skills`** — searchable catalog of every indexed skill (official pinned first, category filters).
- **`/skills/<id>`** — official skill detail: rendered `SKILL.md`, install tabs (skills CLI / Claude Code / no-install / git), companion-file tree, metadata.
- **`/s/<id>/SKILL.md`** — **per-file hosting**: the official skill served verbatim with `text/markdown` + CORS, so any agent can consume it from a single URL — no install:
  ```
  Read https://skills.solana.com/s/solana-dev/SKILL.md and follow it for this task: …
  ```
  (The legacy flat form `/s/<id>.md` 301s here; it survives as a plain-file fallback on hosts without redirect support, but its relative links only resolve from the dir-style URL.)
- **`/s/<id>/SKILL.md` + `/s/<id>/<companion>.md`** — dir-style hosting of the whole skill, companion reference files included, so relative links resolve and an agent can walk the entire skill without leaving the domain. Detail pages surface these as a **Reference library** (title + description parsed from each file's frontmatter).
- **`/skills/<repo-id>/<skill>`** — ecosystem skill detail: same layout as official pages (rendered `SKILL.md`, install tabs, file tree, vendor logo) with an explicit *not official* disclaimer.
- **`/s/<repo-id>/<skill>/SKILL.md`** — ecosystem mirrors. Three hosting tiers:
  - **Full** (`sendaifun/skills`, `sendaifun/solana-new`, `solanabr/ai-kit`): `SKILL.md` verbatim + every companion `.md`, relative links resolve on-domain — same guarantee as official skills.
  - **Partial** (every other repo with a license): `SKILL.md` mirrored with relative links rewritten to GitHub URLs pinned at the indexed commit, plus a provenance comment; companions stay upstream.
  - **Link-only** (repos with no declared license): never republished — pages link to the pinned source instead.
- **Commit-SHA pinning, end to end** — every skill on the site (official, ecosystem, and link-only community entries) is tied to an immutable git commit plus two timestamps: the upstream committer date (`commitDate`) and when our refresh took the pin (`pinnedAt`). All mirrors are fetched *at* the pinned sha, all advertised `raw`/`github` links point *at* the pinned sha (never a branch), and whole-dir install commands fetch GitHub's codeload tarball *at* the sha (degit can't resolve arbitrary commits — it only matches ref tips) — closing the window where upstream force-pushes or branch moves could swap content between review and install. Pins advance **fail-closed**: only after the content at the new sha is actually fetched, never on a metadata-only (`--meta`) run, and never by falling back to a branch ref — so a recorded commit always describes exactly what was mirrored.
- **Sanitized rendering** — mirrored markdown is third-party content; `rehype-sanitize` strips raw HTML from every rendered detail page (the raw `.md` mirrors under `/s/` are served untouched as `text/markdown`). (`npx skills add` pulls the repo's current HEAD — diff against the pin if that matters to you.)
- **Integrity hashes** — every file mirrored on this domain publishes its `sha256` in `/api/skills.json` (`integrity`, keyed by relative path). Verify any mirror with `curl -fsSL <url> | shasum -a 256`; CI recomputes every hash against the built site on every PR and every refresh.
- **Contributor attribution** — each skill records the GitHub login that last touched its `SKILL.md` as of the pin (`lastAuthor` in the API, "Last updated by" on detail pages), so monorepo skills credit the person who actually wrote them, not just the org.
- **`/ecosystem`** — ecosystem repo explorer grouped by aggregators/toolkits, teams & protocols, community; expandable per-repo skill lists that deep-link to the on-site detail pages.
- **`/api/skills.json`** — machine-readable index of everything (CORS-enabled); `/api/skills-min.json` is the token-lean variant with one fetchable URL per skill (on-domain mirror preferred).
- **`/llms.txt`** — plain-text site map for AI agents.
- **`/og/**.png`** — per-page social cards generated at build time (satori + resvg): Solana gradient, vendor logo, adaptive title.
- `sitemap.xml`, `robots.txt`, OpenGraph meta on every page.
- **Logos** — GitHub org avatars are downloaded at refresh time into `public/logos/` and shown on repo cards, catalog cards, and detail pages (no third-party requests at render time).

## Data model

Everything renders from one committed snapshot:

```
src/data/registry.json                    # official skills + ecosystem repos/skills, stars, commit SHAs
src/data/skills/*.md                      # verbatim mirrors of official SKILL.md files
src/data/skill-files/<id>/…               # verbatim mirrors of official companion .md files (reference library)
src/data/eco-skill-files/<repo>/<skill>/… # ecosystem mirrors (full or partial — see hosting tiers above)
public/logos/<owner>.png                  # GitHub org avatars, refreshed with the registry
```

The snapshot keeps builds deterministic and the site immune to GitHub hiccups. It is refreshed by:

```bash
npm run refresh            # full: mirrors, file trees, frontmatter, stars, new-skill discovery
node scripts/refresh.mjs --meta   # cheap: stars + pushed_at only
```

`GITHUB_TOKEN` is optional but raises rate limits; when a run hits the limit it waits for the hourly reset instead of failing. A weekly GitHub Action (`.github/workflows/refresh.yml`) runs the full refresh and commits changes. It uses the `REGISTRY_TOKEN` repo secret when set (a fine-grained token with public read access, 5000 calls/h), else the Actions token (1000 calls/h); CI (`ci.yml`) builds every PR, asserts hosted files remain byte-identical mirrors, and re-verifies every advertised `sha256` against the built output (`scripts/verify-integrity.mjs`).

### Solana AI Kit, synced daily

The `solana-ai-kit` entry tracks [solanabr/ai-kit](https://github.com/solanabr/ai-kit) at its highest `vX.Y.Z` tag (`"pin": "release-tag"`), which is what the kit's installer ships, not its branch head. `"kitStats": true` reads the kit at that tag: agents and commands from `.claude/agents/*.md` and `.claude/commands/*.md`, MCP servers from `.mcp.json`, core and extension packs from `.claude/skills/skill-registry.json`, the version from `.claude/VERSION`. They fill the placeholders in the entry's `blurbTemplate`, so the card's numbers are never typed by hand.

`.github/workflows/kit-sync.yml` runs `node scripts/refresh.mjs --only solana-ai-kit` every day at 07:23 UTC, about five API calls. It commits only when the kit's content changed (a new tag, skill or count), not for a star-count move. The kit can trigger it at release time with a `repository_dispatch` of type `kit-release`, sent with a token that can reach this repo. It shares a concurrency group with the weekly refresh, so the two never push at once.

### Adding an official skill

When the Foundation publishes a new skill repo, add an entry to `registry.json → official` (id, repo, dir, title, tagline, category) and run `npm run refresh` — mirror, frontmatter, file tree, and metadata fill in automatically.

### Adding an ecosystem repo

Add an entry to `registry.json → ecosystem` (id, repo, displayName, vendor, type, categories, blurb), plus a path filter in `scripts/refresh.mjs → SKILL_PATHS` if its skills should be auto-discovered. The next `npm run refresh` discovers skills, mirrors them (per the licensing tiers above), downloads the org logo, and slugs everything for detail pages. Repos listed in the Foundation's [awesome-solana-ai](https://github.com/solana-foundation/awesome-solana-ai) are the natural funnel.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

Deploy `dist/` to any static host (Vercel / Cloudflare Pages / Netlify — zero config, no server runtime).

## Design

Follows solana.com branding: black canvas, `#9945FF` → `#14F195` brand gradient, Inter, pill buttons, glass cards. All tokens live in `src/styles/global.css`.

## License

Site code: MIT. Skill content belongs to its authors under their repository licenses (each skill page links to its source and license).
