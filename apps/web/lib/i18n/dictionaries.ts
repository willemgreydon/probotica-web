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
  home: {
    heroEyebrow: 'ProBotica command layer',
    heroLine1: 'AI Workflows',
    heroLine2: 'That Turn',
    heroLine3: 'Prompts Into',
    heroLine4: 'Operations',
    heroLead: 'ProBotica combines imported expert bots, workflow execution, workspace memory, marketplace modules, and control-center telemetry into one practical AI operating layer for real business tasks.',
    openBotLab: 'Open Bot Lab',
    launchWorkspace: 'Launch Workspace',
    goWorkspace: 'Go to Workspace',
    solEyebrow: 'Operational AI Modules',
    solTitle: 'Six production modules. One AI operating layer.',
    solBody: 'Each module is independently usable and fully cross-linked. Start with Bot Lab, chain into Workflows, monitor in Control Center.',
    studioEyebrow: 'AI Control Console',
    studioTitle: 'Live AI demo. Real API.',
    studioBody: 'Select a bot scenario, submit a prompt, and receive structured output from the actual OpenAI API endpoint — with typed contracts and deterministic fallback.',
    agentsEyebrow: 'Agent Arsenal',
    agentsTitle: 'Deployable agent modules by domain.',
    agentsBody: 'Expert AI assistants with structured outputs, safe fallbacks, and domain-tuned system prompts. Each links to its full category in the Bot Lab.',
    contactEyebrow: 'Workflow Briefing',
    contactTitle: 'Launch your first operational AI module.',
    contactBody: 'In 30 minutes we map your highest-leverage automation path, define system boundaries, and ship a practical execution plan.',
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
  home: {
    heroEyebrow: 'ProBotica Steuerungsebene',
    heroLine1: 'KI-Workflows,',
    heroLine2: 'die Prompts',
    heroLine3: 'in echte',
    heroLine4: 'Abläufe verwandeln',
    heroLead: 'ProBotica vereint importierte Experten-Bots, Workflow-Ausführung, Workspace-Speicher, Marketplace-Module und Control-Center-Telemetrie zu einer praktischen KI-Betriebsebene für echte Geschäftsaufgaben.',
    openBotLab: 'Bot Lab öffnen',
    launchWorkspace: 'Workspace starten',
    goWorkspace: 'Zum Workspace',
    solEyebrow: 'Operative KI-Module',
    solTitle: 'Sechs Produktionsmodule. Eine KI-Betriebsebene.',
    solBody: 'Jedes Modul ist eigenständig nutzbar und vollständig vernetzt. Starte im Bot Lab, verkette in Workflows, überwache im Control Center.',
    studioEyebrow: 'KI-Steuerkonsole',
    studioTitle: 'Live-KI-Demo. Echte API.',
    studioBody: 'Wähle ein Bot-Szenario, sende einen Prompt und erhalte strukturierte Ausgaben vom echten OpenAI-API-Endpunkt — mit typisierten Verträgen und deterministischem Fallback.',
    agentsEyebrow: 'Agenten-Arsenal',
    agentsTitle: 'Einsatzbereite Agenten-Module nach Domäne.',
    agentsBody: 'Experten-KI-Assistenten mit strukturierten Ausgaben, sicheren Fallbacks und domänenspezifischen System-Prompts. Jeder verlinkt auf seine Kategorie im Bot Lab.',
    contactEyebrow: 'Workflow-Briefing',
    contactTitle: 'Starte dein erstes operatives KI-Modul.',
    contactBody: 'In 30 Minuten kartieren wir deinen wirkungsvollsten Automatisierungspfad, definieren Systemgrenzen und liefern einen praktischen Umsetzungsplan.',
  },
};

const DICTS: Record<Locale, Dict> = { en, de };

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? en;
}
