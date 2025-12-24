'use client';

import { useState } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Timer Section */}
        <section className="mb-12">
          <Timer />
        </section>

        {/* Quick Task Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tugas Hari Ini
            </h2>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              {showTaskForm ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Tutup
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Tugas
                </>
              )}
            </button>
          </div>

          {showTaskForm && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <TaskForm onClose={() => setShowTaskForm(false)} />
            </div>
          )}

          <TaskList compact />
        </section>
      </div>
    </div>
  );
}
