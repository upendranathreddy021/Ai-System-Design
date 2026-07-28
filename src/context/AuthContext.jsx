import React, { createContext, useContext, useState } from 'react';
import { DEMO_USER } from '../types.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedToken = localStorage.getItem('sysdesign_token');
    const savedUser = localStorage.getItem('sysdesign_user');
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

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (email, pass, keepLoggedIn = true) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (email.toLowerCase() === 'alex.rivera@architect.com' || email.includes('@')) {
      const user = {
        ...DEMO_USER,
        email: email,
        firstName: email.split('@')[0].split('.')[0] || 'Alex',
        lastName: email.split('@')[0].split('.')[1] || 'Rivera',
      };
      const token = `sys_jwt_${Date.now()}_secure_session_token`;

      setAuthState({
        user,
        isAuthenticated: true,
        token,
        loading: false,
      });

      if (keepLoggedIn) {
        localStorage.setItem('sysdesign_token', token);
        localStorage.setItem('sysdesign_user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('sysdesign_token', token);
        sessionStorage.setItem('sysdesign_user', JSON.stringify(user));
      }

      setActiveScreen('dashboard');
      addToast('Welcome back to SystemDesign.ai!', 'success');
      return { success: true };
    }

    setAuthState((prev) => ({ ...prev, loading: false }));
    addToast('Invalid credentials provided.', 'error');
    return { success: false, error: 'Invalid work email or password.' };
  };

  const signup = async (userData) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser = {
      id: `usr_${Math.floor(Math.random() * 900000 + 100000)}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: 'System Architect',
      company: userData.company || 'Enterprise Solutions',
      isVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };

    const token = `sys_jwt_${Date.now()}_created_session_token`;

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      token,
      loading: false,
    });

    localStorage.setItem('sysdesign_token', token);
    localStorage.setItem('sysdesign_user', JSON.stringify(newUser));

    setActiveScreen('dashboard');
    addToast('Account created successfully! Welcome aboard.', 'success');
    return { success: true };
  };

  const sendCode = async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    addToast(`Verification code sent to ${email}`, 'info');
    return true;
  };

  const verifyEmailCode = async (code) => {
    await new Promise((r) => setTimeout(r, 500));
    if (code === '482000' || code === '482001' || code.length === 6) {
      addToast('Email verification confirmed!', 'success');
      return true;
    }
    addToast('Invalid verification code. Please try again.', 'error');
    return false;
  };

  const updateProfile = (updatedData) => {
    if (!authState.user) return;
    const newUser = { ...authState.user, ...updatedData };
    setAuthState((prev) => ({ ...prev, user: newUser }));
    localStorage.setItem('sysdesign_user', JSON.stringify(newUser));
    addToast('Profile updated successfully!', 'success');
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
    });
    localStorage.removeItem('sysdesign_token');
    localStorage.removeItem('sysdesign_user');
    sessionStorage.removeItem('sysdesign_token');
    sessionStorage.removeItem('sysdesign_user');
    setActiveScreen('login');
    addToast('Logged out safely.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        signup,
        verifyEmailCode,
        sendCode,
        logout,
        updateProfile,
        toasts,
        addToast,
        removeToast,
        activeScreen,
        setActiveScreen,
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
