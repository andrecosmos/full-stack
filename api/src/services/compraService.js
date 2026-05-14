import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CompraService {
    async finalizarCompra(itens) {
        // 1. Busca preços reais no banco
        const ids = itens.map(i => i.produtoId);
        const produtosDB = await prisma.produto.findMany({
            where: { id: { in: ids } }
        });

        // 2. Calcula o total
        let total = 0;
        const itensProcessados = itens.map(item => {
            const prod = produtosDB.find(p => p.id === item.produtoId);
            if (!prod) throw new Error(`Produto ${item.produtoId} não existe`);
            
            total += prod.preco * item.quantidade;
            
            return {
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoFixo: prod.preco
            };
        });

        // 3. Salva no banco (Pedido + Itens)
        return await prisma.pedido.create({
            data: {
                total: total,
                status: 'PENDENTE',
                itens: { create: itensProcessados }
            },
            include: { itens: true }
        });
    }

    async listarTodas() {
        return await prisma.pedido.findMany({
            include: { itens: { include: { produto: true } } }
        });
    }
}

export default new CompraService();
