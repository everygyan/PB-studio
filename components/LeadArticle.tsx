'use client';

import React from 'react';
import { Article } from '@/types/blog';
import { EditorialCover } from './EditorialCover';
import { Bookmark, MessageSquare, ArrowRight } from 'lucide-react';
import { countTotalComments } from '@/lib/storage';

interface LeadArticleProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const LeadArticle: React.FC<LeadArticleProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const commentCount = countTotalComments(article.id);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section className="mb-14">
      <div
        onClick={() => onSelect(article)}
        className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white dark:bg-stone-900/70 p-6 md:p-8 rounded-2xl border border-stone-200/90 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-all cursor-pointer shadow-xs"
      >
        {/* Left Column: Editorial Information */}
        <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
          <div>
            {/* Zero-Pill Lead Marker */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
              <span className="font-semibold text-stone-900 dark:text-stone-200">
                Featured Essay
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors leading-[1.2] mb-3 [text-wrap:balance]">
              {article.title}
            </h2>

            {/* Subtitle / Excerpt */}
            <p className="text-base font-serif italic text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
              {article.subtitle}
            </p>

            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="tabular-nums font-mono">
                  {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => onToggleBookmark(article.id, e)}
                title={isBookmarked ? 'Saved' : 'Save for later'}
                className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : ''
                  }`}
                />
              </button>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg group-hover:bg-stone-800 dark:group-hover:bg-stone-200 transition-colors whitespace-nowrap">
                <span>Read Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Artwork */}
        <div className="lg:col-span-5 order-1 lg:order-2 overflow-hidden rounded-xl">
          <EditorialCover
            pattern={article.coverPattern || 'sanctuary'}
            category={article.category}
            aspect="16:9"
            className="w-full h-full min-h-[220px] lg:min-h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};
