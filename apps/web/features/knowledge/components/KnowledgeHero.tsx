import { BookOpen, Layers, Route } from 'lucide-react';

interface KnowledgeHeroProps {
  articleCount: number;
  topicCount: number;
  pathCount: number;
}

export function KnowledgeHero({ articleCount, topicCount, pathCount }: KnowledgeHeroProps) {
  const stats = [
    { value: `${articleCount}+`, label: 'Articles', icon: BookOpen },
    { value: `${topicCount}`, label: 'Topics', icon: Layers },
    { value: `${pathCount}`, label: 'Learning Paths', icon: Route },
  ];

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--primary), transparent 86%), transparent 65%)', pointerEvents: 'none' }} />
      <div className="container-x relative animate-in-up" style={{ maxWidth: '760px' }}>
        <div style={{ marginBottom: '1.5rem' }}><span className="label-eyebrow">ProBotica Knowledge Universe</span></div>
        <h1 className="text-hero text-balance" style={{ margin: 0 }}>
          <span style={{ display: 'block', color: 'var(--foreground)' }}>AI Knowledge</span>
          <span style={{ display: 'block', WebkitTextStroke: '1px color-mix(in oklab, var(--foreground), transparent 70%)', color: 'transparent' }}>Universe</span>
        </h1>
        <p className="text-lead" style={{ marginTop: '1.5rem', maxWidth: '580px' }}>
          A structured library of AI knowledge from foundational concepts to frontier systems. Clear, practical, expert-written.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '2.5rem' }}>
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="surface-glass" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '1.25rem' }}>
              <Icon size={14} style={{ color: 'var(--primary)', opacity: .7 }} />
              <span>
                <b style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', marginRight: 6 }}>{value}</b>
                <span className="text-caption">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
