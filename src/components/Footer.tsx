import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShieldCheck, ArrowUp, Lock, Heart, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, openCvModal } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-850 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
                DM
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                {data.profile.name}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                SQA Engineer • Rajshahi, Bangladesh
              </p>
            </div>
          </div>

          {/* Nav shortcut */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#test-lab" className="hover:text-emerald-400 transition-colors">Test Lab</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#books" className="hover:text-emerald-400 transition-colors">Books</a>
            <a href="#articles" className="hover:text-emerald-400 transition-colors">Articles</a>
            <a href="#gallery" className="hover:text-emerald-400 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            <button
              onClick={openCvModal}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
            >
              CV
            </button>
          </div>

          {/* Socials & Top */}
          <div className="flex items-center gap-3">
            {data.profile.githubUrl && (
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {data.profile.linkedinUrl && (
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              title="Admin access (PIN required - Shortcut: Ctrl+Shift+A)"
              className="text-slate-700 hover:text-emerald-400 transition-colors p-0.5"
              aria-label="Admin Access"
            >
              <Lock className="w-2.5 h-2.5 opacity-30 hover:opacity-100" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with precision for Software Quality Assurance</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
