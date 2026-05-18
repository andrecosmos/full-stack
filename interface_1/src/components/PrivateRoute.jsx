import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  // Se ainda estiver validando o cookie com o backend, exibe um carregando
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  // Se não estiver autenticado, redireciona estritamente para a tela de login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
