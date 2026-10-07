import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  Check,
  Copy,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROFILE_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Software Engineer / Graduate Opportunity',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Time ticker
  useEffect(() => {
    const updateTime = () => {
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>08. Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Let's Build Something{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Extraordinary
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Available for Software Engineer roles, graduate developer positions, internship opportunities, technical collaborations, and innovative engineering challenges.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Timezone Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Copy Email Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : 'bg-white border-neutral-200 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${accentClasses.bgSoft} ${accentClasses.text}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display-title">Direct Email</h3>
                  <span className="text-xs font-mono-code text-neutral-400">
                    Typical response &lt; 12 hours
                  </span>
                </div>
              </div>

              <div
                onClick={handleCopyEmail}
                id="btn-copy-email"
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
                title="Click to copy email"
              >
                <span className="text-xs sm:text-sm font-mono-code font-semibold truncate text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                  {PROFILE_DATA.email}
                </span>

                <button
                  type="button"
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 ${
                    emailCopied
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : `${accentClasses.bgSoft} ${accentClasses.text}`
                  }`}
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Timezone & Availability Ticker */}
            <div
              className={`p-6 rounded-3xl border ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : 'bg-white border-neutral-200 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-neutral-400">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>{PROFILE_DATA.location} (IST)</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Local Time
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800">
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${accentClasses.text}`} />
                  <span className="text-xl font-extrabold font-mono-code">
                    {currentTime || '10:00:00 AM'}
                  </span>
                </div>
                <span className="text-xs font-mono-code text-neutral-400">UTC+5:30</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              {PROFILE_DATA.socialLinks.map((social) => {
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
                    className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] flex items-center gap-3 ${
                      theme === 'dark'
                        ? 'bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 shadow-sm'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl ${accentClasses.bgSoft} ${accentClasses.text}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left truncate">
                      <span className="text-xs font-bold leading-tight">{social.platform}</span>
                      <span className="text-[10px] text-neutral-400 font-mono-code truncate">
                        {social.username}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : 'bg-white border-neutral-200'
              }`}
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div
                    className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white bg-gradient-to-tr ${accentClasses.gradient} shadow-xl ${accentClasses.glow}`}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display-title">Message Delivered!</h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name}. I'll review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Staff Engineering Role', message: '' });
                    }}
                    className={`mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-neutral-200'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                    }`}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-semibold text-neutral-400 block">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-neutral-600'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-semibold text-neutral-400 block">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-neutral-600'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code font-semibold text-neutral-400 block">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-neutral-600'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-400'
                      }`}
                    >
                      <option value="Software Engineer / Graduate Opportunity">Full-Time Software Engineer Role</option>
                      <option value="Software Development Internship">Software Development Internship</option>
                      <option value="Technical Project Collaboration">Technical Project Collaboration</option>
                      <option value="Research & AI Innovation Opportunity">Research & AI Innovation Opportunity</option>
                      <option value="General Technical Inquiry">General Technical Inquiry / Say Hello</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code font-semibold text-neutral-400 block">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Alex, we're building a next-gen streaming platform and would love to discuss a Staff Engineer opportunity..."
                      className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all resize-none ${
                        theme === 'dark'
                          ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-neutral-600'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="btn-submit-contact"
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r ${accentClasses.gradient} shadow-lg ${accentClasses.glow} hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
