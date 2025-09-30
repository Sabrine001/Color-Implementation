import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function CreateQuiz() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • Create Quiz" />
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-4">
        <div className="grid gap-3">
          <Label>Quiz Title</Label>
          <Input placeholder="Midterm Check" />
          <Label>Course</Label>
          <Select options={["AI Quiz Builder", "FlightPlan – T9"]} />
          <Label>PIN</Label>
          <Input placeholder="1234" />
        </div>
        <div className="grid gap-3">
          <Label>Question 1</Label>
          <TextArea placeholder="What is overfitting?" />
          <Label>Question 2</Label>
          <TextArea placeholder="Define gradient descent." />
        </div>
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80">Save Draft</button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Publish</button>
        </div>
      </div>
      <div className="mt-6 text-center text-sm opacity-80">
        <Link className="underline" to="/">Back to Dashboard</Link>
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

function Label({ children }) { return <div className="text-sm mb-1 opacity-80">{children}</div> }
function Input(props) { return <input {...props} className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]" /> }
function TextArea(props) { return <textarea {...props} rows={3} className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]" /> }
function Select({ options = [] }) { return (
  <select className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]">
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
) }

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}


