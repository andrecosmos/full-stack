# 🛒 E-Commerce Full-Stack

![Status do Projeto](https://shields.io)
![Licença](https://shields.io)

Uma aplicação de e-commerce completa, escalável e segura, desenvolvida para simular cenários reais de mercado. O projeto contempla desde a gestão de estados no ecossistema React até a persistência robusta de dados e barreira de segurança no ecossistema Node.js.

---

## 🛠️ Tecnologias e Arquitetura

### Front-end
* **React.js**: Construção de interface modular e componentização avançada.
* **CSS Modules / Styled Components**: Estilização isolada e responsiva.
* **Context API**: Gerenciamento global do carrinho de compras e estado de autenticação.

### Back-end & Banco de Dados
* **Node.js & Express**: API RESTful estruturada sob o padrão de camadas (Routes, Controllers, Middlewares).
* **Prisma ORM**: Modelagem de dados, migrações automatizadas e consultas tipadas.
* **Supabase (PostgreSQL)**: Banco de dados relacional em nuvem com alta confiabilidade.

### Segurança e Padrões de Mercado
* **Autenticação JWT (JSON Web Tokens)**: Implementação de login persistente.
* **HttpOnly Cookies**: Proteção ativa contra ataques XSS armazenando tokens fora do localStorage.
* **Bcrypt**: Criptografia de senhas (hashing) antes da persistência no banco de dados.
* **Dotenv**: Isolamento estrito de variáveis de ambiente sensíveis.
*  **Criptografia** de Senhas com a biblioteca bcrypt no Node.js.
*  **Emissão do JWT** Utilização da biblioteca jsonwebtoken.
*  **Armazenamento Seguro (Frontend)** com o token JWT Armazenado em um Cookie HttpOnly e não no LocalStorage.
*  **Middleware de Autenticação** com um arquivo de middleware (auth.js) para interceptar rotas protegidas (como finalização de compra ou histórico de pedidos). Ele deve ler o cookie, validar o JWT e injetar os dados do usuário na requisição (req.user).
*  **CORS Restrito** Requisições são aceitas apenas de URLs restritas.





---

## 🚀 Funcionalidades Implementadas

- [x] Cadastro e login de usuários com senhas criptografadas.
- [x] Autenticação e proteção de rotas críticas via middleware JWT.
- [x] Catálogo de produtos dinâmico integrado ao banco de dados.
- [x] Gerenciamento de carrinho de compras com persistência de estado.
- [ ] Listagem de Pedidos
- [ ] Integração com gateway de pagamento (Próxima etapa).

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (v18 ou superior)
* Conta configurada no Supabase

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone github.com
   cd full-stack
   ```

2. **Configure o arquivo de variáveis de ambiente (.env):**
   Crie um arquivo `.env` na raiz do diretório `api/` seguindo o modelo:
   ```env
   DATABASE_URL="sua_string_de_conexao_do_supabase"
   JWT_SECRET="uma_chave_secreta_longa_e_segura"
   ```

3. **Instale as dependências e rode as Migrations do Prisma:**
   ```bash
   # No diretório do servidor (api)
   npm install
   npx prisma migrate dev
   npm run dev
   ```

4. **Inicie o Front-end:**
   ```bash
   # No diretório do cliente (src)
   npm install
   npm start
   ```

---

## 🧑‍💻 Autor

* **André Cosmos** - [LinkedIn](https://linkedin.com/in/andre-cosmos-b95480a1/) / andrecosmos@email.com
