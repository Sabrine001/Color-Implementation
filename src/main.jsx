import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './theme.css'
import { loadThemeFromStorage } from './themeHelpers'
import App from './App.jsx'

import Dashboard from './routes/Dashboard.jsx'
import StudentLogin from './routes/StudentLogin.jsx'
import ProfessorCourses from './routes/ProfessorCourses.jsx'
import CreateQuiz from './routes/CreateQuiz.jsx'
import Results from './routes/Results.jsx'
import StudentWaiting from './routes/StudentWaiting.jsx'
import StudentQuiz from './routes/StudentQuiz.jsx'
import ProfessorLiveResults from './routes/ProfessorLiveResults.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/student/login', element: <StudentLogin /> },
  { path: '/student/waiting', element: <StudentWaiting /> },
  { path: '/student/quiz', element: <StudentQuiz /> },
  { path: '/student/results', element: <Results /> },
  { path: '/professor/courses', element: <ProfessorCourses /> },
  { path: '/professor/create-quiz', element: <CreateQuiz /> },
  { path: '/professor/live-results', element: <ProfessorLiveResults /> },
  { path: '/demo', element: <App /> },
])

loadThemeFromStorage()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
