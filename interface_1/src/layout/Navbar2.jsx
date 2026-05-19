import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import styles from './Navbar2.module.css';


export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoria, setCategoria] = useState([]);
  
  useEffect(() => {
  async function obterCategoria() {
    try {
        const resposta = await axios.get(`http://localhost:3000/categorias`); 
        // Garante que salvamos apenas se for um array válido
        if (Array.isArray(resposta.data)) {
          setCategoria(resposta.data);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    obterCategoria();
}, []);



 return (
    // Ajustado para sintaxe de CSS Modules: styles.nomeDaClasse
    <nav className={styles.navbar2}>
      <div className={styles.logo}>
        <Link to="/">MinhaLoja</Link>
      </div>
      
      <ul className={styles['nav-links']}>
        <li><Link to="/">Início</Link></li>
        
        {/* Container do Dropdown */}
        <li 
          className={styles['dropdown-container']}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <span className={styles['dropdown-trigger']}>
            Categorias <span className={styles.arrow}>▼</span>
          </span>
          
          {/* Menu flutuante */}
          {isOpen && (
            <ul className={styles['dropdown-menu']}>
              {categoria.map((cat) => (
                <li key={cat.id}>
                  {/* Rota dinâmica apontando para a página de produtos daquela categoria */}
                  <Link to={`/produtos/categoria/${cat.id}`}>
                    {cat.nome}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        
      </ul>
    </nav>
  );
}
