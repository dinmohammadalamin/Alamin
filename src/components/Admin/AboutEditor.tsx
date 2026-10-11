import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AboutSectionData, QaPrincipleItem } from '../../types';
import { INITIAL_PORTFOLIO_DATA } from '../../data/initialData';
import {
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  BookOpen,
  User,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

export const AboutEditor: React.FC = () => {
  const { data, updateAbout, cloudSyncStatus, syncNow } = usePortfolio();
  
  const initialAbout: AboutSectionData = data.about || INITIAL_PORTFOLIO_DATA.about || {
    badge: 'GET TO KNOW ME',
    sectionTitle: `About ${data.profile.name || 'Din Mohammad'}`,
    headline: 'Passionate SQA Engineer, CSE Graduate & Tech Enthusiast',
    storyText: data.profile.aboutLong || data.profile.bio || '',
    roleLabel: 'SQA Engineer (L-1) @ DevxHub',
    educationLabel: 'Masters in Eng & B.Sc in CSE',
    locationBadge: 'Rajshahi / Remote',
    principlesTitle: 'My Core Quality Assurance Principles',
    principles: [
      { id: 'p-1', title: 'Shift-Left Testing', description: 'Preventing bugs early in requirements and design.' },
      { id: 'p-2', title: 'Maintainable Automation', description: 'Robust Page Object Models over fragile scripts.' },
      { id: 'p-3', title: 'API-First Validation', description: 'Testing contracts, latency, and boundary limits.' },
      { id: 'p-4', title: 'Clear Bug Lifecycle', description: 'Flawless Jira tickets with reproducible logs and video.' }
    ],
    authorCard: {
      show: true,
      title: 'Published Author of "Ononto Parapar"',
      description: 'Published at the prestigious 2025 Omor Ekushe Book Fair by Durbin Publication. The meticulous discipline and emotional conciseness required in micro-poetry deeply mirror my focus on edge cases, code aesthetics, and rigorous software verification.'
    },
    hireButtonText: 'Hire Me / Work Together',
    cvButtonText: 'View CV'
  };

  const [formState, setFormState] = useState<AboutSectionData>(initialAbout);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // New principle form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showAddPrinciple, setShowAddPrinciple] = useState(false);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const res = await updateAbout(formState);
    setSaving(false);

    if (res && res.success) {
      setFeedback({
        type: 'success',
        message: 'About সেকশন সফলভাবে আপডেট হয়েছে এবং Supabase Cloud-এ সেভ করা হয়েছে!'
      });
    } else {
      setFeedback({
        type: 'error',
        message: `লোকালি সেভ হয়েছে, কিন্তু ক্লাউড সিঙ্ক সমস্যা: ${res?.message || 'Unknown error'}`
      });
    }
  };

  const handleAddPrinciple = () => {
    if (!newTitle.trim()) return;
    const newItem: QaPrincipleItem = {
      id: `p-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim()
    };
    setFormState({
      ...formState,
      principles: [...(formState.principles || []), newItem]
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddPrinciple(false);
  };

  const handleDeletePrinciple = (id: string) => {
    setFormState({
      ...formState,
      principles: formState.principles.filter(p => p.id !== id)
    });
  };

  const handleMovePrinciple = (index: number, direction: 'up' | 'down') => {
    const list = [...formState.principles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setFormState({ ...formState, principles: list });
  };

  const handleUpdatePrinciple = (id: string, field: 'title' | 'description', value: string) => {
    setFormState({
      ...formState,
      principles: formState.principles.map(p => (p.id === id ? { ...p, [field]: value } : p))
    });
  };

  const handleReset = () => {
    if (window.confirm('আপনি কি ডিফল্ট তথ্যে ফিরিয়ে নিতে চান?')) {
      if (INITIAL_PORTFOLIO_DATA.about) {
        setFormState(INITIAL_PORTFOLIO_DATA.about);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>About Section Control</span>
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Editable
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Customize all headlines, bio narrative, SQA principles, author spotlight, and personal specs card.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Reset Default
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save & Sync'}</span>
          </button>
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

      {/* Section 1: Main Headings & Story */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/80">
          <User className="w-4 h-4 text-emerald-400" />
          <span>Section Headings & Bio Narrative</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">Badge Tag</label>
            <input
              type="text"
              value={formState.badge}
              onChange={e => setFormState({ ...formState, badge: e.target.value })}
              placeholder="e.g. GET TO KNOW ME"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Section Title</label>
            <input
              type="text"
              value={formState.sectionTitle}
              onChange={e => setFormState({ ...formState, sectionTitle: e.target.value })}
              placeholder="e.g. About Din Mohammad"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-mono mb-1">Headline / Subtitle</label>
            <input
              type="text"
              value={formState.headline}
              onChange={e => setFormState({ ...formState, headline: e.target.value })}
              placeholder="e.g. Passionate SQA Engineer, CSE Graduate & Tech Enthusiast"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-mono mb-1">Detailed Story / Background Description</label>
            <textarea
              rows={5}
              value={formState.storyText}
              onChange={e => setFormState({ ...formState, storyText: e.target.value })}
              placeholder="Write your background, testing experience, engineering achievements..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
            />
            <span className="text-[11px] text-slate-500">
              {formState.storyText?.length || 0} characters
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Core QA Principles */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Core Quality Assurance Principles</span>
          </h4>
          <button
            type="button"
            onClick={() => setShowAddPrinciple(!showAddPrinciple)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-400 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Principle</span>
          </button>
        </div>

        <div>
          <label className="block text-slate-300 font-mono text-xs mb-1">Principles Box Title</label>
          <input
            type="text"
            value={formState.principlesTitle}
            onChange={e => setFormState({ ...formState, principlesTitle: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Add New Principle form */}
        {showAddPrinciple && (
          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Add New QA Principle</span>
              <button
                type="button"
                onClick={() => setShowAddPrinciple(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Principle Name (e.g. Shift-Left Testing)</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description / Value</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Short description"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddPrinciple(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddPrinciple}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Add to List
              </button>
            </div>
          </div>
        )}

        {/* List of current principles */}
        <div className="space-y-2.5">
          {formState.principles.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-xs">
                <input
                  type="text"
                  value={item.title}
                  onChange={e => handleUpdatePrinciple(item.id, 'title', e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={item.description}
                  onChange={e => handleUpdatePrinciple(item.id, 'description', e.target.value)}
                  className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-300 focus:outline-none focus:border-emerald-500"
                  placeholder="Description"
                />
              </div>

              <div className="flex items-center gap-1 self-end sm:self-center">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMovePrinciple(idx, 'up')}
                  className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 disabled:opacity-20"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === formState.principles.length - 1}
                  onClick={() => handleMovePrinciple(idx, 'down')}
                  className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 disabled:opacity-20"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePrinciple(item.id)}
                  className="p-1 rounded bg-slate-950 hover:bg-red-500/20 text-red-400 transition-colors ml-1"
                  title="Remove Principle"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Author / Creative Spotlight Card */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Author / Creative Spotlight Card</span>
          </h4>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formState.authorCard?.show}
              onChange={e =>
                setFormState({
                  ...formState,
                  authorCard: { ...formState.authorCard, show: e.target.checked }
                })
              }
              className="accent-teal-500 rounded"
            />
            <span>Show on About Page</span>
          </label>
        </div>

        {formState.authorCard?.show && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Spotlight Card Title</label>
              <input
                type="text"
                value={formState.authorCard.title}
                onChange={e =>
                  setFormState({
                    ...formState,
                    authorCard: { ...formState.authorCard, title: e.target.value }
                  })
                }
                placeholder="e.g. Published Author of 'Ononto Parapar'"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">Spotlight Card Description</label>
              <textarea
                rows={3}
                value={formState.authorCard.description}
                onChange={e =>
                  setFormState({
                    ...formState,
                    authorCard: { ...formState.authorCard, description: e.target.value }
                  })
                }
                placeholder="Details about book fair, publishing house, creative philosophy..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Specifications Card & Action Buttons */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/80">
          <User className="w-4 h-4 text-emerald-400" />
          <span>Specifications Sidebar Card & Call-to-Actions</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">Role Title</label>
            <input
              type="text"
              value={formState.roleLabel || ''}
              onChange={e => setFormState({ ...formState, roleLabel: e.target.value })}
              placeholder="e.g. SQA Engineer (L-1) @ DevxHub"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Education Summary</label>
            <input
              type="text"
              value={formState.educationLabel || ''}
              onChange={e => setFormState({ ...formState, educationLabel: e.target.value })}
              placeholder="e.g. Masters in Eng & B.Sc in CSE"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Location Badge</label>
            <input
              type="text"
              value={formState.locationBadge || ''}
              onChange={e => setFormState({ ...formState, locationBadge: e.target.value })}
              placeholder="e.g. Rajshahi / Remote"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Hire Button Label</label>
            <input
              type="text"
              value={formState.hireButtonText || 'Hire Me / Work Together'}
              onChange={e => setFormState({ ...formState, hireButtonText: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">CV Button Label</label>
            <input
              type="text"
              value={formState.cvButtonText || 'View CV'}
              onChange={e => setFormState({ ...formState, cvButtonText: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving & Syncing...' : 'Save All Changes'}</span>
        </button>
      </div>
    </div>
  );
};
