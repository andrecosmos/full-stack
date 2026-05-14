const API_URL = "http://localhost:3000";

export async function getAll() {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  return await response.json();
}

export async function getById(id) {
  const response = await fetch(`${API_URL}/categorias/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar categoria");
  }
  return await response.json();
}

export async function create(data) {
  if (!data.nome) {
    throw new Error("Nome da categoria é obrigatório");
  }

  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar categoria");
  }

  return await response.json();
}
