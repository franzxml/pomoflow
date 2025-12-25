'use client';

import TestingTimer from '../components/TestingTimer';
import Link from 'next/link';

export default function TestingPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-block mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-all"
        >
          ← Kembali ke Timer Utama
        </Link>

        {/* Testing Section */}
        <section>
          <TestingTimer />
        </section>

        {/* Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
            ℹ️ Informasi Mode Testing
          </h2>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• Durasi default lebih singkat: Fokus (10s), Istirahat Singkat (5s), Istirahat Panjang (8s)</li>
            <li>• Anda bisa mengatur durasi custom untuk testing lebih fleksibel</li>
            <li>• Suara notifikasi akan dimainkan ketika timer habis</li>
            <li>• Gunakan halaman ini untuk testing sebelum menggunakan aplikasi secara normal</li>
            <li>• Setiap 4 sesi kerja akan otomatis beralih ke istirahat panjang</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
