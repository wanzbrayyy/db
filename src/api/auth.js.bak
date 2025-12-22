import { DB } from './db';

const COLLECTION = 'users';

export const AuthService = {
  // Register User Baru
  register: async ({ name, email, password }) => {
    // 1. Cek apakah email sudah ada
    // Menggunakan findOne yang sudah diperbaiki
    const existingUser = await DB.findOne(COLLECTION, (u) => u.email === email);
    
    if (existingUser) {
      throw new Error("Email sudah terdaftar. Gunakan email lain.");
    }

    // 2. Simpan user baru
    const newUser = await DB.insert(COLLECTION, {
      name,
      email,
      password, // Note: Di production harus di-hash
      role: 'admin', // Default jadi admin utk owner pertama
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    });

    return newUser;
  },

  // Login User
  login: async ({ email, password }) => {
    // 1. Cari user berdasarkan email
    // INI YANG SEBELUMNYA ERROR KARENA findOne HILANG
    const user = await DB.findOne(COLLECTION, (u) => u.email === email);
    
    // 2. Validasi password
    if (!user || user.password !== password) {
      throw new Error("Kombinasi Email dan Password salah.");
    }

    // 3. Simpan sesi ke localStorage browser (bukan DB)
    localStorage.setItem('session_user', JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem('session_user');
  },

  getCurrentUser: () => {
    const session = localStorage.getItem('session_user');
    return session ? JSON.parse(session) : null;
  }
};-