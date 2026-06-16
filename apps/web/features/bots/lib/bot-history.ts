export interface BotRunHistoryItem {
  id: string;
  botSlug: string;
  botName: string;
  inputPreview: string;
  outputPreview: string;
  fallback: boolean;
  model: string;
  category: string;
  latencyMs: number;
  createdAt: string;
}

const KEY = 'probotica.botlab.runs.v1';

function safeParse(value: string | null): BotRunHistoryItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as BotRunHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function preview(value: string): string {
  const compact = value.replace(/\s+/g, ' ').trim();
  return compact.length > 280 ? `${compact.slice(0, 280)}...` : compact;
}

export function getBotRuns(): BotRunHistoryItem[] {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(KEY));
}

export function saveBotRun(item: Omit<BotRunHistoryItem, 'id' | 'inputPreview' | 'outputPreview'> & { input: string; output: string }) {
  if (typeof window === 'undefined') return;
  const runs = getBotRuns();
  const next: BotRunHistoryItem = {
    id: crypto.randomUUID(),
    botSlug: item.botSlug,
    botName: item.botName,
    inputPreview: preview(item.input),
    outputPreview: preview(item.output),
    fallback: item.fallback,
    model: item.model,
    category: item.category,
    latencyMs: item.latencyMs,
    createdAt: item.createdAt,
  };
  const merged = [next, ...runs].slice(0, 10);
  window.localStorage.setItem(KEY, JSON.stringify(merged));
}

export function deleteBotRun(id: string) {
  if (typeof window === 'undefined') return;
  const next = getBotRuns().filter((entry) => entry.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearBotRuns() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}
