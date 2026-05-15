import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api'; // Importe a instância do Axios configurada para o backend

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Bloqueia renderizações enquanto checa o cookie

  // Executa automaticamente ao carregar o e-commerce pela primeira vez
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // O navegador envia o cookie automaticamente aqui devido ao withCredentials
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (error) {
        // Se falhar (401/403), o usuário simplesmente não está autenticado
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erro ao realizar login.' 
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao deslogar no servidor:', error);
    } finally {
      setUser(null); // Remove o usuário do estado de qualquer forma
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso nas páginas
export const useAuth = () => useContext(AuthContext);
