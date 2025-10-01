import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FIGMA_URL } from './figma'
import { setTheme } from '../themeHelpers'

export default function StudentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStatus, setQuizStatus] = useState('waiting'); // waiting, active, paused, finished

  // Mock quiz data with different question types
  const quizData = {
    title: "AI Fundamentals Quiz",
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "What is overfitting?",
        options: [
          "A model that generalizes well",
          "A model that memorizes training data", 
          "A regularization technique",
          "A data preprocessing step"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        type: "true_false",
        question: "Deep learning requires labeled data for training.",
        options: ["True", "False"],
        correctAnswer: 0
      },
      {
        id: 3,
        type: "multiple_answer",
        question: "Which of the following are machine learning algorithms? (Select all that apply)",
        options: [
          "Linear Regression",
          "Random Forest", 
          "K-Means Clustering",
          "Bubble Sort"
        ],
        correctAnswers: [0, 1, 2]
      },
      {
        id: 4,
        type: "free_response",
        question: "Explain the concept of gradient descent in your own words.",
        placeholder: "Type your answer here..."
      }
      ,
      {
        id: 5,
        type: "multiple_choice",
        question: "Which activation function is commonly used in deep neural networks?",
        options: ["Sigmoid", "ReLU", "Linear", "Step"],
        correctAnswer: 1
      },
      {
        id: 6,
        type: "multiple_choice",
        question: "Which metric measures the average error magnitude?",
        options: ["Accuracy", "Precision", "Mean Absolute Error", "Recall"],
        correctAnswer: 2
      }
    ]
  };

  const currentQ = quizData.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    if (currentQ.type === 'multiple_answer') {
      const currentAnswers = selectedAnswers[currentQuestion] || [];
      const newAnswers = currentAnswers.includes(answerIndex)
        ? currentAnswers.filter(a => a !== answerIndex)
        : [...currentAnswers, answerIndex];
      setSelectedAnswers({...selectedAnswers, [currentQuestion]: newAnswers});
    } else {
      setSelectedAnswers({...selectedAnswers, [currentQuestion]: answerIndex});
    }
  };

  const handleSubmit = () => {
    // Submit answer logic here
    console.log('Submitted answer:', selectedAnswers[currentQuestion]);
    
    // Move to next question or show results
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, show results on same page
      setQuizStatus('finished');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <Header title="Student • Quiz" />
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Quiz Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80">{quizData.title}</div>
            <div className="text-lg font-semibold">Question {currentQuestion + 1} of {quizData.questions.length}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm opacity-80">Time Left</div>
            <div className="text-2xl font-bold text-[var(--accent-500)]">{timeLeft}s</div>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
          <div className="text-lg font-medium mb-6">{currentQ.question}</div>
          
          {/* Multiple Choice / True False */}
          {(currentQ.type === 'multiple_choice' || currentQ.type === 'true_false') && (
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`text-left rounded-xl border px-4 py-3 transition ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-[var(--accent-500)] bg-[var(--accent-500)]/10'
                    : 'border-[var(--stroke)] bg-[var(--surface)] hover:bg-[var(--surface)]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-[var(--accent-500)] bg-[var(--accent-500)]'
                      : 'border-[var(--stroke)]'
                  }`} />
                  <span>{option}</span>
                </div>
              </button>
            ))}
            </div>
          )}

          {/* Multiple Answer */}
          {currentQ.type === 'multiple_answer' && (
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`text-left rounded-xl border px-4 py-3 transition ${
                  (selectedAnswers[currentQuestion] || []).includes(index)
                    ? 'border-[var(--accent-500)] bg-[var(--accent-500)]/10'
                    : 'border-[var(--stroke)] bg-[var(--surface)] hover:bg-[var(--surface)]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 ${
                    (selectedAnswers[currentQuestion] || []).includes(index)
                      ? 'border-[var(--accent-500)] bg-[var(--accent-500)]'
                      : 'border-[var(--stroke)]'
                  }`} />
                  <span>{option}</span>
                </div>
              </button>
            ))}
            </div>
          )}

          {/* Free Response */}
          {currentQ.type === 'free_response' && (
            <div>
              <textarea 
                placeholder={currentQ.placeholder}
                className="w-full h-32 bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-4 py-3 resize-none focus:border-[var(--accent-500)] focus:outline-none"
                value={selectedAnswers[currentQuestion] || ''}
                onChange={(e) => setSelectedAnswers({...selectedAnswers, [currentQuestion]: e.target.value})}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  currentQuestion === 0 
                    ? 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--stroke)] cursor-not-allowed' 
                    : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80'
                }`}
              >
                Previous
              </button>
              <div className="text-sm opacity-80">
                {currentQ.type === 'multiple_answer' && 'Select all that apply'}
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
            >
              {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>

        {/* Quiz Status */}
        <div className="mt-6 text-center">
          {quizStatus === 'waiting' && (
            <div className="text-sm opacity-80">Waiting for professor to start the quiz...</div>
          )}
          {quizStatus === 'paused' && (
            <div className="text-sm opacity-80">Quiz is paused by professor</div>
          )}
          {quizStatus === 'finished' && (
            <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-6">
              <div className="text-lg font-semibold mb-4">Quiz Completed!</div>
              <div className="grid gap-3 max-w-sm mx-auto">
                <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                  <div className="opacity-80">Score</div>
                  <div className="font-semibold">87%</div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                  <div className="opacity-80">Questions</div>
                  <div className="font-semibold">10/10</div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
                  <div className="opacity-80">Time</div>
                  <div className="font-semibold">4:32</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  // Reset quiz
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setQuizStatus('waiting');
                }}
                className="mt-4 px-6 py-2 rounded-xl text-sm font-medium bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]"
              >
                Take Quiz Again
              </button>
            </div>
          )}
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


