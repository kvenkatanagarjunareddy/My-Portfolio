import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Cloud,
  Box,
  Bot,
  Code2,
  Calendar,
  Sparkles,
  Award,
  Eye,
  PlusCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';

export const CertificationsSection: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const { certifications, isAuthenticated, setIsManageModalOpen, setActiveManageTab } = usePortfolio();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<CertificationItem | null>(null);

  const copyCredentialId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return Cloud;
      case 'CloudRain':
        return Cloud;
      case 'Box':
        return Box;
      case 'Bot':
        return Bot;
      default:
        return Code2;
    }
  };

  return (
    <section id="certifications" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono-code border ${accentClasses.badge}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>05. Industry Validations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display-title">
            Certifications &{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${accentClasses.gradient}`}
            >
              Verified Credentials
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg max-w-3xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Certified in Core Java Programming, MySQL Relational Databases, and industry software development training.
          </p>
        </div>

        {/* Certifications Grid */}
        {isAuthenticated && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setActiveManageTab('certifications');
                setIsManageModalOpen(true);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all border cursor-pointer ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add / Manage Certificates</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = getIcon(cert.icon);
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70 shadow-lg'
                    : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  {/* Top Badge: Issuer & Active Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold font-mono-code text-neutral-400">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active & Verified
                    </span>
                  </div>

                  {/* Cert Title & Icon */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${accentClasses.bgSoft} ${accentClasses.text}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display-title leading-snug">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-code mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.issueDate}</span>
                        {cert.expiryDate && <span>• {cert.expiryDate}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Key Exam Topics */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-mono-code uppercase font-semibold text-neutral-400">
                      Evaluated Domains:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cert.topics.map((topic) => (
                        <span
                          key={topic}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-mono-code ${
                            theme === 'dark'
                              ? 'bg-neutral-950 border border-neutral-800 text-neutral-300'
                              : 'bg-neutral-100 border border-neutral-200 text-neutral-800'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom ID Strip & Verification + View Photo button */}
                <div
                  className={`pt-4 border-t flex items-center justify-between gap-2 ${
                    theme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'
                  }`}
                >
                  <button
                    onClick={() => copyCredentialId(cert.credentialId)}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-mono-code cursor-pointer transition-colors"
                    title="Click to copy credential ID"
                  >
                    {copiedId === cert.credentialId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied ID!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[110px]">{cert.credentialId}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    {/* View Button - opens certificate image viewer */}
                    <button
                      onClick={() => setViewingCertificate(cert)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500'
                          : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:text-black hover:border-neutral-400'
                      }`}
                      title="View certificate credential document / photo"
                    >
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>View</span>
                    </button>

                    {cert.verificationUrl && cert.verificationUrl !== '#' && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${accentClasses.text} hover:underline`}
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        certificate={viewingCertificate}
        onClose={() => setViewingCertificate(null)}
      />
    </section>
  );
};
