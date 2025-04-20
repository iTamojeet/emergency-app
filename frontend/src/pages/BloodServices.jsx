import React, { useState } from 'react';

const BloodServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  // Mock data for blood banks
  const bloodBanks = [
    {
      id: 1,
      name: 'Central Blood Bank',
      location: 'Park Street, Kolkata',
      contact: '+91 98765 43210',
      stock: {
        'A+': 50,
        'A-': 20,
        'B+': 45,
        'B-': 15,
        'AB+': 30,
        'AB-': 10,
        'O+': 60,
        'O-': 25
      }
    },
    {
      id: 2,
      name: 'City Blood Center',
      location: 'Salt Lake, Kolkata',
      contact: '+91 98765 43211',
      stock: {
        'A+': 40,
        'A-': 15,
        'B+': 55,
        'B-': 20,
        'AB+': 25,
        'AB-': 12,
        'O+': 50,
        'O-': 18
      }
    },
    // Add more blood banks as needed
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodGroup = !selectedBloodGroup || bank.stock[selectedBloodGroup] > 0;
    return matchesSearch && matchesBloodGroup;
  });

  const getStockLevel = (units) => {
    if (units > 40) return 'text-green-600 bg-green-100';
    if (units > 20) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blood Bank Services</h1>
          <p className="text-xl text-gray-600">Find blood availability in real-time across blood banks</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Search Blood Banks</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Filter by Blood Group</label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blood Banks List */}
        <div className="space-y-6">
          {filteredBloodBanks.map(bank => (
            <div key={bank.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{bank.name}</h3>
                  <p className="text-gray-600 mb-2">📍 {bank.location}</p>
                  <p className="text-gray-600">📞 {bank.contact}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Contact Blood Bank
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Available Blood Groups</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(bank.stock).map(([group, units]) => (
                    <div
                      key={group}
                      className={`p-3 rounded-lg ${getStockLevel(units)}`}
                    >
                      <div className="font-semibold">{group}</div>
                      <div>{units} units</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredBloodBanks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600">No blood banks found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-red-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Emergency Blood Requirement?</h3>
          <p className="text-gray-700 mb-4">
            For urgent blood requirements, please contact our 24/7 helpline or visit the nearest blood bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700">
              🚨 Emergency Helpline
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              🏥 Find Nearest Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodServices; 