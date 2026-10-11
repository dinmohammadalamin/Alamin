import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  User,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  Briefcase,
  BookOpen,
  CheckCircle,
  FileDown
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, openCvModal } = usePortfolio();
  const { profile } = data;
  const about = data.about;

  const roleDisplay = about?.roleLabel || 'SQA Engineer (L-1) @ DevxHub';
  const educationDisplay = about?.educationLabel || 'Masters in Eng & B.Sc in CSE';
  const locationBadge = about?.locationBadge || 'Rajshahi / Remote';
  const sectionBadge = about?.badge || 'GET TO KNOW ME';
  const sectionTitle = about?.sectionTitle || `About ${profile.name || 'Din Mohammad'}`;
  const headline = about?.headline || 'Passionate SQA Engineer, CSE Graduate & Tech Enthusiast';
  const story = about?.storyText || profile.aboutLong || profile.bio;
  const principlesTitle = about?.principlesTitle || 'My Core Quality Assurance Principles';
  const principlesList = about?.principles && about.principles.length > 0 ? about.principles : [
    { id: 'p-1', title: 'Shift-Left Testing', description: 'Preventing bugs early in requirements and design.' },
    { id: 'p-2', title: 'Maintainable Automation', description: 'Robust Page Object Models over fragile scripts.' },
    { id: 'p-3', title: 'API-First Validation', description: 'Testing contracts, latency, and boundary limits.' },
    { id: 'p-4', title: 'Clear Bug Lifecycle', description: 'Flawless Jira tickets with reproducible logs and video.' },
  ];
  const authorCard = about?.authorCard || {
    show: true,
    title: 'Published Author of "Ononto Parapar"',
    description: 'Published at the prestigious 2025 Omor Ekushe Book Fair by Durbin Publication. The meticulous discipline and emotional conciseness required in micro-poetry deeply mirror my focus on edge cases, code aesthetics, and rigorous software verification.'
  };

  const infoGrid = [
    { label: 'Name', value: profile.name, icon: User },
    { label: 'Role', value: roleDisplay, icon: Briefcase },
    { label: 'Location', value: profile.address || profile.city || 'Rajshahi, Bangladesh', icon: MapPin },
    { label: 'Education', value: educationDisplay, icon: GraduationCap },
    { label: 'Email', value: profile.email, icon: Mail, isEmail: true },
    { label: 'Phone', value: profile.phone, icon: Phone },
    { label: 'Birthday', value: profile.birthday, icon: Calendar },
    { label: 'Status', value: profile.freelanceStatus, icon: CheckCircle },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>{sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-100">
              {headline}
            </h3>

            <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line">
              {story}
            </p>

            {principlesList.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {principlesTitle}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {principlesList.map(item => (
                    <li key={item.id || item.title} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span><strong>{item.title}:</strong> {item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Author highlight card */}
            {authorCard.show && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    {authorCard.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {authorCard.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Personal Info Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>Personal Specifications</span>
                <span className="text-xs font-mono text-emerald-400">{locationBadge}</span>
              </h4>

              <div className="divide-y divide-slate-800/80">
                {infoGrid.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400 flex items-center gap-2 font-medium">
                        <Icon className="w-4 h-4 text-emerald-400/80" />
                        <span>{item.label}:</span>
                      </span>
                      <span className="text-slate-200 font-semibold text-right max-w-[60%] truncate">
                        {item.isEmail ? (
                          <a href={`mailto:${item.value}`} className="hover:text-emerald-400 hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <a
                  href="#contact"
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
                >
                  {about?.hireButtonText || 'Hire Me / Work Together'}
                </a>
                <button
                  onClick={openCvModal}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  title="View & Download Authentic SQA CV"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{about?.cvButtonText || 'View CV'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
