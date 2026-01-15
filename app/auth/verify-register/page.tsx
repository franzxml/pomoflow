"use client";

import { useRouter } from "next/navigation";

export default function VerifyRegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#e6cfa6" }}>
      {/* Decorative circles */}
      <div className="absolute -top-20 left-1/2 w-40 h-40 rounded-full opacity-15" style={{ backgroundColor: "#394c44" }} />
      <div className="absolute bottom-10 -right-20 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: "#394c44" }} />

      <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Content */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: "rgba(57,76,68,0.1)" }}>
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#394c44" }}>Hampir Selesai!</h1>
          <p className="text-base opacity-60 mt-2" style={{ color: "#394c44" }}>
            Masukkan kode verifikasi untuk aktivasi akun
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-14 text-center text-2xl font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394c44] transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#394c44" }}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full py-4 text-white text-lg font-semibold rounded-2xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: "#394c44" }}
        >
          Aktivasi Akun
        </button>

        {/* Resend */}
        <div className="text-center mt-8">
          <p className="text-sm" style={{ color: "#394c44" }}>
            <span className="opacity-60">Tidak menerima kode? </span>
            <button className="font-semibold hover:underline">
              Kirim Ulang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
