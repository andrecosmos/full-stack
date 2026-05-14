import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  return await prisma.categoria.findMany({
    include: { Produto: true }
  });
}

export async function getById(id) {
  return await prisma.categoria.findUnique({
    where: { id },
    include: { Produto: true }
  });
}

export async function create(data) {
  if (!data.nome) {
    throw new Error("Nome da categoria é obrigatório");
  }

  // Verificar se a categoria já existe
  const categoriaExistente = await prisma.categoria.findUnique({
    where: { nome: data.nome }
  });

  if (categoriaExistente) {
    throw new Error(`Categoria "${data.nome}" já existe`);
  }

  return await prisma.categoria.create({
    data: {
      nome: data.nome
    }
  });
}
