import React from 'react';
import { Film, User, Menu, X } from 'lucide-react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', page: 'landing' as PageType },
    { label: 'Movies', page: 'movies' as PageType },
  ];

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <Film className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold text-white">CinemaX</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-300 hover:text-yellow-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.page
                      ? 'text-yellow-500'
                      : 'text-gray-300 hover:text-yellow-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}