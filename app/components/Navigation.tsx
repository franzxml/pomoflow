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

          {/* Testing Link */}
          <Link
            href="/testing"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            🧪 Testing
          </Link>
        </div>
      </div>
    </nav>
  );
}
