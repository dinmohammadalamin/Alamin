import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import {
  ExternalLink,
  Github,
  CheckCircle,
  Sparkles,
  Search,
  FileCheck,
  X
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>PROVEN PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured QA & Automation Projects
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            Real-world testing architectures, Postman API collections, JMeter load tests, and web applications.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="rounded-3xl bg-slate-900 border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:-translate-y-1 hover:shadow-xl group"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden border-b border-slate-800/80">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1556742049-0a67e557229b?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0a67e557229b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-bold tracking-wider uppercase">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* QA Highlights */}
                  {project.qaHighlights && project.qaHighlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                      <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                        QA Highlights:
                      </div>
                      {project.qaHighlights.slice(0, 2).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-slate-300 hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Inspect QA Details</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project QA Details Inspector (Portaled to document.body) */}
        {selectedProject && typeof document !== 'undefined' && createPortal(
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative cursor-default my-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>QA Case Study</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>

              <div className="rounded-2xl overflow-hidden aspect-video mb-6 border border-slate-800">
                <img
                  src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1556742049-0a67e557229b?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">{selectedProject.description}</p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Testing Scope & Verification Highlights
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {selectedProject.qaHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Project Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
