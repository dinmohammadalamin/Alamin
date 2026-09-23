import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Download,
  Upload,
  RotateCcw,
  KeyRound,
  Check,
  AlertCircle,
  ShieldAlert,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const SettingsBackup: React.FC = () => {
  const { data, updateAdminPassword, resetToDefault, exportJSON, importJSON } = usePortfolio();

  const activePassword = data.adminPassword || data.adminPin || '1234';

  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showActivePasswordPeek, setShowActivePasswordPeek] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; msg?: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const handleCopyJSON = () => {
    const json = exportJSON();
    navigator.clipboard.writeText(json);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (currentPasswordInput.trim() !== activePassword.trim()) {
      setPasswordError('Current password does not match. Please verify your current password.');
      return;
    }

    if (newPasswordInput.trim().length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    if (newPasswordInput.trim() !== confirmPasswordInput.trim()) {
      setPasswordError('New password and confirmation password do not match.');
      return;
    }

    updateAdminPassword(newPasswordInput.trim());
    setPasswordSuccess('Admin password updated successfully! The new password is now active dynamically.');
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setTimeout(() => setPasswordSuccess(''), 5000);
  };

  const handleResetPasswordToDefault = () => {
    if (window.confirm('Are you sure you want to reset the admin password to default "1234"?')) {
      updateAdminPassword('1234');
      setPasswordError('');
      setPasswordSuccess('Admin password has been reset to default "1234".');
      setTimeout(() => setPasswordSuccess(''), 4000);
    }
  };

  const handleDownloadBackup = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `din-mohammad-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonInput.trim()) return;

    const res = importJSON(jsonInput.trim());
    if (res.success) {
      setImportStatus({ success: true, msg: 'Portfolio dataset imported and synced successfully!' });
      setJsonInput('');
    } else {
      setImportStatus({ success: false, msg: res.error || 'Failed to import JSON' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importJSON(content);
        if (res.success) {
          setImportStatus({ success: true, msg: 'File backup imported successfully!' });
        } else {
          setImportStatus({ success: false, msg: res.error || 'Invalid file format' });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">System, Security & Data Backup</h3>
        <p className="text-xs text-slate-400">
          Export your portfolio database, import backups, manage your security PIN, or reset to initial defaults.
        </p>
      </div>

      {/* Dynamic Admin Password Settings */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-400">
            <KeyRound className="w-4 h-4" />
            <span>Dynamic Admin Password Management</span>
          </div>

          {/* Current Active Password status pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Active Password:</span>
            <span className="font-bold text-white tracking-wider">
              {showActivePasswordPeek ? activePassword : '••••••••'}
            </span>
            <button
              type="button"
              onClick={() => setShowActivePasswordPeek(prev => !prev)}
              className="text-slate-400 hover:text-emerald-400 p-0.5 ml-1 transition-colors cursor-pointer"
              title={showActivePasswordPeek ? 'Hide active password' : 'Peek active password'}
            >
              {showActivePasswordPeek ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Configure a dynamic, secure custom password for your admin control panel. You can use any combination of letters, numbers, and symbols. The default initial password is <strong className="text-slate-200">1234</strong>.
        </p>

        {passwordSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPasswordInput}
                  onChange={e => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(prev => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPasswordInput}
                  onChange={e => setNewPasswordInput(e.target.value)}
                  placeholder="Min 4 characters"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(prev => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">Confirm New</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPasswordInput}
                  onChange={e => setConfirmPasswordInput(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Update Admin Password</span>
            </button>

            {activePassword !== '1234' && (
              <button
                type="button"
                onClick={handleResetPasswordToDefault}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset to Default (1234)</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Backup & Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white mb-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Full Database (For Netlify & Backups)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export your entire portfolio data (custom profile, all uploaded images, SQA projects, skills, articles, book details, and gallery items).
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleCopyJSON}
              type="button"
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                copiedJson
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              <Check className={`w-4 h-4 ${copiedJson ? 'block' : 'hidden'}`} />
              {!copiedJson && <Sparkles className="w-4 h-4" />}
              <span>{copiedJson ? 'Copied to Clipboard! (কপি সম্পন্ন)' : 'Copy Full JSON to Clipboard'}</span>
            </button>

            <button
              onClick={handleDownloadBackup}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download .json File</span>
            </button>

            <button
              type="button"
              onClick={() => setShowJsonPreview(!showJsonPreview)}
              className="w-full text-center text-[11px] text-slate-500 hover:text-slate-400 underline pt-1 cursor-pointer"
            >
              {showJsonPreview ? 'Hide Raw JSON' : 'Show / View Raw JSON'}
            </button>
          </div>

          {showJsonPreview && (
            <div className="mt-3">
              <textarea
                readOnly
                value={exportJSON()}
                rows={6}
                onClick={e => (e.target as HTMLTextAreaElement).select()}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] font-mono text-emerald-400 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500">Click inside to select all, then press Ctrl+C to copy.</span>
            </div>
          )}
        </div>

        {/* Import Card */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white mb-2">
              <Upload className="w-4 h-4 text-teal-400" />
              <span>Restore from Backup File</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload a previous JSON backup file to overwrite and restore your entire portfolio state instantly.
            </p>
          </div>

          <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold text-xs cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>Select .JSON Backup File</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className={`p-4 rounded-2xl border text-xs flex items-center gap-2 ${
          importStatus.success
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {importStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{importStatus.msg}</span>
        </div>
      )}

      {/* Danger Zone: Reset Defaults */}
      <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
          <ShieldAlert className="w-4 h-4" />
          <span>Danger Zone: Re-seed Initial Default Data</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Reset all current data back to Din Mohammad Al Amin's original curated SQA portfolio dataset. This action is irreversible unless you exported a backup.
        </p>

        {resetSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Portfolio data has been restored to default!</span>
          </div>
        )}

        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All to Default SQA Data</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 space-y-3">
            <p className="text-xs font-bold text-red-300">
              Are you sure? All custom modifications will be replaced with initial default data.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetToDefault();
                  setShowResetConfirm(false);
                  setResetSuccess(true);
                  setTimeout(() => setResetSuccess(false), 4000);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
