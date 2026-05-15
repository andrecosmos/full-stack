import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  // 1. Estados locais para capturar os dados do formulário e feedback visual
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 2. Hooks de contexto e navegação do ecossistema React
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Captura se o usuário tentou acessar uma rota protegida antes (ex: /checkout)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Validação básica de segurança no lado do cliente
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setSubmitting(false);
      return;
    }

    // Executa a função de login do AuthContext (que se comunica com o Node.js)
    const result = await login(email, password);

    if (result.success) {
      // Redireciona o usuário para onde ele tentou ir ou para a home
      navigate(from, { replace: true });
    } else {
      // Exibe a mensagem de erro vinda diretamente do backend (Ex: "Credenciais inválidas")
      setError(result.error);
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Acessar Conta</h2>
        <p style={styles.subtitle}>Insira suas credenciais para continuar suas compras</p>

        {/* Alerta de erro amigável para o usuário */}
        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            style={submitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          >
            {submitting ? 'Verificando...' : 'Entrar na Loja'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilização inline básica para manter o componente autocontido (Substitua por Tailwind/CSS Modules)
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' },
  card: { width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  title: { margin: '0 0 0.5rem 0', color: '#1a1a1a', fontSize: '1.75rem', textAlign: 'center' },
  subtitle: { margin: '0 0 1.5rem 0', color: '#666666', fontSize: '0.9rem', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#333333' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #cccccc', fontSize: '1rem', outline: 'none' },
  button: { padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#ffffff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
  buttonDisabled: { backgroundColor: '#cccccc', cursor: 'not-allowed' },
  errorAlert: { padding: '0.75rem', borderRadius: '4px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }
};

export default Login;
