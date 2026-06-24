const axios = require('axios');

const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

const apiClient = {
  // GET список
  getBooks: () => axios.get(`${BASE_URL}/Books`),
  
  // GET по ID
  getBook: (id) => axios.get(`${BASE_URL}/Books/${id}`),
  
  // POST создать
  createBook: (data) => axios.post(`${BASE_URL}/Books`, data),
  
  // PUT обновить
  updateBook: (id, data) => axios.put(`${BASE_URL}/Books/${id}`, data),
  
  // DELETE удалить
  deleteBook: (id) => axios.delete(`${BASE_URL}/Books/${id}`)
};

module.exports = apiClient;