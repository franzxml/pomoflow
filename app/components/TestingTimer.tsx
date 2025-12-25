'use client';

import { usePomodoroTest } from '../hooks/usePomodoroTest';
import { TimerMode } from '../types';
import { useState } from 'react';

export default function TestingTimer() {
  const {
    formattedTime,
    isRunning,
    currentMode,
    completedPomodoros,
    customDuration,
    modeLabel,
    toggleTimer,
    resetTimer,
    stopTimer,
    setMode,
    setCustomDuration,
  } = usePomodoroTest();

  const [inputSeconds, setInputSeconds] = useState(customDuration.toString());

  const modeButtons: { mode: TimerMode; label: string }[] = [
    { mode: 'work', label: 'Fokus' },
    { mode: 'shortBreak', label: 'Istirahat Singkat' },
    { mode: 'longBreak', label: 'Istirahat Panjang' },
  ];

  const getModeColor = () => {
    switch (currentMode) {
      case 'work':
        return 'bg-red-500';
      case 'shortBreak':
        return 'bg-green-500';
      case 'longBreak':
        return 'bg-blue-500';
    }
  };

  const getModeTextColor = () => {
    switch (currentMode) {
      case 'work':
        return 'text-red-500';
      case 'shortBreak':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
    }
  };

  const getModeBorderColor = () => {
    switch (currentMode) {
      case 'work':
        return 'border-red-500';
      case 'shortBreak':
        return 'border-green-500';
      case 'longBreak':
        return 'border-blue-500';
    }
  };

  const handleSetCustomDuration = () => {
    const seconds = parseInt(inputSeconds, 10);
    if (!isNaN(seconds) && seconds > 0) {
      setCustomDuration(seconds);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Test Mode Badge */}
      <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg font-semibold">
        🧪 Mode Testing - Durasi Lebih Singkat untuk Testing
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {modeButtons.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setMode(mode)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currentMode === mode
                ? `${getModeColor()} text-white`
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom Duration Input */}
      <div className="flex gap-2 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Durasi Custom (detik):
        </label>
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          disabled={isRunning}
          className="w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          min="1"
        />
        <button
          onClick={handleSetCustomDuration}
          disabled={isRunning}
          className="px-3 py-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-md text-sm font-medium transition-all"
        >
          Set
        </button>
      </div>

      {/* Timer Circle */}
      <div className="relative w-72 h-72 md:w-80 md:h-80">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={getModeTextColor()}
            strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - ((customDuration - customDuration % 60 === 0 && inputSeconds === customDuration.toString() ? customDuration : 0) / customDuration || 0) / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl md:text-6xl font-bold font-mono ${getModeTextColor()}`}>
            {formattedTime}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            {modeLabel}
          </span>
        </div>
      </div>

      {/* Completed Pomodoros */}
      <div className="text-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Sesi Selesai: {completedPomodoros}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-lg text-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 ${getModeColor()}`}
        >
          {isRunning ? 'Jeda' : 'Mulai'}
        </button>
        <button
          onClick={resetTimer}
          className={`px-4 py-3 rounded-lg text-lg font-semibold border-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${getModeBorderColor()} ${getModeTextColor()}`}
        >
          Reset
        </button>
        <button
          onClick={stopTimer}
          className="px-4 py-3 rounded-lg text-lg font-semibold border-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Berhenti
        </button>
      </div>
    </div>
  );
}
