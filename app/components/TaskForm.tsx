'use client';

import { useState } from 'react';
import { usePomodoroStore } from '../store/pomodoroStore';

interface TaskFormProps {
  onClose?: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { addTask } = usePomodoroStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      estimatedPomodoros,
    });

    setTitle('');
    setDescription('');
    setEstimatedPomodoros(1);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nama Tugas
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Apa yang akan kamu kerjakan?"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Deskripsi (opsional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detail tambahan..."
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Estimasi Pomodoro
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEstimatedPomodoros(Math.max(1, estimatedPomodoros - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <div className="flex items-center gap-1 px-4">
            {[...Array(Math.min(estimatedPomodoros, 8))].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-red-500" />
            ))}
            {estimatedPomodoros > 8 && (
              <span className="text-sm text-gray-500 ml-1">+{estimatedPomodoros - 8}</span>
            )}
          </div>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300 min-w-[2ch] text-center">
            {estimatedPomodoros}
          </span>
          <button
            type="button"
            onClick={() => setEstimatedPomodoros(estimatedPomodoros + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Sekitar {estimatedPomodoros * 25} menit
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Tambah Tugas
        </button>
      </div>
    </form>
  );
}
