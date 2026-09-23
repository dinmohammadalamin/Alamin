import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { IconHelper } from './IconHelper';

export const StatsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { metrics } = data;

  return (
    <section id="stats" className="py-12 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => (
            <div
              key={m.id || idx}
              className="relative p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <IconHelper name={m.iconName} className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-mono text-[11px] text-slate-400">0{idx + 1}</span>
              </div>

              <div className="text-3xl font-extrabold font-mono text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                {m.value}
              </div>

              <div className="mt-1 font-semibold text-slate-200 text-sm">
                {m.label}
              </div>

              <div className="mt-1 text-xs text-slate-400 line-clamp-2">
                {m.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
