import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);
  const [quizStatus, setQuizStatus] = useState('creating'); // creating, published, live

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Professor • Create Quiz" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quiz Settings */}
        <div className="mb-8 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <div className="text-lg font-semibold mb-4">Quiz Settings</div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Quiz Title</Label>
              <Input placeholder="AI Fundamentals Quiz" />
            </div>
            <div>
              <Label>Course</Label>
              <Select options={["AI Quiz Builder", "FlightPlan – T9", "CS 4513"]} />
            </div>
            <div>
              <Label>PIN (4 digits)</Label>
              <Input placeholder="1234" maxLength="4" />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Questions ({questions.length})</div>
            <button 
              onClick={addQuestion}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
            >
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium">Question {index + 1}</div>
                <div className="flex items-center gap-2">
                  <select 
                    value={question.type}
                    onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                    className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="multiple_answer">Multiple Answer</option>
                    <option value="free_response">Free Response</option>
                  </select>
                  <button 
                    onClick={() => removeQuestion(question.id)}
                    className="px-3 py-2 rounded-xl text-sm font-medium bg-[var(--danger)] text-white hover:bg-[var(--danger)]/80"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <Label>Question Text</Label>
                <TextArea 
                  placeholder="Enter your question here..."
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                />
              </div>

              {/* Multiple Choice / True False Options */}
              {(question.type === 'multiple_choice' || question.type === 'true_false') && (
                <div className="space-y-3">
                  <Label>Answer Options</Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[var(--stroke)] flex items-center justify-center">
                        {question.correctAnswer === optionIndex && (
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-500)]" />
                        )}
                      </div>
                      <Input 
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                        className="flex-1"
                      />
                      <button 
                        onClick={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                        className={`px-3 py-1 rounded-lg text-xs ${
                          question.correctAnswer === optionIndex
                            ? 'bg-[var(--accent-500)] text-black'
                            : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)]'
                        }`}
                      >
                        Correct
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Multiple Answer Options */}
              {question.type === 'multiple_answer' && (
                <div className="space-y-3">
                  <Label>Answer Options (Select all correct answers)</Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded border-2 border-[var(--stroke)] flex items-center justify-center">
                        {(question.correctAnswers || []).includes(optionIndex) && (
                          <div className="w-2 h-2 rounded bg-[var(--accent-500)]" />
                        )}
                      </div>
                      <Input 
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                        className="flex-1"
                      />
                      <button 
                        onClick={() => {
                          const currentCorrect = question.correctAnswers || [];
                          const newCorrect = currentCorrect.includes(optionIndex)
                            ? currentCorrect.filter(i => i !== optionIndex)
                            : [...currentCorrect, optionIndex];
                          updateQuestion(question.id, 'correctAnswers', newCorrect);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs ${
                          (question.correctAnswers || []).includes(optionIndex)
                            ? 'bg-[var(--accent-500)] text-black'
                            : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)]'
                        }`}
                      >
                        Correct
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Free Response */}
              {question.type === 'free_response' && (
                <div>
                  <Label>Instructions for Students</Label>
                  <TextArea 
                    placeholder="Enter any specific instructions for this free response question..."
                    rows={2}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button 
            onClick={() => {
              // Save draft logic here
              alert('Quiz saved as draft!');
            }}
            className="px-6 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
          >
            Save Draft
          </button>
          <button 
            onClick={() => {
              // Publish quiz and show live results on same page
              setQuizStatus('published');
            }}
            className="px-6 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
          >
            Publish Quiz
          </button>
        </div>

        {/* Published State */}
        {quizStatus === 'published' && (
          <div className="mt-8 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
            <div className="text-lg font-semibold mb-4">Quiz Published Successfully!</div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-3">Quiz Information</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                    <div className="opacity-80">Quiz PIN</div>
                    <div className="font-semibold">1234</div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                    <div className="opacity-80">Participants</div>
                    <div className="font-semibold">0</div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                    <div className="opacity-80">Status</div>
                    <div className="font-semibold text-[var(--success)]">Live</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-3">Actions</div>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      // Start the quiz
                      setQuizStatus('live');
                    }}
                    className="w-full px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
                  >
                    Start Quiz
                  </button>
                  <button 
                    onClick={() => {
                      // View live results
                      window.location.href = '/professor/live-results';
                    }}
                    className="w-full px-4 py-2 rounded-xl text-sm font-medium bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80"
                  >
                    View Live Results
                  </button>
                </div>
              </div>
            </div>
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


