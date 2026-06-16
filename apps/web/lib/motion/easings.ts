import type { Easing } from 'framer-motion';

export const EASE_OUT_EXPO:  Easing = [0.19, 1,    0.22, 1];
export const EASE_OUT_CIRC:  Easing = [0,    0.55, 0.45, 1];
export const EASE_SPRING:    Easing = [0.34, 1.56, 0.64, 1];
export const EASE_IN_OUT:    Easing = [0.76, 0,    0.24, 1];
export const EASE_OUT_BACK:  Easing = [0.34, 1.30, 0.64, 1];

export const GSAP_EASE_EXPO  = 'power4.out';
export const GSAP_EASE_CIRC  = 'circ.out';
export const GSAP_EASE_SPRING = 'elastic.out(1, 0.5)';
export const GSAP_EASE_NONE  = 'none';
