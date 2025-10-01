import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentLogin() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Join Quiz" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
            <div className="text-lg font-semibold mb-4">Join with QR Code</div>
            <div className="text-sm opacity-80 mb-4">Scan the QR code displayed by your professor</div>
            <div className="bg-white p-4 rounded-xl border border-[var(--stroke)] mb-4 flex items-center justify-center">
              <div className="text-6xl">📱</div>
            </div>
            <Link to="/student/login/qr" className="w-full block text-center px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Scan QR Code</Link>
          </div>

          <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
            <div className="text-lg font-semibold mb-4">Join with PIN</div>
            <div className="text-sm opacity-80 mb-4">Enter the quiz PIN provided by your professor</div>
            <Link to="/student/login/pin" className="w-full block text-center px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Join Quiz</Link>
          </div>
        </div>

        <div className="max-w-sm mx-auto mt-8 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <div className="text-lg font-semibold mb-4">Student Account</div>
          <Link to="/student/login/account" className="w-full block text-center px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80">Log in to Account</Link>
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



