/**
 * Locales the site is published in. English is the source language and is
 * served from the site root; every other locale lives under its own path
 * prefix (/pt-br/…, /es/…).
 *
 * To add a language: add it here, add a column to every file in ./messages,
 * and the build fails until all the keys line up.
 */
export const LOCALES = ['en', 'pt-br', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  /** BCP 47 tag for <html lang> and hreflang. */
  tag: string;
  /** Locale for Intl number and date formatting. */
  intl: string;
  /** Open Graph locale. */
  og: string;
  /** The language's own name, as shown in the switcher. */
  name: string;
  /** Short label on the switcher button. */
  short: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { tag: 'en', intl: 'en-US', og: 'en_US', name: 'English', short: 'EN' },
  'pt-br': { tag: 'pt-BR', intl: 'pt-BR', og: 'pt_BR', name: 'Português (Brasil)', short: 'PT' },
  es: { tag: 'es', intl: 'es', og: 'es_LA', name: 'Español', short: 'ES' },
};
