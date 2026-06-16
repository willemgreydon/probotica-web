import {
  ACCESSIBILITY_STORAGE_KEY,
  DEFAULT_A11Y_PREFERENCES,
  type AccessibilityPreferences,
} from '@/lib/accessibility/accessibility-modes';

export function parsePreferences(value: unknown): AccessibilityPreferences {
  if (!value || typeof value !== 'object') return DEFAULT_A11Y_PREFERENCES;
  const p = value as Partial<AccessibilityPreferences>;
  return {
    visualMode: p.visualMode ?? DEFAULT_A11Y_PREFERENCES.visualMode,
    fontScale: p.fontScale ?? DEFAULT_A11Y_PREFERENCES.fontScale,
    density: p.density ?? DEFAULT_A11Y_PREFERENCES.density,
    motion: p.motion ?? DEFAULT_A11Y_PREFERENCES.motion,
    transparency: p.transparency ?? DEFAULT_A11Y_PREFERENCES.transparency,
    focusEnhancement: Boolean(p.focusEnhancement),
    underlineLinks: Boolean(p.underlineLinks),
    reduceGlow: Boolean(p.reduceGlow),
    increaseBorders: Boolean(p.increaseBorders),
    simplifyInterface: Boolean(p.simplifyInterface),
  };
}

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === 'undefined') return DEFAULT_A11Y_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y_PREFERENCES;
    return parsePreferences(JSON.parse(raw));
  } catch {
    return DEFAULT_A11Y_PREFERENCES;
  }
}

export function saveAccessibilityPreferences(preferences: AccessibilityPreferences) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(preferences));
}

export function applyAccessibilityDataAttributes(prefs: AccessibilityPreferences) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.a11yMode = prefs.visualMode;
  root.dataset.fontScale = prefs.fontScale;
  root.dataset.density = prefs.density;
  root.dataset.motion = prefs.motion;
  root.dataset.transparency = prefs.transparency;
  root.dataset.focusEnhanced = String(prefs.focusEnhancement);
  root.dataset.underlineLinks = String(prefs.underlineLinks);
  root.dataset.reduceGlow = String(prefs.reduceGlow);
  root.dataset.increaseBorders = String(prefs.increaseBorders);
  root.dataset.simplifyInterface = String(prefs.simplifyInterface);
}

export function buildA11yInitScript() {
  return `(function(){try{var d=document.documentElement;var k='${ACCESSIBILITY_STORAGE_KEY}';var x=localStorage.getItem(k);var p=x?JSON.parse(x):{};d.dataset.a11yMode=p.visualMode||'default';d.dataset.fontScale=p.fontScale||'normal';d.dataset.density=p.density||'comfortable';d.dataset.motion=p.motion||'full';d.dataset.transparency=p.transparency||'full';d.dataset.focusEnhanced=String(!!p.focusEnhancement);d.dataset.underlineLinks=String(!!p.underlineLinks);d.dataset.reduceGlow=String(!!p.reduceGlow);d.dataset.increaseBorders=String(!!p.increaseBorders);d.dataset.simplifyInterface=String(!!p.simplifyInterface);}catch(e){}})();`;
}
