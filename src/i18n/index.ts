import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from './config';
import { messages, type Messages } from './messages';

export { DEFAULT_LOCALE, LOCALES, LOCALE_META, messages };
export type { Locale, Messages };

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** build.format 'file' appends .html to every pathname; undo that. */
export function cleanPathname(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '') || '/';
}

/** The locale a URL path belongs to — the default locale when it has no prefix. */
export function localeFromPath(pathname: string): Locale {
  const first = cleanPathname(pathname).split('/')[1];
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** '/pt-br/skills' → '/skills', '/pt-br' → '/'. */
export function stripLocale(pathname: string): string {
  const clean = cleanPathname(pathname);
  const locale = localeFromPath(clean);
  return locale === DEFAULT_LOCALE ? clean : clean.slice(locale.length + 1) || '/';
}

/** Paths that are the same in every language: data, hosted markdown, images, crawler files. */
const SHARED = /^\/(api|s|og)\/|^\/(llms\.txt|sitemap\.xml|robots\.txt|favicon)/;

/**
 * Point an internal page path at a locale: '/skills' → '/pt-br/skills',
 * '/#use' → '/pt-br#use'. External URLs and shared paths pass through.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE || !path.startsWith('/') || path.startsWith('//') || SHARED.test(path)) {
    return path;
  }
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? '' : path.slice(cut);
  return `/${locale}${pathname === '/' ? '' : pathname}${rest}`;
}

/** The [...lang] route param: undefined serves the unprefixed default locale. */
const langParam = (locale: Locale) => (locale === DEFAULT_LOCALE ? undefined : locale);

/** getStaticPaths for a page whose only dynamic part is the locale. */
export const localeStaticPaths = () => LOCALES.map((locale) => ({ params: { lang: langParam(locale) } }));

/** Expand a page's own getStaticPaths entries to every locale. */
export function withLocales<T extends { params: Record<string, string | undefined> }>(entries: T[]) {
  return LOCALES.flatMap((locale) =>
    entries.map((entry) => ({ ...entry, params: { ...entry.params, lang: langParam(locale) } })),
  );
}

/** Every language's URL for the page at `pathname`, for hreflang and the sitemap. */
export function alternates(pathname: string, site: URL | string | undefined) {
  const path = stripLocale(pathname);
  return LOCALES.map((locale) => ({
    locale,
    tag: LOCALE_META[locale].tag,
    href: new URL(localePath(locale, path), site).href,
  }));
}

/** Display label for a skill category, falling back to the raw id. */
export const categoryLabel = (m: Messages, id: string): string =>
  (m.common.categories as Record<string, string>)[id] ?? id;

/**
 * Everything a page or component needs to render in the locale of the URL it
 * is being built for: `const { m, l, num, date } = i18n(Astro);`
 */
export function i18n(astro: { url: URL }) {
  const locale = localeFromPath(astro.url.pathname);
  const { intl, tag } = LOCALE_META[locale];
  return {
    locale,
    tag,
    /** Messages for this locale: m.common.skipToContent, m.home.hero.sub, … */
    m: messages[locale],
    /** Localize an internal page path: l('/skills'). */
    l: (path: string) => localePath(locale, path),
    /** 12345 → '12,345' / '12.345'. */
    num: (n: number) => n.toLocaleString(intl),
    /** '2026-11-09' or a full ISO timestamp → 'Nov 9, 2026' / '9 de nov. de 2026'. */
    date: (
      value: string,
      options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
    ) =>
      new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value).toLocaleDateString(intl, {
        ...options,
        timeZone: 'UTC',
      }),
  };
}
