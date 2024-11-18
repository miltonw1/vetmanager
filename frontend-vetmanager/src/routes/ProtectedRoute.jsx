import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('token expiration');

  if (!token || !expiration) {
    return false;
  }

  const now = new Date();
  const expirationDate = new Date(parseInt(expiration) * 1000);


  if (expirationDate <= now) {

    localStorage.removeItem('token');
    localStorage.removeItem('token expiration');
    return false;
  }

  return true;
};

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login"/>;
  }
  return children;
}
