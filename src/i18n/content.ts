import { DEFAULT_LOCALE, type Locale } from './config';
import ptBr from '../data/i18n/pt-br.json';
import es from '../data/i18n/es.json';

// Registry text — skill titles, summaries, descriptions — comes from the
// upstream repos in English and is refreshed weekly, so it can't live in the
// message files. Its translations are keyed by the exact English text: when
// upstream rewrites a sentence the key stops matching, and the page shows the
// English until the new sentence is translated. `node scripts/i18n-content.mjs`
// lists what is missing or no longer used.
const dictionaries: Partial<Record<Locale, Record<string, string>>> = { 'pt-br': ptBr, es };

export function translate(locale: Locale, text: string): string {
  const dictionary = locale === DEFAULT_LOCALE ? undefined : dictionaries[locale];
  return dictionary && Object.hasOwn(dictionary, text) ? dictionary[text] : text;
}
