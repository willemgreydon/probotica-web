'use client';

export function ShaderField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden shader-field depth-field" style={{ zIndex: -10 }}>
      <div className="absolute inset-0 shader-orb shader-orb-acid" style={{ animation: 'atmosphere-float 28s ease-in-out infinite' }} />
      <div className="absolute inset-0 shader-orb shader-orb-aura" style={{ animation: 'atmosphere-float 34s ease-in-out infinite reverse' }} />
      <div className="absolute inset-0 shader-orb shader-orb-violet" style={{ animation: 'atmosphere-float 40s ease-in-out infinite' }} />
      <div className="absolute inset-0 hud-grid" style={{ opacity: 0.18 }} />
      <div className="absolute inset-0 grain-layer noise-premium" style={{ opacity: 'var(--noise-opacity)' }} />
      <div className="absolute inset-0 scanline" style={{ opacity: 0.07 }} />
    </div>
  );
}
