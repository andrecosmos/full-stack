import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UseCard from '../ui/Usecard';
import './ListarProduto.css';

function ProdutoCategoria() {
  // Alterado de 'produto' para 'produtos' para melhor legibilidade de código
  const [produtos, setProdutos] = useState([]);
  const { categoriaId } = useParams(); // Certifique-se de que a rota está usando 'categoriaId' como parâmetro
  
  useEffect(() => {
  async function buscarProdutos() {
    if (!categoriaId) return; 
    try {
      // 🟢 Certo: Adicionado o prefixo /produtos exigido pelo seu Router backend
      const resposta = await axios.get(`http://localhost:3000/produtos/categoria/${categoriaId}`); 
      setProdutos(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }
  buscarProdutos();
}, [categoriaId]);


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

export default ProdutoCategoria;
