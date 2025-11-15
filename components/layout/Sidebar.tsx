
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HomeIcon, PackageIcon, ArrowRightLeftIcon, ChartBarIcon, UserIcon, CreditCardIcon, LogoutIcon, CloseIcon } from '../icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { to: '/products', icon: PackageIcon, label: 'Produtos' },
    { to: '/movements', icon: ArrowRightLeftIcon, label: 'Movimentações' },
    { to: '/reports', icon: ChartBarIcon, label: 'Relatórios' },
    { to: '/subscription', icon: CreditCardIcon, label: 'Assinatura' },
    { to: '/profile', icon: UserIcon, label: 'Perfil' },
  ];

  const linkClasses = (path: string) => 
    `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
    }`;
  
  const iconClasses = (path: string) =>
    `h-5 w-5 mr-3 ${location.pathname === path ? 'text-white' : 'text-gray-400'}`;


  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-2xl font-bold text-blue-600">StockLite</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 focus:outline-none">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 px-4 flex flex-col justify-between h-[calc(100%-80px)]">
          <div>
            {navItems.map(item => (
              <NavLink
                key={item.label}
                to={item.to}
                className={linkClasses(item.to)}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={iconClasses(item.to)} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div>
             <button onClick={logout} className={`${linkClasses('')} w-full mb-4`}>
                <LogoutIcon className={iconClasses('')} />
                <span className="font-medium">Sair</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
