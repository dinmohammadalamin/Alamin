import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { ArticleItem } from '../types';
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  Check,
  ExternalLink,
  Search,
  Play,
  Bookmark,
  Sparkles,
  Video,
  FileText,
  Tag,
  ThumbsUp
} from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const articles = (data.articles || []).filter(art => !art.isBook);

  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedArticle(null);
        setActiveShareId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when article modal is open to prevent page elements bleeding or scrolling underneath
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArticle]);

  // Extract unique categories & platforms
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => {
      if (a.category) set.add(a.category);
      if (a.type === 'vlog') set.add('Video Vlogs');
    });
    return ['All', ...Array.from(set)];
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory =
        activeCategory === 'All' ||
        art.category === activeCategory ||
        (activeCategory === 'Video Vlogs' && art.type === 'vlog');

      const matchesSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (art.platform && art.platform.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  const handleShare = (art: ArticleItem, platform: 'copy' | 'linkedin' | 'twitter' | 'facebook' | 'whatsapp') => {
    const url = art.externalUrl || art.videoUrl || art.link || window.location.href;
    const title = `${art.title} by ${data.profile.name}`;
    const text = `Read "${art.title}" by ${data.profile.name} (SQA Engineer):`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${title} - ${url}`);
      setCopiedId(art.id);
      setTimeout(() => setCopiedId(null), 2500);
      return;
    }

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getPlatformBadgeColor = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'medium':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'dev.to':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      case 'youtube':
        return 'bg-red-500/10 text-red-300 border-red-500/20';
      case 'linkedin':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <section id="articles" className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3.5 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>KNOWLEDGE SHARING & MEDIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Articles, Vlogs & External Posts
          </h2>
          <p className="mt-3.5 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Technical articles, video vlogs, and published deep-dives from Medium, Dev.to, and LinkedIn covering SQA, automation architecture, and quality engineering.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic, tag, platform..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No articles or vlog posts matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(art => {
              const isVlog = art.type === 'vlog' || !!art.videoUrl;

              return (
                <div
                  key={art.id}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 shadow-lg relative"
                >
                  {/* Card Cover Image with Video Indicator */}
                  {art.coverImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      {/* Video Play Overlay for Vlogs */}
                      {isVlog && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Platform Pill on Cover */}
                      {art.platform && (
                        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-lg border text-[10px] font-mono font-bold backdrop-blur-md ${getPlatformBadgeColor(art.platform)}`}>
                          {art.platform}
                        </span>
                      )}

                      {/* Type Indicator (Vlog vs Article) */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/75 border border-slate-700 text-[10px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-1">
                        {isVlog ? <Video className="w-3 h-3 text-red-400" /> : <FileText className="w-3 h-3 text-emerald-400" />}
                        <span>{isVlog ? 'Vlog' : 'Article'}</span>
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Time Meta */}
                      <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                        <span className="text-emerald-400 font-medium">
                          {art.category}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {art.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedArticle(art)}
                        className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
                      >
                        {art.title}
                      </h3>

                      {/* Date */}
                      <div className="mt-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{art.date}</span>
                      </div>

                      {/* Excerpt */}
                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>

                      {/* Tags */}
                      {art.tags && art.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {art.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions: Read/Watch, External Link & One-Click Social Share */}
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between relative">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedArticle(art)}
                          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>{isVlog ? 'Watch Vlog' : 'Read Article'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {(art.externalUrl || art.videoUrl) && (
                          <a
                            href={art.externalUrl || art.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-slate-400 hover:text-emerald-300 transition-colors"
                            title={`Open on ${art.platform || 'Platform'}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Share Dropdown Button */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveShareId(activeShareId === art.id ? null : art.id)}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          title="Share this post"
                        >
                          {copiedId === art.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Dropdown Menu */}
                        {activeShareId === art.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-950 border border-slate-800 rounded-2xl p-2 shadow-2xl z-30 space-y-1">
                            <div className="text-[10px] font-mono text-slate-400 px-2.5 py-1 border-b border-slate-800 mb-1">
                              Share Post
                            </div>
                            <button
                              onClick={() => {
                                handleShare(art, 'copy');
                                setActiveShareId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Copy Link</span>
                              <Bookmark className="w-3 h-3 text-slate-400" />
                            </button>
                            <button
                              onClick={() => {
                                handleShare(art, 'linkedin');
                                setActiveShareId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>LinkedIn</span>
                              <span className="text-[10px] text-sky-400 font-bold">IN</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(art, 'twitter');
                                setActiveShareId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Twitter / X</span>
                              <span className="text-[10px] text-slate-400 font-bold">X</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(art, 'facebook');
                                setActiveShareId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Facebook</span>
                              <span className="text-[10px] text-blue-400 font-bold">FB</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(art, 'whatsapp');
                                setActiveShareId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>WhatsApp</span>
                              <span className="text-[10px] text-emerald-400 font-bold">WA</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Reader & Media Viewer (Portaled to document.body to prevent any section z-index or stacking context clipping) */}
        {selectedArticle && typeof document !== 'undefined' && createPortal(
          <div
            id="article-reader-modal"
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative cursor-default my-auto"
            >
              <button
                type="button"
                id="article-modal-close-btn"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer border border-slate-700 shadow-md"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Meta header */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {selectedArticle.category}
                </span>
                {selectedArticle.platform && (
                  <span className={`px-2 py-0.5 rounded border ${getPlatformBadgeColor(selectedArticle.platform)}`}>
                    {selectedArticle.platform}
                  </span>
                )}
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{selectedArticle.date}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {selectedArticle.title}
              </h3>

              {/* Cover Image in modal */}
              {selectedArticle.coverImage && (
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 mb-6">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Excerpt callout */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 text-xs sm:text-sm text-slate-300 italic border-l-4 border-l-emerald-500">
                "{selectedArticle.excerpt}"
              </div>

              {/* Full Content */}
              <div className="space-y-4 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </span>
                  {selectedArticle.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share & External Actions in Modal */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(selectedArticle, 'copy')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === selectedArticle.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Article</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleShare(selectedArticle, 'linkedin')}
                    className="px-2.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-mono transition-colors cursor-pointer"
                    title="Share on LinkedIn"
                  >
                    LinkedIn
                  </button>

                  <button
                    onClick={() => handleShare(selectedArticle, 'twitter')}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
                    title="Share on X"
                  >
                    X
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {(selectedArticle.externalUrl || selectedArticle.videoUrl) && (
                    <a
                      href={selectedArticle.externalUrl || selectedArticle.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
                    >
                      <span>Open on {selectedArticle.platform || 'Original Site'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    Close
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
