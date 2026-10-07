import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Sparkles,
  MapPin,
  CheckCircle2,
  Cpu,
  Layers,
  Server,
  Cloud,
  Terminal,
  Zap,
  Code,
  Shield,
  Activity,
  Send,
  Camera,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { theme, accentClasses } = useTheme();
  const { profile, isAuthenticated, setIsManageModalOpen, setActiveManageTab } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Dynamic role text cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [profile.titles.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN: Content ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Availability Pill & Location Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${accentClasses.badge} shadow-sm backdrop-blur-md`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Roles & Internships</span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                  theme === 'dark'
                    ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                    : 'bg-neutral-100/80 border-neutral-300 text-neutral-600'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Main Headline with Dynamic Typing/Cycling */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono-code font-medium text-neutral-400 flex items-center gap-2">
                <span className={accentClasses.text}>&gt;</span>
                <span>Hello world, I'm</span>
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display-title">
                <span
                  className={
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }
                >
                  {profile.name}
                </span>
              </h1>

              {/* Dynamic Animated Role Title */}
              <div className="h-12 sm:h-14 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold font-display-title"
                  >
                    <span
                      className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
                    >
                      {profile.titles[roleIndex] || profile.titles[0]}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className={`inline-block w-1.5 h-7 sm:h-8 ${accentClasses.bg} rounded-full`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Impact Bio */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {profile.bio}
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {profile.metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className={`p-3.5 rounded-2xl border transition-all hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
                      : 'bg-white/70 border-neutral-200/80 hover:border-neutral-300 shadow-sm'
                  }`}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-extrabold font-display-title ${accentClasses.text}`}
                  >
                    {metric.value}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                    }`}
                  >
                    {metric.label}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono-code truncate">
                    {metric.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => scrollToSection('projects')}
                id="btn-hero-projects"
                className={`group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r ${accentClasses.gradient} shadow-lg ${accentClasses.glow} hover:opacity-95 active:scale-95 transition-all cursor-pointer`}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                id="btn-hero-contact"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-700 text-neutral-100 hover:bg-neutral-800 hover:border-neutral-500'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400 shadow-sm'
                }`}
              >
                <Send className="w-4 h-4 text-neutral-400" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Social Links & Stack Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/40 dark:border-neutral-800/60 light:border-neutral-200/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-neutral-400 mr-1">
                  Connect:
                </span>
                {profile.socialLinks.map((social) => {
                  const Icon =
                    social.platform === 'GitHub'
                      ? Github
                      : social.platform === 'LinkedIn'
                      ? Linkedin
                      : social.platform === 'Twitter'
                      ? Twitter
                      : MessageSquare;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border transition-all hover:scale-110 ${
                        theme === 'dark'
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600'
                          : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400'
                      }`}
                      title={`${social.label} (${social.username})`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Stack Ticker Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono-code text-neutral-400">
                <span className="px-2 py-1 rounded-lg bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800/60">
                  Java (OOP)
                </span>
                <span className="px-2 py-1 rounded-lg bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800/60">
                  Python
                </span>
                <span className="px-2 py-1 rounded-lg bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800/60">
                  MySQL
                </span>
                <span className="px-2 py-1 rounded-lg bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800/60">
                  REST APIs
                </span>
                <span className="px-2 py-1 rounded-lg bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800/60">
                  Git
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Circular Framed Profile Photo with Glow & Floating Orbitals ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0"
          >
            {/* Outer Parallax Frame Container */}
            <motion.div
              style={{
                transform: `perspective(1000px) rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center group"
            >
              {/* Outer Pulsing Glow Halos */}
              <div
                className={`absolute inset-0 rounded-full blur-3xl opacity-50 dark:opacity-40 bg-gradient-to-tr ${accentClasses.gradient} animate-pulse`}
              />

              {/* Rotating Dashed Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className={`absolute -inset-4 sm:-inset-6 rounded-full border border-dashed ${
                  theme === 'dark' ? 'border-neutral-700/60' : 'border-neutral-300'
                } pointer-events-none`}
              />

              {/* Inner Secondary Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className={`absolute -inset-8 sm:-inset-10 rounded-full border border-dotted ${
                  theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
                } pointer-events-none`}
              />

              {/* Gradient Border Circular Outer Frame */}
              <div
                className={`relative w-full h-full rounded-full p-2 sm:p-2.5 bg-gradient-to-br ${accentClasses.gradient} shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                {/* Inner Dark/Light Vessel Frame */}
                <div
                  className={`w-full h-full rounded-full p-2 sm:p-2.5 overflow-hidden relative ${
                    theme === 'dark' ? 'bg-neutral-950' : 'bg-white'
                  }`}
                >
                  {/* The Profile Photo */}
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center rounded-full select-none transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // High quality fallback avatar
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 pointer-events-none" />

                  {/* Quick Photo Change Hover Overlay (when logged in or click to change photo) */}
                  {isAuthenticated && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveManageTab('avatar');
                        setIsManageModalOpen(true);
                      }}
                      title="Click to Change Photo"
                      className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white transition-opacity cursor-pointer z-30"
                    >
                      <Camera className="w-6 h-6 text-cyan-400" />
                      <span className="text-xs font-semibold font-display-title">Change Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Pinned Bottom Status Card with Live Latency / Work Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`mt-6 w-full max-w-sm p-3.5 rounded-2xl border shadow-lg backdrop-blur-md flex items-center justify-between gap-3 ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800/80 text-neutral-200'
                  : 'bg-white/90 border-neutral-200 text-neutral-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${accentClasses.bgSoft} ${accentClasses.text}`}>
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight">Current Focus</span>
                  <span className="text-[11px] text-neutral-400 font-mono-code truncate max-w-[180px] sm:max-w-[220px]">
                    {profile.status.currentFocus}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-mono-code text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  24ms
                </span>
                <span className="text-[9px] text-neutral-400 font-mono-code">99.99% SLA</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
