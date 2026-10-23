import type { APIRoute } from "astro";
import { registry } from "../../../lib/registry";

// Dir-style hosting: /s/<id>/SKILL.md plus every companion .md at
// /s/<id>/<relpath>. Relative links inside the files resolve naturally,
// so an agent can walk an entire skill without leaving this domain.
// Ecosystem mirrors live one level deeper: /s/<repoId>/<slug>/SKILL.md
// (+ /s/<repoId>/<slug>/<relpath> for full-host repos).
const companions = import.meta.glob<string>(
  "../../../data/skill-files/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
);
const skillFiles = import.meta.glob<string>("../../../data/skills/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const stbrFiles = import.meta.glob<string>("../../../data/stbr-files/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const ecoFiles = import.meta.glob<string>(
  "../../../data/eco-skill-files/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
);

export function getStaticPaths() {
  return [
    // Superteam Brasil skills: every .md in the repo, at its repo path.
    ...registry.superteam.flatMap((s) =>
      s.files.map((f) => ({ params: { id: s.id, path: f } })),
    ),
    ...registry.official.flatMap((skill) => [
      { params: { id: skill.id, path: "SKILL.md" } },
      ...(skill.hostedFiles ?? []).map((f) => ({
        params: { id: skill.id, path: f },
      })),
    ]),
    ...registry.ecosystem.flatMap((repo) =>
      repo.skills
        .filter((s) => s.hosted && s.slug)
        .flatMap((s) => [
          { params: { id: repo.id, path: `${s.slug}/SKILL.md` } },
          ...(s.hostedFiles ?? []).map((f) => ({
            params: { id: repo.id, path: `${s.slug}/${f}` },
          })),
        ]),
    ),
  ];
}

export const GET: APIRoute = ({ params }) => {
  const { id, path } = params as { id: string; path: string };
  const stbr = registry.superteam.some((s) => s.id === id);
  const body = stbr
    ? stbrFiles[`../../../data/stbr-files/${id}/${path}`]
    : path === "SKILL.md"
      ? skillFiles[`../../../data/skills/${id}.md`]
      : (companions[`../../../data/skill-files/${id}/${path}`] ??
        ecoFiles[`../../../data/eco-skill-files/${id}/${path}`]);
  if (body === undefined) return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
