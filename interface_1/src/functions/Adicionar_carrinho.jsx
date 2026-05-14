import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext'; // ajuste o caminho se necessário

export function Adicionar_carrinho({ produto }) {
  const navigate = useNavigate();
  const { atualizarContador } = useContext(CarrinhoContext);

  const adicionarAoCarrinho = () => {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const index = carrinhoAtual.findIndex(item => item.produtoId === produto.id);

    if (index >= 0) {
      carrinhoAtual[index].quantidade += 1;
    } else {
      carrinhoAtual.push({
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      });
    }

    // 1. Grava no disco local
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    
    // 2. IMPORTANTE: Notifica o Contexto para re-renderizar a Navbar
    atualizarContador(); 

    /* 3. Redireciona
    navigate('/comprar'); */
  };

  return (
    <button className="btn" onClick={adicionarAoCarrinho}>
      Adicionar ao carrinho
    </button>
  );
}
