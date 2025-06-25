import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default ProtectedRoute;