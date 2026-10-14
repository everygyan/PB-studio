'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/blog';
import { Search, X, ArrowUpRight, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById('search-dialog-input')?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          a.content.toLowerCase().includes(query.toLowerCase())
      )
    : articles;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            id="search-dialog-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search essays by keyword, theme, or author..."
            className="w-full text-sm bg-transparent border-0 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
            >
              Clear
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/80 p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400">
              No matching essays found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="group p-3 rounded-lg hover:bg-stone-100/70 dark:hover:bg-stone-800/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 mb-1">
                  <span className="font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider text-[10px]">
                    {article.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors flex items-center justify-between">
                  <span>{article.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 font-serif italic">
                  {article.subtitle}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-950/60 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <span>{filtered.length} essays indexed</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
