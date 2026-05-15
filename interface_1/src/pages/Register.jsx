import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
  // 1. Estados locais do formulário de cadastro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados de feedback visual
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    // Validação básica do lado do cliente antes de gastar recursos de rede
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      setSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setSubmitting(false);
      return;
    }

    try {
      // Faz o envio direto dos dados para o backend via instância configurada do Axios
      await api.post('/auth/register', { name, email, password });
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      
      // Limpa os campos
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Aguarda 2 segundos para o usuário ver a mensagem de sucesso e redireciona para o login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Captura o erro customizado vindo do Node.js (ex: status 409 de e-mail em uso)
      setError(err.response?.data?.error || 'Ocorreu um erro ao realizar o cadastro.');
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>
        <p style={styles.subtitle}>Cadastre-se para gerenciar seus pedidos e finalizar compras</p>

        {/* Alertas dinâmicos de feedback */}
        {error && <div style={styles.errorAlert}>{error}</div>}
        {success && <div style={styles.successAlert}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Nome Completo</label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              style={styles.input}
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={submitting}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            style={submitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          >
            {submitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>

        <p style={styles.footerText}>
          Já possui uma conta? <Link to="/login" style={styles.link}>Faça login</Link>
        </p>
      </div>
    </div>
  );
};

// Estilização consistente com a tela de login para manter a identidade visual do projeto
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' },
  card: { width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  title: { margin: '0 0 0.5rem 0', color: '#1a1a1a', fontSize: '1.75rem', textAlign: 'center' },
  subtitle: { margin: '0 0 1.5rem 0', color: '#666666', fontSize: '0.9rem', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.1rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#333333' },
  input: { padding: '0.7rem', borderRadius: '4px', border: '1px solid #cccccc', fontSize: '1rem', outline: 'none' },
  button: { padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#ffffff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
  buttonDisabled: { backgroundColor: '#cccccc', cursor: 'not-allowed' },
  errorAlert: { padding: '0.75rem', borderRadius: '4px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' },
  successAlert: { padding: '0.75rem', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' },
  footerText: { marginTop: '1.5rem', fontSize: '0.9rem', color: '#666666', textAlign: 'center' },
  link: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;
