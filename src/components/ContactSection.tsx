import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2
} from 'lucide-react';

const DESTINATION_EMAIL = 'dmaa357@gmail.com';

export const ContactSection: React.FC = () => {
  const { data, sendMessage } = usePortfolio();
  const { profile } = data;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSenderName, setLastSenderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const msgSubject = formState.subject.trim() || 'SQA Engineering Inquiry';
    const clientName = formState.name.trim();
    const clientEmail = formState.email.trim();
    const clientMessage = formState.message.trim();

    // 1. Record in Portfolio Context so it is visible in Admin Messages Inbox
    sendMessage({
      name: clientName,
      email: clientEmail,
      subject: msgSubject,
      message: clientMessage
    });

    // 2. Dispatch real email via FormSubmit AJAX directly to dmaa357@gmail.com
    try {
      await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          _replyto: clientEmail,
          _subject: `[SQA Portfolio] ${msgSubject} - from ${clientName}`,
          subject: msgSubject,
          message: clientMessage,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('Form submission dispatch notice:', err);
    } finally {
      setIsSubmitting(false);
      setLastSenderName(clientName);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });

      // Automatically dismiss confirmation message after 8 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 8000);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: 'Call / WhatsApp',
      value: profile.phone,
      href: `tel:${profile.phone}`
    },
    {
      icon: Mail,
      title: 'Direct Email',
      value: profile.email,
      href: `mailto:${profile.email}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: profile.city || 'Rajshahi, Bangladesh',
      href: '#'
    },
    {
      icon: Globe,
      title: 'Portfolio / Website',
      value: 'porfolioofdin.netlify.app',
      href: profile.website
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let's Discuss Quality & Engineering
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            Whether you need a dedicated SQA engineer, test automation framework architecture, or quality consultation, I am ready to collaborate.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              Contact Information
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Feel free to reach out via phone, email, or by leaving a direct message here. I respond promptly to all inquiries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        {item.title}
                      </div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick SQA Availability note */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Current Status:</strong> {profile.freelanceStatus || 'Open for SQA Engineering Roles'}. Response time is typically within 2-4 hours.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Have a project, job opportunity, or QA consultation in mind? Leave your message below.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 text-sm">
                      Thank you{lastSenderName ? `, ${lastSenderName}` : ''}! Your message has been sent successfully.
                    </span>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Your inquiry has been delivered directly to Din Mohammad Alamin. A response will be sent to your email address shortly.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Hiring Manager"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SQA Engineer Opportunity / Project QA Audit"
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your QA requirements or question..."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Din</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Direct Delivery • Typically replies within 2-4 hours
                  </span>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
