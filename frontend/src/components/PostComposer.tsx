import React, { useState } from 'react';
import { 
  Globe, 
  CircleDot, 
  Users, 
  Lock, 
  Send, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  HelpCircle, 
  Rocket, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { AudienceType, PostType } from '../types';

export const PostComposer: React.FC<{ onClose?: () => void; defaultCommunityId?: string }> = ({
  onClose,
  defaultCommunityId
}) => {
  const { currentUser } = useAuth();
  const { createPost, communities } = useData();

  const [body, setBody] = useState('');
  const [postType, setPostType] = useState<PostType>('text');
  const [audienceType, setAudienceType] = useState<AudienceType>(defaultCommunityId ? 'community' : 'public');
  const [selectedCircleId, setSelectedCircleId] = useState<string>(currentUser.circles?.[0]?.id || '');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>(defaultCommunityId || communities[0]?.id || '');
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    const circle = currentUser.circles?.find(c => c.id === selectedCircleId);
    const comm = communities.find(c => c.id === selectedCommunityId);

    createPost({
      body: body.trim(),
      type: postType,
      audienceType,
      circleId: audienceType === 'circles' ? selectedCircleId : undefined,
      circleName: audienceType === 'circles' ? circle?.name : undefined,
      communityId: audienceType === 'community' ? selectedCommunityId : undefined,
      communityName: audienceType === 'community' ? comm?.name : undefined,
      linkUrl: linkUrl.trim() || undefined,
      mediaUrls: imageUrl.trim() ? [imageUrl.trim()] : undefined
    });

    setBody('');
    setLinkUrl('');
    setImageUrl('');
    if (onClose) onClose();
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 mb-6">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.displayName}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Share what you're building</h3>
            <p className="text-[10px] text-slate-400">Target your audience with Google+ Circles</p>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Main Textarea */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`What's on your mind, ${currentUser.displayName.split(' ')[0]}? Share an update, code snippet, or question...`}
          rows={3}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-500 transition-all"
        />

        {/* Optional Link Input */}
        {showLinkInput && (
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
            <LinkIcon className="h-3.5 w-3.5 text-rose-500" />
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://github.com/... or article URL"
              className="flex-1 bg-transparent text-xs text-slate-900 focus:outline-none dark:text-slate-100"
            />
            <button type="button" onClick={() => setShowLinkInput(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Optional Image URL Input */}
        {showImageInput && (
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
            <ImageIcon className="h-3.5 w-3.5 text-blue-500" />
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... (Image URL)"
              className="flex-1 bg-transparent text-xs text-slate-900 focus:outline-none dark:text-slate-100"
            />
            <button type="button" onClick={() => setShowImageInput(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Audience Selector & Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800/80">
          
          {/* Audience Dropdowns */}
          <div className="flex items-center gap-2">
            <select
              value={audienceType}
              onChange={(e) => setAudienceType(e.target.value as AudienceType)}
              className="h-8 rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-700 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="public">🌐 Public (All)</option>
              <option value="circles">⭕ My Circles</option>
              <option value="community">👥 Community</option>
              <option value="private">🔒 Only Me (Private)</option>
            </select>

            {/* Sub-selector if Circles */}
            {audienceType === 'circles' && currentUser.circles && currentUser.circles.length > 0 && (
              <select
                value={selectedCircleId}
                onChange={(e) => setSelectedCircleId(e.target.value)}
                className="h-8 rounded-full border border-rose-200 bg-rose-50/70 px-3 text-[11px] font-semibold text-rose-700 focus:outline-none dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
              >
                {currentUser.circles.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}

            {/* Sub-selector if Community */}
            {audienceType === 'community' && (
              <select
                value={selectedCommunityId}
                onChange={(e) => setSelectedCommunityId(e.target.value)}
                className="h-8 rounded-full border border-blue-200 bg-blue-50/70 px-3 text-[11px] font-semibold text-blue-700 focus:outline-none dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
              >
                {communities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Type toggles & Submit */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 ${showLinkInput ? 'text-rose-500 bg-rose-50' : ''}`}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 ${showImageInput ? 'text-blue-500 bg-blue-50' : ''}`}
              title="Add Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            <button
              type="submit"
              disabled={!body.trim()}
              className="flex items-center gap-1.5 h-8 px-4 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-bold shadow-sm shadow-rose-500/25 active:scale-95 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
