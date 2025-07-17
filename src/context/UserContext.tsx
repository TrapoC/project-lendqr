import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import { mockUsers } from '../data/mockUsers';

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: string) => void;
  searchUsers: (query: string) => User[];
  filterUsers: (status?: string, organization?: string) => User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    if (selectedUser?.id === updatedUser.id) {
      setSelectedUser(updatedUser);
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  const searchUsers = (query: string): User[] => {
    if (!query) return users;
    
    const lowercaseQuery = query.toLowerCase();
    return users.filter(user => 
      user.firstName.toLowerCase().includes(lowercaseQuery) ||
      user.lastName.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.phoneNumber.includes(query) ||
      user.organization.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterUsers = (status?: string, organization?: string): User[] => {
    return users.filter(user => {
      if (status && user.status !== status) return false;
      if (organization && user.organization !== organization) return false;
      return true;
    });
  };

  return (
    <UserContext.Provider value={{
      users,
      selectedUser,
      setSelectedUser,
      updateUser,
      deleteUser,
      searchUsers,
      filterUsers
    }}>
      {children}
    </UserContext.Provider>
  );
};