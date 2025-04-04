
import React, { createContext, useState, useContext, useEffect } from 'react';

interface UserContextType {
  userId: string;
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>(() => {
    // Try to get user name from localStorage
    return localStorage.getItem('focuscore-username') || '';
  });
  
  const [userId, setUserId] = useState<string>(() => {
    // Try to get userId from localStorage or generate a new one
    const savedUserId = localStorage.getItem('focuscore-userid');
    if (savedUserId) return savedUserId;
    
    // Generate a new userId
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('focuscore-userid', newUserId);
    return newUserId;
  });
  
  useEffect(() => {
    // Save userName to localStorage whenever it changes
    if (userName) {
      localStorage.setItem('focuscore-username', userName);
    }
  }, [userName]);
  
  return (
    <UserContext.Provider value={{ userId, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
