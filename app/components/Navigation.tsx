'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Desktop only */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-xl font-bold text-red-500"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Pomoflow
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center justify-center w-full md:flex-1">
            <Link
              href="/"
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-900/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Timer</span>
            </Link>
          </div>

          {/* Spacer - Desktop only */}
          <div className="hidden md:block" />
        </div>
      </div>
    </nav>
  );
}
