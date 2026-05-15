const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/login', login);
router.post('/logout', logout);

// Se o token no cookie for válido, o middleware injeta o usuário em req.user
router.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;

