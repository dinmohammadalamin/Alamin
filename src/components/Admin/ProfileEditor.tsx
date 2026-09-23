import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProfileData } from '../../types';
import { Save, Check, RefreshCw } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [profile, setProfile] = useState<ProfileData>(data.profile);
  const [typingRolesInput, setTypingRolesInput] = useState(
    profile.typingRoles ? profile.typingRoles.join(', ') : ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRoles = typingRolesInput
      .split(',')
      .map(r => r.trim())
      .filter(Boolean);

    const newProfile: ProfileData = {
      ...profile,
      typingRoles: updatedRoles.length > 0 ? updatedRoles : profile.typingRoles
    };

    updateProfile(newProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Changes Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile updated successfully! Live portfolio reflects all changes immediately.</span>
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
          label="Profile Picture / Avatar"
          description="Upload a photo from your computer or phone (PNG, JPG, WebP), or paste an online URL."
          maxDimension={500}
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
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>
    </form>
  );
};
