import type { BotCategory } from '@/features/bots/lib/bot-types';

export interface CrossLink {
  label: string;
  href: string;
  type: 'bot' | 'workflow' | 'scenario' | 'category' | 'page';
}

export function botCrossLinks(slug: string): CrossLink[] {
  return [
    { label: 'View in Marketplace', href: '/marketplace', type: 'page' },
    { label: 'Open Workspace', href: '/workspace', type: 'page' },
  ];
}

export function workflowCrossLinks(workflowId: string, category: BotCategory): CrossLink[] {
  return [
    { label: `${capitalize(category)} category`, href: `/categories/${category}`, type: 'category' },
    { label: 'All workflows', href: '/marketplace', type: 'page' },
    { label: 'Run in Workspace', href: '/workspace', type: 'page' },
  ];
}

export function scenarioCrossLinks(categoryHint: BotCategory): CrossLink[] {
  return [
    { label: `${capitalize(categoryHint)} bots`, href: `/categories/${categoryHint}`, type: 'category' },
    { label: 'All bots', href: '/bots', type: 'page' },
    { label: 'Workspace', href: '/workspace', type: 'page' },
  ];
}

export function categoryCrossLinks(category: BotCategory): CrossLink[] {
  return [
    { label: 'Bot Lab', href: '/bots', type: 'page' },
    { label: 'Marketplace', href: '/marketplace', type: 'page' },
    { label: 'Control Center', href: '/control-center', type: 'page' },
  ];
}

export const GLOBAL_NAV_ITEMS = [
  { label: 'Bot Lab', href: '/bots', description: 'Browse all AI bots' },
  { label: 'Workspace', href: '/workspace', description: 'Deploy and test bots' },
  { label: 'Marketplace', href: '/marketplace', description: 'Workflows and packs' },
  { label: 'Control Center', href: '/control-center', description: 'Runtime dashboard' },
  { label: 'Knowledge', href: '/knowledge', description: 'AI concepts and guides' },
] as const;

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}
