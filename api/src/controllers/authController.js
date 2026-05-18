import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// === FLUXO DE REGISTRO (ADICIONADO) ===
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error('Erro no registro do Prisma:', error);
    return res.status(500).json({ error: 'Erro interno no servidor ao salvar dados.' });
  }
};

// === FLUXO DE LOGIN ===
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = { 
      id: user.id, 
      email: user.email, 
      role: 'client' // Removido user.role temporariamente pois não existe no seu schema.prisma
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };

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

// === FLUXO DE LOGOUT ===
const logout = (req, res) => {
  return res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Deve coincidir com a configuração usada no login
      path: '/' // Garante a remoção do cookie em todo o domínio
    }

    )
    .status(200)
    .json({ message: 'Logout realizado com sucesso.' });
};

// Exporta as três funções juntas para as rotas consumirem
export { register, login, logout };
