'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/blog';
import { CommentSection } from './CommentSection';
import { EditorialCover } from './EditorialCover';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  MessageSquare,
  Clock,
  Eye,
  Check,
  Twitter,
  BookOpen,
} from 'lucide-react';
import { countTotalComments } from '@/lib/storage';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);
  const commentCount = countTotalComments(article.id);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2400);
    }
  };

  const scrollToComments = () => {
    const el = document.getElementById('discussion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Helper to parse content with markdown headings, pull quotes, and paragraphs
  const renderContentBlocks = (raw: string) => {
    const paragraphs = raw.split('\n\n');

    return paragraphs.map((block, index) => {
      const trimmed = block.trim();

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={index}
            className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mt-10 mb-4 pt-4 border-t border-stone-200/60 dark:border-stone-800"
          >
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        );
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-12 mb-5"
          >
            {trimmed.replace(/^##\s*/, '')}
          </h2>
        );
      }

      // Pull quote (using subtle top/bottom hairline borders as required by Constitution, never thick left border)
      if (trimmed.startsWith('> ')) {
        return (
          <figure
            key={index}
            className="my-10 py-6 px-4 border-y border-stone-300 dark:border-stone-700 text-center"
          >
            <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed [text-wrap:balance]">
              {trimmed.replace(/^>\s*"?|"?$/g, '')}
            </blockquote>
          </figure>
        );
      }

      // Numbered or bullet list
      if (trimmed.match(/^[0-9]\.\s/) || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={index} className="my-5 space-y-2 pl-5 list-disc text-stone-700 dark:text-stone-300 text-base leading-relaxed">
            {items.map((item, i) => (
              <li key={i} className="pl-1">
                {item.replace(/^[0-9]\.\s*|- \s*/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // First paragraph drop cap
      if (index === 0) {
        return (
          <p
            key={index}
            className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-[1.8] mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 dark:first-letter:text-stone-100"
          >
            {trimmed}
          </p>
        );
      }

      // Standard body paragraph (65-75ch measure)
      return (
        <p
          key={index}
          className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-[1.8] mb-6"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="relative min-h-screen pb-24">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-16 left-0 h-[2px] bg-stone-900 dark:bg-stone-100 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Reader Utility Toolbar */}
      <div className="sticky top-16 z-30 w-full bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/80 py-3">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Essays</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
            <button
              onClick={scrollToComments}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Jump to Discussion"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="tabular-nums font-mono">
                {commentCount}
              </span>
            </button>

            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className="p-1 hover:text-stone-900 dark:hover:text-white transition-colors"
              title={isBookmarked ? 'Saved' : 'Save'}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-current text-stone-900 dark:text-stone-100' : ''
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Copy share link"
            >
              {showShareToast ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Container (Constrained measure 65–75ch) */}
      <article className="max-w-2xl mx-auto px-6 pt-12">
        {/* Curatorial Header */}
        <header className="mb-10 text-center">
          {/* Zero-Pill Metadata */}
          <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4 tracking-wide">
            <span className="uppercase tracking-widest text-[11px] font-sans font-medium text-stone-700 dark:text-stone-300">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight leading-[1.15] mb-4 [text-wrap:balance]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex items-center justify-center gap-2 pt-6 mt-6 border-t border-stone-200/80 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
            <span className="font-medium text-stone-900 dark:text-stone-200">
              By {article.author.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.author.role}</span>
          </div>
        </header>

        {/* Feature Cover Artwork */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-xs">
          <EditorialCover
            pattern={article.coverPattern || 'sanctuary'}
            title={article.title}
            category={article.category}
            aspect="16:9"
          />
          <p className="text-xs font-serif italic text-stone-500 dark:text-stone-400 text-center mt-2.5">
            Architectural study on silence, structure, and interior space.
          </p>
        </div>

        {/* Prose Body */}
        <div className="prose-container font-serif text-stone-800 dark:text-stone-200">
          {renderContentBlocks(article.content)}
        </div>

        {/* Tag List (Zero-Pill clean inline text with separators) */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-stone-200/70 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-sans font-medium text-stone-700 dark:text-stone-300">Indexed in:</span>
            {article.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer">
                  #{tag}
                </span>
                {idx < article.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Author Colophon Box */}
        <div className="mt-12 p-6 bg-stone-100/70 dark:bg-stone-900/40 rounded-xl border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-serif font-bold text-lg shrink-0">
            JV
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
              About {article.author.name}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Writer, architect, and software designer exploring the tension between digital noise and spatial stillness. EveryGyan is published in small, deliberate editions.
            </p>
          </div>
        </div>

        {/* Integrated Comment Section */}
        <CommentSection key={article.id} articleId={article.id} articleTitle={article.title} />
      </article>
    </div>
  );
};
