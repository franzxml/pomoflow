'use client';

import { create } from 'zustand';
import { TimerMode } from '../types';

// Default durations (in minutes)
const DEFAULT_DURATIONS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
} as const;

interface PomodoroState {
  // Timer state
  timeRemaining: number;
  isRunning: boolean;
  currentMode: TimerMode;
  completedPomodoros: number;

  // Timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  completeSession: () => void;
  setMode: (mode: TimerMode) => void;

  // Utility
  getDurationForMode: (mode: TimerMode) => number;
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  // Initial state
  timeRemaining: DEFAULT_DURATIONS.work * 60,
  isRunning: false,
  currentMode: 'work',
  completedPomodoros: 0,

  // Timer actions
  startTimer: () => set({ isRunning: true }),

  pauseTimer: () => set({ isRunning: false }),

  resetTimer: () => {
    const { currentMode, getDurationForMode } = get();
    set({
      timeRemaining: getDurationForMode(currentMode) * 60,
      isRunning: false
    });
  },

  tick: () => {
    const { timeRemaining, isRunning, completeSession } = get();
    if (isRunning && timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    } else if (isRunning && timeRemaining === 0) {
      completeSession();
    }
  },

  completeSession: () => {
    const { currentMode, completedPomodoros, getDurationForMode } = get();

    // Determine next mode
    let nextMode: TimerMode;
    let newCompletedPomodoros = completedPomodoros;

    if (currentMode === 'work') {
      newCompletedPomodoros = completedPomodoros + 1;
      // Every 4th session is long break
      if (newCompletedPomodoros % 4 === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
    } else {
      nextMode = 'work';
    }

    // Show notification
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification('Pomoflow', {
        body: currentMode === 'work'
          ? 'Waktu istirahat!'
          : 'Kembali bekerja!',
        icon: '/favicon.ico',
      });
    }

    set({
      completedPomodoros: newCompletedPomodoros,
      currentMode: nextMode,
      timeRemaining: getDurationForMode(nextMode) * 60,
      isRunning: false,
    });
  },

  setMode: (mode: TimerMode) => {
    const { getDurationForMode } = get();
    set({
      currentMode: mode,
      timeRemaining: getDurationForMode(mode) * 60,
      isRunning: false,
    });
  },

  // Utility
  getDurationForMode: (mode: TimerMode) => {
    switch (mode) {
      case 'work':
        return DEFAULT_DURATIONS.work;
      case 'shortBreak':
        return DEFAULT_DURATIONS.shortBreak;
      case 'longBreak':
        return DEFAULT_DURATIONS.longBreak;
    }
  },
}));
