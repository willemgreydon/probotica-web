import type { BotCategory, BotOutputMode } from '@/features/bots/lib/bot-types';

export interface BotScenarioPreset {
  id: string;
  label: string;
  categoryHint: BotCategory;
  prompt: string;
  recommendedTags: string[];
  riskLevel: 'low' | 'medium' | 'high';
  expectedOutputMode: BotOutputMode;
}

export const botScenarios: BotScenarioPreset[] = [
  {
    id: 'lead-qualification',
    label: 'Lead Qualification',
    categoryHint: 'sales',
    prompt: 'Qualify this lead with budget, timeline, intent, and location. Return structured qualification summary and next action.',
    recommendedTags: ['lead', 'crm', 'qualification'],
    riskLevel: 'medium',
    expectedOutputMode: 'mixed',
  },
  {
    id: 'ux-audit',
    label: 'UX Audit',
    categoryHint: 'ux',
    prompt: 'Audit onboarding friction points for a SaaS signup funnel. Prioritize issues by severity and propose fixes.',
    recommendedTags: ['ux', 'audit', 'heuristics'],
    riskLevel: 'low',
    expectedOutputMode: 'text',
  },
  {
    id: 'real-estate-inquiry',
    label: 'Real Estate Inquiry',
    categoryHint: 'real-estate',
    prompt: 'Handle a buyer inquiry for a 3-bedroom apartment in Vienna with budget and timeline constraints.',
    recommendedTags: ['property', 'buyer', 'real-estate'],
    riskLevel: 'medium',
    expectedOutputMode: 'mixed',
  },
  {
    id: 'marketing-campaign',
    label: 'Marketing Campaign',
    categoryHint: 'marketing',
    prompt: 'Draft a campaign plan for launching a new AI assistant package, including channels, hooks, and CTA variants.',
    recommendedTags: ['campaign', 'conversion', 'ads'],
    riskLevel: 'medium',
    expectedOutputMode: 'text',
  },
  {
    id: 'content-brief',
    label: 'Content Brief',
    categoryHint: 'content',
    prompt: 'Create a content brief for an SEO article on workflow automation for SMEs with outline and key angles.',
    recommendedTags: ['content', 'seo', 'brief'],
    riskLevel: 'low',
    expectedOutputMode: 'text',
  },
  {
    id: 'frontend-review',
    label: 'Frontend Review',
    categoryHint: 'development',
    prompt: 'Review this component architecture for accessibility, performance, and consistency. Provide prioritized fixes.',
    recommendedTags: ['frontend', 'a11y', 'performance'],
    riskLevel: 'medium',
    expectedOutputMode: 'text',
  },
  {
    id: 'learning-coach',
    label: 'Learning Coach',
    categoryHint: 'learning',
    prompt: 'Build a 2-week study plan to learn practical prompt engineering with daily exercises.',
    recommendedTags: ['learning', 'coach', 'plan'],
    riskLevel: 'low',
    expectedOutputMode: 'text',
  },
  {
    id: 'research-summary',
    label: 'Research Summary',
    categoryHint: 'research',
    prompt: 'Summarize findings from customer interviews and extract themes, risks, and recommended experiments.',
    recommendedTags: ['research', 'summary', 'insights'],
    riskLevel: 'medium',
    expectedOutputMode: 'mixed',
  },
  {
    id: 'customer-support',
    label: 'Customer Support',
    categoryHint: 'support',
    prompt: 'Draft a response workflow for a billing issue escalation with empathy, policy boundaries, and next actions.',
    recommendedTags: ['support', 'faq', 'ops'],
    riskLevel: 'medium',
    expectedOutputMode: 'text',
  },
  {
    id: 'workflow-automation',
    label: 'Workflow Automation',
    categoryHint: 'automation',
    prompt: 'Design an automation flow from form submission to CRM enrichment and follow-up email trigger.',
    recommendedTags: ['automation', 'workflow', 'integration'],
    riskLevel: 'high',
    expectedOutputMode: 'json',
  },
];
