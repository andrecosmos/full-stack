import express from 'express';
import CompraController from '../controllers/CompraController.js';

const router = express.Router();

// Como o server.js já usa "/compras", aqui usamos apenas "/"
router.post('/', CompraController.store);
router.get('/', CompraController.index);

export default router;
