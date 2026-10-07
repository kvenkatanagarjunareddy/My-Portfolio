import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Award, Calendar, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CertificationItem } from '../types';

interface CertificateViewerModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  onClose,
}) => {
  const { theme, accentClasses } = useTheme();

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative max-w-3xl w-full my-8 rounded-3xl border shadow-2xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-neutral-800/80 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold ${accentClasses.bgSoft} ${accentClasses.text}`}
              >
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display-title">
                  {certificate.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-code mt-0.5">
                  <span>{certificate.issuer}</span>
                  <span>•</span>
                  <span>Issued: {certificate.issueDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              id="btn-close-cert-view-modal"
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
              aria-label="Close certificate viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with Certificate Image or Document Preview */}
          <div className="p-6 space-y-4">
            {certificate.certificateImageUrl ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/60 max-h-[60vh] flex items-center justify-center p-2">
                <img
                  src={certificate.certificateImageUrl}
                  alt={`${certificate.title} document`}
                  className="max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>
            ) : (
              <div
                className={`p-8 sm:p-12 rounded-2xl border border-dashed text-center flex flex-col items-center justify-center gap-3 ${
                  theme === 'dark'
                    ? 'border-neutral-800 bg-neutral-950/50'
                    : 'border-neutral-300 bg-neutral-50'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${accentClasses.bgSoft} ${accentClasses.text}`}
                >
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold font-display-title">
                  Certificate of Achievement & Completion
                </h4>
                <p className="text-xs text-neutral-400 font-mono-code max-w-md">
                  This certification is verified under Credential ID:{' '}
                  <strong className="text-neutral-200">{certificate.credentialId}</strong> issued by{' '}
                  <strong className="text-neutral-200">{certificate.issuer}</strong>.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono-code">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticated Credential</span>
                </div>
              </div>
            )}

            {/* Credential Metadata Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-950/30">
                <span className="text-[11px] font-mono-code text-neutral-400 block mb-1">
                  Credential ID
                </span>
                <span className="text-xs font-bold font-mono-code text-neutral-200">
                  {certificate.credentialId}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-950/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono-code text-neutral-400 block mb-0.5">
                    Official Verification
                  </span>
                  <span className="text-xs font-semibold text-neutral-300">
                    {certificate.verificationUrl !== '#' ? 'Online Verification' : 'Verified by Issuer'}
                  </span>
                </div>
                {certificate.verificationUrl && certificate.verificationUrl !== '#' && (
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-bold ${accentClasses.text} hover:underline`}
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
