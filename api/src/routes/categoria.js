import express from "express";
import * as categoriaController from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", categoriaController.listarCategorias);
router.get("/:id", categoriaController.obterCategoria);
router.post("/", categoriaController.criarCategoria);

export default router;
