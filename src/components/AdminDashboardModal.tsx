import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Upload,
  FolderGit2,
  Award,
  Briefcase,
  User,
  Image as ImageIcon,
  Sparkles,
  LogOut,
  ExternalLink,
  Github,
  Check,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, SkillCategoryType } from '../types';

export const AdminDashboardModal: React.FC = () => {
  const { theme, accentClasses } = useTheme();
  const {
    isManageModalOpen,
    setIsManageModalOpen,
    logout,
    activeManageTab,
    setActiveManageTab,
    profile,
    updateProfile,
    updateAvatar,
    projects,
    addProject,
    deleteProject,
    certifications,
    addCertification,
    deleteCertification,
    experience,
    addExperience,
    deleteExperience,
    skills,
    addSkill,
    deleteSkill,
    resetToDefaults,
  } = usePortfolio();

  // Project Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectSkills, setProjectSkills] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLiveDemo, setProjectLiveDemo] = useState('');
  const [projectPhoto, setProjectPhoto] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('Full-Stack');
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  // Certificate Form State
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certPhoto, setCertPhoto] = useState('');
  const [certDate, setCertDate] = useState('2024');
  const [certId, setCertId] = useState('');
  const [certVerifyUrl, setCertVerifyUrl] = useState('');
  const certFileInputRef = useRef<HTMLInputElement>(null);

  // Experience Form State
  const [expTitle, setExpTitle] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expPeriodFrom, setExpPeriodFrom] = useState('');
  const [expPeriodTo, setExpPeriodTo] = useState('');
  const [expDescription, setExpDescription] = useState('');
  const [expLocation, setExpLocation] = useState('Remote / On-site');
  const [expTech, setExpTech] = useState('');

  // Profile Form State
  const [profileBio, setProfileBio] = useState(profile.bio);
  const [profileFullBio, setProfileFullBio] = useState(profile.fullBio);
  const [profileCurrentFocus, setProfileCurrentFocus] = useState(profile.status.currentFocus);

  // Avatar Upload State
  const [newAvatarPreview, setNewAvatarPreview] = useState(profile.avatarUrl);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  // Skill Form State
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState<SkillCategoryType>('Backend');
  const [skillExperience, setSkillExperience] = useState('1+ Year');
  const [skillLogoUrl, setSkillLogoUrl] = useState('');
  const [skillDescription, setSkillDescription] = useState('');
  const skillFileInputRef = useRef<HTMLInputElement>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isManageModalOpen) return null;

  // File to Base64 helper
  const handleFileUpload = (
    file: File,
    onSuccess: (dataUrl: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onSuccess(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // 1. Submit Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDesc.trim()) {
      notify('Please provide project title and description.');
      return;
    }

    const tagsArray = projectSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addProject({
      title: projectTitle.trim(),
      tagline: projectDesc.trim().slice(0, 70),
      description: projectDesc.trim(),
      fullDescription: projectDesc.trim(),
      category: projectCategory,
      featured: true,
      role: 'Lead Developer',
      metrics: [
        { label: 'Status', value: 'Live / Ready' },
        { label: 'Architecture', value: 'Production' },
      ],
      tags: tagsArray.length > 0 ? tagsArray : ['Web', 'Software'],
      githubUrl: projectGithub.trim() || undefined,
      liveUrl: projectLiveDemo.trim() || undefined,
      image:
        projectPhoto ||
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      challenges: ['Optimizing performance and responsive UI across devices.'],
      solutions: ['Implemented clean modular architecture and robust state handling.'],
      architecture: {
        frontend: 'React & Tailwind',
        backend: 'REST API',
      },
      keyFeatures: ['Interactive UI', 'Clean modular design'],
    });

    // Reset form
    setProjectTitle('');
    setProjectDesc('');
    setProjectSkills('');
    setProjectGithub('');
    setProjectLiveDemo('');
    setProjectPhoto('');
    notify('Project added successfully to showcase!');
  };

  // 2. Submit Certificate
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim()) {
      notify('Please enter certificate title.');
      return;
    }

    addCertification({
      title: certTitle.trim(),
      issuer: certIssuer.trim() || 'Verified Institution',
      issuerBadge: 'Global Accredited',
      issueDate: certDate || '2024',
      credentialId: certId.trim() || `CERT-${Date.now().toString().slice(-6)}`,
      verificationUrl: certVerifyUrl.trim() || '#',
      topics: ['Software Engineering', 'Validation & Skill Assessment'],
      icon: 'Award',
      certificateImageUrl: certPhoto || undefined,
    });

    setCertTitle('');
    setCertIssuer('');
    setCertPhoto('');
    setCertId('');
    setCertVerifyUrl('');
    notify('Certificate added successfully!');
  };

  // 3. Submit Experience
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expRole.trim()) {
      notify('Please fill company/project title and role.');
      return;
    }

    const periodStr =
      expPeriodFrom && expPeriodTo
        ? `${expPeriodFrom} – ${expPeriodTo}`
        : expPeriodFrom || 'Recent';

    const techArray = expTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addExperience({
      company: expTitle.trim(),
      role: expRole.trim(),
      location: expLocation.trim() || 'Remote / On-site',
      period: periodStr,
      type: 'Full-time',
      description: expDescription.trim() || 'Software engineering role.',
      highlights: [
        'Engineered responsive features and clean code modules.',
        'Collaborated on application design, debugging, and continuous improvement.',
      ],
      techStack: techArray.length > 0 ? techArray : ['Java', 'SQL', 'Web'],
    });

    setExpTitle('');
    setExpRole('');
    setExpPeriodFrom('');
    setExpPeriodTo('');
    setExpDescription('');
    setExpTech('');
    notify('Experience role saved successfully!');
  };

  // 4. Update Profile Descriptions
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bio: profileBio,
      fullBio: profileFullBio,
      status: {
        ...profile.status,
        currentFocus: profileCurrentFocus,
      },
    });
    notify('Profile details updated successfully!');
  };

  // 5. Update Avatar Photo
  const handleSaveAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAvatarPreview) {
      updateAvatar(newAvatarPreview);
      notify('Profile portrait photo updated successfully!');
    }
  };

  // 6. Submit Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) {
      notify('Please enter a skill name.');
      return;
    }

    addSkill({
      name: skillName.trim(),
      category: skillCategory,
      experience: skillExperience.trim() || '1+ Year',
      iconName: 'Zap',
      logoUrl:
        skillLogoUrl.trim() ||
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      tags: ['Core', 'Production'],
      description: skillDescription.trim() || `${skillName} engineering practice.`,
      highlight: false,
    });

    setSkillName('');
    setSkillExperience('1+ Year');
    setSkillLogoUrl('');
    setSkillDescription('');
    notify(`Added skill "${skillName}"!`);
  };

  const tabs = [
    { id: 'projects', label: '1. Projects', icon: FolderGit2 },
    { id: 'certificates', label: '2. Certificates', icon: Award },
    { id: 'experience', label: '3. Experience', icon: Briefcase },
    { id: 'profile', label: '4. Profile Bio', icon: User },
    { id: 'avatar', label: '5. Photo Change', icon: ImageIcon },
    { id: 'skills', label: '6. Skills', icon: Sparkles },
  ] as const;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className={`relative max-w-5xl w-full my-6 rounded-3xl border shadow-2xl flex flex-col max-h-[92vh] overflow-hidden ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-800/80 flex items-center justify-between gap-4 bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${accentClasses.bgSoft} ${accentClasses.text}`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-display-title">
                  Portfolio Manager & Content Editor
                </h2>
                <span className="text-[11px] font-mono-code text-neutral-400">
                  Logged in as <strong className="text-emerald-400">naga</strong> (Admin Mode)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                title="Log out of admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <button
                onClick={() => setIsManageModalOpen(false)}
                id="btn-close-admin-panel"
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
                aria-label="Close admin manager"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {notification && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-400 font-mono-code flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-neutral-800/60 overflow-x-auto scrollbar-none bg-neutral-950/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeManageTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveManageTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? `${accentClasses.bgSoft} ${accentClasses.text} border ${accentClasses.border} shadow-sm`
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: PROJECTS */}
            {activeManageTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Add New Project</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    Add title, description, skills/tags, GitHub link, live demo URL, and photo.
                  </p>
                </div>

                <form onSubmit={handleAddProject} className="space-y-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        1) Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Distributed Task Scheduler"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Category
                      </label>
                      <select
                        value={projectCategory}
                        onChange={(e) => setProjectCategory(e.target.value as ProjectCategory)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="AI & ML">AI & ML</option>
                        <option value="Developer Tools">Developer Tools</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      2) Description of the Project *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      placeholder="Comprehensive overview of architecture, what it does, challenges solved, and key features..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      3) Skills of the Project (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectSkills}
                      onChange={(e) => setProjectSkills(e.target.value)}
                      placeholder="Java, Spring Boot, MySQL, REST APIs, Docker, React"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        4) GitHub Link (optional)
                      </label>
                      <input
                        type="url"
                        value={projectGithub}
                        onChange={(e) => setProjectGithub(e.target.value)}
                        placeholder="https://github.com/nagarjjuna481/..."
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        5) Live Demo Link (optional)
                      </label>
                      <input
                        type="url"
                        value={projectLiveDemo}
                        onChange={(e) => setProjectLiveDemo(e.target.value)}
                        placeholder="https://my-app-demo.vercel.app"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* 6) Upload Photo of Project */}
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      6) Upload Photo of the Project (File or Image URL)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={projectPhoto}
                        onChange={(e) => setProjectPhoto(e.target.value)}
                        placeholder="Paste image URL or upload file below..."
                        className="flex-1 w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                      <input
                        type="file"
                        ref={projectFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, (dataUrl) => setProjectPhoto(dataUrl));
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => projectFileInputRef.current?.click()}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse File</span>
                      </button>
                    </div>

                    {projectPhoto && (
                      <div className="mt-2 flex items-center gap-3">
                        <img
                          src={projectPhoto}
                          alt="Project Preview"
                          className="w-20 h-14 object-cover rounded-lg border border-neutral-700"
                        />
                        <span className="text-[11px] text-emerald-400 font-mono-code">Photo attached</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Project to Portfolio</span>
                  </button>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                    Existing Projects ({projects.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold font-display-title truncate">{proj.title}</h5>
                            <p className="text-[11px] text-neutral-400 line-clamp-1">{proj.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {proj.tags.slice(0, 3).map((t) => (
                                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 font-mono-code">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            deleteProject(proj.id);
                            notify(`Deleted "${proj.title}"`);
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors shrink-0"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CERTIFICATES */}
            {activeManageTab === 'certificates' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Add Certificate</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    Title name, issuing organization, and optional photo upload viewable when clicking View.
                  </p>
                </div>

                <form onSubmit={handleAddCertificate} className="space-y-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        1) Certificate Title Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={certTitle}
                        onChange={(e) => setCertTitle(e.target.value)}
                        placeholder="e.g. Core Java Programming Masterclass"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Issuing Authority / Organization
                      </label>
                      <input
                        type="text"
                        value={certIssuer}
                        onChange={(e) => setCertIssuer(e.target.value)}
                        placeholder="Oracle / Udemy / HackerRank / University"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Credential ID (optional)
                      </label>
                      <input
                        type="text"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        placeholder="UC-338291..."
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Verification Link (optional)
                      </label>
                      <input
                        type="url"
                        value={certVerifyUrl}
                        onChange={(e) => setCertVerifyUrl(e.target.value)}
                        placeholder="https://verify.cert.com/..."
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 2) Certificate Photo Upload */}
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      2) Certificate Photo (Uploaded image opens in popup on "View" button)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={certPhoto}
                        onChange={(e) => setCertPhoto(e.target.value)}
                        placeholder="Image URL or upload certificate file..."
                        className="flex-1 w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                      <input
                        type="file"
                        ref={certFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, (dataUrl) => setCertPhoto(dataUrl));
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => certFileInputRef.current?.click()}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Certificate</span>
                      </button>
                    </div>

                    {certPhoto && (
                      <div className="mt-2 flex items-center gap-3">
                        <img
                          src={certPhoto}
                          alt="Cert Preview"
                          className="w-24 h-16 object-contain rounded-lg border border-neutral-700 bg-neutral-950 p-1"
                        />
                        <span className="text-[11px] text-emerald-400 font-mono-code">
                          Certificate photo ready for View button
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Certificate to Showcase</span>
                  </button>
                </form>

                {/* Existing Certificates */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                    Existing Certificates ({certifications.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certifications.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl border border-neutral-800 bg-neutral-950/40 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold font-display-title truncate">{c.title}</h5>
                          <span className="text-[11px] text-neutral-400 font-mono-code block">
                            {c.issuer} • {c.issueDate}
                          </span>
                          {c.certificateImageUrl && (
                            <span className="text-[10px] text-cyan-400 font-mono-code">
                              ✓ Has custom photo
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            deleteCertification(c.id);
                            notify(`Removed "${c.title}"`);
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EXPERIENCE */}
            {activeManageTab === 'experience' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Add Work Experience</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    1) Title (Company/Org) 2) Role 3) Period From & To 4) Description
                  </p>
                </div>

                <form onSubmit={handleAddExperience} className="space-y-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        1) Title (Company / Organization) *
                      </label>
                      <input
                        type="text"
                        required
                        value={expTitle}
                        onChange={(e) => setExpTitle(e.target.value)}
                        placeholder="e.g. Tech Corp / Startup Name"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        2) Role *
                      </label>
                      <input
                        type="text"
                        required
                        value={expRole}
                        onChange={(e) => setExpRole(e.target.value)}
                        placeholder="e.g. Software Development Intern / Engineer"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        3) Period From *
                      </label>
                      <input
                        type="text"
                        required
                        value={expPeriodFrom}
                        onChange={(e) => setExpPeriodFrom(e.target.value)}
                        placeholder="e.g. June 2024"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        3) Period To *
                      </label>
                      <input
                        type="text"
                        required
                        value={expPeriodTo}
                        onChange={(e) => setExpPeriodTo(e.target.value)}
                        placeholder="e.g. July 2024 or Present"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      4) Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={expDescription}
                      onChange={(e) => setExpDescription(e.target.value)}
                      placeholder="Detailed overview of engineering responsibilities, systems engineered, problem domains solved..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      Tech Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={expTech}
                      onChange={(e) => setExpTech(e.target.value)}
                      placeholder="Java, MySQL, HTML5, CSS3, JavaScript, Git"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Experience to Timeline</span>
                  </button>
                </form>

                {/* Existing Experience Items */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                    Existing Roles ({experience.length})
                  </h4>
                  <div className="space-y-2">
                    {experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-3.5 rounded-2xl border border-neutral-800 bg-neutral-950/40 flex items-start justify-between gap-3"
                      >
                        <div>
                          <h5 className="text-xs font-bold font-display-title">
                            {exp.role} @ <span className="text-neutral-300">{exp.company}</span>
                          </h5>
                          <span className="text-[11px] text-neutral-400 font-mono-code block">
                            {exp.period} • {exp.location}
                          </span>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{exp.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            deleteExperience(exp.id);
                            notify(`Deleted "${exp.role}"`);
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PROFILE SECTION */}
            {activeManageTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Profile Section Editor</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    1) Edit profile description, full story, and current engineering focus.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      1) Hero Short Description (Shown below role title)
                    </label>
                    <textarea
                      rows={3}
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      About Section Detailed Description (Engineering Story)
                    </label>
                    <textarea
                      rows={5}
                      value={profileFullBio}
                      onChange={(e) => setProfileFullBio(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      Current Engineering Focus
                    </label>
                    <input
                      type="text"
                      value={profileCurrentFocus}
                      onChange={(e) => setProfileCurrentFocus(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Update Profile Descriptions</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: PHOTO CHANGE OPTION */}
            {activeManageTab === 'avatar' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Photo Change Option</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    Upload your profile photo from your device or paste an image URL. It instantly updates the circular portrait in the hero section.
                  </p>
                </div>

                <form onSubmit={handleSaveAvatar} className="space-y-5 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Portrait Preview */}
                    <div className="relative w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shrink-0">
                      <img
                        src={newAvatarPreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full bg-neutral-950"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                          Direct Image URL
                        </label>
                        <input
                          type="text"
                          value={newAvatarPreview}
                          onChange={(e) => setNewAvatarPreview(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                        />
                      </div>

                      <div>
                        <input
                          type="file"
                          ref={avatarFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (dataUrl) => setNewAvatarPreview(dataUrl));
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => avatarFileInputRef.current?.click()}
                          className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload New Photo From Computer</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply New Profile Portrait</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 6: SKILLS SECTION */}
            {activeManageTab === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display-title">Skills Section Editor</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">
                    Add new technology skills with official brand logos, category, and experience level.
                  </p>
                </div>

                <form onSubmit={handleAddSkill} className="space-y-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Skill Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        placeholder="e.g. Next.js / AWS / GraphQL"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Category
                      </label>
                      <select
                        value={skillCategory}
                        onChange={(e) => setSkillCategory(e.target.value as SkillCategoryType)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      >
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Architecture & Tools">Architecture & Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Experience Level
                      </label>
                      <input
                        type="text"
                        value={skillExperience}
                        onChange={(e) => setSkillExperience(e.target.value)}
                        placeholder="e.g. 2+ Years / Advanced"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                        Skill Brand Logo URL or File
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skillLogoUrl}
                          onChange={(e) => setSkillLogoUrl(e.target.value)}
                          placeholder="SVG / CDN URL..."
                          className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                        />
                        <input
                          type="file"
                          ref={skillFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (dataUrl) => setSkillLogoUrl(dataUrl));
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => skillFileInputRef.current?.click()}
                          className="px-3 py-2 rounded-xl border border-neutral-700 bg-neutral-800 text-xs"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">
                      Skill Description
                    </label>
                    <textarea
                      rows={2}
                      value={skillDescription}
                      onChange={(e) => setSkillDescription(e.target.value)}
                      placeholder="Brief note on projects or systems built with this technology..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${accentClasses.gradient} shadow-md flex items-center justify-center gap-2`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill to Matrix</span>
                  </button>
                </form>

                {/* Existing Skills */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                    Existing Skills Matrix ({skills.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {skills.map((s) => (
                      <div
                        key={s.name}
                        className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950/40 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={s.logoUrl}
                            alt={s.name}
                            className="w-5 h-5 object-contain shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-display-title block truncate">{s.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono-code block truncate">{s.experience}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            deleteSkill(s.name);
                            notify(`Removed skill "${s.name}"`);
                          }}
                          className="p-1 text-rose-400 hover:bg-rose-500/20 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Reset & Helper */}
          <div className="px-6 py-3 border-t border-neutral-800/80 bg-neutral-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-400 font-mono-code">
              Changes are immediately synchronized and saved to your browser storage.
            </span>
            <button
              onClick={() => {
                if (window.confirm('Reset all changes back to initial portfolio default content?')) {
                  resetToDefaults();
                  notify('Reset to default portfolio content.');
                }
              }}
              className="text-neutral-400 hover:text-white font-mono-code flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
