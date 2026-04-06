import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider - Manages dark/dimmed theme state
 * Persists preference to localStorage
 * 
 * Themes:
 * - "dark": Deep space cyberpunk (current default)
 * - "dimmed": Softer charcoal cyberpunk (easier on eyes)
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('devlog-theme');
      return saved || 'dark';
    } catch (error) {
      return 'dark';
    }
  });

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devlog-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'dimmed' : 'dark');
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme hook - Access theme state and controls
 * @returns {{ theme: string, setTheme: function, toggleTheme: function }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};


