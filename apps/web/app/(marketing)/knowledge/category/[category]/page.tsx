import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { topicBySlug, knowledgeTopics } from '@/features/knowledge/data/knowledge-topics';
import { topicMetadata } from '@/features/knowledge/lib/knowledge-seo';
import { getArticlesForCategory } from '@/features/knowledge/lib/knowledge-utils';
import { KnowledgeGrid } from '@/features/knowledge/components/KnowledgeGrid';
import type { TopicCategory } from '@/features/knowledge/lib/knowledge-types';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return knowledgeTopics.map(topic => ({ category: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const topic = topicBySlug[category as TopicCategory];
  if (!topic) return {};
  return topicMetadata(topic);
}

export default async function KnowledgeCategoryPage({ params }: Props) {
  const { category } = await params;
  const topic = topicBySlug[category as TopicCategory];
  if (!topic) notFound();

  const articles = getArticlesForCategory(category);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto', paddingTop: '2rem', paddingBottom: '1rem' }}>
        <Link
          href="/knowledge"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '6px',
            fontSize:       '.75rem',
            fontWeight:     600,
            color:          'color-mix(in oklab, var(--foreground), transparent 60%)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={12} />
          All Topics
        </Link>
      </div>

      {/* Topic header */}
      <header
        style={{
          width:         'min(1180px, calc(100% - 32px))',
          marginInline:  'auto',
          paddingBottom: '3rem',
          borderBottom:  '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.25rem' }}>
          <div
            style={{
              width:        '56px',
              height:       '56px',
              borderRadius: '50%',
              border:       `1.5px solid ${topic.accentColor}50`,
              background:   `${topic.accentColor}12`,
              display:      'grid',
              placeItems:   'center',
              fontSize:     '1.5rem',
            }}
          >
            {topic.icon}
          </div>
          <span
            style={{
              fontSize:      '.5625rem',
              fontWeight:    700,
              letterSpacing: '.5em',
              textTransform: 'uppercase',
              color:         topic.accentColor,
              opacity:       .8,
            }}
          >
            {topic.tier}
          </span>
        </div>

        <h1
          style={{
            fontSize:      'clamp(2rem, 5vw, 3.5rem)',
            fontWeight:    900,
            letterSpacing: '-.04em',
            lineHeight:    1.1,
            color:         'var(--color-fog)',
            marginBottom:  '1rem',
          }}
        >
          {topic.title}
        </h1>

        <p
          style={{
            fontSize:   'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.65,
            color:      'color-mix(in oklab, var(--foreground), transparent 45%)',
            maxWidth:   '620px',
            marginBottom: '1.5rem',
          }}
        >
          {topic.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {topic.relatedSlugs.slice(0, 4).map(relSlug => {
            const related = topicBySlug[relSlug];
            if (!related) return null;
            return (
              <Link
                key={relSlug}
                href={`/knowledge/category/${relSlug}`}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '5px',
                  padding:        '5px 12px',
                  borderRadius:   '100px',
                  fontSize:       '.75rem',
                  fontWeight:     600,
                  color:          related.accentColor,
                  background:     `${related.accentColor}10`,
                  border:         `1px solid ${related.accentColor}25`,
                  textDecoration: 'none',
                }}
              >
                {related.icon} {related.shortTitle}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Articles */}
      <section style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto', paddingTop: '3rem', paddingBottom: '6rem' }}>
        {articles.length > 0 ? (
          <>
            <p
              style={{
                fontSize:      '.5625rem',
                fontWeight:    700,
                letterSpacing: '.4em',
                textTransform: 'uppercase',
                color:         'color-mix(in oklab, var(--foreground), transparent 70%)',
                marginBottom:  '1.75rem',
              }}
            >
              {articles.length} article{articles.length !== 1 ? 's' : ''}
            </p>
            <KnowledgeGrid articles={articles} columns={3} />
          </>
        ) : (
          <div
            style={{
              padding:      '48px',
              borderRadius: '1.75rem',
              border:       '1px solid var(--border)',
              background:   'color-mix(in oklab, var(--foreground), transparent 95%)',
              textAlign:    'center',
            }}
          >
            <p style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{topic.icon}</p>
            <p style={{ fontSize: '1rem', color: 'color-mix(in oklab, var(--foreground), transparent 55%)', lineHeight: 1.6 }}>
              Articles on {topic.title} are coming soon.
            </p>
            <Link
              href="/knowledge"
              style={{
                display:        'inline-block',
                marginTop:      '20px',
                fontSize:       '.875rem',
                fontWeight:     700,
                color:          topic.accentColor,
                textDecoration: 'none',
              }}
            >
              Browse all topics →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
