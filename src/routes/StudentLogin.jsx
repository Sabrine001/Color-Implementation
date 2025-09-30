import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentLogin() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Login" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-sm mx-auto rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <Label>Email</Label>
          <Input type="email" placeholder="student@oc.edu" />
          <div className="h-3" />
          <Label>Password</Label>
          <Input type="password" placeholder="••••••••" />
          <button className="w-full mt-5 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Log in</button>
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

function Label({ children }) { return <div className="text-sm mb-1 opacity-80">{children}</div> }
function Input(props) { return <input {...props} className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]" /> }

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}



