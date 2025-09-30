import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function ProfessorLiveResults() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • Live Results" />
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-4">
        <Panel title="Overview">
          <Stat k="Participants" v="27" />
          <Stat k="Avg Score" v="82%" />
          <Stat k="Median" v="84%" />
        </Panel>
        <Panel title="Question Correctness">
          <Bar label="Q1" pct={92} />
          <Bar label="Q2" pct={61} />
          <Bar label="Q3" pct={78} />
          <Bar label="Q4" pct={88} />
        </Panel>
        <div className="md:col-span-2 text-center text-sm opacity-80">
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

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-5">
      <div className="text-sm uppercase tracking-wider opacity-70 mb-3">{title}</div>
      <div className="grid gap-2">
        {children}
      </div>
    </div>
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

function Bar({ label, pct }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1 opacity-80">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--surface)] border border-[var(--stroke)] overflow-hidden">
        <div className="h-full bg-[var(--accent-500)]" style={{ width: pct + '%' }} />
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


