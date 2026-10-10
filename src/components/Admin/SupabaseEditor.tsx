import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  testSupabaseConnection,
  syncDataToSupabase,
  fetchDataFromSupabase,
  SUPABASE_SQL_SCHEMA,
  isSupabaseConfigured
} from '../../utils/supabaseClient';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  DownloadCloud,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Key,
  ShieldCheck,
  Code
} from 'lucide-react';

export const SupabaseEditor: React.FC = () => {
  const { data, importJSON } = usePortfolio();

  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [syncResult, setSyncResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  useEffect(() => {
    const config = getSupabaseConfig();
    setUrl(config.url);
    setAnonKey(config.anonKey);
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig({ url: url.trim(), anonKey: anonKey.trim() });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    saveSupabaseConfig({ url: url.trim(), anonKey: anonKey.trim() });
    setTesting(true);
    setTestResult(null);
    const res = await testSupabaseConnection();
    setTestResult(res);
    setTesting(false);
  };

  const handlePushData = async () => {
    setSyncing(true);
    setSyncResult(null);
    const res = await syncDataToSupabase(data);
    setSyncResult(res);
    setSyncing(false);
  };

  const handlePullData = async () => {
    if (!window.confirm('Are you sure you want to pull data from Supabase? This will replace your local state with Supabase cloud data.')) {
      return;
    }
    setPulling(true);
    setSyncResult(null);
    const res = await fetchDataFromSupabase();
    if (res.success && res.data) {
      importJSON(JSON.stringify(res.data));
      setSyncResult({ success: true, message: 'Portfolio data updated from Supabase successfully!' });
    } else {
      setSyncResult({ success: false, message: res.message });
    }
    setPulling(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Supabase Database Integration
                {configured ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                    Configured
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">
                    Not Configured
                  </span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Connect your PostgreSQL database hosted on Supabase to store contact messages and synchronize portfolio data across all devices.
              </p>
            </div>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
          >
            Supabase Dashboard
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Step by Step Guide (Bangla & English) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          কীভাবে কানেক্ট করবেন (Quick 3-Step Setup Guide):
        </h4>
        <ol className="text-xs sm:text-sm text-slate-300 space-y-2 list-decimal list-inside pl-1">
          <li>
            <strong className="text-white">API কী সংগ্রহ করুন:</strong>{' '}
            <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">supabase.com</a>-এ প্রজেক্ট খুলে <strong>Project Settings → API</strong> থেকে <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">Project URL</code> এবং <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">anon public key</code> কপি করুন।
          </li>
          <li>
            <strong className="text-white">এখানে কীগুলো সেভ করুন:</strong> নিচের ফর্মে URL ও Anon Key দিয়ে "Save Configuration" এবং "Test Connection" বাটনে চাপ দিন। (অথবা <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">.env</code> ফাইলে যুক্ত করুন)।
          </li>
          <li>
            <strong className="text-white">টেবিল তৈরি করুন:</strong> নিচের <strong>SQL Schema</strong> কোড কপি করে Supabase ড্যাশবোর্ডের <strong>SQL Editor</strong>-এ গিয়ে রান (Run) করুন।
          </li>
        </ol>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSaveConfig} className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan-400" />
          Credentials Configuration
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Supabase Project URL (VITE_SUPABASE_URL)
            </label>
            <input
              type="url"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Supabase Anon / Public Key (VITE_SUPABASE_ANON_KEY)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            {isSaved ? <Check className="w-4 h-4 text-white" /> : <Database className="w-4 h-4" />}
            {isSaved ? 'Saved Locally!' : 'Save Credentials'}
          </button>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing || !url || !anonKey}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin text-emerald-400' : ''}`} />
            {testing ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {/* Test Result Alert */}
        {testResult && (
          <div
            className={`p-3.5 rounded-lg text-xs sm:text-sm flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
            )}
            <div>
              <p className="font-semibold">{testResult.success ? 'Success' : 'Connection Failed'}</p>
              <p className="mt-0.5 text-xs opacity-90">{testResult.message}</p>
            </div>
          </div>
        )}
      </form>

      {/* Cloud Data Sync Actions */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-blue-400" />
          Cloud Synchronization Actions
        </h4>
        <p className="text-xs text-slate-400">
          Upload your current portfolio data (profile, projects, skills, articles, books) to Supabase so changes are permanently stored in PostgreSQL.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePushData}
            disabled={syncing || !configured}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <UploadCloud className={`w-4 h-4 ${syncing ? 'animate-bounce' : ''}`} />
            {syncing ? 'Uploading...' : 'Push Local Data to Supabase'}
          </button>

          <button
            type="button"
            onClick={handlePullData}
            disabled={pulling || !configured}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors flex items-center gap-2"
          >
            <DownloadCloud className={`w-4 h-4 ${pulling ? 'animate-bounce' : ''}`} />
            {pulling ? 'Pulling...' : 'Pull Data from Supabase'}
          </button>
        </div>

        {syncResult && (
          <div
            className={`p-3.5 rounded-lg text-xs sm:text-sm flex items-start gap-2.5 ${
              syncResult.success
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {syncResult.success ? (
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
            )}
            <span>{syncResult.message}</span>
          </div>
        )}
      </div>

      {/* SQL Schema Script Section */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            Supabase SQL Schema (Tables & Policies)
          </h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSql(!showSql)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {showSql ? 'Hide SQL' : 'View SQL'}
            </button>
            <button
              type="button"
              onClick={handleCopySql}
              className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSql ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Supabase ড্যাশবোর্ডে গিয়ে <strong>SQL Editor</strong>-এ নতুন কুয়েরি পেস্ট করে <code className="text-purple-300 bg-slate-800 px-1 py-0.5 rounded">Run</code> বাটনে ক্লিক করলেই টেবিল তৈরি হয়ে যাবে।
        </p>

        {showSql && (
          <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-60 leading-relaxed">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        )}
      </div>
    </div>
  );
};
