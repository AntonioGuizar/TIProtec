import axios from 'axios';

export const getUsers = () => {
  return axios.get(`/users`);
};

export const getUser = (id) => {
  return axios.get(`/users/${id}`);
};

export const addUser = (userData) => {
  return axios.post(`/users`, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};