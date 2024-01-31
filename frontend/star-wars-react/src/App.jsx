import { useState } from 'react'
import { Route, Routes, Navigate, Link, NavLink } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Character } from './components/Character'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </>
  )
}

export default App
