import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeType = 'dark' | 'light' | 'midnight' | 'forest';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('acc_theme');
    return (saved as ThemeType) || 'dark';
  });
  
  useEffect(() => {
    localStorage.setItem('acc_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
