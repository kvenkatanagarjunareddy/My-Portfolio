import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Moon,
  Sun,
  Palette,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Sparkles,
  Lock,
  SlidersHorizontal,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { AccentColor } from '../types';

interface NavbarProps {}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const ACCENT_COLORS: { name: AccentColor; label: string; bg: string; border: string }[] = [
  { name: 'cyan', label: 'Cyan Cyber', bg: 'bg-cyan-500', border: 'border-cyan-400' },
  { name: 'violet', label: 'Violet Neon', bg: 'bg-violet-500', border: 'border-violet-400' },
  { name: 'emerald', label: 'Emerald Mint', bg: 'bg-emerald-500', border: 'border-emerald-400' },
  { name: 'amber', label: 'Amber Gold', bg: 'bg-amber-500', border: 'border-amber-400' },
  { name: 'rose', label: 'Rose Pink', bg: 'bg-rose-500', border: 'border-rose-400' },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const { theme, toggleTheme, accent, setAccent, accentClasses } = useTheme();
  const { isAuthenticated, setIsLoginModalOpen, setIsManageModalOpen } = usePortfolio();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Scroll listener for progress bar and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', ...NAV_ITEMS.map((item) => item.href.replace('#', ''))];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div
          className={`h-full bg-gradient-to-r ${accentClasses.gradient} transition-all duration-150 ease-out`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? theme === 'dark'
              ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/20 py-3'
              : 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100/70 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200/80 rounded-full px-3 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${sectionId}`}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-white'
                        : 'text-neutral-900'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-neutral-200'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={`absolute inset-0 rounded-full ${accentClasses.bgSoft} border ${accentClasses.border}`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Color Accent Picker */}
            <div className="relative">
              <button
                onClick={() => setPaletteOpen((prev) => !prev)}
                id="btn-accent-color-picker"
                title="Change accent theme color"
                className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span className={`w-2.5 h-2.5 rounded-full ${accentClasses.bg}`} />
              </button>

              {/* Accent Dropdown Popover */}
              <AnimatePresence>
                {paletteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 mt-2 p-3 rounded-2xl border shadow-xl z-50 w-52 ${
                      theme === 'dark'
                        ? 'bg-neutral-900/95 border-neutral-800 backdrop-blur-xl text-neutral-200'
                        : 'bg-white/95 border-neutral-200 backdrop-blur-xl text-neutral-800'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-mono-code flex items-center justify-between">
                      <span>Accent Color</span>
                      <Sparkles className="w-3 h-3 text-neutral-400" />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {ACCENT_COLORS.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => {
                            setAccent(col.name);
                            setPaletteOpen(false);
                          }}
                          className={`w-8 h-8 rounded-xl ${col.bg} transition-transform flex items-center justify-center ${
                            accent === col.name ? `ring-2 ring-offset-2 ${theme === 'dark' ? 'ring-offset-neutral-900' : 'ring-offset-white'} ring-neutral-400 scale-110` : 'hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                          title={col.label}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              id="btn-theme-toggle"
              aria-label="Toggle dark/light mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800 text-yellow-400 hover:border-neutral-700 hover:bg-neutral-800'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Login / Manage Button */}
            {isAuthenticated ? (
              <button
                onClick={() => setIsManageModalOpen(true)}
                id="btn-nav-manage-dashboard"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="Manage projects, experience, certificates, bio & skills"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                id="btn-nav-login"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:text-black hover:border-neutral-400'
                }`}
                title="Log In to Portfolio Admin"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Log In</span>
              </button>
            )}

            {/* Contact CTA */}
            <button
              onClick={() => scrollToSection('#contact')}
              id="btn-nav-contact"
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${accentClasses.gradient} shadow-sm hover:opacity-95 active:scale-95 transition-all`}
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              id="btn-mobile-menu"
              className={`lg:hidden p-2 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-800'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`fixed top-16 left-0 right-0 z-30 lg:hidden border-b shadow-2xl overflow-hidden backdrop-blur-2xl ${
              theme === 'dark'
                ? 'bg-neutral-950/95 border-neutral-800 text-neutral-100'
                : 'bg-white/95 border-neutral-200 text-neutral-900'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeSection === item.href.replace('#', '')
                        ? `${accentClasses.bgSoft} ${accentClasses.text} border ${accentClasses.border}`
                        : theme === 'dark'
                        ? 'hover:bg-neutral-900 text-neutral-300'
                        : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Terminal className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800/60 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsManageModalOpen(true);
                    }}
                    id="btn-mobile-manage-dashboard"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    id="btn-mobile-login"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700"
                  >
                    <Lock className="w-4 h-4 text-neutral-400" />
                    <span>Admin Log In</span>
                  </button>
                )}

                <button
                  onClick={() => scrollToSection('#contact')}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${accentClasses.gradient}`}
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
