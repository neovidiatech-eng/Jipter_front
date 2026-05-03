import { Navigate, Outlet } from 'react-router-dom';

const GuestGuard = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token) {
    // If already logged in, redirect to the appropriate dashboard based on role
    if (role === 'teacher') return <Navigate to="/teacher-dashboard" replace />;
    if (role === 'student') return <Navigate to="/student-dashboard" replace />;
    if (role === 'super_admin') return <Navigate to="/dashboard" replace />;
    
    // If token exists but no role is found, clear and stay at login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
