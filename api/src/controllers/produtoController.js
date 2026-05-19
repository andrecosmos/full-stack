import * as produtoService from "../services/produtoService.js";

export async function listarProdutos(req, res) {
  try {
    const produtos = await produtoService.getAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos : " + error.message });
  }
}

export async function ListarProdutosPorCategoria(req,res){
  const categoriaId = parseInt(req.params.categoriaId);
  try {
    const produtos = await produtoService.getByCategoria(categoriaId);
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos : " + error.message });
  }
}

export async function criarProduto(req, res) {
  try {
    const produto = await produtoService.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    // Erro de validação (categoria não encontrada)
    if (error.message.includes("não encontrada") || error.message.includes("obrigatório")) {
      return res.status(400).json({ error: error.message });
    }
    // Outros erros
    res.status(500).json({ error: "Erro ao criar produto: " + error.message });
  }
}
