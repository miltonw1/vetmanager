import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login"/>;
  }
  return children;
}
