import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import type { KnowledgeArticle, ArticleSection, LearningPath, GlossaryTerm } from '../lib/knowledge-types';
import { topicBySlug } from '../data/knowledge-topics';
import { formatDate, getAdjacentArticles } from '../lib/knowledge-utils';
import { DifficultyBadge } from './DifficultyBadge';
import { KnowledgeTOC } from './KnowledgeTOC';
import { RelatedConcepts } from './RelatedConcepts';
import { LearningPathRail } from './LearningPathRail';
import { GlossaryPreview } from './GlossaryPreview';
import { ArticleCompleteButton } from './ArticleCompleteButton';
import { getRelatedArticles } from '../lib/knowledge-utils';

interface KnowledgeArticleLayoutProps {
  article: KnowledgeArticle;
  relatedPaths: LearningPath[];
  glossaryTerms: GlossaryTerm[];
}

const CALLOUT_STYLES = {
  info:    { border: 'rgba(136,255,204,.25)', bg: 'rgba(136,255,204,.06)', accent: '#88ffcc', label: 'Note' },
  warning: { border: 'rgba(251,191,36,.25)',  bg: 'rgba(251,191,36,.06)',  accent: '#fbbf24', label: 'Warning' },
  tip:     { border: 'rgba(185,255,74,.25)',  bg: 'rgba(185,255,74,.06)',  accent: '#b9ff4a', label: 'Tip' },
  example: { border: 'rgba(139,92,246,.25)',  bg: 'rgba(139,92,246,.06)',  accent: '#8b5cf6', label: 'Example' },
};

function ArticleSectionBlock({ section }: { section: ArticleSection }) {
  const Heading = section.level === 2 ? 'h2' : 'h3';
  const headingSize = section.level === 2 ? '1.5rem' : '1.125rem';
  const headingWeight = section.level === 2 ? 900 : 800;
  const headingMarginTop = section.level === 2 ? '2.5rem' : '1.75rem';

  return (
    <section style={{ marginBottom: '2rem' }} className="prose-premium">
      <Heading
        id={section.id}
        style={{
          fontSize:      headingSize,
          fontWeight:    headingWeight,
          letterSpacing: '-.03em',
          lineHeight:    1.2,
          color:         'var(--foreground)',
          marginTop:     headingMarginTop,
          marginBottom:  '1rem',
          scrollMarginTop: '6rem',
        }}
      >
        {section.heading}
      </Heading>

      {section.body.split('\n\n').map((paragraph, i) => (
        <p
          key={i}
          style={{
            fontSize:   '1rem',
            lineHeight: 1.8,
            color:      'var(--muted-foreground)',
            marginBottom: '1.25rem',
          }}
        >
          {paragraph}
        </p>
      ))}

      {section.callout && (() => {
        const s = CALLOUT_STYLES[section.callout.type];
        return (
          <div
            style={{
              margin:       '1.5rem 0',
              padding:      '16px 20px',
              borderRadius: '1rem',
              border:       `1px solid ${s.border}`,
              background:   s.bg,
              borderLeft:   `3px solid ${s.accent}`,
            }}
          >
            <span
              style={{
                display:       'block',
                fontSize:      '.5625rem',
                fontWeight:    700,
                letterSpacing: '.4em',
                textTransform: 'uppercase',
                color:         s.accent,
                marginBottom:  '6px',
              }}
            >
              {s.label}
            </span>
            <p style={{ fontSize: '.9375rem', lineHeight: 1.65, color: 'var(--muted-foreground)', margin: 0 }}>
              {section.callout.text}
            </p>
          </div>
        );
      })()}

      {section.codeBlock && (
        <div style={{ margin: '1.5rem 0' }}>
          <div
            style={{
              padding:      '20px',
              borderRadius: '1rem',
              border:       '1px solid rgba(231,239,225,.1)',
              background:   'rgba(7,9,7,.9)',
              overflowX:    'auto',
            }}
          >
            <div
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                marginBottom:  '12px',
                paddingBottom: '12px',
                borderBottom:  '1px solid rgba(231,239,225,.08)',
              }}
            >
              <span
                style={{
                  fontSize:      '.5625rem',
                  fontWeight:    700,
                  letterSpacing: '.3em',
                  textTransform: 'uppercase',
                  color:         'var(--muted-foreground)',
                }}
              >
                {section.codeBlock.language}
              </span>
            </div>
            <pre
              style={{
                fontFamily:  'var(--font-mono), ui-monospace, monospace',
                fontSize:    '.875rem',
                lineHeight:  1.7,
                color:       'var(--foreground)',
                margin:      0,
                whiteSpace:  'pre-wrap',
                wordBreak:   'break-word',
              }}
            >
              <code>{section.codeBlock.code}</code>
            </pre>
          </div>
          {section.codeBlock.caption && (
            <p
              style={{
                fontSize:   '.75rem',
                color:      'var(--muted-foreground)',
                textAlign:  'center',
                marginTop:  '8px',
                fontStyle:  'italic',
              }}
            >
              {section.codeBlock.caption}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export function KnowledgeArticleLayout({
  article,
  relatedPaths,
  glossaryTerms,
}: KnowledgeArticleLayoutProps) {
  const topic = topicBySlug[article.category];
  const accentColor = topic?.accentColor ?? '#b9ff4a';
  const relatedArticles = getRelatedArticles(article.relatedSlugs);
  const { prev, next } = getAdjacentArticles(article.slug, article.category);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <div
        style={{
          width:          'min(1180px, calc(100% - 32px))',
          marginInline:   'auto',
          paddingTop:     '2rem',
          paddingBottom:  '1rem',
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            href="/knowledge"
            style={{
              display:        'flex',
              alignItems:     'center',
              gap:            '6px',
              fontSize:       '.75rem',
              fontWeight:     600,
              color:          'var(--muted-foreground)',
              textDecoration: 'none',
              transition:     'color 150ms ease',
            }}
          >
            <ArrowLeft size={12} />
            Knowledge
          </Link>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '.75rem' }}>/</span>
          {topic && (
            <>
              <Link
                href={`/knowledge/category/${topic.slug}`}
                style={{
                  fontSize:       '.75rem',
                  fontWeight:     600,
                  color:          accentColor,
                  opacity:        .7,
                  textDecoration: 'none',
                }}
              >
                {topic.shortTitle}
              </Link>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '.75rem' }}>/</span>
            </>
          )}
          <span style={{ fontSize: '.75rem', color: 'var(--muted-foreground)' }}>
            {article.title}
          </span>
        </nav>
      </div>

      {/* Article header */}
      <header
        style={{
          width:         'min(1180px, calc(100% - 32px))',
          marginInline:  'auto',
          paddingBottom: '3rem',
          borderBottom:  '1px solid rgba(231,239,225,.07)',
        }}
      >
        <div
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            marginBottom:   '1.25rem',
          }}
        >
          {topic && (
            <span
              style={{
                fontSize:      '.5625rem',
                fontWeight:    700,
                letterSpacing: '.5em',
                textTransform: 'uppercase',
                color:         accentColor,
              }}
            >
              {topic.icon} {topic.shortTitle}
            </span>
          )}
        </div>

        <h1
          style={{
            fontSize:      'clamp(2rem, 5vw, 3.5rem)',
            fontWeight:    900,
            letterSpacing: '-.04em',
            lineHeight:    1.1,
            color:         'var(--foreground)',
            maxWidth:      '820px',
            marginBottom:  '1rem',
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            fontSize:    'clamp(1rem, 2vw, 1.25rem)',
            lineHeight:  1.6,
            color:       'var(--muted-foreground)',
            maxWidth:    '640px',
            marginBottom: '1.75rem',
          }}
        >
          {article.subtitle}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
          <DifficultyBadge difficulty={article.difficulty} size="md" />
          <span
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '5px',
              fontSize:   '.8125rem',
              color:      'var(--muted-foreground)',
            }}
          >
            <Clock size={13} />
            {article.readingTime} min read
          </span>
          <span
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '5px',
              fontSize:   '.8125rem',
              color:      'var(--muted-foreground)',
            }}
          >
            <Calendar size={13} />
            {formatDate(article.publishedAt)}
          </span>
          <span
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '5px',
              fontSize:   '.8125rem',
              color:      'var(--muted-foreground)',
            }}
          >
            <User size={13} />
            {article.author.name}
          </span>
        </div>
      </header>

      {/* Two-column layout */}
      <div
        className="lg:grid-cols-[1fr_minmax(0,280px)]"
        style={{
          width:         'min(1180px, calc(100% - 32px))',
          marginInline:  'auto',
          display:       'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap:           '3rem',
          paddingTop:    '2.5rem',
          paddingBottom: '5rem',
          alignItems:    'start',
        }}
      >
        {/* Main content */}
        <main>
          {/* Article body */}
          <article>
            {article.sections.map(section => (
              <ArticleSectionBlock key={section.id} section={section} />
            ))}
          </article>

          {/* Key takeaways */}
          {article.keyTakeaways.length > 0 && (
            <div
              style={{
                marginTop:    '3rem',
                padding:      '24px',
                borderRadius: '1.75rem',
                border:       `1px solid ${accentColor}20`,
                background:   `linear-gradient(135deg, ${accentColor}06, transparent)`,
              }}
            >
              <h3
                style={{
                  fontSize:      '.5625rem',
                  fontWeight:    700,
                  letterSpacing: '.4em',
                  textTransform: 'uppercase',
                  color:         accentColor,
                  opacity:       .8,
                  marginBottom:  '16px',
                }}
              >
                Key Takeaways
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {article.keyTakeaways.map((takeaway, i) => (
                  <li
                    key={i}
                    style={{
                      display:    'flex',
                      alignItems: 'flex-start',
                      gap:        '10px',
                      fontSize:   '.9375rem',
                      lineHeight: 1.6,
                      color:      'var(--muted-foreground)',
                    }}
                  >
                    <span
                      style={{
                        width:        '6px',
                        height:       '6px',
                        borderRadius: '50%',
                        background:   accentColor,
                        flexShrink:   0,
                        marginTop:    '8px',
                      }}
                    />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mark complete — feeds learning-journey progress */}
          <ArticleCompleteButton
            articleSlug={article.slug}
            pathSlugs={relatedPaths.map((p) => p.slug)}
            accentColor={accentColor}
          />

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <nav
              style={{
                marginTop:    '3rem',
                display:      'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
                gap:          '12px',
              }}
            >
              {prev ? (
                <Link href={`/knowledge/${prev.slug}`} style={{ textDecoration: 'none', gridColumn: '1' }}>
                  <div
                    style={{
                      padding:      '16px',
                      borderRadius: '1.25rem',
                      border:       '1px solid rgba(231,239,225,.08)',
                      background:   'rgba(231,239,225,.03)',
                      transition:   'border-color 200ms ease',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.6875rem', color: 'var(--muted-foreground)', marginBottom: '6px' }}>
                      <ArrowLeft size={11} /> Previous
                    </span>
                    <span style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3 }}>
                      {prev.title}
                    </span>
                  </div>
                </Link>
              ) : <div />}

              {next && (
                <Link href={`/knowledge/${next.slug}`} style={{ textDecoration: 'none', gridColumn: '2' }}>
                  <div
                    style={{
                      padding:      '16px',
                      borderRadius: '1.25rem',
                      border:       '1px solid rgba(231,239,225,.08)',
                      background:   'rgba(231,239,225,.03)',
                      textAlign:    'right',
                      transition:   'border-color 200ms ease',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', fontSize: '.6875rem', color: 'var(--muted-foreground)', marginBottom: '6px' }}>
                      Next <ArrowRight size={11} />
                    </span>
                    <span style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3 }}>
                      {next.title}
                    </span>
                  </div>
                </Link>
              )}
            </nav>
          )}
        </main>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KnowledgeTOC article={article} />

          {relatedPaths.length > 0 && (
            <LearningPathRail paths={relatedPaths} currentArticleSlug={article.slug} compact />
          )}

          {relatedArticles.length > 0 && (
            <RelatedConcepts articles={relatedArticles} />
          )}

          {glossaryTerms.length > 0 && (
            <GlossaryPreview terms={glossaryTerms} />
          )}
        </aside>
      </div>
    </div>
  );
}
