import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ExperienceEducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const { experience, education } = data;

  const [activeTab, setActiveTab] = useState<'both' | 'experience' | 'education'>('both');

  return (
    <section id="experience" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>QUALIFICATIONS & CAREER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Experience & Education
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            Professional industry internships, academic journey in Computer Science & Engineering, and creative accomplishments.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 inline-flex gap-1">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'both'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'experience'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience ({experience.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education ({education.length})</span>
            </button>
          </div>
        </div>

        {/* Timeline Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Experience Column */}
          {(activeTab === 'both' || activeTab === 'experience') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Work Experience</h3>
                  <p className="text-xs text-slate-400">Software development, SQA & authorship</p>
                </div>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-slate-800">
                {experience.map(item => (
                  <div key={item.id} className="relative group">
                    {/* Dot on line */}
                    <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/40 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.period}
                        </span>
                        {item.type === 'creative' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Book Author
                          </span>
                        )}
                        {item.type === 'internship' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            Internship
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                        {item.role}
                      </h4>

                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <span>{item.company}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400 flex items-center gap-1 font-normal">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.achievements && item.achievements.length > 0 && (
                        <ul className="mt-3 space-y-1.5 pt-2 border-t border-slate-900">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Column */}
          {(activeTab === 'both' || activeTab === 'education') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Academic Degrees</h3>
                  <p className="text-xs text-slate-400">Computer Science & Engineering specialization</p>
                </div>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-cyan-500 before:to-slate-800">
                {education.map(item => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-teal-400 group-hover:scale-125 transition-transform" />

                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-teal-500/40 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.period}
                        </span>
                        {item.location && (
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mt-2 group-hover:text-teal-300 transition-colors">
                        {item.degree}
                      </h4>

                      <div className="text-xs font-semibold text-teal-400 mt-0.5">
                        {item.institution}
                      </div>

                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
