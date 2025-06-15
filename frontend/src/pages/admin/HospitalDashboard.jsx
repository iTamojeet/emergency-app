import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuth from '../../components/withAuth';

const ICUBedCounter = ({ count, total }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">ICU Beds</h3>
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-blue-600">{count}</div>
      <div className="text-gray-500">/ {total}</div>
    </div>
  </div>
);

const OxygenSupply = ({ status }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Oxygen Supply</h3>
    <div className="flex items-center justify-between">
      <div className="text-gray-600">Status</div>
      <div className={`w-12 h-6 ${status ? 'bg-green-500' : 'bg-gray-300'} rounded-full relative`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${status ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  </div>
);

const SpecialistTags = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Specialists</h3>
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cardio</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Neuro</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ortho</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Emergency</span>
    </div>
  </div>
);

const IncomingFIRCard = ({ fir }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-red-600 font-medium">{fir.type}</span>
        <div className="text-gray-500 text-sm mt-1">
          {fir.gender} • {fir.age} years
        </div>
      </div>
      <div className="text-gray-500 text-sm">{fir.eta}</div>
    </div>
    <div className="flex justify-between">
      <button className="text-blue-600 hover:text-blue-800">View Details</button>
      <div className="space-x-2">
        <button className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200">Accept</button>
        <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Reject</button>
      </div>
    </div>
  </div>
);

const EmergencyCaseDetails = ({ patient, onBackToDashboard }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBackToDashboard} className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </button>
          <h2 className="text-xl font-semibold">Emergency Case Details</h2>
          <span className="text-red-600">FIR-123</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <div className="text-gray-500 mt-1">High Priority</div>
            </div>
            <button className="text-blue-600 hover:text-blue-800">View History</button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-500">Age</label>
              <p>{patient.age} years</p>
            </div>
            <div>
              <label className="text-gray-500">Gender</label>
              <p>{patient.gender}</p>
            </div>
            <div>
              <label className="text-gray-500">Blood Group</label>
              <p>{patient.bloodGroup}</p>
            </div>
            <div>
              <label className="text-gray-500">Weight</label>
              <p>{patient.weight}kg</p>
            </div>
          </div>
        </div>

        {/* Current Vitals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Current Vitals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500">BP</label>
              <p className="text-xl font-semibold">120/80</p>
            </div>
            <div>
              <label className="text-gray-500">Heart Rate</label>
              <p className="text-xl font-semibold">88 bpm</p>
            </div>
            <div>
              <label className="text-gray-500">Temperature</label>
              <p className="text-xl font-semibold">98.6°F</p>
            </div>
            <div>
              <label className="text-gray-500">Oxygen</label>
              <p className="text-xl font-semibold">97%</p>
            </div>
            <div>
              <label className="text-gray-500">Consciousness</label>
              <p className="text-xl font-semibold">Alert</p>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Medical History</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-500">Conditions</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">Depression</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">Anxiety</span>
              </div>
            </div>
            <div>
              <h4 className="text-gray-500">Allergies</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Penicillin</span>
              </div>
            </div>
            <div>
              <h4 className="text-gray-500">Current Medications</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Sertraline</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Details */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Incident Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-gray-500">Location</label>
            <p>Howrah Bridge</p>
          </div>
          <div>
            <label className="text-gray-500">Time</label>
            <p>2024-01-20 14:30</p>
          </div>
          <div className="col-span-2">
            <label className="text-gray-500">Description</label>
            <p className="mt-1">Attempted suicide case requiring immediate medical attention. Found by local police.</p>
          </div>
          <div className="col-span-2">
            <label className="text-gray-500">First Aid Provided</label>
            <p className="mt-1">Basic stabilization by EMT</p>
            <p className="text-sm text-gray-500">Transport: Ambulance (WB-01-1234)</p>
          </div>
        </div>
      </div>

      {/* Assigned Team */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assigned Team</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Accept Case
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Reject Case
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500">Primary Doctor</label>
            <p>Dr. Sarah Patel</p>
            <p className="text-sm text-gray-500">Emergency Psychiatrist</p>
          </div>
          <div>
            <label className="text-gray-500">Assisting</label>
            <p>Nurse Ganguly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);
  
  // Mock data
  const mockCase = {
    name: 'Aryan Kumar',
    age: 23,
    gender: 'Male',
    bloodGroup: 'B+',
    weight: '75kg',
  };

  const mockFIRs = [
    {
      type: 'Suicide',
      gender: 'Male',
      age: '23',
      eta: 'ETA: 10 mins'
    },
    {
      type: 'Accident',
      gender: 'Female',
      age: '45',
      eta: 'ETA: 15 mins'
    }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  if (selectedCase) {
    return <EmergencyCaseDetails 
      patient={mockCase}
      onBackToDashboard={() => setSelectedCase(null)}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">🏥 Hospital Dashboard</h1>
              <span className="text-gray-600">City General Hospital</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ICUBedCounter count={4} total={10} />
          <OxygenSupply status={true} />
          <SpecialistTags />
        </div>

        {/* Incoming FIRs */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Incoming FIRs</h2>
            <span className="text-red-600">2 Pending</span>
          </div>
          <div className="space-y-4">
            {mockFIRs.map((fir, index) => (
              <IncomingFIRCard 
                key={index} 
                fir={fir}
                onClick={() => setSelectedCase(fir)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(HospitalDashboard, ['hospital']); 