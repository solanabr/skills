import { DEFAULT_LOCALE, LOCALES, type Locale } from '../config';
import common from './common';
import home from './home';
import catalog from './catalog';
import ecosystem from './ecosystem';
import repoCard from './repoCard';
import skillPage from './skillPage';
import ecoSkillPage from './ecoSkillPage';
import superteam from './superteam';

// One file per area of the site, each exporting { en, 'pt-br', es }. English is
// the reference: the other locales are typed `typeof en`, so a missing or
// extra key is a type error, and the check below fails the build on anything
// the types cannot see (array length, {slot} tokens in a string).
const namespaces = { common, home, catalog, ecosystem, repoCard, skillPage, ecoSkillPage, superteam };

type Namespaces = typeof namespaces;
export type Messages = { [K in keyof Namespaces]: Namespaces[K]['en'] };

const select = (locale: Locale): Messages =>
  Object.fromEntries(Object.entries(namespaces).map(([name, bundle]) => [name, bundle[locale]])) as Messages;

export const messages = Object.fromEntries(LOCALES.map((locale) => [locale, select(locale)])) as Record<
  Locale,
  Messages
>;

const tokens = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort().join(' ');

function compare(path: string, ref: unknown, value: unknown, problems: string[]): void {
  if (typeof ref !== typeof value || Array.isArray(ref) !== Array.isArray(value)) {
    problems.push(`${path}: expected ${Array.isArray(ref) ? 'array' : typeof ref}`);
  } else if (Array.isArray(ref) && Array.isArray(value)) {
    if (ref.length !== value.length) problems.push(`${path}: expected ${ref.length} items, got ${value.length}`);
    ref.forEach((item, i) => compare(`${path}[${i}]`, item, value[i], problems));
  } else if (ref && typeof ref === 'object' && value && typeof value === 'object') {
    const a = ref as Record<string, unknown>;
    const b = value as Record<string, unknown>;
    for (const key of Object.keys(a)) {
      if (key in b) compare(`${path}.${key}`, a[key], b[key], problems);
      else problems.push(`${path}.${key}: missing`);
    }
    for (const key of Object.keys(b)) if (!(key in a)) problems.push(`${path}.${key}: not in English`);
  } else if (typeof ref === 'string' && typeof value === 'string' && tokens(ref) !== tokens(value)) {
    problems.push(`${path}: {tokens} differ from English`);
  }
}

const problems: string[] = [];
for (const locale of LOCALES) {
  if (locale !== DEFAULT_LOCALE) compare(locale, messages[DEFAULT_LOCALE], messages[locale], problems);
}
if (problems.length > 0) {
  throw new Error(`Translations are out of sync with English:\n  ${problems.join('\n  ')}`);
}
