import CompraService from '../services/CompraService.js';

class CompraController {
    async store(req, res) {
        try {
            const { itens } = req.body;
            const pedido = await CompraService.finalizarCompra(itens);
            return res.status(201).json(pedido);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async index(req, res) {
        const pedidos = await CompraService.listarTodas();
        return res.json(pedidos);
    }
}

export default new CompraController();
