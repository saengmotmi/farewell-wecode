import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/google" />;
};

export default ProtectedRoute;
