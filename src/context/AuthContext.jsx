import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Store user in simple useState, initialized from localStorage
  const [user, setUser] = useState(() => api.getCurrentUser());

  // Simple login function
  const login = (email) => {
    const loggedInUser = api.login(email);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Simple logout function
  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Easy custom hook to get auth data
export const useAuth = () => useContext(AuthContext);
