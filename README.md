# Aktivitas Membaca — Vercel

Proyek statis siap-deploy ke Vercel.

## Struktur
- `index.html` — halaman utama (konten dari file Anda)
- `vercel.json` — konfigurasi sederhana (opsional untuk static)

## Cara deploy (pilih salah satu)
### A. Dashboard (tanpa CLI)
1. Unduh ZIP proyek ini, lalu ekstrak.
2. Buat repo GitHub baru dan upload isi folder ini.
3. Buka Vercel → **Add New** → **Project** → **Import Git Repository**.
4. Framework: **Other** / **Static**. Build Command kosong, Output Directory kosong.
5. Klik **Deploy**.

### B. Vercel CLI
1. Install Node.js, lalu `npm i -g vercel`
2. `vercel login`
3. Masuk ke folder proyek ini:
   ```bash
   vercel
   vercel --prod
   ```

## Mengganti tautan Google Drive
Ubah di `index.html` bagian:
```js
const activityLinks = {
  1: "https://drive.google.com/file/d/ID1/view",
  2: "https://drive.google.com/file/d/ID2/view"
};
```
Simpan dan deploy ulang.
