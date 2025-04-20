import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import EmergencyFIR from './pages/EmergencyFIR'

function App() {
  return (
    <Router>
      <div className="-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-red-600">🚨 LifeLine</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                <Link to="/report" className="text-gray-700 hover:text-gray-900">Report</Link>
                <Link to="/emergency" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Emergency
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to LifeLine Emergency Services</h1>
                <p className="text-xl text-gray-600 mb-8">Your safety is our priority. Report emergencies quickly and securely.</p>
                <Link to="/report" className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-700">
                  File Emergency Report
                </Link>
              </div>
            } />
            <Route path="/report" element={<EmergencyFIR />} />
            <Route path="/emergency" element={<EmergencyFIR />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
