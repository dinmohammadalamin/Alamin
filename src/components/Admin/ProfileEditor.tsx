import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProfileData } from '../../types';
import { Save, Check, RefreshCw, AlertCircle, Database, Cloud } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ProfileEditor: React.FC = () => {
  const { data, updateProfile, cloudSyncStatus, cloudSyncError, lastCloudSyncTime, syncNow } = usePortfolio();
  const [profile, setProfile] = useState<ProfileData>(data.profile);
  const [typingRolesInput, setTypingRolesInput] = useState(
    profile.typingRoles ? profile.typingRoles.join(', ') : ''
  );
  const [saving, setSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{
    success: boolean;
    cloudSynced: boolean;
    message: string;
  } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveFeedback(null);

    const updatedRoles = typingRolesInput
      .split(',')
      .map(r => r.trim())
      .filter(Boolean);

    const newProfile: ProfileData = {
      ...profile,
      typingRoles: updatedRoles.length > 0 ? updatedRoles : profile.typingRoles
    };

    // 1. Update in local state
    updateProfile(newProfile);

    // 2. Trigger instant cloud sync
    const syncRes = await syncNow();

    if (syncRes.success) {
      setSaveFeedback({
        success: true,
        cloudSynced: true,
        message: 'প্রোফাইল সফলভাবে আপডেট হয়েছে এবং Supabase Cloud-এ সেভ হয়েছে! অন্য ব্রাউজারেও এখন আপডেট দেখাবে।'
      });
    } else if (cloudSyncStatus === 'not_configured') {
      setSaveFeedback({
        success: true,
        cloudSynced: false,
        message: 'প্রোফাইল এই ব্রাউজারে সেভ হয়েছে। অন্য ব্রাউজারে স্বয়ংক্রিয়ভাবে আপডেট দেখতে Supabase Sync ট্যাবে গিয়ে Supabase কানেক্ট করুন।'
      });
    } else {
      setSaveFeedback({
        success: true,
        cloudSynced: false,
        message: `প্রোফাইল লোকালি সেভ হয়েছে, কিন্তু Supabase Cloud-এ সেভ হতে পারেনি: ${syncRes.message} (দয়া করে Supabase Sync ট্যাবে গিয়ে SQL রান করুন)।`
      });
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Edit Profile & Hero Data</h3>
          <p className="text-xs text-slate-400">
            Update your professional branding, contact info, and animated titles.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : saveFeedback?.success ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>
            {saving
              ? 'Saving & Syncing...'
              : saveFeedback?.success
              ? 'Changes Saved!'
              : 'Save Changes'}
          </span>
        </button>
      </div>

      {saveFeedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
            saveFeedback.cloudSynced
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}
        >
          {saveFeedback.cloudSynced ? (
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
          )}
          <div className="flex-1">
            <p className="font-semibold">
              {saveFeedback.cloudSynced ? 'Cloud Synced Successfully' : 'Local Save Only'}
            </p>
            <p className="mt-0.5 text-[11px] opacity-90 leading-relaxed">
              {saveFeedback.message}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-slate-300 font-mono mb-1">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">Location / City</label>
          <input
            type="text"
            value={profile.city}
            onChange={e => setProfile({ ...profile, city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">Phone Number</label>
          <input
            type="text"
            value={profile.phone}
            onChange={e => setProfile({ ...profile, phone: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">Birthday</label>
          <input
            type="text"
            value={profile.birthday}
            onChange={e => setProfile({ ...profile, birthday: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">Availability Status</label>
          <input
            type="text"
            value={profile.freelanceStatus}
            onChange={e => setProfile({ ...profile, freelanceStatus: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">GitHub Profile URL</label>
          <input
            type="text"
            value={profile.githubUrl}
            onChange={e => setProfile({ ...profile, githubUrl: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-mono mb-1">LinkedIn URL</label>
          <input
            type="text"
            value={profile.linkedinUrl}
            onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-300 font-mono text-xs mb-1">
          Dynamic Typing Roles in Hero (Comma separated)
        </label>
        <input
          type="text"
          value={typingRolesInput}
          onChange={e => setTypingRolesInput(e.target.value)}
          placeholder="SQA Engineer, Test Automation Specialist, API Tester, Bug Hunter"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          These phrases dynamically type out on the hero section banner.
        </p>
      </div>

      {/* Profile Picture Upload or URL */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
        <ImageUploader
          value={profile.avatarUrl}
          onChange={url => setProfile({ ...profile, avatarUrl: url })}
          label="Profile Picture / Avatar (Ultra HD Sharpness)"
          description="Upload high-res photo (PNG, JPG, WebP) or paste an image URL. Crystal-clear 1400px HD resolution."
          maxDimension={1400}
        />
      </div>

      <div>
        <label className="block text-slate-300 font-mono text-xs mb-1">Hero Tagline</label>
        <textarea
          rows={2}
          value={profile.tagline}
          onChange={e => setProfile({ ...profile, tagline: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-slate-300 font-mono text-xs mb-1">Full About Narrative</label>
        <textarea
          rows={4}
          value={profile.aboutLong}
          onChange={e => setProfile({ ...profile, aboutLong: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex justify-end pt-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving & Syncing...' : 'Save Profile Changes'}</span>
        </button>
      </div>
    </form>
  );
};
