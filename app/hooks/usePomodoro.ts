'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePomodoroStore } from '../store/pomodoroStore';

export function usePomodoro() {
  const {
    timeRemaining,
    isRunning,
    currentMode,
    completedPomodoros,
    settings,
    activeTaskId,
    tasks,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
    setMode,
  } = usePomodoroStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Timer interval
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

  // Update document title with timer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      const modeLabel = currentMode === 'work' ? 'Fokus' : 'Istirahat';
      document.title = isRunning
        ? `${timeString} - ${modeLabel} | Pomoflow`
        : 'Pomoflow - Pomodoro Timer';
    }
  }, [timeRemaining, isRunning, currentMode]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getProgress = useCallback(() => {
    const totalDuration = currentMode === 'work'
      ? settings.workDuration * 60
      : currentMode === 'shortBreak'
        ? settings.shortBreakDuration * 60
        : settings.longBreakDuration * 60;
    return ((totalDuration - timeRemaining) / totalDuration) * 100;
  }, [timeRemaining, currentMode, settings]);

  const getModeLabel = useCallback(() => {
    switch (currentMode) {
      case 'work':
        return 'Fokus';
      case 'shortBreak':
        return 'Istirahat Singkat';
      case 'longBreak':
        return 'Istirahat Panjang';
    }
  }, [currentMode]);

  const activeTask = tasks.find(t => t.id === activeTaskId);

  return {
    // State
    timeRemaining,
    isRunning,
    currentMode,
    completedPomodoros,
    settings,
    activeTask,

    // Computed
    formattedTime: formatTime(timeRemaining),
    progress: getProgress(),
    modeLabel: getModeLabel(),

    // Actions
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
    toggleTimer: isRunning ? pauseTimer : startTimer,
  };
}
