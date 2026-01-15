"use client";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#e6cfa6" }}>
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full opacity-30" style={{ backgroundColor: "#394c44" }} />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: "#394c44" }} />
      <div className="absolute bottom-1/3 -right-10 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: "#394c44" }} />

      <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <div className="mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#394c44" }}>
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="text-4xl font-bold" style={{ color: "#394c44" }}>Gabung!</h1>
          <p className="text-lg opacity-60 mt-1" style={{ color: "#394c44" }}>Buat akun baru</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nama Pengguna"
              className="w-full px-5 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#394c44] transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#394c44" }}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Kata Sandi"
              className="w-full px-5 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#394c44] transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#394c44" }}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              className="w-full px-5 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#394c44] transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#394c44" }}
            />
          </div>

          <button
            onClick={() => router.push("/auth/verify-register")}
            className="w-full py-4 text-white text-lg font-semibold rounded-2xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-2"
            style={{ backgroundColor: "#394c44" }}
          >
            Daftar
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center">
          <p className="text-sm" style={{ color: "#394c44" }}>
            <span className="opacity-60">Sudah punya akun? </span>
            <button
              onClick={() => router.push("/auth/login")}
              className="font-semibold hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
