import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Bell, Search, Menu, X, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopNavigationProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const [searchValue, setSearchValue] = useState('');
  const [notificationCount] = useState(3);
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-[100px] top-0 left-0 bg-white border-b border-gray-200 z-20 sticky">
      <nav className="h-full flex items-center justify-between px-4 md:px-8">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2"
          onClick={onMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[#213f7d]" />
          ) : (
            <Menu className="w-6 h-6 text-[#213f7d]" />
          )}
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#213f7d] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-[#213f7d] hidden sm:block">
            lendsqr
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-[400px] mx-4 hidden md:block">
          <Input
            className="h-10 pl-5 pr-14 border border-solid border-[#213f7d] opacity-70 rounded-lg"
            placeholder="Search for anything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            className="absolute right-0 top-0 h-10 w-14 bg-[#39cdcc] rounded-l-none rounded-r-lg flex items-center justify-center hover:bg-[#39cdcc]/90"
            type="submit"
          >
            <Search className="w-3.5 h-3.5 text-white" />
          </Button>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-2 md:gap-6">
          <a
            href="#"
            className="font-normal text-[#213f7d] text-base underline hover:text-[#39cdcc] transition-colors hidden lg:block"
          >
            Docs
          </a>
          
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-6 text-[#213f7d]" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e4033b] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarFallback className="bg-[#213f7d] text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-[#213f7d] text-base hidden md:block">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#213f7d] hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Input
            className="h-10 pl-5 pr-14 border border-solid border-[#213f7d] opacity-70 rounded-lg"
            placeholder="Search for anything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            className="absolute right-0 top-0 h-10 w-14 bg-[#39cdcc] rounded-l-none rounded-r-lg flex items-center justify-center hover:bg-[#39cdcc]/90"
            type="submit"
          >
            <Search className="w-3.5 h-3.5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};