import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function ProfessorCourses() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • My Courses" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4">
          <CourseCard title="AI Quiz Builder" code="CS 5733" />
          <CourseCard title="FlightPlan – T9" code="SE IV" />
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

function CourseCard({ title, code }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
      <div className="text-sm opacity-70">{code}</div>
      <div className="text-base font-medium">{title}</div>
      <div className="mt-3 flex items-center justify-between">
        <Badge>Open</Badge>
        <Link to="/professor/create-quiz" className="border border-[var(--accent-500)] text-[var(--accent-500)] hover:bg-[var(--accent-500)] hover:text-black px-4 py-2 rounded-xl text-sm font-medium transition active:scale-[.98]">Enter</Link>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-[var(--accent-500)] text-black">{children}</span>;
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


