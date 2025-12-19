import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'editor' | 'viewer';

// Map old role names to new ones for backward compatibility
export type LegacyRole = 'SPSE_ADMIN' | 'DIRECTION' | 'POINT_FOCAL' | 'LECTEUR';

// Helper to check roles with legacy support
const roleMapping: Record<LegacyRole, AppRole> = {
  'SPSE_ADMIN': 'admin',
  'DIRECTION': 'editor',
  'POINT_FOCAL': 'editor',
  'LECTEUR': 'viewer'
};

type RoleCheckType = AppRole | AppRole[] | LegacyRole | LegacyRole[];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: RoleCheckType) => boolean;
  userDisplayName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setDisplayName(data.full_name || data.email);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role as AppRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer role and profile fetching with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id).then(setRole);
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setRole(null);
          setDisplayName(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id).then(setRole);
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        const userRole = await fetchUserRole(data.user.id);
        setRole(userRole);
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signup = async (email: string, password: string, fullName?: string): Promise<{ error: Error | null }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    setDisplayName(null);
  };

  const hasRole = (checkRole: RoleCheckType): boolean => {
    if (!role) return false;
    
    // Convert legacy roles to new roles
    const normalizeRole = (r: AppRole | LegacyRole): AppRole => {
      if (r in roleMapping) {
        return roleMapping[r as LegacyRole];
      }
      return r as AppRole;
    };
    
    if (Array.isArray(checkRole)) {
      const normalizedRoles = checkRole.map(normalizeRole);
      return normalizedRoles.includes(role);
    }
    return normalizeRole(checkRole) === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      role,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      hasRole,
      userDisplayName: displayName
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
