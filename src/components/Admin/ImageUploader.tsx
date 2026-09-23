import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  maxDimension?: number;
}

/**
 * Resizes and compresses an image client-side to fit nicely into local state
 * without overflowing localStorage quotas.
 */
function compressImage(file: File, maxDim: number = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as JPEG
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Profile Picture / Avatar',
  description = 'Upload from your device (PNG, JPG, WebP) or paste an image URL.',
  maxDimension = 500
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, JPEG, WebP, GIF).');
      return;
    }

    // Check size limit: max 15MB input (will be compressed down to ~40KB)
    if (file.size > 15 * 1024 * 1024) {
      setError('Selected image is too large (over 15MB). Please select a smaller photo.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const compressedDataUrl = await compressImage(file, maxDimension);
      setFileName(file.name);
      onChange(compressedDataUrl);
    } catch (err: any) {
      setError(err?.message || 'Error processing photo. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter an image URL.');
      return;
    }
    setError(null);
    setFileName(null);
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <label className="block text-slate-200 font-mono text-xs font-semibold">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-slate-400">{description}</p>
          )}
        </div>

        {/* Upload Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              mode === 'upload'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              mode === 'url'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Box & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
        
        {/* Active Avatar Preview Card */}
        <div className="md:col-span-1 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center relative group">
          {value ? (
            <>
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg relative bg-slate-900">
                <img
                  src={value}
                  alt="Profile Avatar Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>{fileName ? 'Uploaded Photo' : 'Image Active'}</span>
              </div>
              {fileName && (
                <span className="text-[10px] text-slate-400 truncate max-w-[120px] block mt-0.5">
                  {fileName}
                </span>
              )}
              <button
                type="button"
                onClick={handleClear}
                className="mt-2 text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-slate-500">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-800 flex items-center justify-center mb-2">
                <ImageIcon className="w-6 h-6 text-slate-600" />
              </div>
              <span className="text-xs text-slate-400">No Image Set</span>
              <span className="text-[10px] text-slate-600">Default avatar will show</span>
            </div>
          )}
        </div>

        {/* Input Zone (Upload / Drag & Drop or URL) */}
        <div className="md:col-span-3">
          {mode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`h-full min-h-[140px] rounded-2xl border-2 border-dashed transition-all p-5 flex flex-col items-center justify-center text-center cursor-pointer ${
                isDragging
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[0.99]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>

              <div className="text-xs font-semibold text-slate-200">
                {isProcessing ? (
                  <span>Optimizing photo...</span>
                ) : isDragging ? (
                  <span className="text-emerald-400 font-bold">Drop photo here to upload</span>
                ) : (
                  <span>Click to select photo or drag and drop here</span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 mt-1">
                Supports PNG, JPG, JPEG, WebP. Automatically resized & optimized for fast loading.
              </p>
            </div>
          ) : (
            <div className="h-full min-h-[140px] rounded-2xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-center space-y-3">
              <label className="block text-xs font-mono text-slate-300">
                Paste direct Image URL (e.g., hosted on GitHub, Imgur, or Cloudinary):
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleUrlSubmit();
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Apply URL
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Tip: If your image is saved on Google Drive, GitHub, or LinkedIn, make sure the link is publicly accessible.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
