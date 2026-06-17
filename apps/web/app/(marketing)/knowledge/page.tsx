import type { Metadata } from 'next';
import { hubMetadata } from '@/features/knowledge/lib/knowledge-seo';
import { knowledgeArticles } from '@/features/knowledge/data/knowledge-articles';
import { knowledgeTopics } from '@/features/knowledge/data/knowledge-topics';
import { learningPaths } from '@/features/knowledge/data/learning-paths';
import { KnowledgeHero } from '@/features/knowledge/components/KnowledgeHero';
import { KnowledgeGrid } from '@/features/knowledge/components/KnowledgeGrid';
import { ConceptGraph } from '@/features/knowledge/components/ConceptGraph';
import { LearningPathRail } from '@/features/knowledge/components/LearningPathRail';
import { DistributionBars } from '@/components/visual/DistributionBars';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = hubMetadata();

export default function KnowledgePage() {
  const featuredArticles = knowledgeArticles.slice(0, 9);
  const stats = getPlatformStats();

  // Articles per topic — derived from in-scope data, top 8 by volume.
  const articlesPerTopic = knowledgeTopics
    .map((topic) => ({
      label: topic.shortTitle,
      value: knowledgeArticles.filter((a) => a.category === topic.slug).length,
      color: topic.accentColor,
      href: `/knowledge/category/${topic.slug}`,
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <div id="main-content" style={{ minHeight: '100vh' }}>
      <KnowledgeHero
        articleCount={knowledgeArticles.length}
        topicCount={knowledgeTopics.length}
        pathCount={learningPaths.length}
      />

      {/* Knowledge Universe KPIs */}
      <section style={{ paddingTop: '2.5rem' }}>
        <div style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto' }}>
          <div className="data-rail">
            <div className="data-rail-item">
              <span className="data-rail-value">{stats.articleCount}</span>
              <span className="data-rail-label">Articles</span>
            </div>
            <span className="data-rail-sep" />
            <div className="data-rail-item">
              <span className="data-rail-value">{stats.topicCount}</span>
              <span className="data-rail-label">Topics</span>
            </div>
            <span className="data-rail-sep" />
            <div className="data-rail-item">
              <span className="data-rail-value">{stats.pathCount}</span>
              <span className="data-rail-label">Learning Paths</span>
            </div>
            <span className="data-rail-sep" />
            <div className="data-rail-item">
              <span className="data-rail-value">{stats.glossaryCount}</span>
              <span className="data-rail-label">Glossary Terms</span>
            </div>
            <span className="data-rail-sep" />
            <div className="data-rail-item">
              <span className="data-rail-value">{stats.learningHours}h</span>
              <span className="data-rail-label">Learning</span>
            </div>
          </div>

          {articlesPerTopic.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <DistributionBars title="Articles by topic" data={articlesPerTopic} />
            </div>
          )}
        </div>
      </section>

      {/* Concept graph + paths */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto' }}>
          <div
            className="lg:grid-cols-[1fr_minmax(0,360px)]"
            style={{
              display:             'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap:                 '2.5rem',
              alignItems:          'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize:      '.5625rem',
                  fontWeight:    700,
                  letterSpacing: '.5em',
                  textTransform: 'uppercase',
                  color:         'var(--color-acid)',
                  opacity:       .7,
                  marginBottom:  '10px',
                }}
              >
                Concept Graph
              </p>
              <h2
                style={{
                  fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight:    900,
                  letterSpacing: '-.04em',
                  color:         'var(--color-fog)',
                  marginBottom:  '1.5rem',
                }}
              >
                Navigate the AI landscape
              </h2>
              <ConceptGraph />
            </div>

            <div>
              <p
                style={{
                  fontSize:      '.5625rem',
                  fontWeight:    700,
                  letterSpacing: '.5em',
                  textTransform: 'uppercase',
                  color:         'var(--color-acid)',
                  opacity:       .7,
                  marginBottom:  '10px',
                }}
              >
                Learning Paths
              </p>
              <h2
                style={{
                  fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight:    900,
                  letterSpacing: '-.04em',
                  color:         'var(--color-fog)',
                  marginBottom:  '1.5rem',
                }}
              >
                Structured journeys
              </h2>
              <LearningPathRail paths={learningPaths} />
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section style={{ paddingBottom: '6rem' }}>
        <div style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontSize:      '.5625rem',
                fontWeight:    700,
                letterSpacing: '.5em',
                textTransform: 'uppercase',
                color:         'var(--color-acid)',
                opacity:       .7,
                marginBottom:  '10px',
              }}
            >
              All Articles
            </p>
            <h2
              style={{
                fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight:    900,
                letterSpacing: '-.04em',
                color:         'var(--color-fog)',
              }}
            >
              Explore the knowledge base
            </h2>
          </div>
          <KnowledgeGrid articles={featuredArticles} columns={3} />
        </div>
      </section>
    </div>
  );
}
