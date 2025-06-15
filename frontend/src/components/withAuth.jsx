import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        navigate('/dashboard');
      }
    }, [isAuthenticated, user, navigate]);

    if (!isAuthenticated()) {
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth; 