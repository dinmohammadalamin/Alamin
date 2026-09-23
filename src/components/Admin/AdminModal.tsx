import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProfileEditor } from './ProfileEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ArticlesEditor } from './ArticlesEditor';
import { BooksEditor } from './BooksEditor';
import { GalleryEditor } from './GalleryEditor';
import { MessagesInbox } from './MessagesInbox';
import { SettingsBackup } from './SettingsBackup';
import {
  Lock,
  Unlock,
  X,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  BookOpen,
  Camera,
  FileText,
  Mail,
  Settings,
  LayoutDashboard,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'profile'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'articles'
  | 'books'
  | 'gallery'
  | 'messages'
  | 'settings';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    data
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Incorrect admin password. Please enter the valid password you configured.');
    }
  };

  const unreadMessagesCount = data.messages.filter(m => !m.read).length;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                ADM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Portfolio Control Panel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Dynamic Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isAuthenticated ? 'Authenticated Admin Session' : 'Security Verification Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-800 transition-colors"
                title="Lock admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
              title="Close and return to portfolio preview"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Portfolio</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-5">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Admin Access Verification
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Enter your dynamic admin password to access the portfolio editor and manage all content.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  placeholder="Enter Admin Password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-4 pr-11 font-mono text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-left">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Unlock Admin Dashboard
              </button>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
                Hint: Default password is <strong className="text-emerald-400">1234</strong> (can be changed dynamically in Settings).
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-56 bg-slate-950/90 border-r border-slate-800 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile & Hero</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>SQA Skills ({data.skills.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects ({data.projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'experience'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Experience & Edu</span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'articles'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Articles & Vlogs ({(data.articles || []).filter(a => !a.isBook).length})</span>
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'books'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Published Books ({data.books?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Visual Gallery ({data.gallery?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span>Inquiries</span>
                </div>
                {unreadMessagesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500 text-white font-bold">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings & Backup</span>
              </button>
            </aside>

            {/* Tab Body */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-900/60">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Welcome, {data.profile.name}!
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Here is the live telemetry and content status of your SQA portfolio.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {data.skills.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">SQA Skills</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-2xl font-bold font-mono text-teal-400">
                        {data.projects.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Active Projects</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-2xl font-bold font-mono text-cyan-400">
                        {data.experience.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Milestones</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-2xl font-bold font-mono text-emerald-300">
                        {data.articles.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Articles & Blogs</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-2xl font-bold font-mono text-amber-400">
                        {data.messages.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Inquiries</div>
                    </div>
                  </div>

                  {/* Fast Action Cards */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Quick Management Actions
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-white text-xs">Edit Bio & Photo</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Upload picture and update hero bio</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('articles')}
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-white text-xs">Write Article / Blog</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Publish QA posts & book releases</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('skills')}
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-white text-xs">Manage QA Tools</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Add automation frameworks & tests</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('projects')}
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-white text-xs">Add New Project</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Publish test suite case studies</div>
                      </button>
                    </div>
                  </div>

                  {/* Sync status */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Persistent Storage Engine: Active & Synchronized</span>
                    </div>
                    <button
                      onClick={() => setIsAdminOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold"
                    >
                      View Live Portfolio
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && <ProfileEditor />}
              {activeTab === 'skills' && <SkillsEditor />}
              {activeTab === 'projects' && <ProjectsEditor />}
              {activeTab === 'experience' && <ExperienceEditor />}
              {activeTab === 'articles' && <ArticlesEditor />}
              {activeTab === 'books' && <BooksEditor />}
              {activeTab === 'gallery' && <GalleryEditor />}
              {activeTab === 'messages' && <MessagesInbox />}
              {activeTab === 'settings' && <SettingsBackup />}
            </main>
          </div>
        )}

      </div>
    </div>
  );
};
