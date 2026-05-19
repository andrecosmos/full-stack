import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setCategorias(resposta.data);
        }
      })
      .catch((erro) => {
        console.error('Erro ao buscar categorias:', erro);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categorias, loading };
}