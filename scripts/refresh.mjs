#!/usr/bin/env node
/**
 * Refresh src/data/registry.json + src/data/skills/ mirrors from GitHub.
 *
 *   node scripts/refresh.mjs          # full refresh (mirrors, trees, metadata, new skills)
 *   node scripts/refresh.mjs --meta   # metadata only (stars, pushed_at) — cheap
 *   node scripts/refresh.mjs --only solana-ai-kit   # one entry (by id), a handful of calls
 *
 * Set GITHUB_TOKEN to raise API rate limits (60/h anonymous → 5000/h; an
 * Actions GITHUB_TOKEN gets 1000/h). Hitting the limit waits for the reset
 * rather than failing the run.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = join(ROOT, "src/data/registry.json");
const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
const metaOnly = process.argv.includes("--meta");
/** --only <id>: refresh just that official/ecosystem/community entry. */
const onlyIdx = process.argv.indexOf("--only");
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;
if (onlyIdx > -1 && !only) throw new Error("--only needs an entry id");
const selected = (id) => !only || id === only;
if (only && ![...registry.official, ...registry.ecosystem].some((e) => e.id === only) &&
    !registry.communityIndex.some((c) => c.repo === only)) {
  throw new Error(`--only ${only}: no such entry`);
}

/** One timestamp per run — every pin taken this run carries the same pinnedAt. */
const RUN_TS = new Date().toISOString();
const sha256 = (data) => createHash("sha256").update(data).digest("hex");

const API_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "skills-solana-com-refresh",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

/** Where each ecosystem repo keeps its canonical skills (path prefix filters). */
const SKILL_PATHS = {
  "sendaifun/skills": {
    include: [/^skills\//],
    // example-skill = template boilerplate; animation-reverse-engineering =
    // generic frontend/motion skill, no Solana content (deliberate — it is the
    // one sendaifun skill solanaskills.com lists that we do not).
    exclude: [/example-skill/, /animation-reverse-engineering/],
  },
  "sendaifun/solana-new": {
    include: [/^skills\//],
    // generic design/video skills — not Solana content
    exclude: [
      /animation-reverse-engineering/, /page-load-animations/, /video-craft/,
      /marketing-video/, /frontend-design-guidelines/, /design-taste/,
      /brand-design/, /number-formatting/,
    ],
  },
  "helius-labs/core-ai": { include: [/^helius-skills\//], exclude: [] },
  "jup-ag/agent-skills": { include: [/^skills\//], exclude: [] },
  "metaplex-foundation/skill": { include: [/^skills\//], exclude: [] },
  "solana-mobile/solana-mobile-dev-skill": { include: [/^/], exclude: [] },
  "quiknode-labs/solana-anchor-claude-skill": { include: [/^skills\//], exclude: [] },
  "quiknode-labs/blockchain-skills": { include: [/^/], exclude: [] },
  "ColosseumOrg/colosseum-copilot": { include: [/^skills\//], exclude: [] },
  "QEDGen/solana-skills": { include: [/^/], exclude: [] },
  "frankcastleauditor/safe-solana-builder": { include: [/^/], exclude: [] },
  "solanabr/solana-game-skill": { include: [/^skill\/SKILL\.md$/], exclude: [/solana-dev-skill/] },
  "magicblock-labs/magicblock-dev-skill": { include: [/^/], exclude: [] },
  "MeteoraAg/meteora-invent": { include: [/^skills\//], exclude: [] },
  "alchemyplatform/skills": { include: [/^skills\//], exclude: [] },
  "phantom/phantom-connect-cursor-plugin": { include: [/^/], exclude: [] },
  "Lightprotocol/skills": { include: [/^/], exclude: [] },
  "DFlowProtocol/dflow_phantom-connect-skill": { include: [/^/], exclude: [] },
  "pump-fun/pump-fun-skills": { include: [/^/], exclude: [] },
  "debridge-finance/debridge-skills": { include: [/^skills\//], exclude: [] },
  "pyth-network/pyth-plugin": { include: [/^skills\//], exclude: [] },
  "okx/onchainos-skills": { include: [/^skills\//], exclude: [] },
  "chainstacklabs/pumpclaw": { include: [/^/], exclude: [] },
  "getpara/para-wallet-skill": { include: [/^/], exclude: [] },
  "berkayoztunc/orquestra": {
    // Skills live in two dirs; packages/frontend ships a generic agent-skills
    // discovery-protocol spec (.well-known) that is not Solana content.
    include: [/^\.claude\/skills\//, /^agents\/skills\//],
    exclude: [],
  },
  "sanbir/solana-auditor-skills": { include: [/^solana-auditor\//], exclude: [] },
  // Scoped indexes: only the Solana-exclusive slice of multichain packs
  // (same precedent as the sendaifun/solana-new exclude list). Extend the
  // whitelist as upstream adds Solana-dedicated skills.
  "agiprolabs/claude-trading-skills": {
    include: [/^skills\/(solana-rpc|jito-bundles|pumpfun-mechanics|helius-api|shredstream)\/SKILL\.md$/],
    exclude: [],
  },
  "ChainGPT-org/chaingpt-claude-skill": {
    include: [/^skills\/(solana|drift)\/SKILL\.md$/],
    exclude: [],
  },
  // The kit's own skills; its packs live under ext/ and are indexed from their
  // own repos. The hub at .claude/skills/SKILL.md and skill-packs only route
  // to packs inside an installed kit, so they are no use on their own.
  "solanabr/ai-kit": { include: [/^\.claude\/skills\/[^/]+\/SKILL\.md$/], exclude: [/^\.claude\/skills\/skill-packs\//] },
  // trailofbits/skills is hand-curated (highlights only)
};

/**
 * Repos whose skills we mirror in full (SKILL.md verbatim + every companion
 * .md) so relative links resolve on this domain — same guarantee as the
 * official skills. Everything else gets a partial mirror: SKILL.md with
 * relative links rewritten to pinned GitHub URLs (companions stay upstream).
 */
const HOSTED_FULL = new Set([
  "sendaifun/skills",
  "sendaifun/solana-new",
  "solanabr/ai-kit",
]);
const ECO_FILES_DIR = join(ROOT, "src/data/eco-skill-files");

const slugify = (s) =>
  (s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");

/** fetch with retry+backoff on network errors — one ETIMEDOUT must not kill a
 * 30-repo refresh run. HTTP status handling stays with the callers. */
async function fetchRetry(url, opts, tries = 3) {
  for (let i = 0; ; i++) {
    try {
      return await fetch(url, opts);
    } catch (e) {
      if (i >= tries - 1) throw e;
      console.warn(`⚠ retry ${i + 1}/${tries - 1} after ${e.cause?.code ?? e.message}: ${url}`);
      await new Promise((r) => setTimeout(r, 1500 * 2 ** i));
    }
  }
}

/** Longest we sleep for a rate-limit reset; the primary window is an hour. */
const MAX_RATE_WAIT_MS = 65 * 60 * 1000;

let apiCalls = 0;
async function gh(path) {
  for (let attempt = 0; ; attempt++) {
    apiCalls++;
    const res = await fetchRetry(`https://api.github.com${path}`, { headers: API_HEADERS });
    if (res.status !== 403 && res.status !== 429) return res.ok ? res.json() : null;
    // A 403 without rate-limit headers is a real permission error.
    const retryAfter = Number(res.headers.get("retry-after"));
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    let waitMs = null;
    if (retryAfter > 0) waitMs = retryAfter * 1000;
    else if (remaining === "0" && reset > 0) waitMs = Math.max(0, reset * 1000 - Date.now()) + 5000;
    else if (res.status === 429) waitMs = 60_000;
    if (waitMs === null) return null;
    if (attempt >= 2 || waitMs > MAX_RATE_WAIT_MS) {
      throw new Error(`GitHub API rate-limited on ${path} — set GITHUB_TOKEN`);
    }
    console.warn(`⚠ rate-limited on ${path} — waiting ${Math.ceil(waitMs / 60000)} min for the reset`);
    await new Promise((r) => setTimeout(r, waitMs));
  }
}

async function raw(repo, branch, path) {
  const res = await fetchRetry(`https://raw.githubusercontent.com/${repo}/${branch}/${path}`);
  return res.ok ? res.text() : null;
}

/** Strip markdown syntax that leaks into one-line descriptions. */
const cleanDescription = (s) =>
  (s ?? "")
    .replace(/^\s*[>|#*-]+\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

function parseFrontmatter(txt) {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  let cur = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      cur = kv[1];
      fm[cur] = kv[2].replace(/^["']|["']$/g, "");
    } else if (cur && /^\s+\S/.test(line)) fm[cur] += " " + line.trim();
  }
  return fm;
}

/**
 * Highest vX.Y.Z tag — what a repo's installer ships, for entries that set
 * `pin: "release-tag"`. GitHub's "latest release" can lag the tags, so it is
 * not used.
 */
async function latestTag(repo) {
  const refs = await gh(`/repos/${repo}/git/matching-refs/tags/v`);
  const tags = (refs ?? [])
    .map((r) => r.ref.replace("refs/tags/", ""))
    .filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
  const num = (t) => t.slice(1).split(".").map(Number);
  tags.sort((a, b) => {
    const [x, y] = [num(a), num(b)];
    return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
  });
  return tags.pop() ?? null;
}

async function repoMeta(repo, pin) {
  const data = await gh(`/repos/${repo}`);
  if (!data) return null;
  const branch = data.default_branch ?? "main";
  let tag = null;
  let head;
  if (pin === "release-tag") {
    tag = await latestTag(repo);
    if (!tag) {
      console.warn(`⚠ ${repo}: no vX.Y.Z tag — pin unchanged`);
      head = null;
    } else {
      const c = await gh(`/repos/${repo}/commits/${tag}`);
      head = c ? { sha: c.sha, date: c.commit?.committer?.date ?? null } : null;
    }
  } else {
    const b = await gh(`/repos/${repo}/branches/${branch}`);
    head = b ? { sha: b.commit?.sha, date: b.commit?.commit?.committer?.date ?? null } : null;
  }
  return {
    stars: data.stargazers_count ?? null,
    pushedAt: data.pushed_at?.slice(0, 10) ?? null,
    license: data.license?.spdx_id ?? null,
    description: data.description ?? null,
    branch,
    tag,
    commitSha: head?.sha ?? null,
    commitDate: head?.date ?? null,
  };
}

/**
 * Figures read from a Claude Code kit at its pin, for entries that set
 * `kitStats: true`: agents and commands are the .md files in .claude/agents
 * and .claude/commands, packs the core + extension entries of the kit's skill
 * registry. They fill the {placeholders} in the entry's `blurbTemplate`.
 */
async function kitStats(repo, ref, tree) {
  const count = (dir) =>
    tree.tree.filter((n) => n.type === "blob" && new RegExp(`^${dir.replaceAll(".", "\\.")}/[^/]+\\.md$`).test(n.path)).length;
  const json = async (path) => {
    const txt = await raw(repo, ref, path);
    try {
      return txt ? JSON.parse(txt) : null;
    } catch {
      return null;
    }
  };
  const version = (await raw(repo, ref, ".claude/VERSION"))?.trim().split(/\s+/).pop() ?? null;
  const mcp = await json(".mcp.json");
  const reg = await json(".claude/skills/skill-registry.json");
  const entries = reg?.entries ?? [];
  const stats = {
    version,
    agents: count(".claude/agents"),
    commands: count(".claude/commands"),
    mcpServers: mcp ? Object.keys(mcp.mcpServers ?? {}).length : null,
    corePacks: entries.filter((e) => e.tier === "core").length,
    extensionPacks: entries.filter((e) => e.tier === "extension").length,
  };
  stats.packs = stats.corePacks + stats.extensionPacks;
  const missing = Object.entries(stats).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) throw new Error(`${repo}@${ref.slice(0, 7)}: kit stats unreadable (${missing.join(", ")})`);
  return stats;
}

const fillTemplate = (tpl, vars) =>
  tpl.replace(/\{(\w+)\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`blurbTemplate: unknown placeholder ${m}`);
    return String(vars[k]);
  });

/** Extract the skill directory from a github tree/blob URL regardless of ref. */
const dirFromUrl = (url) => url.match(/\/tree\/[^/]+\/(.*)$/)?.[1] ?? null;

const treeCache = new Map();
/** Recursive git tree at a ref (sha or branch), cached per repo@ref. */
function treeAt(repo, ref) {
  const key = `${repo}@${ref}`;
  if (!treeCache.has(key)) {
    treeCache.set(key, gh(`/repos/${repo}/git/trees/${ref}?recursive=1`));
  }
  return treeCache.get(key);
}

const commitDateCache = new Map();
/** Committer date of an arbitrary ref — one API call per repo@ref, cached. */
function commitDateAt(repo, ref) {
  const key = `${repo}@${ref}`;
  if (!commitDateCache.has(key)) {
    commitDateCache.set(
      key,
      gh(`/repos/${repo}/commits/${ref}`).then((d) => d?.commit?.committer?.date ?? null)
    );
  }
  return commitDateCache.get(key);
}

const authorCache = new Map();
/**
 * GitHub login that last touched a file as of the pinned ref. Login only —
 * unlinked commit emails yield null rather than an unverifiable display name.
 */
function lastAuthorAt(repo, ref, path) {
  const key = `${repo}@${ref}:${path}`;
  if (!authorCache.has(key)) {
    authorCache.set(
      key,
      gh(`/repos/${repo}/commits?sha=${ref}&path=${encodeURIComponent(path)}&per_page=1`).then(
        (d) => d?.[0]?.author?.login ?? null
      )
    );
  }
  return authorCache.get(key);
}

/**
 * Rewrite relative markdown links/images/reference-defs to absolute URLs
 * against `base`. Skips fenced code blocks and inline code spans so example
 * snippets survive untouched.
 */
function rewriteRelativeLinks(txt, base) {
  const isRel = (u) => !!u && !/^([a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(u);
  const resolve = (u) => {
    try {
      return new URL(u, base).href;
    } catch {
      return u;
    }
  };
  let inFence = false;
  return txt
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) => {
          if (i % 2 === 1) return part; // inline code span
          return part
            .replace(
              /(!?\[[^\]]*\]\()\s*<?([^)\s>]+)>?((?:\s+"[^"]*")?\s*\))/g,
              (m, pre, url, post) => (isRel(url) ? `${pre}${resolve(url)}${post}` : m)
            )
            .replace(/^(\s*\[[^\]]+\]:\s*)(\S+)/, (m, pre, url) =>
              isRel(url) ? `${pre}${resolve(url)}` : m
            );
        })
        .join("");
    })
    .join("\n");
}

/** Partial mirror: verbatim body, but relative links resolve to pinned GitHub. */
function partialMirror(txt, repo, ref, dir) {
  const base = `https://github.com/${repo}/blob/${ref}/${dir ? `${dir}/` : ""}`;
  const rewritten = rewriteRelativeLinks(txt, base);
  // A path containing "-->" must not terminate the provenance comment early.
  const safeBase = `${base}SKILL.md`.replaceAll("-->", "");
  const note = `<!--\n  Mirror of ${safeBase} hosted by skills.solana.com.\n  Relative links were rewritten to GitHub URLs pinned to the mirrored commit —\n  companion files are not hosted here; the upstream repo is the source of truth.\n-->\n\n`;
  const fm = rewritten.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return fm ? fm[0] + "\n" + note + rewritten.slice(fm[0].length) : note + rewritten;
}

/**
 * Mirror an ecosystem repo's indexed skills for on-site hosting + detail
 * pages. Mirrors from each skill's *pinned* URL ref (url ↔ mirror always
 * agree). Repos without a real license are never republished (links only).
 */
async function mirrorEcoSkills(eco) {
  const repoDir = join(ECO_FILES_DIR, eco.id);
  rmSync(repoDir, { recursive: true, force: true });
  const fullHost = HOSTED_FULL.has(eco.repo);
  const licensed = !!eco.license;
  if (!licensed) console.warn(`⚠ ${eco.id}: no upstream license — skills linked, not mirrored`);
  const seen = new Set();
  let hosted = 0;
  for (const s of eco.skills) {
    delete s.hostedPath;
    delete s.hostedFiles;
    delete s.integrity;
    s.hosted = false;
    // Two upstream shapes: a skill directory (…/tree/<ref>/<dir>, SKILL.md
    // inside) or a single flat file (…/blob/<ref>/<path>.md).
    const treeM = s.url.match(/\/tree\/([^/]+)\/?(.*)$/);
    const blobM = s.url.match(/\/blob\/([^/]+)\/(.+\.md)$/);
    if (!treeM && !blobM) {
      console.warn(`⚠ ${eco.id}/${s.name}: unparsable url ${s.url}`);
      continue;
    }
    const ref = (treeM ?? blobM)[1];
    const skillFilePath = blobM
      ? blobM[2]
      : `${treeM[2].replace(/\/$/, "") ? `${treeM[2].replace(/\/$/, "")}/` : ""}SKILL.md`;
    const dir = blobM
      ? skillFilePath.split("/").slice(0, -1).join("/")
      : treeM[2].replace(/\/$/, "");
    s.dir = dir;
    let slug = slugify(s.name) || slugify(dir.split("/").pop()) || "skill";
    while (seen.has(slug)) slug = `${slug}-2`;
    seen.add(slug);
    s.slug = slug;

    // Per-skill pin: the ref inside the url is the truth (hand-curated repos
    // may lag the repo HEAD). A non-sha ref is a mutable pin — flag it.
    const shaPinned = /^[0-9a-f]{40}$/i.test(ref);
    if (!shaPinned) console.warn(`⚠ ${eco.id}/${s.name}: url ref "${ref}" is not a commit sha — mutable pin`);
    s.commitSha = shaPinned ? ref : (eco.commitSha ?? null);
    s.commitDate = !s.commitSha
      ? null
      : s.commitSha === eco.commitSha && eco.commitDate
        ? eco.commitDate
        : await commitDateAt(eco.repo, s.commitSha);
    // The author of an unchanged SKILL.md is unchanged: reuse it instead of
    // spending one API call per skill per run, which is what exhausted the
    // Actions token's hourly budget.
    const tree0 = blobM ? null : await treeAt(eco.repo, ref);
    const blobSha = tree0?.tree?.find((n) => n.path === skillFilePath)?.sha ?? null;
    if (!(blobSha && s.blobSha === blobSha && s.lastAuthor !== undefined)) {
      s.lastAuthor = await lastAuthorAt(eco.repo, ref, skillFilePath);
    }
    s.blobSha = blobSha;

    const txt = await raw(eco.repo, ref, skillFilePath);
    if (!txt) {
      console.warn(`⚠ ${eco.id}/${s.name}: ${skillFilePath} unreachable at ${ref.slice(0, 7)}`);
      continue;
    }
    s.bytes = Buffer.byteLength(txt);
    s.words = txt.replace(/^---[\s\S]*?---\s*/, "").split(/\s+/).length;

    if (blobM) {
      s.files = [];
      s.multiFile = false;
    }
    const tree = blobM ? null : await treeAt(eco.repo, ref);
    if (tree?.tree) {
      const prefix = dir ? `${dir}/` : "";
      s.files = tree.tree
        .filter(
          (n) =>
            n.path.startsWith(prefix) &&
            n.path !== `${prefix}SKILL.md` &&
            n.path.slice(prefix.length) !== "" &&
            !n.path.slice(prefix.length).startsWith(".")
        )
        .map((n) => n.path.slice(prefix.length) + (n.type === "tree" ? "/" : ""))
        .filter((p) => (dir ? true : !/^(README|LICENSE|\.)/i.test(p)))
        .sort();
      s.multiFile = s.files.some((f) => !f.endsWith("/"));
    }

    if (!licensed) continue;
    try {
      matter(txt); // Astro's content layer parses this — reject what would break the build
    } catch (e) {
      console.warn(`⚠ ${eco.id}/${slug}: malformed frontmatter — not hosting (${e.message})`);
      continue;
    }

    const destDir = join(repoDir, slug);
    mkdirSync(destDir, { recursive: true });
    s.hostedFiles = [];
    s.integrity = {};
    if (fullHost) {
      writeFileSync(join(destDir, "SKILL.md"), txt);
      s.integrity["SKILL.md"] = sha256(txt);
      const companions = (s.files ?? []).filter((f) => f.endsWith(".md"));
      for (const rel of companions) {
        const body = await raw(eco.repo, ref, `${dir ? `${dir}/` : ""}${rel}`);
        if (!body) {
          console.warn(`⚠ ${eco.id}/${slug}: companion missing ${rel}`);
          continue;
        }
        const dest = join(destDir, rel);
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, body);
        s.hostedFiles.push(rel);
        s.integrity[rel] = sha256(body);
      }
    } else {
      const mirrored = partialMirror(txt, eco.repo, ref, dir);
      writeFileSync(join(destDir, "SKILL.md"), mirrored);
      s.integrity["SKILL.md"] = sha256(mirrored);
    }
    s.hosted = true;
    s.hostedPath = `/s/${eco.id}/${slug}/SKILL.md`;
    hosted++;
  }
  return hosted;
}

// ---------- official: metadata + verbatim mirrors + file trees ----------
for (const skill of registry.official) {
  if (!selected(skill.id)) continue;
  const meta = await repoMeta(skill.repo, skill.pin);
  if (!meta) {
    console.warn(`⚠ ${skill.repo}: repo metadata unavailable`);
    continue;
  }
  skill.stars = meta.stars;
  skill.pushedAt = meta.pushedAt;
  skill.branch = meta.branch;
  if (metaOnly) continue;
  if (meta.license && meta.license !== "NOASSERTION") skill.license = meta.license;

  // Fail closed: the pin (commitSha/commitDate/pinnedAt) is only committed
  // AFTER the mirror content is fetched at it, so a recorded sha always
  // describes exactly what was mirrored — any fetch failure below leaves the
  // previous pin, mirror, URLs, and integrity untouched as a matching set.
  // Never fall back to a mutable branch ref: an unresolvable head skips the
  // repo instead of silently reverting to pre-pinning behavior.
  if (!meta.commitSha) {
    console.warn(`⚠ ${skill.repo}: branch head unresolvable — skipped, pin unchanged`);
    continue;
  }
  const pin = meta.commitSha;

  const tree = await gh(`/repos/${skill.repo}/git/trees/${pin}?recursive=1`);
  if (!tree?.tree) {
    console.warn(`⚠ ${skill.repo}: git tree unavailable at ${pin.slice(0, 7)} — skipped, pin unchanged`);
    continue;
  }
  const skillFiles = tree.tree
    .map((n) => n.path)
    .filter((p) => p.endsWith("SKILL.md"));

  // Auto-heal upstream restructures: if the recorded dir no longer holds a
  // SKILL.md, adopt the tree's actual location (prefer a path containing the id).
  let dirPart = skill.dir ? `${skill.dir}/` : "";
  if (!skillFiles.includes(`${dirPart}SKILL.md`) && skillFiles.length > 0) {
    const next =
      skillFiles.find((p) => p.includes(skill.id)) ??
      skillFiles.find((p) => p.includes(skill.name)) ??
      (skillFiles.length === 1 ? skillFiles[0] : null);
    if (next) {
      skill.dir = next.replace(/\/?SKILL\.md$/, "");
      dirPart = skill.dir ? `${skill.dir}/` : "";
      console.warn(`⚠ ${skill.repo}: SKILL.md moved — dir now "${skill.dir}"`);
    }
  }

  const txt = await raw(skill.repo, pin, `${dirPart}SKILL.md`);
  if (!txt) {
    console.warn(`⚠ ${skill.repo}: SKILL.md not found at ${dirPart}SKILL.md — skipped, pin unchanged`);
    continue;
  }
  // Content fetched at the pin — now (and only now) advance the pin with it.
  skill.commitSha = pin;
  skill.commitDate = meta.commitDate;
  skill.pinnedAt = RUN_TS;
  writeFileSync(join(ROOT, "src/data/skills", `${skill.id}.md`), txt);
  skill.integrity = { "SKILL.md": sha256(txt) };
  skill.lastAuthor = await lastAuthorAt(skill.repo, pin, `${dirPart}SKILL.md`);
  skill.hostedPath = `/s/${skill.id}/SKILL.md`;
  const skillBlob = tree.tree.find((n) => n.path === `${dirPart}SKILL.md`);
  skill.bytes = skillBlob?.size ?? txt.length;
  const fm = parseFrontmatter(txt);
  if (fm.name) skill.name = fm.name;
  if (fm.description) skill.description = fm.description;
  if (fm.compatibility) skill.compatibility = fm.compatibility;
  const version = (fm.metadata || "").match(/version:\s*"?([\d.]+)"?/)?.[1];
  if (version) skill.version = version;
  skill.words = txt.replace(/^---[\s\S]*?---\s*/, "").split(/\s+/).length;

  {
    const prefix = skill.dir ? `${skill.dir}/` : "";
    skill.files = tree.tree
      .filter(
        (n) =>
          n.path.startsWith(prefix) &&
          n.path !== `${prefix}SKILL.md` &&
          !n.path.slice(prefix.length).startsWith(".")
      )
      .map((n) => n.path.slice(prefix.length) + (n.type === "tree" ? "/" : ""))
      .filter((p) => (skill.dir ? true : !/^(README|LICENSE|\.)/i.test(p)))
      .sort();
    skill.multiFile = skill.files.some((f) => !f.endsWith("/"));

    // Mirror companion .md files so the whole skill is consumable from this
    // domain: /s/<id>/SKILL.md + /s/<id>/<relpath> (relative links resolve).
    const skillFilesDir = join(ROOT, "src/data/skill-files", skill.id);
    rmSync(skillFilesDir, { recursive: true, force: true });
    skill.hostedFiles = [];
    let refsBytes = 0;
    const companions = skill.files.filter((f) => !f.endsWith("/") && f.endsWith(".md"));
    for (const rel of companions) {
      const body = await raw(skill.repo, pin, `${prefix}${rel}`);
      if (!body) {
        console.warn(`⚠ ${skill.repo}: companion missing ${rel}`);
        continue;
      }
      const dest = join(skillFilesDir, rel);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, body);
      skill.hostedFiles.push(rel);
      skill.integrity[rel] = sha256(body);
      refsBytes += Buffer.byteLength(body);
    }
    skill.refsBytes = refsBytes;
  }
  const dirUrl = skill.dir ? `/${skill.dir}` : "";
  skill.githubUrl = `https://github.com/${skill.repo}/tree/${pin}${dirUrl}`;
  skill.skillFileUrl = `https://github.com/${skill.repo}/blob/${pin}${dirUrl}/SKILL.md`;
  skill.rawUrl = `https://raw.githubusercontent.com/${skill.repo}/${pin}${dirUrl}/SKILL.md`;
  console.log(`✓ official ${skill.id} (${skill.words} words, ${skill.files.length} files)`);
}

// ---------- ecosystem: metadata + new-skill discovery ----------
const skippedNoName = [];
for (const eco of registry.ecosystem) {
  if (!selected(eco.id)) continue;
  const meta = await repoMeta(eco.repo, eco.pin);
  if (!meta) {
    console.warn(`⚠ ${eco.repo}: repo metadata unavailable`);
    continue;
  }
  eco.stars = meta.stars;
  eco.pushedAt = meta.pushedAt;
  if (metaOnly) {
    console.log(`✓ eco ${eco.id} (meta only — pin, license, and hosting unchanged)`);
    continue;
  }
  // License changes only apply on full runs: hosting decisions are made here,
  // so a meta-only run must never flip a repo to unlicensed while its mirrors
  // stay published (or vice versa).
  eco.license = meta.license === "NOASSERTION" ? null : meta.license;
  eco.description = meta.description;
  // Fail closed, as with official skills: never fall back to a branch ref,
  // and advance the repo pin only once the tree it describes is in hand.
  if (!meta.commitSha) {
    console.warn(`⚠ ${eco.repo}: branch head unresolvable — skipped, pin unchanged`);
    continue;
  }
  const ref = meta.commitSha;
  const pinnedUrl = (dir) =>
    dir ? `https://github.com/${eco.repo}/tree/${ref}/${dir}` : `https://github.com/${eco.repo}/tree/${ref}`;
  const filters = SKILL_PATHS[eco.repo];

  let dropped = 0;
  if (filters) {
    const tree = await treeAt(eco.repo, ref);
    if (!tree?.tree) {
      console.warn(`⚠ ${eco.repo}: git tree unavailable at ${ref.slice(0, 7)} — skipped, pin unchanged`);
      continue;
    }
    if (eco.kitStats) {
      eco.stats = await kitStats(eco.repo, ref, tree);
      if (eco.blurbTemplate) eco.blurb = fillTemplate(eco.blurbTemplate, eco.stats);
    }
    eco.commitSha = ref;
    eco.commitDate = meta.commitDate;
    eco.pinnedAt = RUN_TS;
    eco.tag = meta.tag ?? undefined;
    const skillPaths = tree.tree
      .map((n) => n.path)
      .filter((p) => p.endsWith("SKILL.md"))
      .filter((p) => filters.include.some((re) => re.test(p)))
      .filter((p) => !filters.exclude.some((re) => re.test(p)));

    const known = new Map(eco.skills.map((s) => [dirFromUrl(s.url) ?? "", s]));
    const nextSkills = [];
    let added = 0;
    for (const path of skillPaths) {
      const dir = path.replace(/\/SKILL\.md$/, "").replace(/^SKILL\.md$/, "");
      const existing = known.get(dir);
      if (existing) {
        nextSkills.push({ ...existing, url: pinnedUrl(dir) });
        continue;
      }
      const txt = await raw(eco.repo, ref, path);
      if (!txt) continue;
      const fm = parseFrontmatter(txt);
      if (!fm.name) {
        skippedNoName.push(`${eco.repo}/${path}`);
        continue;
      }
      if (nextSkills.some((s) => s.name === fm.name)) continue; // same skill vendored at two paths
      nextSkills.push({
        name: fm.name,
        description: cleanDescription(fm.description),
        category: null, // curate by hand — auto-bucketing everything as "development" pollutes filters
        url: pinnedUrl(dir),
        multiFile: dir !== "" && tree.tree.some((n) => n.path.startsWith(`${dir}/`) && n.path !== path),
      });
      added++;
      console.log(`  + new skill ${eco.id}/${fm.name} (category: curate me)`);
    }
    dropped = eco.skills.length + added - nextSkills.length;
    eco.skills = nextSkills;
    if (!eco.highlightsOnly) eco.skillCount = nextSkills.length;
  } else {
    // Hand-curated repos: skills carry their own (possibly older) pins; the
    // repo-level pin is a verified-HEAD stamp, not an indexed-at claim.
    eco.commitSha = ref;
    eco.commitDate = meta.commitDate;
    eco.pinnedAt = RUN_TS;
  }

  const hosted = await mirrorEcoSkills(eco);
  console.log(
    `✓ eco ${eco.id} (${eco.skills.length} skills, ${hosted} mirrored${dropped > 0 ? `, ${dropped} dropped — review` : ""})`
  );
}

// ---------- community index: link-only entries get pinned too ----------
// No mirror exists for these, so the pin is a verification stamp: the commit
// that was HEAD when we last confirmed the repo is alive and what it claims.
for (const c of registry.communityIndex) {
  if (!selected(c.repo)) continue;
  const meta = await repoMeta(c.repo);
  if (!meta) {
    console.warn(`⚠ community ${c.repo}: repo metadata unavailable`);
    continue;
  }
  c.stars = meta.stars;
  c.pushedAt = meta.pushedAt;
  if (metaOnly || !meta.commitSha) continue; // pins advance on full runs only
  c.commitSha = meta.commitSha;
  c.commitDate = meta.commitDate;
  c.pinnedAt = RUN_TS;
}
console.log(`✓ community index ${metaOnly ? "refreshed (meta only)" : "pinned"} (${registry.communityIndex.length} repos)`);

// ---------- logos: GitHub org/user avatars, self-hosted ----------
const owners = new Set(
  [
    ...registry.official.map((s) => s.repo),
    ...registry.ecosystem.map((e) => e.repo),
    ...registry.communityIndex.map((c) => c.repo),
  ].map((repo) => repo.split("/")[0])
);
const LOGO_DIR = join(ROOT, "public/logos");
mkdirSync(LOGO_DIR, { recursive: true });
for (const owner of owners) {
  const dest = join(LOGO_DIR, `${owner}.png`);
  try {
    const res = await fetchRetry(`https://github.com/${owner}.png?size=128`, {
      headers: { "User-Agent": API_HEADERS["User-Agent"] },
    });
    if (res.ok && (res.headers.get("content-type") ?? "").startsWith("image/")) {
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    } else if (!existsSync(dest)) {
      console.warn(`⚠ logo unavailable for ${owner}`);
    }
  } catch {
    if (!existsSync(dest)) console.warn(`⚠ logo fetch failed for ${owner}`);
  }
}
const logoFor = (repo) => {
  const owner = repo.split("/")[0];
  return existsSync(join(LOGO_DIR, `${owner}.png`)) ? `/logos/${owner}.png` : null;
};
for (const s of registry.official) s.logo = logoFor(s.repo);
for (const e of registry.ecosystem) e.logo = logoFor(e.repo);
for (const c of registry.communityIndex) c.logo = logoFor(c.repo);
console.log(`✓ logos for ${owners.size} orgs`);

if (!only) registry.updated = new Date().toISOString().slice(0, 10);
// must never be fresher than the pins it describes — a single-entry run leaves the rest as they were
if (!metaOnly && !only) registry.pinnedAt = RUN_TS;
writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

// Legacy flat URLs 301 to dir-style hosting (Cloudflare/Netlify; Vercel uses vercel.json).
writeFileSync(
  join(ROOT, "public/_redirects"),
  registry.official.map((s) => `/s/${s.id}.md /s/${s.id}/SKILL.md 301`).join("\n") + "\n"
);
if (skippedNoName.length > 0) {
  console.warn(
    `\n⚠ SKIPPED — SKILL.md without a frontmatter name (fix upstream or exclude):\n  ${skippedNoName.join("\n  ")}`
  );
}
console.log(`\nDone — ${apiCalls} GitHub API calls. Registry updated: ${registry.updated}`);
