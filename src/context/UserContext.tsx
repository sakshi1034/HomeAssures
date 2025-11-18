import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'rm' | null;

interface UserContextType {
  role: UserRole;
  userName: string;
  setRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>('');

  const clearUser = () => {
    setRole(null);
    setUserName('');
  };

  return (
    <UserContext.Provider value={{ role, userName, setRole, setUserName, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

