# Aktivitas Membaca — Gallery Version (Vercel)

Website statis dengan carousel gallery dan timer.

## Cara deploy ke Vercel

### 1. Dashboard (tanpa coding)
- Upload ke GitHub repo, lalu import ke Vercel
- Framework: Other / Static
- Deploy → jadi web online

### 2. Vercel CLI
```bash
npm i -g vercel
vercel login
cd aktivitas-membaca-gallery-vercel
vercel
vercel --prod
```

## Edit link Google Drive
Buka `index.html`, ubah bagian ini:
```js
const activityLinks = {
  1: "https://drive.google.com/file/d/ID1/view",
  2: "https://drive.google.com/file/d/ID2/view"
};
```
