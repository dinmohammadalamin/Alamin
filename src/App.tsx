import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { InteractiveTestLab } from './components/InteractiveTestLab';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { BooksSection } from './components/BooksSection';
import { ArticlesSection } from './components/ArticlesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/Admin/AdminModal';
import { CvModal } from './components/CvModal';

function PortfolioContent() {
  const { theme } = usePortfolio();

  return (
    <div
      data-theme={theme}
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      } selection:bg-emerald-500 selection:text-slate-950 font-sans relative antialiased transition-colors duration-300`}
    >
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section with animated typing headline & SQA credentials */}
      <Hero />

      {/* Live SQA Telemetry & Metrics (Test cases executed, bugs found, coverage, regression rate) */}
      <StatsSection />

      {/* About Din Mohammad Al Amin (Biography, details, personal traits & SQA philosophy) */}
      <AboutSection />

      {/* SQA & Technical Skills with Interactive Category Filters and Proficiency meters */}
      <SkillsSection />

      {/* Interactive Automated Test Lab (Live automated test runner simulation for SQA engineers) */}
      <InteractiveTestLab />

      {/* Quality Assurance Service Offerings */}
      <ServicesSection />

      {/* Projects Showcase (Automation suites, API testing, performance tests & web apps) */}
      <ProjectsSection />

      {/* Career Experience & Educational Background Milestones */}
      <ExperienceEducationSection />

      {/* Dedicated Published Books Showcase ("Ononto Parapar" - Ekushe Book Fair 2025, Durbin Publication) */}
      <BooksSection />

      {/* Technical Articles, Video Vlogs & Syndicated Posts (Dev.to, Medium, YouTube) with Social Sharing */}
      <ArticlesSection />

      {/* Visual Gallery (Moments from Ekushe Boi Mela, DevxHub Engineering, Robotics & Life) */}
      <GallerySection />

      {/* Contact Form (Direct inquiries piped dynamically into the Admin Inbox) */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Real CV Modal (Printable, Downloadable, complete 10 projects, experience & education) */}
      <CvModal />

      {/* Dynamic Admin Control Panel (PIN protected, dynamic CRUD for all data, JSON backup/export) */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
