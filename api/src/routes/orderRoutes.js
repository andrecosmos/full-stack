const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

// Rota protegida: Apenas usuários autenticados conseguem criar pedidos
router.post('/checkout', authMiddleware, orderController.createOrder);

module.exports = router;
