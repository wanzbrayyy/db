import { generateNanoId } from '../utils/uuid'; // Pastikan path ini benar

// URL Backend Vercel Anda
const API_URL = 'https://dbw-nu.vercel.app/api/auth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem('token')
});

export const AuthService = {
  // --- AUTHENTICATION ---

  register: async ({ name, email, password }) => {
    // FIX: Generate ID 50 Digit di sini agar Backend tidak menolak
    const _id = generateNanoId(50);
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Kirim _id di body
        body: JSON.stringify({ _id, name, email, password, avatar })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || 'Registration failed');

      // Simpan Token & User
      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));
      
      return data.user;
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (typeof data !== 'object') throw new Error("Server Error");
        throw new Error(data.msg || data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));

      return data.user;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error("Cannot connect to server. Check your internet.");
      }
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session_user');
    window.location.href = '/login';
  },

  // --- 2FA FEATURES (BARU) ---

  // 1. Generate QR Code
  generate2FA: async () => {
    const res = await fetch(`${API_URL}/2fa/generate`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to generate 2FA");
    return data; // { secret, qrCode }
  },

  // 2. Verify OTP & Enable
  verify2FA: async (token) => {
    const res = await fetch(`${API_URL}/2fa/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Invalid OTP Code");
    return data;
  },

  // --- UTILS ---
  
  updateProfile: async (updates) => {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('session_user', JSON.stringify(data));
    }
    return data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('session_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};