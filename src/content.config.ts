import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const skills = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/skills" }),
  schema: z
    .object({
      name: z.string(),
      description: z.string(),
      license: z.string().optional(),
    })
    .passthrough(),
});

// Mirrored ecosystem skills: src/data/eco-skill-files/<repoId>/<slug>/SKILL.md
// → entry id "<repoId>/<slug>". Frontmatter is whatever upstream wrote, so no
// required fields (some skills ship none at all).
const ecoSkills = defineCollection({
  loader: glob({
    pattern: "**/SKILL.md",
    base: "./src/data/eco-skill-files",
    generateId: ({ entry }) => entry.replace(/\/SKILL\.md$/, ""),
  }),
  schema: z.object({}).passthrough(),
});

// Superteam Brasil skills: the main file and each subskill, frontmatter
// stripped by refresh → entry id "<id>/<path without .md>".
const stbr = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/data/stbr-render",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({}).passthrough(),
});

export const collections = { skills, ecoSkills, stbr };
