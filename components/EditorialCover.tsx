'use client';

import React from 'react';

interface EditorialCoverProps {
  pattern?: 'sanctuary' | 'geometry' | 'sound' | 'moss' | 'minimalist';
  title?: string;
  category?: string;
  aspect?: '16:9' | '4:3' | 'wide' | 'square';
  className?: string;
}

export const EditorialCover: React.FC<EditorialCoverProps> = ({
  pattern = 'minimalist',
  title = '',
  category = '',
  aspect = '4:3',
  className = '',
}) => {
  const aspectClass =
    aspect === '16:9'
      ? 'aspect-[16/9]'
      : aspect === 'wide'
      ? 'aspect-[21/9]'
      : aspect === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  return (
    <div
      className={`relative w-full overflow-hidden select-none bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 ${aspectClass} ${className}`}
    >
      {/* Pattern rendering based on theme */}
      {pattern === 'sanctuary' && (
        <svg
          className="absolute inset-0 w-full h-full text-stone-300 dark:text-stone-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="sanctuary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id="sunbeam" cx="80%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="600" height="340" fill="url(#sunbeam)" />
          {/* Architectural Archway */}
          <path
            d="M 120 340 L 120 160 A 80 80 0 0 1 280 160 L 280 340"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 160 340 L 160 180 A 40 40 0 0 1 240 180 L 240 340"
            fill="url(#sanctuary-grad)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Light Angle Shadows */}
          <line x1="280" y1="160" x2="520" y2="340" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="200" y1="140" x2="440" y2="340" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
          <line x1="120" y1="160" x2="360" y2="340" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
          {/* Horizontal floor hairline */}
          <line x1="40" y1="300" x2="560" y2="300" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}

      {pattern === 'geometry' && (
        <svg
          className="absolute inset-0 w-full h-full text-stone-300 dark:text-stone-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Isometric Drafting Grid */}
          <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35">
            <line x1="50" y1="50" x2="550" y2="50" />
            <line x1="50" y1="130" x2="550" y2="130" />
            <line x1="50" y1="210" x2="550" y2="210" />
            <line x1="50" y1="290" x2="550" y2="290" />
            <line x1="150" y1="20" x2="150" y2="320" />
            <line x1="300" y1="20" x2="300" y2="320" />
            <line x1="450" y1="20" x2="450" y2="320" />
          </g>
          {/* Golden Section Ellipse & Solid */}
          <circle cx="300" cy="170" r="95" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="230" y="100" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="300,75 390,230 210,230" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )}

      {pattern === 'sound' && (
        <svg
          className="absolute inset-0 w-full h-full text-stone-300 dark:text-stone-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="200" cy="170" r="25" strokeOpacity="0.9" />
            <circle cx="200" cy="170" r="55" strokeOpacity="0.7" />
            <circle cx="200" cy="170" r="90" strokeOpacity="0.5" strokeDasharray="6 4" />
            <circle cx="200" cy="170" r="130" strokeOpacity="0.35" />
            <circle cx="200" cy="170" r="175" strokeOpacity="0.2" />
            <circle cx="200" cy="170" r="225" strokeOpacity="0.1" />
          </g>
          {/* Reflection Waveguide */}
          <line x1="40" y1="170" x2="560" y2="170" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M 380 60 Q 420 170 380 280" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M 430 80 Q 460 170 430 260" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      )}

      {pattern === 'moss' && (
        <svg
          className="absolute inset-0 w-full h-full text-stone-300 dark:text-stone-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Zen Courtyard Raked Lines */}
          <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.4">
            <path d="M 40 80 C 180 80 240 100 560 90" fill="none" />
            <path d="M 40 130 C 170 125 250 145 560 140" fill="none" />
            <path d="M 40 180 C 190 175 270 195 560 190" fill="none" />
            <path d="M 40 230 C 160 225 290 245 560 240" fill="none" />
          </g>
          {/* Stone Balance Form */}
          <ellipse cx="280" cy="220" rx="70" ry="32" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="285" cy="180" rx="50" ry="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="290" cy="150" rx="32" ry="16" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}

      {pattern === 'minimalist' && (
        <svg
          className="absolute inset-0 w-full h-full text-stone-300 dark:text-stone-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="60" y1="170" x2="540" y2="170" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
          <circle cx="300" cy="170" r="40" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="300" y1="70" x2="300" y2="270" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.4" />
        </svg>
      )}

      {/* Subtle overlay vignette and subtle label watermark */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Minimal caption text in bottom corner */}
      {(category || title) && (
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-sans tracking-widest uppercase text-stone-600 dark:text-stone-400 pointer-events-none">
          <span className="truncate max-w-[70%]">{category || 'EveryGyan Essay'}</span>
          <span className="tabular-nums font-mono opacity-70">FIG. 01</span>
        </div>
      )}
    </div>
  );
};
