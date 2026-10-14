'use client';

import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onNavigateCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onNavigateCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950 py-16 text-stone-600 dark:text-stone-400">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200/80 dark:border-stone-800">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Chronicle
            </span>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-serif leading-relaxed max-w-sm">
              An independent journal of essays examining physical architecture, digital systems, typography, and unhurried human attention. Published in deliberate quarterly sequences.
            </p>
          </div>

          {/* Department / Category Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-sans uppercase tracking-widest text-stone-800 dark:text-stone-200 font-medium">
              Departments
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateCategory('Architecture & Spaces')}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  Architecture & Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Digital Craft')}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  Digital Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Philosophy & Life')}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  Philosophy & Life
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Culture & Essays')}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  Culture & Essays
                </button>
              </li>
            </ul>
          </div>

          {/* Quiet Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-sans uppercase tracking-widest text-stone-800 dark:text-stone-200 font-medium">
              Occasional Dispatch
            </h5>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Sent once a month when a new essay is finalized. No tracking or marketing fluff.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                disabled={subscribed}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-3 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1 text-emerald-300 dark:text-emerald-700">
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed</span>
                  </span>
                ) : (
                  <span>Join</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Quiet copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 dark:text-stone-500">
          <p>© {new Date().getFullYear()} Chronicle. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenAbout} className="hover:text-stone-700 dark:hover:text-stone-300">
              Colophon & Ethos
            </button>
            <span aria-hidden="true">·</span>
            <span>Typeset in Alabaster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
