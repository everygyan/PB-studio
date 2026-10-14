'use client';

import React from 'react';
import { Article } from '@/types/blog';
import { EditorialCover } from './EditorialCover';
import { Bookmark, MessageSquare, ArrowUpRight } from 'lucide-react';
import { countTotalComments } from '@/lib/storage';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const commentCount = countTotalComments(article.id);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <article
      onClick={() => onSelect(article)}
      className="group relative flex flex-col justify-between bg-white dark:bg-stone-900/60 rounded-xl border border-stone-200/80 dark:border-stone-800 p-5 hover:border-stone-400/80 dark:hover:border-stone-600 transition-all cursor-pointer shadow-xs"
    >
      <div>
        {/* Cover Graphic */}
        <div className="mb-4 overflow-hidden rounded-lg">
          <EditorialCover
            pattern={article.coverPattern || 'minimalist'}
            category={article.category}
            aspect="4:3"
            className="group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Zero-Pill Clean Metadata */}
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2.5">
          <span className="font-medium text-stone-800 dark:text-stone-300">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors leading-snug mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 mb-4">
          {article.excerpt}
        </p>
      </div>

      {/* Card Footer: Comments, Bookmark, Arrow */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="tabular-nums font-mono text-[11px]">
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            title={isBookmarked ? 'Remove from saved' : 'Save for later'}
            className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                isBookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : ''
              }`}
            />
          </button>
          <span className="inline-flex items-center gap-0.5 text-stone-800 dark:text-stone-200 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
