import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Profil', href: '#about' },
    { name: 'Agenda', href: '#activities' },
    { name: 'Berita', href: '#news' },
    { name: 'Pendaftaran', href: '#join' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-theme-bg/95 backdrop-blur-md border-theme-border' : 'bg-theme-bg border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="ACC Logo" className="h-12 w-auto object-contain" />
              <div className="hidden sm:block leading-none border-l-2 border-theme-border pl-3">
                <span className="block text-sm font-bold text-theme-primary">Auto Claser</span>
                <span className="block text-sm font-bold text-theme-secondary">Club</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-theme-muted hover:text-theme-text font-medium transition-colors text-sm uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-secondary transition-all group-hover:w-full"></span>
              </a>
            ))}
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
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-theme-muted hover:text-theme-text hover:bg-theme-surface rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
