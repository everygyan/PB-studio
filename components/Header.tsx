'use client';

import React from 'react';
import { Bookmark, PenLine, Sun, Moon, Search } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'reader' | 'bookmarks' | 'topics';
  onNavigate: (view: 'home' | 'bookmarks' | 'topics') => void;
  onOpenWriteModal: () => void;
  onOpenAboutModal: () => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenWriteModal,
  onOpenAboutModal,
  onOpenSearch,
  bookmarksCount,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element, no adjacent descriptors) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
        >
          EveryGyan
        </button>

        {/* Zone 2: 4–5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              currentView === 'home'
                ? 'text-stone-950 dark:text-white border-stone-950 dark:border-white font-semibold'
                : 'border-transparent hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            Essays
          </button>
          <button
            onClick={() => onNavigate('topics')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              currentView === 'topics'
                ? 'text-stone-950 dark:text-white border-stone-950 dark:border-white font-semibold'
                : 'border-transparent hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            Topics
          </button>
          <button
            onClick={() => onNavigate('bookmarks')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b ${
              currentView === 'bookmarks'
                ? 'text-stone-950 dark:text-white border-stone-950 dark:border-white font-semibold'
                : 'border-transparent hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <span>Saved</span>
            {bookmarksCount > 0 && (
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                ({bookmarksCount})
              </span>
            )}
          </button>
          <button
            onClick={onOpenAboutModal}
            className="whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b border-transparent hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-700"
          >
            About
          </button>
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b border-transparent hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-700"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle visual theme"
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenWriteModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 shadow-sm"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write Essay</span>
          </button>
        </div>
      </div>
    </header>
  );
};
