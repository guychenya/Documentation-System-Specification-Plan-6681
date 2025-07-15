import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('vibe-coding-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      preferences: {
        theme: 'dark',
        language: 'javascript',
        notifications: true,
      },
      progress: {
        completedTutorials: 12,
        savedSnippets: 24,
        searchQueries: 156,
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('vibe-coding-user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (email, password, name) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      preferences: {
        theme: 'dark',
        language: 'javascript',
        notifications: true,
      },
      progress: {
        completedTutorials: 0,
        savedSnippets: 0,
        searchQueries: 0,
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('vibe-coding-user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibe-coding-user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('vibe-coding-user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};