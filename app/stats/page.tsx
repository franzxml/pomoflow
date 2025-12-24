'use client';

import StatsChart from '../components/StatsChart';
import { usePomodoroStore } from '../store/pomodoroStore';

export default function StatsPage() {
  const { sessions, dailyStats, tasks } = usePomodoroStore();

  // All time stats
  const totalPomodoros = dailyStats.reduce((sum, d) => sum + d.totalPomodoros, 0);
  const totalFocusTime = dailyStats.reduce((sum, d) => sum + d.totalFocusTime, 0);
  const totalTasksCompleted = tasks.filter(t => t.status === 'completed').length;

  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} jam ${minutes} menit`;
    }
    return `${minutes} menit`;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Statistik
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Pantau produktivitas dan kebiasaan kerjamu
          </p>
        </div>

        {/* All Time Stats */}
        <div className="mb-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white">
          <h2 className="text-lg font-medium opacity-90 mb-4">Total Sepanjang Waktu</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-3xl md:text-4xl font-bold">{totalPomodoros}</div>
              <div className="text-sm opacity-80">Pomodoro</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">{Math.floor(totalFocusTime / 3600)}</div>
              <div className="text-sm opacity-80">Jam Fokus</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">{totalTasksCompleted}</div>
              <div className="text-sm opacity-80">Tugas Selesai</div>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-4">
            Total waktu fokus: {formatTotalTime(totalFocusTime)}
          </p>
        </div>

        {/* Weekly Stats */}
        <StatsChart />

        {/* Tips Section */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Tips Produktivitas
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Usahakan menyelesaikan 8-12 pomodoro per hari untuk hasil optimal
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Istirahat yang cukup sama pentingnya dengan bekerja fokus
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Pecah tugas besar menjadi bagian kecil yang dapat diselesaikan dalam 1-4 pomodoro
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Konsistensi lebih penting daripada intensitas - mulai dengan 4 pomodoro per hari
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
