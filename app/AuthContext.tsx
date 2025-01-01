'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Auth, User } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  auth: Auth;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  auth: auth
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 