// 🟢 Removido o import do express daqui!
const API_URL = "http://localhost:3000";

export async function getAll() {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return await response.json();
}

export async function getByCategoria(categoriaId) {
  // 🟢 Certo: Corrigido adicionando /produtos/ antes de categoria
  const response = await fetch(`${API_URL}/produtos/categoria/${categoriaId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos por categoria");
  }
  return await response.json();
}


export async function create(data) {
  // Validações básicas
  if (!data.nome || !data.nome.trim()) {
    throw new Error("Nome do produto é obrigatório");
  }
  if (!data.preco || data.preco <= 0) {
    throw new Error("Preço deve ser maior que zero");
  }
  if (!data.categoriaId) {
    throw new Error("Categoria é obrigatória");
  }
  if (!data.imagem || !data.imagem.trim()) {
    throw new Error("Imagem é obrigatória");
  }
  if (!data.descricao || !data.descricao.trim()) {
    throw new Error("Descrição é obrigatória");
  }

  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar produto");
  }

  return await response.json();
}
