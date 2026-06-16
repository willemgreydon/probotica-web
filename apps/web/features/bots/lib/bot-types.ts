export type BotCategory =
  | 'sales'
  | 'ux'
  | 'content'
  | 'marketing'
  | 'real-estate'
  | 'development'
  | 'learning'
  | 'automation'
  | 'research'
  | 'support'
  | 'strategy'
  | 'other';

export type BotOutputMode = 'text' | 'json' | 'mixed';

export type BotRunState = 'idle' | 'running' | 'done' | 'error';

export interface BotDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: BotCategory;
  description: string;
  systemPrompt: string;
  starterPrompt: string;
  inputPlaceholder: string;
  outputMode: BotOutputMode;
  tags: string[];
  model: string;
  temperature: number;
  status: 'active' | 'draft' | 'disabled';
  sourceFile: string;
  sampleInputs: string[];
  capabilities: string[];
  safetyNotes: string[];
}

export interface BotTestRequest {
  botSlug: string;
  input: string;
}

export interface BotTestResponse {
  ok: boolean;
  fallback: boolean;
  botSlug: string;
  botName: string;
  output: string;
  structured?: unknown;
  error?: string;
  meta: {
    model: string;
    category: string;
    latencyMs: number;
    timestamp: string;
  };
}

export interface PublicBotDefinition
  extends Omit<BotDefinition, 'systemPrompt'> {}
