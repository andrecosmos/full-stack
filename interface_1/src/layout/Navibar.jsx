
import { useState, useEffect, useContext } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../assets/logo1.png'
import { CarrinhoContext } from '../context/CarrinhoContext';
import CategoriaMenu from './CategoriaMenu';

function Navbar() {

  // Lê o valor atual do contador gerenciado pelo Contexto
  const { quantidadeTotal } = useContext(CarrinhoContext);
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="AutoSystem Logo" className={styles.logoImg} />
      </Link>
       <CategoriaMenu />
      <ul className={`${styles.menu} ${open ? styles.active : ''}`}>
        
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listar">Dashboard</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/cadastrar">Cadastrar Produto</Link></li>
        
        <li>
          <Link to="/comprar">
            🛒 Carrinho 
            {quantidadeTotal > 0 && (
              <span style={{
                backgroundColor: '#ff4d4d',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 8px',
                marginLeft: '5px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {quantidadeTotal}
              </span>
            )}
          </Link>
        </li>     
      </ul>

      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </button>
    </nav>
  )
}

export default Navbar