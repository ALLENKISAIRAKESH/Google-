import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Plus, Globe, Lock, ExternalLink, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CollectionsPage: React.FC = () => {
  const { collections, createCollection } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createCollection(title.trim(), description.trim(), visibility);
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-rose-500" />
            <span>Collections & Bookmarks</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize engineering roadmaps, research papers, and saved discussions into curated folders.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map(coll => (
          <div
            key={coll.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: coll.color }} />
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 capitalize">
                  {coll.visibility === 'public' ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                  {coll.visibility}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {coll.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                {coll.description}
              </p>

              {/* Items Preview */}
              {coll.items && coll.items.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {coll.items.map(item => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 text-xs dark:bg-slate-800/60">
                      <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</div>
                      {item.note && <div className="text-[10px] text-slate-400 mt-0.5">{item.note}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic mb-4">No saved items in this collection yet.</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{coll.itemCount} item{coll.itemCount === 1 ? '' : 's'}</span>
              <span className="text-[10px]">{new Date(coll.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Collection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create New Collection</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Systems Papers"
                  className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief note about what goes in this collection..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="public">🌐 Public (Visible on profile)</option>
                  <option value="private">🔒 Private (Only Me)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 disabled:opacity-40"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
