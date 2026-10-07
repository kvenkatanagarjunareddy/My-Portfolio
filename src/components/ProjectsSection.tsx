import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Star,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Info,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { PlusCircle } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'AI & ML',
  'Full-Stack',
  'Developer Tools',
];

export const ProjectsSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const { projects, isAuthenticated, setIsManageModalOpen, setActiveManageTab } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03. Featured Engineering Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Engineered for{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Scale & Elegance
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            A curated showcase of high-throughput distributed systems, AI agent frameworks, and real-time collaborative applications.
          </p>
        </div>

        {/* Category Filter Pills & Admin Add Shortcut */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer select-none ${
                activeCategory === cat
                  ? `${accentClasses.bg} text-white shadow-md`
                  : theme === 'dark'
                  ? 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => {
                setActiveManageTab('projects');
                setIsManageModalOpen(true);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all border cursor-pointer ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Add a new project or edit existing ones"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add / Manage Projects</span>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70 shadow-lg'
                    : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-md'
                }`}
              >
                {/* Card Top: Image preview with overlay & category tag */}
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                    {/* Top Badges: Category & Stars */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${accentClasses.badge}`}>
                        {project.category}
                      </span>

                      {project.starsCount && (
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-mono-code border border-white/10">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{project.starsCount}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Tagline overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h3 className="text-lg font-bold text-white font-display-title leading-snug group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div
                          key={m.label}
                          className={`p-2 rounded-xl border text-center ${
                            theme === 'dark'
                              ? 'bg-neutral-950/60 border-neutral-800'
                              : 'bg-neutral-50 border-neutral-200'
                          }`}
                        >
                          <div className={`text-xs font-bold font-display-title ${accentClasses.text}`}>
                            {m.value}
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono-code truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-mono-code ${
                            theme === 'dark'
                              ? 'bg-neutral-800 text-neutral-300 border border-neutral-700/60'
                              : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-neutral-400 font-mono-code">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div
                  className={`p-4 px-5 sm:px-6 border-t flex items-center justify-between gap-2 ${
                    theme === 'dark' ? 'border-neutral-800/80 bg-neutral-950/30' : 'border-neutral-200 bg-neutral-50/50'
                  }`}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-mono-code text-neutral-300 hover:text-white cursor-pointer group/btn"
                  >
                    <span>Architecture & Docs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl border transition-all ${
                          theme === 'dark'
                            ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-400'
                        }`}
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl text-white bg-gradient-to-r ${accentClasses.gradient} shadow-sm hover:opacity-90 transition-opacity`}
                        title="Open Live Preview"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
