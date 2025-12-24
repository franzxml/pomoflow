'use client';

import { usePomodoroStore } from '../store/pomodoroStore';

export default function StatsChart() {
  const { dailyStats, settings } = usePomodoroStore();

  // Get last 7 days of stats
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const stats = dailyStats.find(s => s.date === dateString);
      days.push({
        date: dateString,
        dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        pomodoros: stats?.totalPomodoros || 0,
        focusTime: stats?.totalFocusTime || 0,
        tasksCompleted: stats?.tasksCompleted || 0,
      });
    }
    return days;
  };

  const last7Days = getLast7Days();
  const maxPomodoros = Math.max(...last7Days.map(d => d.pomodoros), 1);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}j ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate totals
  const totalPomodoros = last7Days.reduce((sum, d) => sum + d.pomodoros, 0);
  const totalFocusTime = last7Days.reduce((sum, d) => sum + d.focusTime, 0);
  const totalTasksCompleted = last7Days.reduce((sum, d) => sum + d.tasksCompleted, 0);
  const avgPomodorosPerDay = (totalPomodoros / 7).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-red-500">{totalPomodoros}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Pomodoro Minggu Ini</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-green-500">{formatTime(totalFocusTime)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Waktu Fokus</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-blue-500">{totalTasksCompleted}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Tugas Selesai</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-purple-500">{avgPomodorosPerDay}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Rata-rata/Hari</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Aktivitas 7 Hari Terakhir
        </h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {last7Days.map((day, index) => {
            const height = (day.pomodoros / maxPomodoros) * 100;
            const isToday = index === 6;

            return (
              <div key={day.date} className="flex flex-col items-center flex-1">
                {/* Bar */}
                <div className="relative w-full flex flex-col items-center h-40">
                  {day.pomodoros > 0 && (
                    <div className="absolute -top-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {day.pomodoros}
                    </div>
                  )}
                  <div
                    className={`w-full max-w-12 rounded-t-lg transition-all ${
                      isToday
                        ? 'bg-red-500'
                        : 'bg-red-300 dark:bg-red-700'
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: day.pomodoros > 0 ? '8px' : '0',
                    }}
                  />
                </div>
                {/* Day label */}
                <div className={`mt-2 text-xs ${
                  isToday
                    ? 'font-bold text-red-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {day.dayName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detail Harian
        </h3>
        <div className="space-y-3">
          {[...last7Days].reverse().map((day, index) => {
            const isToday = index === 0;
            return (
              <div
                key={day.date}
                className={`flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                  isToday ? 'bg-red-50 dark:bg-red-900/20 -mx-2 px-2 rounded-lg' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-sm font-medium ${isToday ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {isToday ? 'Hari Ini' : new Date(day.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {day.pomodoros} pom
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {formatTime(day.focusTime)}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {day.tasksCompleted} tugas
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
