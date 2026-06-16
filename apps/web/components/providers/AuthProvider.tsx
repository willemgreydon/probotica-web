'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Lightweight mock authentication for testing logged-in functionality.
 * No backend: a single built-in test account, session persisted to localStorage.
 * Replace with real auth (PB-031) later — the useAuth() surface stays the same.
 */

export interface AuthUser {
  email: string;
  name: string;
}

const STORAGE_KEY = 'probotica-auth';

const TEST_ACCOUNT = { email: 'test@probotica.at', name: 'Test User', password: 'probotica' };

/** Public test credentials (shown on the login page). */
export const TEST_CREDENTIALS = { email: TEST_ACCOUNT.email, password: TEST_ACCOUNT.password };

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === TEST_ACCOUNT.email && password === TEST_ACCOUNT.password) {
      const next: AuthUser = { email: TEST_ACCOUNT.email, name: TEST_ACCOUNT.name };
      setUser(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return { ok: true };
    }
    return { ok: false, error: 'Invalid credentials. Use the test account shown below.' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ user, ready, login, logout }), [user, ready, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
