import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Donation from './pages/donation/Donation';
import Emergency from './pages/emergency/Emergency';
import SignInPage from './auth/sign-in';
import Profile from './pages/user/Profile';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />

        <Route
  path="/dashboard/user/:userId?"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency"
          element={
            <ProtectedRoute>
              <Emergency />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route to redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
