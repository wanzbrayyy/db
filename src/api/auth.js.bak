// src/api/auth.js
const API_URL = 'https://dbw-nu.vercel.app/api/auth';
import { generateNanoId } from '../utils/uuid';

export const AuthService = {
  register: async ({ name, email, password }) => {
    const _id = generateNanoId(50);
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, name, email, password, avatar })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Registration failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('session_user', JSON.stringify(data.user));
    
    return data.user;
  },

  login: async ({ email, password }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('session_user', JSON.stringify(data.user));

    return data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session_user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('session_user'));
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};