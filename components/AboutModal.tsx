'use client';

import React from 'react';
import { X, BookOpen, Feather } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-xs font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400">
          <Feather className="w-3.5 h-3.5" />
          <span>About EveryGyan</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 [text-wrap:balance]">
          A Quiet Journal for Deliberate Thinking
        </h3>

        <div className="space-y-4 text-stone-600 dark:text-stone-300 font-serif text-sm leading-relaxed">
          <p>
            EveryGyan was founded in 2026 as an architectural antidote to algorithmic feeds and attention-extracting media. It is written and maintained by Julian Vance, an architect and software designer based between Kyoto and Zurich.
          </p>

          <p>
            The essays explore how physical and digital spaces condition human attention, the tactile longevity of tools, and why simple, unadorned craftsmanship outlasts clever abstractions.
          </p>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-xs font-sans not-italic text-stone-500 dark:text-stone-400 space-y-1">
            <p>
              <strong className="text-stone-800 dark:text-stone-200">Typography:</strong> Headings in classic editorial serif, body in relaxed book proportions.
            </p>
            <p>
              <strong className="text-stone-800 dark:text-stone-200">Colophon:</strong> Typeset in clean alabaster paper tones with zero advertising, telemetry, or algorithmic recommendation loops.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
