import React, { useState, useEffect } from 'react';
import { firService } from '../services/firService';
import withAuth from '../components/withAuth';

const Dashboard = () => {
  const [newFIRs, setNewFIRs] = useState([]);
  const [approvedFIRs, setApprovedFIRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFIRs();
  }, []);

  const fetchFIRs = async () => {
    try {
      const data = await firService.getAllFIRs();
      setNewFIRs(data.filter(fir => fir.status === 'pending'));
      setApprovedFIRs(data.filter(fir => fir.status !== 'pending'));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch FIRs');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await firService.updateFIRStatus(id, status);
      fetchFIRs(); // Refresh the list
    } catch (err) {
      setError('Failed to update FIR status');
    }
  };

  const StatusBadge = ({ type, status }) => {
    const getStatusColor = () => {
      switch (status?.toLowerCase()) {
        case 'approved':
          return 'bg-green-100 text-green-800';
        case 'rejected':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-yellow-100 text-yellow-800';
      }
    };

    const getTypeColor = () => {
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
      <div className="flex gap-2">
        <span className={`text-sm ${getTypeColor()}`}>{type}</span>
        {status && (
          <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor()}`}>
            {status}
          </span>
        )}
      </div>
    );
  };

  const FIRCard = ({ fir, showActions }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">📝 FIR #{fir.id}</span>
            <StatusBadge type={fir.emergencyType} status={fir.status} />
          </div>
          <div className="text-sm text-gray-600">
            <p>User: {fir.name}</p>
            <p>Loc: {fir.location}</p>
            {fir.timestamp && <p>{new Date(fir.timestamp).toLocaleString()}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {}} 
            className="text-blue-600 hover:text-blue-800"
          >
            👁️ View
          </button>
          {showActions && (
            <>
              <button
                onClick={() => handleStatusUpdate(fir.id, 'approved')}
                className="text-green-600 hover:text-green-800"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(fir.id, 'rejected')}
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <h1 className="text-2xl font-bold">Police FIR Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Officer on duty: John Smith</span>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">New FIRs</h2>
            {newFIRs.length === 0 ? (
              <p className="text-gray-600">No new FIRs to review</p>
            ) : (
              newFIRs.map(fir => (
                <FIRCard key={fir.id} fir={fir} showActions={true} />
              ))
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Approved FIRs (History)</h2>
            {approvedFIRs.length === 0 ? (
              <p className="text-gray-600">No FIR history available</p>
            ) : (
              approvedFIRs.map(fir => (
                <FIRCard key={fir.id} fir={fir} showActions={false} />
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard); 