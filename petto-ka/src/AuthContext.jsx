import React, { createContext, useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
   // Try to load user data from localStorage on initial load
   const storedToken = localStorage.getItem('token');
   return storedToken ? jwt_decode(storedToken) : null;
  });
  
  const login = (token) => {
    const decodedToken = jwt_decode(token);
    setUser(decodedToken);

    // Save the token in localStorage
    localStorage.setItem('token', token);

  };

  const logout = () => {
    setUser(null);
    
    // Remove the token from localStorage when logging out
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


