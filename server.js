import express from "express";
import cors from "cors";
import produtoRoutes from "./api/src/routes/produto.js";
import categoriaRoutes from "./api/src/routes/categoria.js";
import compraRoutes from "./api/src/routes/compra.js"; // 1. Importe as rotas de compra

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/compras", compraRoutes); // 2. Registre a rota de compras

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
