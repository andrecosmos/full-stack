import "dotenv/config";
import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produto.js";
import categoriaRoutes from "./routes/categoria.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
