import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';

export const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('users');

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <Dashboard />;
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600">Welcome to your dashboard. This is where you can view key metrics and insights.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
            </h1>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#fbfbfb] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#fbfbfb] w-full relative flex flex-col">
        {/* Top Navigation */}
        <TopNavigation 
          onMobileMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <div className="flex flex-row">
          {/* Side Navigation */}
          <div className="w-[280px] hidden md:block">
            <Sidebar 
              isOpen={true}
              onClose={() => {}}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
          
          {/* Mobile Navigation */}
          <Sidebar 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <div className="flex-1 px-4 md:px-8 py-4 md:py-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};