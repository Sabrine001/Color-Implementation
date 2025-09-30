import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentQuiz() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Quiz" />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <div className="text-sm opacity-80">Question 1 of 10</div>
          <div className="text-lg font-medium mt-1">What is overfitting?</div>
          <div className="mt-4 grid gap-2">
            {['A model that generalizes well','A model that memorizes training data','A regularization technique','A data preprocessing step'].map((opt) => (
              <button key={opt} className="text-left rounded-xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 hover:bg-[var(--surface)]/80">
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80">Previous</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Next</button>
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

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}


