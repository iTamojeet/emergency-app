import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ to, children, className = "", isMobile = false }) => (
    <Link 
      to={to} 
      className={`${className} ${
        isMobile 
          ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
          : "text-gray-700 hover:text-gray-900"
      }`}
      onClick={() => isMobile && setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-600">🚨 LifeLine</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blood-donation">Blood Donation</NavLink>
            <NavLink to="/blood-services">Blood Services</NavLink>
            <NavLink to="/organ-transplant">Organ Transplant</NavLink>
            <NavLink to="/report">Report</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login/Register
            </NavLink>
            <NavLink 
              to="/emergency" 
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Emergency
            </NavLink>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" isMobile>Home</NavLink>
            <NavLink to="/blood-donation" isMobile>Blood Donation</NavLink>
            <NavLink to="/blood-services" isMobile>Blood Services</NavLink>
            <NavLink to="/organ-transplant" isMobile>Organ Transplant</NavLink>
            <NavLink to="/report" isMobile>Report</NavLink>
            <NavLink to="/dashboard" isMobile>Dashboard</NavLink>
            <NavLink 
              to="/login" 
              className="bg-blue-600 text-white hover:bg-blue-700"
              isMobile
            >
              Login/Register
            </NavLink>
            <NavLink 
              to="/emergency" 
              className="bg-red-600 text-white hover:bg-red-700"
              isMobile
            >
              Emergency
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 