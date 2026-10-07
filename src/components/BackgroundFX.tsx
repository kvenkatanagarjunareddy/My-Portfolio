import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundFX: React.FC = () => {
  const { theme, accent } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getGlowColor = () => {
    switch (accent) {
      case 'cyan':
        return 'rgba(6, 182, 212, 0.12)';
      case 'violet':
        return 'rgba(139, 92, 246, 0.12)';
      case 'emerald':
        return 'rgba(16, 185, 129, 0.12)';
      case 'amber':
        return 'rgba(245, 158, 11, 0.12)';
      case 'rose':
        return 'rgba(244, 63, 94, 0.12)';
      default:
        return 'rgba(6, 182, 212, 0.12)';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Grid Pattern */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-grid-pattern opacity-60' : 'bg-grid-pattern-light opacity-80'
        }`}
      />

      {/* Interactive Mouse Glow Follower */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out blur-[100px]"
        style={{
          width: '500px',
          height: '500px',
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          backgroundColor: getGlowColor(),
        }}
      />

      {/* Ambient static gradient orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] ${
          theme === 'dark' ? 'opacity-30' : 'opacity-20'
        }`}
        style={{
          background:
            accent === 'cyan'
              ? 'radial-gradient(circle, #06b6d4, #3b82f6)'
              : accent === 'violet'
              ? 'radial-gradient(circle, #8b5cf6, #ec4899)'
              : accent === 'emerald'
              ? 'radial-gradient(circle, #10b981, #06b6d4)'
              : accent === 'amber'
              ? 'radial-gradient(circle, #f59e0b, #ef4444)'
              : 'radial-gradient(circle, #f43f5e, #a855f7)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-[130px] ${
          theme === 'dark' ? 'opacity-25' : 'opacity-15'
        }`}
        style={{
          background:
            accent === 'cyan'
              ? 'radial-gradient(circle, #3b82f6, #6366f1)'
              : accent === 'violet'
              ? 'radial-gradient(circle, #6366f1, #a855f7)'
              : accent === 'emerald'
              ? 'radial-gradient(circle, #059669, #0d9488)'
              : accent === 'amber'
              ? 'radial-gradient(circle, #d97706, #b45309)'
              : 'radial-gradient(circle, #e11d48, #be185d)',
        }}
      />
    </div>
  );
};
