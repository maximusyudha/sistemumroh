'use client'
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  login: (data: { email: string, password: string }) => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = ({ email, password }: { email: string, password: string }) => {
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('auth', 'true');
      router.push('/admin/data-jamaah');
    } else {
      setError('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ login, logout, error }}>
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
