import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  WORK_EXPERIENCE,
  CERTIFICATIONS_DATA,
  SKILLS_DATA,
} from '../data/portfolioData';
import {
  ProfileInfo,
  Project,
  ExperienceItem,
  CertificationItem,
  SkillItem,
} from '../types';

interface PortfolioContextType {
  // Auth state
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isManageModalOpen: boolean;
  setIsManageModalOpen: (open: boolean) => void;
  activeManageTab: 'projects' | 'certificates' | 'experience' | 'profile' | 'avatar' | 'skills';
  setActiveManageTab: (tab: 'projects' | 'certificates' | 'experience' | 'profile' | 'avatar' | 'skills') => void;

  // Editable collections
  profile: ProfileInfo;
  updateProfile: (updated: Partial<ProfileInfo>) => void;
  updateAvatar: (newAvatarUrl: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  certifications: CertificationItem[];
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, updated: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;

  experience: ExperienceItem[];
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  skills: SkillItem[];
  addSkill: (skill: SkillItem) => void;
  updateSkill: (name: string, updated: Partial<SkillItem>) => void;
  deleteSkill: (name: string) => void;

  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'nr_portfolio_is_auth',
  PROFILE: 'nr_portfolio_profile_v1',
  PROJECTS: 'nr_portfolio_projects_v1',
  CERTIFICATIONS: 'nr_portfolio_certs_v1',
  EXPERIENCE: 'nr_portfolio_experience_v1',
  SKILLS: 'nr_portfolio_skills_v1',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeManageTab, setActiveManageTab] = useState<
    'projects' | 'certificates' | 'experience' | 'profile' | 'avatar' | 'skills'
  >('projects');

  // Profile state
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!saved) return PROFILE_DATA;

      const savedProfile = JSON.parse(saved) as ProfileInfo;
      return {
        ...savedProfile,
        avatarUrl:
          savedProfile.avatarUrl === '/src/assets/images/nagarjuna_profile_1788453909001.jpg'
            ? PROFILE_DATA.avatarUrl
            : savedProfile.avatarUrl,
        metrics: savedProfile.metrics.map((metric) =>
          metric.label === 'Internship' && metric.value === 'Prodigy'
            ? { ...metric, value: 'Wipro', sublabel: 'Full-Stack Intern' }
            : metric
        ),
      };
    } catch {
      return PROFILE_DATA;
    }
  });

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : PROJECTS_DATA;
    } catch {
      return PROJECTS_DATA;
    }
  });

  // Certifications state
  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
      return saved ? JSON.parse(saved) : CERTIFICATIONS_DATA;
    } catch {
      return CERTIFICATIONS_DATA;
    }
  });

  // Experience state
  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      if (!saved) return WORK_EXPERIENCE;

      return (JSON.parse(saved) as ExperienceItem[]).filter(
        (item) => item.company !== 'Prodigy InfoTech'
      );
    } catch {
      return WORK_EXPERIENCE;
    }
  });

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : SKILLS_DATA;
    } catch {
      return SKILLS_DATA;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [certifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [experience]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [skills]);

  // Login handler
  const login = (user: string, pass: string): boolean => {
    if (user.trim() === 'naga' && pass === 'nagas123') {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {}
      setIsLoginModalOpen(false);
      setIsManageModalOpen(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {}
    setIsManageModalOpen(false);
  };

  // Profile operations
  const updateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const updateAvatar = (newAvatarUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
  };

  // Projects operations
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = { ...projectData, id: newId };
    setProjects((prev) => [newProj, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Certifications operations
  const addCertification = (certData: Omit<CertificationItem, 'id'>) => {
    const newId = `cert-${Date.now()}`;
    const newCert: CertificationItem = { ...certData, id: newId };
    setCertifications((prev) => [newCert, ...prev]);
  };

  const updateCertification = (id: string, updated: Partial<CertificationItem>) => {
    setCertifications((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCertification = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  // Experience operations
  const addExperience = (expData: Omit<ExperienceItem, 'id'>) => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = { ...expData, id: newId };
    setExperience((prev) => [newExp, ...prev]);
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteExperience = (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  };

  // Skills operations
  const addSkill = (skill: SkillItem) => {
    setSkills((prev) => [skill, ...prev]);
  };

  const updateSkill = (name: string, updated: Partial<SkillItem>) => {
    setSkills((prev) => prev.map((s) => (s.name === name ? { ...s, ...updated } : s)));
  };

  const deleteSkill = (name: string) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
  };

  const resetToDefaults = () => {
    setProfile(PROFILE_DATA);
    setProjects(PROJECTS_DATA);
    setCertifications(CERTIFICATIONS_DATA);
    setExperience(WORK_EXPERIENCE);
    setSkills(SKILLS_DATA);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
  };

  return (
    <PortfolioContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isManageModalOpen,
        setIsManageModalOpen,
        activeManageTab,
        setActiveManageTab,
        profile,
        updateProfile,
        updateAvatar,
        projects,
        addProject,
        updateProject,
        deleteProject,
        certifications,
        addCertification,
        updateCertification,
        deleteCertification,
        experience,
        addExperience,
        updateExperience,
        deleteExperience,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
