import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import withAuth from '../../components/withAuth';

const StatusBadge = ({ status }) => {
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

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

const FIRCard = ({ fir }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-lg font-semibold">FIR #{fir.id}</h3>
            <StatusBadge status={fir.status} />
          </div>
          <div className="text-gray-600 space-y-1">
            <p>Type: {fir.type}</p>
            <p>Location: {fir.location}</p>
            <p>Filed on: {new Date(fir.timestamp).toLocaleString()}</p>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-800">
          View Details →
        </button>
      </div>
      {fir.status === 'approved' && (
        <div className="mt-4 pt-4 border-t">
          <div className="text-gray-600">
            <p>Approved by: {fir.approvedBy}</p>
            <p>Police Station: {fir.policeStation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <button
        onClick={() => navigate('/report')}
        className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
      >
        🚨 Report Emergency
      </button>
      <button
        onClick={() => navigate('/blood-donation')}
        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        💉 Donate Blood
      </button>
      <button
        onClick={() => navigate('/organ-transplant')}
        className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
      >
        🫀 Organ Donation
      </button>
    </div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quick-actions');
  const [userProfile, setUserProfile] = useState(null);
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profile, userFirs] = await Promise.all([
          userService.getProfile(),
          userService.getUserFIRs()
        ]);
        setUserProfile(profile);
        setFirs(userFirs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    userService.logout();
    navigate('/login');
  };

  const handleQuickAction = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userProfile?.name || 'User'}
          </h1>
          
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['quick-actions', 'firs', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'quick-actions' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleQuickAction('/emergency')}
                className="p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                <h3 className="text-lg font-semibold text-red-700">Emergency Report</h3>
                <p className="mt-2 text-sm text-red-600">File an emergency FIR</p>
              </button>
              <button
                onClick={() => handleQuickAction('/blood-donation')}
                className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
              >
                <h3 className="text-lg font-semibold text-green-700">Blood Donation</h3>
                <p className="mt-2 text-sm text-green-600">Register as a donor</p>
              </button>
              <button
                onClick={() => handleQuickAction('/organ-transplant')}
                className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-700">Organ Donation</h3>
                <p className="mt-2 text-sm text-blue-600">Register for organ donation</p>
              </button>
            </div>
          )}

          {activeTab === 'firs' && (
            <div className="space-y-6">
              {firs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No FIRs filed yet</p>
              ) : (
                firs.map((fir) => (
                  <div
                    key={fir._id}
                    className="bg-white shadow rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{fir.type}</h3>
                        <p className="text-sm text-gray-500 mt-1">{new Date(fir.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          fir.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : fir.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {fir.status}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-600">{fir.description}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Location: {fir.location}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && userProfile && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Name</label>
                      <p className="mt-1">{userProfile.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1">{userProfile.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1">{userProfile.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Address</label>
                      <p className="mt-1">{userProfile.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserDashboard, ['user']); 