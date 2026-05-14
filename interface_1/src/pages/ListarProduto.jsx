import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseCard from '../ui/Usecard';
import './ListarProduto.css';

function ListarProdutos() {
  // Alterado de 'produto' para 'produtos' para melhor legibilidade de código
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await axios.get('http://localhost:3000/produtos');
        setProdutos(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    buscarProdutos();
  }, []);

  return (
    <div className="listar-produtos">
      <div className="grid">
        {produtos.map((item) => (
          <UseCard key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
}

export default ListarProdutos;
