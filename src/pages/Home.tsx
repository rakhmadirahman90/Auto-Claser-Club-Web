import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Activities from '../components/Activities';
import News from '../components/News';
import Join from '../components/Join';
import Footer from '../components/Footer';

export default function Home() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hash = location.hash.toLowerCase();
    const validSections = ['#home', '#about', '#activities', '#news', '#join'];
    if (validSections.includes(hash)) {
      setActiveSection(hash.substring(1));
    } else {
      setActiveSection('home');
    }
    // Force scroll to top inside our scrollable main area on section transitions
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.hash]);

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About key="about" />;
      case 'activities':
        return <Activities key="activities" />;
      case 'news':
        return <News key="news" />;
      case 'join':
        return <Join key="join" />;
      case 'home':
      default:
        return <Hero key="hero" />;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-theme-bg text-theme-text font-sans selection:bg-theme-primary/30 flex flex-col overflow-hidden">
      <Navbar />
      {/* Main Content Area with transition */}
      <main ref={mainRef} className="flex-1 overflow-y-auto relative flex flex-col w-full min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full min-h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
