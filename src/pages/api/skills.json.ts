import type { APIRoute } from "astro";
import {
  registry,
  SITE_URL,
  CATEGORY_LABELS,
  totalSkills,
  rawSkillUrl,
} from "../../lib/registry";

// Stable machine-readable index of everything the site knows about.
export const GET: APIRoute = () => {
  const payload = {
    schemaVersion: 1,
    name: "Solana Skills",
    url: SITE_URL,
    generated: registry.updated,
    pinnedAt: registry.pinnedAt ?? null,
    // Shipped as a field (not just this comment) so API consumers see it.
    provenance:
      "Each skill's own commit is the immutable git sha its links and mirror were built from (commitDate = upstream committer date); a repo-level commit is the upstream head we last verified, which can be newer than the skills' pins on hand-curated repos. Mirrors hosted on this domain publish integrity (hex sha256 per served file — verify with: curl -fsSL <hosted-url> | sha256sum). All advertised raw/github links are pinned to a skill's commit, never to a branch.",
    counts: {
      official: registry.official.length,
      ecosystemRepos: registry.ecosystem.length,
      skillsIndexed: totalSkills(),
      communityIndex: registry.communityIndex.length,
    },
    categories: CATEGORY_LABELS,
    official: registry.official.map((s) => ({
      id: s.id,
      name: s.name,
      title: s.title,
      summary: s.summary ?? s.tagline,
      description: s.description,
      category: s.category,
      repo: s.repo,
      license: s.license,
      version: s.version,
      multiFile: s.multiFile,
      bytes: s.bytes ?? null,
      refsBytes: s.refsBytes ?? null,
      page: `${SITE_URL}/skills/${s.id}`,
      hosted: `${SITE_URL}${s.hostedPath}`,
      hostedDir: `${SITE_URL}/s/${s.id}/`,
      hostedFiles: s.hostedFiles ?? [],
      commit: s.commitSha,
      commitDate: s.commitDate ?? null,
      pinnedAt: s.pinnedAt ?? null,
      integrity: s.integrity ?? null,
      lastAuthor: s.lastAuthor ?? null,
      sourceUpdated: s.pushedAt,
      raw: s.rawUrl,
      github: s.githubUrl,
      install: `npx skills add ${s.repo}`,
    })),
    ecosystem: registry.ecosystem.map((r) => ({
      id: r.id,
      repo: r.repo,
      name: r.displayName,
      vendor: r.vendor,
      type: r.type,
      description: r.blurb,
      url: r.url,
      homepage: r.homepage,
      logo: r.logo ? `${SITE_URL}${r.logo}` : null,
      stars: r.stars,
      license: r.license,
      sourceUpdated: r.pushedAt,
      commit: r.commitSha ?? null,
      commitDate: r.commitDate ?? null,
      pinnedAt: r.pinnedAt ?? null,
      ...(r.tag ? { release: r.tag } : {}),
      ...(r.install ? { install: r.install } : {}),
      ...(r.stats ? { stats: r.stats } : {}),
      skillCount: r.skillCount,
      skillsIndexed: r.skills.length,
      skills: r.skills.map((s) => ({
        name: s.name,
        description: s.description,
        category: s.category,
        url: s.url,
        raw: rawSkillUrl(s.url),
        commit: s.commitSha ?? null,
        commitDate: s.commitDate ?? null,
        integrity: s.integrity ?? null,
        lastAuthor: s.lastAuthor ?? null,
        multiFile: s.multiFile,
        page: s.slug ? `${SITE_URL}/skills/${r.id}/${s.slug}` : null,
        // Mirror of SKILL.md on this domain. Full-host repos also mirror
        // companion .md files (hostedFiles, relative to hostedDir); for the
        // rest, links inside the mirror point at GitHub pinned to `url`.
        hosted: s.hostedPath ? `${SITE_URL}${s.hostedPath}` : null,
        hostedDir: s.hosted ? `${SITE_URL}/s/${r.id}/${s.slug}/` : null,
        hostedFiles: s.hostedFiles ?? [],
        bytes: s.bytes ?? null,
      })),
    })),
    // Link-only tier: real skill repos we don't index in full. `commit` is a
    // verification stamp — upstream HEAD when we last confirmed the repo.
    communityIndex: registry.communityIndex.map((c) => ({
      name: c.name,
      repo: c.repo,
      description: c.description,
      github: `https://github.com/${c.repo}`,
      pinnedTree: c.commitSha
        ? `https://github.com/${c.repo}/tree/${c.commitSha}`
        : null,
      commit: c.commitSha ?? null,
      commitDate: c.commitDate ?? null,
      pinnedAt: c.pinnedAt ?? null,
      stars: c.stars ?? null,
      logo: c.logo ? `${SITE_URL}${c.logo}` : null,
    })),
  };
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
