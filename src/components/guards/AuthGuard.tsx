import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  allowedRoles?: string[];
}

const AuthGuard = ({ allowedRoles }: AuthGuardProps) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || '')) {
    console.warn(`Access denied for role: ${role}. Allowed roles: ${allowedRoles}`);

    if (role === 'student') return <Navigate to="/student-dashboard" replace />;
    if (role === 'teacher') return <Navigate to="/teacher-dashboard" replace />;
    if (role === 'super_admin') return <Navigate to="/dashboard" replace />;
    if (role === "admin") return <Navigate to="/dashboard" replace />

    // If no valid role is found, clear and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
