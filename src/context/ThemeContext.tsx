import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, AccentColor } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  accent: AccentColor;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  setAccent: (color: AccentColor) => void;
  accentClasses: {
    text: string;
    bg: string;
    bgSoft: string;
    border: string;
    glow: string;
    gradient: string;
    ring: string;
    badge: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ACCENT_MAP: Record<AccentColor, ThemeContextType['accentClasses']> = {
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    bgSoft: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    gradient: 'from-cyan-500 to-blue-600',
    ring: 'focus:ring-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20',
  },
  violet: {
    text: 'text-violet-400',
    bg: 'bg-violet-500',
    bgSoft: 'bg-violet-500/10 dark:bg-violet-500/15',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.25)]',
    gradient: 'from-violet-500 to-indigo-600',
    ring: 'focus:ring-violet-400',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    bgSoft: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    gradient: 'from-emerald-500 to-teal-600',
    ring: 'focus:ring-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    bgSoft: 'bg-amber-500/10 dark:bg-amber-500/15',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    gradient: 'from-amber-500 to-orange-600',
    ring: 'focus:ring-amber-400',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-500',
    bgSoft: 'bg-rose-500/10 dark:bg-rose-500/15',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
    gradient: 'from-rose-500 to-pink-600',
    ring: 'focus:ring-rose-400',
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme') as ThemeMode;
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    }
    return 'dark';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const savedAccent = localStorage.getItem('portfolio_accent') as AccentColor;
      if (['cyan', 'violet', 'emerald', 'amber', 'rose'].includes(savedAccent)) {
        return savedAccent;
      }
    }
    return 'cyan';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio_accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const setAccent = (color: AccentColor) => {
    setAccentState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        toggleTheme,
        setTheme,
        setAccent,
        accentClasses: ACCENT_MAP[accent],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
