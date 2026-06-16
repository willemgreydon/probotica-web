export interface MemorySnapshot {
  id: string;
  scope: 'session' | 'workflow' | 'workspace';
  scopeId: string;
  tags: string[];
  outputPreview: string;
  createdAt: string;
}

const KEY = 'probotica.memory.snapshots.v1';

function parse(value: string | null): MemorySnapshot[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as MemorySnapshot[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getMemorySnapshots(scopeId?: string): MemorySnapshot[] {
  if (typeof window === 'undefined') return [];
  const snapshots = parse(window.localStorage.getItem(KEY));
  return scopeId ? snapshots.filter((snapshot) => snapshot.scopeId === scopeId) : snapshots;
}

export function addMemorySnapshot(snapshot: Omit<MemorySnapshot, 'id' | 'createdAt'>) {
  if (typeof window === 'undefined') return;
  const current = getMemorySnapshots();
  const next: MemorySnapshot = {
    ...snapshot,
    id: crypto.randomUUID(),
    outputPreview: snapshot.outputPreview.slice(0, 360),
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify([next, ...current].slice(0, 120)));
}

export function clearMemorySnapshots(scopeId?: string) {
  if (typeof window === 'undefined') return;
  if (!scopeId) {
    window.localStorage.removeItem(KEY);
    return;
  }
  const next = getMemorySnapshots().filter((snapshot) => snapshot.scopeId !== scopeId);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
