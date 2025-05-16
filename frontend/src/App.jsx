import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmergencyFIR from './pages/EmergencyFIR'

import BloodDonation from './pages/BloodDonation'
import BloodServices from './pages/BloodServices'
import OrganTransplant from './pages/OrganTransplant'
import Home from './pages/Home'
import HospitalSearch from './pages/HospitalSearch'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PreRegister from './pages/PreRegister'
import UserDashboard from './pages/user/UserDashboard'
import PoliceDashboard from './pages/admin/PoliceDashboard'
import HospitalDashboard from './pages/admin/HospitalDashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hospitals" element={<HospitalSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<EmergencyFIR />} />
            <Route path="/emergency" element={<EmergencyFIR />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/blood-donation" element={<BloodDonation />} />
            <Route path="/blood-services" element={<BloodServices />} />
            <Route path="/organ-transplant" element={<OrganTransplant />} />
            <Route path="/register" element={<PreRegister />} />
            <Route path="/admin/dashboard" element={<PoliceDashboard />} />
            <Route path="/admin/hospital" element={<HospitalDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
