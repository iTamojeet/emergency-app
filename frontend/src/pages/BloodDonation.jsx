import React, { useState } from 'react';
import withAuth from '../components/withAuth';

const BloodDonation = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    phone: '',
    location: '',
    lastDonation: '',
    medicalConditions: ''
  });

  const [searchQuery, setSearchQuery] = useState({
    bloodGroup: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donor registration
    console.log('Donor Registration:', formData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle donor search
    console.log('Search Query:', searchQuery);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blood Donation Services</h1>
          <p className="text-xl text-gray-600">Connect blood donors with those in need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Donor Registration Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Register as Donor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Donation Date</label>
                <input
                  type="date"
                  name="lastDonation"
                  value={formData.lastDonation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Medical Conditions (if any)</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                Register as Donor
              </button>
            </form>
          </div>

          {/* Find Donors Section */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-6">Find Blood Donors</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Blood Group Needed</label>
                  <select
                    name="bloodGroup"
                    value={searchQuery.bloodGroup}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={searchQuery.location}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Search Donors
                </button>
              </form>
            </div>

            {/* Blood Donation Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Blood Donation Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Get enough sleep the night before</li>
                <li>✓ Eat a healthy meal before donating</li>
                <li>✓ Drink plenty of water</li>
                <li>✓ Bring a valid ID and donor card</li>
                <li>✓ Wear comfortable clothing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(BloodDonation); 