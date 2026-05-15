const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validação básica de obrigatoriedade de campos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // 2. Verifica se o e-mail já está registrado no sistema
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Este e-mail já está sendo utilizado.' }); // Status 409: Conflito
    }

    // 3. Aplica o Hashing na senha (Padrão de Segurança de Mercado)
    // O número 10 representa o 'cost factor' (complexidade/tempo computacional gasto)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Cria e persiste o novo usuário com a senha criptografada via Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Armazena estritamente o hash criado
        role: 'client' // Valor padrão atribuído para controle de níveis de acesso
      }
    });

    // 5. Retorna o sucesso ocultando dados confidenciais na resposta
    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Erro no cadastro do usuário:', error);
    return res.status(500).json({ error: 'Erro interno no servidor ao tentar registrar.' });
  }
};

module.exports = { register };
