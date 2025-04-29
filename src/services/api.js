import axios from "axios";

const API_URL = "https://34.227.7.205/api";

export const getUsers = () => axios.get(`${API_URL}/`);
export const createUser = (data) => axios.post(`${API_URL}/post`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);

export const getProducts = () => axios.get(`${API_URL}/products`);
export const createProduct = (data) => axios.post(`${API_URL}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
export const searchProductsByName = (name) =>
  axios.get(`${API_URL}/products/search/name`, { params: { name } });
export const searchProductsByCategory = (category_name) =>
  axios.get(`${API_URL}/products/search/category`, { params: { category_name } });

export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);