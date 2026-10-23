import type { APIRoute } from "astro";
import { registry, totalSkills } from "../../lib/registry";
import { renderOgPng, logoDataUri, type OgSpec } from "../../lib/og-template";

// Per-page social cards, generated at build: /og/<route>.png mirrors the
// page route it belongs to (e.g. /og/skills/solana-dev.png).
function specs(): Record<string, OgSpec> {
  const out: Record<string, OgSpec> = {
    "skills.png": {
      title: "Browse skills",
      subtitle: `${totalSkills()} agent skills for building on Solana — official Solana Foundation skills plus the ecosystem, each pinned to the commit we indexed.`,
      path: "/skills",
    },
    "ecosystem.png": {
      title: "Ecosystem skill repositories",
      subtitle: `Skills from ${registry.ecosystem.length} repositories maintained by Solana teams and the community — aggregators, toolkits, and protocol vendors.`,
      path: "/ecosystem",
    },
  };
  for (const s of registry.official) {
    out[`skills/${s.id}.png`] = {
      title: s.title,
      subtitle: s.summary ?? s.tagline,
      badge: "Official",
      badge2: s.name,
      path: `/skills/${s.id}`,
      logo: logoDataUri(s.logo),
    };
  }
  out["superteam.png"] = {
    title: "Superteam Brasil skills",
    subtitle: "Official skills from Superteam Brasil, part of the Solana AI Kit: a full security audit firm and a startup operations playbook for your agent.",
    badge: "Superteam Brasil",
    badge2: "Official",
    path: "/superteam",
    logo: logoDataUri(registry.superteam[0]?.logo),
  };
  for (const s of registry.superteam) {
    out[`superteam/${s.id}.png`] = {
      title: s.displayName,
      subtitle: s.tagline,
      badge: "Superteam Brasil",
      badge2: s.repo,
      path: `/superteam/${s.id}`,
      logo: logoDataUri(s.logo),
    };
    for (const x of s.subskills) {
      out[`superteam/${s.id}/${x.slug}.png`] = {
        title: x.name,
        subtitle: x.description ?? s.tagline,
        badge: "Superteam Brasil",
        badge2: s.displayName,
        path: `/superteam/${s.id}/${x.slug}`,
        logo: logoDataUri(s.logo),
      };
    }
  }
  for (const r of registry.ecosystem) {
    for (const s of r.skills) {
      if (!s.slug) continue;
      out[`skills/${r.id}/${s.slug}.png`] = {
        title: s.name,
        subtitle: s.description || r.blurb,
        badge: r.vendor,
        badge2: r.repo,
        path: `/skills/${r.id}/${s.slug}`,
        logo: logoDataUri(r.logo),
      };
    }
  }
  return out;
}

export function getStaticPaths() {
  return Object.keys(specs()).map((path) => ({ params: { path } }));
}

export const GET: APIRoute = async ({ params }) => {
  const spec = specs()[params.path as string];
  if (!spec) return new Response("Not found", { status: 404 });
  const png = await renderOgPng(spec);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
