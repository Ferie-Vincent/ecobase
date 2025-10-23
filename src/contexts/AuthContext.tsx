import React, { createContext, useContext, useState, useEffect } from 'react';
import { utilisateurs, type Utilisateur, type Role } from '@/data/seedData';

interface AuthContextType {
  user: Utilisateur | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: Role | Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Utilisateur | null>(null);

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage au démarrage
    const storedUser = localStorage.getItem('ecobase_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, _password: string): boolean => {
    // Auth simulée - on cherche juste l'utilisateur par email
    const foundUser = utilisateurs.find(u => u.email === email && u.statut === 'Actif');
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('ecobase_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecobase_user');
  };

  const hasRole = (role: Role | Role[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
