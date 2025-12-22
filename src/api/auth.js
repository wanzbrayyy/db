import { generateNanoId } from '../utils/uuid'; // Pastikan path ini benar

// URL Backend Vercel
const API_URL = 'https://dbw-nu.vercel.app/api/auth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem('token')
});

export const AuthService = {
  
  // REGISTER (Fix: Generate ID di frontend)
  register: async ({ name, email, password }) => {
    const _id = generateNanoId(50); // ID 50 Digit
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, name, email, password, avatar })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || 'Registration failed');

      // Auto Login
      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));
      
      return data.user;
    } catch (err) {
      throw err;
    }
  },

  // LOGIN (Fix: Check 2FA Requirement)
  login: async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Login failed');

      // Jika butuh 2FA
      if (data.require2FA) {
          localStorage.setItem('temp_2fa_token', data.tempToken);
          return { require2FA: true };
      }

      // Login Normal
      localStorage.setItem('token', data.token);
      localStorage.setItem('session_user', JSON.stringify(data.user));

      return { require2FA: false, user: data.user };
    } catch (err) {
      if (err.message === 'Failed to fetch') throw new Error("Connection Error");
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session_user');
    window.location.href = '/login';
  },

  // --- 2FA ENDPOINTS ---

  generate2FA: async () => {
    const res = await fetch(`${API_URL}/2fa/generate`, { method: 'POST', headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed");
    return data; 
  },

  verify2FA: async (token) => {
    const res = await fetch(`${API_URL}/2fa/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg);
    return data;
  },

  // VALIDATE LOGIN WITH OTP
  validateLogin2FA: async (tempToken, otp) => {
    const res = await fetch(`${API_URL}/2fa/validate-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, otp })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Invalid Code");

    // Success -> Set Real Token
    localStorage.setItem('token', data.token);
    localStorage.setItem('session_user', JSON.stringify(data.user));
    localStorage.removeItem('temp_2fa_token');

    return data;
  },

  // --- PROFILE ---
  
  updateProfile: async (updates) => {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (res.ok) localStorage.setItem('session_user', JSON.stringify(data));
    return data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('session_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => localStorage.getItem('token')
};