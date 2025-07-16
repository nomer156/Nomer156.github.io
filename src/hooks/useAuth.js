import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    return {
      token,
      user: storedUser ? JSON.parse(storedUser) : null,
    };
  });

  const setUser = (user) => setAuth((a) => ({ ...a, user }));

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const login = async (username) => {
    await delay(500);
    const data = { token: 'demo-token', user: { id: 1, username } };
    setAuth(data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  };

  const register = async (username) => {
    await delay(500);
    const data = { token: 'demo-token', user: { id: 1, username } };
    setAuth(data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user: auth.user, token: auth.token, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
