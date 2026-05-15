import express from "express";
import cors from "cors";
import produtoRoutes from "./api/src/routes/produto.js";
import categoriaRoutes from "./api/src/routes/categoria.js";
import compraRoutes from "./api/src/routes/compra.js"; // 1. Importe as rotas de compra
import cookieParser from 'cookie-parser';

const app = express();




// IMPORTANTE: Configure o CORS para permitir credenciais (cookies)
app.use(cors({
  origin: 'http://localhost:5173', // A URL exata do seu front-end React
  credentials: true // Permite o recebimento e envio de cookies
}));
app.use(cookieParser()); // Ativa a leitura de cookies
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/compras", compraRoutes); // 2. Registre a rota de compras

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
