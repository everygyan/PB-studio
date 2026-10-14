'use client';

import React, { useState } from 'react';
import { Article } from '@/types/blog';
import { X, PenLine, Check, Sparkles } from 'lucide-react';
import { saveArticle } from '@/lib/storage';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticlePublished: (article: Article) => void;
}

const CATEGORIES = [
  'Architecture & Spaces',
  'Digital Craft',
  'Philosophy & Life',
  'Culture & Essays',
  'Design Systems',
];

export const WriteModal: React.FC<WriteModalProps> = ({
  isOpen,
  onClose,
  onArticlePublished,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverPattern, setCoverPattern] = useState<'sanctuary' | 'geometry' | 'sound' | 'moss'>('sanctuary');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimeEstimate = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for the essay.');
      return;
    }
    if (!content.trim()) {
      setError('Please write some content before publishing.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newArticle: Article = {
      id: `essay-${Date.now()}`,
      slug: newSlug || `essay-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A short reflection on craft and thought',
      excerpt: content.trim().slice(0, 160) + (content.length > 160 ? '...' : ''),
      content: content.trim(),
      category,
      author: {
        name: 'Julian Vance',
        role: 'Architect & Systems Essayist',
        avatarColor: 'bg-stone-700',
      },
      publishedAt: new Date().toISOString(),
      readTime: readTimeEstimate,
      views: 1,
      coverPattern,
      tags: parsedTags.length > 0 ? parsedTags : ['Essays', 'Reflections'],
    };

    saveArticle(newArticle);

    setTimeout(() => {
      setIsSubmitting(false);
      onArticlePublished(newArticle);
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              Compose New Essay
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Essay Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Craft of Intentional Boundaries"
              className="w-full px-3 py-2 text-base font-serif font-medium bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Subtitle / Deck
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A one-sentence thesis or context"
              className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Cover Art Motif
              </label>
              <select
                value={coverPattern}
                onChange={(e) => setCoverPattern(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
              >
                <option value="sanctuary">Sanctuary (Arch & Light)</option>
                <option value="geometry">Geometry (Drafting Caliper)</option>
                <option value="sound">Sound (Acoustic Wave)</option>
                <option value="moss">Moss (Courtyard Balance)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400">
                Essay Body
              </label>
              <span className="text-[11px] font-mono text-stone-400">
                {wordCount} words · est. {readTimeEstimate}
              </span>
            </div>
            <textarea
              required
              rows={9}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your reflection in paragraphs. Use ### for subheadings and > for pull quotes..."
              className="w-full p-3 text-sm font-serif bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-y leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Design, Craft, Architecture"
              className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Publish to Journal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
