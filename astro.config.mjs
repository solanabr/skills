// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Mirrored SKILL.md files are third-party content refreshed weekly with no
// review gate — raw HTML in them must never reach the rendered pages. Runs
// last so it sanitizes the final tree (comments dropped, elements/attributes
// allowlisted). Astro applies heading ids and shiki highlighting after user
// plugins, so code blocks and anchors are unaffected; inline ids an author
// writes are clobber-prefixed.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // rehype-github-links marks external links; keep those attributes.
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
    // Shiki highlights fences BEFORE user plugins run — its output must
    // survive sanitize. className needs explicit value allowlists (a bare
    // name admits the property but zero values); style is allowed only on
    // these code-rendering elements (colors from a trusted highlighter).
    pre: [
      ...(defaultSchema.attributes?.pre ?? []),
      ['className', 'astro-code', 'github-dark-default'],
      'style',
      ['tabIndex', 0],
      'dataLanguage',
    ],
    code: [...(defaultSchema.attributes?.code ?? []), ['className', /^language-./], 'style'],
    span: [...(defaultSchema.attributes?.span ?? []), ['className', 'line'], 'style'],
  },
};

// Sanitize can't be taught to keep shiki's tabindex (string-typed props defeat
// its value matching); re-add it after the fact so keyboard users can focus and
// scroll long code blocks. Runs on trusted post-sanitize output only.
function rehypeCodeTabindex() {
  return (tree) => {
    const walk = (node) => {
      if (node.tagName === 'pre' && node.properties?.dataLanguage !== undefined) {
        node.properties.tabIndex = 0;
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://kit.superteam.codes',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
    rehypePlugins: [
      (await import('./src/lib/rehype-github-links.mjs')).default,
      [rehypeSanitize, sanitizeSchema],
      rehypeCodeTabindex,
    ],
  },
});
