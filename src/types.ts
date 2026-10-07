export type ThemeMode = 'dark' | 'light';
export type AccentColor = 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';

export interface ProfileInfo {
  name: string;
  handle: string;
  titles: string[];
  bio: string;
  fullBio: string;
  location: string;
  timezone: string;
  avatarUrl: string;
  status: {
    availableForHire: boolean;
    currentFocus: string;
    noticePeriod: string;
  };
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
    label: string;
    username: string;
  }[];
  resumeUrl?: string;
  email: string;
  phone?: string;
  calendlyUrl?: string;
}

export type SkillCategoryType = 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI & Machine Learning' | 'Architecture & Tools';

export interface SkillItem {
  name: string;
  category: SkillCategoryType;
  level?: number;
  experience: string;
  iconName: string;
  logoUrl: string;
  highlight?: boolean;
  tags: string[];
  description: string;
}

export type ProjectCategory = 'All' | 'Full-Stack' | 'AI & ML' | 'Cloud & Distributed' | 'Developer Tools';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  featured: boolean;
  role: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  starsCount?: number;
  image: string;
  challenges: string[];
  solutions: string[];
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    infrastructure?: string;
    aiModel?: string;
  };
  keyFeatures: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Advisory' | 'Internship';
  description: string;
  highlights: string[];
  techStack: string[];
  badge?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: string;
  gpa: string;
  honors: string[];
  coursework: string[];
  capstone: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  topics: string[];
  icon: string;
  certificateImageUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Open Source' | 'Speaking' | 'Publication' | 'Leadership' | 'Project & Innovation' | 'Academic';
  year: string;
  description: string;
  metric?: string;
  organization: string;
  link?: string;
  badgeIcon: string;
}
