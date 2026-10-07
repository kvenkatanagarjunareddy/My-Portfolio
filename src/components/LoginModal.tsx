import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  User,
  KeyRound,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const LoginModal: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const { isLoginModalOpen, setIsLoginModalOpen, login } = usePortfolio();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('Invalid username or password. Please check your credentials.');
      } else {
        setUsername('');
        setPassword('');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative max-w-md w-full my-8 rounded-3xl border shadow-2xl p-6 sm:p-8 ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLoginModalOpen(false)}
            id="btn-close-login-modal"
            className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
            aria-label="Close login dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${accentClasses.bgSoft} ${accentClasses.text}`}
            >
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display-title">Portfolio Admin Login</h3>
              <p className="text-xs text-neutral-400 font-mono-code">
                Access editor & content manager
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code text-neutral-400 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="admin-username-input"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-mono-code transition-all focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-cyan-500/60 focus:ring-cyan-500/20'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-cyan-600 focus:ring-cyan-500/20'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm font-mono-code transition-all focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-cyan-500/60 focus:ring-cyan-500/20'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-cyan-600 focus:ring-cyan-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="btn-admin-submit-login"
              className={`w-full mt-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${accentClasses.gradient} shadow-lg hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
