import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { INITIAL_USERS } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  isAuthenticated: boolean;
  isSupabaseConnected: boolean;
  switchAccount: (userId: string) => void;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, username: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('gplus_all_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('gplus_active_user_id') || 'user_alex';
  });

  useEffect(() => {
    localStorage.setItem('gplus_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('gplus_active_user_id', currentUserId);
  }, [currentUserId]);

  const currentUser = allUsers.find(u => u.id === currentUserId) || allUsers[0];

  const switchAccount = (userId: string) => {
    const exists = allUsers.find(u => u.id === userId);
    if (exists) {
      setCurrentUserId(userId);
    }
  };

  const signIn = async (email: string) => {
    // If Supabase is connected, we authenticate against Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: 'Password123!'
        });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    // Match or create in user list
    const found = allUsers.find(u => u.username.toLowerCase() === email.toLowerCase() || email.includes(u.username));
    if (found) {
      setCurrentUserId(found.id);
      return { success: true };
    }

    return { success: true };
  };

  const signUp = async (email: string, username: string, displayName: string) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password: 'Password123!'
        });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      username: username.toLowerCase().replace(/\s+/g, '_'),
      displayName,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
      headline: 'New Google+ Member',
      bio: 'Excited to explore developer communities and collaborate on projects.',
      interests: ['AI', 'Web Development'],
      skills: ['TypeScript'],
      isPublic: true,
      role: 'user',
      circles: [
        { id: `c_${Date.now()}_1`, ownerId: `user_${Date.now()}`, name: 'Friends', color: '#ea4335', memberCount: 0, memberUserIds: [] },
        { id: `c_${Date.now()}_2`, ownerId: `user_${Date.now()}`, name: 'Collaborators', color: '#4285f4', memberCount: 0, memberUserIds: [] }
      ]
    };

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    return { success: true };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    // Set to first or guest
    setCurrentUserId(allUsers[0]?.id || 'user_alex');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return { ...u, ...updated, updatedAt: new Date().toISOString() };
      }
      return u;
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        isAuthenticated: true,
        isSupabaseConnected: isSupabaseConfigured,
        switchAccount,
        signIn,
        signUp,
        signOut,
        updateProfile
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
