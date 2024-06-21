// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getAllProducts = (category, filters, sort, page) => {
  return axios.get(`${API_URL}/categories/${category}/products`, {
    params: { ...filters, sort, page },
  });
};

export const getProductById = (category, productId) => {
  return axios.get(`${API_URL}/categories/${category}/products/${productId}`);
};
