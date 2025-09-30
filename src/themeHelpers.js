export function setTheme(mode) {
  const root = document.documentElement;
  const map = {
    dark: {
      '--bg': '#0b0b0c',
      '--surface': '#191919',
      '--stroke': '#2b2b2b',
      '--text': '#f5f5f3',
      '--muted': '#a6a6a6',
      '--accent-700': '#6b2d00',
      '--accent-600': '#8a3c00',
      '--accent-500': '#b45706',
      '--success': '#22c55e',
      '--danger': '#ef4444',
    },
    light: {
      '--bg': '#f7f7f7',
      '--surface': '#ffffff',
      '--stroke': '#e5e5e5',
      '--text': '#101010',
      '--muted': '#606060',
      '--accent-700': '#7a3704',
      '--accent-600': '#a14805',
      '--accent-500': '#cf640e',
      '--success': '#16a34a',
      '--danger': '#dc2626',
    },
    high: {
      '--bg': '#000000',
      '--surface': '#0f0f0f',
      '--stroke': '#3a3a3a',
      '--text': '#ffffff',
      '--muted': '#c7c7c7',
      '--accent-700': '#ff7a00',
      '--accent-600': '#ffa200',
      '--accent-500': '#ffd000',
      '--success': '#00ff66',
      '--danger': '#ff3355',
    },
  };
  const next = map[mode];
  if (!next) return;
  Object.entries(next).forEach(([k, v]) => root.style.setProperty(k, v));
  persistTheme();
}

export function setAccent({ v500, v600, v700 }) {
  const root = document.documentElement;
  if (v500) root.style.setProperty('--accent-500', v500);
  if (v600) root.style.setProperty('--accent-600', v600);
  if (v700) root.style.setProperty('--accent-700', v700);
  persistTheme();
}

export function setVar(name, value) {
  const root = document.documentElement;
  root.style.setProperty(name, value);
  persistTheme();
}

export function getVar(name) {
  const root = document.documentElement;
  const v = getComputedStyle(root).getPropertyValue(name);
  return (v || '').trim();
}

export function persistTheme() {
  try {
    const keys = ['--bg','--surface','--stroke','--text','--muted','--accent-700','--accent-600','--accent-500','--success','--danger'];
    const data = Object.fromEntries(keys.map(k => [k, getVar(k)]));
    localStorage.setItem('quiz-theme', JSON.stringify(data));
  } catch {}
}

export function loadThemeFromStorage() {
  try {
    const raw = localStorage.getItem('quiz-theme');
    if (!raw) return;
    const data = JSON.parse(raw);
    const root = document.documentElement;
    Object.entries(data).forEach(([k, v]) => v && root.style.setProperty(k, v));
  } catch {}
}


