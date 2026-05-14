// Exemplo de como deve estar no Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getCompras = async () => {
  const response = await api.get('/compras');
  return response.data;
}

export const postCompras = async (payload) => {
  const response = await api.post('/compras', payload);
  return response.data;
};
