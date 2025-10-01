import { Link, useNavigate } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'
import { useState } from 'react'

export default function StudentLoginPIN() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [name, setName] = useState('')

  const handleJoin = () => {
    if (pin.length === 4) {
      navigate('/student/waiting')
    } else {
      alert('Please enter a 4-digit PIN')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Join with PIN" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <div className="text-lg font-semibold mb-4">Join with PIN</div>
          <div className="text-sm opacity-80 mb-4">Enter the quiz PIN provided by your professor</div>

          <Label>Quiz PIN</Label>
          <Input type="text" placeholder="Enter 4-digit PIN" maxLength="4" value={pin} onChange={(e)=>setPin(e.target.value)} />

          <Label className="mt-4">Your Name (Optional)</Label>
          <Input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />

          <button onClick={handleJoin} className="w-full mt-5 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]">Join Quiz</button>

          <div className="mt-6 text-center text-sm opacity-80">
            <Link className="underline" to="/student/login">Back to Join options</Link>
          </div>
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
  )
}
