import React, { useState } from 'react';
import { MessageSquare, Send, UserCheck, ShieldCheck, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { conversations, sendMessage } = useData();

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-rose-500" />
          <span>Direct Messages</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Private, safe communication between accepted connections and Instant Connect partners.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900 min-h-[550px]">
        
        {/* Left: Conversations List */}
        <div className="md:col-span-4 border-r border-slate-100 dark:border-slate-800 p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Chats ({conversations.length})
          </div>

          <div className="space-y-1.5">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`flex w-full items-center gap-3 p-2.5 rounded-2xl text-left transition-colors ${
                  conv.id === activeConv?.id
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium'
                    : 'hover:bg-slate-50 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="relative">
                  <img src={conv.participant.avatarUrl} alt={conv.participant.displayName} className="h-10 w-10 rounded-full object-cover" />
                  {conv.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{conv.participant.displayName}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Chat Window */}
        <div className="md:col-span-8 flex flex-col justify-between h-[550px]">
          
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={activeConv.participant.avatarUrl} alt={activeConv.participant.displayName} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{activeConv.participant.displayName}</h3>
                    <p className="text-[10px] text-slate-400">@{activeConv.participant.username} • Verified Connection</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[10px] font-bold">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Connection Verified</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {activeConv.messages.map(m => {
                  const isMe = m.senderId === currentUser.id;
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs sm:max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-rose-500 text-white rounded-br-sm'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-bl-sm'
                      }`}>
                        {m.body}
                        <div className={`text-[9px] mt-1 ${isMe ? 'text-rose-100' : 'text-slate-400'}`}>
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${activeConv.participant.displayName}...`}
                  className="flex-1 h-10 px-4 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-rose-500 text-white disabled:opacity-40 hover:bg-rose-600 active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <MessageSquare className="h-10 w-10 text-slate-300 mb-2" />
              <p className="text-xs text-slate-500">Select a conversation or connect via Instant Connect to start chatting.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
