import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategorias } from '../hooks/useCategorias';

import styles from './CategoriaMenu.module.css';

function CategoriaMenu() {
  const { categorias, loading } = useCategorias();

  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        Categorias ▼
      </button>

      {open && (
        <div className={styles.dropdown}>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            categorias.map((categoria) => (
              <Link
                key={categoria.id}
                to={`/produtos/categoria/${categoria.id}`}
                className={styles.item}
              >
                {categoria.nome}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CategoriaMenu;