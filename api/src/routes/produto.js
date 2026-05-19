import { Router } from "express";
import {
  listarProdutos,
  criarProduto,
  ListarProdutosPorCategoria
} from "../controllers/produtoController.js";

const router = Router();

router.get("/", listarProdutos);
router.get("/categoria/:categoriaId", ListarProdutosPorCategoria);
router.post("/", criarProduto);

export default router;
