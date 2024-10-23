import React from 'react';
import LogIn from './pages/LogIn'
import Navbar from './Navbar'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import CurrentUser from './pages/CurrentUser'
import { Route, Routes } from "react-router-dom"


export default function App() 
{
  return (
    <>
    <Navbar />
    <div className="Container">
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/CurrentUser" element={<CurrentUser />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </div>
    </>
  );
}