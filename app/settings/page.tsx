'use client';

import { usePomodoroStore } from '../store/pomodoroStore';

export default function SettingsPage() {
  const { settings, updateSettings } = usePomodoroStore();

  const handleDurationChange = (key: string, value: number) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pengaturan
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sesuaikan aplikasi dengan kebutuhanmu
          </p>
        </div>

        {/* Timer Settings */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Durasi Timer
          </h2>

          <div className="space-y-6">
            {/* Work Duration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Durasi Fokus
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {settings.workDuration} menit
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={settings.workDuration}
                onChange={(e) => handleDurationChange('workDuration', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>15</span>
                <span>60</span>
              </div>
            </div>

            {/* Short Break Duration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Istirahat Singkat
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {settings.shortBreakDuration} menit
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={settings.shortBreakDuration}
                onChange={(e) => handleDurationChange('shortBreakDuration', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3</span>
                <span>15</span>
              </div>
            </div>

            {/* Long Break Duration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Istirahat Panjang
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {settings.longBreakDuration} menit
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="5"
                value={settings.longBreakDuration}
                onChange={(e) => handleDurationChange('longBreakDuration', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>15</span>
                <span>45</span>
              </div>
            </div>

            {/* Pomodoros until long break */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pomodoro sampai Istirahat Panjang
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {settings.pomodorosUntilLongBreak} sesi
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={settings.pomodorosUntilLongBreak}
                onChange={(e) => handleDurationChange('pomodorosUntilLongBreak', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>2</span>
                <span>8</span>
              </div>
            </div>
          </div>
        </section>

        {/* Automation Settings */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Otomatisasi
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mulai Istirahat Otomatis
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Otomatis mulai istirahat setelah sesi fokus
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.autoStartBreaks}
                  onChange={(e) => updateSettings({ autoStartBreaks: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mulai Fokus Otomatis
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Otomatis mulai sesi fokus setelah istirahat
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.autoStartPomodoros}
                  onChange={(e) => updateSettings({ autoStartPomodoros: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </div>
            </label>
          </div>
        </section>

        {/* Notification & Theme Settings */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Notifikasi & Tampilan
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifikasi
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tampilkan notifikasi saat sesi selesai
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </div>
            </label>

            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                Tema
              </span>
              <div className="flex gap-2">
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateSettings({ theme })}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      settings.theme === theme
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {theme === 'light' && '☀️ Terang'}
                    {theme === 'dark' && '🌙 Gelap'}
                    {theme === 'system' && '💻 Sistem'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Tentang Pomoflow
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pomoflow adalah aplikasi teknik Pomodoro yang membantu kamu fokus dan produktif.
            Teknik Pomodoro membagi waktu kerja menjadi interval fokus 25 menit yang dipisahkan
            dengan istirahat singkat, membantu mengurangi kelelahan mental dan meningkatkan konsentrasi.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Versi 1.0.0
          </p>
        </section>
      </div>
    </div>
  );
}
