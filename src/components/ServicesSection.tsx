import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { IconHelper } from './IconHelper';
import { Check, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { data } = usePortfolio();
  const { services } = data;

  return (
    <section id="services" className="py-20 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>SQA OFFERINGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Quality Assurance Services
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            End-to-end testing strategies tailored for early-stage startups to scaling enterprise web platforms.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <IconHelper name={srv.iconName} className="w-6 h-6 text-emerald-400" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {srv.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {srv.description}
                </p>

                {/* Deliverables */}
                {srv.deliverables && srv.deliverables.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-850 space-y-2">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                      Key Deliverables:
                    </span>
                    {srv.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Enterprise Grade QA</span>
                <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Inquire →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
