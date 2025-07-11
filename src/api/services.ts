import axios from 'axios';
import { User, Farm, Crop, Recommendation, WeatherData } from '@/types/database';

// API base configuration
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API
export const userAPI = {
  register: async (userData: Partial<User>) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email?: string; phone?: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

// Farm API
export const farmAPI = {
  getAll: async () => {
    const response = await api.get('/farms');
    return response.data;
  },
  
  create: async (farmData: Omit<Farm, 'id' | 'created_at'>) => {
    const response = await api.post('/farms', farmData);
    return response.data;
  },
  
  update: async (id: number, farmData: Partial<Farm>) => {
    const response = await api.put(`/farms/${id}`, farmData);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/farms/${id}`);
    return response.data;
  },
};

// Crop API
export const cropAPI = {
  getAll: async () => {
    const response = await api.get('/crops');
    return response.data;
  },
  
  getRecommendations: async (farmId: number) => {
    const response = await api.get(`/crops/recommendations/${farmId}`);
    return response.data;
  },
};

// Weather API
export const weatherAPI = {
  getCurrent: async (lat: number, lng: number) => {
    const response = await api.get(`/weather/current?lat=${lat}&lng=${lng}`);
    return response.data;
  },
  
  getForecast: async (lat: number, lng: number) => {
    const response = await api.get(`/weather/forecast?lat=${lat}&lng=${lng}`);
    return response.data;
  },
  
  getHistorical: async (lat: number, lng: number, days: number = 365) => {
    const response = await api.get(`/weather/historical?lat=${lat}&lng=${lng}&days=${days}`);
    return response.data;
  },
};

// Recommendation API
export const recommendationAPI = {
  getForFarm: async (farmId: number) => {
    const response = await api.get(`/recommendations/farm/${farmId}`);
    return response.data;
  },
  
  create: async (recommendationData: Omit<Recommendation, 'id' | 'created_at'>) => {
    const response = await api.post('/recommendations', recommendationData);
    return response.data;
  },
};