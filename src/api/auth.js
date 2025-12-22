import { DB } from './db';

const COLLECTION = 'users';

export const AuthService = {
  register: async ({ name, email, password }) => {
    // 1. Cek apakah email sudah ada
    const existingUser = await DB.findOne(COLLECTION, (u) => u.email === email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar. Gunakan email lain.");
    }

    // 2. Buat user baru (Password disimpan plain text utk demo, jgn di production)
    const newUser = await DB.insert(COLLECTION, {
      name,
      email,
      password, // Di real app ini harus di-hash (bcrypt)
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` // Auto avatar
    });

    // 3. Simpan session (sederhana)
    localStorage.setItem('session_user', JSON.stringify(newUser));
    return newUser;
  },

  login: async ({ email, password }) => {
    // 1. Cari user
    const user = await DB.findOne(COLLECTION, (u) => u.email === email);
    
    // 2. Validasi
    if (!user || user.password !== password) {
      throw new Error("Kombinasi Email dan Password salah.");
    }

    // 3. Simpan session
    localStorage.setItem('session_user', JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem('session_user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('session_user'));
  }
};