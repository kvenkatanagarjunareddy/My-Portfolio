import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="relative min-h-screen bg-neutral-950 text-neutral-100 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100 light:bg-neutral-50 light:text-neutral-900 selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Background Visual Effects & Mesh */}
          <BackgroundFX />

          {/* Navigation Bar with Log In / Manage trigger */}
          <Navbar />

          {/* Main Portfolio Sections */}
          <main className="relative z-10">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. About & Philosophy & Work Experience */}
            <AboutSection />

            {/* 3. Technical Skills Matrix */}
            <SkillsSection />

            {/* 4. Projects Showcase */}
            <ProjectsSection />

            {/* 5. Education */}
            <EducationSection />

            {/* 6. Certifications */}
            <CertificationsSection />

            {/* 7. Achievements */}
            <AchievementsSection />

            {/* 8. Contact & Inquiries */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Admin Modals */}
          <LoginModal />
          <AdminDashboardModal />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
