import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  GitFork,
  Mic,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return Trophy;
      case 'GitFork':
        return GitFork;
      case 'Mic':
        return Mic;
      case 'BookOpen':
        return BookOpen;
      default:
        return Award;
    }
  };

  return (
    <section id="achievements" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>06. Milestones & Recognition</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Achievements &{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Industry Impact
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Hackathon honors, assistive medical engineering innovations, academic distinction, and recognized software milestones.
          </p>

          <button
            onClick={triggerCelebration}
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800'
                : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100 shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Celebrate Milestones 🎉</span>
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((ach, idx) => {
            const Icon = getBadgeIcon(ach.badgeIcon);
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70 shadow-lg'
                    : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  {/* Card Header: Category & Year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${accentClasses.badge}`}>
                      {ach.category}
                    </span>
                    <span className="text-xs font-mono-code text-neutral-400">
                      {ach.year}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${accentClasses.bgSoft} ${accentClasses.text}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display-title leading-snug">
                        {ach.title}
                      </h3>
                      <span className="text-xs font-mono-code text-neutral-400 block mt-0.5">
                        {ach.organization}
                      </span>
                    </div>
                  </div>

                  {/* Metric Highlight Pill */}
                  {ach.metric && (
                    <div className="mb-4 p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-mono-code flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 shrink-0 fill-amber-400 text-amber-400" />
                      <span>{ach.metric}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {ach.description}
                  </p>
                </div>

                {ach.link && (
                  <div
                    className={`pt-4 border-t ${
                      theme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'
                    }`}
                  >
                    <a
                      href={ach.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accentClasses.text} hover:underline`}
                    >
                      <span>Explore Milestone</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
