import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const result = await AuthService.login(credentials);
    // Jika login butuh 2FA, jangan set user dulu
    if (!result.require2FA) {
        setUser(result.user);
    }
    return result;
  };

  // Fungsi baru untuk dipanggil setelah sukses verify 2FA
  const setSession = (userData) => {
      setUser(userData);
  };

  const register = async (data) => {
    const userData = await AuthService.register(data);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);