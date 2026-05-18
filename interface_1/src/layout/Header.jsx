import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo5 from '../assets/logo5.png';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Limpa o cookie no backend e o estado no context
    navigate('/login'); // Envia o usuário deslogado para a página de login
  };

  return (
    <header style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Link  to="/" style={styles.logo}>Administrador</Link>
      <Link  to="/" style={styles.logo}>Cliente</Link>
    </div>
      <nav style={styles.nav}>
        {user ? (
          // O que aparece quando o usuário ESTÁ logado
          <div style={styles.userSection}>
            <span style={styles.welcomeText}>Olá, <strong>{user.name}</strong>!</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Sair</button>
          </div>
        ) : (
          // O que aparece quando o usuário NÃO está logado
          <Link to="/login" style={styles.loginLink}>Entrar / Criar Conta</Link>
        )}
      </nav>
    </header>
  );
};

// Estilos básicos inline para visualização imediata
const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#222', color: '#fff' },
  logo: { fontSize: '20px', fontWeight: 'bold', color: '#fff', textDecoration: 'none' ,height: '30px'},
  nav: { display: 'flex', alignItems: 'center' },
  userSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  welcomeText: { fontSize: '14px' , color: '#fff' },
  logoutButton: { background: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  loginLink: { color: '#f5faf6', textDecoration: 'none', fontWeight: 'bold' },
};

export default Header;
