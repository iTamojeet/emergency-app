import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmergencyFIR from './pages/EmergencyFIR'
import Dashboard from './pages/Dashboard'
import BloodDonation from './pages/BloodDonation'
import BloodServices from './pages/BloodServices'
import OrganTransplant from './pages/OrganTransplant'
import Home from './pages/Home'
import HospitalSearch from './pages/HospitalSearch'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<HospitalSearch />} />
          <Route path="/report" element={<EmergencyFIR />} />
          <Route path="/emergency" element={<EmergencyFIR />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blood-donation" element={<BloodDonation />} />
          <Route path="/blood-services" element={<BloodServices />} />
          <Route path="/organ-transplant" element={<OrganTransplant />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
