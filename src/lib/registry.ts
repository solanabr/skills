import registryJson from "../data/registry.json";

export interface OfficialSkill {
  id: string;
  name: string;
  title: string;
  tagline: string;
  /** Human-written blurb; `description` is the agent trigger string. */
  summary?: string;
  description: string;
  category: string;
  commitSha?: string | null;
  /** Committer date of the pinned commit (ISO 8601). */
  commitDate?: string | null;
  /** When this pin was taken by a refresh run (ISO 8601). */
  pinnedAt?: string | null;
  /** sha256 (hex) of every file hosted on this domain, keyed by relative path. */
  integrity?: Record<string, string>;
  /** GitHub login that last touched SKILL.md as of the pin (null if unlinked). */
  lastAuthor?: string | null;
  bytes?: number;
  refsBytes?: number;
  repo: string;
  branch: string;
  dir: string;
  /** SPDX id GitHub detects upstream; null when the repo declares none. */
  license: string | null;
  version: string | null;
  compatibility: string | null;
  multiFile: boolean;
  files: string[];
  hostedFiles?: string[];
  logo?: string | null;
  words: number;
  githubUrl: string;
  skillFileUrl: string;
  rawUrl: string;
  hostedPath: string;
  stars: number | null;
  pushedAt: string | null;
  contributors?: string[];
}

export interface EcosystemSkill {
  name: string;
  description: string;
  category: string | null;
  url: string;
  multiFile: boolean;
  /** The commit this skill was indexed at — parsed from `url`'s pinned ref. */
  commitSha?: string | null;
  /** Committer date of the pinned commit (ISO 8601). */
  commitDate?: string | null;
  /** sha256 (hex) of files mirrored on this domain, keyed by relative path. */
  integrity?: Record<string, string>;
  /** GitHub login that last touched SKILL.md as of the pin (null if unlinked). */
  lastAuthor?: string | null;
  /** URL-safe id — set by refresh; pages/hosting exist only when present. */
  slug?: string;
  /** Path of the skill dir inside the upstream repo ("" = repo root). */
  dir?: string;
  /** SKILL.md mirrored on this domain (licensed repos only). */
  hosted?: boolean;
  hostedPath?: string;
  /** Companion .md files also mirrored (full-host repos only). */
  hostedFiles?: string[];
  /** Every file in the skill dir upstream (dirs end with /). */
  files?: string[];
  words?: number;
  bytes?: number;
}

export interface EcosystemRepo {
  id: string;
  repo: string;
  displayName: string;
  vendor: string;
  type: "aggregator" | "toolkit" | "vendor" | "community";
  homepage: string | null;
  categories: string[];
  blurb: string;
  /** Rendered into `blurb` by refresh from `stats` ({version}, {agents}, …). */
  blurbTemplate?: string;
  url: string;
  /** The repo's own installer, when it has one; else `npx skills add`. */
  install?: string;
  /** "release-tag" pins the highest vX.Y.Z tag instead of the branch head. */
  pin?: "release-tag";
  /** Read agent/command/MCP/pack counts from a Claude Code kit at the pin. */
  kitStats?: boolean;
  stats?: {
    version: string;
    agents: number;
    commands: number;
    mcpServers: number;
    corePacks: number;
    extensionPacks: number;
    packs: number;
  };
  /** Release tag the pin resolves to (pin: "release-tag" only). */
  tag?: string;
  stars: number | null;
  pushedAt: string | null;
  commitSha?: string | null;
  commitDate?: string | null;
  pinnedAt?: string | null;
  license: string | null;
  description: string | null;
  skillCount: number;
  highlightsOnly: boolean;
  /** Self-hosted GitHub org avatar, e.g. /logos/sendaifun.png. */
  logo?: string | null;
  contributors?: string[];
  skills: EcosystemSkill[];
}

export interface FoundationResource {
  name: string;
  repo: string;
  url: string;
  description: string;
  kind: string;
}

export interface CommunityEntry {
  name: string;
  repo: string;
  description: string;
  logo?: string | null;
  stars?: number | null;
  pushedAt?: string | null;
  /** Verification stamp: upstream HEAD when we last confirmed the repo. */
  commitSha?: string | null;
  commitDate?: string | null;
  pinnedAt?: string | null;
}

export interface SuperteamSubskill {
  kind: "skill" | "command" | "agent";
  /** Path without SKILL.md/.md, e.g. skills/pitch-deck or commands/hunt. */
  slug: string;
  path: string;
  name: string;
  description: string | null;
  /** The skill directory's own reference files (skill subskills only). */
  files: string[];
}

export interface InstallOption {
  label: string;
  note: string;
  commands: string[];
  /** false: commands typed in the agent (e.g. /plugin), so no $ prompt. */
  prompt?: boolean;
}

/** A Superteam Brasil skill: mirrored whole, with a page per subskill. */
export interface SuperteamEntry {
  id: string;
  repo: string;
  displayName: string;
  tagline: string;
  summary: string;
  category: string;
  /** Rendered on the skill's page: SKILL.md, or README.md for a skill set. */
  main: string | null;
  kitPack: string;
  kitTier: "core" | "extension";
  install: InstallOption[];
  url: string;
  stars: number | null;
  pushedAt: string | null;
  license: string | null;
  description: string | null;
  commitSha?: string | null;
  commitDate?: string | null;
  pinnedAt?: string | null;
  tag?: string;
  logo?: string | null;
  contributors?: string[];
  /** Every mirrored .md, relative to the repo root; served at /s/<id>/<path>. */
  files: string[];
  integrity: Record<string, string>;
  subskills: SuperteamSubskill[];
  counts: Record<string, number>;
  words: number | null;
}

export interface Registry {
  updated: string;
  /** Timestamp of the refresh run that took the current pins (ISO 8601). */
  pinnedAt?: string;
  official: OfficialSkill[];
  superteam: SuperteamEntry[];
  ecosystem: EcosystemRepo[];
  foundationResources: FoundationResource[];
  communityIndex: CommunityEntry[];
}

export const registry = registryJson as unknown as Registry;
export const SITE_URL = "https://skills.solana.com";

export const CATEGORY_LABELS: Record<string, string> = {
  development: "Development",
  migration: "Migration",
  defi: "DeFi & Trading",
  "nft-tokens": "NFTs & Tokens",
  "infra-data": "Infra & Data",
  "wallets-mobile": "Wallets & Mobile",
  security: "Security",
  gaming: "Gaming",
  research: "Ideas & Launch",
};

/** Skills actually browsable on this site (not upstream marketing totals). */
export const totalSkills = () =>
  registry.official.length +
  registry.superteam.reduce(
    (n, s) => n + (s.main === "SKILL.md" ? 1 : 0) + s.subskills.filter((x) => x.kind === "skill").length,
    0,
  ) +
  registry.ecosystem.reduce((n, r) => n + r.skills.length, 0);

/** Distinct GitHub contributors across every repo the site indexes. */
export const contributorCount = () =>
  new Set(
    [...registry.official, ...registry.superteam, ...registry.ecosystem].flatMap(
      (e) => e.contributors ?? [],
    ),
  ).size;

/** The Solana AI Kit's ecosystem entry: its stats feed the Superteam pages. */
export const kitEntry = () => registry.ecosystem.find((e) => e.id === "solana-ai-kit");

export const superteamPage = (s: SuperteamEntry, sub?: SuperteamSubskill) =>
  sub ? `/superteam/${s.id}/${sub.slug}` : `/superteam/${s.id}`;

/** Where a mirrored Superteam file is served, site-relative. */
export const superteamFileUrl = (s: SuperteamEntry, path: string) => `/s/${s.id}/${path}`;

/** The file on GitHub at the pinned commit. */
export const superteamGithubUrl = (s: SuperteamEntry, path: string) =>
  `https://github.com/${s.repo}/blob/${s.commitSha ?? "HEAD"}/${path}`;

/** A readable name from a mirrored file's path: a skill directory's name, or the file name without its number. */
export function fileTitle(path: string): string {
  const base = (path.split("/").pop() ?? path).replace(/\.md$/, "");
  return base === "SKILL" ? (path.split("/").slice(-2, -1)[0] ?? base) : base.replace(/^\d+[-_]/, "").replace(/[-_]/g, " ");
}

/**
 * Whole-skill-dir install pinned to the indexed commit. degit cannot resolve
 * an arbitrary sha (it only matches ls-remote ref tips, so `#<sha>` breaks as
 * soon as upstream pushes); GitHub's codeload tarball endpoint resolves any
 * commit. Falls back to degit@HEAD only when no pin is recorded.
 */
function pinnedDirInstall(
  repo: string,
  dir: string | undefined,
  sha: string | null | undefined,
  dest: string,
): string {
  if (!sha) return `npx degit ${repo}${dir ? `/${dir}` : ""} ${dest}`;
  const prefix = `${repo.split("/")[1]}-${sha}${dir ? `/${dir}` : ""}`;
  const strip = 1 + (dir ? dir.split("/").length : 0);
  return `mkdir -p ${dest} && curl -fsSL https://codeload.github.com/${repo}/tar.gz/${sha} | tar -xz -C ${dest} --strip-components=${strip} ${prefix}`;
}

export function installCommands(skill: OfficialSkill) {
  const hosted = `${SITE_URL}${skill.hostedPath}`;
  return {
    cli: `npx skills add ${skill.repo}`,
    claudeGlobal: `mkdir -p ~/.claude/skills/${skill.name} && curl -fsSL ${hosted} -o ~/.claude/skills/${skill.name}/SKILL.md`,
    claudeProject: `mkdir -p .claude/skills/${skill.name} && curl -fsSL ${hosted} -o .claude/skills/${skill.name}/SKILL.md`,
    git: pinnedDirInstall(
      skill.repo,
      skill.dir,
      skill.commitSha,
      `.claude/skills/${skill.name}`,
    ),
    noInstall: `Read ${hosted} and apply it to this task: `,
    hosted,
  };
}

export function repoInstallCommand(repo: EcosystemRepo): string {
  return repo.install ?? `npx skills add ${repo.repo}`;
}

/** Convert a pinned github tree/blob URL into a raw SKILL.md URL agents can fetch. */
export function rawSkillUrl(treeUrl: string): string {
  const raw = treeUrl
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace(/\/(tree|blob)\//, "/");
  return treeUrl.includes("/blob/") ? raw : `${raw}/SKILL.md`;
}

/** On-site detail page for an indexed ecosystem skill (slug set by refresh). */
export function ecoSkillPage(
  repo: EcosystemRepo,
  skill: EcosystemSkill,
): string | null {
  return skill.slug ? `/skills/${repo.id}/${skill.slug}` : null;
}

export function ecoInstallCommands(repo: EcosystemRepo, skill: EcosystemSkill) {
  const hosted = skill.hostedPath ? `${SITE_URL}${skill.hostedPath}` : null;
  const rawGithub = rawSkillUrl(skill.url);
  const fetchable = hosted ?? rawGithub;
  return {
    cli: `npx skills add ${repo.repo}`,
    oneShot: `npx skills use ${repo.repo}@${skill.name}`,
    claudeGlobal: `mkdir -p ~/.claude/skills/${skill.name} && curl -fsSL ${fetchable} -o ~/.claude/skills/${skill.name}/SKILL.md`,
    claudeProject: `mkdir -p .claude/skills/${skill.name} && curl -fsSL ${fetchable} -o .claude/skills/${skill.name}/SKILL.md`,
    git: pinnedDirInstall(
      repo.repo,
      skill.dir,
      skill.commitSha,
      `.claude/skills/${skill.name}`,
    ),
    hosted,
    rawGithub,
    fetchable,
  };
}
