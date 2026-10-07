import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  Heart,
  Github,
  Linkedin,
  Twitter,
  Code2,
  Terminal,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROFILE_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { theme, accentClasses } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className={`border-t py-12 transition-colors ${
        theme === 'dark'
          ? 'bg-neutral-950 border-neutral-800/80 text-neutral-400'
          : 'bg-neutral-50 border-neutral-200 text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/40 dark:border-neutral-800/60 light:border-neutral-200">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono-code font-bold text-xs ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-white'
                  : 'bg-white border border-neutral-300 text-black'
              }`}
            >
              <span className={accentClasses.text}>&lt;</span>NR<span className={accentClasses.text}>/&gt;</span>
            </div>
            <div>
              <span className="font-bold text-sm font-display-title text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                {PROFILE_DATA.name}
              </span>
              <p className="text-xs text-neutral-400 font-mono-code">
                {PROFILE_DATA.titles[0]}
              </p>
            </div>
          </div>

          {/* Nav Quicklinks */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono-code">
            <a href="#about" className="hover:text-neutral-200 transition-colors">About</a>
            <a href="#skills" className="hover:text-neutral-200 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-neutral-200 transition-colors">Projects</a>
            <a href="#education" className="hover:text-neutral-200 transition-colors">Education</a>
            <a href="#certifications" className="hover:text-neutral-200 transition-colors">Certifications</a>
            <a href="#achievements" className="hover:text-neutral-200 transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-neutral-200 transition-colors">Contact</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            id="btn-back-to-top"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code border transition-all hover:scale-105 cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                : 'bg-white border-neutral-300 text-neutral-700 hover:text-black shadow-sm'
            }`}
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-neutral-400">
          <p>© {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with React 19, Tailwind CSS & Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
