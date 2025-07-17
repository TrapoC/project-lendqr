import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { LoginPage } from './components/LoginPage';
import { MainLayout } from './components/MainLayout';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#39cdcc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <UserProvider>
      <MainLayout />
    </UserProvider>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};