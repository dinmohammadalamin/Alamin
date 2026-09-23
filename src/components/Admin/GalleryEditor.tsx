import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GalleryItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Camera,
  Calendar,
  MapPin,
  Eye,
  Sparkles
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

const CATEGORY_OPTIONS = [
  'Book Fair',
  'Tech & Work',
  'Robotics & Campus',
  'Events & Life',
  'Awards & Honors'
];

export const GalleryEditor: React.FC = () => {
  const { data, addGalleryItem, updateGalleryItem, deleteGalleryItem } = usePortfolio();
  const gallery = data.gallery || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const [formState, setFormState] = useState<{
    title: string;
    category: string;
    imageUrl: string;
    date: string;
    location: string;
    caption: string;
  }>({
    title: '',
    category: 'Book Fair',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    date: 'February 2025',
    location: 'Suhrawardy Udyan, Dhaka',
    caption: ''
  });

  const resetForm = () => {
    setFormState({
      title: '',
      category: 'Book Fair',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
      date: 'February 2025',
      location: '',
      caption: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (item: GalleryItem) => {
    setFormState({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      date: item.date,
      location: item.location || '',
      caption: item.caption || ''
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.imageUrl.trim()) return;

    if (editingId) {
      updateGalleryItem(editingId, {
        title: formState.title.trim(),
        category: formState.category.trim() || 'Book Fair',
        imageUrl: formState.imageUrl.trim(),
        date: formState.date.trim() || '2025',
        location: formState.location.trim() || undefined,
        caption: formState.caption.trim() || undefined
      });
      setEditingId(null);
    } else {
      addGalleryItem({
        title: formState.title.trim(),
        category: formState.category.trim() || 'Book Fair',
        imageUrl: formState.imageUrl.trim(),
        date: formState.date.trim() || '2025',
        location: formState.location.trim() || undefined,
        caption: formState.caption.trim() || undefined
      });
      setIsAdding(false);
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <span>Visual Gallery Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Curate photo moments from the Book Fair, DevxHub office, Robotics Society, and university milestones.
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo Moment</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSaveSubmit} className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {editingId ? 'Edit Photo Details' : 'Add New Photo to Gallery'}
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
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Moment Title *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                placeholder="e.g. Book Fair Stall with Durbin Publication"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
              <select
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Date / Period</label>
              <input
                type="text"
                value={formState.date}
                onChange={e => setFormState({ ...formState, date: e.target.value })}
                placeholder="e.g. February 2025"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Location / Venue</label>
              <input
                type="text"
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
                placeholder="e.g. Bangla Academy, Dhaka"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Image URL & Uploader */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Photo Image URL *</label>
            <input
              type="text"
              required
              value={formState.imageUrl}
              onChange={e => setFormState({ ...formState, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 mb-2"
            />
            <ImageUploader
              label="Or Upload High-Resolution Photo"
              value={formState.imageUrl}
              onChange={(url: string) => setFormState({ ...formState, imageUrl: url })}
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Caption / Story Behind the Moment</label>
            <textarea
              rows={3}
              value={formState.caption}
              onChange={e => setFormState({ ...formState, caption: e.target.value })}
              placeholder="Describe the occasion, people involved, or significance..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit buttons */}
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
              {editingId ? 'Save Changes' : 'Add Photo to Gallery'}
            </button>
          </div>
        </form>
      )}

      {/* Existing Gallery Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map(item => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 flex flex-col justify-between space-y-3 transition-all group"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-slate-700 text-[10px] font-mono text-emerald-400">
                {item.category}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-1">
                <span>{item.date}</span>
                {item.location && <span>• {item.location}</span>}
              </div>
              {item.caption && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.caption}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setPreviewItem(item)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400"
                title="Preview"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${item.title}" from gallery?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Lightbox Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black mb-4">
              <img
                src={previewItem.imageUrl}
                alt={previewItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {previewItem.category}
            </span>

            <h4 className="text-lg font-bold text-white mt-2">{previewItem.title}</h4>
            <p className="text-xs font-mono text-slate-400 mt-1">{previewItem.date} {previewItem.location ? `• ${previewItem.location}` : ''}</p>
            {previewItem.caption && (
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">{previewItem.caption}</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
