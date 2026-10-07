import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  X,
  Layers,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Server,
  Code2,
  Database,
  Cloud,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme, accentClasses } = useTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative max-w-4xl w-full my-8 rounded-3xl border shadow-2xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
              : 'bg-white border-neutral-300 text-neutral-900'
          }`}
        >
          {/* Modal Header & Hero Image */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              id="btn-close-project-modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-10"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Category on Image */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${accentClasses.badge}`}>
                  {project.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/60 text-neutral-300 border border-white/10 font-mono-code">
                  Role: {project.role}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display-title">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
            {/* Action Bar (Live Demo / Github) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border bg-neutral-950/30 dark:bg-neutral-950/50 border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-lg font-mono-code border ${
                      theme === 'dark'
                        ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md hover:opacity-90`}
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div>
              <h3 className="text-xs font-mono-code uppercase font-semibold text-neutral-400 mb-3">
                Key Performance & Impact Metrics:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`p-3 rounded-2xl border text-center ${
                      theme === 'dark'
                        ? 'bg-neutral-950/60 border-neutral-800'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className={`text-xl font-extrabold font-display-title ${accentClasses.text}`}>
                      {m.value}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono-code">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Architectural Overview */}
            <div>
              <h3 className="text-sm font-bold font-display-title mb-2">Architectural Blueprint</h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}
              >
                {project.fullDescription}
              </p>

              {/* Architecture Stack Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                {project.architecture.frontend && (
                  <div className="flex items-start gap-2.5 text-xs">
                    <Code2 className={`w-4 h-4 shrink-0 mt-0.5 ${accentClasses.text}`} />
                    <div>
                      <span className="font-bold block text-neutral-300">Frontend Layer:</span>
                      <span className="text-neutral-400 font-mono-code">{project.architecture.frontend}</span>
                    </div>
                  </div>
                )}
                {project.architecture.backend && (
                  <div className="flex items-start gap-2.5 text-xs">
                    <Server className={`w-4 h-4 shrink-0 mt-0.5 ${accentClasses.text}`} />
                    <div>
                      <span className="font-bold block text-neutral-300">Backend & Services:</span>
                      <span className="text-neutral-400 font-mono-code">{project.architecture.backend}</span>
                    </div>
                  </div>
                )}
                {project.architecture.database && (
                  <div className="flex items-start gap-2.5 text-xs">
                    <Database className={`w-4 h-4 shrink-0 mt-0.5 ${accentClasses.text}`} />
                    <div>
                      <span className="font-bold block text-neutral-300">Data & Cache Tiers:</span>
                      <span className="text-neutral-400 font-mono-code">{project.architecture.database}</span>
                    </div>
                  </div>
                )}
                {project.architecture.infrastructure && (
                  <div className="flex items-start gap-2.5 text-xs">
                    <Cloud className={`w-4 h-4 shrink-0 mt-0.5 ${accentClasses.text}`} />
                    <div>
                      <span className="font-bold block text-neutral-300">Cloud & Infra:</span>
                      <span className="text-neutral-400 font-mono-code">{project.architecture.infrastructure}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-sm font-bold font-display-title mb-2">Core Engineered Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accentClasses.text}`} />
                    <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Engineering Challenges</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Engineered Solutions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {project.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
