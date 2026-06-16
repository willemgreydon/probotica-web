import type { Locale } from './config';

/**
 * Translation dictionaries (EN + DE). Keys are dot-addressable via the `t()`
 * helper. This covers the cross-cutting chrome (nav, header, footer, common);
 * page/content translation extends these dictionaries incrementally.
 */
export type Dict = typeof en;

const en = {
  nav: {
    Product: 'Product',
    Solutions: 'Solutions',
    Industries: 'Industries',
    Resources: 'Resources',
    Pricing: 'Pricing',
    Company: 'Company',
    Legal: 'Legal',
  },
  auth: {
    signIn: 'Sign in',
    getStarted: 'Get started',
  },
  common: {
    menu: 'Menu',
    home: 'home',
    language: 'Language',
    skipToContent: 'Skip to main content',
  },
  footer: {
    tagline: 'Teach the concept, then run the concept. AI bots, prompt packs and workflow automation for teams that need output, not demos.',
  },
};

const de: Dict = {
  nav: {
    Product: 'Produkt',
    Solutions: 'Lösungen',
    Industries: 'Branchen',
    Resources: 'Ressourcen',
    Pricing: 'Preise',
    Company: 'Unternehmen',
    Legal: 'Rechtliches',
  },
  auth: {
    signIn: 'Anmelden',
    getStarted: 'Loslegen',
  },
  common: {
    menu: 'Menü',
    home: 'Startseite',
    language: 'Sprache',
    skipToContent: 'Zum Hauptinhalt springen',
  },
  footer: {
    tagline: 'Erst das Konzept lehren, dann das Konzept ausführen. KI-Bots, Prompt-Pakete und Workflow-Automatisierung für Teams, die Ergebnisse brauchen – keine Demos.',
  },
};

const DICTS: Record<Locale, Dict> = { en, de };

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? en;
}
