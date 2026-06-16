'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LearningPath } from './knowledge-types';
import { quizByPath } from '../data/path-quizzes';

/**
 * Client-side, persisted learning progress (SE13/SE14).
 * Progress is tracked PER PATH so journeys are independent and fully re-doable:
 *  - a step counts as done when its article is marked complete within that path
 *  - a journey is "achieved" when every step is done AND its quiz is passed
 *  - resetPath() wipes a single journey so it can be re-done from scratch
 *
 * Persisted to localStorage under `probotica-knowledge-progress`, matching the
 * existing `probotica-*` storage convention. No backend required.
 */

const STORAGE_KEY = 'probotica-knowledge-progress';

interface QuizRecord {
  best: number; // best number correct
  total: number; // total questions
  attempts: number;
  passedAt?: number; // epoch ms of first pass
}

interface PathRecord {
  steps: Record<string, number>; // articleSlug -> completedAt (epoch ms)
  quiz?: QuizRecord;
}

interface ProgressState {
  paths: Record<string, PathRecord>;
}

const EMPTY: ProgressState = { paths: {} };

export interface PathStats {
  stepsDone: number;
  stepsTotal: number;
  percent: number; // 0–100 (steps only)
  quizPassed: boolean;
  quizBest?: number;
  quizTotal?: number;
  achieved: boolean;
  started: boolean;
}

interface ProgressContextValue {
  hydrated: boolean;
  isStepDone: (pathSlug: string, articleSlug: string) => boolean;
  setStepDone: (pathSlug: string, articleSlug: string, done: boolean) => void;
  /** Marks an article complete across every path passed (used on article pages). */
  markArticleInPaths: (pathSlugs: string[], articleSlug: string, done: boolean) => void;
  recordQuiz: (pathSlug: string, correct: number, total: number, passScore: number) => void;
  resetPath: (path: LearningPath) => void;
  getPathStats: (path: LearningPath) => PathStats;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function safeRead(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ProgressState;
    return parsed && typeof parsed === 'object' && parsed.paths ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function KnowledgeProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(safeRead());
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we never clobber stored data with EMPTY).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / disabled — progress simply won't persist */
    }
  }, [state, hydrated]);

  const setStepDone = useCallback((pathSlug: string, articleSlug: string, done: boolean) => {
    setState((prev) => {
      const path = prev.paths[pathSlug] ?? { steps: {} };
      const steps = { ...path.steps };
      if (done) steps[articleSlug] = Date.now();
      else delete steps[articleSlug];
      return { ...prev, paths: { ...prev.paths, [pathSlug]: { ...path, steps } } };
    });
  }, []);

  const markArticleInPaths = useCallback(
    (pathSlugs: string[], articleSlug: string, done: boolean) => {
      setState((prev) => {
        const paths = { ...prev.paths };
        for (const slug of pathSlugs) {
          const path = paths[slug] ?? { steps: {} };
          const steps = { ...path.steps };
          if (done) steps[articleSlug] = Date.now();
          else delete steps[articleSlug];
          paths[slug] = { ...path, steps };
        }
        return { ...prev, paths };
      });
    },
    [],
  );

  const recordQuiz = useCallback(
    (pathSlug: string, correct: number, total: number, passScore: number) => {
      setState((prev) => {
        const path = prev.paths[pathSlug] ?? { steps: {} };
        const prevQuiz = path.quiz;
        const best = Math.max(prevQuiz?.best ?? 0, correct);
        const passedNow = correct / total >= passScore;
        const quiz: QuizRecord = {
          best,
          total,
          attempts: (prevQuiz?.attempts ?? 0) + 1,
          passedAt: prevQuiz?.passedAt ?? (passedNow ? Date.now() : undefined),
        };
        return { ...prev, paths: { ...prev.paths, [pathSlug]: { ...path, quiz } } };
      });
    },
    [],
  );

  const resetPath = useCallback((path: LearningPath) => {
    setState((prev) => {
      const paths = { ...prev.paths };
      delete paths[path.slug];
      return { ...prev, paths };
    });
  }, []);

  const isStepDone = useCallback(
    (pathSlug: string, articleSlug: string) => Boolean(state.paths[pathSlug]?.steps[articleSlug]),
    [state],
  );

  const getPathStats = useCallback(
    (path: LearningPath): PathStats => {
      const record = state.paths[path.slug];
      const stepsTotal = path.steps.length;
      const stepsDone = path.steps.filter((s) => record?.steps[s.articleSlug]).length;
      const percent = stepsTotal ? Math.round((stepsDone / stepsTotal) * 100) : 0;
      const quiz = record?.quiz;
      const passScore = quizByPath[path.slug]?.passScore ?? 0.7;
      const quizPassed = quiz ? (quiz.passedAt != null || quiz.best / quiz.total >= passScore) : false;
      const hasQuiz = Boolean(quizByPath[path.slug]);
      const achieved = stepsDone === stepsTotal && stepsTotal > 0 && (!hasQuiz || quizPassed);
      return {
        stepsDone,
        stepsTotal,
        percent,
        quizPassed,
        quizBest: quiz?.best,
        quizTotal: quiz?.total,
        achieved,
        started: stepsDone > 0 || Boolean(quiz),
      };
    },
    [state],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      hydrated,
      isStepDone,
      setStepDone,
      markArticleInPaths,
      recordQuiz,
      resetPath,
      getPathStats,
    }),
    [hydrated, isStepDone, setStepDone, markArticleInPaths, recordQuiz, resetPath, getPathStats],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useKnowledgeProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useKnowledgeProgress must be used within a KnowledgeProgressProvider');
  }
  return ctx;
}
