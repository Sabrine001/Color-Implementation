import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function ProfessorLiveResults() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStatus, setQuizStatus] = useState('active'); // waiting, active, paused, finished
  const [timeLeft, setTimeLeft] = useState(30);

  // Mock data for different question types
  const questionData = {
    current: {
      id: 1,
      type: "multiple_choice",
      question: "What is overfitting?",
      options: [
        "A model that generalizes well",
        "A model that memorizes training data", 
        "A regularization technique",
        "A data preprocessing step"
      ]
    },
    results: {
      participants: 27,
      responses: 24,
      correctAnswers: 18,
      percentage: 75
    },
    wordCloudData: [
      { word: "memorization", count: 15 },
      { word: "training", count: 12 },
      { word: "data", count: 10 },
      { word: "generalization", count: 8 },
      { word: "overfitting", count: 6 },
      { word: "model", count: 5 }
    ]
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • Live Results" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quiz Controls */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80">AI Fundamentals Quiz</div>
            <div className="text-lg font-semibold">Question {currentQuestion + 1} of 10</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setQuizStatus('active')}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
              >
                Start Quiz
              </button>
              <button 
                onClick={() => setQuizStatus(quizStatus === 'paused' ? 'active' : 'paused')}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
              >
                {quizStatus === 'paused' ? 'Resume' : 'Pause'}
              </button>
              <button 
                onClick={() => {
                  if (currentQuestion < 9) { // Assuming 10 questions total
                    setCurrentQuestion(currentQuestion + 1);
                  } else {
                    // Quiz finished, show results analysis on same page
                    setQuizStatus('finished');
                  }
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
              >
                {currentQuestion < 9 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Time Left</div>
              <div className="text-2xl font-bold text-[var(--accent-500)]">{timeLeft}s</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Question */}
          <div className="lg:col-span-2">
            <Panel title="Current Question">
              <div className="text-lg font-medium mb-4">{questionData.current.question}</div>
              <div className="grid gap-2">
                {questionData.current.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3">
                    <span>{option}</span>
                    <div className="flex items-center gap-2">
                      <div className="text-sm opacity-80">{Math.floor(Math.random() * 20) + 5}%</div>
                      <div className="w-16 h-2 rounded-full bg-[var(--surface)] border border-[var(--stroke)] overflow-hidden">
                        <div className="h-full bg-[var(--accent-500)]" style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Live Stats */}
          <div>
            <Panel title="Live Stats">
              <Stat k="Participants" v={questionData.results.participants} />
              <Stat k="Responses" v={questionData.results.responses} />
              <Stat k="Correct" v={`${questionData.results.correctAnswers} (${questionData.results.percentage}%)`} />
            </Panel>
          </div>
        </div>

        {/* Word Cloud for Free Response */}
        <div className="mt-6">
          <Panel title="Word Cloud (Free Response)">
            <div className="flex flex-wrap gap-2 justify-center">
              {questionData.wordCloudData.map((item, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-2 rounded-full bg-[var(--accent-500)]/20 text-[var(--accent-500)] border border-[var(--accent-500)]/30"
                  style={{ fontSize: `${Math.max(12, item.count * 2)}px` }}
                >
                  {item.word} ({item.count})
                </span>
              ))}
            </div>
          </Panel>
        </div>

        {/* Question History */}
        <div className="mt-6">
          <Panel title="Question History">
            <div className="grid grid-cols-5 gap-4">
              {[1,2,3,4,5].map((qNum) => (
                <div key={qNum} className="text-center">
                  <div className="text-sm opacity-80 mb-2">Q{qNum}</div>
                  <div className="text-2xl font-bold text-[var(--accent-500)]">{Math.floor(Math.random() * 40) + 60}%</div>
                  <div className="w-full h-2 rounded-full bg-[var(--surface)] border border-[var(--stroke)] mt-2 overflow-hidden">
                    <div className="h-full bg-[var(--accent-500)]" style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Quiz Finished State */}
        {quizStatus === 'finished' && (
          <div className="mt-6">
            <Panel title="Quiz Completed - Final Results">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-lg font-semibold mb-4">Overall Performance</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                      <div className="opacity-80">Total Participants</div>
                      <div className="font-semibold">{questionData.results.participants}</div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                      <div className="opacity-80">Average Score</div>
                      <div className="font-semibold">{questionData.results.percentage}%</div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                      <div className="opacity-80">Completion Rate</div>
                      <div className="font-semibold">92%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-4">Actions</div>
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        // Reset quiz
                        setCurrentQuestion(0);
                        setQuizStatus('waiting');
                        setTimeLeft(30);
                      }}
                      className="w-full px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
                    >
                      Start New Quiz
                    </button>
                    <button 
                      onClick={() => {
                        // View detailed analysis
                        window.location.href = '/professor/results-analysis';
                      }}
                      className="w-full px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
                    >
                      View Detailed Analysis
                    </button>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}

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


