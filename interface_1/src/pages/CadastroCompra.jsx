import React, { useState, useEffect, useContext } from 'react'; // ADICIONADO: useContext
import { postCompras } from '../api/compraApi';
import { CarrinhoContext } from '../context/CarrinhoContext'; // ADICIONADO: import do contexto
import './CadastroCompra.css';

function CadastroCompra() {
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    
    // IMPORTANTE: Puxa a função do contexto global para atualizar o topo da página
    const { atualizarContador } = useContext(CarrinhoContext);
    
    const [carrinho, setCarrinho] = useState(() => {
        const salvos = localStorage.getItem('carrinho');
        return salvos ? JSON.parse(salvos) : [];
    });

    const totalCompra = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    // NOVA FUNÇÃO: Altera a quantidade de um item específico (+ ou -)
    const alterarQuantidade = (index, novaQuantidade) => {
        // Se a quantidade for menor que 1, não faz nada (ou você pode chamar a função removerItem)
        if (novaQuantidade < 1) return;

        const novoCarrinho = [...carrinho];
        novoCarrinho[index].quantidade = novaQuantidade;

        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        atualizarContador(); // Sincroniza o contador da Navbar
    };

    // NOVA FUNÇÃO: Remove todos os itens do carrinho de uma vez
    const limparCarrinhoCompleto = () => {
        setCarrinho([]);
        localStorage.removeItem('carrinho');
        atualizarContador(); // Zera o contador da Navbar
    };

    const removerItem = (index) => {
        const novoCarrinho = carrinho.filter((_, i) => i !== index);
        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        atualizarContador(); // Sincroniza o contador da Navbar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (carrinho.length === 0) {
            setMensagem({ tipo: 'erro', texto: 'O carrinho está vazio!' });
            return;
        }

        setLoading(true);
        try {
            const payload = { 
                itens: carrinho.map(item => ({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade
                }))
            };

            await postCompras(payload);

            setMensagem({ tipo: 'sucesso', texto: 'Compra realizada com sucesso!' });
            
            setCarrinho([]); 
            localStorage.removeItem('carrinho');
            atualizarContador(); // Zera o contador da Navbar após o sucesso da compra
            
            setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
        } catch (error) {
            console.error('Erro detalhado:', error.response?.data || error.message);
            setMensagem({
                tipo: 'erro',
                texto: error.response?.data?.message || 'Erro ao processar compra no servidor.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-cadastro">
            <div className="formulario-container">
                <h1>Finalizar Compra</h1>

                {mensagem.texto && (
                    <div className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</div>
                )}

                <div className="lista-carrinho">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Produtos no seu Carrinho:</h3>
                        {/* NOVO BOTÃO: Limpar Carrinho */}
                        {carrinho.length > 0 && (
                            <button className="btn-limpar" onClick={limparCarrinhoCompleto}>
                                🗑️ Limpar Carrinho
                            </button>
                        )}
                    </div>
                    
                    {carrinho.length === 0 ? (
                        <p>Seu carrinho está vazio. Volte à lista de produtos.</p>
                    ) : (
                        <>
                            <table className="tabela-itens">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço Un.</th>
                                        <th>Qtd</th>
                                        <th>Subtotal</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrinho.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nome}</td>
                                            <td>R$ {item.preco.toFixed(2)}</td>
                                            <td>
                                                {/* MODIFICADO: Controles de quantidade com botões */}
                                                <div className="controles-qtd" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                    <button 
                                                        className="btn-qtd" 
                                                        onClick={() => alterarQuantidade(index, item.quantidade - 1)}
                                                        disabled={item.quantidade <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantidade}</span>
                                                    <button 
                                                        className="btn-qtd" 
                                                        onClick={() => alterarQuantidade(index, item.quantidade + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                                            <td>
                                                <button className="btn-remover" onClick={() => removerItem(index)}>Remover</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="total-container">
                                <h2>Total: R$ {totalCompra.toFixed(2)}</h2>
                            </div>
                        </>
                    )}
                </div>

                {carrinho.length > 0 && (
                    <button onClick={handleSubmit} disabled={loading} className="btn-finalizar">
                        {loading ? 'Processando...' : 'Confirmar Pedido'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CadastroCompra;
