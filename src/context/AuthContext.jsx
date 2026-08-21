import React, { createContext, useContext, useState } from 'react';
import { DEMO_USER } from '../types.js';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate=useNavigate()
  const [authState, setAuthState] = useState(() => {
    const savedToken = localStorage.getItem('sd_token');
    const savedUser = localStorage.getItem('sd_user');
    if (savedToken && savedUser) {
      try {
        return {
          user: JSON.parse(savedUser),
          isAuthenticated: true,
          token: savedToken,
          loading: false,
        };
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
    };
  });

  const [activeScreen, setActiveScreen] = useState(() => {
    return authState.isAuthenticated ? 'dashboard' : 'login';
  });


 
 


  const loginSuccess=(data,keepLoggedIn=true)=>{
    const user={"email":data.email,"role":data.role,"isAuthenticated":true}
      setAuthState({user,isAuthenticated: true,
      token: data.token,
      loading: false})

      const storage=keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem("sd_token",data.token);
      storage.setItem("sd_user",JSON.stringify(user));

  }

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
    });
    
    localStorage.removeItem('sd_token');
    localStorage.removeItem('sd_user');
    sessionStorage.removeItem('sd_token');
    sessionStorage.removeItem('sd_user');
    navigate("/dashboard")
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        
        logout,
        loginSuccess,
        activeScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
