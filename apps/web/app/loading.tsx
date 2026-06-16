/**
 * Root loading state (PB-017). Shown during navigation/suspense before a route
 * paints — prevents layout shift and the "is it frozen?" gap. Uses the shared
 * .skeleton primitive, which honors prefers-reduced-motion.
 */
export default function Loading() {
  return (
    <div className="page-shell hud-grid bg-premium" aria-busy="true" aria-live="polite">
      <div className="container-x" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span className="sr-only">Loading…</span>
        <div className="skeleton" style={{ height: 14, width: 120 }} />
        <div className="skeleton" style={{ height: 44, width: 'min(520px, 90%)' }} />
        <div className="skeleton" style={{ height: 18, width: 'min(360px, 80%)' }} />
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
            marginTop: 16,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 150 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
