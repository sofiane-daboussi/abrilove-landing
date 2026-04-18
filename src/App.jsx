import { Routes, Route } from 'react-router-dom'
import AccroPage from './pages/AccroPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AccroPage />} />
    </Routes>
  )
}
