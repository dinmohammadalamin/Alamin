import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactSectionData, ContactInfoItem } from '../../types';
import { INITIAL_PORTFOLIO_DATA } from '../../data/initialData';
import {
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageSquare,
  Clock,
  Send,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ContactEditor: React.FC = () => {
  const { data, updateContact, cloudSyncStatus, syncNow } = usePortfolio();

  const initialContact: ContactSectionData = data.contact || INITIAL_PORTFOLIO_DATA.contact || {
    badge: 'GET IN TOUCH',
    title: "Let's Discuss Quality & Engineering",
    subtitle: 'Whether you need a dedicated SQA engineer, test automation framework architecture, or quality consultation, I am ready to collaborate.',
    cardTitle: 'Contact Information',
    cardSubtitle: 'Feel free to reach out via phone, email, or by leaving a direct message here. I respond promptly to all inquiries.',
    phone: data.profile.phone || '+8801869309950',
    phoneTitle: 'Call / WhatsApp',
    email: data.profile.email || 'dmaa357@gmail.com',
    emailTitle: 'Direct Email',
    location: data.profile.city || 'Rajshahi, Bangladesh',
    locationTitle: 'Location',
    website: data.profile.website || 'https://github.com/dinmohammadalamin',
    websiteDisplay: 'porfolioofdin.netlify.app',
    websiteTitle: 'Portfolio / Website',
    availabilityNote: data.profile.freelanceStatus || 'Open for SQA Engineering Roles. Response time is typically within 2-4 hours.',
    formTitle: 'Send a Direct Message',
    formSubtitle: 'Have a project, job opportunity, or QA consultation in mind? Leave your message below.',
    destinationEmail: data.profile.email || 'dmaa357@gmail.com',
    customItems: []
  };

  const [formState, setFormState] = useState<ContactSectionData>(initialContact);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // New Custom Contact Item State
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newCustomTitle, setNewCustomTitle] = useState('');
  const [newCustomValue, setNewCustomValue] = useState('');
  const [newCustomHref, setNewCustomHref] = useState('');
  const [newCustomType, setNewCustomType] = useState<ContactInfoItem['type']>('whatsapp');

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const res = await updateContact(formState);
    setSaving(false);

    if (res && res.success) {
      setFeedback({
        type: 'success',
        message: 'Contact তথ্য সফলভাবে আপডেট হয়েছে এবং Supabase Cloud-এ সেভ করা হয়েছে!'
      });
    } else {
      setFeedback({
        type: 'error',
        message: `লোকালি সেভ হয়েছে, কিন্তু ক্লাউড সিঙ্ক সমস্যা: ${res?.message || 'Unknown error'}`
      });
    }
  };

  const handleAddCustomItem = () => {
    if (!newCustomTitle.trim() || !newCustomValue.trim()) return;
    const newItem: ContactInfoItem = {
      id: `ci-${Date.now()}`,
      type: newCustomType,
      title: newCustomTitle.trim(),
      value: newCustomValue.trim(),
      href: newCustomHref.trim() || undefined
    };
    setFormState({
      ...formState,
      customItems: [...(formState.customItems || []), newItem]
    });
    setNewCustomTitle('');
    setNewCustomValue('');
    setNewCustomHref('');
    setShowAddCustom(false);
  };

  const handleRemoveCustomItem = (id: string) => {
    setFormState({
      ...formState,
      customItems: (formState.customItems || []).filter(item => item.id !== id)
    });
  };

  const handleReset = () => {
    if (window.confirm('আপনি কি Contact ইনফরমেশনের ডিফল্ট তথ্যে ফিরিয়ে নিতে চান?')) {
      if (INITIAL_PORTFOLIO_DATA.contact) {
        setFormState(INITIAL_PORTFOLIO_DATA.contact);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" />
              <span>Contact Information Control</span>
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live & Cloud Synced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Update your phone, email, location, website, form notification address, and contact page text.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Reset Default
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save & Sync'}</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl flex items-center justify-between text-xs font-medium border ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Section 1: Section Headings & Intro */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/80">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Section Headings & Descriptions</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">Section Badge Tag</label>
            <input
              type="text"
              value={formState.badge}
              onChange={e => setFormState({ ...formState, badge: e.target.value })}
              placeholder="e.g. GET IN TOUCH"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Main Heading Title</label>
            <input
              type="text"
              value={formState.title}
              onChange={e => setFormState({ ...formState, title: e.target.value })}
              placeholder="e.g. Let's Discuss Quality & Engineering"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-mono mb-1">Section Subtitle / Description</label>
            <textarea
              rows={2}
              value={formState.subtitle}
              onChange={e => setFormState({ ...formState, subtitle: e.target.value })}
              placeholder="Introductory text describing your availability..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Methods & Channels */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/80">
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Direct Contact Channels</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Phone */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Phone className="w-4 h-4" />
              <span>Phone / WhatsApp Channel</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Label / Title</label>
              <input
                type="text"
                value={formState.phoneTitle || 'Call / WhatsApp'}
                onChange={e => setFormState({ ...formState, phoneTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Phone Number *</label>
              <input
                type="text"
                value={formState.phone}
                onChange={e => setFormState({ ...formState, phone: e.target.value })}
                placeholder="e.g. +8801869309950"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Mail className="w-4 h-4" />
              <span>Email Channel</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Label / Title</label>
              <input
                type="text"
                value={formState.emailTitle || 'Direct Email'}
                onChange={e => setFormState({ ...formState, emailTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Email Address *</label>
              <input
                type="email"
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                placeholder="e.g. dmaa357@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Location / City</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Label / Title</label>
              <input
                type="text"
                value={formState.locationTitle || 'Location'}
                onChange={e => setFormState({ ...formState, locationTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">City / Address *</label>
              <input
                type="text"
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
                placeholder="e.g. Rajshahi, Bangladesh"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Website */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Globe className="w-4 h-4" />
              <span>Portfolio / Web Link</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Display Text</label>
              <input
                type="text"
                value={formState.websiteDisplay || 'porfolioofdin.netlify.app'}
                onChange={e => setFormState({ ...formState, websiteDisplay: e.target.value })}
                placeholder="e.g. porfolioofdin.netlify.app"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Target URL</label>
              <input
                type="text"
                value={formState.website}
                onChange={e => setFormState({ ...formState, website: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Availability Note */}
          <div className="md:col-span-2 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Availability Banner & Response Time Notice</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Notice Text (Shows in green card on contact section)</label>
              <input
                type="text"
                value={formState.availabilityNote}
                onChange={e => setFormState({ ...formState, availabilityNote: e.target.value })}
                placeholder="e.g. Available for Full-time & Remote SQA Roles. Response time is typically within 2-4 hours."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Contact Form & Destination Email */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/80">
          <Send className="w-4 h-4 text-emerald-400" />
          <span>Interactive Message Form Configuration</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">Form Heading</label>
            <input
              type="text"
              value={formState.formTitle}
              onChange={e => setFormState({ ...formState, formTitle: e.target.value })}
              placeholder="e.g. Send a Direct Message"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">
              Destination Email (Where messages are sent) *
            </label>
            <input
              type="email"
              required
              value={formState.destinationEmail}
              onChange={e => setFormState({ ...formState, destinationEmail: e.target.value })}
              placeholder="e.g. dmaa357@gmail.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Form submissions are routed to this email address via FormSubmit AJAX.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-mono mb-1">Form Subtitle / Instructions</label>
            <input
              type="text"
              value={formState.formSubtitle}
              onChange={e => setFormState({ ...formState, formSubtitle: e.target.value })}
              placeholder="e.g. Have a project, job opportunity, or QA consultation in mind? Leave your message below."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Custom / Extra Channels */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Additional Contact Channels (Optional)</span>
          </h4>
          <button
            type="button"
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-400 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Channel</span>
          </button>
        </div>

        {/* Add custom channel form */}
        {showAddCustom && (
          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Add Extra Channel</span>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Title (e.g. Telegram / Skype)</label>
                <input
                  type="text"
                  value={newCustomTitle}
                  onChange={e => setNewCustomTitle(e.target.value)}
                  placeholder="e.g. Telegram"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Value / Handle (e.g. @username)</label>
                <input
                  type="text"
                  value={newCustomValue}
                  onChange={e => setNewCustomValue(e.target.value)}
                  placeholder="e.g. @dinmohammad"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Link URL (Optional)</label>
                <input
                  type="text"
                  value={newCustomHref}
                  onChange={e => setNewCustomHref(e.target.value)}
                  placeholder="https://t.me/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCustomItem}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Add Channel
              </button>
            </div>
          </div>
        )}

        {/* Existing custom channels */}
        {formState.customItems && formState.customItems.length > 0 ? (
          <div className="space-y-2">
            {formState.customItems.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-emerald-400 mr-2">{item.title}:</span>
                  <span className="text-white font-mono">{item.value}</span>
                  {item.href && (
                    <span className="text-slate-500 ml-2 text-[11px] font-mono">({item.href})</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCustomItem(item.id)}
                  className="p-1 rounded bg-slate-950 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No extra custom channels added.</p>
        )}
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving & Syncing...' : 'Save All Changes'}</span>
        </button>
      </div>
    </div>
  );
};
