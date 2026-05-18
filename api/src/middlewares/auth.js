import jwt from 'jsonwebtoken';



const authMiddleware = (req, res, next) => {
  // 1. Busca o token dentro dos cookies seguros da requisição
  const token = req.cookies?.token;

  // 2. Se o token não existir, bloqueia o acesso imediatamente
  if (!token) {
    return res.status(401).json({ 
      error: 'Acesso negado. Token de autenticação não fornecido.' 
    });
  }

  try {
    // 3. Valida o token usando a chave secreta guardada no seu arquivo .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Injeta os dados decodificados do usuário (ex: id, email, role) na requisição
    req.user = decoded;

    // 5. Permite que a requisição prossiga para o Controller da rota protegida
    next();
  } catch (error) {
    // 6. Tratamento específico caso o token tenha expirado
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sessão expirada. Por favor, faça login novamente.' });
    }
    
    // 7. Erros genéricos de token inválido ou adulterado
    return res.status(403).json({ error: 'Token inválido ou assinatura corrompida.' });
  }
};

export default authMiddleware;
