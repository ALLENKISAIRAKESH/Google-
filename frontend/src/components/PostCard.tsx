import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  CircleDot, 
  Users, 
  Lock, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Send, 
  ExternalLink,
  Trash2,
  Flag,
  Sparkles,
  Rocket,
  Heart
} from 'lucide-react';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { currentUser } = useAuth();
  const { reactToPost, addComment, deletePost, toggleBookmark, submitReport } = useData();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const isAuthor = currentUser.id === post.authorId;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
      setShowComments(true);
    }
  };

  const getAudienceBadge = () => {
    switch (post.audienceType) {
      case 'public':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <Globe className="h-3 w-3" /> Public
          </span>
        );
      case 'circles':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <CircleDot className="h-3 w-3" /> Circle: {post.circleName || 'My Circles'}
          </span>
        );
      case 'community':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Users className="h-3 w-3" /> {post.communityName || 'Community'}
          </span>
        );
      case 'private':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            <Lock className="h-3 w-3" /> Only Me
          </span>
        );
    }
  };

  return (
    <article className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800/80 dark:bg-slate-900">
      
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <Link to={`/profile/${post.author.username}`} className="flex items-center gap-3 group">
          <img
            src={post.author.avatarUrl}
            alt={post.author.displayName}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-rose-500/40 dark:ring-slate-800 transition-all"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 group-hover:text-rose-500 dark:text-white transition-colors">
                {post.author.displayName}
              </span>
              <span className="text-xs text-slate-400">@{post.author.username}</span>
            </div>
            {post.author.headline && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{post.author.headline}</p>
            )}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              {getAudienceBadge()}
            </div>
          </div>
        </Link>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          {showMenu && (
            <div 
              className="absolute right-0 mt-1 w-44 rounded-2xl bg-white p-1 shadow-lg ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-20"
              onClick={() => setShowMenu(false)}
            >
              <button
                onClick={() => toggleBookmark(post.id)}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Bookmark className="h-3.5 w-3.5 text-blue-500" />
                {post.isBookmarked ? 'Remove Bookmark' : 'Save to Collection'}
              </button>
              
              {isAuthor ? (
                <button
                  onClick={() => deletePost(post.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Post
                </button>
              ) : (
                <button
                  onClick={() => {
                    submitReport('post', post.id, post.body.slice(0, 50), 'Inappropriate content');
                    alert('Post reported for moderation review.');
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Report Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Body */}
      <div className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed mb-4">
        {post.body}
      </div>

      {/* Link Preview Card */}
      {post.linkPreview && (
        <a
          href={post.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 transition-colors"
        >
          {post.linkPreview.imageUrl && (
            <img
              src={post.linkPreview.imageUrl}
              alt={post.linkPreview.title}
              className="h-44 w-full object-cover"
            />
          )}
          <div className="p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-500 mb-1">
              <span>{post.linkPreview.domain}</span>
              <ExternalLink className="h-3 w-3" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
              {post.linkPreview.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
              {post.linkPreview.description}
            </p>
          </div>
        </a>
      )}

      {/* Reaction & Action Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/70">
        
        {/* Google+ Reactions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* +1 Reaction */}
          <button
            onClick={() => reactToPost(post.id, 'plusOne')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
              post.reactions.userReacted === 'plusOne'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/25'
                : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
            }`}
            title="+1 this post"
          >
            <span>+1</span>
            <span>{post.reactions.plusOne}</span>
          </button>

          {/* Heart */}
          <button
            onClick={() => reactToPost(post.id, 'heart')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-all active:scale-95 ${
              post.reactions.userReacted === 'heart'
                ? 'bg-rose-100 text-rose-600 font-bold dark:bg-rose-950 dark:text-rose-400'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            <span>{post.reactions.heart > 0 ? post.reactions.heart : ''}</span>
          </button>

          {/* Rocket */}
          <button
            onClick={() => reactToPost(post.id, 'rocket')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-all active:scale-95 ${
              post.reactions.userReacted === 'rocket'
                ? 'bg-amber-100 text-amber-700 font-bold dark:bg-amber-950 dark:text-amber-400'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>{post.reactions.rocket > 0 ? post.reactions.rocket : ''}</span>
          </button>
        </div>

        {/* Comment and Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </button>

          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-1.5 rounded-full transition-colors ${
              post.isBookmarked 
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' 
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Bookmark"
          >
            <Bookmark className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.origin);
              alert('Post link copied to clipboard!');
            }}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Comments Thread */}
      {showComments && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 space-y-3">
          
          {/* Comment Composer */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.displayName}
              className="h-8 w-8 rounded-full object-cover"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a constructive comment..."
              className="flex-1 h-9 px-3.5 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-rose-500 text-white disabled:opacity-40 hover:bg-rose-600 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Comment List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-2.5 pt-1">
              {post.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-2.5 dark:bg-slate-800/60 text-xs">
                  <img
                    src={c.author.avatarUrl}
                    alt={c.author.displayName}
                    className="h-7 w-7 rounded-full object-cover mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{c.author.displayName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[11px] text-slate-400 py-1">No comments yet. Start the conversation!</p>
          )}

        </div>
      )}

    </article>
  );
};
