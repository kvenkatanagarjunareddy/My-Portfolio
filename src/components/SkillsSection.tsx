import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Server,
  Cloud,
  Bot,
  Layers,
  Search,
  CheckCircle,
  Sparkles,
  Zap,
  Terminal,
  Database,
  Cpu,
  Shield,
  Filter,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategoryType, SkillItem } from '../types';
import { PlusCircle } from 'lucide-react';

const CATEGORIES: { label: string; value: SkillCategoryType | 'All'; icon: React.FC<{ className?: string }> }[] = [
  { label: 'All Skills', value: 'All', icon: Layers },
  { label: 'Java & Core CS', value: 'Backend', icon: Server },
  { label: 'Web Technologies', value: 'Frontend', icon: Code2 },
  { label: 'AI & Computer Vision', value: 'AI & Machine Learning', icon: Bot },
  { label: 'Databases & Tools', value: 'Cloud & DevOps', icon: Database },
  { label: 'Engineering Practices', value: 'Architecture & Tools', icon: Shield },
];

export const SkillsSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const { skills, isAuthenticated, setIsManageModalOpen, setActiveManageTab } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02. Technical Arsenal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Skills &{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Technology Matrix
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Production-tested stack spanning client-side concurrency, distributed backends, AI orchestration, and cloud infrastructure.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                    isSelected
                      ? `${accentClasses.bg} text-white shadow-md`
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Admin Manage Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skill, tag, or tool..."
                className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900/90 border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-neutral-600'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 shadow-sm'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200"
                >
                  Clear
                </button>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={() => {
                  setActiveManageTab('skills');
                  setIsManageModalOpen(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 transition-all border cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="Manage skills or add new skill"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Manage Skills</span>
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => setSelectedSkill(skill)}
                className={`group p-5 rounded-3xl border transition-all cursor-pointer hover:scale-[1.02] flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80 shadow-md'
                    : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center p-2 transition-transform group-hover:scale-110 ${
                          theme === 'dark'
                            ? 'bg-neutral-800/80 border border-neutral-700/60 shadow-inner'
                            : 'bg-neutral-100 border border-neutral-200/80 shadow-sm'
                        }`}
                      >
                        <img
                          src={skill.logoUrl}
                          alt={`${skill.name} logo`}
                          className="w-7 h-7 object-contain drop-shadow-sm"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-display-title leading-tight">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] text-neutral-400 font-mono-code">
                          {skill.experience}
                        </span>
                      </div>
                    </div>

                    {skill.highlight && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${accentClasses.badge}`}>
                        Core Skill
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {skill.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-neutral-800/40 dark:border-neutral-800/60 light:border-neutral-200/60">
                  {/* Category & Action hint */}
                  <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                    <span className="capitalize">{skill.category}</span>
                    <span className={`text-[10px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${accentClasses.text}`}>
                      View details ↗
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-mono-code ${
                          theme === 'dark'
                            ? 'bg-neutral-950/80 text-neutral-400 border border-neutral-800/80'
                            : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {skill.tags.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-neutral-500 font-mono-code">
                        +{skill.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Selected Skill Detail Popover / Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`max-w-lg w-full p-6 rounded-3xl border shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
                    : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 ${
                        theme === 'dark'
                          ? 'bg-neutral-800 border border-neutral-700 shadow-inner'
                          : 'bg-neutral-100 border border-neutral-300 shadow-sm'
                      }`}
                    >
                      <img
                        src={selectedSkill.logoUrl}
                        alt={`${selectedSkill.name} logo`}
                        className="w-8 h-8 object-contain drop-shadow-sm"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display-title">{selectedSkill.name}</h3>
                      <span className="text-xs font-mono-code text-neutral-400">
                        {selectedSkill.category} • {selectedSkill.experience}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                >
                  {selectedSkill.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs font-mono-code uppercase font-semibold text-neutral-400 block mb-2">
                      Core Sub-Competencies & Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1 rounded-xl font-mono-code border ${accentClasses.badge}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono-code text-neutral-400 block">Experience Level</span>
                      <span className="text-xs font-bold font-display-title text-neutral-200">{selectedSkill.experience}</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-mono-code font-semibold border ${accentClasses.badge}`}>
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${accentClasses.gradient}`}
                >
                  Close Details
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
