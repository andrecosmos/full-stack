import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  return await prisma.produto.findMany({
    include: { Categoria: true }
  });
}

export async function create(data) {
  // Validar se a categoria existe
  if (!data.categoriaId) {
    throw new Error("categoriaId é obrigatório");
  }

  const categoria = await prisma.categoria.findUnique({
    where: { id: data.categoriaId }
  });

  if (!categoria) {
    throw new Error(`Categoria com ID ${data.categoriaId} não encontrada`);
  }

  return await prisma.produto.create({
    data: {
      nome: data.nome,
      preco: data.preco,
      imagem: data.imagem,
      categoriaId: data.categoriaId,
      descricao: data.descricao
    }
  });
}
