## Fitur

- Timer Kerja — 25 menit fokus dengan indikator aktif
- Timer Istirahat — 5 menit jeda
- Timer Kostum — atur durasi dan nama sendiri
- Konfirmasi ganti timer — mencegah penggantian timer yang masih berjalan
- Indikator timer — tetap terlihat saat navigasi antar halaman
- Notifikasi — pemberitahuan saat waktu habis
- Ganti warna latar — color picker untuk personalisasi tema
- Mulai lagi — ulangi sesi yang sama setelah timer selesai

## Teknologi

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Font:** JetBrains Mono (Google Fonts)
- **Deployment:** Vercel

## Struktur Folder

```
pomoflow/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── img/
    │   └── favicon.svg
    └── js/
        ├── main.js              Entry point
        └── modules/
            ├── navigation.js    Navigasi antar view
            ├── notifications.js Notifikasi browser
            ├── theme.js         Color picker dan tema
            └── timer.js         Logika timer utama
```

## Cara Menjalankan

1. Clone repositori:
   ```bash
   git clone https://github.com/franzxml/pomoflow.git && cd pomoflow
   ```

2. Buka `index.html` langsung di browser, atau gunakan live server:
   ```bash
   # VS Code: install ekstensi Live Server, klik kanan index.html → Open with Live Server
   # Atau via npx:
   npx serve .
   ```

## Scripts

Proyek ini tidak menggunakan package manager atau build tool. Tidak ada scripts yang perlu dijalankan.

## Deployment

https://pomoflow-three.vercel.app/

## Pengembang

- [franzxml](https://github.com/franzxml)
