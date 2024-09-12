import { Navigate, useLocation } from 'react-router-dom';
import { useUserProfileContext } from './context/UserProfileContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userProfile } = useUserProfileContext();
  const location = useLocation();

  if (!userProfile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !userProfile.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;