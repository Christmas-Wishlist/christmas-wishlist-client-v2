import { create } from 'zustand';
import axios from 'axios';
import { AuthState } from '../types';

const API_URL = 'http://localhost:8080/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
      if (response.data.message === "Connexion réussie") {
        const userResponse = await axios.get(`${API_URL}/user`, { withCredentials: true });
        set({ user: userResponse.data, isAuthenticated: true });
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  register: async (username: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/register`, { username, email, password });
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
  updateProfile: async (userId: string, data: { username?: string; email?: string }) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, data, { withCredentials: true });
      const updatedUser = response.data.user;
      set((state) => ({
        user: { ...state.user!, ...updatedUser },
      }));
    } catch (error) {
      throw new Error('Profile update failed');
    }
  },
}));