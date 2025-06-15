import React, { useState } from 'react';
import withAuth from '../components/withAuth';

const OrganTransplant = () => {
  const [formType, setFormType] = useState('donor'); // 'donor' or 'recipient'
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    phone: '',
    location: '',
    organType: '',
    medicalHistory: '',
    hospitalName: '',
    doctorName: '',
    urgencyLevel: 'normal'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', { type: formType, ...formData });
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organTypes = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Corneas'];
  const urgencyLevels = ['normal', 'urgent', 'critical'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Organ Transplant Services</h1>
          <p className="text-xl text-gray-600">Connect organ donors with recipients and save lives</p>
        </div>

        {/* Form Type Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setFormType('donor')}
              className={`px-6 py-2 rounded-md ${
                formType === 'donor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Donor
            </button>
            <button
              onClick={() => setFormType('recipient')}
              className={`px-6 py-2 rounded-md ${
                formType === 'recipient'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Recipient
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {formType === 'donor' ? 'Organ Donor Registration' : 'Organ Recipient Registration'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="block text-gray-700 mb-2">Organ Type</label>
                <select
                  name="organType"
                  value={formData.organType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Organ Type</option>
                  {organTypes.map(organ => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>

              {formType === 'recipient' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Hospital Name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Doctor's Name</label>
                    <input
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Urgency Level</label>
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {formType === 'donor' ? 'Register as Donor' : 'Submit Recipient Application'}
            </button>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ All organ donations are strictly voluntary</li>
            <li>✓ Medical verification is required for both donors and recipients</li>
            <li>✓ Your information will be kept confidential</li>
            <li>✓ Priority is given based on medical urgency</li>
            <li>✓ Contact your nearest hospital for detailed medical assessment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrganTransplant); 