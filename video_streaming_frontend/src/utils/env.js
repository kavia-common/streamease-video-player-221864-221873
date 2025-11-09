const FF_KEY = 'REACT_APP_FEATURE_FLAGS';

// PUBLIC_INTERFACE
export function getEnv(name, fallback = undefined) {
  /** Get environment variable value from process.env */
  const val = process.env[name];
  return typeof val === 'undefined' || val === null || val === '' ? fallback : val;
}

// PUBLIC_INTERFACE
export function getFeatureFlag(flagName, defaultEnabled = true) {
  /**
   * Feature flags are provided via REACT_APP_FEATURE_FLAGS as JSON or CSV like "PIP,MINI_PLAYER"
   * If absent, default to enabled.
   */
  const raw = getEnv(FF_KEY, '');
  if (!raw) return defaultEnabled;
  try {
    if (raw.trim().startsWith('{') || raw.trim().startsWith('[')) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.includes(flagName) || defaultEnabled;
      if (typeof parsed === 'object' && parsed !== null) {
        const v = parsed[flagName];
        return typeof v === 'boolean' ? v : defaultEnabled;
      }
    }
  } catch {
    // fallback to CSV parsing
  }
  const list = raw.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
  if (!list.length) return defaultEnabled;
  // If present we treat as enabled, if missing - default
  return list.includes(flagName.toUpperCase()) || defaultEnabled;
}

// PUBLIC_INTERFACE
export function getInitialTheme() {
  /** Determines initial theme: localStorage > prefers-color-scheme > light */
  const stored = localStorage.getItem('se.theme');
  if (stored) return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}
