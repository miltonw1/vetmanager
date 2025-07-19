import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSessionStore } from '../stores/session.store';

export function ProtectedRoute({ children }) {
  const { session, request, loadSession, isAuthenticated } = useSessionStore();

  useEffect(() => {
    if (request.idle) {
      loadSession();
    }
  }, [request.idle, loadSession]);

  if (request.fetching || request.idle) {
    return <div>Cargando...</div>; // O un spinner, etc.
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login"/>;
  }

  return children;
}