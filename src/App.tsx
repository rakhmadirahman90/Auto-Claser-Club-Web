/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import { Toaster } from 'react-hot-toast';
import AnnouncementPopup from './components/AnnouncementPopup';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <AnnouncementPopup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <ThemeSelector />
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
