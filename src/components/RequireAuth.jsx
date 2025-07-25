import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

function RequireAuth({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
