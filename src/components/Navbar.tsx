import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, setIsAdminOpen, openCvModal } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#test-lab', label: 'Test Lab' },
    { href: '#projects', label: 'Projects' },
    { href: '#books', label: 'Books' },
    { href: '#articles', label: 'Articles' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-md shadow-slate-200/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & SQA Badge with Dynamic Profile Picture */}
        <div className="flex items-center gap-2.5">
          <a
            href="#home"
            onDoubleClick={(e) => {
              e.preventDefault();
              setIsAdminOpen(true);
            }}
            title="Din Mohammad Al Amin - SQA Engineer (Double click for Admin)"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Dynamic Profile Picture Logo */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className={`w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
                {data.profile.avatarUrl ? (
                  <img
                    key={data.profile.avatarUrl}
                    src={data.profile.avatarUrl}
                    alt={data.profile.name || 'Din Mohammad Al Amin'}
                    className="w-full h-full object-cover rounded-[10px]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className={`avatar-fallback w-full h-full rounded-[10px] items-center justify-center font-mono font-bold text-emerald-500 text-sm ${
                    data.profile.avatarUrl ? 'hidden' : 'flex'
                  } ${theme === 'dark' ? 'bg-slate-950 text-emerald-400' : 'bg-slate-100 text-emerald-600'}`}
                >
                  DM
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center">
                <span className={`font-bold text-base tracking-tight whitespace-nowrap transition-colors group-hover:text-emerald-500 ${
                  theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {data.profile.name}
                </span>
              </div>
              <p className={`text-xs font-mono whitespace-nowrap hidden md:block ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Software Quality Assurance Engineer
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs xl:text-sm font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Theme toggle, Admin button, Resume) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-300 shadow-sm'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Resume Download CTA */}
          <button
            onClick={openCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            title="View & Download Authentic CV"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border lg:hidden cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-300'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-3 pb-6 border-b shadow-2xl backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-slate-950/95 border-slate-800'
            : 'bg-white/95 border-slate-200'
        }`}>
          <div className="flex flex-col gap-1.5 pt-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900/90'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>→</span>
              </a>
            ))}
            <div className={`pt-3 border-t mt-2 flex flex-col gap-2 ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCvModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 cursor-pointer"
              >
                <FileDown className="w-3.5 h-4" />
                <span>View / Download CV</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
