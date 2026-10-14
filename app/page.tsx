'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/blog';
import { Header } from '@/components/Header';
import { LeadArticle } from '@/components/LeadArticle';
import { ArticleCard } from '@/components/ArticleCard';
import { ArticleReader } from '@/components/ArticleReader';
import { WriteModal } from '@/components/WriteModal';
import { AboutModal } from '@/components/AboutModal';
import { SearchModal } from '@/components/SearchModal';
import { Footer } from '@/components/Footer';
import {
  getStoredArticles,
  getBookmarks,
  toggleBookmark as toggleBookmarkStorage,
  countTotalComments,
} from '@/lib/storage';
import {
  Bookmark,
  MessageSquare,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Compass,
  PenLine,
} from 'lucide-react';

const CATEGORIES = [
  'All Essays',
  'Architecture & Spaces',
  'Digital Craft',
  'Philosophy & Life',
  'Culture & Essays',
];

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>(() => getStoredArticles());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Essays');
  const [currentView, setCurrentView] = useState<'home' | 'bookmarks' | 'topics'>('home');
  const [bookmarks, setBookmarks] = useState<string[]>(() => getBookmarks());
  
  // Modals
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Theme state with lazy initialization
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleToggleBookmark = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleBookmarkStorage(articleId);
    setBookmarks(updated);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handleArticlePublished = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered articles
  const displayedArticles = articles.filter((article) => {
    if (currentView === 'bookmarks') {
      return bookmarks.includes(article.id);
    }
    if (selectedCategory !== 'All Essays') {
      return article.category === selectedCategory;
    }
    return true;
  });

  // Salience tiers for Home view
  const featuredArticle =
    selectedCategory === 'All Essays' && currentView === 'home'
      ? displayedArticles.find((a) => a.featured) || displayedArticles[0]
      : null;

  const secondaryArticles = featuredArticle
    ? displayedArticles.filter((a) => a.id !== featuredArticle.id).slice(0, 2)
    : displayedArticles.slice(0, 4);

  const archiveArticles = featuredArticle
    ? displayedArticles.filter(
        (a) => a.id !== featuredArticle.id && !secondaryArticles.some((s) => s.id === a.id)
      )
    : displayedArticles.slice(4);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors selection:bg-stone-200 dark:selection:bg-stone-800">
      {/* 3-Zone Header Contract */}
      <Header
        currentView={selectedArticle ? 'reader' : currentView}
        onNavigate={(view) => {
          setSelectedArticle(null);
          setCurrentView(view);
          if (view === 'home') setSelectedCategory('All Essays');
        }}
        onOpenWriteModal={() => setIsWriteModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        bookmarksCount={bookmarks.length}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedArticle ? (
          /* Reader View */
          <ArticleReader
            article={selectedArticle}
            onBack={handleBackToArticles}
            isBookmarked={bookmarks.includes(selectedArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          /* Publication Catalog View */
          <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
            {/* Editorial Hero Header */}
            <section className="mb-12 pb-8 border-b border-stone-200/90 dark:border-stone-800">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-widest font-sans font-medium text-stone-500 dark:text-stone-400 mb-3 block">
                  A Personal Publication · Vol. VII
                </span>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-stone-950 dark:text-stone-50 mb-4 [text-wrap:balance]">
                  Reflections on Design, Attention & Quiet Software
                </h1>
                <p className="text-base sm:text-lg font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                  Long-form essays written with unhurried cadence. Exploring the architecture of physical spaces, digital restraint, and why simplicity outlasts complexity.
                </p>
              </div>

              {/* Interactive Category Filter Bar (Buttons with functional click handlers compliant with 1.A) */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentView('home');
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === cat && currentView === 'home'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200/60 dark:border-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Bookmarks view alert banner if active */}
            {currentView === 'bookmarks' && (
              <div className="mb-8 p-4 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-100">
                    Saved Essays ({displayedArticles.length})
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Your personal reading archive stored offline in this browser.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-xs text-stone-600 dark:text-stone-300 hover:underline"
                >
                  View all essays
                </button>
              </div>
            )}

            {displayedArticles.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl">
                <Bookmark className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
                <h3 className="text-base font-serif font-semibold text-stone-800 dark:text-stone-200">
                  {currentView === 'bookmarks' ? 'No saved essays yet' : 'No essays found in this section'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                  {currentView === 'bookmarks'
                    ? 'Click the bookmark icon on any essay to save it here for later reading.'
                    : 'Check back soon or compose a new essay to populate this category.'}
                </p>
                {currentView === 'bookmarks' ? (
                  <button
                    onClick={() => setCurrentView('home')}
                    className="mt-4 px-4 py-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 rounded-lg hover:opacity-80"
                  >
                    Explore Essays
                  </button>
                ) : (
                  <button
                    onClick={() => setIsWriteModalOpen(true)}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:opacity-90"
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>Write an Essay</span>
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* TIER 1: Featured Lead Article */}
                {featuredArticle && currentView === 'home' && selectedCategory === 'All Essays' && (
                  <LeadArticle
                    article={featuredArticle}
                    onSelect={handleSelectArticle}
                    isBookmarked={bookmarks.includes(featuredArticle.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                )}

                {/* TIER 2: Secondary Features Grid */}
                {secondaryArticles.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xs uppercase tracking-widest font-sans font-medium text-stone-500 dark:text-stone-400">
                        Recent Inquiries
                      </h3>
                      <span className="text-xs font-mono text-stone-400">
                        {secondaryArticles.length} published
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {secondaryArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelect={handleSelectArticle}
                          isBookmarked={bookmarks.includes(article.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* TIER 3: Archive & Department List (Text-led clean rows) */}
                {archiveArticles.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xs uppercase tracking-widest font-sans font-medium text-stone-500 dark:text-stone-400">
                        Monograph Archive
                      </h3>
                      <span className="text-xs font-mono text-stone-400">
                        {archiveArticles.length} entries
                      </span>
                    </div>

                    <div className="divide-y divide-stone-200/80 dark:divide-stone-800 border-y border-stone-200/80 dark:border-stone-800">
                      {archiveArticles.map((article) => {
                        const count = countTotalComments(article.id);
                        return (
                          <div
                            key={article.id}
                            onClick={() => handleSelectArticle(article)}
                            className="group py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-stone-100/50 dark:hover:bg-stone-900/30 px-3 -mx-3 rounded-lg transition-colors cursor-pointer"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
                                <span className="font-medium text-stone-700 dark:text-stone-300">
                                  {article.category}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{article.readTime}</span>
                              </div>
                              <h4 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                                {article.title}
                              </h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1 font-serif">
                                {article.subtitle}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span className="tabular-nums font-mono text-[11px]">{count}</span>
                              </div>
                              <span className="text-stone-800 dark:text-stone-200 font-medium group-hover:translate-x-0.5 transition-transform">
                                Read →
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onNavigateCategory={(cat) => {
          setSelectedArticle(null);
          setSelectedCategory(cat);
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <WriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onArticlePublished={handleArticlePublished}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
