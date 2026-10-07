import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
  Cpu,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

const CORE_PRINCIPLES = [
  {
    icon: Zap,
    title: 'Object-Oriented Design & Clean Architecture',
    desc: 'Deep mastery of Java OOP principles: encapsulation, polymorphism, inheritance, exception handling, and modular component structures.',
  },
  {
    icon: Cpu,
    title: 'Data Structures & Algorithmic Foundations',
    desc: 'Strong problem-solving foundation in arrays, linked lists, trees, graphs, sorting algorithms, and time/space complexity analysis.',
  },
  {
    icon: ShieldCheck,
    title: 'Relational Database Modeling & REST APIs',
    desc: 'Designing normalized MySQL database schemas, writing optimized SQL joins, and developing clean RESTful client-server integrations.',
  },
  {
    icon: Sparkles,
    title: 'Applied AI, Computer Vision & IoT Systems',
    desc: 'Hands-on experience developing real-time vision pipelines with OpenCV, MediaPipe gesture tracking, Arduino sensor hardware, and Whisper AI.',
  },
];

export const AboutSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const { profile, experience } = usePortfolio();
  const [expandedExperience, setExpandedExperience] = useState<string>('exp-1');

  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="about" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>01. Background & Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Architecting with{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Precision & Scale
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Combining deep distributed systems engineering with high-touch user interface design to build resilient, beloved software.
          </p>
        </div>

        {/* Narrative & Principles 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left: Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border ${
              theme === 'dark'
                ? 'bg-neutral-900/60 border-neutral-800/80'
                : 'bg-white/80 border-neutral-200/80 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center ${accentClasses.bgSoft} ${accentClasses.text}`}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display-title">The Engineering Story</h3>
                <span className="text-xs font-mono-code text-neutral-400">Computer Science & Engineering (2022–2026)</span>
              </div>
            </div>

            <div
              className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {profile.fullBio ? (
                profile.fullBio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            {/* Quick Core Tech Snapshot */}
            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-wrap gap-2">
              {[
                'Java (Core & OOP)',
                'Python & OpenCV',
                'MySQL Database',
                'Data Structures & Algorithms',
                'HTML5, CSS3 & JavaScript',
                'REST APIs & Git',
              ].map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-3 py-1.5 rounded-xl font-mono-code border ${
                    theme === 'dark'
                      ? 'bg-neutral-950/80 border-neutral-800 text-neutral-300'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Core Engineering Principles (4 Cards) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-5 rounded-3xl border transition-all hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                      : 'bg-white/70 border-neutral-200/80 hover:border-neutral-300 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center mb-3 ${accentClasses.bgSoft} ${accentClasses.text}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold mb-2 font-display-title">{principle.title}</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {principle.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Career Journey Experience Section */}
        <div id="experience" className="mt-16 scroll-mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display-title">Career Experience</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono-code mt-1">
                Roles, engineering impact, and tech stacks
              </p>
            </div>
            <div className="text-xs font-mono-code text-neutral-400 hidden sm:block">
              Click any card to expand details
            </div>
          </div>

          <div className="space-y-4">
            {experience.map((exp, index) => {
              const isExpanded = expandedExperience === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    isExpanded
                      ? theme === 'dark'
                        ? 'bg-neutral-900/90 border-neutral-700 shadow-xl'
                        : 'bg-white border-neutral-300 shadow-lg'
                      : theme === 'dark'
                      ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
                      : 'bg-white/70 border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  {/* Card Header clickable */}
                  <div
                    onClick={() => toggleExperience(exp.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm font-display-title shrink-0 ${
                          theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {exp.company.substring(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold font-display-title">{exp.role}</h4>
                          {exp.badge && (
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${accentClasses.badge}`}>
                              {exp.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono-code mt-1">
                          <span className="font-semibold text-neutral-300 dark:text-neutral-200">{exp.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <span className="text-xs font-mono-code text-neutral-400 hidden md:inline">
                        {exp.type}
                      </span>
                      <div
                        className={`p-2 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-neutral-800 border-neutral-700 text-neutral-300'
                            : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                        }`}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`px-5 sm:px-6 pb-6 pt-2 border-t ${
                        theme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'
                      }`}
                    >
                      <p
                        className={`text-sm sm:text-base leading-relaxed mb-4 ${
                          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                        }`}
                      >
                        {exp.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="text-xs font-mono-code uppercase font-semibold text-neutral-400">
                          Key Impact & Accomplishments:
                        </div>
                        {exp.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${accentClasses.text}`} />
                            <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Stack Pills */}
                      <div>
                        <div className="text-xs font-mono-code uppercase font-semibold text-neutral-400 mb-2">
                          Technologies Used:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-xs px-2.5 py-1 rounded-lg font-mono-code border ${
                                theme === 'dark'
                                  ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                                  : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
