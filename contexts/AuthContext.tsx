
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { Plan } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, name: string) => void;
  upgradePlan: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('stocklite_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    // Mock login
    const mockUser: User = {
      id: 'user-123',
      email,
      name: 'Empreendedor(a)',
      plan: user?.plan || Plan.FREE,
    };
    localStorage.setItem('stocklite_user', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/dashboard');
  };

  const register = (email: string, name: string) => {
    // Mock registration
     const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      plan: Plan.FREE,
    };
    localStorage.setItem('stocklite_user', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('stocklite_user');
    setUser(null);
    navigate('/');
  };
  
  const upgradePlan = () => {
    if (user) {
      const updatedUser = { ...user, plan: Plan.PREMIUM };
      setUser(updatedUser);
      localStorage.setItem('stocklite_user', JSON.stringify(updatedUser));
    }
  };

  const value = useMemo(() => ({ user, login, logout, register, upgradePlan }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
