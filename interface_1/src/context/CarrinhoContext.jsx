import { createContext, useState, useEffect } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  // Função auxiliar para somar as quantidades gravadas no localStorage
  const obterQuantidadeTotal = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  };

  // Inicializa o estado diretamente com o valor atualizado do localStorage
  const [quantidadeTotal, setQuantidadeTotal] = useState(obterQuantidadeTotal);

  // Força o estado do React a se atualizar com o novo valor do localStorage
  const atualizarContador = () => {
    setQuantidadeTotal(obterQuantidadeTotal());
  };

  // Atualiza o contador se o usuário recarregar a página manualmente
  useEffect(() => {
    atualizarContador();
    // Ouve alterações no localStorage vindas de outras abas/janelas
    window.addEventListener('storage', atualizarContador);
    
    // Limpa o escutador quando o componente desmontar
    return () => window.removeEventListener('storage', atualizarContador);
  }, []);

  return (
    <CarrinhoContext.Provider value={{ quantidadeTotal, atualizarContador }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
