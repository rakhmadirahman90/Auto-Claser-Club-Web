import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Activities from '../components/Activities';
import News from '../components/News';
import Join from '../components/Join';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text font-sans selection:bg-theme-primary/30">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <News />
      <Join />
      <Footer />
    </div>
  );
}
