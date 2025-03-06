'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for the new key first, then fall back to the old key for backward compatibility
    const savedTheme = localStorage.getItem('unihealth-theme');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTheme !== null) {
      // Use the new key format
      setDarkMode(savedTheme === 'dark');
    } else if (savedDarkMode !== null) {
      // Fall back to the old key format
      setDarkMode(savedDarkMode === 'true');
    } else {
      // Set default if neither exists
      localStorage.setItem('unihealth-theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update both storage keys for compatibility
    localStorage.setItem('unihealth-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
