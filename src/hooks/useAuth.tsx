import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppUser } from '../types';
import { getCurrentUser, login as authLogin, logout as authLogout } from '../services/authService';

interface AuthContextValue {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => getCurrentUser());

  const value = useMemo(
    () => ({
      user,
      login: async (email: string, password: string) => {
        const session = await authLogin(email, password);
        setUser(session);
      },
      logout: () => {
        authLogout();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
