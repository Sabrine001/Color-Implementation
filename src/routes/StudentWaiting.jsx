import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentWaiting() {
  const [waitingStatus, setWaitingStatus] = useState('waiting'); // waiting, starting, ready
  const [participants, setParticipants] = useState(23);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Waiting Room" />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Quiz Info */}
          <div className="text-center mb-8">
            <div className="text-2xl font-semibold mb-2">AI Fundamentals Quiz</div>
            <div className="text-sm opacity-80">CS 5733 - Professor Smith</div>
          </div>

          {/* Main Waiting Card */}
          <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-8 text-center">
            <div className="text-sm opacity-80 mb-2">Quiz PIN</div>
            <div className="text-4xl font-semibold tracking-widest mb-6">1234</div>
            
            {/* Status Display */}
            <div className="mb-6">
              {waitingStatus === 'waiting' && (
                <div>
                  <div className="text-lg mb-2">Waiting for professor to start…</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-500)] animate-pulse" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)] animate-pulse" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)] animate-pulse" />
                  </div>
                </div>
              )}
              {waitingStatus === 'starting' && (
                <div>
                  <div className="text-lg mb-2 text-[var(--accent-500)]">Quiz starting in 5 seconds...</div>
                  <div className="text-3xl font-bold text-[var(--accent-500)]">5</div>
                </div>
              )}
              {waitingStatus === 'ready' && (
                <div>
                  <div className="text-lg mb-4 text-[var(--success)]">Quiz is ready!</div>
                  <button 
                    onClick={() => {
                      // Navigate to quiz page
                      navigate('/student/quiz')
                    }}
                    className="inline-block px-6 py-3 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
                  >
                    Start Quiz
                  </button>
                </div>
              )}

              {waitingStatus === 'waiting' && (
                <div className="mt-4">
                  <button onClick={() => {
                      setWaitingStatus('starting')
                      // small simulated countdown to ready
                      setTimeout(() => setWaitingStatus('ready'), 2500)
                    }}
                    className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
                  >
                    Simulate Professor Start
                  </button>
                </div>
              )}
            </div>

            {/* Participants Count */}
            <div className="text-sm opacity-80">
              {participants} students joined
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 rounded-xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
            <div className="text-sm font-medium mb-2">Instructions</div>
            <div className="text-sm opacity-80 space-y-1">
              <div>• You'll see one question at a time</div>
              <div>• Answer each question before time runs out</div>
              <div>• Results will be shown after each question</div>
              <div>• Make sure you have a stable internet connection</div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm opacity-80">
            <Link className="underline" to="/">Back to Dashboard</Link>
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

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}


