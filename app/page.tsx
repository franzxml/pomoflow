'use client';

import Timer from './components/Timer';

export default function Home() {
  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Timer Section */}
        <section>
          <Timer />
        </section>
      </div>
    </div>
  );
}
