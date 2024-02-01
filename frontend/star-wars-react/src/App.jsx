import { useState } from 'react'
import { Route, Routes, Navigate, Link, NavLink } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Character } from './components/Character'
import { Film } from './components/Film'
import { Planet } from './components/Planet'


function App() {
  return (
    <>
      <div id='background'></div>
      <div id='content'>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/planet/:id" element={<Planet />} />
      </Routes>
      </div>
    </>
  )
}

export default App
