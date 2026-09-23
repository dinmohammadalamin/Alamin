import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { BookItem } from '../types';
import {
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
  Share2,
  Check,
  X,
  Bookmark,
  Award,
  Layers,
  ShoppingBag,
  Quote
} from 'lucide-react';

export const BooksSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const books = data.books || [];

  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [copiedBookId, setCopiedBookId] = useState<string | null>(null);
  const [activeShareBook, setActiveShareBook] = useState<BookItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedBook(null);
        setActiveShareBook(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when book modal is open
  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBook]);

  const handleShare = (book: BookItem, platform: 'copy' | 'linkedin' | 'twitter' | 'facebook' | 'whatsapp') => {
    const url = book.orderUrl || window.location.href;
    const title = `${book.bengaliTitle ? book.bengaliTitle + ' (' + book.title + ')' : book.title} by ${data.profile.name}`;
    const text = `Check out the published book "${title}" by ${data.profile.name} (${book.publisher}).`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${title} - ${url}`);
      setCopiedBookId(book.id);
      setTimeout(() => setCopiedBookId(null), 2500);
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

  return (
    <section id="books" className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950/90' : 'bg-slate-100/70'}`}>
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3.5 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>AUTHOR & LITERARY PUBLICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Published Books
          </h2>
          <p className="mt-3.5 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Exploring the confluence of poetry, existential philosophy, and reflective literary consciousness beyond the technical realm.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Books Display */}
        {books.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No published books added yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {books.map(book => (
              <div
                key={book.id}
                className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-teal-950/20 border border-teal-500/20 hover:border-teal-400/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Book Cover Visual with 3D-Style Presentation */}
                  <div className="lg:col-span-4 flex flex-col items-center">
                    <div className="relative group max-w-[280px] w-full">
                      {/* Glow Behind Book */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
                      
                      {/* Book Cover Frame */}
                      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-teal-500/40 shadow-2xl shadow-teal-950/60 transition-transform duration-300 group-hover:scale-[1.02]">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback book cover visual
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80';
                          }}
                        />

                        {/* Top Badge overlay */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-teal-500/40 text-teal-300 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                          <Award className="w-3.5 h-3.5 text-teal-400" />
                          <span>{book.publishedYear} Publication</span>
                        </div>

                        {/* Bengali Title overlay badge */}
                        {book.bengaliTitle && (
                          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-teal-950/85 backdrop-blur-md border border-teal-400/40 text-teal-200 text-xs font-bold shadow-lg">
                            {book.bengaliTitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Book Metadata Chips below cover */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center">
                      {book.language && (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                          {book.language}
                        </span>
                      )}
                      {book.pages && (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                          {book.pages}
                        </span>
                      )}
                      {book.price && (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                          {book.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Information & Literary Content */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Genre & Occasion Pills */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
                          {book.genre}
                        </span>
                        {book.bookFair && (
                          <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                            {book.bookFair}
                          </span>
                        )}
                      </div>

                      {/* Main Title & Bengali Title */}
                      <div className="space-y-1">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                          {book.title}
                          {book.bengaliTitle && (
                            <span className="ml-3 text-teal-400 font-normal">
                              ({book.bengaliTitle})
                            </span>
                          )}
                        </h3>
                        {book.subtitle && (
                          <p className="text-sm sm:text-base text-teal-200/80 font-serif italic">
                            {book.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Publisher & Specs */}
                      <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-mono">
                        <div>
                          <span className="text-slate-400">Publisher:</span>{' '}
                          <strong className="text-white font-semibold">{book.publisher}</strong>
                        </div>
                        {book.isbn && (
                          <div>
                            <span className="text-slate-400">ISBN:</span>{' '}
                            <span className="text-slate-200">{book.isbn}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-400">Author:</span>{' '}
                          <strong className="text-emerald-400 font-semibold">{data.profile.name}</strong>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                        {book.description}
                      </p>

                      {/* Poetic Excerpt Quote Box */}
                      {book.excerpt && (
                        <div className="mt-5 p-5 rounded-2xl bg-teal-950/30 border-l-4 border-l-teal-400 border border-teal-500/20 relative">
                          <Quote className="w-5 h-5 text-teal-400/40 absolute top-4 right-4" />
                          <div className="text-xs sm:text-sm text-teal-100 font-serif italic leading-relaxed whitespace-pre-line pr-6">
                            {book.excerpt}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Synopsis, Order/Buy, Share */}
                    <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-500/20 cursor-pointer flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Read Full Synopsis & Details</span>
                        </button>

                        {book.orderUrl && (
                          <a
                            href={book.orderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4 text-emerald-400" />
                            <span>Order / Buy Book</span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                        )}
                      </div>

                      {/* Share Controls */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveShareBook(activeShareBook?.id === book.id ? null : book)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          {copiedBookId === book.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Link Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-teal-400" />
                              <span>Share Book</span>
                            </>
                          )}
                        </button>

                        {/* Share Dropdown */}
                        {activeShareBook?.id === book.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-30 space-y-1">
                            <div className="text-[10px] font-mono text-slate-400 px-3 py-1 border-b border-slate-800 mb-1">
                              Share on Social Media
                            </div>
                            <button
                              onClick={() => {
                                handleShare(book, 'copy');
                                setActiveShareBook(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Copy Link</span>
                              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                            <button
                              onClick={() => {
                                handleShare(book, 'facebook');
                                setActiveShareBook(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Facebook</span>
                              <span className="text-[10px] text-blue-400 font-bold">FB</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(book, 'whatsapp');
                                setActiveShareBook(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>WhatsApp</span>
                              <span className="text-[10px] text-emerald-400 font-bold">WA</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(book, 'linkedin');
                                setActiveShareBook(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>LinkedIn</span>
                              <span className="text-[10px] text-sky-400 font-bold">IN</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare(book, 'twitter');
                                setActiveShareBook(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                            >
                              <span>Twitter / X</span>
                              <span className="text-[10px] text-slate-400 font-bold">X</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Book Reader / Synopsis Modal (Portaled to document.body) */}
        {selectedBook && typeof document !== 'undefined' && createPortal(
          <div
            id="book-details-modal"
            onClick={() => setSelectedBook(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-teal-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative cursor-default my-auto"
            >
              <button
                type="button"
                id="book-modal-close-btn"
                onClick={() => setSelectedBook(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer border border-slate-700 shadow-md"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-semibold">
                  {selectedBook.genre}
                </span>
                {selectedBook.bookFair && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                    {selectedBook.bookFair}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {selectedBook.title}
                {selectedBook.bengaliTitle && (
                  <span className="ml-2 text-teal-400 font-normal">({selectedBook.bengaliTitle})</span>
                )}
              </h3>

              {selectedBook.subtitle && (
                <p className="text-xs sm:text-sm text-teal-200/80 font-serif italic mb-6">
                  {selectedBook.subtitle}
                </p>
              )}

              {/* Book Overview Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">PUBLISHER</span>
                  <span className="text-white font-semibold">{selectedBook.publisher}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">YEAR</span>
                  <span className="text-white">{selectedBook.publishedYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ISBN</span>
                  <span className="text-white">{selectedBook.isbn || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">LANGUAGE</span>
                  <span className="text-emerald-400 font-semibold">{selectedBook.language || 'বাংলা'}</span>
                </div>
              </div>

              <div className="space-y-6 text-sm text-slate-200 leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider mb-2">
                    Book Synopsis & Author Note
                  </h4>
                  <p className="whitespace-pre-line text-slate-300 font-sans leading-relaxed">
                    {selectedBook.description}
                  </p>
                </div>

                {selectedBook.excerpt && (
                  <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/30 relative">
                    <Quote className="w-6 h-6 text-teal-400/30 absolute top-4 right-4" />
                    <h5 className="text-xs font-mono font-bold text-teal-300 mb-2">Featured Passage:</h5>
                    <div className="text-sm sm:text-base text-teal-100 font-serif italic whitespace-pre-line leading-relaxed">
                      {selectedBook.excerpt}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                {selectedBook.orderUrl ? (
                  <a
                    href={selectedBook.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-teal-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Purchase on Rokomari / Bookstore</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
