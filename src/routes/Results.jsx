import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function Results() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Live • Results (Student View)" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid gap-3 max-w-sm">
          <Stat k="Quiz" v="Midterm Check" />
          <Stat k="Score" v="87%" />
          <div className="rounded-2xl p-4 bg-[var(--surface)]/70 border border-[var(--stroke)]">
            <div className="text-sm opacity-80 mb-2">Question Summary</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <SummaryRow label="Q1" value="✔" />
              <SummaryRow label="Q2" value="✖" />
              <SummaryRow label="Q3" value="✔" />
              <SummaryRow label="Q4" value="✔" />
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm opacity-80">
          <Link className="underline" to="/">Back to Dashboard</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8 text-sm opacity-80">
        <a className="underline" href={FIGMA_URL} target="_blank" rel="noreferrer">Open design in Figma</a>
      </div>
    </div>
  )
}

function Header({ title }) {
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <ThemeToggle />
    </header>
  )
}

function Stat({ k, v }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
      <div className="opacity-80">{k}</div>
      <div className="font-semibold">{v}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--surface)] border border-[var(--stroke)] px-3 py-2">
      <span className="opacity-80">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
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


