// Types untuk aplikasi Pomodoro

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface PomodoroSession {
  id: string;
  taskId?: string;
  mode: TimerMode;
  duration: number; // in seconds
  completedAt: Date;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalPomodoros: number;
  totalFocusTime: number; // in seconds
  tasksCompleted: number;
}

export interface Settings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  pomodorosUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  pomodorosUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  theme: 'system',
  notificationsEnabled: true,
};
