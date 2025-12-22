import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek sesi saat aplikasi dimuat pertama kali
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Session restoration failed", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Wrapper untuk Login
  const login = async (credentials) => {
    const userData = await AuthService.login(credentials);
    setUser(userData);
    return userData;
  };

  // Wrapper untuk Register
  const register = async (data) => {
    const userData = await AuthService.register(data);
    // Opsional: Langsung login setelah register? 
    // Di sini kita biarkan user login manual, atau set user agar langsung masuk dashboard
    return userData;
  };

  // Wrapper untuk Logout
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook agar lebih mudah dipanggil: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);