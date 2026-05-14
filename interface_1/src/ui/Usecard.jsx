import { useNavigate } from 'react-router-dom';
import { Adicionar_carrinho } from '../functions/Adicionar_carrinho'; // Ajuste o caminho se necessário

function UseCard({ produto }) {
  const navigate = useNavigate();

  const irParaDetalhes = () => {
    // Redireciona para a página de detalhes do produto usando o ID dele
    navigate(`/produtos/${produto.id}`); 
  };

  return (
    <div className="card">
      <h1>{produto.nome}</h1>
      <img
        src={produto.imagem || '/placeholder.png'}
        alt={produto.nome}
        onClick={irParaDetalhes} // Opcional: clicar na imagem também detalha o produto
        style={{ cursor: 'pointer' }} 
      />
      <p className="linha">Preço: R$ {produto.preco}</p>
      
      <div className="card-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {/* Botão 1: Detalhar o produto */}
        <button className="btn-detalhes" onClick={irParaDetalhes}>
          Ver Detalhes
        </button>

        {/* Botão 2: Reutilizando o componente funcional que você já validou */}
        <Adicionar_carrinho produto={produto} />
      </div>
    </div>
  );
}

export default UseCard;
