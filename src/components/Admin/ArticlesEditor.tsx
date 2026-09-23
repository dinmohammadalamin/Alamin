import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArticleItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Calendar,
  Clock,
  FileText,
  Eye,
  ExternalLink,
  Video,
  Share2,
  Tag
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

const CATEGORY_PRESETS = [
  'Automation & CI/CD',
  'API Testing',
  'Performance Testing',
  'Manual & Strategy',
  'Video Vlog',
  'Security & Compliance',
  'DevOps & QA'
];

const PLATFORM_PRESETS = ['Dev.to', 'Medium', 'LinkedIn', 'YouTube', 'Personal'];

export const ArticlesEditor: React.FC = () => {
  const { data, addArticle, updateArticle, deleteArticle } = usePortfolio();
  const articles = (data.articles || []).filter(a => !a.isBook);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewModalArticle, setPreviewModalArticle] = useState<ArticleItem | null>(null);

  const getCurrentMonthYear = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  const [formState, setFormState] = useState<{
    title: string;
    category: string;
    date: string;
    readTime: string;
    excerpt: string;
    content: string;
    coverImage: string;
    type: 'article' | 'vlog' | 'external' | 'tutorial';
    platform: string;
    externalUrl: string;
    videoUrl: string;
    tagsString: string;
  }>({
    title: '',
    category: 'Automation & CI/CD',
    date: getCurrentMonthYear(),
    readTime: '5 min read',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
    type: 'article',
    platform: 'Dev.to',
    externalUrl: '',
    videoUrl: '',
    tagsString: 'Playwright, QA, CI/CD'
  });

  const resetForm = () => {
    setFormState({
      title: '',
      category: 'Automation & CI/CD',
      date: getCurrentMonthYear(),
      readTime: '5 min read',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
      type: 'article',
      platform: 'Dev.to',
      externalUrl: '',
      videoUrl: '',
      tagsString: 'Playwright, QA, CI/CD'
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (art: ArticleItem) => {
    setFormState({
      title: art.title,
      category: art.category,
      date: art.date,
      readTime: art.readTime,
      excerpt: art.excerpt,
      content: art.content,
      coverImage: art.coverImage || 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
      type: art.type || 'article',
      platform: art.platform || 'Personal',
      externalUrl: art.externalUrl || art.link || '',
      videoUrl: art.videoUrl || '',
      tagsString: art.tags ? art.tags.join(', ') : ''
    });
    setEditingId(art.id);
    setIsAdding(false);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    const tags = formState.tagsString
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload: Partial<ArticleItem> = {
      title: formState.title.trim(),
      category: formState.category.trim() || 'Automation & CI/CD',
      date: formState.date.trim() || getCurrentMonthYear(),
      readTime: formState.readTime.trim() || '5 min read',
      excerpt: formState.excerpt.trim(),
      content: formState.content.trim(),
      coverImage: formState.coverImage.trim() || undefined,
      type: formState.type,
      platform: formState.platform.trim() || undefined,
      externalUrl: formState.externalUrl.trim() || undefined,
      videoUrl: formState.videoUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined
    };

    if (editingId) {
      updateArticle(editingId, payload);
      setEditingId(null);
    } else {
      addArticle({
        title: formState.title.trim(),
        category: formState.category.trim() || 'Automation & CI/CD',
        date: formState.date.trim() || getCurrentMonthYear(),
        readTime: formState.readTime.trim() || '5 min read',
        excerpt: formState.excerpt.trim(),
        content: formState.content.trim(),
        coverImage: formState.coverImage.trim() || undefined,
        type: formState.type,
        platform: formState.platform.trim() || undefined,
        externalUrl: formState.externalUrl.trim() || undefined,
        videoUrl: formState.videoUrl.trim() || undefined,
        tags: tags.length > 0 ? tags : undefined
      });
      setIsAdding(false);
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Articles & Vlog Posts Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Write, link, and syndicate technical articles, video vlogs, or posts from Medium, Dev.to, LinkedIn, and YouTube.
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post Article / Vlog</span>
          </button>
        )}
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSaveSubmit} className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {editingId ? 'Edit Article / Post' : 'Create Article / Vlog Post'}
            </span>
            <button
              type="button"
              onClick={resetForm}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Article or Vlog Title *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                placeholder="e.g. Building a Flaky-Free E2E Automation Pipeline with Playwright"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Type & Platform */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Content Type</label>
              <select
                value={formState.type}
                onChange={e => setFormState({ ...formState, type: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="article">Technical Article</option>
                <option value="vlog">Video Vlog</option>
                <option value="external">External Syndicated Post</option>
                <option value="tutorial">Tutorial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Platform / Host</label>
              <select
                value={formState.platform}
                onChange={e => setFormState({ ...formState, platform: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                {PLATFORM_PRESETS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Category & Read/Watch Time */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
              <input
                type="text"
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value })}
                placeholder="e.g. Automation & CI/CD"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {CATEGORY_PRESETS.slice(0, 4).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormState({ ...formState, category: p })}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Read / Watch Time & Date</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formState.readTime}
                  onChange={e => setFormState({ ...formState, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={formState.date}
                  onChange={e => setFormState({ ...formState, date: e.target.value })}
                  placeholder="e.g. Aug 2025"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            {/* External URL */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">External Post URL (Medium, Dev.to, LinkedIn)</label>
              <input
                type="text"
                value={formState.externalUrl}
                onChange={e => setFormState({ ...formState, externalUrl: e.target.value })}
                placeholder="https://dev.to/... or https://medium.com/..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Video / Vlog URL (YouTube, Vimeo, etc.)</label>
              <input
                type="text"
                value={formState.videoUrl}
                onChange={e => setFormState({ ...formState, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={formState.tagsString}
                onChange={e => setFormState({ ...formState, tagsString: e.target.value })}
                placeholder="Playwright, E2E, CI/CD, DevxHub"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Cover Image / Thumbnail</label>
            <input
              type="text"
              value={formState.coverImage}
              onChange={e => setFormState({ ...formState, coverImage: e.target.value })}
              placeholder="https://..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 mb-2"
            />
            <ImageUploader
              label="Or Upload Cover Image"
              value={formState.coverImage}
              onChange={(url: string) => setFormState({ ...formState, coverImage: url })}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Brief Excerpt / Summary *</label>
            <textarea
              rows={2}
              required
              value={formState.excerpt}
              onChange={e => setFormState({ ...formState, excerpt: e.target.value })}
              placeholder="Short teaser shown on the card..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Full Article / Vlog Notes (Markdown supported) *</label>
            <textarea
              rows={6}
              required
              value={formState.content}
              onChange={e => setFormState({ ...formState, content: e.target.value })}
              placeholder="Write the full content, problem overview, key strategies, and conclusion..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              {editingId ? 'Save Post Changes' : 'Publish Article / Vlog'}
            </button>
          </div>
        </form>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map(art => (
          <div
            key={art.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-4">
              {art.coverImage && (
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{art.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {art.category}
                  </span>
                  {art.platform && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {art.platform}
                    </span>
                  )}
                  {art.type === 'vlog' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                      Vlog
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                  {art.externalUrl && (
                    <>
                      <span>•</span>
                      <a
                        href={art.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setPreviewModalArticle(art)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 transition-colors"
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStartEdit(art)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${art.title}"?`)) {
                    deleteArticle(art.id);
                  }
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPreviewModalArticle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>{previewModalArticle.category}</span>
              <span>•</span>
              <span>{previewModalArticle.date}</span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{previewModalArticle.title}</h4>

            {previewModalArticle.coverImage && (
              <img
                src={previewModalArticle.coverImage}
                alt={previewModalArticle.title}
                className="w-full aspect-[16/9] object-cover rounded-xl mb-4"
              />
            )}

            <p className="text-xs text-slate-300 italic mb-4">"{previewModalArticle.excerpt}"</p>

            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line mb-4">
              {previewModalArticle.content}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewModalArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
