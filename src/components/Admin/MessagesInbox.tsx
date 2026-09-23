import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Trash2, CheckCircle2, Clock, Reply, User, MessageSquare } from 'lucide-react';

export const MessagesInbox: React.FC = () => {
  const { data, markMessageRead, deleteMessage } = usePortfolio();
  const { messages } = data;

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    messages.length > 0 ? messages[0].id : null
  );

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  const handleSelect = (id: string) => {
    setSelectedMessageId(id);
    markMessageRead(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Visitor Inquiries & Contact Messages</span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time messages submitted by visitors, recruiters, and clients through your portfolio contact form.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
          {messages.filter(m => !m.read).length} Unread / {messages.length} Total
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
          No inquiries received yet. When visitors fill out the Contact form, their inquiries will appear here!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Messages list */}
          <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedMessageId === msg.id
                    ? 'bg-slate-900 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white truncate max-w-[140px] flex items-center gap-1.5">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    )}
                    {msg.name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {msg.createdAt}
                  </span>
                </div>

                <div className="text-xs font-semibold text-emerald-400 truncate">
                  {msg.subject || 'No Subject'}
                </div>

                <p className="text-[11px] text-slate-400 truncate mt-1">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {/* Message Reader */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {selectedMessage.subject || 'Portfolio Inquiry'}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="text-slate-200 font-semibold">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                      <span>•</span>
                      <span className="font-mono text-[11px]">{selectedMessage.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                      className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                      title="Reply via email"
                    >
                      <Reply className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        deleteMessage(selectedMessage.id);
                        setSelectedMessageId(null);
                      }}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors border border-slate-800"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 min-h-[140px]">
                  {selectedMessage.message}
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'SQA Inquiry')}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply to {selectedMessage.name}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center rounded-3xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                Select an inquiry from the left to read full details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
