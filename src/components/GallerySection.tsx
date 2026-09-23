import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { GalleryItem } from '../types';
import {
  Camera,
  Calendar,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Award
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const gallery = data.gallery || [];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Book Fair', 'Tech & Work', 'Robotics & Campus', 'Events & Life'];

  const filteredGallery = gallery.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const activeLightboxItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery]);

  // Lock body scroll when photo modal is open to prevent page scroll underneath
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="gallery" className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-100/80'}`}>
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3.5 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>MOMENTS & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Visual Gallery
          </h2>
          <p className="mt-3.5 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Capturing defining moments from the Omor Ekushe Boi Mela, DevxHub engineering sprints, Robotics Society showcases, and campus journeys.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
            <Camera className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No photos found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-slate-700 text-emerald-400 text-[10px] font-mono font-bold">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-slate-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        {item.date}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3 text-teal-400" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    {item.caption && (
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal (Portaled to document.body) */}
        {activeLightboxItem && lightboxIndex !== null && typeof document !== 'undefined' && createPortal(
          <div
            id="gallery-lightbox-modal"
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-start p-3 sm:p-6 pt-4 sm:pt-6 pb-12 select-none overflow-y-auto cursor-zoom-out"
          >
            {/* Previous Navigation Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-all hover:scale-110 cursor-pointer shadow-2xl"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-all hover:scale-110 cursor-pointer shadow-2xl"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative cursor-default shrink-0"
            >
              {/* Integrated Card Top Header */}
              <div className="px-4 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Photo {lightboxIndex + 1} of {filteredGallery.length}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    {activeLightboxItem.category}
                  </span>
                </div>

                <button
                  type="button"
                  id="gallery-modal-top-close-btn"
                  onClick={() => setLightboxIndex(null)}
                  className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105 border border-rose-400/30"
                  title="Close Photo Viewer (Esc)"
                >
                  <X className="w-4 h-4" />
                  <span>Close (Esc)</span>
                </button>
              </div>

              {/* Photo Area */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden max-h-[46vh] sm:max-h-[52vh]">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="max-h-[46vh] sm:max-h-[52vh] w-auto max-w-full object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo Details Bar */}
              <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col justify-between space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeLightboxItem.location && (
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        {activeLightboxItem.location}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {activeLightboxItem.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeLightboxItem.title}
                </h3>

                {activeLightboxItem.caption && (
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {activeLightboxItem.caption}
                  </p>
                )}

                {/* Bottom Dismiss / Close Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                    Click outside, press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 text-[10px]">Esc</kbd>, or click Close
                  </span>
                  <button
                    type="button"
                    id="gallery-modal-bottom-close-btn"
                    onClick={() => setLightboxIndex(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-600 hover:text-white border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ml-auto shadow-md"
                  >
                    <X className="w-4 h-4" />
                    <span>Close Photo / বন্ধ করুন</span>
                  </button>
                </div>
              </div>

            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
