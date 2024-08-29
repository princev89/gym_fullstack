import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { PostPage } from './pages/PostPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </>
  )
}

export default App
