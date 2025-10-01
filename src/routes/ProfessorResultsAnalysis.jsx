import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function ProfessorResultsAnalysis() {
  const [selectedQuiz, setSelectedQuiz] = useState('quiz1');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock data for results analysis
  const quizData = {
    quiz1: {
      title: "AI Fundamentals Quiz",
      date: "2024-01-15",
      totalQuestions: 10,
      participants: 27,
      averageScore: 82
    },
    quiz2: {
      title: "Machine Learning Concepts",
      date: "2024-01-22", 
      totalQuestions: 8,
      participants: 25,
      averageScore: 76
    }
  };

  const studentData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@oc.edu",
      score: 90,
      responses: [
        { question: 1, answer: "A", correct: true },
        { question: 2, answer: "True", correct: true },
        { question: 3, answer: "A,B,C", correct: true },
        { question: 4, answer: "Gradient descent is an optimization algorithm...", correct: true }
      ],
      timeSpent: 450, // seconds
      joinedLate: false
    },
    {
      id: 2,
      name: "Sarah Johnson", 
      email: "sarah.johnson@oc.edu",
      score: 60,
      responses: [
        { question: 1, answer: "B", correct: false },
        { question: 2, answer: "False", correct: false },
        { question: 3, answer: "A,B", correct: false },
        { question: 4, answer: "It's a method for finding the minimum...", correct: true }
      ],
      timeSpent: 380,
      joinedLate: true
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@oc.edu", 
      score: 85,
      responses: [
        { question: 1, answer: "A", correct: true },
        { question: 2, answer: "True", correct: true },
        { question: 3, answer: "A,B,C", correct: true },
        { question: 4, answer: "An iterative optimization algorithm...", correct: false }
      ],
      timeSpent: 520,
      joinedLate: false
    }
  ];

  const selectedQuizData = quizData[selectedQuiz];

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • Results Analysis" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quiz Selection */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80">Select Quiz</div>
            <select 
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="mt-1 bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]"
            >
              <option value="quiz1">AI Fundamentals Quiz (Jan 15)</option>
              <option value="quiz2">Machine Learning Concepts (Jan 22)</option>
            </select>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Quiz Overview</div>
            <div className="text-lg font-semibold">{selectedQuizData.title}</div>
            <div className="text-sm opacity-80">{selectedQuizData.participants} participants • {selectedQuizData.averageScore}% average</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="lg:col-span-1">
            <Panel title="Students">
              <div className="space-y-2">
                {studentData.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`w-full text-left rounded-xl border p-3 transition ${
                      selectedStudent === student.id
                        ? 'border-[var(--accent-500)] bg-[var(--accent-500)]/10'
                        : 'border-[var(--stroke)] bg-[var(--surface)] hover:bg-[var(--surface)]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm opacity-80">{student.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[var(--accent-500)]">{student.score}%</div>
                        {student.joinedLate && (
                          <div className="text-xs text-[var(--danger)]">Late</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          {/* Individual Student Analysis */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="space-y-6">
                {(() => {
                  const student = studentData.find(s => s.id === selectedStudent);
                  return (
                    <>
                      {/* Student Overview */}
                      <Panel title={`${student.name} - Detailed Analysis`}>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <Stat k="Score" v={`${student.score}%`} />
                          <Stat k="Time Spent" v={`${Math.floor(student.timeSpent / 60)}m ${student.timeSpent % 60}s`} />
                          <Stat k="Status" v={student.joinedLate ? "Joined Late" : "On Time"} />
                        </div>
                      </Panel>

                      {/* Question-by-Question Analysis */}
                      <Panel title="Question Responses">
                        <div className="space-y-4">
                          {student.responses.map((response, index) => (
                            <div key={index} className="rounded-xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">Question {response.question}</div>
                                <div className={`px-2 py-1 rounded-full text-xs ${
                                  response.correct 
                                    ? 'bg-[var(--success)]/20 text-[var(--success)]'
                                    : 'bg-[var(--danger)]/20 text-[var(--danger)]'
                                }`}>
                                  {response.correct ? 'Correct' : 'Incorrect'}
                                </div>
                              </div>
                              <div className="text-sm opacity-80">
                                <div className="mb-1">Student Answer:</div>
                                <div className="bg-[var(--surface)] rounded-lg p-2 border border-[var(--stroke)]">
                                  {response.answer}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>

                      {/* Performance Trends */}
                      <Panel title="Performance Insights">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="rounded-xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
                            <div className="text-sm opacity-80 mb-2">Strengths</div>
                            <div className="text-sm">
                              • Strong understanding of basic concepts<br/>
                              • Good response time<br/>
                              • Consistent participation
                            </div>
                          </div>
                          <div className="rounded-xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
                            <div className="text-sm opacity-80 mb-2">Areas for Improvement</div>
                            <div className="text-sm">
                              • Complex algorithm explanations<br/>
                              • Advanced mathematical concepts<br/>
                              • Practical applications
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </>
                  );
                })()}
              </div>
            ) : (
              <Panel title="Select a Student">
                <div className="text-center py-8">
                  <div className="text-lg opacity-80">Choose a student from the list to view their detailed results</div>
                </div>
              </Panel>
            )}
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

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-5">
      <div className="text-sm uppercase tracking-wider opacity-70 mb-3">{title}</div>
      {children}
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

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}
