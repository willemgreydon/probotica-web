import type { Transition, Variants } from 'framer-motion';
import { EASE_OUT_EXPO, EASE_SPRING } from './easings';

export const TRANSITION_BASE: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

export const TRANSITION_SLOW: Transition = {
  duration: 1.1,
  ease: EASE_OUT_EXPO,
};

export const TRANSITION_SPRING: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 22,
  mass: 0.8,
};

export const TRANSITION_SPRING_SOFT: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 28,
  mass: 1,
};

/* ── Variant presets ── */

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: TRANSITION_BASE,
  },
};

export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const scaleUpVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION_BASE },
};

export const slideInRightVariants: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: TRANSITION_BASE },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};
