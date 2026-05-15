
import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js'; // Atenção: no Node com ES Modules, a extensão .js é OBRIGATÓRIA na importação de arquivos locais.

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json({ user: req.user });
});

export default router;
