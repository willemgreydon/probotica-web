'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * Lightweight recovery search for the 404 page (PB-015).
 * Routes to the Knowledge Universe — the primary content surface — until the
 * unified global search lands (PB-033).
 */
export function NotFoundSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const target = q.trim() ? `/knowledge?q=${encodeURIComponent(q.trim())}` : '/knowledge';
        router.push(target);
      }}
      style={{ display: 'flex', gap: 8, maxWidth: 440, marginInline: 'auto' }}
    >
      <label htmlFor="nf-search" className="sr-only">Search the Knowledge Universe</label>
      <input
        id="nf-search"
        type="search"
        className="input focus-ring"
        placeholder="Search the Knowledge Universe…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="btn btn-primary focus-ring" style={{ minHeight: 44, gap: 6, paddingInline: 16 }}>
        <Search size={14} aria-hidden />
        <span>Search</span>
      </button>
    </form>
  );
}
