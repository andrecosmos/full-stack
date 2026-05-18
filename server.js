import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import produtoRoutes from "./api/src/routes/produto.js";
import categoriaRoutes from "./api/src/routes/categoria.js";
import authRoutes from "./api/src/routes/authRoutes.js";
import compraRoutes from "./api/src/routes/compra.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/auth", authRoutes);
app.use("/compras", compraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});