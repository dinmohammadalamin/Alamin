import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';
import { Plus, Trash2, Edit2, Check, X, ExternalLink, Github } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ProjectsEditor: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const { projects } = data;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    addProject({
      title: formState.title.trim(),
      category: formState.category,
      description: formState.description.trim(),
      techStack: formState.techStack.split(',').map(s => s.trim()).filter(Boolean),
      qaHighlights: formState.qaHighlights.split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: formState.imageUrl.trim() || undefined,
      githubUrl: formState.githubUrl.trim() || undefined,
      liveUrl: formState.liveUrl.trim() || undefined,
      featured: formState.featured
    });

    setIsAdding(false);
    resetForm();
  };

  const handleSaveEdit = (id: string) => {
    updateProject(id, {
      title: formState.title.trim(),
      category: formState.category,
      description: formState.description.trim(),
      techStack: formState.techStack.split(',').map(s => s.trim()).filter(Boolean),
      qaHighlights: formState.qaHighlights.split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: formState.imageUrl.trim() || undefined,
      githubUrl: formState.githubUrl.trim() || undefined,
      liveUrl: formState.liveUrl.trim() || undefined,
      featured: formState.featured
    });
    setEditingId(null);
    resetForm();
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
    setFormState({
      title: p.title,
      category: p.category,
      description: p.description,
      techStack: p.techStack.join(', '),
      qaHighlights: p.qaHighlights.join('\n'),
      imageUrl: p.imageUrl || '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: !!p.featured
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">QA & Engineering Projects</h3>
          <p className="text-xs text-slate-400">
            Showcase your test automation frameworks, API validation suites, and case studies.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Form (Add or Edit) */}
      {(isAdding || editingId) && (
        <form
          onSubmit={editingId ? () => handleSaveEdit(editingId) : handleCreate}
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400">
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Category</label>
              <select
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Live Demo / Report URL</label>
              <input
                type="text"
                value={formState.liveUrl}
                onChange={e => setFormState({ ...formState, liveUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="md:col-span-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <ImageUploader
                value={formState.imageUrl}
                onChange={url => setFormState({ ...formState, imageUrl: url })}
                label="Project Screenshot / Cover Image"
                description="Upload an image from your device, or paste a URL."
                maxDimension={600}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={formState.techStack}
                onChange={e => setFormState({ ...formState, techStack: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Description</label>
              <textarea
                rows={3}
                value={formState.description}
                onChange={e => setFormState({ ...formState, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs"
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
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                {editingId ? 'Update Project' : 'Save Project'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="text-[10px] text-amber-400 font-bold uppercase">★ Featured</span>
                )}
              </div>

              <h4 className="font-bold text-white text-sm">{proj.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
              <div className="flex gap-2">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white p-1">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 p-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => startEdit(proj)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
