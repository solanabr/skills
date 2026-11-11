import type { APIRoute } from "astro";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, localePath, type Locale } from "../i18n";
import { registry, SITE_URL } from "../lib/registry";

export const GET: APIRoute = () => {
  const routes = [
    "/",
    "/skills",
    "/ecosystem",
    "/superteam",
    ...registry.official.map((s) => `/skills/${s.id}`),
    ...registry.superteam.flatMap((s) => [
      `/superteam/${s.id}`,
      ...s.subskills.map((x) => `/superteam/${s.id}/${x.slug}`),
    ]),
    ...registry.ecosystem.flatMap((r) =>
      r.skills.filter((s) => s.slug).map((s) => `/skills/${r.id}/${s.slug}`),
    ),
  ];
  // The home page is advertised without its trailing slash.
  const loc = (locale: Locale, route: string) => {
    const path = localePath(locale, route);
    return `${SITE_URL}${path === "/" ? "" : path}`;
  };
  // Every page exists in every language; each entry lists all of them.
  const alternates = (route: string) =>
    [
      ...LOCALES.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${LOCALE_META[l].tag}" href="${loc(l, route)}"/>`,
      ),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(DEFAULT_LOCALE, route)}"/>`,
    ].join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.flatMap((locale) =>
  routes.map(
    (r) =>
      `  <url><loc>${loc(locale, r)}</loc><lastmod>${registry.updated}</lastmod>${alternates(r)}</url>`,
  ),
).join("\n")}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
