const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validação básica de campos recebidos
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    // 2. Busca o usuário no banco de dados via Prisma
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 3. Verifica se a senha informada bate com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 4. Cria o payload (dados do usuário) e gera o token JWT
    const payload = { 
      id: user.id, 
      email: user.email, 
      role: user.role || 'client' 
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 5. Configura as opções do Cookie Seguro (Regras de Ouro de Segurança)
    const cookieOptions = {
      httpOnly: true, // Impede leitura via JavaScript (Protege contra XSS)
      secure: process.env.NODE_ENV === 'production', // true apenas em produção (HTTPS)
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // Tempo de vida do cookie: 7 dias (em milissegundos)
    };

    // 6. Envia o cookie na resposta HTTP e retorna os dados públicos do usuário
    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({
        message: 'Login realizado com sucesso.',
        user: { id: user.id, name: user.name, email: user.email }
      });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Rota auxiliar recomendada: Rota de Logout para limpar o cookie
const logout = (req, res) => {
  return res
    .clearCookie('token')
    .status(200)
    .json({ message: 'Logout realizado com sucesso.' });
};

module.exports = { login, logout };
