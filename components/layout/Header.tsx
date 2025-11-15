
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MenuIcon, BellIcon, ChevronDownIcon, UserIcon, LogoutIcon } from '../icons';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-gray-200 sticky top-0 z-10">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center">
        <button className="relative text-gray-600 hover:text-blue-600 focus:outline-none mx-4">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
        </button>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center focus:outline-none">
            <div className="w-8 h-8 overflow-hidden rounded-full border-2 border-blue-500">
               <UserIcon className="h-full w-full text-gray-500" />
            </div>
            <span className="hidden md:inline-block ml-2 mr-1 text-sm font-medium text-gray-700">{user?.name}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-600 hidden md:inline-block" />
          </button>

          {dropdownOpen && (
            <div 
              onMouseLeave={() => setDropdownOpen(false)}
              className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
            >
              <a href="#/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Perfil</a>
              <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
