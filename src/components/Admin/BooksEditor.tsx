import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BookItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  BookOpen,
  Calendar,
  Sparkles,
  ShoppingBag,
  Quote,
  Eye,
  ExternalLink
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const BooksEditor: React.FC = () => {
  const { data, addBook, updateBook, deleteBook } = usePortfolio();
  const books = data.books || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewModalBook, setPreviewModalBook] = useState<BookItem | null>(null);

  const [formState, setFormState] = useState<{
    title: string;
    bengaliTitle: string;
    subtitle: string;
    publisher: string;
    publishedYear: string;
    bookFair: string;
    coverImage: string;
    genre: string;
    pages: string;
    isbn: string;
    price: string;
    language: string;
    orderUrl: string;
    description: string;
    excerpt: string;
  }>({
    title: '',
    bengaliTitle: '',
    subtitle: '',
    publisher: 'Durbin Publication (দুর্বিন প্রকাশন)',
    publishedYear: '2025',
    bookFair: 'অমর একুশে বইমেলা ২০২৫ (Omor Ekushe Book Fair 2025)',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    genre: 'Poetry & Philosophy (সাহিত্য ও কাব্যগ্রন্থ)',
    pages: '112 Pages',
    isbn: '978-984-97210-4-2',
    price: '৳ ২৫০',
    language: 'বাংলা (Bangla)',
    orderUrl: 'https://rokomari.com',
    description: '',
    excerpt: ''
  });

  const resetForm = () => {
    setFormState({
      title: '',
      bengaliTitle: '',
      subtitle: '',
      publisher: 'Durbin Publication (দুর্বিন প্রকাশন)',
      publishedYear: '2025',
      bookFair: 'অমর একুশে বইমেলা ২০২৫ (Omor Ekushe Book Fair 2025)',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      genre: 'Poetry & Philosophy (সাহিত্য ও কাব্যগ্রন্থ)',
      pages: '112 Pages',
      isbn: '',
      price: '৳ ২৫০',
      language: 'বাংলা (Bangla)',
      orderUrl: '',
      description: '',
      excerpt: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (book: BookItem) => {
    setFormState({
      title: book.title,
      bengaliTitle: book.bengaliTitle || '',
      subtitle: book.subtitle || '',
      publisher: book.publisher,
      publishedYear: book.publishedYear,
      bookFair: book.bookFair || '',
      coverImage: book.coverImage,
      genre: book.genre,
      pages: book.pages || '',
      isbn: book.isbn || '',
      price: book.price || '',
      language: book.language || 'বাংলা',
      orderUrl: book.orderUrl || '',
      description: book.description,
      excerpt: book.excerpt || ''
    });
    setEditingId(book.id);
    setIsAdding(false);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingId) {
      updateBook(editingId, {
        title: formState.title.trim(),
        bengaliTitle: formState.bengaliTitle.trim() || undefined,
        subtitle: formState.subtitle.trim() || undefined,
        publisher: formState.publisher.trim() || 'Durbin Publication',
        publishedYear: formState.publishedYear.trim() || '2025',
        bookFair: formState.bookFair.trim() || undefined,
        coverImage: formState.coverImage.trim() || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
        genre: formState.genre.trim() || 'Poetry',
        pages: formState.pages.trim() || undefined,
        isbn: formState.isbn.trim() || undefined,
        price: formState.price.trim() || undefined,
        language: formState.language.trim() || 'বাংলা',
        orderUrl: formState.orderUrl.trim() || undefined,
        description: formState.description.trim(),
        excerpt: formState.excerpt.trim() || undefined
      });
      setEditingId(null);
    } else {
      addBook({
        title: formState.title.trim(),
        bengaliTitle: formState.bengaliTitle.trim() || undefined,
        subtitle: formState.subtitle.trim() || undefined,
        publisher: formState.publisher.trim() || 'Durbin Publication',
        publishedYear: formState.publishedYear.trim() || '2025',
        bookFair: formState.bookFair.trim() || undefined,
        coverImage: formState.coverImage.trim() || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
        genre: formState.genre.trim() || 'Poetry',
        pages: formState.pages.trim() || undefined,
        isbn: formState.isbn.trim() || undefined,
        price: formState.price.trim() || undefined,
        language: formState.language.trim() || 'বাংলা',
        orderUrl: formState.orderUrl.trim() || undefined,
        description: formState.description.trim(),
        excerpt: formState.excerpt.trim() || undefined
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
            <BookOpen className="w-5 h-5 text-teal-400" />
            <span>Published Books Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Manage your published books (such as “Ononto Parapar”), cover images, publisher details, and order links.
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-teal-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSaveSubmit} className="p-6 rounded-3xl bg-slate-950 border border-teal-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {editingId ? 'Edit Book Details' : 'Publish New Book'}
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
              <label className="block text-xs font-mono text-slate-400 mb-1">Book Title (English) *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                placeholder="e.g. Ononto Parapar"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Bengali Title (বাংলা শিরোনাম)</label>
              <input
                type="text"
                value={formState.bengaliTitle}
                onChange={e => setFormState({ ...formState, bengaliTitle: e.target.value })}
                placeholder="e.g. অনন্ত পারাপার"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Subtitle / Tagline</label>
              <input
                type="text"
                value={formState.subtitle}
                onChange={e => setFormState({ ...formState, subtitle: e.target.value })}
                placeholder="e.g. A journey into poetic consciousness & philosophy"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Publisher Name</label>
              <input
                type="text"
                value={formState.publisher}
                onChange={e => setFormState({ ...formState, publisher: e.target.value })}
                placeholder="e.g. Durbin Publication (দুর্বিন প্রকাশন)"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Publication Year</label>
              <input
                type="text"
                value={formState.publishedYear}
                onChange={e => setFormState({ ...formState, publishedYear: e.target.value })}
                placeholder="e.g. 2025"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Book Fair / Occasion</label>
              <input
                type="text"
                value={formState.bookFair}
                onChange={e => setFormState({ ...formState, bookFair: e.target.value })}
                placeholder="e.g. অমর একুশে বইমেলা ২০২৫"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Genre</label>
              <input
                type="text"
                value={formState.genre}
                onChange={e => setFormState({ ...formState, genre: e.target.value })}
                placeholder="e.g. Poetry & Philosophy"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Pages & Language</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formState.pages}
                  onChange={e => setFormState({ ...formState, pages: e.target.value })}
                  placeholder="e.g. 112 Pages"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={formState.language}
                  onChange={e => setFormState({ ...formState, language: e.target.value })}
                  placeholder="e.g. বাংলা"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">ISBN & Price</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formState.isbn}
                  onChange={e => setFormState({ ...formState, isbn: e.target.value })}
                  placeholder="ISBN"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={formState.price}
                  onChange={e => setFormState({ ...formState, price: e.target.value })}
                  placeholder="Price (৳ ২৫০)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Order / Buy URL (Rokomari, etc.)</label>
              <input
                type="text"
                value={formState.orderUrl}
                onChange={e => setFormState({ ...formState, orderUrl: e.target.value })}
                placeholder="https://www.rokomari.com/book/..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Book Cover Image Input */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Cover Image</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formState.coverImage}
                onChange={e => setFormState({ ...formState, coverImage: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mt-2">
              <ImageUploader
                label="Or Upload Cover Image (Drag & Drop or Click)"
                value={formState.coverImage}
                onChange={(url: string) => setFormState({ ...formState, coverImage: url })}
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Book Description / Synopsis *</label>
            <textarea
              rows={4}
              required
              value={formState.description}
              onChange={e => setFormState({ ...formState, description: e.target.value })}
              placeholder="Detailed overview of the book, theme, and author philosophy..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Featured Poetry Excerpt (কাব্যিক উদ্ধৃতি)</label>
            <textarea
              rows={3}
              value={formState.excerpt}
              onChange={e => setFormState({ ...formState, excerpt: e.target.value })}
              placeholder="“অনন্তের দিকে হেঁটে যাওয়া এক যাযাবর চেতনা...”"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-teal-500 font-serif"
            />
          </div>

          {/* Action Buttons */}
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
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
            >
              {editingId ? 'Save Book Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      )}

      {/* Existing Books List */}
      <div className="space-y-4">
        {books.map(book => (
          <div
            key={book.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-20 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">
                    {book.title}
                    {book.bengaliTitle && (
                      <span className="ml-1.5 text-teal-400 font-normal">({book.bengaliTitle})</span>
                    )}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {book.publishedYear}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  Publisher: <strong className="text-slate-200">{book.publisher}</strong>
                  {book.bookFair && <span> • {book.bookFair}</span>}
                </p>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 max-w-lg">
                  {book.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setPreviewModalBook(book)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 border border-slate-800 transition-colors"
                title="Preview Book"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStartEdit(book)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Edit Book"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to remove "${book.title}"?`)) {
                    deleteBook(book.id);
                  }
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                title="Delete Book"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewModalBook && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPreviewModalBook(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 mb-4">
              <img
                src={previewModalBook.coverImage}
                alt={previewModalBook.title}
                className="w-24 h-32 rounded-xl object-cover border border-teal-500/30 shrink-0"
              />
              <div>
                <h4 className="text-lg font-bold text-white">
                  {previewModalBook.title} ({previewModalBook.bengaliTitle})
                </h4>
                <p className="text-xs text-teal-300 font-mono mt-1">{previewModalBook.publisher} • {previewModalBook.publishedYear}</p>
                {previewModalBook.subtitle && (
                  <p className="text-xs text-slate-400 italic mt-1">{previewModalBook.subtitle}</p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-4">
              {previewModalBook.description}
            </div>

            {previewModalBook.excerpt && (
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs font-serif italic text-teal-200 mb-4 whitespace-pre-line">
                "{previewModalBook.excerpt}"
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewModalBook(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
