import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem, SkillCategory } from '../../types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export const SkillsEditor: React.FC = () => {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const { skills } = data;

  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: SkillCategory;
    level: number;
    badge: string;
  }>({
    name: '',
    category: 'automation',
    level: 85,
    badge: ''
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<SkillItem>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    addSkill({
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: Number(newSkill.level),
      badge: newSkill.badge.trim() || undefined
    });
    setNewSkill({
      name: '',
      category: 'automation',
      level: 85,
      badge: ''
    });
  };

  const handleSaveEdit = (id: string) => {
    updateSkill(id, editingItem);
    setEditingId(null);
    setEditingItem({});
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">SQA & Technical Skills Manager</h3>
        <p className="text-xs text-slate-400">
          Add new QA tools, update proficiency levels, and assign category badges.
        </p>
      </div>

      {/* Add Skill Form */}
      <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add New Skill / Tool
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Tool / Skill Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Playwright, Postman, JMeter"
              value={newSkill.name}
              onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Category</label>
            <select
              value={newSkill.category}
              onChange={e => setNewSkill({ ...newSkill, category: e.target.value as SkillCategory })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="automation">Test Automation</option>
              <option value="api-performance">API & Performance</option>
              <option value="manual-qa">Manual QA & Process</option>
              <option value="languages">Programming & DB</option>
              <option value="dev-tools">DevOps & Tools</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Proficiency % ({newSkill.level}%)</label>
            <input
              type="range"
              min="10"
              max="100"
              value={newSkill.level}
              onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
              className="w-full accent-emerald-500 mt-2"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Badge / Tag</label>
            <input
              type="text"
              placeholder="e.g. E2E, Load, Defect Mgt"
              value={newSkill.badge}
              onChange={e => setNewSkill({ ...newSkill, badge: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill to Portfolio</span>
          </button>
        </div>
      </form>

      {/* Existing Skills Table */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Configured Skills ({skills.length})</span>
          <span>Click to adjust or delete</span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-96 overflow-y-auto">
          {skills.map(skill => {
            const isEditing = editingId === skill.id;

            if (isEditing) {
              return (
                <div key={skill.id} className="p-3 bg-slate-900/90 flex flex-wrap items-center gap-3 text-xs">
                  <input
                    type="text"
                    value={editingItem.name ?? skill.name}
                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-medium"
                  />
                  <select
                    value={editingItem.category ?? skill.category}
                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value as SkillCategory })}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-300"
                  >
                    <option value="automation">Automation</option>
                    <option value="api-performance">API & Performance</option>
                    <option value="manual-qa">Manual QA</option>
                    <option value="languages">Languages</option>
                    <option value="dev-tools">Dev Tools</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">{editingItem.level ?? skill.level}%</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={editingItem.level ?? skill.level}
                      onChange={e => setEditingItem({ ...editingItem, level: Number(e.target.value) })}
                      className="accent-emerald-500 w-24"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Badge"
                    value={editingItem.badge ?? skill.badge ?? ''}
                    onChange={e => setEditingItem({ ...editingItem, badge: e.target.value })}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-300 w-28"
                  />
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => handleSaveEdit(skill.id)}
                      className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={skill.id} className="p-3.5 flex items-center justify-between gap-4 text-xs hover:bg-slate-900/40">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <span className="font-semibold text-white">{skill.name}</span>
                  {skill.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
                      {skill.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 max-w-xs flex items-center gap-2">
                  <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 w-9 text-right font-bold">
                    {skill.level}%
                  </span>
                </div>

                <div className="text-slate-500 font-mono text-[11px] capitalize w-28 hidden sm:block">
                  {skill.category.replace('-', ' ')}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingId(skill.id);
                      setEditingItem({
                        name: skill.name,
                        category: skill.category,
                        level: skill.level,
                        badge: skill.badge
                      });
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
