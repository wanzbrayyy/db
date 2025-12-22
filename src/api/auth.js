// URL Backend Vercel Anda
const API_URL = 'https://dbw-nu.vercel.app/api/auth';

export const AuthService = {
  // Register
  register: async ({ name, email, password }) => {
    // Generate avatar default
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    // ID digenerate di backend atau frontend, kita kirim undefined biar backend handle atau kirim jika perlu
    
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, avatar })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || 'Registration failed');

      // Simpan Token & User ke LocalStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));
      
      return data.user;
    } catch (err) {
      throw err;
    }
  },

  // Login
  login: async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Handle jika backend mati/error html
        if (typeof data !== 'object') throw new Error("Server Error");
        throw new Error(data.msg || data.error || 'Login failed');
      }

      // Simpan Token Penting untuk Request Data nanti
      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));

      return data.user;
    } catch (err) {
      // Catch "Failed to fetch" (Network Error)
      if (err.message === 'Failed to fetch') {
        throw new Error("Cannot connect to server. Check your internet or backend status.");
      }
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session_user');
    window.location.href = '/login'; // Force reload
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('session_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};