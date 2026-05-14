import * as categoriaService from "../services/categoriaService.js";

export async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaService.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias: " + error.message});
  }
}

export async function obterCategoria(req, res) {
  try {
    const categoria = await categoriaService.getById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
}

export async function criarCategoria(req, res) {
  try {
    const categoria = await categoriaService.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    if (error.message.includes("já existe") || error.message.includes("obrigatório")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao criar categoria: " + error.message });
  }
}
