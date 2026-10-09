import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Sparkles, 
  Flame, 
  Code2, 
  X,
  Upload,
  Send
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Reel } from '../types';

export const ReelsPage: React.FC = () => {
  const { reels, likeReel, createReel } = useData();
  const { currentUser } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'ai' | 'design'>('all');
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Reel Form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'tech' | 'ai' | 'dev_life' | 'tips' | 'design'>('tech');
  const [newTags, setNewTags] = useState('react19, webdev, coding');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredReels = reels.filter(r => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const currentReel = filteredReels[currentIndex] || filteredReels[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIndex, currentReel]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredReels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredReels.length - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowUp') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredReels.length, isPlaying]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createReel({
      title: newTitle.trim(),
      description: newDescription.trim(),
      videoUrl: newVideoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      category: newCategory,
      tags: newTags.split(',').map(t => t.trim().replace(/^#/, ''))
    });

    setNewTitle('');
    setNewDescription('');
    setNewVideoUrl('');
    setShowCreateModal(false);
    alert('Developer Reel published to user feed!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      
      {/* Top Bar with Category Filter & Post Reel Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: '🔥 For You' },
            { id: 'tech', label: '💻 Modern Tech' },
            { id: 'ai', label: '🧠 AI & Models' },
            { id: 'design', label: '🎨 UI & Systems' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id as any); setCurrentIndex(0); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === tab.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm shadow-rose-500/20 hover:bg-rose-600 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Post Reel</span>
        </button>
      </div>

      {/* Main Reels Viewport */}
      {currentReel ? (
        <div className="relative flex justify-center items-center">
          
          {/* Reel Frame (Aspect Ratio 9:16) */}
          <div className="relative w-full max-w-[380px] h-[640px] rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex items-center justify-center">
            
            {/* Video Element */}
            <video
              ref={videoRef}
              src={currentReel.videoUrl}
              poster={currentReel.thumbnailUrl}
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Play/Pause Center Indicator (Flash on Pause) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity"
              >
                <div className="h-16 w-16 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-md">
                  <Play className="h-8 w-8 ml-1 fill-white" />
                </div>
              </button>
            )}

            {/* Top Overlay: Category badge & Audio toggle */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                #{currentReel.category}
              </span>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Bottom Overlay: Creator info, Title & Hashtags */}
            <div className="absolute bottom-4 left-4 right-16 z-10 text-white space-y-2 pointer-events-auto">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentReel.creator.avatarUrl}
                  alt={currentReel.creator.displayName}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/80"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold leading-tight truncate">
                    {currentReel.creator.displayName}
                  </h4>
                  <p className="text-[10px] text-white/70 truncate">
                    @{currentReel.creator.username}
                  </p>
                </div>
              </div>

              <h3 className="text-xs font-bold text-white drop-shadow-md line-clamp-2">
                {currentReel.title}
              </h3>

              <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                {currentReel.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {currentReel.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-semibold text-rose-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Rail (Likes, Comments, Share, Bookmark) */}
            <div className="absolute bottom-6 right-3 z-10 flex flex-col items-center gap-4 text-white">
              
              {/* Like (+1 / Heart) */}
              <button
                onClick={() => likeReel(currentReel.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={`h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-75 ${
                  currentReel.isLiked ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40' : 'bg-black/50 text-white hover:bg-black/70'
                }`}>
                  <Heart className={`h-5 w-5 ${currentReel.isLiked ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[10px] font-bold">{currentReel.likesCount}</span>
              </button>

              {/* Comments */}
              <button
                onClick={() => setShowCommentsModal(true)}
                className="flex flex-col items-center gap-1"
              >
                <div className="h-11 w-11 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold">{currentReel.commentsCount}</span>
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Reel link copied to clipboard!');
                }}
                className="flex flex-col items-center gap-1"
              >
                <div className="h-11 w-11 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition-colors">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold">{currentReel.sharesCount}</span>
              </button>

              {/* Sound icon indicator */}
              <div className="h-9 w-9 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md animate-pulse">
                <Code2 className="h-4 w-4 text-rose-400" />
              </div>

            </div>

            {/* Vertical Navigation Buttons */}
            <div className="absolute right-[-60px] hidden sm:flex flex-col gap-2">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Previous Reel (Up Arrow)"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Next Reel (Down Arrow)"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <p className="text-xs text-slate-400">No reels found in this category.</p>
        </div>
      )}

      {/* Post Reel Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="h-4 w-4 text-rose-500" />
                <span>Post Developer Tech Reel</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Reel Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 3 Quick Rust WASM Performance Hacks"
                  className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief summary of code snippet or insight..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="tech">💻 Modern Tech / Web</option>
                  <option value="ai">🧠 AI & Machine Learning</option>
                  <option value="design">🎨 UI & Design Systems</option>
                  <option value="tips">💡 Coding Tips</option>
                  <option value="dev_life">☕ Developer Life</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="react19, typescript, rust"
                  className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Video Source URL</label>
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://...mp4 (or leave blank for test stream)"
                  className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 disabled:opacity-40"
                >
                  Publish Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reel Comments Drawer Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-rose-500" />
                <span>Comments & Discussion ({currentReel.commentsCount})</span>
              </h4>
              <button onClick={() => setShowCommentsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              <div className="flex items-start gap-2.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                <img src={currentUser.avatarUrl} alt="User" className="h-7 w-7 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Alex Rivera</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">Great explanation! Would love to see the benchmarks on mobile browsers.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="User" className="h-7 w-7 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Dr. Elena Rostova</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">Spot on. In our testing, this reduced garbage collection pauses noticeably.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Add a constructive comment..."
                className="flex-1 h-9 px-3 rounded-full border border-slate-200 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                onClick={() => { alert('Comment added!'); setShowCommentsModal(false); }}
                className="h-9 w-9 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
