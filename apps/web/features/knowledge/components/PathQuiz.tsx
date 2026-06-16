'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, Award, HelpCircle } from 'lucide-react';
import type { PathQuiz as PathQuizType } from '../lib/knowledge-types';
import { useKnowledgeProgress } from '../lib/knowledge-progress';

interface PathQuizProps {
  quiz: PathQuizType;
  accentColor: string;
}

export function PathQuiz({ quiz, accentColor }: PathQuizProps) {
  const { recordQuiz } = useKnowledgeProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const passed = correctCount / total >= quiz.passScore;
  const passPct = Math.round(quiz.passScore * 100);

  const submit = () => {
    if (answeredCount < total) return;
    recordQuiz(quiz.pathSlug, correctCount, total, quiz.passScore);
    setSubmitted(true);
    // Scroll result into view for clarity.
    requestAnimationFrame(() => {
      document.getElementById('quiz-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const retake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section
      aria-label="Journey assessment"
      style={{
        padding: 'clamp(20px, 3vw, 28px)',
        borderRadius: '1.75rem',
        border: `1px solid ${accentColor}25`,
        background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <HelpCircle size={16} style={{ color: accentColor }} aria-hidden />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-.02em', color: 'var(--foreground)', margin: 0 }}>
          {quiz.title}
        </h2>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--muted-foreground)', margin: '0 0 20px' }}>
        {total} questions · pass at {passPct}% to earn the journey badge. You can retake it anytime.
      </p>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {quiz.questions.map((q, qi) => {
          const chosen = answers[q.id];
          return (
            <li key={q.id}>
              <p style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 10px' }}>
                <span style={{ color: accentColor, marginRight: 8 }}>{String(qi + 1).padStart(2, '0')}</span>
                {q.question}
              </p>
              <div style={{ display: 'grid', gap: 8 }}>
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === q.correctIndex;
                  let borderColor = 'var(--hud-border)';
                  let bg = 'var(--panel-inset)';
                  let icon = null as React.ReactNode;
                  if (submitted) {
                    if (isCorrect) {
                      borderColor = 'var(--success)';
                      bg = 'color-mix(in oklab, var(--success), transparent 88%)';
                      icon = <Check size={14} style={{ color: 'var(--success)', flexShrink: 0 }} aria-hidden />;
                    } else if (isChosen) {
                      borderColor = 'var(--danger)';
                      bg = 'color-mix(in oklab, var(--danger), transparent 88%)';
                      icon = <X size={14} style={{ color: 'var(--danger)', flexShrink: 0 }} aria-hidden />;
                    }
                  } else if (isChosen) {
                    borderColor = accentColor;
                    bg = `${accentColor}14`;
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                      className="focus-ring"
                      aria-pressed={isChosen}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        textAlign: 'left',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${borderColor}`,
                        background: bg,
                        color: 'var(--foreground)',
                        font: 'inherit',
                        fontSize: '.875rem',
                        cursor: submitted ? 'default' : 'pointer',
                        minHeight: 44,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: `1px solid ${isChosen ? accentColor : 'var(--hud-border)'}`,
                          background: isChosen && !submitted ? accentColor : 'transparent',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ flex: 1 }}>{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: '.8rem',
                    lineHeight: 1.55,
                    color: 'var(--muted-foreground)',
                    paddingLeft: 12,
                    borderLeft: `2px solid ${accentColor}55`,
                  }}
                >
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={answeredCount < total}
          className="btn btn-primary focus-ring"
          style={{ marginTop: 22, minHeight: 46, justifyContent: 'center', width: '100%', opacity: answeredCount < total ? 0.5 : 1 }}
        >
          {answeredCount < total ? `Answer all ${total} questions (${answeredCount}/${total})` : 'Submit answers'}
        </button>
      ) : (
        <div
          id="quiz-result"
          style={{
            marginTop: 22,
            padding: 18,
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${passed ? 'var(--success)' : 'var(--warning)'}55`,
            background: `color-mix(in oklab, ${passed ? 'var(--success)' : 'var(--warning)'}, transparent 90%)`,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <Award size={26} style={{ color: passed ? 'var(--success)' : 'var(--warning)', flexShrink: 0 }} aria-hidden />
          <div style={{ flex: 1, minWidth: 180 }}>
            <p style={{ margin: 0, fontWeight: 800, color: 'var(--foreground)' }}>
              {passed ? 'Passed! 🎉' : 'Almost there'} — {correctCount}/{total} correct
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '.82rem', color: 'var(--muted-foreground)' }}>
              {passed
                ? 'Quiz cleared. Complete all steps to earn the journey badge.'
                : `You need ${passPct}% to pass. Review the explanations and retake.`}
            </p>
          </div>
          <button type="button" onClick={retake} className="btn focus-ring" style={{ minHeight: 42, gap: 6 }}>
            <RotateCcw size={14} aria-hidden /> Retake
          </button>
        </div>
      )}
    </section>
  );
}
