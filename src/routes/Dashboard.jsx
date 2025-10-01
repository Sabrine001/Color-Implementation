import { FIGMA_URL } from './figma'

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Quiz App • Dashboard" />

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        <Section title="Student Screens">
          <GridLink to="/student/login" label="Login" />
          <GridLink to="/student/results" label="Results" />
          <GridLink to="/student/waiting" label="Waiting" />
          <GridLink to="/student/quiz" label="Quiz" />
        </Section>

        <Section title="Professor Screens">
          <GridLink to="/professor/courses" label="My Courses" />
          <GridLink to="/professor/create-quiz" label="Create Quiz" />
          <GridLink to="/professor/live-results" label="Live Results" />
          <GridLink to="/professor/results-analysis" label="Results Analysis" />
        </Section>

        <ThemePanel />
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8 text-sm opacity-80">
        <a className="underline" href={FIGMA_URL} target="_blank" rel="noreferrer">Open design in Figma</a>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom'
import { setTheme, setAccent, setVar, getVar } from '../themeHelpers'

function Header({ title }) {
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-80">Theme</span>
        <ThemeToggle />
      </div>
    </header>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-5">
      <div className="text-sm uppercase tracking-wider opacity-70 mb-4">{title}</div>
      <div className="grid grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  )
}

function GridLink({ to, label }) {
  return (
    <Link to={to} className="rounded-xl border border-[var(--stroke)] bg-[var(--surface)] p-4 hover:bg-[var(--surface)]/80 transition">
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-70">Open</div>
    </Link>
  )
}

function ThemePanel() {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-5">
      <div className="text-sm uppercase tracking-wider opacity-70 mb-4">Theme Options</div>
      <div className="grid gap-3">
        <ThemeToggle />
        <AccentPicker />
        <LiveColorControls />
      </div>
    </div>
  )
}

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}

function LiveColorControls() {
  const rows = [
    { label: 'Background', var: '--bg' },
    { label: 'Surface', var: '--surface' },
    { label: 'Stroke', var: '--stroke' },
    { label: 'Text', var: '--text' },
    { label: 'Accent 500', var: '--accent-500' },
    { label: 'Accent 600', var: '--accent-600' },
    { label: 'Accent 700', var: '--accent-700' },
  ];
  return (
    <div className="grid gap-2 mt-2">
      <div className="text-sm opacity-80">Live Colors</div>
      {rows.map(r => (
        <div key={r.var} className="flex items-center gap-3">
          <div className="w-28 text-sm opacity-70">{r.label}</div>
          <input type="color" defaultValue={toColorInput(getVar(r.var))} onChange={(e) => setVar(r.var, e.target.value)} />
          <input type="text" className="flex-1 bg-[var(--surface)] border border-[var(--stroke)] rounded-md px-2 py-1" defaultValue={getVar(r.var)} onBlur={(e)=> setVar(r.var, e.target.value)} />
        </div>
      ))}
    </div>
  );
}

function toColorInput(v) {
  const hex = (v || '').trim();
  if (/^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(hex)) return hex;
  return '#000000';
}

function AccentPicker() {
  const options = [
    { name: 'Burnt Orange', v500: '#b45706', v600: '#8a3c00', v700: '#6b2d00' },
    { name: 'Indigo', v500: '#6366f1', v600: '#4f46e5', v700: '#4338ca' },
    { name: 'Emerald', v500: '#10b981', v600: '#059669', v700: '#047857' },
    { name: 'Rose', v500: '#f43f5e', v600: '#e11d48', v700: '#be123c' },
  ];
  return (
    <div>
      <div className="text-sm mb-2 opacity-80">Accent</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map(opt => (
          <button key={opt.name} onClick={() => setAccent(opt)} className="rounded-xl border border-[var(--stroke)] p-3 text-left bg-[var(--surface)] hover:bg-[var(--surface)]/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md" style={{ background: opt.v500 }} />
              <span className="text-sm">{opt.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


