import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentWaiting() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Waiting Room" />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-8">
          <div className="text-sm opacity-80">Quiz PIN</div>
          <div className="text-4xl font-semibold tracking-widest mt-1">1234</div>
          <div className="mt-6 text-sm opacity-80">Waiting for professor to start…</div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-500)] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)] animate-pulse" />
          </div>
          <Link to="/student/quiz" className="inline-block mt-8 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Go to Quiz</Link>
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

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}


