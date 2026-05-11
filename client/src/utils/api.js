import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adsAPI = {
  getAll: (params) => api.get('/ads', { params }),
  getOne: (id) => api.get(`/ads/${id}`),
  create: (formData) => api.post('/ads', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/ads/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/ads/${id}`),
  save: (id) => api.post(`/ads/${id}/save`),
};

export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (userId) => api.get(`/messages/${userId}`),
  send: (data) => api.post('/messages', data),
};

export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateMe: (formData) => api.put('/users/me', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getSaved: () => api.get('/users/me/saved'),
};

export default api;