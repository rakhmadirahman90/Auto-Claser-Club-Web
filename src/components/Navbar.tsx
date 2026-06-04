import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const { user } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const handleScroll = () => {
      setScrolled(mainEl.scrollTop > 20);
    };

    handleScroll();
    mainEl.addEventListener('scroll', handleScroll);
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { 
      name: 'Profil', 
      href: '#about',
      submenu: [
        { name: 'Tentang', href: '#about' },
        { name: 'Sejarah', href: '#sejarah' },
        { name: 'Struktur', href: '#struktur' },
        { name: 'Dokumen Resmi', href: '#dokumen' },
        { name: 'Profil Anggota', href: '#member-profile' },
      ]
    },
    { name: 'Agenda', href: '#activities' },
    { name: 'Berita', href: '#news' },
    { name: 'Pendaftaran', href: '#join' },
  ];

  const activeHash = location.hash || '#home';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleScrollToSegment = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-theme-bg/95 backdrop-blur-md border-theme-border' : 'bg-theme-bg border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/#home" onClick={handleScrollToSegment} className="flex items-center gap-3">
              <img src="/logo.jpg" alt="ACC Logo" className="h-12 w-auto object-contain" />
              <div className="leading-none border-l-2 border-theme-border pl-3">
                <span className="block text-xs sm:text-sm font-bold text-theme-primary">Auto Claser</span>
                <span className="block text-xs sm:text-sm font-bold text-theme-secondary">Club</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              if (link.submenu) {
                const isSubActive = link.submenu.some(sub => sub.href === activeHash);
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className={`font-semibold transition-colors text-sm tracking-wide relative py-2 flex items-center gap-1 focus:outline-none cursor-pointer ${
                        isSubActive ? 'text-theme-primary' : 'text-theme-muted hover:text-theme-text'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-theme-primary' : 'text-theme-muted'}`} />
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-theme-secondary transition-all ${
                        isSubActive ? 'w-full' : 'w-0'
                      }`}></span>
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-theme-surface/95 border border-theme-border rounded-xl shadow-2xl py-2 z-50 backdrop-blur-md"
                        >
                          {link.submenu.map((sub) => {
                            const isSpecificActive = sub.href === activeHash;
                            return (
                              <Link
                                key={sub.name}
                                to={`/${sub.href}`}
                                onClick={handleScrollToSegment}
                                className={`block px-4 py-2.5 text-sm font-medium transition-all hover:bg-theme-bg rounded-lg mx-1 ${
                                  isSpecificActive 
                                    ? 'text-theme-primary bg-theme-bg/50' 
                                    : 'text-theme-muted hover:text-theme-text'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              const isActive = link.href === activeHash || (link.href === '#home' && activeHash === '');
              return (
                <Link
                  key={link.name}
                  to={`/${link.href}`}
                  onClick={handleScrollToSegment}
                  className={`font-medium transition-colors text-sm tracking-wide relative group py-2 ${
                    isActive ? 'text-theme-primary' : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-theme-secondary transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
            
            {/* Login Admin Menu */}
            <Link
              to="/admin"
              className="font-medium transition-colors text-sm tracking-wide relative group py-2 text-theme-muted hover:text-theme-text flex items-center gap-1.5 border-l border-theme-border pl-6"
            >
              <UserIcon size={16} />
              {user ? 'Panel Admin' : 'Login Admin'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-theme-muted hover:text-theme-text focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-theme-bg/95 border-b border-theme-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 block">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <div className="px-3 pt-3 pb-1 text-xs font-bold tracking-wider text-theme-primary mb-1">
                        {link.name}
                      </div>
                      {link.submenu.map((sub) => {
                        const isSubActive = sub.href === activeHash;
                        return (
                          <Link
                            key={sub.name}
                            to={`/${sub.href}`}
                            className={`block pl-6 pr-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                              isSubActive ? 'text-theme-secondary bg-theme-surface/50 font-bold' : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface/30'
                            }`}
                            onClick={handleScrollToSegment}
                          >
                            • {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
                const isActive = link.href === activeHash || (link.href === '#home' && activeHash === '');
                return (
                  <Link
                    key={link.name}
                    to={`/${link.href}`}
                    className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                      isActive ? 'text-theme-primary bg-theme-surface' : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface'
                    }`}
                    onClick={handleScrollToSegment}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Login Admin Menu Mobile */}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-theme-muted hover:text-theme-text hover:bg-theme-surface rounded-md flex items-center gap-2 border-t border-theme-border mt-2 pt-3"
              >
                <UserIcon size={18} />
                {user ? 'Panel Admin' : 'Login Admin'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
