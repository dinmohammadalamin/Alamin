import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory } from '../types';
import { Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All SQA Skills' },
    { key: 'automation', label: 'Test Automation' },
    { key: 'api-performance', label: 'API & Performance' },
    { key: 'manual-qa', label: 'Manual QA & Process' },
    { key: 'languages', label: 'Programming & DB' },
    { key: 'dev-tools', label: 'DevOps & Tools' },
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.badge && skill.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            SQA & Engineering Toolkit
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            End-to-end testing frameworks, API verification tools, defect tracking workflows, and core programming capabilities.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
            {categories.map(cat => {
              const count = cat.key === 'all'
                ? skills.length
                : skills.filter(s => s.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.key
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeCategory === cat.key ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Postman)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-emerald-500/40 transition-all hover:bg-slate-950 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800/80 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  {skill.badge || skill.category}
                </span>
                <span className="text-emerald-400/80 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {skill.level >= 85 ? 'Advanced' : skill.level >= 75 ? 'Proficient' : 'Familiar'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 text-sm">
            No SQA skills matched your search "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
