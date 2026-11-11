#!/usr/bin/env node
/**
 * Registry text — skill titles, summaries, descriptions — arrives from the
 * upstream repos in English and is refreshed weekly. Its translations live in
 * src/data/i18n/<locale>.json, keyed by the exact English text. When upstream
 * rewrites a sentence its key stops matching, and the page shows the English
 * until the new sentence is translated.
 *
 *   node scripts/i18n-content.mjs            translated / missing / unused counts per language
 *   node scripts/i18n-content.mjs --list     every English string the site displays, as JSON
 *   node scripts/i18n-content.mjs --missing  the strings a language has no translation for yet
 *   node scripts/i18n-content.mjs --missing pt-br
 *
 * A report, not a gate: it always exits 0, because every weekly refresh can add
 * English text that is not translated yet.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["pt-br", "es"];

const registry = JSON.parse(readFileSync(join(ROOT, "src/data/registry.json"), "utf8"));

/** Every English string the site shows from registry data and mirrored files. Keep in step with the pages. */
export function collect() {
  const out = new Set();
  const add = (text) => {
    if (typeof text === "string" && text.trim()) out.add(text);
  };
  for (const o of registry.official) {
    for (const f of ["title", "tagline", "summary", "description"]) add(o[f]);
    // The skill page shows the requirement without its leading "Requires".
    if (typeof o.compatibility === "string") add(o.compatibility.replace(/^Requires\s*/i, ""));
  }
  for (const s of registry.superteam) {
    add(s.tagline);
    add(s.summary);
    for (const x of s.subskills) add(x.description);
  }
  for (const repo of registry.ecosystem) {
    add(repo.blurb);
    for (const skill of repo.skills) add(skill.description);
  }
  for (const r of registry.foundationResources ?? []) add(r.description);
  for (const c of registry.communityIndex ?? []) add(c.description);
  // Reference library on an official skill's page: title and description from each mirrored file's frontmatter.
  const base = join(ROOT, "src/data/skill-files");
  const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
      const p = join(dir, name);
      return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
    });
  if (existsSync(base)) {
    for (const file of walk(base)) {
      try {
        const data = matter(readFileSync(file, "utf8")).data;
        add(data.title);
        add(data.description);
      } catch {
        /* malformed frontmatter: the page falls back to the file name */
      }
    }
  }
  return out;
}

const load = (locale) => {
  const file = join(ROOT, "src/data/i18n", `${locale}.json`);
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
};

/** Inline code and URLs must survive translation untouched. */
const tokens = (text) => [...text.matchAll(/`[^`]+`|https?:\/\/[^\s)]+/g)].map((m) => m[0]);

const args = process.argv.slice(2);
const english = collect();

if (args.includes("--list")) {
  console.log(JSON.stringify([...english].sort(), null, 2));
} else if (args.includes("--missing")) {
  const only = args.find((a) => LOCALES.includes(a));
  const locales = only ? [only] : LOCALES;
  const dict = Object.fromEntries(locales.map((l) => [l, load(l)]));
  const missing = [...english].filter((text) => locales.some((l) => !dict[l][text])).sort();
  console.log(JSON.stringify(missing, null, 2));
} else {
  console.log(`${english.size} English strings shown from registry data and mirrored files`);
  for (const locale of LOCALES) {
    const dict = load(locale);
    const translated = [...english].filter((t) => dict[t]).length;
    const unused = Object.keys(dict).filter((k) => !english.has(k));
    const damaged = [...english].filter((t) => dict[t]).filter((t) => tokens(t).some((tok) => !dict[t].includes(tok)));
    console.log(
      `${locale}: ${translated} translated, ${english.size - translated} missing (shown in English), ${unused.length} unused (upstream text changed or removed)`,
    );
    for (const text of damaged.slice(0, 5)) console.log(`  code or URL changed in translation: ${text.slice(0, 70)}…`);
    if (damaged.length > 5) console.log(`  …and ${damaged.length - 5} more`);
  }
}
