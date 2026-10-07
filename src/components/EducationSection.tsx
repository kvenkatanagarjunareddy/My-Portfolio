import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  School,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();

  return (
    <section id="education" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>04. Academic Foundation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Education &{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Research Honors
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Strong computer science foundation in Object-Oriented Programming, Data Structures, Database Systems, and Applied AI.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`p-6 sm:p-8 rounded-3xl border transition-all hover:scale-[1.01] flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 shadow-xl'
                  : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 shadow-md'
              }`}
            >
              <div>
                {/* Top Badge: Institution & Period */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${accentClasses.bgSoft} ${accentClasses.text}`}
                    >
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display-title">{edu.institution}</h4>
                      <span className="text-xs font-mono-code text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {edu.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-neutral-400 px-3 py-1 rounded-xl bg-neutral-950/40 border border-neutral-800">
                      {edu.period}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${accentClasses.badge}`}>
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="text-lg sm:text-xl font-bold font-display-title mb-4">
                  {edu.degree}
                </h3>

                {/* Honors & Awards */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-mono-code uppercase font-semibold text-neutral-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Academic Honors:</span>
                  </div>
                  {edu.honors.map((honor, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${accentClasses.text}`} />
                      <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                        {honor}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Capstone / Thesis Highlight */}
                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 mb-6">
                  <span className="text-xs font-bold text-neutral-300 block mb-1">
                    Research Thesis & Capstone:
                  </span>
                  <p className="text-xs text-neutral-400 leading-relaxed italic">
                    "{edu.capstone}"
                  </p>
                </div>
              </div>

              {/* Coursework Tags */}
              <div>
                <div className="text-xs font-mono-code uppercase font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Key Coursework:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-mono-code ${
                        theme === 'dark'
                          ? 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                          : 'bg-neutral-100 border border-neutral-200 text-neutral-800'
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
