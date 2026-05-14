import { useEffect, useState } from "react";
import { getCompras } from "../api/compraApi";
import './ListaCompra.css'

function ListaCompra() {
  const [compra, setCompra] = useState([]);
  const [expandedCompra, setExpandedCompra] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCompras();
        setCompra(data.content || data || []);
      } catch (error) {
        console.error("Erro ao buscar compras:", error); 
      }
    }

    fetchData();
  }, []);

  const toggleExpanded = (compraId) => {
    setExpandedCompra(expandedCompra === compraId ? null : compraId);
  };

  return (
    <div className="container">
      <h1 className="titulo">Lista de Compras</h1>

      <div className="grid">
        {compra.map((compra) => (
          <div className="card" key={compra.id}>
            <div className="card-body">
              <h3>Compra #{compra.id}</h3>
              <p className="preco">Total: R$ {compra.total}</p>
              <p className="item">Itens: {compra.itens.length}</p>
              <p className="status">Status: {compra.status}</p>
              
              <button 
                className="btn1" 
                onClick={() => toggleExpanded(compra.id)}
              >
                {expandedCompra === compra.id ? 'Ocultar Itens' : 'Ver Itens'}
              </button>
              
              {expandedCompra === compra.id && (
                <div className="itens-detalhes">
                  <h4>Itens da Compra:</h4>
                  <ul>
                    {compra.itens.map((item) => (
                      <li key={item.id} className="item-compra">
                        <span className="item-nome">{item.produto.nome}</span>
                        <span className="item-quantidade">Qtd: {item.quantidade}</span>
                        <span className="item-preco">R$ {item.precoFixo}</span>
                        <span className="item-subtotal">Subtotal: R$ {(item.precoFixo * item.quantidade).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default ListaCompra;