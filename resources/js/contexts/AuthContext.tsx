import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { router, usePage } from '@inertiajs/react';
import { SharedData, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<SharedData>().props; 
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setUser(auth?.user || null); 
    } catch (error) {
      console.error('Failed to check authentication:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', { email, password });
      await checkAuth();
      router.visit('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      router.visit('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
