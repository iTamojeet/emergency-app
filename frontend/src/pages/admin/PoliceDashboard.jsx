import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FIRCard = ({ fir, onView, onApprove, onReject, showActions = true }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'suicide':
        return 'text-red-600';
      case 'accident':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">📝 FIR #{fir.id}</span>
            <span className={`${getTypeColor(fir.type)}`}>{fir.type}</span>
            {fir.status && (
              <span className={`${getStatusColor(fir.status)}`}>
                {fir.status}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            <p>User: {fir.user}</p>
            <p>Location: {fir.location}</p>
            {fir.timestamp && (
              <p>{new Date(fir.timestamp).toLocaleString()}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onView(fir.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            👁️ View
          </button>
          {showActions && (
            <>
              <button
                onClick={() => onApprove(fir.id)}
                className="text-green-600 hover:text-green-800"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => onReject(fir.id)}
                className="text-red-600 hover:text-red-800"
              >
                ✕ Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const FIRDetails = ({ fir, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">FIR #{fir.id}</h2>
          <span className="text-red-600">{fir.type}</span>
          <span className="text-gray-600">{new Date(fir.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onApprove(fir.id)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve FIR
          </button>
          <button
            onClick={() => onReject(fir.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject FIR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Complainant Details</h3>
          <div className="space-y-2">
            <p><span className="text-gray-600">Name:</span> {fir.user}</p>
            <p><span className="text-gray-600">Age:</span> {fir.age}</p>
            <p><span className="text-gray-600">Gender:</span> {fir.gender}</p>
            <p><span className="text-gray-600">Contact:</span> {fir.contact}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Incident Location</h3>
          <p>{fir.location}</p>
          <button className="text-blue-600 hover:text-blue-800 mt-2">
            🗺️ View on Map
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Incident Description</h3>
        <p className="text-gray-700">{fir.description}</p>
      </div>

      {fir.evidence && fir.evidence.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Evidence Files</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fir.evidence.map((file, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded">
                <img src={file} alt={`Evidence ${index + 1}`} className="w-full h-24 object-cover rounded" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const [selectedFIR, setSelectedFIR] = useState(null);
  
  // Mock data
  const mockFIRs = {
    new: [
      {
        id: '#123',
        type: 'Suicide',
        user: 'Aryan',
        location: 'Howrah',
        timestamp: '2024-01-20 14:30',
        age: '24',
        gender: 'Male',
        contact: '+91 98765-43210',
        description: 'Emergency situation reported near Howrah Bridge',
        evidence: ['evidence1.jpg', 'evidence2.jpg']
      }
    ],
    history: [
      {
        id: '#122',
        type: 'Accident',
        status: 'Approved',
        user: 'Priya',
        location: 'Park Street',
        timestamp: '2024-01-20 13:15'
      },
      {
        id: '#121',
        type: 'Other',
        status: 'Rejected',
        user: 'Rahul',
        location: 'Salt Lake',
        timestamp: '2024-01-20 12:45'
      }
    ]
  };

  const handleView = (id) => {
    const fir = [...mockFIRs.new, ...mockFIRs.history].find(f => f.id === id);
    setSelectedFIR(fir);
  };

  const handleApprove = (id) => {
    console.log('Approving FIR:', id);
    // Add API call here
  };

  const handleReject = (id) => {
    console.log('Rejecting FIR:', id);
    // Add API call here
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <h1 className="text-xl font-bold">👮 Police FIR Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Officer on duty: John Smith</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedFIR ? (
          <>
            <button
              onClick={() => setSelectedFIR(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <FIRDetails
              fir={selectedFIR}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </>
        ) : (
          <div className="space-y-8">
            {/* New FIRs Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">New FIRs</h2>
              {mockFIRs.new.length > 0 ? (
                mockFIRs.new.map(fir => (
                  <FIRCard
                    key={fir.id}
                    fir={fir}
                    onView={handleView}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <p className="text-gray-600">No new FIRs to review</p>
              )}
            </div>

            {/* History Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Approved FIRs (History)</h2>
              {mockFIRs.history.map(fir => (
                <FIRCard
                  key={fir.id}
                  fir={fir}
                  onView={handleView}
                  showActions={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceDashboard; 