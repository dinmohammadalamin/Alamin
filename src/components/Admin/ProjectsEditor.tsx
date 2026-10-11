import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Github,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FolderGit2
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ProjectsEditor: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, cloudSyncStatus, cloudSyncError, syncNow } = usePortfolio();
  const { projects } = data;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formState, setFormState] = useState<{
    title: string;
    category: ProjectItem['category'];
    description: string;
    techStack: string;
    qaHighlights: string;
    imageUrl: string;
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
  }>({
    title: '',
    category: 'Automation',
    description: '',
    techStack: 'Playwright, TypeScript, GitHub Actions',
    qaHighlights: '150+ automated E2E tests\nZero flaky tests\nCI/CD gate',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    setIsBusy(true);
    setFeedback(null);

    const title = formState.title.trim();
    const res = await addProject({
      title,
      category: formState.category,
      description: formState.description.trim(),
      techStack: formState.techStack.split(',').map(s => s.trim()).filter(Boolean),
      qaHighlights: formState.qaHighlights.split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: formState.imageUrl.trim() || undefined,
      githubUrl: formState.githubUrl.trim() || undefined,
      liveUrl: formState.liveUrl.trim() || undefined,
      featured: formState.featured
    });

    setIsBusy(false);
    setIsAdding(false);
    resetForm();

    if (res && res.success) {
      setFeedback({
        type: 'success',
        message: `প্রজেক্ট "${title}" সফলভাবে তৈরি হয়েছে এবং Supabase Cloud-এ সেভ হয়েছে!`
      });
    } else {
      setFeedback({
        type: 'error',
        message: `প্রজেক্ট লোকালি তৈরি হয়েছে, কিন্তু ক্লাউড সিঙ্ক এরর: ${res?.message || 'Unknown error'}`
      });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    setIsBusy(true);
    setFeedback(null);

    const title = formState.title.trim();
    const res = await updateProject(id, {
      title,
      category: formState.category,
      description: formState.description.trim(),
      techStack: formState.techStack.split(',').map(s => s.trim()).filter(Boolean),
      qaHighlights: formState.qaHighlights.split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: formState.imageUrl.trim() || undefined,
      githubUrl: formState.githubUrl.trim() || undefined,
      liveUrl: formState.liveUrl.trim() || undefined,
      featured: formState.featured
    });

    setIsBusy(false);
    setEditingId(null);
    resetForm();

    if (res && res.success) {
      setFeedback({
        type: 'success',
        message: `প্রজেক্ট "${title}" সফলভাবে আপডেট হয়েছে এবং Supabase Cloud-এ সেভ হয়েছে!`
      });
    } else {
      setFeedback({
        type: 'error',
        message: `প্রজেক্ট আপডেট লোকালি সেভ হয়েছে, কিন্তু ক্লাউড সিঙ্ক এরর: ${res?.message || 'Unknown error'}`
      });
    }
  };

  const handleDelete = async (proj: ProjectItem) => {
    setIsBusy(true);
    setFeedback(null);

    const res = await deleteProject(proj.id);

    setIsBusy(false);
    setConfirmDeleteId(null);

    if (res && res.success) {
      setFeedback({
        type: 'success',
        message: `প্রজেক্ট "${proj.title}" সফলভাবে ডিলিট করা হয়েছে এবং Supabase Cloud ডাটাবেসে আপডেট হয়েছে!`
      });
    } else {
      setFeedback({
        type: 'error',
        message: `প্রজেক্ট লোকালি ডিলিট হয়েছে, কিন্তু ক্লাউড সিঙ্ক করতে সমস্যা হয়েছে: ${res?.message || 'Unknown error'}`
      });
    }
  };

  const handleManualSync = async () => {
    setIsBusy(true);
    setFeedback(null);
    const res = await syncNow();
    setIsBusy(false);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: 'সব প্রজেক্ট সফলভাবে Supabase Cloud-এর সাথে সিঙ্ক করা হয়েছে!'
      });
    } else {
      setFeedback({
        type: 'error',
        message: `সিঙ্ক ব্যর্থ হয়েছে: ${res.message}`
      });
    }
  };

  const resetForm = () => {
    setFormState({
      title: '',
      category: 'Automation',
      description: '',
      techStack: 'Playwright, TypeScript, GitHub Actions',
      qaHighlights: '150+ automated E2E tests\nZero flaky tests\nCI/CD gate',
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
      featured: false
    });
  };

  const startEdit = (p: ProjectItem) => {
    setEditingId(p.id);
    setIsAdding(false);
    setConfirmDeleteId(null);
    setFormState({
      title: p.title,
      category: p.category,
      description: p.description,
      techStack: (p.techStack || []).join(', '),
      qaHighlights: (p.qaHighlights || []).join('\n'),
      imageUrl: p.imageUrl || '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: !!p.featured
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
              <span>QA & Engineering Projects</span>
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your QA projects, test automation suites, and case studies. Changes sync instantly to Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Cloud Sync Status / Button */}
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isBusy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              cloudSyncStatus === 'synced'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : cloudSyncStatus === 'error'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
            }`}
            title="Force sync current project list to Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isBusy || cloudSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>
              {isBusy
                ? 'Syncing...'
                : cloudSyncStatus === 'synced'
                ? 'Cloud Synced'
                : cloudSyncStatus === 'error'
                ? 'Sync Error'
                : 'Sync to Cloud'}
            </span>
          </button>

          {!isAdding && !editingId && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsAdding(true);
                setConfirmDeleteId(null);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl flex items-center justify-between text-xs font-medium border ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Form (Add or Edit) */}
      {(isAdding || editingId) && (
        <form
          onSubmit={editingId ? (e) => handleSaveEdit(e, editingId) : handleCreate}
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" />
              {editingId ? 'Edit Project' : 'Create New QA Project'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Category</label>
              <select
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Automation">Automation</option>
                <option value="API Testing">API Testing</option>
                <option value="Performance">Performance</option>
                <option value="Web & PWA">Web & PWA</option>
                <option value="Bug Case Study">Bug Case Study</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">GitHub Repo URL</label>
              <input
                type="text"
                value={formState.githubUrl}
                onChange={e => setFormState({ ...formState, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Live Demo / Report URL</label>
              <input
                type="text"
                value={formState.liveUrl}
                onChange={e => setFormState({ ...formState, liveUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <ImageUploader
                value={formState.imageUrl}
                onChange={url => setFormState({ ...formState, imageUrl: url })}
                label="Project Screenshot / Cover Image"
                description="Upload an image from your device (HD resolution preserved), or paste a URL."
                maxDimension={1200}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={formState.techStack}
                onChange={e => setFormState({ ...formState, techStack: e.target.value })}
                placeholder="Playwright, TypeScript, Postman, Jest"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Description</label>
              <textarea
                rows={3}
                value={formState.description}
                onChange={e => setFormState({ ...formState, description: e.target.value })}
                placeholder="Summary of your role and what was achieved..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">
                QA Highlights / Verification Deliverables (one per line)
              </label>
              <textarea
                rows={3}
                value={formState.qaHighlights}
                onChange={e => setFormState({ ...formState, qaHighlights: e.target.value })}
                placeholder="150+ automated E2E tests&#10;Zero flaky tests&#10;CI/CD gate"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.featured}
                onChange={e => setFormState({ ...formState, featured: e.target.checked })}
                className="accent-emerald-500 rounded"
              />
              <span>Mark as Featured Project</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                disabled={isBusy}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isBusy}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
              >
                {isBusy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingId ? 'Update & Sync to Cloud' : 'Save & Sync to Cloud'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-white font-semibold text-sm">No Projects Listed</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You currently have no projects. Click "Add New Project" above to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(proj => {
            const isDeletingThis = confirmDeleteId === proj.id;

            return (
              <div
                key={proj.id}
                className={`p-4 rounded-2xl bg-slate-950 border transition-all flex flex-col justify-between ${
                  isDeletingThis ? 'border-red-500/50 bg-red-950/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">★ Featured</span>
                    )}
                  </div>

                  <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {proj.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                          +{proj.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Inline Confirmation for Deletion */}
                {isDeletingThis ? (
                  <div className="mt-4 pt-3 border-t border-red-500/30 flex items-center justify-between bg-red-950/20 -mx-4 -mb-4 p-3 rounded-b-2xl">
                    <span className="text-xs text-red-300 font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                      সত্যিই ডিলিট করবেন?
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        disabled={isBusy}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj)}
                        disabled={isBusy}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-bold transition-all shadow-sm shadow-red-500/20 disabled:opacity-50"
                      >
                        {isBusy ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        <span>হ্যাঁ, ডিলিট করুন</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-900 transition-colors"
                          title="Open GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 p-1 rounded hover:bg-slate-900 transition-colors"
                          title="Open Live URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => startEdit(proj)}
                        className="flex items-center gap-1 p-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(proj.id)}
                        className="flex items-center gap-1 p-1.5 px-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

