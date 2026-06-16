export type AccessibilityVisualMode =
  | 'default'
  | 'high-contrast'
  | 'soft-contrast'
  | 'dark-high-contrast'
  | 'light-high-contrast'
  | 'monochrome'
  | 'deuteranopia'
  | 'protanopia'
  | 'tritanopia'
  | 'low-vision'
  | 'dyslexia-friendly'
  | 'focus-mode'
  | 'reduced-motion'
  | 'migraine-safe';

export type FontScale = 'normal' | 'large' | 'x-large';
export type DensityMode = 'comfortable' | 'compact' | 'spacious';
export type MotionMode = 'full' | 'reduced' | 'none';
export type TransparencyMode = 'full' | 'reduced' | 'none';

export type AccessibilityPreferences = {
  visualMode: AccessibilityVisualMode;
  fontScale: FontScale;
  density: DensityMode;
  motion: MotionMode;
  transparency: TransparencyMode;
  focusEnhancement: boolean;
  underlineLinks: boolean;
  reduceGlow: boolean;
  increaseBorders: boolean;
  simplifyInterface: boolean;
};

export const DEFAULT_A11Y_PREFERENCES: AccessibilityPreferences = {
  visualMode: 'default',
  fontScale: 'normal',
  density: 'comfortable',
  motion: 'full',
  transparency: 'full',
  focusEnhancement: false,
  underlineLinks: false,
  reduceGlow: false,
  increaseBorders: false,
  simplifyInterface: false,
};

export const ACCESSIBILITY_STORAGE_KEY = 'probotica-a11y-preferences';

export const VISUAL_MODE_BADGES: Record<AccessibilityVisualMode, string> = {
  default: 'Balanced default',
  'high-contrast': 'Best for low vision',
  'soft-contrast': 'Best for eye fatigue',
  'dark-high-contrast': 'Best for dark clarity',
  'light-high-contrast': 'Best for bright clarity',
  monochrome: 'Best for achromatopsia',
  deuteranopia: 'Best for red-green CVD',
  protanopia: 'Best for red weakness',
  tritanopia: 'Best for blue-yellow CVD',
  'low-vision': 'Best for reduced acuity',
  'dyslexia-friendly': 'Best for reading support',
  'focus-mode': 'Best for ADHD focus',
  'reduced-motion': 'Best for vestibular comfort',
  'migraine-safe': 'Best for light sensitivity',
};
