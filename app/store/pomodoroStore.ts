'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Task,
  PomodoroSession,
  DailyStats,
  Settings,
  TimerMode,
  DEFAULT_SETTINGS
} from '../types';

interface PomodoroState {
  // Timer state
  timeRemaining: number;
  isRunning: boolean;
  currentMode: TimerMode;
  completedPomodoros: number;

  // Tasks
  tasks: Task[];
  activeTaskId: string | null;

  // Sessions & Stats
  sessions: PomodoroSession[];
  dailyStats: DailyStats[];

  // Settings
  settings: Settings;

  // Timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  completeSession: () => void;
  setMode: (mode: TimerMode) => void;

  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedPomodoros' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  completeTask: (id: string) => void;

  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void;

  // Utility
  getDurationForMode: (mode: TimerMode) => number;
  getTodayStats: () => DailyStats | undefined;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const getDateString = (date: Date = new Date()) => {
  return date.toISOString().split('T')[0];
};

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      // Initial state
      timeRemaining: DEFAULT_SETTINGS.workDuration * 60,
      isRunning: false,
      currentMode: 'work',
      completedPomodoros: 0,
      tasks: [],
      activeTaskId: null,
      sessions: [],
      dailyStats: [],
      settings: DEFAULT_SETTINGS,

      // Timer actions
      startTimer: () => set({ isRunning: true }),

      pauseTimer: () => set({ isRunning: false }),

      resetTimer: () => {
        const { currentMode, getDurationForMode } = get();
        set({
          timeRemaining: getDurationForMode(currentMode),
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
        const {
          currentMode,
          completedPomodoros,
          settings,
          activeTaskId,
          tasks,
          sessions,
          dailyStats,
          getDurationForMode
        } = get();

        const sessionDuration = getDurationForMode(currentMode) * 60;
        const today = getDateString();

        // Add session record
        const newSession: PomodoroSession = {
          id: generateId(),
          taskId: activeTaskId || undefined,
          mode: currentMode,
          duration: sessionDuration,
          completedAt: new Date(),
        };

        // Update daily stats
        let updatedDailyStats = [...dailyStats];
        const todayStatsIndex = updatedDailyStats.findIndex(s => s.date === today);

        if (currentMode === 'work') {
          if (todayStatsIndex >= 0) {
            updatedDailyStats[todayStatsIndex] = {
              ...updatedDailyStats[todayStatsIndex],
              totalPomodoros: updatedDailyStats[todayStatsIndex].totalPomodoros + 1,
              totalFocusTime: updatedDailyStats[todayStatsIndex].totalFocusTime + sessionDuration,
            };
          } else {
            updatedDailyStats.push({
              date: today,
              totalPomodoros: 1,
              totalFocusTime: sessionDuration,
              tasksCompleted: 0,
            });
          }

          // Update active task pomodoros
          if (activeTaskId) {
            const updatedTasks = tasks.map(task =>
              task.id === activeTaskId
                ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
                : task
            );
            set({ tasks: updatedTasks });
          }
        }

        // Determine next mode
        let nextMode: TimerMode;
        let newCompletedPomodoros = completedPomodoros;

        if (currentMode === 'work') {
          newCompletedPomodoros = completedPomodoros + 1;
          if (newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0) {
            nextMode = 'longBreak';
          } else {
            nextMode = 'shortBreak';
          }
        } else {
          nextMode = 'work';
        }

        set({
          sessions: [...sessions, newSession],
          dailyStats: updatedDailyStats,
          completedPomodoros: newCompletedPomodoros,
          currentMode: nextMode,
          timeRemaining: getDurationForMode(nextMode),
          isRunning: currentMode === 'work'
            ? settings.autoStartBreaks
            : settings.autoStartPomodoros,
        });

        // Play notification sound and show notification
        if (typeof window !== 'undefined' && settings.notificationsEnabled) {
          if (Notification.permission === 'granted') {
            new Notification('Pomoflow', {
              body: currentMode === 'work'
                ? 'Waktu istirahat!'
                : 'Kembali bekerja!',
              icon: '/favicon.ico',
            });
          }
        }
      },

      setMode: (mode: TimerMode) => {
        const { getDurationForMode } = get();
        set({
          currentMode: mode,
          timeRemaining: getDurationForMode(mode),
          isRunning: false,
        });
      },

      // Task actions
      addTask: (taskData) => {
        const newTask: Task = {
          id: generateId(),
          ...taskData,
          completedPomodoros: 0,
          status: 'pending',
          createdAt: new Date(),
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
        }));
      },

      setActiveTask: (id) => {
        set(state => {
          // Update task status
          const updatedTasks = state.tasks.map(task => ({
            ...task,
            status: task.id === id
              ? 'in_progress' as const
              : task.status === 'in_progress' && task.id !== id
                ? 'pending' as const
                : task.status,
          }));
          return { activeTaskId: id, tasks: updatedTasks };
        });
      },

      completeTask: (id) => {
        const today = getDateString();

        set(state => {
          const updatedTasks = state.tasks.map(task =>
            task.id === id
              ? { ...task, status: 'completed' as const, completedAt: new Date() }
              : task
          );

          // Update daily stats
          let updatedDailyStats = [...state.dailyStats];
          const todayStatsIndex = updatedDailyStats.findIndex(s => s.date === today);

          if (todayStatsIndex >= 0) {
            updatedDailyStats[todayStatsIndex] = {
              ...updatedDailyStats[todayStatsIndex],
              tasksCompleted: updatedDailyStats[todayStatsIndex].tasksCompleted + 1,
            };
          } else {
            updatedDailyStats.push({
              date: today,
              totalPomodoros: 0,
              totalFocusTime: 0,
              tasksCompleted: 1,
            });
          }

          return {
            tasks: updatedTasks,
            dailyStats: updatedDailyStats,
            activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
          };
        });
      },

      // Settings actions
      updateSettings: (newSettings) => {
        set(state => {
          const updatedSettings = { ...state.settings, ...newSettings };

          // If duration settings changed, update timer if not running
          if (!state.isRunning) {
            let newTimeRemaining = state.timeRemaining;
            if (state.currentMode === 'work' && newSettings.workDuration) {
              newTimeRemaining = newSettings.workDuration * 60;
            } else if (state.currentMode === 'shortBreak' && newSettings.shortBreakDuration) {
              newTimeRemaining = newSettings.shortBreakDuration * 60;
            } else if (state.currentMode === 'longBreak' && newSettings.longBreakDuration) {
              newTimeRemaining = newSettings.longBreakDuration * 60;
            }
            return { settings: updatedSettings, timeRemaining: newTimeRemaining };
          }

          return { settings: updatedSettings };
        });
      },

      // Utility
      getDurationForMode: (mode: TimerMode) => {
        const { settings } = get();
        switch (mode) {
          case 'work':
            return settings.workDuration * 60;
          case 'shortBreak':
            return settings.shortBreakDuration * 60;
          case 'longBreak':
            return settings.longBreakDuration * 60;
        }
      },

      getTodayStats: () => {
        const { dailyStats } = get();
        const today = getDateString();
        return dailyStats.find(s => s.date === today);
      },
    }),
    {
      name: 'pomoflow-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        sessions: state.sessions,
        dailyStats: state.dailyStats,
        settings: state.settings,
        completedPomodoros: state.completedPomodoros,
      }),
    }
  )
);
