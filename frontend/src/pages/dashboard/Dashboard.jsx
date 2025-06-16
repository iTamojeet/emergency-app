import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (isLoaded && isSignedIn && !userId) {
      // Redirect to the correct path if userId is missing
      navigate(`/dashboard/user/${user.id}`, { replace: true });
    }
  }, [isLoaded, isSignedIn, user, userId, navigate]);

  // If redirected, userId will be available from the URL
  const idToUse = userId || user?.id;

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome, User ID: {idToUse}</p>
    </div>
  );
}

export default Dashboard;
