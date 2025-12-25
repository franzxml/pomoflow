'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { create } from 'zustand';
import { TimerMode } from '../types';

// Test durations (in seconds for testing)
const TEST_DURATIONS = {
  work: 10,
  shortBreak: 5,
  longBreak: 8,
} as const;

interface TestPomodoroState {
  timeRemaining: number;
  isRunning: boolean;
  currentMode: TimerMode;
  completedPomodoros: number;
  customDuration: number;

  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
  completeSession: () => void;
  setMode: (mode: TimerMode) => void;
  setCustomDuration: (seconds: number) => void;
  getDurationForMode: (mode: TimerMode) => number;
}

export const usePomodoroTestStore = create<TestPomodoroState>((set, get) => ({
  timeRemaining: TEST_DURATIONS.work,
  isRunning: false,
  currentMode: 'work',
  completedPomodoros: 0,
  customDuration: TEST_DURATIONS.work,

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),

  resetTimer: () => {
    const { currentMode, getDurationForMode } = get();
    set({
      timeRemaining: getDurationForMode(currentMode),
      isRunning: false
    });
  },

  stopTimer: () => {
    set({
      timeRemaining: TEST_DURATIONS.work,
      isRunning: false,
      currentMode: 'work',
      completedPomodoros: 0,
      customDuration: TEST_DURATIONS.work,
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

    let nextMode: TimerMode;
    let newCompletedPomodoros = completedPomodoros;

    if (currentMode === 'work') {
      newCompletedPomodoros = completedPomodoros + 1;
      if (newCompletedPomodoros % 4 === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
    } else {
      nextMode = 'work';
    }

    // Play notification sound
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/melodic-mirth.mp3');
      audio.volume = 0.8;
      audio.play().catch(() => {
        console.log('Audio playback failed');
      });
    }

    set({
      completedPomodoros: newCompletedPomodoros,
      currentMode: nextMode,
      timeRemaining: getDurationForMode(nextMode),
      isRunning: false,
    });
  },

  setMode: (mode: TimerMode) => {
    const { getDurationForMode } = get();
    set({
      currentMode: mode,
      timeRemaining: getDurationForMode(mode),
      isRunning: false,
    });
  },

  setCustomDuration: (seconds: number) => {
    set({
      customDuration: seconds,
      timeRemaining: seconds,
      isRunning: false,
    });
  },

  getDurationForMode: (mode: TimerMode) => {
    const { customDuration } = get();
    if (mode === 'work') {
      return customDuration;
    }
    return TEST_DURATIONS[mode];
  },
}));

export function usePomodoroTest() {
  const {
    timeRemaining,
    isRunning,
    currentMode,
    completedPomodoros,
    customDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    stopTimer,
    tick,
    setMode,
    setCustomDuration,
  } = usePomodoroTestStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tick]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      document.title = isRunning
        ? `${timeString} - Test Mode | Pomoflow`
        : 'Pomoflow - Test Mode';
    }
  }, [timeRemaining, isRunning]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getModeLabel = useCallback(() => {
    switch (currentMode) {
      case 'work':
        return 'Fokus (Test)';
      case 'shortBreak':
        return 'Istirahat Singkat';
      case 'longBreak':
        return 'Istirahat Panjang';
    }
  }, [currentMode]);

  return {
    timeRemaining,
    isRunning,
    currentMode,
    completedPomodoros,
    customDuration,
    formattedTime: formatTime(timeRemaining),
    modeLabel: getModeLabel(),

    startTimer,
    pauseTimer,
    resetTimer,
    stopTimer,
    setMode,
    setCustomDuration,
    toggleTimer: isRunning ? pauseTimer : startTimer,
  };
}
