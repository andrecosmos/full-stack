import React, { useState, useEffect } from 'react';
import { create } from '../api/produtoApi';
import { getAll as getAllCategorias } from '../api/categoriaApi';
import './CadastroProduto.css'

function CadastroProduto() {
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        imagem: '',
        categoriaId: '',
        descricao: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    // Carregar categorias ao montar o componente
    useEffect(() => {
        const carregarCategorias = async () => {
            try {
                const dados = await getAllCategorias();
                setCategorias(dados);
            } catch (error) {
                setMessage({ type: 'error', text: 'Erro ao carregar categorias: ' + error.message });
            }
        };
        carregarCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpar mensagens ao usuário começar a digitar
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            // Validação dos campos
            if (!formData.nome.trim()) {
                throw new Error('Nome do produto é obrigatório');
            }
            if (!formData.preco || formData.preco <= 0) {
                throw new Error('Preço deve ser maior que zero');
            }
            if (!formData.categoriaId) {
                throw new Error('Categoria é obrigatória');
            }
            if (!formData.imagem.trim()) {
                throw new Error('Imagem é obrigatória');
            }
            if (!formData.descricao.trim()) {
                throw new Error('Descrição é obrigatória');
            }

            const novoProduto = {
                nome: formData.nome.trim(),
                preco: parseFloat(formData.preco),
                imagem: formData.imagem.trim(),
                categoriaId: parseInt(formData.categoriaId),
                descricao: formData.descricao.trim()
            };

            await create(novoProduto);

            setMessage({ type: 'success', text: 'Produto cadastrado com sucesso!' });
            
            // Limpar formulário
            setFormData({
                nome: '',
                preco: '',
                imagem: '',
                categoriaId: '',
                descricao: ''
            });

            // Limpar mensagem após 3 segundos
            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };


    return (
       
        <div className="container-cadastro">
            <div className="formulario-container">
                <h1>Cadastro de Produtos</h1>

                {message.text && (
                    <div className={`message message-${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="formulario">
                    <div className="form-group">
                        <label htmlFor="nome">Nome do Produto *</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome do produto"
                            className={ 'input-error'}
                        />
                       
                    </div>

                    <div className="form-group">
                        <label htmlFor="preco">Preço (R$) *</label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={formData.preco}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={'input-error'}
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagem">Imagem *</label>
                        <input
                            type="text"
                            id="imagem"
                            name="imagem"
                            value={formData.imagem}
                            onChange={handleChange}
                            placeholder="Digite url da imagem"
                            className={ 'input-error'}
                        />
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoriaId">Categoria *</label>
                        <select
                            id="categoriaId"
                            name="categoriaId"
                            value={formData.categoriaId}
                            onChange={handleChange}
                            className={'input-error'}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição *</label>
                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Digite a descrição do produto"
                            className={'input-error'}
                        />
                    </div>

                    

                    

                    <div className="botoes-container">
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                        </button>          
                    </div>
                    
                </form>

            </div>
        </div>
        
            
        
    
        
    );

}

export default CadastroProduto;