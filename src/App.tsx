/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import News from './components/News';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <News />
      <Footer />
    </div>
  );
}
