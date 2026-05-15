


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // A URL do seu backend Node.js
  withCredentials: true // OBRIGATÓRIO: Força o envio dos cookies em todas as requisições
});

export default api;


