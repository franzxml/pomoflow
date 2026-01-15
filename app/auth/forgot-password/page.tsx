"use client";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#e6cfa6" }}>
      {/* Decorative circles */}
      <div className="absolute top-20 -right-20 w-40 h-40 rounded-full opacity-20" style={{ backgroundColor: "#394c44" }} />
      <div className="absolute -bottom-32 left-1/4 w-64 h-64 rounded-full opacity-15" style={{ backgroundColor: "#394c44" }} />

      <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Back button */}
        <button
          onClick={() => router.push("/auth/login")}
          className="absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: "rgba(57,76,68,0.1)" }}
        >
          <span className="text-2xl" style={{ color: "#394c44" }}>←</span>
        </button>

        {/* Content */}
        <div className="mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(57,76,68,0.1)" }}>
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#394c44" }}>Lupa Sandi?</h1>
          <p className="text-base opacity-60 mt-2 leading-relaxed" style={{ color: "#394c44" }}>
            Tenang, masukkan nama penggunamu dan kami akan mengirim kode verifikasi
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Nama Pengguna"
              className="w-full px-5 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#394c44] transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#394c44" }}
            />
          </div>

          <button
            onClick={() => router.push("/auth/verify-code")}
            className="w-full py-4 text-white text-lg font-semibold rounded-2xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "#394c44" }}
          >
            Kirim Kode
          </button>
        </div>
      </div>
    </div>
  );
}
