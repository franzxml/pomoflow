'use client';

import { usePomodoro } from '../hooks/usePomodoro';
import { TimerMode } from '../types';

export default function Timer() {
  const {
    formattedTime,
    isRunning,
    currentMode,
    progress,
    modeLabel,
    completedPomodoros,
    toggleTimer,
    resetTimer,
    setMode,
  } = usePomodoro();

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

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
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
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
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
      </div>

      {/* Session Counter */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <span>Sesi hari ini:</span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < completedPomodoros % 4
                  ? getModeColor()
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="font-semibold">{completedPomodoros}</span>
      </div>
    </div>
  );
}
