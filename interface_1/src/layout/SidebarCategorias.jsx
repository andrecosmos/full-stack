import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategorias } from '../hooks/useCategorias';
import styles from './Sidebar.module.css';

export function SidebarCategorias() {
  const { categorias } = useCategorias();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        Categorias
      </button>

      {open && (
        <ul>
          {categorias.map((cat) => (
            <li key={cat.id}>
              <Link to={`/produtos/categoria/${cat.id}`}>
                {cat.nome}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}