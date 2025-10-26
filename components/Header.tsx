import React from 'react';
import { LogoutIcon } from './icons';

type Page = 'dashboard' | 'integrations';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, onLogout }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClasses = "bg-gray-700 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700/50 hover:text-white";

  return (
    <header className="text-center">
      <div className="flex justify-center items-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Magic Cart Dashboard
        </h1>
         <button 
          onClick={onLogout}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm"
          aria-label="Logout"
        >
          <LogoutIcon />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
        Manage your high-conversion funnels and automations for your Whop products.
      </p>
      <nav className="mt-8 flex justify-center">
        <div className="flex space-x-4 rounded-lg bg-gray-800 p-1 border border-gray-700">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`${navItemClasses} ${activePage === 'dashboard' ? activeClasses : inactiveClasses}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('integrations')}
            className={`${navItemClasses} ${activePage === 'integrations' ? activeClasses : inactiveClasses}`}
          >
            Integrations
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;