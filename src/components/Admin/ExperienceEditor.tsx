import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem, EducationItem } from '../../types';
import { Plus, Trash2, Edit2, Check, X, Briefcase, GraduationCap } from 'lucide-react';

export const ExperienceEditor: React.FC = () => {
  const {
    data,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  // New experience state
  const [newExp, setNewExp] = useState<{
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    achievements: string;
    type: ExperienceItem['type'];
  }>({
    role: '',
    company: '',
    period: '',
    location: 'Rajshahi, Bangladesh',
    description: '',
    achievements: '',
    type: 'work'
  });

  // New education state
  const [newEdu, setNewEdu] = useState<{
    degree: string;
    institution: string;
    period: string;
    location: string;
    description: string;
  }>({
    degree: '',
    institution: '',
    period: '',
    location: 'Rajshahi',
    description: ''
  });

  const handleAddExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role.trim() || !newExp.company.trim()) return;

    addExperience({
      role: newExp.role.trim(),
      company: newExp.company.trim(),
      period: newExp.period.trim(),
      location: newExp.location.trim(),
      description: newExp.description.trim(),
      achievements: newExp.achievements.split('\n').map(s => s.trim()).filter(Boolean),
      type: newExp.type
    });

    setNewExp({
      role: '',
      company: '',
      period: '',
      location: 'Rajshahi, Bangladesh',
      description: '',
      achievements: '',
      type: 'work'
    });
  };

  const handleAddEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.degree.trim() || !newEdu.institution.trim()) return;

    addEducation({
      degree: newEdu.degree.trim(),
      institution: newEdu.institution.trim(),
      period: newEdu.period.trim(),
      location: newEdu.location.trim(),
      description: newEdu.description.trim()
    });

    setNewEdu({
      degree: '',
      institution: '',
      period: '',
      location: 'Rajshahi',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Career & Education Manager</h3>
          <p className="text-xs text-slate-400">
            Maintain your professional employment, internships, and university degrees.
          </p>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'experience'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'education'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {activeTab === 'experience' ? (
        <div className="space-y-6">
          {/* Add Experience Form */}
          <form onSubmit={handleAddExp} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add Work / Internship Milestone
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Job Role / Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SQA Engineer / Automation Intern"
                  value={newExp.role}
                  onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Business Automation Limited"
                  value={newExp.company}
                  onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Time Period</label>
                <input
                  type="text"
                  placeholder="e.g. 12/2023 - 02/2024 or 2024 - Present"
                  value={newExp.period}
                  onChange={e => setNewExp({ ...newExp, period: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Type</label>
                <select
                  value={newExp.type}
                  onChange={e => setNewExp({ ...newExp, type: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="work">Full-time / Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="creative">Creative / Book Author</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">Summary Description</label>
                <textarea
                  rows={2}
                  value={newExp.description}
                  onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">Key Achievements (one per line)</label>
                <textarea
                  rows={2}
                  placeholder="Wrote 50+ test cases&#10;Integrated Playwright CI gate"
                  value={newExp.achievements}
                  onChange={e => setNewExp({ ...newExp, achievements: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Save Experience Item
              </button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {data.experience.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.role}</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">@{item.company}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>

                <button
                  onClick={() => deleteExperience(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Add Education Form */}
          <form onSubmit={handleAddEdu} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold text-teal-400 flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add Degree / Certification
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Science in CSE"
                  value={newEdu.degree}
                  onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajshahi University / Board"
                  value={newEdu.institution}
                  onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Years / Period</label>
                <input
                  type="text"
                  placeholder="e.g. 2025 - 2026"
                  value={newEdu.period}
                  onChange={e => setNewEdu({ ...newEdu, period: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={newEdu.location}
                  onChange={e => setNewEdu({ ...newEdu, location: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">Coursework / Focus</label>
                <textarea
                  rows={2}
                  value={newEdu.description}
                  onChange={e => setNewEdu({ ...newEdu, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
              >
                Save Education Degree
              </button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {data.education.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.degree}</span>
                    <span className="text-xs font-mono text-teal-400">@{item.institution}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>

                <button
                  onClick={() => deleteEducation(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
