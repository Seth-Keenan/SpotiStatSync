import React from 'react';
import Navbar from './Navbar'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import CurrentUser from './pages/CurrentUser'
import { Route, Routes } from "react-router-dom"


export default function App() {
  return (
    <>
    <Navbar />
    <div className="Container">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<Search />} />
        <Route path="/" element={<CurrentUser />} />
      </Routes>
    </div>
    </>
  );
}