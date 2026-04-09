import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin]     = useState(null);
  const [token, setToken]     = useState(() => localStorage.getItem('admin_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    api.get('/api/auth/me')
      .then(r => setAdmin(r.data))
      .catch(() => {
        setToken('');
        setAdmin(null);
        localStorage.removeItem('admin_token');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem('admin_token', data.token);
    return data;
  };

  const logout = () => {
    setToken('');
    setAdmin(null);
    localStorage.removeItem('admin_token');
  };

  // Still expose authHeader for components that need it explicitly
  const authHeader = () => ({ Authorization: `Bearer ${token}` });

  return (
    <AuthContext.Provider value={{ admin, setAdmin, token, login, logout, loading, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
